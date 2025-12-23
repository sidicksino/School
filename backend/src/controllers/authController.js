
const supabase = require('../config/supabase');
const bcrypt = require('bcrypt');

exports.register = async (req, res) => {
  const { surname, fullname, cycle, classe, phone, password, terms } = req.body;

  // Basic Validation
  if (!surname || !fullname || !cycle || !classe || !phone || !password) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  if (password.length < 6) {
    return res.status(400).json({ error: 'Password must be at least 6 characters' });
  }

  try {
    // 1. Check if user exists
    const { data: existingUser, error: checkError } = await supabase
      .from('students')
      .select('id')
      .eq('surname', surname)
      .single();

    if (existingUser) {
      return res.status(400).json({ error: 'Surname already taken' });
    }

    // 2. Hash Password
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    // 3. Insert into DB
    const { data, error } = await supabase
      .from('students')
      .insert([
        {
          surname,
          full_name: fullname,
          cycle,
          classe,
          phone,
          password_hash: passwordHash,
          terms_accepted: terms,
          role: 'student'
        }
      ])
      .select()
      .single();

    if (error) {
      console.error('Supabase Insert Error:', error);
      return res.status(500).json({ error: 'Database insert failed' });
    }

    res.status(201).json({ success: true, student: data });

  } catch (err) {
    console.error('Server Register Error:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Missing credentials' });
  }

  try {
    // 1. Find User by Surname
    const { data: student, error } = await supabase
      .from('students')
      .select('*')
      .eq('surname', username)
      .single();

    if (error || !student) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // 2. Compare Password
    const match = await bcrypt.compare(password, student.password_hash);

    if (!match) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // 3. Return User (Exclude hash)
    const { password_hash, ...userWithoutHash } = student;
    
    res.json({ success: true, student: userWithoutHash });

  } catch (err) {
    console.error('Server Login Error:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
