from pydantic import BaseModel
from schemas.enums import GradeEnum, DifficultyEnum, EmotionsEnum, MessageRoleEnum, AiInteresStatus

class Message(BaseModel):
  role: MessageRoleEnum
  content: str

class InterviewRequest(BaseModel):
  messages: list[Message]
  grade: GradeEnum
  topic: str
  difficulty: DifficultyEnum
  hp: int

class QuestionResponse(BaseModel):
  text: str
  emotion: EmotionsEnum
  impact: int
  status: AiInteresStatus

class TtsRequest(BaseModel):
  text: str

class MentorDetail(BaseModel):
  topic: str
  userAnswer: str
  correction: str
  searchQuery: str

class MentorFeedback(BaseModel):
  score: int
  stressScore: int
  text: str
  details: list[MentorDetail]

class AudioChunk(BaseModel):
  interviewId: str
  chunk: bytes