"use client";

// import libs
import classNames from "classnames/bind";
import { useState, useRef } from "react";
import { CldImage } from "next-cloudinary";

// import css
import styles from "./slider.module.css";

// import interface
import { ISliderImage } from "../../interfaces";

// use css
const cx = classNames.bind(styles);

export default function CustomerProductSlider({
  productImgs,
  desktopOnly,
  mobileOnly,
  tabletOnly,
  ...prop
}: {
  productImgs: ISliderImage[];
  desktopOnly?: string;
  mobileOnly?: string;
  tabletOnly?: string;
}) {
  // border thumbnail when hovered
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState(0);
  const isHovered = (currentIndex: number, hoveredIndex: number) => {
    return currentIndex == hoveredIndex ? "slider__hovered" : "";
  };

  // change main image src when hovered
  const [mainImageSrc, setMainImageSrc] = useState(productImgs[0].url);
  const [mainImageAlt, setMainImageAlt] = useState(
    productImgs[productImgs.length - 1].alt
  );

  const handleMouseOver = (index: number) => {
    setHoveredIndex(index);
    setMainImageSrc(productImgs[index].url);
    setMainImageAlt(productImgs[index].alt);
  };

  // scroll thumbnails container when button is clicked
  const thumbnailsContainer = useRef(null);
  const SCROLL_OFFSET = 200;
  const handleScrollLeft = () => {
    if (thumbnailsContainer.current) {
      const container = thumbnailsContainer.current as HTMLDivElement;

      // Ensure new scroll position doesn't go beyond 0 (leftmost point)
      const newScrollPosition = Math.max(
        container.scrollLeft - SCROLL_OFFSET,
        0
      );

      container.scrollLeft = newScrollPosition; // Update scroll position
    }
  };
  const handleScrollRight = () => {
    if (thumbnailsContainer.current) {
      const container = thumbnailsContainer.current as HTMLDivElement;
      const containerWidth = container.offsetWidth; // Get container width
      const totalScrollWidth = container.scrollWidth; // Get total scrollable width (all thumbnails)

      // Calculate maximum scroll position (rightmost point)
      const maxScrollPosition = totalScrollWidth - containerWidth;

      // Ensure new scroll position doesn't exceed the maximum
      const newScrollPosition = Math.min(
        container.scrollLeft + SCROLL_OFFSET,
        maxScrollPosition
      );

      container.scrollLeft = newScrollPosition; // Update scroll position
    }
  };

  // Function to handle left button click (updated for potential edge cases)
  const handleClickLeft = () => {
    let newIndex = currentIndex - 1;

    // Handle edge case: Decrementing from first index
    if (newIndex < 0) {
      newIndex = productImgs.length - 1; // Wrap around to last index
    }

    setCurrentIndex(newIndex);
    setMainImageSrc(productImgs[newIndex].url);
    setMainImageAlt(productImgs[newIndex].alt);
    handleMouseOver(newIndex); // Update hovered state and potentially class

    if (currentIndex < productImgs.length - 2 && newIndex % 2 == 1)
      handleScrollLeft();
  };

  // Function to handle right button click
  const handleClickRight = () => {
    let newIndex = currentIndex + 1;

    // Handle edge case: Incrementing past last index
    if (newIndex >= productImgs.length) {
      newIndex = 0; // Wrap around to first index
    }

    setCurrentIndex(newIndex);
    setMainImageSrc(productImgs[newIndex].url);
    setMainImageAlt(productImgs[newIndex].alt);
    handleMouseOver(newIndex); // Update hovered state and potentially class

    if (currentIndex > 2 && newIndex % 2 == 0) handleScrollRight();
  };

  return (
    <section className={cx("slider")}>
      <div className={cx("slider__main-container")}>
        <div className={cx("slider__main-image-div")}>
          <CldImage
            className={cx("slider__main-image")}
            src={mainImageSrc}
            alt={mainImageAlt}
            fill={true}
          />
        </div>

        {currentIndex > 0 && (
          <button
            className={cx("slider__btn", "slider__back", desktopOnly)}
            onClick={handleClickLeft}
            type="button">
            <span className={cx("material-icons-round", "slider__icon")}>
              arrow_back_ios
            </span>
          </button>
        )}

        {currentIndex < productImgs.length - 1 && (
          <button
            className={cx("slider__btn", "slider__forward", desktopOnly)}
            onClick={handleClickRight}
            type="button">
            <span className={cx("material-icons-round", "slider__icon")}>
              arrow_forward_ios
            </span>
          </button>
        )}

        <div className={cx("slider__current-index")}>
          {hoveredIndex + 1}/{productImgs.length}
        </div>
      </div>

      <div className={cx("slider__thumbnails-div")}>
        <div className={cx("slider__thumbnails")} ref={thumbnailsContainer}>
          {(productImgs.slice(0, productImgs.length) ?? []).map(
            (img, index) => (
              <div className={cx("slider__thumbnail-div")} key={index}>
                <CldImage
                  className={cx(
                    "slider__thumbnail",
                    isHovered(index, hoveredIndex)
                  )}
                  onMouseOver={() => handleMouseOver(index)}
                  src={img.url}
                  alt={img.alt}
                  fill={true}
                />
              </div>
            )
          )}
        </div>

        <button
          className={cx("slider__btn", "slider__back", tabletOnly)}
          onClick={handleScrollLeft}
          type="button">
          <span className={cx("material-icons-round", "slider__icon")}>
            arrow_back_ios
          </span>
        </button>

        <button
          className={cx("slider__btn", "slider__forward", tabletOnly)}
          onClick={handleScrollRight}
          type="button">
          <span className={cx("material-icons-round", "slider__icon")}>
            arrow_forward_ios
          </span>
        </button>
      </div>
    </section>
  );
}
