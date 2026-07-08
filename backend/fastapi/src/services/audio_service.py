from openai import AsyncOpenAI
import edge_tts
from dotenv import load_dotenv

load_dotenv()

class AudioService:
    def __init__(self):
        self.client = AsyncOpenAI()

    async def transcribe(self, file_path: str) -> str:
        with open(file_path, "rb") as audio_file:
            transcription = await self.client.audio.transcriptions.create(
                model="whisper-1",
                file=audio_file
            )
        return transcription.text

    async def getTts(self, text: str, outputPath: str):
        communicate = edge_tts.Communicate(text, "ru-RU-DmitryNeural")
        await communicate.save(outputPath)