const { default: mongoose } = require("mongoose");



const productSchema = mongoose.Schema({
  writer: {
    type: Schema.Types.ObjectId,
    ref:'User'
  },
  title: {
    type: String,
    maxLength:30
  },
  description: String,
  price: {
    type: Number,
    default:0
  },
  images:{
    type: Array,
    default:[]
  },
  sold: {
    type: Number,
    default:0
  },
  continents: {
    // 어떤 대륙의 상품을 팔지
    type: Number,
    default:1
  },
  views: {
    type: Number,
    default:0
  }
});


 
const Product = mongoose.model("Product", productSchema);


module.exports = Product;
