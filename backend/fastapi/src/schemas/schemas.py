from pydantic import BaseModel
from schemas.enums import GradeEnum

class Message(BaseModel):
  role: str
  content: str

class InterviewRequest(BaseModel):
  interviewId: str
  messages: list[Message]
  grade: GradeEnum
  topic: str

class TtsRequest(BaseModel):
  text: str

class MentorDetail(BaseModel):
  topic: str
  user_answer: str
  correction: str
  study_link: str

class MentorFeedback(BaseModel):
  score: int
  feedback: str
  details: list[MentorDetail]

class AudioChunk(BaseModel):
  interviewId: str
  chunk: bytes