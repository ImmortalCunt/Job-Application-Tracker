export type ApplicationStatus = 'applied' | 'screening' | 'interview' | 'offer' | 'rejected' | 'withdrawn';

export interface Application {
  id: string;
  companyName: string;
  jobTitle: string;
  location: string;
  jobType: 'full-time' | 'part-time' | 'contract' | 'internship';
  industry: string;
  applicationDate: string;
  status: ApplicationStatus;
  priority: 'low' | 'medium' | 'high';
  salary?: string;
  jobUrl?: string;
  description?: string;
  notes?: string;
  resumeVersion?: string;
  coverLetterVersion?: string;
  referralSource?: string;
  followUpDate?: string;
  interviewDates?: InterviewDate[];
  tasks?: Task[];
  contactIds?: string[];
}

export interface InterviewDate {
  id: string;
  date: string;
  time: string;
  type: 'phone' | 'video' | 'in-person' | 'technical';
  interviewer?: string;
  notes?: string;
  outcome?: 'pending' | 'passed' | 'failed';
}

export interface Contact {
  id: string;
  name: string;
  role: string;
  company: string;
  email?: string;
  phone?: string;
  linkedin?: string;
  notes?: string;
  relationshipType: 'recruiter' | 'hiring-manager' | 'referral' | 'networking' | 'other';
  lastContactDate?: string;
  applicationIds?: string[];
}

export interface Document {
  id: string;
  name: string;
  type: 'resume' | 'cover-letter' | 'portfolio' | 'other';
  fileName: string;
  uploadDate: string;
  applicationIds?: string[];
}

export interface Task {
  id: string;
  title: string;
  completed: boolean;
  dueDate?: string;
  priority: 'low' | 'medium' | 'high';
}

export interface AppData {
  applications: Application[];
  contacts: Contact[];
  documents: Document[];
  preferences: {
    theme: 'light' | 'dark';
    currency: string;
    dateFormat: string;
  };
}