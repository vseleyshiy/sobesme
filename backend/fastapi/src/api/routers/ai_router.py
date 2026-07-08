from fastapi import APIRouter
from services.audio_service import AudioService
from services.llm_service import LlmService
from schemas.schemas import AnalyzeInterviewRequest, MentorFeedback, Message, MessageRoleEnum
from utils.prompts import getAnalyzeInstruction
from dotenv import load_dotenv

load_dotenv()

router = APIRouter(prefix="/ai")
audioService = AudioService()
llmService = LlmService()

@router.post("/analyze-interview")
async def analyzeInterview(data: AnalyzeInterviewRequest):
  messages = data.messages
  grade = data.grade
  topic = data.topic
  difficulty = data.difficulty
  hp = data.hp

  systemArray = [Message(
    role=MessageRoleEnum.SYSTEM,
    content=getAnalyzeInstruction(grade, topic, hp, difficulty)
  )]

  content = await llmService.getAiResponse(messages, systemArray)

  try:
    result = MentorFeedback.model_validate_json(content)

    return result.model_dump()

  except Exception as e:
    print(e)
    return {
      "error": "Failed to parse AI response"
    }
