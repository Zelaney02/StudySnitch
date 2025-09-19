# 🧪 StudySnitch Testing Guide

## ✅ **System Status Check**

### Backend Services Status:

- 🟢 **Extension Proxy**: Running on http://localhost:5001
- 🟢 **ML Camera System**: Running on http://localhost:8501
- 🟢 **Analytics Dashboard**: Running on http://localhost:8502

---

## 🔍 **Testing Steps**

### **1. Backend Services Test**

#### Test Extension Proxy:

```bash
# Open in browser or use curl:
http://localhost:5001/health
# Should return: {"service":"StudySnitch Proxy","status":"healthy"}
```

#### Test ML Camera:

```bash
# Open in browser:
http://localhost:8501
# Should show: Face detection interface with camera feed
```

#### Test Analytics Dashboard:

```bash
# Open in browser:
http://localhost:8502
# Should show: StudySnitch Analytics with charts and statistics
```

---

### **2. Chrome Extension Test**

#### Load Extension:

1. Open Chrome → `chrome://extensions/`
2. Enable "Developer mode" (top-right toggle)
3. Click "Load unpacked"
4. Select: `StudySnitch/chrome-extension` folder
5. ✅ Extension should load without errors

#### Test Extension Popup:

1. Click StudySnitch icon in Chrome toolbar
2. ✅ Should see modern purple gradient interface
3. ✅ No console errors (F12 → Console tab)
4. ✅ Timer interface should be visible

#### Test Camera Monitor:

1. In extension popup → Click "Self Monitor"
2. Click "Open Camera Monitor"
3. ✅ Should open new tab with enhanced monitor interface
4. ✅ Buttons should show system status (🟢 green = ready, 🔴 red = offline)

---

### **3. Functionality Tests**

#### Test Pomodoro Timer:

1. Extension popup → "Setup Session"
2. Select study subject (e.g., "Mathematics")
3. Set timer duration
4. Click "Save Session"
5. ✅ Timer should start counting down
6. ✅ Extension should monitor tabs based on subject

#### Test Tab Monitoring:

1. Set study subject in extension
2. Open study-related tabs (e.g., Khan Academy for Math)
3. Open non-study tabs (e.g., YouTube, Social Media)
4. ✅ Extension should identify and potentially close non-study tabs

#### Test Camera System:

1. Camera Monitor → "Start ML Camera System"
2. ✅ Should open OpenCV window with face detection
3. ✅ Green rectangles around detected faces
4. ✅ "paying attention" / "not paying attention" text overlay
5. ✅ Audio alerts when not paying attention

#### Test Analytics:

1. Camera Monitor → "Open Analytics Dashboard"
2. ✅ Should show Streamlit interface
3. ✅ Display attention statistics
4. ✅ Show charts and metrics

---

### **4. Error Testing**

#### CSP Compliance Check:

1. Open extension popup
2. Open Camera Monitor
3. Press F12 → Console tab
4. ✅ Should see NO "Content Security Policy" errors
5. ✅ Should see NO "inline script" violations

#### Integration Test:

1. Run all three services simultaneously
2. Use extension while camera system is active
3. ✅ Statistics should update in analytics dashboard
4. ✅ Extension should respond to attention data

---

### **5. Visual Verification**

#### Extension Appearance:

- ✅ Purple gradient background
- ✅ Glassmorphism cards with blur effects
- ✅ Professional timer interface
- ✅ Proper navigation between pages

#### Camera Monitor Appearance:

- ✅ Enhanced UI matching extension style
- ✅ Real-time status indicators
- ✅ Statistics dashboard with metrics
- ✅ Animated status lights

#### System Integration:

- ✅ All services communicate properly
- ✅ Data flows between components
- ✅ Real-time updates working

---

## 🚨 **Common Issues & Solutions**

### Issue: Extension won't load

**Solution**: Check for CSP violations in console, ensure no inline scripts

### Issue: Backend services not connecting

**Solution**: Verify ports 5001, 8501, 8502 are not blocked by firewall

### Issue: Camera not working

**Solution**: Check camera permissions, ensure OpenCV installed

### Issue: Analytics not updating

**Solution**: Verify storage system working, check simple_storage.py

---

## 📊 **Success Criteria**

✅ All backend services running without errors
✅ Chrome extension loads cleanly (no CSP violations)
✅ Pomodoro timer functions correctly
✅ Tab monitoring identifies study vs non-study content
✅ Camera system detects attention levels
✅ Analytics dashboard shows real-time data
✅ All UI components have professional appearance
✅ System integration working end-to-end

---

## 🎯 **Final Test Scenario**

1. **Start Study Session**: Set subject to "Linear Algebra" in extension
2. **Begin Timer**: Start 25-minute Pomodoro session
3. **Open Study Tab**: Navigate to Khan Academy Linear Algebra
4. **Start Camera**: Launch ML camera system from monitor
5. **Test Distraction**: Open YouTube in new tab
6. **Verify Response**: Extension should detect non-study content
7. **Check Analytics**: View real-time statistics in dashboard
8. **Complete Cycle**: Let timer complete full focus/break cycle

**Expected Result**: Seamless operation with all components working together!

---

_Last Updated: September 19, 2025_
_StudySnitch Version: 2.0_
