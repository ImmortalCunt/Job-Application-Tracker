import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, FileText, Download, Trash2, Upload } from 'lucide-react';
import { useApp } from '../../contexts/AppContext';
import { Document } from '../../types';

export function Documents() {
  const { data, addDocument, deleteDocument } = useApp();
  const [isUploadOpen, setIsUploadOpen] = useState(false);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    
    files.forEach(file => {
      const document: Omit<Document, 'id'> = {
        name: file.name.split('.')[0],
        type: file.name.toLowerCase().includes('resume') ? 'resume' : 
              file.name.toLowerCase().includes('cover') ? 'cover-letter' : 'other',
        fileName: file.name,
        uploadDate: new Date().toISOString(),
        applicationIds: []
      };
      
      addDocument(document);
    });
    
    setIsUploadOpen(false);
  };

  const handleDeleteDocument = (id: string) => {
    if (confirm('Are you sure you want to delete this document?')) {
      deleteDocument(id);
    }
  };

  const documentTypeConfig = {
    resume: { label: 'Resume', icon: FileText, color: 'text-blue-600 dark:text-blue-400', bgColor: 'bg-blue-500/10' },
    'cover-letter': { label: 'Cover Letter', icon: FileText, color: 'text-green-600 dark:text-green-400', bgColor: 'bg-green-500/10' },
    portfolio: { label: 'Portfolio', icon: FileText, color: 'text-purple-600 dark:text-purple-400', bgColor: 'bg-purple-500/10' },
    other: { label: 'Other', icon: FileText, color: 'text-gray-600 dark:text-gray-400', bgColor: 'bg-gray-500/10' },
  };

  const groupedDocuments = data.documents.reduce((acc, doc) => {
    if (!acc[doc.type]) acc[doc.type] = [];
    acc[doc.type].push(doc);
    return acc;
  }, {} as Record<string, Document[]>);

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
            Documents
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage your resumes, cover letters, and other documents.
          </p>
        </div>
        
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setIsUploadOpen(true)}
          className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200 flex items-center space-x-2 shadow-lg"
        >
          <Upload className="w-5 h-5" />
          <span>Upload Document</span>
        </motion.button>
      </div>

      {/* Document Templates Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative group"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-white/5 dark:from-gray-800/20 dark:to-gray-800/5 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
        <div className="relative p-6 backdrop-blur-xl bg-white/10 dark:bg-gray-800/10 border border-white/20 dark:border-gray-700/20 rounded-2xl">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            📋 Quick Templates
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="p-4 bg-blue-500/10 rounded-xl border border-blue-500/20 hover:border-blue-500/30 transition-all duration-200"
            >
              <FileText className="w-8 h-8 text-blue-600 dark:text-blue-400 mb-2" />
              <h4 className="font-medium text-gray-900 dark:text-white mb-1">Resume Templates</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                Professional resume templates for different industries
              </p>
              <button className="text-sm text-blue-600 dark:text-blue-400 hover:underline">
                Browse Templates →
              </button>
            </motion.div>
            
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="p-4 bg-green-500/10 rounded-xl border border-green-500/20 hover:border-green-500/30 transition-all duration-200"
            >
              <FileText className="w-8 h-8 text-green-600 dark:text-green-400 mb-2" />
              <h4 className="font-medium text-gray-900 dark:text-white mb-1">Cover Letter Templates</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                Compelling cover letter examples and templates
              </p>
              <button className="text-sm text-green-600 dark:text-green-400 hover:underline">
                Browse Templates →
              </button>
            </motion.div>
            
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="p-4 bg-purple-500/10 rounded-xl border border-purple-500/20 hover:border-purple-500/30 transition-all duration-200"
            >
              <FileText className="w-8 h-8 text-purple-600 dark:text-purple-400 mb-2" />
              <h4 className="font-medium text-gray-900 dark:text-white mb-1">Portfolio Templates</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                Showcase your work with professional portfolio layouts
              </p>
              <button className="text-sm text-purple-600 dark:text-purple-400 hover:underline">
                Browse Templates →
              </button>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Documents by Type */}
      {Object.keys(groupedDocuments).length > 0 ? (
        <div className="space-y-6">
          {Object.entries(groupedDocuments).map(([type, documents]) => {
            const config = documentTypeConfig[type as keyof typeof documentTypeConfig];
            return (
              <motion.div
                key={type}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-white/5 dark:from-gray-800/20 dark:to-gray-800/5 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
                <div className="relative p-6 backdrop-blur-xl bg-white/10 dark:bg-gray-800/10 border border-white/20 dark:border-gray-700/20 rounded-2xl">
                  
                  <div className="flex items-center space-x-3 mb-4">
                    <div className={`p-2 rounded-lg ${config.bgColor}`}>
                      <config.icon className={`w-5 h-5 ${config.color}`} />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {config.label}s ({documents.length})
                    </h3>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {documents.map((document, index) => (
                      <motion.div
                        key={document.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ scale: 1.02 }}
                        className="p-4 bg-white/5 dark:bg-gray-800/20 rounded-xl border border-white/10 dark:border-gray-700/10 hover:border-white/20 dark:hover:border-gray-600/20 transition-all duration-200"
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <h4 className="font-medium text-gray-900 dark:text-white mb-1 truncate">
                              {document.name}
                            </h4>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              {document.fileName}
                            </p>
                          </div>
                          
                          <div className="flex items-center space-x-1">
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              className="p-1.5 rounded-lg bg-white/10 dark:bg-gray-800/20 text-gray-600 dark:text-gray-300 hover:bg-white/20 dark:hover:bg-gray-800/40 transition-all duration-200"
                            >
                              <Download className="w-3 h-3" />
                            </motion.button>
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => handleDeleteDocument(document.id)}
                              className="p-1.5 rounded-lg bg-white/10 dark:bg-gray-800/20 text-red-600 dark:text-red-400 hover:bg-red-500/20 transition-all duration-200"
                            >
                              <Trash2 className="w-3 h-3" />
                            </motion.button>
                          </div>
                        </div>
                        
                        <div className="text-xs text-gray-500 dark:text-gray-400 mb-3">
                          Uploaded {new Date(document.uploadDate).toLocaleDateString()}
                        </div>
                        
                        {document.applicationIds && document.applicationIds.length > 0 && (
                          <div className="text-xs text-blue-600 dark:text-blue-400">
                            Used in {document.applicationIds.length} application{document.applicationIds.length > 1 ? 's' : ''}
                          </div>
                        )}
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <div className="w-24 h-24 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <FileText className="w-12 h-12 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            No documents yet
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Upload your resumes, cover letters, and other documents to get started.
          </p>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setIsUploadOpen(true)}
            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200 flex items-center space-x-2 mx-auto"
          >
            <Upload className="w-5 h-5" />
            <span>Upload Your First Document</span>
          </motion.button>
        </motion.div>
      )}

      {/* Upload Modal */}
      {isUploadOpen && (
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
            className="relative w-full max-w-md"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-white/5 dark:from-gray-800/20 dark:to-gray-800/5 rounded-2xl blur-xl"></div>
            <div className="relative p-6 backdrop-blur-xl bg-white/10 dark:bg-gray-800/10 border border-white/20 dark:border-gray-700/20 rounded-2xl">
              
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                Upload Documents
              </h2>

              <div className="space-y-4">
                <div className="border-2 border-dashed border-white/20 dark:border-gray-700/20 rounded-xl p-8 text-center hover:border-blue-500/50 transition-all duration-200">
                  <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    Drag and drop files here, or click to select
                  </p>
                  <input
                    type="file"
                    multiple
                    accept=".pdf,.doc,.docx,.txt"
                    onChange={handleFileUpload}
                    className="hidden"
                    id="file-upload"
                  />
                  <label
                    htmlFor="file-upload"
                    className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200 cursor-pointer inline-block"
                  >
                    Choose Files
                  </label>
                </div>
                
                <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
                  Supported formats: PDF, DOC, DOCX, TXT
                </p>
              </div>

              <div className="flex justify-end space-x-3 pt-6 border-t border-white/10 dark:border-gray-700/20">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setIsUploadOpen(false)}
                  className="px-6 py-2 bg-white/10 dark:bg-gray-800/20 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-white/20 dark:hover:bg-gray-800/40 transition-all duration-200"
                >
                  Cancel
                </motion.button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
}