from pydantic import BaseModel
from enum import Enum

class GradeEnum(str, Enum):
  TRAINEE = "Trainee"
  JUNIOR = "Junior"
  MIDDLE = "Middle"
  SENIOR = "Senior"

class Message(BaseModel):
  role: str
  content: str

class InterviewRequest(BaseModel):
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
