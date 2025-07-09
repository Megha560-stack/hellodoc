const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Connect to your MongoDB
mongoose.connect('mongodb+srv://megha11:akash12357@cluster0.a4jewim.mongodb.net/internship?retryWrites=true&w=majority&appName=Cluster0' ,
{
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('✅ MongoDB connected for seeding');
  seedUsers(); // Start seeding once connected
})
.catch((err) => {
  console.error('❌ MongoDB connection failed:', err);
  process.exit(1);
});

// Define User Schema (same as in user.js)
const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['admin', 'doctor'], required: true }
});

const User = mongoose.model('User', UserSchema);

// Seed function
async function seedUsers() {
  try {
    // Hash passwords
    const hashedAdminPassword = await bcrypt.hash('admin123', 10);
    const hashedDoctorPassword = await bcrypt.hash('doc123', 10);

    // Define users
    const users = [
      { username: 'admin1', password: hashedAdminPassword, role: 'admin' },
      { username: 'doctor1', password: hashedDoctorPassword, role: 'doctor' }
    ];

    // Clear existing users if needed (optional)
    await User.deleteMany({});
    
    // Insert users
    await User.insertMany(users);

    console.log('✅ Admin and doctor users created successfully');
    process.exit(); // Exit when done
  } catch (err) {
    console.error('❌ Seeding failed:', err);
    process.exit(1);
  }
}

