const { default: mongoose } = require("mongoose");

const bcrypt = require("bcryptjs");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    maxLength: 50
  },
  email: {
    type: String,
    trim: true,
    unique: true
  },
  password: {
    type: String,
    minLength: 5
  },
  role: {
    type: Number,
    default: 0
  },
  image: {
    String
  },
  cart: {
    type: Array,
    default:[]
  },
  history: {
    type: Array,
    default:[]
  }
});

// 꼭 모델위에 작성해줘야 함.모델 전에 동작되어야 하므로
// pre메소드 => 유저데이터를 몽고디비에 저장하기 전에 콜백함수 호출함

userSchema.pre('save', async function (next) {
  let user = this; //user 데이터

  //만약 패스워드를 수정하면
  if (user.isModified('password')) {
    //salt와 hash로 암호화함
    const salt = await bcrypt.genSalt(10); 
    const hash = await bcrypt.hash(user.password, salt);

    //hash된 password로 넣어줌
    user.password = hash;
  }

  next();
})

userSchema.methods.comparePassword = async function (plainPassword) {
  let user = this;
  const match = await bcrypt.compare(plainPassword, user.password);
  return match;
};

const User = mongoose.model("User", userSchema);


//다른 모듈에서 사용할 수 있도록
module.exports = User;