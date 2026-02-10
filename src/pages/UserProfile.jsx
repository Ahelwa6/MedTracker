import { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Save, AlertCircle } from 'lucide-react';
import useMedicationStore from '../store/medicationStore';

const UserProfile = ({ onSave }) => {
  const { userProfile, setUserProfile } = useMedicationStore();
  const [formData, setFormData] = useState(userProfile);
  const [conditionInput, setConditionInput] = useState('');
  const [allergyInput, setAllergyInput] = useState('');
  
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };
  
  const addCondition = () => {
    if (conditionInput.trim()) {
      setFormData({
        ...formData,
        conditions: [...formData.conditions, conditionInput.trim()],
      });
      setConditionInput('');
    }
  };
  
  const removeCondition = (index) => {
    setFormData({
      ...formData,
      conditions: formData.conditions.filter((_, i) => i !== index),
    });
  };
  
  const addAllergy = () => {
    if (allergyInput.trim()) {
      setFormData({
        ...formData,
        allergies: [...formData.allergies, allergyInput.trim()],
      });
      setAllergyInput('');
    }
  };
  
  const removeAllergy = (index) => {
    setFormData({
      ...formData,
      allergies: formData.allergies.filter((_, i) => i !== index),
    });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setUserProfile(formData);
    onSave();
  };
  
  return (
    <div className="max-w-3xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center gap-3 mb-2">
          <div className="bg-primary-100 p-2 rounded-lg">
            <User className="w-6 h-6 text-primary-600" />
          </div>
          <h2 className="text-3xl font-bold text-gray-800 font-display">Your Profile</h2>
        </div>
        <p className="text-sage-600 ml-14">
          Tell us about yourself to get personalized medication recommendations and safety checks.
        </p>
      </motion.div>
      
      <motion.form
        onSubmit={handleSubmit}
        className="card space-y-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        {/* Basic Info */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800">Basic Information</h3>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="input-field"
                placeholder="Your name"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Age
              </label>
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleChange}
                className="input-field"
                placeholder="Age"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Weight (optional)
            </label>
            <input
              type="text"
              name="weight"
              value={formData.weight}
              onChange={handleChange}
              className="input-field"
              placeholder="e.g., 150 lbs"
            />
          </div>
        </div>
        
        {/* Medical Conditions */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800">Medical Conditions</h3>
          
          <div className="flex gap-2">
            <input
              type="text"
              value={conditionInput}
              onChange={(e) => setConditionInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addCondition())}
              className="input-field"
              placeholder="e.g., PCOS, Diabetes"
            />
            <button
              type="button"
              onClick={addCondition}
              className="btn-secondary whitespace-nowrap"
            >
              Add
            </button>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {formData.conditions.map((condition, index) => (
              <span
                key={index}
                className="badge badge-info cursor-pointer"
                onClick={() => removeCondition(index)}
              >
                {condition} ×
              </span>
            ))}
          </div>
        </div>
        
        {/* Allergies */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800">Allergies</h3>
          
          <div className="flex gap-2">
            <input
              type="text"
              value={allergyInput}
              onChange={(e) => setAllergyInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addAllergy())}
              className="input-field"
              placeholder="e.g., Penicillin, Sulfa drugs"
            />
            <button
              type="button"
              onClick={addAllergy}
              className="btn-secondary whitespace-nowrap"
            >
              Add
            </button>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {formData.allergies.map((allergy, index) => (
              <span
                key={index}
                className="badge badge-danger cursor-pointer"
                onClick={() => removeAllergy(index)}
              >
                {allergy} ×
              </span>
            ))}
          </div>
        </div>
        
        {/* Special Considerations */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800">Special Considerations</h3>
          
          <div className="space-y-3">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                name="isPregnant"
                checked={formData.isPregnant}
                onChange={handleChange}
                className="w-4 h-4 text-primary-600 rounded"
              />
              <span className="text-gray-700">Currently pregnant</span>
            </label>
            
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                name="isBreastfeeding"
                checked={formData.isBreastfeeding}
                onChange={handleChange}
                className="w-4 h-4 text-primary-600 rounded"
              />
              <span className="text-gray-700">Currently breastfeeding</span>
            </label>
          </div>
        </div>
        
        {/* Disclaimer */}
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex gap-3">
          <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-amber-800">
            This information helps us provide better medication safety checks. However, 
            this app is not a substitute for professional medical advice. Always consult 
            your healthcare provider before making changes to your medications.
          </p>
        </div>
        
        {/* Submit */}
        <button type="submit" className="btn-primary w-full flex items-center justify-center gap-2">
          <Save className="w-5 h-5" />
          Save Profile & Continue
        </button>
      </motion.form>
    </div>
  );
};

export default UserProfile;
