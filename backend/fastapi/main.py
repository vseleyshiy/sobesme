from fastapi import FastAPI, UploadFile, File, BackgroundTasks
from fastapi.responses import FileResponse
from ollama import AsyncClient
from prompts import getQuestionInstruction, getAnalyzeInstruction
from schemas import InterviewRequest, TtsRequest, MentorFeedback
from faster_whisper import WhisperModel
import edge_tts
import aiofiles
import os

app = FastAPI()

model = WhisperModel("base", device="cpu", compute_type="int8")

audioDirPath = "temp_audio"

def removeTempFile(path: str):
    if os.path.exists(path):
        os.remove(path)

@app.post("/ai/generate-question")
async def generateQuestion(prompt: InterviewRequest):
  client = AsyncClient()

  systemArray = [{
    "role": "system",
    "content": getQuestionInstruction(prompt.grade, prompt.topic)
  }]

  historyArray = [message.model_dump() for message in prompt.messages]

  response = await client.chat(
    model="gemma4",
    messages= systemArray + historyArray
  )

  result = response.message.content

  return {
		"answer": result
	}

@app.post("/ai/transcribe")
async def getTranscribtion(inputFile: UploadFile = File(...)):

  filePath = f"{audioDirPath}/{inputFile.filename}"
  if not os.path.exists(audioDirPath):
    os.makedirs(audioDirPath)

  async with aiofiles.open(filePath, 'wb') as outputFile:
    content = await inputFile.read()

    await outputFile.write(content)

  segments, _ = model.transcribe(filePath)

  text = " ".join([segment.text for segment in segments])

  removeTempFile(filePath)

  return {
    "text": text
  }


@app.post("/ai/tts")
async def createTts(data: TtsRequest, backgroundTasks: BackgroundTasks):

  # в будущем название будет формироваться из айди сообщения, которое будет храниться в БД и прилетать сюда в Pydantic из Nest JS
  filePath = f"{audioDirPath}/response.mp3"

  if not os.path.exists(audioDirPath):
    os.makedirs(audioDirPath)

  communicate = edge_tts.Communicate(data.text, "ru-RU-DmitryNeural")
  await communicate.save(filePath)

  backgroundTasks.add_task(removeTempFile, filePath)

  return FileResponse(
    path=filePath,
    media_type="audio/mpeg",
  )

@app.post("/ai/analyze-interview")
async def analyzeInterview(data: InterviewRequest):
  client = AsyncClient()

  systemArray = [{
    "role": "system",
    "content": getAnalyzeInstruction(data.grade, data.topic)
  }]

  historyArray = [message.model_dump() for message in data.messages]

  response = await client.chat(
    model="gemma4",
    messages= systemArray + historyArray,
    format="json"
  )

  content = response.message.content

  print(content)

  try:
    result = MentorFeedback.model_validate_json(content)

    return {
      "result": result.model_dump()
    }
  except Exception as e:
    return {
      "error": "Failed to parse AI response"
    }