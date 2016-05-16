import crypto from 'crypto';
import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: { type: String, required: true, index: { unique: true } },
  passwordHash: { type: String, default: '' },
  salt: { type: String, default: '' },
  createdAt: { type: Date, default: new Date() },
});

UserSchema
  .virtual('password')
  .set(function set(password) {
    this.salt = this.makeSalt();
    this.passwordHash = this.encryptPassword(password);
  });

UserSchema.methods = {
  checkPassword(plainText) {
    return this.encryptPassword(plainText) === this.passwordHash;
  },

  makeSalt() {
    return `${Math.round((new Date().valueOf() * Math.random()))}`;
  },

  encryptPassword(password) {
    try {
      return crypto.createHmac('sha1', this.salt).update(password).digest('hex');
    } catch (err) {
      return '';
    }
  },
};

mongoose.model('User', UserSchema);
