from ollama import AsyncClient
from schemas.schemas import Message
from constants.constants import AI_MODEL

class LlmService:
    def __init__(self):
        self.client = AsyncClient()

    async def getQuestion(self, messages: list[Message], systemArray: Message, format=''):
        historyArray = [message.model_dump() for message in messages]

        response = await self.client.chat(model=AI_MODEL, messages=systemArray+historyArray, format=format)

        return response.message.content