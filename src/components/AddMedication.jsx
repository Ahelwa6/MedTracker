import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, ArrowLeft, Search } from 'lucide-react';
import useMedicationStore from '../store/medicationStore';
import { getAllMedications } from '../data/medicationDatabase';

const AddMedication = ({ onBack }) => {
  const { addMedication } = useMedicationStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMed, setSelectedMed] = useState(null);
  const [dosage, setDosage] = useState('');
  const [frequency, setFrequency] = useState('once');
  const [notes, setNotes] = useState('');
  
  const allMedications = getAllMedications();
  
  const filteredMedications = allMedications.filter((med) =>
    med.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    med.category.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!selectedMed || !dosage) {
      alert('Please select a medication and enter dosage');
      return;
    }
    
    const medication = {
      id: `${selectedMed.id}_${Date.now()}`,
      medicationId: selectedMed.id,
      name: selectedMed.name,
      dosage,
      frequency,
      notes,
      addedDate: new Date().toISOString(),
    };
    
    addMedication(medication);
    onBack();
  };
  
  return (
    <div className="max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-sage-600 hover:text-sage-800 mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Medications
        </button>
        
        <div className="flex items-center gap-3 mb-8">
          <div className="bg-primary-100 p-2 rounded-lg">
            <Plus className="w-6 h-6 text-primary-600" />
          </div>
          <h2 className="text-3xl font-bold text-gray-800 font-display">Add Medication</h2>
        </div>
      </motion.div>
      
      <div className="grid md:grid-cols-2 gap-6">
        {/* Medication Search */}
        <motion.div
          className="card space-y-4"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
        >
          <h3 className="text-lg font-semibold text-gray-800">Search Medication</h3>
          
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-sage-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search medications..."
              className="input-field pl-10"
            />
          </div>
          
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {filteredMedications.map((med) => (
              <div
                key={med.id}
                onClick={() => setSelectedMed(med)}
                className={`
                  p-4 rounded-xl border-2 cursor-pointer transition-all
                  ${selectedMed?.id === med.id
                    ? 'border-primary-400 bg-primary-50'
                    : 'border-sage-100 hover:border-sage-200 bg-white'
                  }
                `}
              >
                <h4 className="font-semibold text-gray-800">{med.name}</h4>
                <p className="text-sm text-sage-600">{med.category}</p>
                {med.type === 'prescription' && (
                  <span className="badge badge-info mt-2">Prescription</span>
                )}
              </div>
            ))}
          </div>
        </motion.div>
        
        {/* Medication Details */}
        <motion.div
          className="card space-y-6"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          {selectedMed ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  {selectedMed.name}
                </h3>
                <p className="text-sm text-sage-600">{selectedMed.notes}</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Dosage *
                </label>
                <select
                  value={dosage}
                  onChange={(e) => setDosage(e.target.value)}
                  className="input-field"
                  required
                >
                  <option value="">Select dosage</option>
                  {selectedMed.commonDosages.map((dose) => (
                    <option key={dose} value={dose}>
                      {dose}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Frequency
                </label>
                <select
                  value={frequency}
                  onChange={(e) => setFrequency(e.target.value)}
                  className="input-field"
                >
                  <option value="once">Once daily</option>
                  <option value="twice">Twice daily</option>
                  <option value="thrice">Three times daily</option>
                  <option value="asNeeded">As needed</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Personal Notes (optional)
                </label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="input-field"
                  rows="3"
                  placeholder="Any personal notes about this medication..."
                />
              </div>
              
              {/* Timing Information */}
              <div className="bg-primary-50 border border-primary-200 rounded-xl p-4">
                <h4 className="font-medium text-primary-900 mb-2">Timing Guidelines</h4>
                <ul className="text-sm text-primary-700 space-y-1">
                  {selectedMed.timing.withFood && (
                    <li>• Take with food</li>
                  )}
                  {selectedMed.timing.timeOfDay.length > 0 && (
                    <li>• Best taken: {selectedMed.timing.timeOfDay.join(', ')}</li>
                  )}
                  {selectedMed.timing.spacing && (
                    <li>• Space {selectedMed.timing.spacing} hours from other medications</li>
                  )}
                </ul>
              </div>
              
              <button type="submit" className="btn-primary w-full">
                Add Medication
              </button>
            </form>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="bg-sage-100 p-4 rounded-full mb-4">
                <Search className="w-8 h-8 text-sage-400" />
              </div>
              <p className="text-sage-600">
                Search and select a medication to get started
              </p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default AddMedication;
