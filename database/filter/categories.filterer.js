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
const categorySchema = new mongoose.Schema(
  {
    _id: { type: mongoose.Schema.Types.ObjectId },
    category_name: { type: String },
    category_slug: { type: String },
    category_img: {
      url: { type: String },
      alt: { type: String },
    },
    category_short_description: { type: String },
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

// create model
const Category = mongoose.model("Category", categorySchema);

// read json file
const rawCategories = JSON.parse(
  fs.readFileSync(
    path.join(__dirname, "..", "raw", "FORCATSHOP.categories.json"),
    "utf8"
  )
);

// filter
const filteredCategories = rawCategories.map((category) => ({
  _id: new mongoose.Types.ObjectId(category._id["$oid"]),
  category_name: category.category_name,
  category_slug: category.category_slug,
  category_img: {
    url: category.category_img,
    alt: category.category_name,
  },
  category_short_description: category.category_short_description,
}));

// save to mongodb
Category.create(filteredCategories)
  .then((data) => {
    console.log("Success! Categories added to mongodb", data);
    // save to json file
    fs.writeFile(
      path.join(__dirname, "..", "filtered", "categories.filtered.json"),
      JSON.stringify(data),
      (error) => {
        if (error) {
          console.error("Lỗi khi lưu tệp JSON:", error);
        } else {
          console.log("Kết quả đã được lưu vào tệp categories.filtered.json");
        }
      }
    );
  })
  .catch((err) => {
    console.log("Error", err);
  });
