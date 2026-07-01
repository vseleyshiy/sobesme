from faster_whisper import WhisperModel
import edge_tts
import asyncio

class AudioService:
    def __init__(self):
        self.model = WhisperModel("base", device="cpu", compute_type="int8")

    def _transcribe_sync(self, filePath: str) -> str:
        segments, _ = self.model.transcribe(filePath)
        return " ".join([segment.text for segment in segments])

    async def transcribe(self, file_path: str) -> str:
        return await asyncio.to_thread(self._transcribe_sync, file_path)

    async def getTts(self, text: str, outputPath: str):
        communicate = edge_tts.Communicate(text, "ru-RU-DmitryNeural")
        await communicate.save(outputPath)