import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit, Trash2, Briefcase, Building, Calendar, FileText } from 'lucide-react';
import { useJobs, Job, JobInput } from '../hooks/useJobs';
import { format } from 'date-fns';
import toast, { Toaster } from 'react-hot-toast';

export function JobManager() {
  const { jobs, loading, error, saveJob, deleteJob } = useJobs();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingJob, setEditingJob] = useState<Job | null>(null);
  const [formData, setFormData] = useState<JobInput>({
    company: '',
    title: '',
    niche: '',
    status: 'applied',
    notes: '',
    applied_at: new Date().toISOString().split('T')[0]
  });

  const statusOptions = [
    { value: 'applied', label: 'Applied', color: 'bg-blue-500/10 text-blue-600' },
    { value: 'screening', label: 'Screening', color: 'bg-yellow-500/10 text-yellow-600' },
    { value: 'interview', label: 'Interview', color: 'bg-purple-500/10 text-purple-600' },
    { value: 'offer', label: 'Offer', color: 'bg-green-500/10 text-green-600' },
    { value: 'rejected', label: 'Rejected', color: 'bg-red-500/10 text-red-600' },
    { value: 'withdrawn', label: 'Withdrawn', color: 'bg-gray-500/10 text-gray-600' }
  ];

  const handleOpenForm = (job?: Job) => {
    if (job) {
      setEditingJob(job);
      setFormData({
        company: job.company,
        title: job.title,
        niche: job.niche || '',
        status: job.status,
        notes: job.notes || '',
        applied_at: job.applied_at.split('T')[0]
      });
    } else {
      setEditingJob(null);
      setFormData({
        company: '',
        title: '',
        niche: '',
        status: 'applied',
        notes: '',
        applied_at: new Date().toISOString().split('T')[0]
      });
    }
    setIsFormOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await saveJob(formData, editingJob?.id);
      setIsFormOpen(false);
      setEditingJob(null);
    } catch (err) {
      // Error is already handled in the hook
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this job application?')) {
      try {
        await deleteJob(id);
      } catch (err) {
        // Error is already handled in the hook
      }
    }
  };

  const getStatusConfig = (status: string) => {
    return statusOptions.find(option => option.value === status) || statusOptions[0];
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="text-red-500 mb-4">Error: {error}</div>
        <button 
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Toaster position="top-right" />
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mb-2">
            Job Applications
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Track your job applications with Supabase persistence
          </p>
        </div>
        
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => handleOpenForm()}
          className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200 flex items-center space-x-2 shadow-lg"
        >
          <Plus className="w-5 h-5" />
          <span>Add Job</span>
        </motion.button>
      </div>

      {/* Jobs Grid */}
      {jobs.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.map((job, index) => (
            <motion.div
              key={job.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02, y: -5 }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-white/5 dark:from-gray-800/20 dark:to-gray-800/5 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
              <div className="relative p-6 backdrop-blur-xl bg-white/10 dark:bg-gray-800/10 border border-white/20 dark:border-gray-700/20 rounded-2xl hover:border-white/30 dark:hover:border-gray-600/30 transition-all duration-300">
                
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                      {job.title}
                    </h3>
                    <div className="flex items-center text-sm font-medium text-gray-600 dark:text-gray-300 mb-2">
                      <Building className="w-4 h-4 mr-1" />
                      {job.company}
                    </div>
                    {job.niche && (
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        {job.niche}
                      </div>
                    )}
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleOpenForm(job)}
                      className="p-2 rounded-lg bg-white/10 dark:bg-gray-800/20 text-gray-600 dark:text-gray-300 hover:bg-white/20 dark:hover:bg-gray-800/40 transition-all duration-200"
                    >
                      <Edit className="w-4 h-4" />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleDelete(job.id)}
                      className="p-2 rounded-lg bg-white/10 dark:bg-gray-800/20 text-red-600 dark:text-red-400 hover:bg-red-500/20 transition-all duration-200"
                    >
                      <Trash2 className="w-4 h-4" />
                    </motion.button>
                  </div>
                </div>

                {/* Status */}
                <div className="flex items-center justify-between mb-4">
                  <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusConfig(job.status).color} backdrop-blur-sm`}>
                    <Briefcase className="w-3 h-3 mr-1" />
                    {getStatusConfig(job.status).label}
                  </div>
                  
                  <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                    <Calendar className="w-3 h-3 mr-1" />
                    {format(new Date(job.applied_at), 'MMM d, yyyy')}
                  </div>
                </div>

                {/* Notes */}
                {job.notes && (
                  <div className="mt-4 p-3 bg-white/5 dark:bg-gray-800/20 rounded-lg">
                    <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 mb-1">
                      <FileText className="w-3 h-3 mr-1" />
                      Notes
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-3">
                      {job.notes}
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <div className="w-24 h-24 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Briefcase className="w-12 h-12 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            No job applications yet
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Start tracking your job search by adding your first application.
          </p>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleOpenForm()}
            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200 flex items-center space-x-2 mx-auto"
          >
            <Plus className="w-5 h-5" />
            <span>Add Your First Job</span>
          </motion.button>
        </motion.div>
      )}

      {/* Job Form Modal */}
      {isFormOpen && (
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
            className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-white/5 dark:from-gray-800/20 dark:to-gray-800/5 rounded-2xl blur-xl"></div>
            <div className="relative p-6 backdrop-blur-xl bg-white/10 dark:bg-gray-800/10 border border-white/20 dark:border-gray-700/20 rounded-2xl">
              
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                {editingJob ? 'Edit Job Application' : 'Add New Job Application'}
              </h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Company *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.company}
                      onChange={(e) => setFormData(prev => ({ ...prev, company: e.target.value }))}
                      className="w-full px-4 py-2 bg-white/10 dark:bg-gray-800/20 border border-white/20 dark:border-gray-700/20 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-200"
                      placeholder="Company name"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Job Title *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.title}
                      onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                      className="w-full px-4 py-2 bg-white/10 dark:bg-gray-800/20 border border-white/20 dark:border-gray-700/20 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-200"
                      placeholder="Job title"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Industry/Niche
                  </label>
                  <input
                    type="text"
                    value={formData.niche}
                    onChange={(e) => setFormData(prev => ({ ...prev, niche: e.target.value }))}
                    className="w-full px-4 py-2 bg-white/10 dark:bg-gray-800/20 border border-white/20 dark:border-gray-700/20 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-200"
                    placeholder="e.g., Technology, Healthcare, Finance"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Status
                    </label>
                    <select
                      value={formData.status}
                      onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value }))}
                      className="w-full px-4 py-2 bg-white/10 dark:bg-gray-800/20 border border-white/20 dark:border-gray-700/20 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-200"
                    >
                      {statusOptions.map(option => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Applied Date
                    </label>
                    <input
                      type="date"
                      value={formData.applied_at}
                      onChange={(e) => setFormData(prev => ({ ...prev, applied_at: e.target.value }))}
                      className="w-full px-4 py-2 bg-white/10 dark:bg-gray-800/20 border border-white/20 dark:border-gray-700/20 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-200"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Notes
                  </label>
                  <textarea
                    value={formData.notes}
                    onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                    rows={3}
                    className="w-full px-4 py-2 bg-white/10 dark:bg-gray-800/20 border border-white/20 dark:border-gray-700/20 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-200 resize-none"
                    placeholder="Additional notes about this application..."
                  />
                </div>

                <div className="flex justify-end space-x-3 pt-4">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="button"
                    onClick={() => setIsFormOpen(false)}
                    className="px-6 py-2 bg-white/10 dark:bg-gray-800/20 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-white/20 dark:hover:bg-gray-800/40 transition-all duration-200"
                  >
                    Cancel
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200"
                  >
                    {editingJob ? 'Update' : 'Save'} Job
                  </motion.button>
                </div>
              </form>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}