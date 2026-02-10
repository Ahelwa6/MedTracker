import { motion } from 'framer-motion';
import { 
  Pill, Calendar, AlertCircle, TrendingUp, 
  Clock, CheckCircle, ArrowRight 
} from 'lucide-react';
import useMedicationStore from '../store/medicationStore';
import { format } from 'date-fns';

const Dashboard = ({ onNavigate }) => {
  const { medications, interactions, schedule, userProfile } = useMedicationStore();
  
  const stats = [
    {
      label: 'Active Medications',
      value: medications.length,
      icon: Pill,
      color: 'text-primary-600',
      bgColor: 'bg-primary-50',
      action: () => onNavigate('medications'),
    },
    {
      label: 'Today\'s Doses',
      value: Object.values(schedule).flat().length,
      icon: Calendar,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50',
      action: () => onNavigate('schedule'),
    },
    {
      label: 'Interactions Found',
      value: interactions.length,
      icon: AlertCircle,
      color: interactions.length > 0 ? 'text-amber-600' : 'text-sage-600',
      bgColor: interactions.length > 0 ? 'bg-amber-50' : 'bg-sage-50',
      action: () => onNavigate('interactions'),
    },
  ];
  
  const upcomingDoses = Object.entries(schedule)
    .flatMap(([timeSlot, meds]) => 
      meds.map(med => ({
        ...med,
        timeSlot,
        time: med.time,
      }))
    )
    .sort((a, b) => {
      const timeOrder = { morning: 1, afternoon: 2, evening: 3, night: 4 };
      return timeOrder[a.timeSlot] - timeOrder[b.timeSlot];
    })
    .slice(0, 3);
  
  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Welcome Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2 font-display">
          Welcome back{userProfile.name ? `, ${userProfile.name}` : ''}! 👋
        </h2>
        <p className="text-sage-600">
          {format(new Date(), 'EEEE, MMMM d, yyyy')}
        </p>
      </motion.div>
      
      {/* Stats Grid */}
      <motion.div
        className="grid md:grid-cols-3 gap-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={index}
              className="card cursor-pointer hover:shadow-soft transition-all"
              whileHover={{ scale: 1.02 }}
              onClick={stat.action}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="text-sage-600 text-sm mb-1">{stat.label}</p>
                  <p className="text-3xl font-bold text-gray-800">{stat.value}</p>
                </div>
                <div className={`${stat.bgColor} p-3 rounded-xl`}>
                  <Icon className={`w-6 h-6 ${stat.color}`} />
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
      
      {/* Main Content Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Upcoming Doses */}
        <motion.div
          className="card"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-primary-600" />
              <h3 className="text-lg font-semibold text-gray-800">Today's Schedule</h3>
            </div>
            <button
              onClick={() => onNavigate('schedule')}
              className="text-primary-600 hover:text-primary-700 text-sm font-medium"
            >
              View All
            </button>
          </div>
          
          {upcomingDoses.length > 0 ? (
            <div className="space-y-3">
              {upcomingDoses.map((dose, index) => (
                <div
                  key={index}
                  className="bg-sage-50 rounded-xl p-4 border border-sage-100"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="badge badge-info text-xs">{dose.time}</span>
                      </div>
                      <h4 className="font-medium text-gray-800">
                        {dose.name || dose.info?.name}
                      </h4>
                      <p className="text-sm text-sage-600">{dose.dosage}</p>
                    </div>
                    <button className="p-2 hover:bg-emerald-100 rounded-lg transition-colors">
                      <CheckCircle className="w-5 h-5 text-sage-400" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-sage-500">
              <Calendar className="w-12 h-12 mx-auto mb-3 text-sage-300" />
              <p className="text-sm">No medications scheduled yet</p>
            </div>
          )}
        </motion.div>
        
        {/* Safety Alerts */}
        <motion.div
          className="card"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-amber-600" />
              <h3 className="text-lg font-semibold text-gray-800">Safety Alerts</h3>
            </div>
            <button
              onClick={() => onNavigate('interactions')}
              className="text-primary-600 hover:text-primary-700 text-sm font-medium"
            >
              View Details
            </button>
          </div>
          
          {interactions.length > 0 ? (
            <div className="space-y-3">
              {interactions.slice(0, 3).map((interaction, index) => (
                <div
                  key={index}
                  className="bg-amber-50 border border-amber-200 rounded-xl p-4"
                >
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-800 mb-1">
                        {interaction.med1Name} + {interaction.med2Name}
                      </h4>
                      <p className="text-sm text-amber-700">
                        {interaction.description}
                      </p>
                      <span className="badge badge-warning mt-2 capitalize">
                        {interaction.severity}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
              {interactions.length > 3 && (
                <button
                  onClick={() => onNavigate('interactions')}
                  className="text-amber-600 text-sm font-medium hover:text-amber-700 flex items-center gap-1"
                >
                  View {interactions.length - 3} more
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>
          ) : (
            <div className="text-center py-8">
              <div className="bg-emerald-100 p-4 rounded-full inline-flex mb-3">
                <CheckCircle className="w-8 h-8 text-emerald-600" />
              </div>
              <p className="text-sm text-emerald-700 font-medium">
                No interactions detected
              </p>
              <p className="text-xs text-sage-600 mt-1">
                Your medications are safe to take together
              </p>
            </div>
          )}
        </motion.div>
      </div>
      
      {/* Quick Actions */}
      <motion.div
        className="card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h3>
        <div className="grid md:grid-cols-3 gap-3">
          <button
            onClick={() => onNavigate('add-medication')}
            className="btn-primary justify-center"
          >
            <Pill className="w-4 h-4" />
            Add Medication
          </button>
          <button
            onClick={() => onNavigate('schedule')}
            className="btn-secondary justify-center"
          >
            <Calendar className="w-4 h-4" />
            View Schedule
          </button>
          <button
            onClick={() => onNavigate('profile')}
            className="btn-secondary justify-center"
          >
            <TrendingUp className="w-4 h-4" />
            Update Profile
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default Dashboard;
