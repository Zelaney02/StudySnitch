import tts
import random
import os

voice_lines = [
    "Get back to work you absolute imbecile! God damn it! You stupid buffoon!",
    "What are you doing? Get your head out of the clouds and back to the bloody work!",
    "This isn't a vacation! Move it! Time's ticking!",
    "Oi! Stop dawdling and get on with it!",
    "Do you think successful people got where they are by daydreaming? Back to work!",
    "Wake up! You've got things to do, and they won't do themselves!",
    "For heaven's sake, stop wasting precious time and put some effort into it!",
    "I've seen snails work faster than you right now! Get to it!",
    "If you spent as much time working as you do dilly-dallying, you'd be done by now!",
    "Enough with the distractions! Do you want success or not?",
    "Every second you waste, someone else is outworking you! Now, snap out of it and get back to it!",
    "Honestly! It's like you're looking for an excuse to fail. Stop procrastinating and get on with it!",
    "Do you want to be average? Because that's where you're heading with this attitude. Pull yourself together!",
    "I've seen glaciers move faster! Pick up the pace!",
    "Stop twiddling your thumbs and start producing results!",
    "If laziness was a competition, you'd win gold. Now prove me wrong and get back to work!",
    "I've had enough of your daydreaming! Show me what you're made of!",
    "What are you waiting for? An invitation? This isn't a tea party, it's your future!",
    "You've got potential, but potential means nothing if you're wasting time!",
    "I don't have time for half-hearted attempts. Either give it your all or go home!",
    "You think you're tired now? Imagine how tired you'll be of mediocrity if you keep this up. Move it!"
]

for i in range(0, len(voice_lines)):
    print(os.getcwd())
    file_path = "voice_clips/output_{}.mp3".format(i)
    ramsay_tts = tts.TTS_Request(voice="gordan_ramsay", text=voice_lines[i])
    if not os.path.exists(file_path):
        tts.get_tts(ramsay_tts, file_path)