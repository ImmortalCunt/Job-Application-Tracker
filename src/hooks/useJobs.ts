import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient.js';
import toast from 'react-hot-toast';

export interface Job {
  id: string;
  company: string;
  title: string;
  niche?: string;
  status: string;
  notes?: string;
  applied_at: string;
  created_at: string;
  updated_at: string;
}

export interface JobInput {
  company: string;
  title: string;
  niche?: string;
  status?: string;
  notes?: string;
  applied_at?: string;
}

export function useJobs() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch all jobs from Supabase
  const fetchJobs = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const { data, error } = await supabase
        .from('jobs')
        .select('*')
        .order('applied_at', { ascending: false });

      if (error) {
        throw error;
      }

      setJobs(data || []);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch jobs';
      setError(errorMessage);
      console.error('Error fetching jobs:', err);
      toast.error('Failed to load jobs');
    } finally {
      setLoading(false);
    }
  };

  // Save a job (insert or update)
  const saveJob = async (jobData: JobInput, existingId?: string) => {
    try {
      let result;
      
      if (existingId) {
        // Update existing job
        result = await supabase
          .from('jobs')
          .update({
            ...jobData,
            updated_at: new Date().toISOString()
          })
          .eq('id', existingId)
          .select()
          .single();
      } else {
        // Insert new job
        result = await supabase
          .from('jobs')
          .insert([jobData])
          .select()
          .single();
      }

      if (result.error) {
        throw result.error;
      }

      // Update local state
      if (existingId) {
        setJobs(prev => prev.map(job => 
          job.id === existingId ? result.data : job
        ));
        toast.success('Job updated successfully');
      } else {
        setJobs(prev => [result.data, ...prev]);
        toast.success('Job added successfully');
      }

      return result.data;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to save job';
      console.error('Error saving job:', err);
      toast.error(errorMessage);
      throw err;
    }
  };

  // Delete a job
  const deleteJob = async (id: string) => {
    try {
      const { error } = await supabase
        .from('jobs')
        .delete()
        .eq('id', id);

      if (error) {
        throw error;
      }

      // Update local state
      setJobs(prev => prev.filter(job => job.id !== id));
      toast.success('Job deleted successfully');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to delete job';
      console.error('Error deleting job:', err);
      toast.error(errorMessage);
      throw err;
    }
  };

  // Load jobs on mount
  useEffect(() => {
    fetchJobs();
  }, []);

  return {
    jobs,
    loading,
    error,
    fetchJobs,
    saveJob,
    deleteJob
  };
}