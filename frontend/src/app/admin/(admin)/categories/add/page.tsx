"use client";

// import libs
import React, { useRef, useState } from "react";

// import utils
import { BACKEND_URL } from "@/utils/commonConst";
import { createSlug } from "@/utils";

// import css
import "./page.css";

const handleChangeImg = (event: any) => {
  const current = event.currentTarget;
  const files = Array.from(current.files);

  let nextElement = current.nextSibling;
  if (nextElement) nextElement.remove();

  nextElement = document.createElement("div");
  nextElement.classList.add("add-category-main__preview-image-div");
  nextElement.innerHTML = `${files
    .map(
      (file: any, index) => `<img
                        class="add-category-main__preview-image"
                        src=${URL.createObjectURL(file)}
                        alt="Preview"
                      />`
    )
    .join("")}`;

  const addedElement = current.parentNode.insertBefore(
    nextElement,
    current.nextSibling
  );
};

const uploadImages = async (files: any) => {
  const urls = [];

  for (const file of files) {
    const uploadData = new FormData();

    uploadData.append("file", file);
    uploadData.append("upload_preset", "java_images");

    const uploadResponse = await fetch(
      `https://api.cloudinary.com/v1_1/dmjwq3ebx/image/upload`,
      {
        method: "POST",
        body: uploadData,
      }
    );

    if (uploadResponse.ok) {
      const imageData = await uploadResponse.json();
      // console.log("imgdata", imageData);
      urls.push(imageData.public_id);
    } else {
      alert("Failed to upload image");
    }
  }

  return urls;
};

const addCategory = async (category: any) => {
  try {
    console.log(
      "Sending request to:",
      `${BACKEND_URL}/admin/categories/addCategory`
    );
    console.log("Request payload:", JSON.stringify(category));

    const res = await fetch(`${BACKEND_URL}/admin/categories/addCategory`, {
      method: "POST",
      body: JSON.stringify(category),
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log("Response status:", res.status);
    console.log("Response body:", await res.text());

    if (res.ok) location.href = "/admin/categories";
    else alert("Try again later!");
  } catch (err) {
    console.log(err);
  }
};

const handleSubmitForm = async (event: any) => {
  event?.preventDefault();
  const addCategoryForm = document.querySelector("#add-category-form");

  const categoryName = (
    addCategoryForm?.querySelector(
      "input[name='category_name']"
    ) as HTMLInputElement
  ).value;
  //   console.log(categoryName);

  const categoryImgFiles = Array.from(
    (document.querySelector("input[name='category_img']") as HTMLInputElement)
      .files
  );

  const categoryAlt = createSlug(
    (
      addCategoryForm?.querySelector(
        "input[name='category_image_alt']"
      ) as HTMLInputElement
    ).value
  );
  // console.log(categoryAlt);

  const categoryImgUrls = await uploadImages(categoryImgFiles);
  // console.log("1 category up url", categoryImgUrls);

  // const categoryCategories = (
  //   addCategoryForm?.querySelector(
  //     "input[name='category_categories']"
  //   ) as HTMLInputElement
  // ).value
  //   .split(",")
  //   .map((category) => category.trim());
  //   console.log(categoryCategories);

  const categoryShortDescription = (
    addCategoryForm?.querySelector(
      "input[name='category_short_description']"
    ) as HTMLInputElement
  ).value;
  // console.log(categoryShortDescription);

  const categoryImg = categoryImgUrls.map((file, index) => ({
    url: file,
    alt: createSlug(categoryAlt + "-" + (index + 1)),
  }));
  const formData = {
    category_name: categoryName,
    category_img: categoryImg,
    category_short_description: categoryShortDescription,
  };

  // console.log("formdata", formData);

  addCategory(formData);
};

export default function AdminAddcategoryPage() {
  return (
    <main className="add-category-container">
      <section className="add-category-head">
        <h2>Thêm danh mục</h2>
        <button
          form="add-category-form"
          className="add-category-head__add-btn"
          type="submit">
          <span className="material-icons-round add-category-head__add-btn-icon">
            save
          </span>
          <span className="add-category-head__add-btn-text">Thêm danh mục</span>
        </button>
      </section>

      <form
        id="add-category-form"
        className="add-category-main"
        onSubmit={handleSubmitForm}>
        <div className="add-category-form-left">
          <section className="add-category-info add-category-section">
            <div className="add-category-main__title-div">
              <h3 className="add-category-main__title">Thông tin danh mục</h3>
            </div>

            <div className="add-category-main__input-group">
              <div className="add-category-main__input-row">
                <h5>Tên danh mục</h5>
                <input
                  className="add-category-main__input"
                  placeholder="Nhập tên danh mục"
                  type="text"
                  name="category_name"
                  required
                />
              </div>

              <div className="add-category-main__input-row">
                <h5>Hình ảnh</h5>
                <input
                  className="add-category-main__input"
                  placeholder="Nhập văn bản thay thế"
                  type="text"
                  name="category_image_alt"
                  required
                />
                <input
                  type="file"
                  name="category_img"
                  multiple
                  onChange={handleChangeImg}
                  className="add-image-input"
                />
              </div>

              <div className="add-category-main__input-row">
                <h5>Mô tả ngắn</h5>
                <input
                  className="add-category-main__input"
                  placeholder="Nhập mô tả ngắn"
                  type="text"
                  name="category_short_description"
                  required
                />
              </div>
            </div>
          </section>
        </div>
      </form>

      <button
        form="add-category-form"
        className="add-category-head__add-btn"
        type="submit">
        <span className="material-icons-round add-category-head__add-btn-icon">
          save
        </span>
        <span className="add-category-head__add-btn-text">Thêm danh mục</span>
      </button>
    </main>
  );
}
