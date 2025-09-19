# 📚 StudySnitch

## 🌟 Inspiration
In a world full of endless distractions, staying focused has become harder than ever. Between social media, notifications, and procrastination temptations, productivity often suffers. I wanted to create a tool that doesn’t just block distractions, but actively holds me accountable — so I can spend more time achieving my goals and less time stressing about wasted hours.

## 🚀 What it Does
StudySnitch is my personal accountability partner for studying and productivity.

- 🖥️ Face and attention tracking with computer vision to check if I’m focused on my screen  
- 🔊 Smart reminders that escalate to text-to-speech if I drift off task  
- 📊 Analytics dashboard that tracks my study habits and performance trends  
- 🌐 Chrome extension that monitors browser activity to catch distractions  
- 🛠️ Task management features like roadmaps and progress tracking  

## 🛠️ How I Built It
- **Frontend**: Next.js and Vite, with Three.js and CSS animations for responsiveness  
- **Backend**: FastAPI with OpenCV for face detection and attention tracking  
- **Voice Interaction**: ElevenLabs text-to-speech for reminders  
- **Dashboards**: Streamlit and Taipy for real-time analytics and visualization  
- **Infrastructure**: Redis Cloud for syncing, Google Cloud OCR for text processing, and Kintone for task management  
- **Extension**: Custom Chrome extension integrated with backend APIs  

## 🧩 Challenges I Faced
- Integrating frontend, backend, ML pipeline, and Chrome extension into a seamless workflow  
- Syncing data reliably across services, which I solved with Redis Cloud  
- Learning Streamlit and Taipy for dashboards under tight time constraints  
- Handling cross-platform text-to-speech triggers with REST APIs  

## 🏆 Accomplishments
- Built a fully working prototype in just 24 hours  
- Integrated frontend, backend, ML, and browser extension into one cohesive product  
- Picked up and applied many new technologies quickly  
- Delivered a tool that genuinely helps reduce stress and improve productivity  

## 📚 What I Learned
- How to connect ML with real-time web applications  
- Building Chrome extensions that communicate with a full-stack backend  
- Creating dashboards that make productivity data actionable  
- Implementing facial and eye tracking with OpenCV  

## 🔮 What’s Next
- More advanced ML features for productivity pattern detection  
- Gamification to make focus more engaging  
- A mobile app to track phone usage as well as desktop activity  
- Improved analytics for deeper insights into study habits  

## 📸 Screenshots
<p align="center">
  <img src="https://github.com/user-attachments/assets/61ff993e-1216-4bb4-b70f-ad7c01e12528" alt="screenshot 1" width="300"/>
  <img src="https://github.com/user-attachments/assets/1defa56a-96ee-4d89-a6cc-24f1144241b8" alt="screenshot 2" width="300"/>
  <img src="https://github.com/user-attachments/assets/54467b95-82df-4661-bd2c-5b2a1dbc6f4a" alt="screenshot 3" width="300"/>
</p>

<p align="center">
  <img src="https://github.com/user-attachments/assets/44bdcc06-8d43-4266-946d-22e8555ddcef" alt="screenshot 4" width="300"/>
</p>

<p align="center">
  <img src="https://github.com/user-attachments/assets/10627d07-f0f7-4ec7-b27a-ec37d4313dbf" alt="dashboard" width="600"/>
</p>

<p align="center">
  <img src="https://github.com/user-attachments/assets/f0331d1d-9ac2-4476-90a3-d19ceafd92ae" alt="extension popup" width="600"/>
</p>
