// import libs
const fs = require("fs");
const path = require("path");

// connect to mongoDB
const mongoose = require("mongoose");

const connect = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://admin:admin@forcat-java.zr8wzwd.mongodb.net/forcatshop?retryWrites=true&w=majority&appName=forcat-java"
    );
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log(error);
  }
};

connect();

// create schema
const productSchema = new mongoose.Schema(
  {
    _id: { type: mongoose.Schema.Types.ObjectId },
    product_name: { type: String },
    product_slug: { type: String },
    categories: [
      {
        category_id: { type: mongoose.Schema.Types.ObjectId },
        category_name: { type: String },
      },
    ],
    product_imgs: [
      {
        url: { type: String },
        alt: { type: String },
      },
    ],
    product_short_description: { type: String },
    product_description: { type: String },
    product_details: { type: Object },
    product_variants: [
      {
        variant_name: { type: String },
        variant_slug: { type: String },
        variant_price: { type: Number },
        // check
        variant_img: {
          url: { type: String },
          alt: { type: String },
        },
        // check
        variant_discount: {
          discount_id: { type: mongoose.Schema.Types.ObjectId },
          discount_amount: { type: Number },
        },
        variant_in_stock: { type: Number },
      },
    ],
    product_supp_price: { type: Number },
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

// create model
const Product = mongoose.model("Product", productSchema);

// read json file
const rawProducts = JSON.parse(
  fs.readFileSync(
    path.join(__dirname, "..", "raw", "FORCATSHOP.products.json"),
    "utf8"
  )
);

// filter
const filteredProducts = rawProducts.map((product) => ({
  _id: new mongoose.Types.ObjectId(product._id["$oid"]),
  product_name: product.product_name,
  product_slug: product.product_slug,
  categories: product.categories.map((category, index) => ({
    category_id: new mongoose.Types.ObjectId(category["$oid"]),
    category_name: product.category_names[index],
  })),
  product_imgs: product.product_imgs.map((img) => ({
    url: img.link,
    alt: img.alt,
  })),
  product_short_description: product.product_short_description,
  product_description: product.product_description,
  product_details: product.product_detail,
  product_variants: product.product_variants.map((variant) => ({
    variant_name: variant.variant_name,
    variant_slug: variant.variant_slug,
    variant_price: variant.price,
    variant_img: {
      url: variant.variant_imgs[0].link,
      alt: variant.variant_imgs[0].alt,
    },
    variant_discount: {
      discount_id: new mongoose.Types.ObjectId(
        variant.discount_id?.["$oid"] ?? null
      ),
      discount_amount: variant.discount_amount,
    },
    variant_in_stock: variant.in_stock,
  })),
  product_supp_price: product.product_supp_price,
}));

// save to mongodb
Product.create(filteredProducts)
  .then((data) => {
    console.log("Success! Products added to mongodb", data);
    // save to json file
    fs.writeFileSync(
      path.join(__dirname, "products.filtered.json"),
      JSON.stringify(data)
    );
  })
  .catch((err) => {
    console.log("Error", err);
  });
