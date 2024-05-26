"use client";

// import libs
import classNames from "classnames/bind";
import React from "react";
import { useState, useEffect } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

// import css
import styles from "./search-result-container.module.css";
const cx = classNames.bind(styles);

// import components
import { CustomerProductCard, CustomerPagination } from "@/components";

export default function SearchContainer({
  itemFind,
  searchResults,
  categories,
}) {
  const router = useRouter();
  const pathName = usePathname();
  const searchParams = useSearchParams();
  // const totalResults = searchResults;
  // const totalPage = searchResults.totalPages;
  // const currentPage = searchResults.currentPage;

  // console.log("Từ khóa tìm kiếm", searchResultsProducts);

  const products = searchResults.products;

  const [selectedFilterItem, setSelectedFilterItem] =
    useState<HTMLDivElement | null>(null);

  const handleFilterItemClick = (event: MouseEvent) => {
    const target = event.target as HTMLElement;
    const isFilterItem = target.closest(
      ".search-result__filter-normal__content_cover"
    );
    const isDropdownContent = target.closest(".dropdown-content__cover");

    // Nếu phần tử được bấm là một mục filter
    if (isFilterItem) {
      const filterItem = isFilterItem as HTMLDivElement;

      // Đặt lại tất cả các mục filter khác
      const filterItems = document.querySelectorAll(
        ".search-result__filter-normal__content_cover"
      );
      filterItems.forEach((item: Element) => {
        if (item !== filterItem) {
          (item as HTMLElement).style.borderColor = ""; // Đặt lại màu viền
          const dropdownContent = item.querySelector(
            ".dropdown-content__cover"
          ) as HTMLDivElement | null;
          if (dropdownContent) {
            dropdownContent.style.display = "none"; // Ẩn dropdown content
          }
        }
      });

      // Hiển thị hoặc ẩn dropdown content cho mục filter được bấm
      if (filterItem.style.borderColor === "brown") {
        filterItem.style.borderColor = ""; // Đặt lại màu viền
        const dropdownContent = filterItem.querySelector(
          ".dropdown-content__cover"
        ) as HTMLDivElement | null;
        if (dropdownContent) {
          dropdownContent.style.display = "none"; // Ẩn dropdown content
        }
      } else {
        filterItem.style.borderColor = "brown"; // Đặt màu viền là nâu
        const dropdownContent = filterItem.querySelector(
          ".dropdown-content__cover"
        ) as HTMLDivElement | null;
        if (dropdownContent) {
          dropdownContent.style.display = "flex"; // Hiển thị dropdown content
        }
      }

      setSelectedFilterItem(filterItem);
    }
  };

  useEffect(() => {
    document.body.addEventListener("click", handleBodyClick);

    // Clean up: Gỡ bỏ sự kiện khi component unmount
    return () => {
      document.body.removeEventListener("click", handleBodyClick);
    };
  }, []);

  const handleBodyClick = (event: MouseEvent) => {
    const target = event.target as HTMLElement;
    const isFilterItem = target.closest(
      ".search-result__filter-normal__content_cover"
    );

    if (!isFilterItem) {
      document
        .querySelectorAll(".search-result__filter-normal__content_cover")
        .forEach((item: Element) => {
          (item as HTMLElement).style.borderColor = ""; // Reset border color
          const dropdownContent = item.querySelector(
            ".dropdown-content__cover"
          ) as HTMLDivElement | null;
          if (dropdownContent) {
            dropdownContent.style.display = "none"; // Hide dropdown content
          }
        });

      setSelectedFilterItem(null);
    }
  };

  // search sort
  const [selectedFilterItemSort, setSelectedFilterItemSort] =
    useState<HTMLDivElement | null>(null);

  const handleFilterItemClickSort = (event: MouseEvent) => {
    const target = event.target as HTMLElement;
    const isFilterItemSort = target.closest(".search-result__sort__cover");
    const isDropdownContentSort = target.closest(
      ".dropdown-content--sort__cover"
    );

    // Nếu phần tử được bấm là một mục filter
    if (isFilterItemSort) {
      const filterItemSort = isFilterItemSort as HTMLDivElement;

      // Đặt lại tất cả các mục filter khác
      const filterItemsSort = document.querySelectorAll(
        ".search-result__sort__cover"
      );
      filterItemsSort.forEach((item: Element) => {
        if (item !== filterItemSort) {
          (item as HTMLElement).style.borderColor = ""; // Đặt lại màu viền
          const dropdownContentSort = item.querySelector(
            ".dropdown-content--sort__cover"
          ) as HTMLDivElement | null;
          if (dropdownContentSort) {
            dropdownContentSort.style.display = "none"; // Ẩn dropdown content
          }
        }
      });

      // Hiển thị hoặc ẩn dropdown content cho mục filter được bấm
      if (filterItemSort.style.borderColor === "brown") {
        filterItemSort.style.borderColor = ""; // Đặt lại màu viền
        const dropdownContent = filterItemSort.querySelector(
          ".dropdown-content--sort__cover"
        ) as HTMLDivElement | null;
        if (dropdownContent) {
          dropdownContent.style.display = "none"; // Ẩn dropdown content
        }
      } else {
        filterItemSort.style.borderColor = "brown"; // Đặt màu viền là nâu
        const dropdownContent = filterItemSort.querySelector(
          ".dropdown-content--sort__cover"
        ) as HTMLDivElement | null;
        if (dropdownContent) {
          dropdownContent.style.display = "flex"; // Hiển thị dropdown content
        }
      }

      setSelectedFilterItemSort(filterItemSort);
    }
  };

  useEffect(() => {
    document.body.addEventListener("click", handleBodyClickSort);

    // Clean up: Gỡ bỏ sự kiện khi component unmount
    return () => {
      document.body.removeEventListener("click", handleBodyClickSort);
    };
  }, []);

  const handleBodyClickSort = (event: MouseEvent) => {
    const targetSort = event.target as HTMLElement;
    const isFilterItemSort = targetSort.closest(".search-result__sort__cover");

    if (!isFilterItemSort) {
      document
        .querySelectorAll(".search-result__sort__cover")
        .forEach((item: Element) => {
          (item as HTMLElement).style.borderColor = ""; // Reset border color
          const dropdownContentSort = item.querySelector(
            ".dropdown-content--sort__cover"
          ) as HTMLDivElement | null;
          if (dropdownContentSort) {
            dropdownContentSort.style.display = "none"; // Hide dropdown content
          }
        });

      setSelectedFilterItemSort(null);
    }
  };

  const [category, setCategory] = useState(searchParams.get("c") ?? "");
  const [isDiscount, setIsDiscount] = useState(searchParams.get("d") ?? "");

  const handleChooseCategory = (event: any) => {
    const current = event.currentTarget;
    const category = current.innerHTML;

    const filter =
      current.parentElement.parentElement.parentElement.previousElementSibling
        .previousElementSibling;
    filter.innerHTML = category;

    setCategory(category);
  };

  const handleClickDiscount = (event: any) => {
    console.log(isDiscount);
    if (isDiscount == "") {
      event.currentTarget.style.display = "none";
      event.currentTarget.nextElementSibling.style.display = "flex";
      setIsDiscount("1");
    } else {
      event.currentTarget.style.display = "none";
      event.currentTarget.previousElementSibling.style.display = "flex";
      setIsDiscount("");
    }
  };

  const handleApplyFilter = () => {
    router.replace(
      `${pathName}?q=${searchParams.get("q") ?? ""}${
        category != "" ? `&c=${category}` : ""
      }${isDiscount != "" ? `&d=${isDiscount}` : ""}`
    );
  };

  const handleResetFilter = (event: any) => {
    router.replace(`${pathName}?q=${searchParams.get("q") ?? ""}`);
    const filters =
      event.currentTarget.parentElement.previousElementSibling.querySelectorAll(
        "button"
      );

    filters[0].style.display = "flex";
    filters[1].style.display = "none";
    (filters[2].querySelector("p") as HTMLParagraphElement).innerHTML =
      "Danh mục";

    setCategory("");
    setIsDiscount("");
  };

  return (
    <main className="search-result__container">
      {/* <SearchResultFilter /> */}
      <div>
        <section className={cx("search-result__filter")}>
          <div className={cx("search-result__filter-normal")}>
            <div className={cx("search-result__filter-left")}>
              <h5 className={cx("search-result__filter-normal__title")}>
                Bộ lọc:
              </h5>

              <button
                type="button"
                className={cx(
                  "search-result__filter-normal__content",
                  "search-result__filter-normal__content_cover"
                )}
                onClick={handleClickDiscount}>
                Giảm giá
              </button>

              <button
                type="button"
                className={cx(
                  "search-result__filter-normal__content",
                  "search-result__filter-normal__content_cover",
                  "search-result__filter-discount-hidden"
                )}
                onClick={handleClickDiscount}>
                Giảm giá
              </button>

              <button
                type="button"
                className={cx(
                  "search-result__filter-normal__content",
                  "search-result__filter-normal__content_cover"
                )}
                onClick={(e: any) => handleFilterItemClick(e)}>
                <p>Danh mục</p>
                <span className={cx("material-icons-round", "dropdown-button")}>
                  expand_more
                </span>
                <div
                  className={cx("dropdown-content", "dropdown-content__cover")}>
                  <div className={cx("filter-list")}>
                    {categories.length > 0 && (
                      <div className={cx("dropdown-options", "filter-options")}>
                        {categories.map((category, index) => (
                          <label
                            onClick={handleChooseCategory}
                            htmlFor="type1"
                            className={cx("filter-label")}
                            key={"category" + index}>
                            {category.category_name}
                          </label>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </button>
            </div>

            <div className={cx("filter-dropdown__button")}>
              <button
                className={cx("btn", "filter-cancel")}
                type="submit"
                onClick={handleResetFilter}>
                Hủy bộ lọc
              </button>

              <button
                className={cx("btn", "filter-apply")}
                type="submit"
                onClick={handleApplyFilter}>
                Áp dụng bộ lọc
              </button>
            </div>
          </div>
        </section>
      </div>

      {/* <SearchResultHeadingMobile /> */}
      <section className="search-result__main">
        <h1 className="search-result__heading">
          Kết quả tìm kiếm
          <span className="search-result__heading-after"></span>
        </h1>
        <div className="search-result__main__heading">
          <p className="search-result__main__count">
            Tìm thấy{" "}
            <span className="search-result__highlight">{products.length}</span>{" "}
            {itemFind === "discountTrue" ? (
              "sản phẩm khuyến mãi"
            ) : itemFind === "recommendTrue" ? (
              "sản phẩm gợi ý hôm nay"
            ) : itemFind === "newTrue" ? (
              "sản phẩm mới"
            ) : (
              <>
                kết quả cho từ khóa &quot;
                <span className="search-result__key">{itemFind}</span>
                &quot;
              </>
            )}
          </p>
          {/* <SearchResultSort /> */}
          <div
            className={cx("search-result__sort", "search-result__sort__cover")}
            onClick={(e: any) => handleFilterItemClickSort(e)}>
            <p className={cx("search-result__sort-title")}>Sắp xếp theo:</p>
            <div className={cx("search-result__sort-content")}>
              <p>Nổi bật</p>
              <span className={cx("material-icons-round")}>expand_more</span>
            </div>
            <div
              className={cx(
                "dropdown-content--sort",
                "dropdown-content--sort__cover"
              )}>
              <hr />
              <div className={cx("dropdown-options")}>
                <input
                  className={cx("sort-option")}
                  type="radio"
                  id="price-z-to-a"
                  name="sort"
                  value="price-z-to-a"
                />
                <label htmlFor="hot" className={cx("sort-label")}>
                  Giá cao đến thấp
                </label>
              </div>
              <hr />
              <div className={cx("dropdown-options")}>
                <input
                  className={cx("sort-option")}
                  type="radio"
                  id="price-a-to-z"
                  name="sort"
                  value="price-a-to-z"
                />
                <label htmlFor="hot" className={cx("sort-label")}>
                  Giá thấp đến cao
                </label>
              </div>
            </div>
          </div>
        </div>

        <div className="search-result__main-card">
          {products &&
            products.length >= 0 &&
            products.map((product, index) => (
              <CustomerProductCard
                key={"search product" + index}
                product={product}
              />
            ))}
        </div>
        <div className="pagination">
          <CustomerPagination maxPage={searchResults.totalPages} />
        </div>
      </section>
    </main>
  );
}
