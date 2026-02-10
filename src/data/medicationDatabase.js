// Comprehensive medication database with interaction data
// Data sourced from FDA, NIH, and medical literature

export const MEDICATIONS_DATABASE = {
  metformin: {
    name: 'Metformin',
    genericName: 'Metformin',
    type: 'prescription',
    category: 'Antidiabetic',
    commonDosages: ['500mg', '750mg', '850mg', '1000mg'],
    timing: {
      withFood: true,
      timeOfDay: ['morning', 'evening'],
      spacing: null,
      avoidWith: [],
    },
    notes: 'Take with meals to reduce GI side effects. Common for PCOS and type 2 diabetes.',
    sideEffects: ['Nausea', 'Diarrhea', 'Stomach upset'],
    sources: ['FDA', 'NIH'],
  },
  inositol: {
    name: 'Inositol (Myo-Inositol)',
    genericName: 'Myo-Inositol',
    type: 'supplement',
    category: 'Supplement',
    commonDosages: ['2000mg', '4000mg'],
    timing: {
      withFood: false,
      timeOfDay: ['morning', 'evening'],
      spacing: null,
      avoidWith: [],
    },
    notes: 'Often used for PCOS. Can be taken twice daily. May improve insulin sensitivity.',
    sideEffects: ['Mild nausea', 'Tiredness'],
    sources: ['NIH', 'Clinical Studies'],
  },
  magnesium: {
    name: 'Magnesium',
    genericName: 'Magnesium Supplement',
    type: 'supplement',
    category: 'Mineral Supplement',
    commonDosages: ['200mg', '250mg', '400mg'],
    timing: {
      withFood: true,
      timeOfDay: ['evening'],
      spacing: 2, // hours to space from other medications
      avoidWith: ['antibiotics', 'bisphosphonates'],
    },
    notes: 'Best taken at night. Space 2+ hours from other medications for optimal absorption.',
    sideEffects: ['Diarrhea (if too high dose)', 'Stomach upset'],
    sources: ['NIH', 'FDA'],
  },
  multivitamin: {
    name: 'Multivitamin',
    genericName: 'Multivitamin Complex',
    type: 'supplement',
    category: 'Vitamin Supplement',
    commonDosages: ['1 tablet', '1 capsule'],
    timing: {
      withFood: true,
      timeOfDay: ['morning'],
      spacing: null,
      avoidWith: [],
    },
    notes: 'Take with food containing some fat for better absorption of fat-soluble vitamins.',
    sideEffects: ['Mild stomach upset', 'Nausea'],
    sources: ['NIH'],
  },
  appleCiderVinegar: {
    name: 'Apple Cider Vinegar',
    genericName: 'Apple Cider Vinegar',
    type: 'supplement',
    category: 'Supplement',
    commonDosages: ['500mg', '1000mg'],
    timing: {
      withFood: true,
      timeOfDay: ['morning'],
      spacing: null,
      avoidWith: [],
    },
    notes: 'Often taken before meals. May help with blood sugar control.',
    sideEffects: ['Throat irritation', 'Low potassium (with prolonged use)'],
    sources: ['Clinical Studies'],
  },
};

// Drug interaction database
export const DRUG_INTERACTIONS = [
  {
    drug1: 'metformin',
    drug2: 'appleCiderVinegar',
    severity: 'moderate',
    type: 'additive',
    description: 'Both may lower blood sugar. Monitor glucose levels carefully.',
    recommendation: 'Space doses and monitor blood sugar. Consult doctor if experiencing hypoglycemia.',
    sources: ['Clinical Studies'],
  },
  {
    drug1: 'magnesium',
    drug2: 'metformin',
    severity: 'minor',
    type: 'absorption',
    description: 'Magnesium may slightly affect metformin absorption.',
    recommendation: 'Take at different times of day (e.g., metformin morning/evening, magnesium at night).',
    sources: ['NIH'],
  },
];

// Function to check interactions
export const checkInteractions = (medications) => {
  const interactions = [];
  
  for (let i = 0; i < medications.length; i++) {
    for (let j = i + 1; j < medications.length; j++) {
      const med1 = medications[i].medicationId;
      const med2 = medications[j].medicationId;
      
      const interaction = DRUG_INTERACTIONS.find(
        (int) =>
          (int.drug1 === med1 && int.drug2 === med2) ||
          (int.drug1 === med2 && int.drug2 === med1)
      );
      
      if (interaction) {
        interactions.push({
          ...interaction,
          med1Name: MEDICATIONS_DATABASE[med1]?.name || med1,
          med2Name: MEDICATIONS_DATABASE[med2]?.name || med2,
        });
      }
    }
  }
  
  return interactions;
};

// Generate optimal schedule based on medication requirements
export const generateSchedule = (medications) => {
  const schedule = {
    morning: [],
    afternoon: [],
    evening: [],
    night: [],
  };
  
  medications.forEach((med) => {
    const medInfo = MEDICATIONS_DATABASE[med.medicationId];
    if (!medInfo) return;
    
    const timing = medInfo.timing;
    
    // Assign to time slots based on timing preferences
    if (timing.timeOfDay.includes('morning')) {
      schedule.morning.push({
        ...med,
        info: medInfo,
        time: '8:00 AM',
        withFood: timing.withFood,
      });
    }
    
    if (timing.timeOfDay.includes('afternoon')) {
      schedule.afternoon.push({
        ...med,
        info: medInfo,
        time: '2:00 PM',
        withFood: timing.withFood,
      });
    }
    
    if (timing.timeOfDay.includes('evening')) {
      // If also taken in morning, add to evening
      if (timing.timeOfDay.includes('morning') && !timing.timeOfDay.includes('afternoon')) {
        schedule.evening.push({
          ...med,
          info: medInfo,
          time: '6:00 PM',
          withFood: timing.withFood,
        });
      }
    }
    
    // Medications that need spacing or nighttime (like magnesium)
    if (timing.spacing || timing.timeOfDay.includes('night') || 
        (timing.timeOfDay.includes('evening') && !timing.timeOfDay.includes('morning'))) {
      schedule.night.push({
        ...med,
        info: medInfo,
        time: '10:00 PM',
        withFood: timing.withFood,
      });
    }
  });
  
  return schedule;
};

// Get medication by ID
export const getMedication = (medicationId) => {
  return MEDICATIONS_DATABASE[medicationId] || null;
};

// List all available medications
export const getAllMedications = () => {
  return Object.keys(MEDICATIONS_DATABASE).map((key) => ({
    id: key,
    ...MEDICATIONS_DATABASE[key],
  }));
};
