# Wellness Challenge 2026 — Setup Guide

## Project Structure
```
Wellness-Challenge/
├── index.html              ← Login page
├── dashboard.html          ← User activity dashboard
├── profile.html            ← User profile + charts
├── ranking.html            ← Leaderboard
├── admin.html              ← Admin panel
├── admin-user-detail.html  ← Admin: user detail view
├── css/
│   └── style.css           ← Global design system
├── js/
│   ├── config.js           ← ⚙️ Edit this first!
│   ├── lang.js             ← TH/EN language strings
│   ├── auth.js             ← Session management
│   └── api.js              ← Google Apps Script API wrapper
└── apps-script/
    └── Code.gs             ← Google Apps Script backend
```

---

## Step 1: Create Google Sheet

1. Go to [Google Sheets](https://sheets.new) and create a new spreadsheet
2. Note the **Sheet ID** from the URL:  
   `https://docs.google.com/spreadsheets/d/YOUR_SHEET_ID/edit`

---

## Step 2: Create Google Drive Folders

Create **2 folders** in Google Drive:
- `WellnessChallenge_Profiles` — for profile pictures
- `WellnessChallenge_Evidence` — for activity evidence photos

For each folder:
1. Right-click → **Share**
2. Set to **"Anyone with the link can view"**
3. Note the **Folder ID** from the URL:  
   `https://drive.google.com/drive/folders/YOUR_FOLDER_ID`

---

## Step 3: Set Up Apps Script

1. Open your Google Sheet → **Extensions → Apps Script**
2. Paste the contents of `apps-script/Code.gs`
3. Fill in the constants at the top:
   ```javascript
   const SHEET_ID           = "YOUR_GOOGLE_SHEET_ID";
   const PROFILE_FOLDER_ID  = "YOUR_PROFILE_FOLDER_ID";
   const EVIDENCE_FOLDER_ID = "YOUR_EVIDENCE_FOLDER_ID";
   ```
4. Click **Save**
5. Run the `setupSheets()` function **once** to create sheet headers and seed accounts
   - Click the function dropdown → select `setupSheets` → click ▶ Run
   - This creates an `admin` account (password: `admin1234`) and a `demo` account

---

## Step 4: Deploy as Web App

1. Click **Deploy → New Deployment**
2. Select type: **Web app**
3. Set:
   - **Execute as**: Me
   - **Who has access**: Anyone
4. Click **Deploy**
5. Copy the **Web App URL**

---

## Step 5: Configure the Frontend

Open `js/config.js` and paste your Web App URL:

```javascript
const CONFIG = {
  APPS_SCRIPT_URL: "https://script.google.com/macros/s/AKfycbwdrnFwJOp4yCGE9YkKzH3ga1LWgANIhrQzcoe2bL-lXtr-wYxC8jSXRo0vw-gNSwjAPQ/exec",
};
```

---

## Step 6: Host on GitHub Pages

1. Push all files to a GitHub repository
2. Go to **Settings → Pages**
3. Set source to **main branch, root**
4. Your site will be at: `https://YOUR_USERNAME.github.io/YOUR_REPO/`

---

## Default Accounts (after setupSheets)

| Role  | Username | Password   |
|-------|----------|------------|
| Admin | `admin`  | `admin1234`|
| User  | `demo`   | `demo1234` |

> **Change these passwords immediately** after first login via the Admin panel.

---

## Activities & Scoring

| Activity          | Points  | Target                          |
|-------------------|---------|---------------------------------|
| No Fry, Let's Try | 10/day  | 3 days/week                     |
| Running           | 15/session | 3×/week, 10 km/week          |
| Walking           | 10/session | 3×/week, 15 km/week          |
| Step Count        | 5/day   | Office 5k / Operation 10k steps |
| Yoga & Aerobic    | 10/session | 28 sessions total            |
| Football          | 10/day  | 3 days/week                     |
| Your Design       | 10/entry | Custom challenge               |
