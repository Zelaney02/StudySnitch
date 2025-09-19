# 🎯 StudySnitch - Complete Setup Guide

## 🚀 Quick Start (All Components)

### 1. ML Camera System ✅ RUNNING

- **Status**: Active and monitoring attention
- **Features**: Face detection, attention tracking, audio warnings
- **Terminal**: Running in background

### 2. Analytics Dashboard ✅ RUNNING

- **URL**: http://localhost:8502
- **Features**: Real-time attention metrics, charts, statistics
- **Usage**: Open in browser to view your study analytics

### 3. Chrome Extension Setup (Manual)

**Steps:**

1. Open Chrome → `chrome://extensions/`
2. Enable "Developer mode" (top right toggle)
3. Click "Load unpacked"
4. Select folder: `StudySnitch/chrome-extension`
5. Right-click extension → Options
6. Enter your OpenAI API key
7. Save settings

**Extension Features:**

- Monitors browser tabs for study content
- Uses AI to detect study-related material
- Closes non-study tabs automatically

## 🔗 Integration Flow

```
Camera (ml.py) → Face Detection → Attention Data → Storage
                                                      ↓
Browser Extension → Tab Analysis → Study Detection → Storage
                                                      ↓
Analytics Dashboard ← Real-time Data ← Storage System
```

## 📊 What You'll See

### Dashboard (http://localhost:8502)

- User attention statistics
- Study session duration charts
- Inattention incident counter
- Real-time monitoring status

### Chrome Extension

- Automatic tab monitoring
- Study content verification
- Non-study tab closure
- Seamless background operation

### ML Camera

- Live face detection overlay
- Attention status indicators
- Audio warning system
- Console attention alerts

## 🎮 How to Use StudySnitch

1. **Start studying** with camera visible
2. **Open study materials** in Chrome tabs
3. **Monitor progress** on dashboard
4. **Stay focused** - StudySnitch will alert you!

## 🛠 Troubleshooting

- **Camera not working**: Check permissions and camera access
- **Extension not loading**: Ensure Developer mode is enabled
- **Dashboard not showing data**: Refresh page, check storage system
- **Audio not playing**: Check volume settings and audio permissions

## 🔧 Advanced Configuration

### Custom Audio Warnings

- Add MP3 files to `voice_clips/` directory
- Name them `output_X.mp3` (where X is a number)
- Restart ML system to detect new files

### Attention Sensitivity

- Modify timing thresholds in `ml.py`
- Adjust face detection parameters
- Customize warning intervals

---

**StudySnitch**: Your AI-powered study accountability partner! 🤖📚
