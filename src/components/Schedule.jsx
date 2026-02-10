import { motion } from 'framer-motion';
import { Calendar, Sun, Cloud, Moon, Sunset, Check, Coffee, Utensils } from 'lucide-react';
import useMedicationStore from '../store/medicationStore';
import { format } from 'date-fns';

const Schedule = () => {
  const { schedule, medications } = useMedicationStore();
  const today = new Date();
  
  const timeSlots = [
    {
      id: 'morning',
      label: 'Morning',
      time: '8:00 AM',
      icon: Sun,
      color: 'text-amber-600',
      bgColor: 'bg-amber-50',
      medications: schedule.morning,
    },
    {
      id: 'afternoon',
      label: 'Afternoon',
      time: '2:00 PM',
      icon: Cloud,
      color: 'text-primary-600',
      bgColor: 'bg-primary-50',
      medications: schedule.afternoon,
    },
    {
      id: 'evening',
      label: 'Evening',
      time: '6:00 PM',
      icon: Sunset,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      medications: schedule.evening,
    },
    {
      id: 'night',
      label: 'Night',
      time: '10:00 PM',
      icon: Moon,
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50',
      medications: schedule.night,
    },
  ];
  
  if (medications.length === 0) {
    return (
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card text-center py-12"
        >
          <div className="bg-sage-100 p-6 rounded-full inline-flex mb-4">
            <Calendar className="w-12 h-12 text-sage-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">No schedule yet</h3>
          <p className="text-sage-600">
            Add medications to generate your personalized schedule
          </p>
        </motion.div>
      </div>
    );
  }
  
  return (
    <div className="max-w-5xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center gap-3 mb-2">
          <div className="bg-primary-100 p-2 rounded-lg">
            <Calendar className="w-6 h-6 text-primary-600" />
          </div>
          <h2 className="text-3xl font-bold text-gray-800 font-display">Daily Schedule</h2>
        </div>
        <p className="text-sage-600 ml-14">
          {format(today, 'EEEE, MMMM d, yyyy')}
        </p>
      </motion.div>
      
      <div className="grid gap-6">
        {timeSlots.map((slot, index) => {
          const Icon = slot.icon;
          const hasMedications = slot.medications && slot.medications.length > 0;
          
          return (
            <motion.div
              key={slot.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`card ${!hasMedications ? 'opacity-50' : ''}`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`${slot.bgColor} p-2 rounded-lg`}>
                    <Icon className={`w-5 h-5 ${slot.color}`} />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">{slot.label}</h3>
                    <p className="text-sm text-sage-600">{slot.time}</p>
                  </div>
                </div>
                
                {hasMedications && (
                  <span className="badge badge-info">
                    {slot.medications.length} {slot.medications.length === 1 ? 'medication' : 'medications'}
                  </span>
                )}
              </div>
              
              {hasMedications ? (
                <div className="space-y-3">
                  {slot.medications.map((med) => (
                    <div
                      key={med.id}
                      className="bg-sage-50 rounded-xl p-4 border border-sage-100"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-800 mb-1">
                            {med.name || med.info?.name}
                          </h4>
                          <p className="text-sm text-sage-600 mb-2">
                            {med.dosage}
                          </p>
                          
                          <div className="flex items-center gap-4 text-xs text-sage-600">
                            {med.withFood && (
                              <span className="flex items-center gap-1">
                                <Utensils className="w-3 h-3" />
                                Take with food
                              </span>
                            )}
                            {!med.withFood && med.info?.timing?.withFood === false && (
                              <span className="flex items-center gap-1">
                                <Coffee className="w-3 h-3" />
                                Can take on empty stomach
                              </span>
                            )}
                          </div>
                        </div>
                        
                        <button
                          className="p-2 hover:bg-emerald-100 rounded-lg transition-colors"
                          title="Mark as taken"
                        >
                          <Check className="w-5 h-5 text-sage-400 hover:text-emerald-600" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-sage-500 italic">
                  No medications scheduled for this time
                </p>
              )}
            </motion.div>
          );
        })}
      </div>
      
      {/* Tips */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-8 bg-primary-50 border border-primary-200 rounded-xl p-6"
      >
        <h3 className="font-semibold text-primary-900 mb-3">💡 Scheduling Tips</h3>
        <ul className="text-sm text-primary-700 space-y-2">
          <li>• Medications are optimized based on food requirements and interactions</li>
          <li>• Set phone reminders for each time slot to never miss a dose</li>
          <li>• Take medications at consistent times each day for best results</li>
          <li>• Some medications need spacing - check the Interactions tab for details</li>
        </ul>
      </motion.div>
    </div>
  );
};

export default Schedule;
