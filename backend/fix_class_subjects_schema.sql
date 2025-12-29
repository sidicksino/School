-- FIX SCHEMA: Re-create class_subjects with proper Foreign Keys

-- 1. Drop the old table (Warning: clears curriculum links, but you are rebuilding anyway)
DROP TABLE IF EXISTS public.class_subjects;

-- 2. Create correct table
CREATE TABLE public.class_subjects (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    class_id uuid REFERENCES public.classes(id) ON DELETE CASCADE,
    subject_id uuid REFERENCES public.subjects(id) ON DELETE CASCADE,
    teacher_id uuid REFERENCES public.students(id) ON DELETE SET NULL, -- Teachers are in 'students' table
    coefficient integer DEFAULT 1,
    created_at timestamp with time zone DEFAULT now(),
    
    -- Ensure a subject isn't assigned twice to the same class
    UNIQUE(class_id, subject_id)
);

-- 3. Enable RLS (Optional, but good practice)
ALTER TABLE public.class_subjects ENABLE ROW LEVEL SECURITY;

-- Allow read access to all authenticated users (needed for dashboard)
CREATE POLICY "Enable read access for all users" ON public.class_subjects
    FOR SELECT USING (auth.role() = 'authenticated');

-- Allow write access to admins only (via RPC usually, but good to have)
-- (We rely on SECURITY DEFINER RPCs for management, so this is just fallback)
