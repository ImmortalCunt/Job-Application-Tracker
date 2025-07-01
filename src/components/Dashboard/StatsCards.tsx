import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Calendar, Users, TrendingUp } from 'lucide-react';
import { useApp } from '../../contexts/AppContext';

export function StatsCards() {
  const { data } = useApp();

  const totalApplications = data.applications.length;
  const interviewsScheduled = data.applications.filter(app => 
    app.interviewDates && app.interviewDates.length > 0
  ).length;
  const offersReceived = data.applications.filter(app => app.status === 'offer').length;
  const responseRate = totalApplications > 0 ? 
    Math.round(((interviewsScheduled + offersReceived) / totalApplications) * 100) : 0;

  const stats = [
    {
      title: 'Total Applications',
      value: totalApplications,
      icon: Briefcase,
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-500/10',
    },
    {
      title: 'Interviews Scheduled',
      value: interviewsScheduled,
      icon: Calendar,
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-500/10',
    },
    {
      title: 'Offers Received',
      value: offersReceived,
      icon: TrendingUp,
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-500/10',
    },
    {
      title: 'Response Rate',
      value: `${responseRate}%`,
      icon: Users,
      color: 'from-orange-500 to-orange-600',
      bgColor: 'bg-orange-500/10',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          whileHover={{ scale: 1.02, y: -5 }}
          className="relative group"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-white/5 dark:from-gray-800/20 dark:to-gray-800/5 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
          <div className="relative p-6 backdrop-blur-xl bg-white/10 dark:bg-gray-800/10 border border-white/20 dark:border-gray-700/20 rounded-2xl hover:border-white/30 dark:hover:border-gray-600/30 transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                  {stat.title}
                </p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">
                  {stat.value}
                </p>
              </div>
              <div className={`p-3 rounded-xl ${stat.bgColor} backdrop-blur-sm`}>
                <stat.icon className={`w-6 h-6 bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`} />
              </div>
            </div>
            <div className="mt-4 flex items-center">
              <div className={`h-1 w-full bg-gradient-to-r ${stat.color} rounded-full opacity-20`}>
                <div className={`h-1 bg-gradient-to-r ${stat.color} rounded-full w-3/4 animate-pulse`}></div>
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}