const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect('mongodb+srv://megha11:akash12357@cluster0.a4jewim.mongodb.net/internship?retryWrites=true&w=majority&appName=Cluster0')
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error("❌ MongoDB connection error:", err));

// Models
const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['admin', 'doctor'], required: true },
});
const User = mongoose.model('User', UserSchema);

const DoctorSchema = new mongoose.Schema({
  name: String,
  specialization: String,
});
const Doctor = mongoose.model('Doctor', DoctorSchema);

const PatientSchema = new mongoose.Schema({
  name: String,
  age: Number,
  gender: String,
  contact: String,
  department: String,
  disease: String,
  doctor: String,
  date: {
    type: Date,
    default: Date.now,
  },
});
const Patient = mongoose.model('Patient', PatientSchema);

// ✅ Seed Admin User (Run once)
async function seedAdmin() {
  try {
    const username = 'admin1';
    const password = 'admin123';

    const existing = await User.findOne({ username });
    if (existing) {
      console.log('ℹ️ Admin already exists');
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({ username, password: hashedPassword, role: 'admin' });

    console.log('✅ Admin user seeded: username=admin1, password=admin123');
  } catch (err) {
    console.error('❌ Error seeding admin user:', err);
  }
}
seedAdmin();

// ✅ Login Route
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ success: false, message: 'Username and password are required' });
  }

  try {
    const user = await User.findOne({ username: username.trim() });
    if (!user) {
      console.log(`❌ User not found: ${username}`);
      return res.status(401).json({ success: false, message: 'Invalid username or password' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log(`❌ Password mismatch for user: ${username}`);
      return res.status(401).json({ success: false, message: 'Invalid username or password' });
    }

    console.log(`✅ Login successful: ${user.username}, Role: ${user.role}`);
    res.status(200).json({ success: true, role: user.role });
  } catch (err) {
    console.error('❌ Login error:', err);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// ✅ Signup Route
app.post('/api/signup', async (req, res) => {
  const { username, password, role } = req.body;

  if (!username || !password || !role) {
    return res.status(400).json({ success: false, message: 'All fields are required' });
  }

  if (role === 'admin') {
    return res.status(403).json({ success: false, message: 'Signup not allowed for admin role' });
  }

  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ success: false, message: 'Username already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({ username, password: hashedPassword, role });

    console.log(`✅ Doctor registered: ${username}`);
    res.status(201).json({ success: true, message: 'Doctor registered successfully' });
  } catch (err) {
    console.error('❌ Signup error:', err);
    res.status(500).json({ success: false, message: 'Server error during signup' });
  }
});

// ✅ Doctor Routes
app.post('/doctors', async (req, res) => {
  try {
    const { name, specialization } = req.body;
    const doctor = new Doctor({ name, specialization });
    await doctor.save();
    res.status(201).json({ success: true, message: 'Doctor added', doctor });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error adding doctor' });
  }
});

app.get('/doctors', async (req, res) => {
  try {
    const doctors = await Doctor.find();
    res.status(200).json(doctors);
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error fetching doctors' });
  }
});

app.delete('/doctors/:id', async (req, res) => {
  try {
    await Doctor.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: 'Doctor deleted' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error deleting doctor' });
  }
});

// ✅ Patient Routes
app.post('/patients', async (req, res) => {
  try {
    const patient = new Patient(req.body);
    await patient.save();
    res.status(201).json({ success: true, message: 'Patient added successfully' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error adding patient' });
  }
});

app.get('/patients', async (req, res) => {
  try {
    const patients = await Patient.find();
    res.status(200).json(patients);
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error fetching patients' });
  }
});

app.delete('/patients/:id', async (req, res) => {
  try {
    const deleted = await Patient.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Patient not found' });
    }
    res.status(200).json({ success: true, message: 'Patient deleted' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error deleting patient' });
  }
});

// ✅ Start Server
app.listen(5000, () => {
  console.log(`🚀 Server running at 5000`);
  console.log('🔐 Ready to receive login/signup requests');
});