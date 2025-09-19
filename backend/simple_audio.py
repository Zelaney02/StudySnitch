import pygame
import random
import os

def init_audio():
    """Initialize pygame mixer for audio playback"""
    try:
        pygame.mixer.init()
        return True
    except Exception as e:
        print(f"Audio initialization failed: {e}")
        return False

def play_simple_audio(file_path):
    """Play an audio file using pygame"""
    try:
        if not os.path.exists(file_path):
            print(f"Audio file not found: {file_path}")
            return False
            
        pygame.mixer.music.load(file_path)
        pygame.mixer.music.play()
        print(f"🔊 Playing audio warning: {file_path}")
        return True
    except Exception as e:
        print(f"Audio playback failed: {e}")
        return False

def get_random_voice_clip():
    """Get a random voice clip from the voice_clips directory"""
    try:
        voice_clips_dir = "voice_clips"
        if not os.path.exists(voice_clips_dir):
            return None, 5  # Default 5 second duration
            
        # Get all mp3 files
        mp3_files = [f for f in os.listdir(voice_clips_dir) if f.endswith('.mp3')]
        
        if not mp3_files:
            return None, 5
            
        # Pick a random file
        random_file = random.choice(mp3_files)
        file_path = os.path.join(voice_clips_dir, random_file)
        
        return file_path, 3  # Assume 3 second duration for simplicity
        
    except Exception as e:
        print(f"Error getting voice clip: {e}")
        return None, 5

def get_audio_length_simple(file_path):
    """Simple audio length estimation"""
    return 3  # Default to 3 seconds for existing clips

# Initialize audio on import
AUDIO_AVAILABLE = init_audio()
