-- RPC to get curriculum (subjects) for a specific class
CREATE OR REPLACE FUNCTION get_class_curriculum(p_class_id uuid)
RETURNS TABLE (
    id uuid,
    subject_id uuid,
    subject_name text,
    subject_code text,
    coefficient integer,
    teacher_id uuid,
    teacher_name text
) LANGUAGE plpgsql SECURITY DEFINER AS $$
BEGIN
    RETURN QUERY
    SELECT 
        cs.id,
        cs.subject_id,
        s.name as subject_name,
        s.code as subject_code,
        cs.coefficient,
        cs.teacher_id,
        u.full_name as teacher_name
    FROM class_subjects cs
    JOIN subjects s ON cs.subject_id = s.id
    LEFT JOIN students u ON cs.teacher_id = u.id
    WHERE cs.class_id = p_class_id
    ORDER BY s.name ASC;
END;
$$;

-- RPC to manage class subjects (Assign/Update/Remove)
CREATE OR REPLACE FUNCTION manage_class_subject(
    p_action text,
    p_id uuid DEFAULT NULL,
    p_class_id uuid DEFAULT NULL,
    p_subject_id uuid DEFAULT NULL,
    p_teacher_id uuid DEFAULT NULL,
    p_coefficient integer DEFAULT 1
) RETURNS void LANGUAGE plpgsql SECURITY DEFINER AS $$
BEGIN
    IF p_action = 'create' THEN
        -- Check if subject already exists for this class to prevent duplicates
        IF EXISTS (SELECT 1 FROM class_subjects WHERE class_id = p_class_id AND subject_id = p_subject_id) THEN
            RAISE EXCEPTION 'Subject already assigned to this class';
        END IF;

        INSERT INTO class_subjects (class_id, subject_id, teacher_id, coefficient)
        VALUES (p_class_id, p_subject_id, p_teacher_id, p_coefficient);

    ELSIF p_action = 'update' THEN
        UPDATE class_subjects
        SET teacher_id = p_teacher_id,
            coefficient = p_coefficient
        WHERE id = p_id;

    ELSIF p_action = 'delete' THEN
        DELETE FROM class_subjects WHERE id = p_id;
    END IF;
END;
$$;

-- Permissions
GRANT EXECUTE ON FUNCTION get_class_curriculum(uuid) TO authenticated;
GRANT EXECUTE ON FUNCTION manage_class_subject(text, uuid, uuid, uuid, uuid, integer) TO authenticated;
