import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Search, Filter, Grid, List } from 'lucide-react';
import { useApp } from '../../contexts/AppContext';
import { ApplicationCard } from '../Applications/ApplicationCard';
import { ApplicationForm } from '../Applications/ApplicationForm';
import { Application } from '../../types';

export function Applications() {
  const { data, addApplication, updateApplication, deleteApplication } = useApp();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingApplication, setEditingApplication] = useState<Application | undefined>();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const filteredApplications = data.applications.filter(app => {
    const matchesSearch = app.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         app.jobTitle.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || app.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const handleAddApplication = () => {
    setEditingApplication(undefined);
    setIsFormOpen(true);
  };

  const handleEditApplication = (application: Application) => {
    setEditingApplication(application);
    setIsFormOpen(true);
  };

  const handleSaveApplication = (applicationData: Omit<Application, 'id'>) => {
    if (editingApplication) {
      updateApplication(editingApplication.id, applicationData);
    } else {
      addApplication(applicationData);
    }
    setIsFormOpen(false);
    setEditingApplication(undefined);
  };

  const handleDeleteApplication = (id: string) => {
    if (confirm('Are you sure you want to delete this application?')) {
      deleteApplication(id);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mb-2">
            Applications
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage your job applications and track their progress.
          </p>
        </div>
        
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleAddApplication}
          className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200 flex items-center space-x-2 shadow-lg"
        >
          <Plus className="w-5 h-5" />
          <span>Add Application</span>
        </motion.button>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="flex flex-col sm:flex-row gap-4 flex-1">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search applications..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white/10 dark:bg-gray-800/20 border border-white/20 dark:border-gray-700/20 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-200"
            />
          </div>
          
          <div className="flex items-center space-x-2">
            <Filter className="w-4 h-4 text-gray-400" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 bg-white/10 dark:bg-gray-800/20 border border-white/20 dark:border-gray-700/20 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-200"
            >
              <option value="all">All Status</option>
              <option value="applied">Applied</option>
              <option value="screening">Screening</option>
              <option value="interview">Interview</option>
              <option value="offer">Offer</option>
              <option value="rejected">Rejected</option>
              <option value="withdrawn">Withdrawn</option>
            </select>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded-lg transition-all duration-200 ${
              viewMode === 'grid'
                ? 'bg-blue-500/20 text-blue-600 dark:text-blue-400'
                : 'bg-white/10 dark:bg-gray-800/20 text-gray-600 dark:text-gray-300 hover:bg-white/20 dark:hover:bg-gray-800/40'
            }`}
          >
            <Grid className="w-4 h-4" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setViewMode('list')}
            className={`p-2 rounded-lg transition-all duration-200 ${
              viewMode === 'list'
                ? 'bg-blue-500/20 text-blue-600 dark:text-blue-400'
                : 'bg-white/10 dark:bg-gray-800/20 text-gray-600 dark:text-gray-300 hover:bg-white/20 dark:hover:bg-gray-800/40'
            }`}
          >
            <List className="w-4 h-4" />
          </motion.button>
        </div>
      </div>

      {/* Applications Grid/List */}
      {filteredApplications.length > 0 ? (
        <div className={`grid gap-6 ${
          viewMode === 'grid' 
            ? 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3' 
            : 'grid-cols-1'
        }`}>
          {filteredApplications.map((application, index) => (
            <motion.div
              key={application.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <ApplicationCard
                application={application}
                onEdit={handleEditApplication}
                onDelete={handleDeleteApplication}
              />
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
            <Plus className="w-12 h-12 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            {searchTerm || filterStatus !== 'all' ? 'No applications found' : 'No applications yet'}
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            {searchTerm || filterStatus !== 'all' 
              ? 'Try adjusting your search or filter criteria.'
              : 'Start by adding your first job application to track your progress.'
            }
          </p>
          {(!searchTerm && filterStatus === 'all') && (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleAddApplication}
              className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200 flex items-center space-x-2 mx-auto"
            >
              <Plus className="w-5 h-5" />
              <span>Add Your First Application</span>
            </motion.button>
          )}
        </motion.div>
      )}

      {/* Application Form Modal */}
      {isFormOpen && (
        <ApplicationForm
          application={editingApplication}
          onSave={handleSaveApplication}
          onCancel={() => {
            setIsFormOpen(false);
            setEditingApplication(undefined);
          }}
        />
      )}
    </motion.div>
  );
}