// import libs
import classNames from "classnames/bind";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

// import utils
import { BACKEND_URL } from "@/utils/commonConst";

// import components
import { CustomerHeaderItemUlt } from "@/components";

// import css
import styles from "./search-bar.module.css";

const cx = classNames.bind(styles);

export default function SearchBar() {
  const searchParams = useSearchParams();
  const searchKey = searchParams.get("q");

  const [showSmartSearch, setShowSmartSearch] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [totalSearchResults, setTotalSearchResults] = useState(0);
  const [inputValue, setInputValue] = useState("");
  const smartSearchRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (inputValue) {
        fetchSearchResults(inputValue);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [inputValue]);

  useEffect(() => {
    // Add event listener when component mounts
    window.addEventListener("mousedown", handleClickOutside);

    // Remove event listener when component unmounts
    return () => {
      window.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleClickOutside = (event) => {
    if (
      smartSearchRef.current &&
      !smartSearchRef.current.contains(event.target)
    ) {
      setShowSmartSearch(false);
    }
  };

  const fetchSearchResults = async (inputValue: string) => {
    try {
      const response = await fetch(
        `${BACKEND_URL}/search/products?q=${inputValue}&c=&d=`
      );

      const data = await response.json();

      if (Array.isArray(data)) {
        setSearchResults(data.slice(0, 9));
        setTotalSearchResults(data.length);
        setShowSmartSearch(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleInputChange = (event) => {
    const inputValue = event.target.value;
    setInputValue(inputValue);
    if (!inputValue) {
      setShowSmartSearch(false);
    }
  };

  const handleClickSearch = (event) => {
    const inputValue = event.target.value;
    if (inputValue != "") setShowSmartSearch(true);
  };

  return (
    <div className={cx("header__search-bar-wrapper")}>
      <form
        className={cx("header__search-bar__main")}
        action="/search-result"
        method="GET">
        <div className={cx("header__search-bar")}>
          <input
            className={cx("header__search-input")}
            id="header__search-input"
            type="search"
            name="q"
            placeholder={searchKey ?? "Bạn tìm gì..."}
            onChange={handleInputChange}
            onClick={handleClickSearch}
          />
          <button className={cx("header__search-btn")} type="submit">
            <span className="material-icons-outlined">search</span>
          </button>
        </div>
      </form>
      <div
        ref={smartSearchRef}
        className={cx("header__smart-search-wrapper", {
          "display-block": showSmartSearch,
        })}
        id="header__smart-search-wrapper"
        style={{ display: showSmartSearch ? "block" : "none" }}>
        <div className={cx("header__suggest-results-content")}>
          {showSmartSearch &&
            (searchResults ?? []).map((product, index) => (
              <CustomerHeaderItemUlt key={"search" + index} product={product} />
            ))}
        </div>
        <div className={cx("header__suggest-results-more")}>
          <Link
            className={cx("header__suggest-results-more-link")}
            href={`/search-result?q=${inputValue}`}>
            Xem tất cả{" "}
            <span className={cx("highlight")}>{totalSearchResults}</span> sản
            phẩm
          </Link>
        </div>
      </div>
    </div>
  );
}
