const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['admin', 'doctor'], required: true },
});
const User = mongoose.model('User', UserSchema);