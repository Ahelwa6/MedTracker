import { motion } from 'framer-motion';
import { Pill, Plus, Trash2, Edit } from 'lucide-react';
import useMedicationStore from '../store/medicationStore';

const MedicationList = ({ onNavigate }) => {
  const { medications, removeMedication } = useMedicationStore();
  
  const handleDelete = (medicationId) => {
    if (window.confirm('Are you sure you want to remove this medication?')) {
      removeMedication(medicationId);
    }
  };
  
  return (
    <div className="max-w-5xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8 flex items-center justify-between"
      >
        <div className="flex items-center gap-3">
          <div className="bg-primary-100 p-2 rounded-lg">
            <Pill className="w-6 h-6 text-primary-600" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-gray-800 font-display">My Medications</h2>
            <p className="text-sage-600">Manage your medication list</p>
          </div>
        </div>
        
        <button
          onClick={() => onNavigate('add-medication')}
          className="btn-primary flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Add Medication
        </button>
      </motion.div>
      
      {medications.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="card text-center py-12"
        >
          <div className="bg-sage-100 p-6 rounded-full inline-flex mb-4">
            <Pill className="w-12 h-12 text-sage-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">No medications added yet</h3>
          <p className="text-sage-600 mb-6">
            Start by adding your medications to get personalized schedules and safety checks
          </p>
          <button
            onClick={() => onNavigate('add-medication')}
            className="btn-primary inline-flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Add Your First Medication
          </button>
        </motion.div>
      ) : (
        <div className="grid gap-4">
          {medications.map((med, index) => (
            <motion.div
              key={med.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="card hover:shadow-soft transition-shadow"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-semibold text-gray-800">
                      {med.name}
                    </h3>
                    <span className="badge badge-info">{med.dosage}</span>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 text-sm text-sage-600 mb-3">
                    <span>• Frequency: {
                      med.frequency === 'once' ? 'Once daily' :
                      med.frequency === 'twice' ? 'Twice daily' :
                      med.frequency === 'thrice' ? 'Three times daily' :
                      'As needed'
                    }</span>
                  </div>
                  
                  {med.notes && (
                    <p className="text-sm text-sage-600 italic mb-2">
                      Note: {med.notes}
                    </p>
                  )}
                  
                  <div className="flex items-center gap-2 text-xs text-sage-500">
                    <span>Added {new Date(med.addedDate).toLocaleDateString()}</span>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <button
                    onClick={() => handleDelete(med.id)}
                    className="p-2 text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                    title="Delete medication"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
      
      {medications.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-8 bg-primary-50 border border-primary-200 rounded-xl p-6"
        >
          <h3 className="font-semibold text-primary-900 mb-2">Next Steps</h3>
          <p className="text-sm text-primary-700 mb-4">
            Check the <strong>Schedule</strong> tab to see your optimized medication timing, 
            or visit <strong>Interactions</strong> to check for potential drug interactions.
          </p>
          <div className="flex gap-3">
            <button
              onClick={() => onNavigate('schedule')}
              className="btn-primary text-sm"
            >
              View Schedule
            </button>
            <button
              onClick={() => onNavigate('interactions')}
              className="btn-secondary text-sm"
            >
              Check Interactions
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default MedicationList;
