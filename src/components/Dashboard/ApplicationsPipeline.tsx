import React from 'react';
import { motion } from 'framer-motion';
import { useApp } from '../../contexts/AppContext';
import { ApplicationStatus } from '../../types';

export function ApplicationsPipeline() {
  const { data } = useApp();

  const statusConfig: Record<ApplicationStatus, { label: string; color: string; bgColor: string }> = {
    applied: { label: 'Applied', color: 'text-blue-600 dark:text-blue-400', bgColor: 'bg-blue-500/10' },
    screening: { label: 'Screening', color: 'text-yellow-600 dark:text-yellow-400', bgColor: 'bg-yellow-500/10' },
    interview: { label: 'Interview', color: 'text-purple-600 dark:text-purple-400', bgColor: 'bg-purple-500/10' },
    offer: { label: 'Offer', color: 'text-green-600 dark:text-green-400', bgColor: 'bg-green-500/10' },
    rejected: { label: 'Rejected', color: 'text-red-600 dark:text-red-400', bgColor: 'bg-red-500/10' },
    withdrawn: { label: 'Withdrawn', color: 'text-gray-600 dark:text-gray-400', bgColor: 'bg-gray-500/10' },
  };

  const statusCounts = Object.keys(statusConfig).reduce((acc, status) => {
    acc[status as ApplicationStatus] = data.applications.filter(app => app.status === status).length;
    return acc;
  }, {} as Record<ApplicationStatus, number>);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative group"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-white/5 dark:from-gray-800/20 dark:to-gray-800/5 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
      <div className="relative p-6 backdrop-blur-xl bg-white/10 dark:bg-gray-800/10 border border-white/20 dark:border-gray-700/20 rounded-2xl">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
          Applications Pipeline
        </h3>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {Object.entries(statusConfig).map(([status, config], index) => (
            <motion.div
              key={status}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="text-center"
            >
              <div className={`p-4 rounded-xl ${config.bgColor} backdrop-blur-sm mb-2 transition-all duration-300 hover:scale-105`}>
                <div className={`text-2xl font-bold ${config.color}`}>
                  {statusCounts[status as ApplicationStatus]}
                </div>
              </div>
              <p className="text-xs font-medium text-gray-600 dark:text-gray-400">
                {config.label}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="mt-6 space-y-2">
          {Object.entries(statusConfig).map(([status, config]) => {
            const count = statusCounts[status as ApplicationStatus];
            const percentage = data.applications.length > 0 ? (count / data.applications.length) * 100 : 0;
            
            return (
              <div key={status} className="flex items-center justify-between text-sm">
                <span className={`font-medium ${config.color}`}>{config.label}</span>
                <div className="flex items-center space-x-2">
                  <div className="w-20 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${percentage}%` }}
                      transition={{ delay: 0.5, duration: 0.8 }}
                      className={`h-full ${config.bgColor.replace('/10', '/50')} rounded-full`}
                    />
                  </div>
                  <span className="text-gray-600 dark:text-gray-400 min-w-[3rem] text-right">
                    {percentage.toFixed(0)}%
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}