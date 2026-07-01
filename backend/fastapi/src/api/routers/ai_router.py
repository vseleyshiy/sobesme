from fastapi import APIRouter, UploadFile, File, BackgroundTasks
from fastapi.responses import FileResponse
from constants.constants import AUDIO_DIR_PATH
from services.audio_service import AudioService
from services.llm_service import LlmService
from utils.functions import removeTempFile
from schemas.schemas import InterviewRequest, TtsRequest, MentorFeedback
from utils.prompts import getAnalyzeInstruction, getQuestionInstruction
import os
import aiofiles

router = APIRouter(prefix="/ai")
audioService = AudioService()
llmService = LlmService()

@router.post("/generate-question")
async def generateQuestion(prompt: InterviewRequest):
  systemArray = [{
    "role": "system",
    "content": getQuestionInstruction(prompt.grade, prompt.topic)
  }]

  result = llmService.getQuestion(prompt.messages, systemArray)

  return {
		"answer": result
	}


@router.post("/analyze-interview")
async def analyzeInterview(data: InterviewRequest):
  systemArray = [{
    "role": "system",
    "content": getAnalyzeInstruction(data.grade, data.topic)
  }]

  content = llmService.getQuestion(data.messages, systemArray, 'json')

  try:
    result = MentorFeedback.model_validate_json(content)

    return {
      "result": result.model_dump()
    }
  except Exception as e:
    return {
      "error": "Failed to parse AI response"
    }


@router.post("/transcribe")
async def getTranscribtion(inputFile: UploadFile = File(...)):

  filePath = f"{AUDIO_DIR_PATH}/{inputFile.filename}"
  if not os.path.exists(AUDIO_DIR_PATH):
    os.makedirs(AUDIO_DIR_PATH)

  async with aiofiles.open(filePath, 'wb') as outputFile:
    content = await inputFile.read()

    await outputFile.write(content)

  text = audioService.transcribe(filePath)

  removeTempFile(filePath)

  return {
    "text": text
  }


@router.post("/tts")
async def createTts(data: TtsRequest, backgroundTasks: BackgroundTasks):

  # в будущем название будет формироваться из айди сообщения, которое будет храниться в БД и прилетать сюда в Pydantic из Nest JS
  filePath = f"{AUDIO_DIR_PATH}/response.mp3"

  if not os.path.exists(AUDIO_DIR_PATH):
    os.makedirs(AUDIO_DIR_PATH)

  await audioService.getTts(data.text, filePath)

  backgroundTasks.add_task(removeTempFile, filePath)

  return FileResponse(
    path=filePath,
    media_type="audio/mpeg",
  )
