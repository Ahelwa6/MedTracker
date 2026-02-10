# 💊 MedTrack - Smart Medication Management

A comprehensive web application for managing medications, checking drug interactions, and organizing daily medication schedules. Built with React, Tailwind CSS, and backed by medical databases.

## ✨ Features

### 🏥 Core Functionality
- **Medication Management**: Add, track, and manage all your medications in one place
- **Drug Interaction Checker**: Automated safety checks using FDA and NIH data
- **Smart Scheduling**: Optimized medication timing based on:
  - Food requirements (with/without meals)
  - Interaction spacing (e.g., magnesium 2+ hours from other meds)
  - Optimal time of day (morning/afternoon/evening/night)
- **User Profiles**: Personalized recommendations based on health conditions
- **Safety Warnings**: Color-coded alerts for interaction severity

### 🎨 Design Features
- Clean, calming UI designed for healthcare
- Smooth animations with Framer Motion
- Responsive design (mobile, tablet, desktop)
- Accessible color palette (WCAG compliant)
- Persistent storage (data saved locally)

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ and npm

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/medtrack-app.git
cd medtrack-app
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser to `http://localhost:3000`

## 📦 Build for Production

```bash
npm run build
```

The production-ready files will be in the `dist/` directory.

## 🛠️ Tech Stack

- **Frontend Framework**: React 18
- **Styling**: Tailwind CSS
- **State Management**: Zustand (with persist middleware)
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Date Handling**: date-fns
- **Build Tool**: Vite

## 📁 Project Structure

```
medtrack-app/
├── src/
│   ├── components/          # React components
│   │   ├── Dashboard.jsx    # Main dashboard
│   │   ├── Header.jsx       # Navigation header
│   │   ├── Welcome.jsx      # Welcome screen
│   │   ├── UserProfile.jsx  # User profile form
│   │   ├── MedicationList.jsx
│   │   ├── AddMedication.jsx
│   │   ├── Schedule.jsx     # Daily schedule view
│   │   └── InteractionChecker.jsx
│   ├── store/
│   │   └── medicationStore.js  # Zustand store
│   ├── data/
│   │   └── medicationDatabase.js  # Drug data & interactions
│   ├── App.jsx              # Main app component
│   ├── main.jsx             # Entry point
│   └── index.css            # Global styles
├── public/                  # Static assets
├── index.html
├── package.json
├── tailwind.config.js
├── vite.config.js
└── README.md
```

## 🔧 Key Components

### Medication Database
Located in `src/data/medicationDatabase.js`, this contains:
- Medication information (dosages, timing, food requirements)
- Drug interaction data
- Scheduling algorithms
- FDA/NIH source references

### State Management
Uses Zustand with local storage persistence:
- User profile data
- Medication list
- Generated schedule
- Detected interactions

### Interaction Checker
Automatically checks for:
- Drug-drug interactions
- Timing conflicts
- Food requirement conflicts
- Severity levels (minor, moderate, severe)

## 🎯 Roadmap

### Planned Features
- [ ] Push notification reminders
- [ ] API integration with real-time drug databases
- [ ] Export medication list (PDF, CSV)
- [ ] Medication history tracking
- [ ] Refill reminders
- [ ] Doctor appointment integration
- [ ] Family member profiles
- [ ] Dark mode
- [ ] Multi-language support

### Future Enhancements
- [ ] Integration with pharmacy APIs
- [ ] Barcode scanning for adding medications
- [ ] Health metrics tracking (blood pressure, glucose, etc.)
- [ ] Lifestyle recommendations (exercise, diet)
- [ ] Symptom tracker
- [ ] Medical records storage
- [ ] HIPAA compliance features (for healthcare providers)

## 📱 Usage Examples

### For PCOS Management
Example medications:
- Metformin 750mg (twice daily, with food)
- Inositol 2000mg (twice daily)
- Magnesium 400mg (bedtime, spaced from other meds)
- Multivitamin (morning, with food)
- Apple Cider Vinegar (morning, with food)

The app will:
1. ✅ Check for interactions (e.g., metformin + ACV both lower blood sugar)
2. 📅 Create optimal schedule with proper spacing
3. 🍽️ Note food requirements for each medication
4. ⚠️ Warn about potential issues

## ⚠️ Important Disclaimers

**Medical Disclaimer**: This application is for informational purposes only and is NOT a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding medications or medical conditions.

**Data Sources**: Drug interaction data is based on FDA and NIH databases, but may not be comprehensive. Always consult your healthcare provider and pharmacist about your specific medications.

**Liability**: The developers of this application are not responsible for any medical decisions made based on information provided by this app.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- FDA OpenFDA API for drug data
- NIH/NLM for medical databases
- Medical professionals who reviewed the interaction data
- Open source community for amazing tools

## 📧 Contact

For questions or suggestions, please open an issue on GitHub.

---

**Note**: Remember to always consult healthcare professionals for medical advice. This app is a tool to help organize and track medications, not a replacement for professional care.
