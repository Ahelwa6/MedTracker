import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { checkInteractions, generateSchedule } from '../data/medicationDatabase';

const useMedicationStore = create(
  persist(
    (set, get) => ({
      // User profile
      userProfile: {
        name: '',
        age: '',
        weight: '',
        conditions: [],
        allergies: [],
        isPregnant: false,
        isBreastfeeding: false,
      },
      
      // User's medications
      medications: [],
      
      // Schedule
      schedule: {
        morning: [],
        afternoon: [],
        evening: [],
        night: [],
      },
      
      // Interactions
      interactions: [],
      
      // Reminders/Notifications
      reminders: [],
      
      // Actions
      setUserProfile: (profile) => set({ userProfile: profile }),
      
      addMedication: (medication) => {
        const medications = [...get().medications, medication];
        const interactions = checkInteractions(medications);
        const schedule = generateSchedule(medications);
        
        set({
          medications,
          interactions,
          schedule,
        });
      },
      
      removeMedication: (medicationId) => {
        const medications = get().medications.filter(
          (med) => med.id !== medicationId
        );
        const interactions = checkInteractions(medications);
        const schedule = generateSchedule(medications);
        
        set({
          medications,
          interactions,
          schedule,
        });
      },
      
      updateMedication: (medicationId, updates) => {
        const medications = get().medications.map((med) =>
          med.id === medicationId ? { ...med, ...updates } : med
        );
        const interactions = checkInteractions(medications);
        const schedule = generateSchedule(medications);
        
        set({
          medications,
          interactions,
          schedule,
        });
      },
      
      toggleMedicationTaken: (medicationId, timeSlot, date) => {
        const key = `${medicationId}_${timeSlot}_${date}`;
        const takenMeds = get().takenMedications || {};
        
        set({
          takenMedications: {
            ...takenMeds,
            [key]: !takenMeds[key],
          },
        });
      },
      
      addReminder: (reminder) => {
        set({
          reminders: [...get().reminders, reminder],
        });
      },
      
      removeReminder: (reminderId) => {
        set({
          reminders: get().reminders.filter((r) => r.id !== reminderId),
        });
      },
      
      clearAllData: () => {
        set({
          userProfile: {
            name: '',
            age: '',
            weight: '',
            conditions: [],
            allergies: [],
            isPregnant: false,
            isBreastfeeding: false,
          },
          medications: [],
          schedule: {
            morning: [],
            afternoon: [],
            evening: [],
            night: [],
          },
          interactions: [],
          reminders: [],
        });
      },
    }),
    {
      name: 'medtrack-storage',
    }
  )
);

export default useMedicationStore;
