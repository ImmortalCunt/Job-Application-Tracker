import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Briefcase, Users, FileText } from 'lucide-react';
import { useApp } from '../../contexts/AppContext';
import { format, parseISO } from 'date-fns';

export function RecentActivity() {
  const { data } = useApp();

  // Generate recent activity from applications
  const recentActivity = data.applications
    .sort((a, b) => new Date(b.applicationDate).getTime() - new Date(a.applicationDate).getTime())
    .slice(0, 5)
    .map(app => ({
      id: app.id,
      type: 'application' as const,
      title: `Applied to ${app.jobTitle}`,
      subtitle: app.companyName,
      date: app.applicationDate,
      icon: Briefcase,
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/10'
    }));

  // Add interview activities
  const interviewActivity = data.applications
    .filter(app => app.interviewDates && app.interviewDates.length > 0)
    .flatMap(app => 
      app.interviewDates!.map(interview => ({
        id: `${app.id}-${interview.id}`,
        type: 'interview' as const,
        title: `${interview.type} interview`,
        subtitle: `${app.jobTitle} at ${app.companyName}`,
        date: interview.date,
        icon: Calendar,
        color: 'text-purple-500',
        bgColor: 'bg-purple-500/10'
      }))
    )
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 3);

  const allActivity = [...recentActivity, ...interviewActivity]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 8);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative group"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-white/5 dark:from-gray-800/20 dark:to-gray-800/5 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
      <div className="relative p-6 backdrop-blur-xl bg-white/10 dark:bg-gray-800/10 border border-white/20 dark:border-gray-700/20 rounded-2xl">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
          Recent Activity
        </h3>
        
        <div className="space-y-4">
          {allActivity.length > 0 ? (
            allActivity.map((activity, index) => (
              <motion.div
                key={activity.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center space-x-4 p-3 rounded-xl hover:bg-white/5 dark:hover:bg-gray-800/20 transition-all duration-200"
              >
                <div className={`p-2 rounded-lg ${activity.bgColor} backdrop-blur-sm`}>
                  <activity.icon className={`w-4 h-4 ${activity.color}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {activity.title}
                  </p>
                  <p className="text-xs text-gray-600 dark:text-gray-400 truncate">
                    {activity.subtitle}
                  </p>
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  {format(parseISO(activity.date), 'MMM d')}
                </div>
              </motion.div>
            ))
          ) : (
            <div className="text-center py-8">
              <FileText className="w-12 h-12 text-gray-400 dark:text-gray-600 mx-auto mb-3" />
              <p className="text-gray-600 dark:text-gray-400">No recent activity</p>
              <p className="text-sm text-gray-500 dark:text-gray-500">
                Start by adding your first job application
              </p>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}