import cv2
import PIL
from PIL import Image
import os
import datetime
import random
from simple_storage import storage as r
from simple_audio import get_random_voice_clip, play_simple_audio, AUDIO_AVAILABLE



face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')

cap = cv2.VideoCapture(0)

# Check if camera is available
if not cap.isOpened():
    print("Error: Could not open camera")
    print("Make sure your camera is connected and not being used by another application")
    exit()

print("StudySnitch ML Camera started successfully!")
print("Press 'q' to quit, or Ctrl+C to stop")

status = 2
last_warned = datetime.datetime.now()

# Initialize transition time variables
attention_transition_start = None
no_attention_transition_start = None

# Initialize count variable  
count = 0

NUM_CLIPS = 20
def get_voice_clip():
    return get_random_voice_clip()  # Use the new simple audio function

try:
    while True:
        cur_time = datetime.datetime.now()
        
        # Read the frame
        _, img = cap.read()

        # Convert to grayscale
        gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

        # Detect the faces
        faces = face_cascade.detectMultiScale(gray, 1.1, 4)

        # Draw the rectangle around each face
        # status: 0 = not, 1 = +transition, 2 = yes, 3 = -transition
        
        paying_attention = False
        for (x, y, w, h) in faces:
            paying_attention = True
            if status == 0:
                # start attention transition
                attention_transition_start = datetime.datetime.now()
                status = 1
            elif w * h > 50000 and status == 3:
                # stop no attention transition
                status = 2
                no_attention_transition_start = None
            
            
            cv2.rectangle(img, (x, y), (x+w, y+h), (0, 255, 0), 6)
            cv2.putText(img, "paying attention", (x, y-10), cv2.FONT_HERSHEY_SIMPLEX, 2, (0, 255, 0), 6)
        
        
        
        if not paying_attention:
            if status == 2:
                # start no attention transition
                no_attention_transition_start = cur_time
                status = 3
            elif status == 1:
                # stop attention transition
                status = 0
                attention_transition_start = None
        
        if status == 3 and no_attention_transition_start and (cur_time - no_attention_transition_start).total_seconds() > 5:
            status = 0
            bad_count = r.get('bad')
            if bad_count is None:
                bad_count = 0
            else:
                bad_count = int(str(bad_count))
            r.set('bad', str(bad_count + 1))
        elif status == 1 and attention_transition_start and (cur_time - attention_transition_start).total_seconds() > 3:
            status = 2
        
        if status == 1 and attention_transition_start:
            cv2.putText(img, f"{3 - (cur_time - attention_transition_start).total_seconds():.2f}", (30, 60), cv2.FONT_HERSHEY_SIMPLEX, 2, (0, 255, 0), 6)
        elif status == 3 and no_attention_transition_start:
            cv2.putText(img, f"{5 -(cur_time - no_attention_transition_start).total_seconds():.2f}", (30, 60), cv2.FONT_HERSHEY_SIMPLEX, 2, (0, 0, 255), 6)
        elif status == 0:
            cv2.putText(img, "not paying attention", (30, 60), cv2.FONT_HERSHEY_SIMPLEX, 2, (0, 0, 255), 6)
            # Audio warning system
            if (cur_time - last_warned).total_seconds() > 10:  # Wait 10 seconds between warnings
                print("⚠️  NOT PAYING ATTENTION! ⚠️")
                
                if AUDIO_AVAILABLE:
                    file_path, audio_length = get_voice_clip()
                    if file_path:
                        success = play_simple_audio(file_path)
                        if success:
                            print("🔊 Audio warning played successfully")
                        else:
                            print("🔇 Audio warning failed to play")
                    else:
                        print("🔇 No audio files available")
                else:
                    print("🔇 Audio system not available")
                    
                last_warned = cur_time
            
            

        # Display the video (optional - comment out if GUI not available)
        try:
            cv2.imshow('Face Detection', img)
            # Stop if the user presses 'q'
            if cv2.waitKey(1) & 0xFF == ord('q'):
                break
        except cv2.error as e:
            # GUI display not available, run in headless mode
            print(f"Status: {status}, Faces detected: {len(faces)}, Paying attention: {paying_attention}")
            if cv2.waitKey(1) & 0xFF == ord('q'):
                break

except KeyboardInterrupt:
    print("\nStudySnitch stopped by user")
except Exception as e:
    print(f"Error: {e}")
finally:
    # Release the video capture object
    cap.release()
    cv2.destroyAllWindows()
    print("Camera released, StudySnitch stopped")
