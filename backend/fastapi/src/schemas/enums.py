from enum import Enum

class MessageRoleEnum(str, Enum):
  USER = "user"
  ASSISTANT = "assistant"
  SYSTEM = "system"

class GradeEnum(str, Enum):
  TRAINEE = "TRAINEE"
  JUNIOR = "JUNIOR"
  MIDDLE = "MIDDLE"
  SENIOR = "SENIOR"

class DifficultyEnum(str, Enum):
  PUPPY = "PUPPY"
  STRICT = "STRICT"
  HARD = "HARD"

class EmotionsEnum(str, Enum):
  COOL = "COOL"
  NEUTRAL = "NEUTRAL"
  SMIRK = "SMIRK"
  FACEPALM = "FACEPALM"
  ANGRY = "ANGRY"
  FURIOUS = "FURIOUS"

class AiInteresStatus(str, Enum):
  IN_PROGRESS = 'IN_PROGRESS'
  COMPLETED = 'COMPLETED'
