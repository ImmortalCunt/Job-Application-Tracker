import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { AppData, Application, Contact, Document } from '../types';

interface AppContextType {
  data: AppData;
  addApplication: (application: Omit<Application, 'id'>) => void;
  updateApplication: (id: string, updates: Partial<Application>) => void;
  deleteApplication: (id: string) => void;
  addContact: (contact: Omit<Contact, 'id'>) => void;
  updateContact: (id: string, updates: Partial<Contact>) => void;
  deleteContact: (id: string) => void;
  addDocument: (document: Omit<Document, 'id'>) => void;
  deleteDocument: (id: string) => void;
  updatePreferences: (preferences: Partial<AppData['preferences']>) => void;
  exportData: () => void;
  importData: (data: AppData) => void;
}

const AppContext = createContext<AppContextType | null>(null);

type Action = 
  | { type: 'SET_DATA'; payload: AppData }
  | { type: 'ADD_APPLICATION'; payload: Application }
  | { type: 'UPDATE_APPLICATION'; payload: { id: string; updates: Partial<Application> } }
  | { type: 'DELETE_APPLICATION'; payload: string }
  | { type: 'ADD_CONTACT'; payload: Contact }
  | { type: 'UPDATE_CONTACT'; payload: { id: string; updates: Partial<Contact> } }
  | { type: 'DELETE_CONTACT'; payload: string }
  | { type: 'ADD_DOCUMENT'; payload: Document }
  | { type: 'DELETE_DOCUMENT'; payload: string }
  | { type: 'UPDATE_PREFERENCES'; payload: Partial<AppData['preferences']> };

const initialData: AppData = {
  applications: [],
  contacts: [],
  documents: [],
  preferences: {
    theme: 'dark',
    currency: 'USD',
    dateFormat: 'MM/dd/yyyy'
  }
};

function appReducer(state: AppData, action: Action): AppData {
  switch (action.type) {
    case 'SET_DATA':
      return action.payload;
    case 'ADD_APPLICATION':
      return {
        ...state,
        applications: [...state.applications, action.payload]
      };
    case 'UPDATE_APPLICATION':
      return {
        ...state,
        applications: state.applications.map(app =>
          app.id === action.payload.id
            ? { ...app, ...action.payload.updates }
            : app
        )
      };
    case 'DELETE_APPLICATION':
      return {
        ...state,
        applications: state.applications.filter(app => app.id !== action.payload)
      };
    case 'ADD_CONTACT':
      return {
        ...state,
        contacts: [...state.contacts, action.payload]
      };
    case 'UPDATE_CONTACT':
      return {
        ...state,
        contacts: state.contacts.map(contact =>
          contact.id === action.payload.id
            ? { ...contact, ...action.payload.updates }
            : contact
        )
      };
    case 'DELETE_CONTACT':
      return {
        ...state,
        contacts: state.contacts.filter(contact => contact.id !== action.payload)
      };
    case 'ADD_DOCUMENT':
      return {
        ...state,
        documents: [...state.documents, action.payload]
      };
    case 'DELETE_DOCUMENT':
      return {
        ...state,
        documents: state.documents.filter(doc => doc.id !== action.payload)
      };
    case 'UPDATE_PREFERENCES':
      return {
        ...state,
        preferences: { ...state.preferences, ...action.payload }
      };
    default:
      return state;
  }
}

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [data, dispatch] = useReducer(appReducer, initialData);

  // Load data from localStorage on mount
  useEffect(() => {
    const savedData = localStorage.getItem('job-tracker-data');
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        dispatch({ type: 'SET_DATA', payload: parsedData });
      } catch (error) {
        console.error('Failed to load saved data:', error);
      }
    }
  }, []);

  // Save data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('job-tracker-data', JSON.stringify(data));
  }, [data]);

  const generateId = () => Date.now().toString() + Math.random().toString(36).substr(2, 9);

  const contextValue: AppContextType = {
    data,
    addApplication: (application) => {
      dispatch({
        type: 'ADD_APPLICATION',
        payload: { ...application, id: generateId() }
      });
    },
    updateApplication: (id, updates) => {
      dispatch({ type: 'UPDATE_APPLICATION', payload: { id, updates } });
    },
    deleteApplication: (id) => {
      dispatch({ type: 'DELETE_APPLICATION', payload: id });
    },
    addContact: (contact) => {
      dispatch({
        type: 'ADD_CONTACT',
        payload: { ...contact, id: generateId() }
      });
    },
    updateContact: (id, updates) => {
      dispatch({ type: 'UPDATE_CONTACT', payload: { id, updates } });
    },
    deleteContact: (id) => {
      dispatch({ type: 'DELETE_CONTACT', payload: id });
    },
    addDocument: (document) => {
      dispatch({
        type: 'ADD_DOCUMENT',
        payload: { ...document, id: generateId() }
      });
    },
    deleteDocument: (id) => {
      dispatch({ type: 'DELETE_DOCUMENT', payload: id });
    },
    updatePreferences: (preferences) => {
      dispatch({ type: 'UPDATE_PREFERENCES', payload: preferences });
    },
    exportData: () => {
      const dataStr = JSON.stringify(data, null, 2);
      const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
      const exportFileDefaultName = `job-tracker-backup-${new Date().toISOString().split('T')[0]}.json`;
      
      const linkElement = document.createElement('a');
      linkElement.setAttribute('href', dataUri);
      linkElement.setAttribute('download', exportFileDefaultName);
      linkElement.click();
    },
    importData: (importData) => {
      dispatch({ type: 'SET_DATA', payload: importData });
    }
  };

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}