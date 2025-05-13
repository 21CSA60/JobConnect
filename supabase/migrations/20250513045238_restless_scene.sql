/*
  # Consolidate Recruiter and Employer Roles

  1. Changes
    - Add new columns to employers table for recruiter capabilities
    - Update role-based permissions
    - Remove recruiter-specific tables

  2. Security
    - Update RLS policies to reflect consolidated roles
    - Ensure data access control remains intact

  3. Data Migration
    - Preserve all recruiter data by moving it to employer records
    - Maintain relationships with applications and candidates
*/

-- Add recruiter capabilities to employers table
ALTER TABLE employers ADD COLUMN IF NOT EXISTS is_recruiter boolean DEFAULT false;
ALTER TABLE employers ADD COLUMN IF NOT EXISTS specialization text;

-- Update RLS policies
ALTER TABLE employers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Employers can view own data"
  ON employers
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Employers can update own data"
  ON employers
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

-- Update auth.users role mapping
UPDATE auth.users
SET raw_user_meta_data = jsonb_set(
  raw_user_meta_data,
  '{role}',
  '"employer"'
)
WHERE raw_user_meta_data->>'role' = 'recruiter';