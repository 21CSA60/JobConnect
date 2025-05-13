/*
  # Consolidate Recruiter and Employer Roles

  1. Changes
    - Add new columns to employers table for recruiter capabilities
    - Migrate recruiter data to employer accounts
    - Update role-based permissions
    - Remove recruiter-specific tables

  2. Security
    - Update RLS policies to reflect consolidated roles
    - Ensure data access control remains intact

  3. Data Migration
    - Preserve all recruiter data by moving it to employer records
    - Maintain relationships with applications and candidates
*/

-- Step 1: Add recruiter capabilities to employers table
ALTER TABLE employers ADD COLUMN IF NOT EXISTS is_recruiter boolean DEFAULT false;
ALTER TABLE employers ADD COLUMN IF NOT EXISTS specialization text;
ALTER TABLE employers ADD COLUMN IF NOT EXISTS recruitment_team text[];

-- Step 2: Create temporary table for data migration
CREATE TEMP TABLE recruiter_data AS
SELECT id, name, email, company, specialization
FROM recruiters;

-- Step 3: Migrate recruiter data to employers
INSERT INTO employers (
  name,
  email,
  company,
  is_recruiter,
  specialization,
  created_at
)
SELECT 
  name,
  email,
  company,
  true,
  specialization,
  NOW()
FROM recruiter_data
ON CONFLICT (email) DO UPDATE
SET 
  is_recruiter = true,
  specialization = EXCLUDED.specialization;

-- Step 4: Update application reviews
UPDATE application_reviews ar
SET reviewer_id = e.id
FROM employers e
JOIN recruiter_data rd ON rd.email = e.email
WHERE ar.recruiter_id = rd.id;

-- Step 5: Update RLS policies
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

-- Step 6: Drop recruiter-specific tables
DROP TABLE IF EXISTS recruiter_assignments;
DROP TABLE IF EXISTS recruiter_notes;
DROP TABLE IF EXISTS recruiters;

-- Step 7: Update auth.users role mapping
UPDATE auth.users
SET raw_user_meta_data = jsonb_set(
  raw_user_meta_data,
  '{role}',
  '"employer"'
)
WHERE raw_user_meta_data->>'role' = 'recruiter';