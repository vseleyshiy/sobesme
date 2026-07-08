from openai import AsyncOpenAI
from schemas.schemas import Message, QuestionResponse
from dotenv import load_dotenv
from os import getenv

load_dotenv()

class LlmService:
    def __init__(self):
        self.client = AsyncOpenAI()

    async def getQuestion(self, messages: list[Message], systemArray: list[Message]) -> QuestionResponse:
        systemArrayDump = [message.model_dump() for message in systemArray]
        historyArray = [message.model_dump() for message in messages]

        response = await self.client.chat.completions.create(
            model=getenv("AI_MODEL"),
            messages=systemArrayDump + historyArray,
            response_format={"type": "json_object"}
        )

        return response.choices[0].message.content