const { default: mongoose } = require("mongoose");

// 구매한 사람의 history
const paymentSchema = mongoose.Schema({
  user: {
    // 구매한 사람
    type:Object,
  },
  data: {
    // 결제정보들
    type: Array,
    default:[]
  },
  product: {
    // 구매한 상품 정보들
    type: Array,
    default:[]
  }
},{timestamps:true});

const Payment = mongoose.model("Payment", paymentSchema);

module.exports = Payment;
