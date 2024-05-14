# StudySnitch

## General Demo
https://devpost.com/software/asianparent

## Kintone
https://jerry2351.kintone.com/k/admin/preview/1/

(View Kintone App on Demo)

## Inspiration

In our digital age, time has become the ultimate luxury. With countless distractions in our lives, we strive to become the best versions of ourselves, but are bogged down by the sheer amount of distractions and issues in our lives. We wanted to create an application that would help us concentrate on our daily tasks so that we can enjoy the time we have in life to not procrastinate and stress. 

## What it does

Introducing StudySnitch, the ultimate tool for optimizing your daily activities. StudySnitch uses extreme methods to keep you accountable when performing your tasks, and makes sure you are staying on track with everything that you should be doing. If you are not paying attention to the screen or wandering off to the depths of TikTok, StudySnitch will remind you kindly, and then not so kindly using text-to-speech, to get back to work and finish off your tasks. You have a roadmap and analytics page that will break down the tasks you are doing, and how well you are doing them. 

## How we built it

To build StudySnitch, we used Next.JS and Vite for our frontend components, using Three.JS and CSS animations to improve the latency and responsiveness of our user interface. In the backend, we used OpenCV and FastAPI to create REST API endpoints, calling them from the frontend using requests. We also used ElevenLabs for TTS, Streamlit and Taipy for dashboards, Kintone for creating a dynamic backend for recording tasks, and Redis Cloud and Google Cloud for our database and Cloud OCR provider, respectively. We built a chrome extension, a full stack web application, and a machine learning pipeline, in order to build a full set of tools for productivity success! 

## Challenges we ran into

We ran into issues integrating the full stack pipeline together, which ended up being solved using Redis Cloud and syncing the database at each tick. We also learned a lot about CSS animations and how we can trigger TTS and keyframes within the code, leading to remote triggers of backend functions with the REST API. It was also our first time working with Streamlit and Taipy analytics dashboards, so dealing with Streamlit connectivity was also tricky. 

## Accomplishments that we're proud of

We are proud of building a project in 24 hours that works well and can help us study and keep us accountable. We’re proud of learning so many technologies in a short period of time. 

## What we learned

We learned about how to connect the frontend and backend, how to track data with chrome extensions, writing analytics dashboards, facial and eye tracking, and so much more! 

## What's next for StudySnitch

In the future, StudySnitch will be improved to have even more machine learning features, better analytics, a fully gamified system, and a mobile application so it can track your phone choices as well. 
