-- 1. Subjects Policies (formerly Courses)
-- Admin: Full Access
CREATE POLICY "Admins can do everything on subjects" ON subjects
  FOR ALL
  USING (auth.jwt() ->> 'role' = 'admin');

-- Student: Read-Only, Filtered by Class (via class_subjects join logic or generic public access if simplistic)
-- Note: 'subjects' table is generic. 'class_subjects' links it. 
-- For simplicity, students can read all generic subjects, or you can implement complex join logic.
-- Let's allow read all subjects for now as they are generic definitions.
CREATE POLICY "Students can view all subjects" ON subjects
  FOR SELECT
  USING (auth.jwt() ->> 'role' = 'student');

-- Teacher: Read-Only
CREATE POLICY "Teachers can view all subjects" ON subjects
  FOR SELECT
  USING (auth.jwt() ->> 'role' = 'teacher');


-- 2. Schedule Policies
-- Admin: Full Access
CREATE POLICY "Admins can do everything on schedule" ON schedule
  FOR ALL
  USING (auth.jwt() ->> 'role' = 'admin');

-- Student: Read-Only, Filtered by Class
CREATE POLICY "Students can view schedule of their class" ON schedule
  FOR SELECT
  USING (
    auth.jwt() ->> 'role' = 'student' 
    AND classe = (auth.jwt() ->> 'classe')
  );

-- Teacher: Read-Only (Simplification)
CREATE POLICY "Teachers can view all schedule" ON schedule
  FOR SELECT
  USING (auth.jwt() ->> 'role' = 'teacher');


-- 3. Grades Policies
-- Admin: Full Access
CREATE POLICY "Admins can do everything on grades" ON grades
  FOR ALL
  USING (auth.jwt() ->> 'role' = 'admin');

-- Teacher: Full Access to Manage
CREATE POLICY "Teachers can manage grades" ON grades
  FOR ALL
  USING (auth.jwt() ->> 'role' = 'teacher');

-- Student: Read-Only, Own Grades Only
CREATE POLICY "Students can view only their own grades" ON grades
  FOR SELECT
  USING (
    auth.jwt() ->> 'role' = 'student' 
    AND student_id = auth.uid()
  );
