import cv2
from deepface import DeepFace
    
faceCascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')
eyeCascade = cv2.CascadeClassifier(cv2.data.haarcascades +'haarcascade_eye.xml')
cap = cv2.VideoCapture(-1)

while True:
    res, frame = cap.read()
    result = DeepFace.analyze(frame,actions = ['emotion'])
    emotions = result['emotion']
    print(emotions)
    _, img = cap.read()
    #result = DeepFace.analyze(frame,actions = ['emotion'])
    #emotions = result['emotion']
    #print(emotions)
    # Lie detection below
    """
    lie = emotions['angry'] + emotions['disgust'] + emotions['fear'] + emotions['sad']
    truth = emotions['happy'] + emotions['surprise'] + emotions['neutral']
    if lie > truth:
        text = "Truth"
    else:
        text = "Stop lying to me you asshole"
    cv2.putText(img, text, (50,50), font, 3, (255,0,0), 2, cv2.LINE_4)
    """
    faces = faceCascade.detectMultiScale(gray, 1.1, 4)
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    for(x, y, w, h) in faces:
        cv2.rectangle(img, (x, y), (x+w, y+h), (255, 0, 0), 2)
        face = frame[y: y+h, x: x+w]
        eyes = eyeCascade.detectMultiScale(gray)
        eyes_open = 0
        for (ex, ey, ew, eh) in eyes:
            cv2.rectangle(img, (ex, ey), (ex + ew, ey + eh), (255, 0, 0), 2)
            eyes_open += 1
    # If eyes_open < 2, sleeping (pay attention)
    # If faces = None, not looking (go look)
    # Else, get emotion and check
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

cap.release()
cv2.destroyAllWindows()

