import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const adminSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true }
}, { timestamps: true });

// Pre-save hook with next()
adminSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    console.log('Password not modified – skipping hash');
    return next();
  }
  console.log('Hashing password for admin:', this.username);
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  console.log('Hash complete');
  next();
});

adminSchema.methods.comparePassword = async function(candidatePassword) {
  console.log('Compare called with candidate:', candidatePassword);
  console.log('Stored hash:', this.password);
  const result = await bcrypt.compare(candidatePassword, this.password);
  console.log('bcrypt.compare result:', result);
  return result;
};

export default mongoose.model('Admin', adminSchema);