import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Search, Mail, Phone, Linkedin, User, Building } from 'lucide-react';
import { useApp } from '../../contexts/AppContext';
import { Contact } from '../../types';

export function Contacts() {
  const { data, addContact, updateContact, deleteContact } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingContact, setEditingContact] = useState<Contact | undefined>();

  const [formData, setFormData] = useState({
    name: '',
    role: '',
    company: '',
    email: '',
    phone: '',
    linkedin: '',
    notes: '',
    relationshipType: 'networking' as const,
    lastContactDate: '',
    applicationIds: [] as string[],
  });

  const filteredContacts = data.contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const relationshipTypeConfig = {
    recruiter: { label: 'Recruiter', color: 'text-blue-600 dark:text-blue-400', bgColor: 'bg-blue-500/10' },
    'hiring-manager': { label: 'Hiring Manager', color: 'text-purple-600 dark:text-purple-400', bgColor: 'bg-purple-500/10' },
    referral: { label: 'Referral', color: 'text-green-600 dark:text-green-400', bgColor: 'bg-green-500/10' },
    networking: { label: 'Networking', color: 'text-orange-600 dark:text-orange-400', bgColor: 'bg-orange-500/10' },
    other: { label: 'Other', color: 'text-gray-600 dark:text-gray-400', bgColor: 'bg-gray-500/10' },
  };

  const handleAddContact = () => {
    setEditingContact(undefined);
    setFormData({
      name: '',
      role: '',
      company: '',
      email: '',
      phone: '',
      linkedin: '',
      notes: '',
      relationshipType: 'networking',
      lastContactDate: '',
      applicationIds: [],
    });
    setIsFormOpen(true);
  };

  const handleEditContact = (contact: Contact) => {
    setEditingContact(contact);
    setFormData({
      name: contact.name,
      role: contact.role,
      company: contact.company,
      email: contact.email || '',
      phone: contact.phone || '',
      linkedin: contact.linkedin || '',
      notes: contact.notes || '',
      relationshipType: contact.relationshipType,
      lastContactDate: contact.lastContactDate || '',
      applicationIds: contact.applicationIds || [],
    });
    setIsFormOpen(true);
  };

  const handleSaveContact = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingContact) {
      updateContact(editingContact.id, formData);
    } else {
      addContact(formData);
    }
    setIsFormOpen(false);
    setEditingContact(undefined);
  };

  const handleDeleteContact = (id: string) => {
    if (confirm('Are you sure you want to delete this contact?')) {
      deleteContact(id);
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
            Contacts
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage your professional network and connections.
          </p>
        </div>
        
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleAddContact}
          className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200 flex items-center space-x-2 shadow-lg"
        >
          <Plus className="w-5 h-5" />
          <span>Add Contact</span>
        </motion.button>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          type="text"
          placeholder="Search contacts..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2 bg-white/10 dark:bg-gray-800/20 border border-white/20 dark:border-gray-700/20 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-200"
        />
      </div>

      {/* Contacts Grid */}
      {filteredContacts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredContacts.map((contact, index) => (
            <motion.div
              key={contact.id}
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
                  <div className="flex items-center space-x-3 flex-1">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                      <User className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white truncate">
                        {contact.name}
                      </h3>
                      <p className="text-sm font-medium text-gray-600 dark:text-gray-300 truncate">
                        {contact.role}
                      </p>
                    </div>
                  </div>
                  
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleDeleteContact(contact.id)}
                    className="p-2 rounded-lg bg-white/10 dark:bg-gray-800/20 text-red-600 dark:text-red-400 hover:bg-red-500/20 transition-all duration-200"
                  >
                    <User className="w-4 h-4" />
                  </motion.button>
                </div>

                {/* Company and Type */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                    <Building className="w-4 h-4 mr-2" />
                    {contact.company}
                  </div>
                  
                  <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${relationshipTypeConfig[contact.relationshipType].bgColor} ${relationshipTypeConfig[contact.relationshipType].color} backdrop-blur-sm`}>
                    {relationshipTypeConfig[contact.relationshipType].label}
                  </div>
                </div>

                {/* Contact Methods */}
                <div className="flex items-center space-x-2 mb-4">
                  {contact.email && (
                    <motion.a
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      href={`mailto:${contact.email}`}
                      className="p-2 rounded-lg bg-white/10 dark:bg-gray-800/20 text-gray-600 dark:text-gray-300 hover:bg-white/20 dark:hover:bg-gray-800/40 transition-all duration-200"
                    >
                      <Mail className="w-4 h-4" />
                    </motion.a>
                  )}
                  {contact.phone && (
                    <motion.a
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      href={`tel:${contact.phone}`}
                      className="p-2 rounded-lg bg-white/10 dark:bg-gray-800/20 text-gray-600 dark:text-gray-300 hover:bg-white/20 dark:hover:bg-gray-800/40 transition-all duration-200"
                    >
                      <Phone className="w-4 h-4" />
                    </motion.a>
                  )}
                  {contact.linkedin && (
                    <motion.a
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      href={contact.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg bg-white/10 dark:bg-gray-800/20 text-gray-600 dark:text-gray-300 hover:bg-white/20 dark:hover:bg-gray-800/40 transition-all duration-200"
                    >
                      <Linkedin className="w-4 h-4" />
                    </motion.a>
                  )}
                </div>

                {/* Edit Button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleEditContact(contact)}
                  className="w-full px-4 py-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-600 dark:text-blue-400 rounded-lg hover:from-blue-500/30 hover:to-purple-500/30 transition-all duration-200 text-sm font-medium"
                >
                  Edit Contact
                </motion.button>
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
            <User className="w-12 h-12 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            {searchTerm ? 'No contacts found' : 'No contacts yet'}
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            {searchTerm 
              ? 'Try adjusting your search criteria.'
              : 'Start building your professional network by adding contacts.'
            }
          </p>
          {!searchTerm && (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleAddContact}
              className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200 flex items-center space-x-2 mx-auto"
            >
              <Plus className="w-5 h-5" />
              <span>Add Your First Contact</span>
            </motion.button>
          )}
        </motion.div>
      )}

      {/* Contact Form Modal */}
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
                {editingContact ? 'Edit Contact' : 'Add New Contact'}
              </h2>

              <form onSubmit={handleSaveContact} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full px-4 py-2 bg-white/10 dark:bg-gray-800/20 border border-white/20 dark:border-gray-700/20 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-200"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Role
                    </label>
                    <input
                      type="text"
                      value={formData.role}
                      onChange={(e) => setFormData(prev => ({ ...prev, role: e.target.value }))}
                      className="w-full px-4 py-2 bg-white/10 dark:bg-gray-800/20 border border-white/20 dark:border-gray-700/20 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-200"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Company
                    </label>
                    <input
                      type="text"
                      value={formData.company}
                      onChange={(e) => setFormData(prev => ({ ...prev, company: e.target.value }))}
                      className="w-full px-4 py-2 bg-white/10 dark:bg-gray-800/20 border border-white/20 dark:border-gray-700/20 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-200"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Relationship Type
                    </label>
                    <select
                      value={formData.relationshipType}
                      onChange={(e) => setFormData(prev => ({ ...prev, relationshipType: e.target.value as any }))}
                      className="w-full px-4 py-2 bg-white/10 dark:bg-gray-800/20 border border-white/20 dark:border-gray-700/20 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-200"
                    >
                      <option value="networking">Networking</option>
                      <option value="recruiter">Recruiter</option>
                      <option value="hiring-manager">Hiring Manager</option>
                      <option value="referral">Referral</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    className="w-full px-4 py-2 bg-white/10 dark:bg-gray-800/20 border border-white/20 dark:border-gray-700/20 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-200"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Phone
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                      className="w-full px-4 py-2 bg-white/10 dark:bg-gray-800/20 border border-white/20 dark:border-gray-700/20 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-200"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      LinkedIn
                    </label>
                    <input
                      type="url"
                      value={formData.linkedin}
                      onChange={(e) => setFormData(prev => ({ ...prev, linkedin: e.target.value }))}
                      className="w-full px-4 py-2 bg-white/10 dark:bg-gray-800/20 border border-white/20 dark:border-gray-700/20 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-200"
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
                    {editingContact ? 'Update' : 'Save'} Contact
                  </motion.button>
                </div>
              </form>
            </div>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
}