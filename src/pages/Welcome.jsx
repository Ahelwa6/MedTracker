import { motion } from 'framer-motion';
import { Pill, ShieldCheck, Calendar, Bell, ArrowRight } from 'lucide-react';

const Welcome = ({ onGetStarted }) => {
  const features = [
    {
      icon: ShieldCheck,
      title: 'Safety First',
      description: 'Check drug interactions backed by FDA and medical databases',
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50',
    },
    {
      icon: Calendar,
      title: 'Smart Scheduling',
      description: 'Optimized medication timing based on interactions and food requirements',
      color: 'text-primary-600',
      bgColor: 'bg-primary-50',
    },
    {
      icon: Bell,
      title: 'Never Miss a Dose',
      description: 'Customizable reminders to keep you on track',
      color: 'text-amber-600',
      bgColor: 'bg-amber-50',
    },
  ];
  
  return (
    <div className="min-h-screen flex items-center justify-center -mt-8">
      <div className="max-w-5xl mx-auto text-center px-4">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex justify-center mb-8">
            <div className="bg-gradient-to-br from-primary-500 to-primary-600 p-6 rounded-3xl shadow-xl">
              <Pill className="w-16 h-16 text-white" />
            </div>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-6 font-display">
            Welcome to MedTrack
          </h1>
          
          <p className="text-xl text-sage-600 mb-12 max-w-2xl mx-auto leading-relaxed">
            Your personal medication management companion. Track medications, 
            check interactions, and never miss a dose—all backed by trusted medical sources.
          </p>
        </motion.div>
        
        {/* Features */}
        <motion.div
          className="grid md:grid-cols-3 gap-6 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div key={index} className="card text-left">
                <div className={`${feature.bgColor} ${feature.color} p-3 rounded-xl inline-flex mb-4`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  {feature.title}
                </h3>
                <p className="text-sage-600 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </motion.div>
        
        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <button
            onClick={onGetStarted}
            className="btn-primary text-lg px-8 py-4 inline-flex items-center gap-2 group"
          >
            Get Started
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
          
          <p className="text-sm text-sage-500 mt-6">
            ⚠️ This app is for informational purposes only and is not a substitute for professional medical advice.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Welcome;
