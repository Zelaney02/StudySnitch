import requests
from dotenv import load_dotenv
from classes import TTS_Request
import os
import pygame
from pydub import AudioSegment

load_dotenv()
API_KEY = os.getenv("ELEVEN_LABS")

voice_ids = {
    "gordan_ramsay": "Cd34poZyG0jmSJD1fVJJ"
}


CHUNK_SIZE = 1024
tts_url = "https://api.elevenlabs.io/v1/text-to-speech/{}"


tts_headers = {
    "Accept": "audio/mpeg",
    "Content-Type": "application/json",
    "xi-api-key": API_KEY
}



data = {
    "text": "You fucking donkey!",
    "model_id": "eleven_multilingual_v2",
    "voice_settings": {
        "stability": 0.5,
        "similarity_boost": 0.8,
        "style": 0.1
    }
}
def get_data(text):
    data = {
        "text": text,
        "model_id": "eleven_multilingual_v2",
        "voice_settings": {
            "stability": 0.5,
            "similarity_boost": 0.8,
            "style": 0.1
        }
    }
    return data
    
def play_audio(file_path: str):
    # Initialize pygame
    pygame.mixer.init()
    
    # Load and play the audio file
    pygame.mixer.music.load(file_path)
    pygame.mixer.music.play()
    
    # Keep the script running until the audio finishes playing
    while pygame.mixer.music.get_busy():
        pygame.time.Clock().tick(10)


def get_audio_length(file_path):
    audio = AudioSegment.from_file(file_path, format="mp3")  # You can change "mp3" to other formats if needed
    length_ms = len(audio)
    return length_ms / 1000  # Convert to seconds


def get_tts(tts_request: TTS_Request, file_path):
    data = get_data(tts_request.text)
    url = tts_url.format(voice_ids[tts_request.voice])
    response = requests.post(url, headers=tts_headers, json=data)
    with open(file_path, 'wb') as f:
        for chunk in response.iter_content(chunk_size=CHUNK_SIZE):
            if chunk:
                f.write(chunk)


