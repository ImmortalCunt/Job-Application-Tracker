import React from 'react';
import { motion } from 'framer-motion';
import { 
  MapPin, 
  Calendar, 
  ExternalLink, 
  Edit, 
  Trash2, 
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle
} from 'lucide-react';
import { Application, ApplicationStatus } from '../../types';
import { format, parseISO } from 'date-fns';

interface ApplicationCardProps {
  application: Application;
  onEdit: (application: Application) => void;
  onDelete: (id: string) => void;
}

export function ApplicationCard({ application, onEdit, onDelete }: ApplicationCardProps) {
  const statusConfig: Record<ApplicationStatus, { 
    icon: React.ElementType; 
    color: string; 
    bgColor: string;
    label: string;
  }> = {
    applied: { 
      icon: Clock, 
      color: 'text-blue-600 dark:text-blue-400', 
      bgColor: 'bg-blue-500/10',
      label: 'Applied'
    },
    screening: { 
      icon: AlertCircle, 
      color: 'text-yellow-600 dark:text-yellow-400', 
      bgColor: 'bg-yellow-500/10',
      label: 'Screening'
    },
    interview: { 
      icon: Calendar, 
      color: 'text-purple-600 dark:text-purple-400', 
      bgColor: 'bg-purple-500/10',
      label: 'Interview'
    },
    offer: { 
      icon: CheckCircle, 
      color: 'text-green-600 dark:text-green-400', 
      bgColor: 'bg-green-500/10',
      label: 'Offer'
    },
    rejected: { 
      icon: XCircle, 
      color: 'text-red-600 dark:text-red-400', 
      bgColor: 'bg-red-500/10',
      label: 'Rejected'
    },
    withdrawn: { 
      icon: XCircle, 
      color: 'text-gray-600 dark:text-gray-400', 
      bgColor: 'bg-gray-500/10',
      label: 'Withdrawn'
    },
  };

  const config = statusConfig[application.status];
  const StatusIcon = config.icon;

  const priorityColors = {
    low: 'border-l-gray-300 dark:border-l-gray-600',
    medium: 'border-l-yellow-400',
    high: 'border-l-red-400'
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02, y: -5 }}
      className="relative group"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-white/5 dark:from-gray-800/20 dark:to-gray-800/5 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
      <div className={`relative p-6 backdrop-blur-xl bg-white/10 dark:bg-gray-800/10 border border-white/20 dark:border-gray-700/20 rounded-2xl hover:border-white/30 dark:hover:border-gray-600/30 transition-all duration-300 border-l-4 ${priorityColors[application.priority]}`}>
        
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
              {application.jobTitle}
            </h3>
            <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
              {application.companyName}
            </p>
          </div>
          
          <div className="flex items-center space-x-2">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => onEdit(application)}
              className="p-2 rounded-lg bg-white/10 dark:bg-gray-800/20 text-gray-600 dark:text-gray-300 hover:bg-white/20 dark:hover:bg-gray-800/40 transition-all duration-200"
            >
              <Edit className="w-4 h-4" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => onDelete(application.id)}
              className="p-2 rounded-lg bg-white/10 dark:bg-gray-800/20 text-red-600 dark:text-red-400 hover:bg-red-500/20 transition-all duration-200"
            >
              <Trash2 className="w-4 h-4" />
            </motion.button>
          </div>
        </div>

        {/* Status Badge */}
        <div className="flex items-center justify-between mb-4">
          <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${config.bgColor} ${config.color} backdrop-blur-sm`}>
            <StatusIcon className="w-3 h-3 mr-1" />
            {config.label}
          </div>
          
          <div className="text-xs text-gray-500 dark:text-gray-400">
            {format(parseISO(application.applicationDate), 'MMM d, yyyy')}
          </div>
        </div>

        {/* Details */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
            <MapPin className="w-4 h-4 mr-2" />
            {application.location}
          </div>
          
          {application.salary && (
            <div className="text-sm text-gray-600 dark:text-gray-400">
              💰 {application.salary}
            </div>
          )}
          
          <div className="text-xs text-gray-500 dark:text-gray-500">
            {application.jobType} • {application.industry}
          </div>
        </div>

        {/* Progress Indicators */}
        <div className="flex items-center justify-between">
          <div className="flex space-x-1">
            {application.resumeVersion && (
              <span className="px-2 py-1 text-xs bg-blue-500/10 text-blue-600 dark:text-blue-400 rounded">
                Resume
              </span>
            )}
            {application.coverLetterVersion && (
              <span className="px-2 py-1 text-xs bg-green-500/10 text-green-600 dark:text-green-400 rounded">
                Cover Letter
              </span>
            )}
            {application.interviewDates && application.interviewDates.length > 0 && (
              <span className="px-2 py-1 text-xs bg-purple-500/10 text-purple-600 dark:text-purple-400 rounded">
                {application.interviewDates.length} Interview{application.interviewDates.length > 1 ? 's' : ''}
              </span>
            )}
          </div>
          
          {application.jobUrl && (
            <motion.a
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              href={application.jobUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-white/10 dark:bg-gray-800/20 text-gray-600 dark:text-gray-300 hover:bg-white/20 dark:hover:bg-gray-800/40 transition-all duration-200"
            >
              <ExternalLink className="w-4 h-4" />
            </motion.a>
          )}
        </div>
      </div>
    </motion.div>
  );
}