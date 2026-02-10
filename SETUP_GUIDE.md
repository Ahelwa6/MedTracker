# 🚀 MedTrack Setup Guide

Complete step-by-step guide to set up and run your MedTrack application.

## Prerequisites

Before you begin, make sure you have:
- **Node.js** (version 16 or higher) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js)
- **Git** (for version control) - [Download here](https://git-scm.com/)
- A code editor (VS Code recommended)

### Check Your Installation

Open your terminal and run:
```bash
node --version  # Should show v16 or higher
npm --version   # Should show 7 or higher
```

## Step 1: Project Setup

### Clone or Download
If you're using Git:
```bash
git clone https://github.com/yourusername/medtrack-app.git
cd medtrack-app
```

Or if you downloaded the ZIP file:
```bash
# Extract the ZIP file
cd medtrack-app
```

## Step 2: Install Dependencies

Run this command in the project directory:
```bash
npm install
```

This will install all required packages:
- React
- Tailwind CSS
- Zustand (state management)
- Framer Motion (animations)
- Lucide React (icons)
- date-fns (date utilities)
- Vite (build tool)

**Wait time**: ~2-3 minutes depending on your internet connection

## Step 3: Start Development Server

```bash
npm run dev
```

You should see output like:
```
VITE v5.0.8  ready in 500 ms

➜  Local:   http://localhost:3000/
➜  Network: use --host to expose
```

## Step 4: Open in Browser

Open your browser and navigate to:
```
http://localhost:3000
```

You should see the MedTrack welcome screen! 🎉

## Step 5: Test the Application

### First-Time Setup Flow:
1. Click "Get Started" on welcome screen
2. Fill in your profile:
   - Name
   - Age (optional)
   - Medical conditions (e.g., PCOS)
   - Allergies (if any)
3. Click "Save Profile & Continue"

### Add Your First Medication:
1. Click "Add Medication"
2. Search for a medication (e.g., "Metformin")
3. Select it from the list
4. Choose dosage
5. Set frequency
6. Add personal notes (optional)
7. Click "Add Medication"

### Explore Features:
- **Dashboard**: Overview of your medications and alerts
- **Medications**: Full list of your medications
- **Schedule**: Daily schedule with optimal timing
- **Interactions**: Check for drug interactions
- **Profile**: Update your health information

## Development Commands

### Start Development Server
```bash
npm run dev
```

### Build for Production
```bash
npm run build
```
Output will be in `dist/` folder

### Preview Production Build
```bash
npm run preview
```

### Lint Code
```bash
npm run lint
```

## Project Structure Overview

```
medtrack-app/
├── src/
│   ├── components/       # All React components
│   ├── store/           # State management (Zustand)
│   ├── data/            # Medication database
│   ├── App.jsx          # Main app
│   ├── main.jsx         # Entry point
│   └── index.css        # Global styles
├── public/              # Static files
├── index.html           # HTML template
├── package.json         # Dependencies
├── tailwind.config.js   # Tailwind config
└── vite.config.js       # Vite config
```

## Troubleshooting

### Port 3000 Already in Use
If port 3000 is taken:
```bash
# Kill the process using port 3000
# On Mac/Linux:
lsof -ti:3000 | xargs kill -9

# On Windows:
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

Or change the port in `vite.config.js`:
```js
server: {
  port: 3001,  // Use a different port
}
```

### Module Not Found Errors
Try:
```bash
rm -rf node_modules package-lock.json
npm install
```

### Styling Not Working
Make sure Tailwind is installed:
```bash
npm install -D tailwindcss postcss autoprefixer
```

### Build Fails
Clear cache and rebuild:
```bash
rm -rf dist
npm run build
```

## Customization

### Change Colors
Edit `tailwind.config.js`:
```js
theme: {
  extend: {
    colors: {
      primary: {
        // Your custom colors here
      }
    }
  }
}
```

### Add More Medications
Edit `src/data/medicationDatabase.js` to add medications to the database.

### Modify Schedule Times
Update the time slots in `src/components/Schedule.jsx`.

## Deployment

### Deploy to Vercel (Recommended)
1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your repository
4. Vercel will auto-detect Vite
5. Click "Deploy"

### Deploy to Netlify
1. Run `npm run build`
2. Go to [netlify.com](https://netlify.com)
3. Drag `dist/` folder to deploy

### Deploy to GitHub Pages
```bash
npm install -D gh-pages

# Add to package.json scripts:
"deploy": "npm run build && gh-pages -d dist"

# Run:
npm run deploy
```

## GitHub Setup

### Initialize Git Repository
```bash
git init
git add .
git commit -m "Initial commit: MedTrack app"
```

### Create GitHub Repository
1. Go to [github.com](https://github.com)
2. Click "New Repository"
3. Name it "medtrack-app"
4. Don't initialize with README (we already have one)
5. Click "Create repository"

### Push to GitHub
```bash
git remote add origin https://github.com/yourusername/medtrack-app.git
git branch -M main
git push -u origin main
```

## Next Steps

1. **Add Real API Integration**
   - FDA OpenFDA API
   - RxNorm API
   - DrugBank API

2. **Add More Features**
   - Push notifications
   - PDF export
   - Medication reminders

3. **Improve UI**
   - Dark mode
   - Custom themes
   - Accessibility improvements

4. **Testing**
   - Add unit tests (Jest)
   - Add E2E tests (Playwright)

## Getting Help

- 📖 Read the [README.md](README.md) for full documentation
- 🐛 Found a bug? Open an issue on GitHub
- 💡 Have a feature request? Create a discussion
- 📧 Need help? Check the troubleshooting section

## Resources

- [React Documentation](https://react.dev)
- [Tailwind CSS Docs](https://tailwindcss.com)
- [Zustand Guide](https://github.com/pmndrs/zustand)
- [Framer Motion](https://www.framer.com/motion/)
- [FDA OpenFDA](https://open.fda.gov/)

---

🎉 **You're all set!** Enjoy using MedTrack to manage your medications safely and efficiently.

Remember: This app is for informational purposes only. Always consult healthcare professionals for medical advice.
