import React from 'react';
import { motion } from 'framer-motion';
import { StatsCards } from '../Dashboard/StatsCards';
import { ApplicationsPipeline } from '../Dashboard/ApplicationsPipeline';
import { RecentActivity } from '../Dashboard/RecentActivity';

export function Dashboard() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-8"
    >
      <div>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mb-2">
          Dashboard
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Welcome back! Here's an overview of your job search progress.
        </p>
      </div>

      <StatsCards />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <ApplicationsPipeline />
        <RecentActivity />
      </div>
    </motion.div>
  );
}