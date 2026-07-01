import os

def removeTempFile(path: str):
    if os.path.exists(path):
        os.remove(path)

def getError(message: str, error: str, statusCode: int):
    return {
        "message": message,
        "error": error,
        "statusCode": statusCode
    }