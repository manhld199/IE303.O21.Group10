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
const articleSchema = new mongoose.Schema(
  {
    _id: { type: mongoose.Schema.Types.ObjectId },
    article_title: { type: String },
    article_subtitle: { type: String },
    article_slug: { type: String },
    article_type: { type: String },
    article_avt: {
      url: { type: String },
      alt: { type: String },
    },
    article_author: { type: String },
    article_published_date: { type: Date },
    article_short_description: { type: String },
    article_description: { type: String },
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

// create model
const Article = mongoose.model("Article", articleSchema);

// read json file
const rawArticles = JSON.parse(
  fs.readFileSync(
    path.join(__dirname, "..", "raw", "FORCATSHOP.articles.json"),
    "utf8"
  )
);

// filter
const filteredArticles = rawArticles.map((article) => ({
  _id: new mongoose.Types.ObjectId(article._id["$oid"]),
  article_title: article.article_name,
  article_subtitle: article.article_subtitle,
  article_slug: article.article_slug,
  article_avt: { url: article.article_avt.link, alt: article.article_avt.alt },
  article_type: article.article_type,
  article_author: article.article_info.article_author,
  article_published_date: article.article_info.article_published_dates,
  article_short_description: article.article_short_description,
  article_description: article.article_content,
}));

// save to mongodb
Article.create(filteredArticles)
  .then((data) => {
    console.log("Success! Articles added to mongodb", data);
    // save to json file
    fs.writeFileSync(
      path.join(__dirname, "articles.filtered.json"),
      JSON.stringify(data)
    );
  })
  .catch((err) => {
    console.log("Error", err);
  });
