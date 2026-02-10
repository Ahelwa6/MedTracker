import { motion } from 'framer-motion';
import { AlertCircle, AlertTriangle, Info, CheckCircle, ExternalLink } from 'lucide-react';
import useMedicationStore from '../store/medicationStore';

const InteractionChecker = () => {
  const { interactions, medications } = useMedicationStore();
  
  const getSeverityConfig = (severity) => {
    switch (severity) {
      case 'severe':
        return {
          icon: AlertCircle,
          color: 'text-rose-600',
          bgColor: 'bg-rose-50',
          borderColor: 'border-rose-200',
          badge: 'badge-danger',
        };
      case 'moderate':
        return {
          icon: AlertTriangle,
          color: 'text-amber-600',
          bgColor: 'bg-amber-50',
          borderColor: 'border-amber-200',
          badge: 'badge-warning',
        };
      case 'minor':
        return {
          icon: Info,
          color: 'text-primary-600',
          bgColor: 'bg-primary-50',
          borderColor: 'border-primary-200',
          badge: 'badge-info',
        };
      default:
        return {
          icon: Info,
          color: 'text-sage-600',
          bgColor: 'bg-sage-50',
          borderColor: 'border-sage-200',
          badge: 'badge-info',
        };
    }
  };
  
  if (medications.length === 0) {
    return (
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card text-center py-12"
        >
          <div className="bg-sage-100 p-6 rounded-full inline-flex mb-4">
            <AlertCircle className="w-12 h-12 text-sage-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">No medications to check</h3>
          <p className="text-sage-600">
            Add medications to check for potential interactions
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
            <AlertCircle className="w-6 h-6 text-primary-600" />
          </div>
          <h2 className="text-3xl font-bold text-gray-800 font-display">
            Drug Interactions
          </h2>
        </div>
        <p className="text-sage-600 ml-14">
          Safety checks for your medications based on FDA and medical databases
        </p>
      </motion.div>
      
      {interactions.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="card"
        >
          <div className="flex items-start gap-4">
            <div className="bg-emerald-100 p-3 rounded-full">
              <CheckCircle className="w-6 h-6 text-emerald-600" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                ✅ No Known Interactions Detected
              </h3>
              <p className="text-sage-600 mb-4">
                Based on current medical databases, your medications ({medications.length} total) 
                do not have any documented major interactions. However, always consult your 
                healthcare provider before starting or stopping any medications.
              </p>
              <div className="bg-primary-50 border border-primary-200 rounded-lg p-4">
                <p className="text-sm text-primary-800">
                  <strong>Note:</strong> This checker uses FDA and NIH data, but may not include 
                  all possible interactions. Always inform your doctor and pharmacist about all 
                  medications, supplements, and herbs you're taking.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      ) : (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-6 bg-amber-50 border border-amber-200 rounded-xl p-4 flex gap-3"
          >
            <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="text-sm text-amber-800">
                <strong>{interactions.length}</strong> potential interaction
                {interactions.length > 1 ? 's' : ''} detected. 
                Review the details below and consult your healthcare provider.
              </p>
            </div>
          </motion.div>
          
          <div className="space-y-4">
            {interactions.map((interaction, index) => {
              const config = getSeverityConfig(interaction.severity);
              const Icon = config.icon;
              
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`card border-2 ${config.borderColor}`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`${config.bgColor} p-3 rounded-lg`}>
                      <Icon className={`w-6 h-6 ${config.color}`} />
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="text-lg font-semibold text-gray-800">
                          {interaction.med1Name} + {interaction.med2Name}
                        </h3>
                        <span className={`badge ${config.badge} capitalize`}>
                          {interaction.severity}
                        </span>
                      </div>
                      
                      <div className="space-y-3">
                        <div>
                          <h4 className="text-sm font-medium text-gray-700 mb-1">
                            Interaction Type
                          </h4>
                          <p className="text-sm text-sage-600 capitalize">
                            {interaction.type}
                          </p>
                        </div>
                        
                        <div>
                          <h4 className="text-sm font-medium text-gray-700 mb-1">
                            Description
                          </h4>
                          <p className="text-sm text-sage-700">
                            {interaction.description}
                          </p>
                        </div>
                        
                        <div className={`${config.bgColor} rounded-lg p-3 border ${config.borderColor}`}>
                          <h4 className="text-sm font-medium text-gray-800 mb-1">
                            💊 Recommendation
                          </h4>
                          <p className="text-sm text-gray-700">
                            {interaction.recommendation}
                          </p>
                        </div>
                        
                        {interaction.sources && interaction.sources.length > 0 && (
                          <div className="flex items-center gap-2 text-xs text-sage-500">
                            <ExternalLink className="w-3 h-3" />
                            <span>
                              Sources: {interaction.sources.join(', ')}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </>
      )}
      
      {/* Disclaimer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="mt-8 bg-rose-50 border border-rose-200 rounded-xl p-6"
      >
        <div className="flex gap-3">
          <AlertCircle className="w-5 h-5 text-rose-600 flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <h3 className="font-semibold text-rose-900 mb-2">Important Medical Disclaimer</h3>
            <p className="text-sm text-rose-800 leading-relaxed">
              This interaction checker is for informational purposes only and should not replace 
              professional medical advice. Drug interactions can be complex and may vary based on 
              individual health conditions, dosages, and other factors. Always consult your healthcare 
              provider or pharmacist before making any changes to your medications.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default InteractionChecker;
