/*
  # Create jobs table for job application tracking

  1. New Tables
    - `jobs`
      - `id` (uuid, primary key)
      - `company` (text, required)
      - `title` (text, required)
      - `niche` (text)
      - `status` (text, default 'applied')
      - `notes` (text)
      - `applied_at` (timestamp, default now)
      - `created_at` (timestamp, default now)
      - `updated_at` (timestamp, default now)

  2. Security
    - Enable RLS on `jobs` table
    - Add policy for users to manage their own jobs
*/

CREATE TABLE IF NOT EXISTS jobs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  company text NOT NULL,
  title text NOT NULL,
  niche text,
  status text DEFAULT 'applied',
  notes text,
  applied_at timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE jobs ENABLE ROW LEVEL SECURITY;

-- Allow users to read, insert, update, and delete their own jobs
-- Note: For now, we'll allow all operations since there's no auth
-- In production, you'd want to add user_id column and proper policies
CREATE POLICY "Allow all operations on jobs"
  ON jobs
  FOR ALL
  TO anon
  USING (true)
  WITH CHECK (true);

-- Create function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_jobs_updated_at
  BEFORE UPDATE ON jobs
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();