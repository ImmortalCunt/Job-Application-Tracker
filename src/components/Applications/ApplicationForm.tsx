import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Save, Calendar } from 'lucide-react';
import { Application, ApplicationStatus } from '../../types';

interface ApplicationFormProps {
  application?: Application;
  onSave: (application: Omit<Application, 'id'>) => void;
  onCancel: () => void;
}

export function ApplicationForm({ application, onSave, onCancel }: ApplicationFormProps) {
  const [formData, setFormData] = useState({
    companyName: application?.companyName || '',
    jobTitle: application?.jobTitle || '',
    location: application?.location || '',
    jobType: application?.jobType || 'full-time' as const,
    industry: application?.industry || '',
    applicationDate: application?.applicationDate || new Date().toISOString().split('T')[0],
    status: application?.status || 'applied' as ApplicationStatus,
    priority: application?.priority || 'medium' as const,
    salary: application?.salary || '',
    jobUrl: application?.jobUrl || '',
    description: application?.description || '',
    notes: application?.notes || '',
    resumeVersion: application?.resumeVersion || '',
    coverLetterVersion: application?.coverLetterVersion || '',
    referralSource: application?.referralSource || '',
    followUpDate: application?.followUpDate || '',
    interviewDates: application?.interviewDates || [],
    tasks: application?.tasks || [],
    contactIds: application?.contactIds || [],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const handleChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-white/5 dark:from-gray-800/20 dark:to-gray-800/5 rounded-2xl blur-xl"></div>
        <div className="relative p-6 backdrop-blur-xl bg-white/10 dark:bg-gray-800/10 border border-white/20 dark:border-gray-700/20 rounded-2xl">
          
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              {application ? 'Edit Application' : 'Add New Application'}
            </h2>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={onCancel}
              className="p-2 rounded-lg bg-white/10 dark:bg-gray-800/20 text-gray-600 dark:text-gray-300 hover:bg-white/20 dark:hover:bg-gray-800/40 transition-all duration-200"
            >
              <X className="w-5 h-5" />
            </motion.button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Company Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.companyName}
                  onChange={(e) => handleChange('companyName', e.target.value)}
                  className="w-full px-4 py-2 bg-white/10 dark:bg-gray-800/20 border border-white/20 dark:border-gray-700/20 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-200"
                  placeholder="Enter company name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Job Title *
                </label>
                <input
                  type="text"
                  required
                  value={formData.jobTitle}
                  onChange={(e) => handleChange('jobTitle', e.target.value)}
                  className="w-full px-4 py-2 bg-white/10 dark:bg-gray-800/20 border border-white/20 dark:border-gray-700/20 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-200"
                  placeholder="Enter job title"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Location
                </label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => handleChange('location', e.target.value)}
                  className="w-full px-4 py-2 bg-white/10 dark:bg-gray-800/20 border border-white/20 dark:border-gray-700/20 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-200"
                  placeholder="City, State"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Job Type
                </label>
                <select
                  value={formData.jobType}
                  onChange={(e) => handleChange('jobType', e.target.value)}
                  className="w-full px-4 py-2 bg-white/10 dark:bg-gray-800/20 border border-white/20 dark:border-gray-700/20 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-200"
                >
                  <option value="full-time">Full-time</option>
                  <option value="part-time">Part-time</option>
                  <option value="contract">Contract</option>
                  <option value="internship">Internship</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Industry
                </label>
                <input
                  type="text"
                  value={formData.industry}
                  onChange={(e) => handleChange('industry', e.target.value)}
                  className="w-full px-4 py-2 bg-white/10 dark:bg-gray-800/20 border border-white/20 dark:border-gray-700/20 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-200"
                  placeholder="e.g., Technology"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Application Date
                </label>
                <input
                  type="date"
                  value={formData.applicationDate}
                  onChange={(e) => handleChange('applicationDate', e.target.value)}
                  className="w-full px-4 py-2 bg-white/10 dark:bg-gray-800/20 border border-white/20 dark:border-gray-700/20 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-200"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Status
                </label>
                <select
                  value={formData.status}
                  onChange={(e) => handleChange('status', e.target.value)}
                  className="w-full px-4 py-2 bg-white/10 dark:bg-gray-800/20 border border-white/20 dark:border-gray-700/20 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-200"
                >
                  <option value="applied">Applied</option>
                  <option value="screening">Screening</option>
                  <option value="interview">Interview</option>
                  <option value="offer">Offer</option>
                  <option value="rejected">Rejected</option>
                  <option value="withdrawn">Withdrawn</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Priority
                </label>
                <select
                  value={formData.priority}
                  onChange={(e) => handleChange('priority', e.target.value)}
                  className="w-full px-4 py-2 bg-white/10 dark:bg-gray-800/20 border border-white/20 dark:border-gray-700/20 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-200"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Salary Range
                </label>
                <input
                  type="text"
                  value={formData.salary}
                  onChange={(e) => handleChange('salary', e.target.value)}
                  className="w-full px-4 py-2 bg-white/10 dark:bg-gray-800/20 border border-white/20 dark:border-gray-700/20 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-200"
                  placeholder="e.g., $60,000 - $80,000"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Job URL
                </label>
                <input
                  type="url"
                  value={formData.jobUrl}
                  onChange={(e) => handleChange('jobUrl', e.target.value)}
                  className="w-full px-4 py-2 bg-white/10 dark:bg-gray-800/20 border border-white/20 dark:border-gray-700/20 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-200"
                  placeholder="https://..."
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Job Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => handleChange('description', e.target.value)}
                rows={3}
                className="w-full px-4 py-2 bg-white/10 dark:bg-gray-800/20 border border-white/20 dark:border-gray-700/20 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-200 resize-none"
                placeholder="Key requirements, responsibilities, etc..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Notes
              </label>
              <textarea
                value={formData.notes}
                onChange={(e) => handleChange('notes', e.target.value)}
                rows={3}
                className="w-full px-4 py-2 bg-white/10 dark:bg-gray-800/20 border border-white/20 dark:border-gray-700/20 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-200 resize-none"
                placeholder="Additional notes, impressions, etc..."
              />
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end space-x-3 pt-6 border-t border-white/10 dark:border-gray-700/20">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="button"
                onClick={onCancel}
                className="px-6 py-2 bg-white/10 dark:bg-gray-800/20 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-white/20 dark:hover:bg-gray-800/40 transition-all duration-200"
              >
                Cancel
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200 flex items-center space-x-2"
              >
                <Save className="w-4 h-4" />
                <span>{application ? 'Update' : 'Save'} Application</span>
              </motion.button>
            </div>
          </form>
        </div>
      </motion.div>
    </motion.div>
  );
}