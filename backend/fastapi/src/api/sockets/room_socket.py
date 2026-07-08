from services.audio_service import AudioService
from services.llm_service import LlmService
from schemas.schemas import InterviewRequest, AudioChunk, Message
from utils.prompts import getQuestionInstruction
from utils.functions import removeTempFile, getError
from main import sio
import os
import aiofiles
from dotenv import load_dotenv

load_dotenv()

audioService = AudioService()
llmService = LlmService()

audioBuffers = {}

@sio.on('audio_chunk')
async def handleChunk(_, rawData):
    data = AudioChunk(**rawData)
    interviewId = data.interviewId
    chunk = data.chunk

    if interviewId not in audioBuffers:
        audioBuffers[interviewId] = bytearray()

    audioBuffers[interviewId].extend(chunk)

@sio.on('audio_end')
async def handle_end(sid, rawData):
    try:
        data = InterviewRequest(**rawData)
    except Exception as e:
        print(f"Ошибка валидации: {e}")
        return

    interviewId = data.interviewId
    messages = data.messages
    grade = data.grade
    topic = data.topic
    difficulty = data.difficulty
    hp = data.hp

    if interviewId not in audioBuffers or not audioBuffers[interviewId]:
        return getError('В audioBuffers не найдено свойство с ключом interviewId', 'Not found interviewId', 404)

    AUDIO_DIR_PATH = os.getenv('AUDIO_DIR_PATH')

    tempTtsPath = f"{AUDIO_DIR_PATH}/{interviewId}_ai.mp3"
    tempAudioPath = f"{AUDIO_DIR_PATH}/{interviewId}_user.webm"

    try:
        audioData = bytes(audioBuffers[interviewId])
        del audioBuffers[interviewId]

        if len(audioData) < 100:
            await sio.emit('ai_response', {
            'interviewId': interviewId,
            'aiText': 'Я вас не расслышал, повторите ещё раз...',
            }, to=sid)
            return getError('Размер аудио файла слишком мал', 'Audio file is too small', 400)

        if not os.path.exists(AUDIO_DIR_PATH):
            os.makedirs(AUDIO_DIR_PATH)


        async with aiofiles.open(tempAudioPath, 'wb') as f:
            await f.write(audioData)

        userText = await audioService.transcribe(tempAudioPath)

        if not userText.strip():
            await sio.emit('ai_response', {
            'interviewId': interviewId,
            'aiText': 'Что вы молчите? Я жду вашего ответа...',
            }, to=sid)
            return getError('Пользователь ничего не сказал в микрофон', 'Audio text is empty', 400)

        messages.append(Message(role='user', content=userText))

        systemArray = [Message(role="system", content=getQuestionInstruction(grade, topic, difficulty))]

        response = await llmService.getQuestion(messages, systemArray)

        text = response.text
        emotion = response.emotion
        impact = response.impact
        status = response.status

        await audioService.getTts(text, tempTtsPath)

        async with aiofiles.open(tempTtsPath, 'rb') as f:
            aiAudioBytes = await f.read()

        await sio.emit('ai_response', {
            'interviewId': interviewId,
            'userText': userText,
            'aiText': text,
            'emotion': emotion,
            'impact': impact,
            'status': status,
            'audioBuffer': aiAudioBytes,
        }, to=sid)

    except Exception as e:
        print(f"Error in pipeline: {e}")
    finally:
        for path in [tempAudioPath, tempTtsPath]:
            removeTempFile(path)
