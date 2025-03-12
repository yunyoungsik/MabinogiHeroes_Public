import { Schema, model, models } from 'mongoose';
import bcrypt from 'bcryptjs';

const UserSchema = new Schema(
  {
    email: {
      type: String,
      unique: [true, 'EMAIL already exists!'],
      required: [true, 'EMAIL is required!'],
    },
    password: {
      type: String,
      required: [true, 'Password is required!'],
    },
    username: {
      type: String,
      required: [true, 'Username is required!'],
      match: [
        /^(?=.{2,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._가-힣]+(?<![_.])$/,
        'Username invalid, it should contain 2-20 alphanumeric or Korean letters and be unique!',
      ],
    },
    role: {
      type: String,
      default: 'member',
    },
  },
  { timestamps: true }
);

UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next(); // 비밀번호 변경 시에만 해싱
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

UserSchema.methods.matchPassword = async function (enteredPassword) {
  // 입력된 비밀번호와 저장된 해시된 비밀번호를 비교하여 일치 여부를 반환
  // return await bcrypt.compare(enteredPassword, this.password);
  try {
    return await bcrypt.compare(enteredPassword, this.password);
  } catch (error) {
    console.error('비밀번호 비교 오류:', error);
    return false;
  }
};

const User = models.User || model('User', UserSchema);

export default User;
