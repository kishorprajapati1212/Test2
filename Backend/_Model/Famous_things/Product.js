const mongooes = require("mongoose");

const productSchema = new mongooes.Schema({
   productId: {
      type: mongooes.Schema.Types.ObjectId,
      default: () => new mongooes.Types.ObjectId(),
   },
   stateId: mongooes.Schema.Types.ObjectId,
   State_name: String,
   product_name: String,
   product_description: [String],
   contact: [
      {
         name: String,
         email: String,
         phone: Number,
         preference: Boolean,
      }
   ],
   product_images: [String],
   product_category: String,
   product_model: String,
   product_url: String,
   product_public_url: String,
});

const productmodel = mongooes.model("product", productSchema);
module.exports = productmodel;