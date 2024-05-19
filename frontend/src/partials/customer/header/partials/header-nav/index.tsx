"use client";

// import libs
import Link from "next/link";
import Image from "next/image";
import classNameNames from "classnames/bind";

// import components
import { CustomerLogo } from "@/components";

// import css
import styles from "./header-nav.module.css";

const cx = classNameNames.bind(styles);

export default function CustomerHeaderNav() {
  return (
    <nav className={cx("header__nav")}>
      <div className={cx("header__nav-container")}>
        <div className={cx("header__support-info")}>
          <div className={cx("dropdown-help")}>
            <Link href="/contact">
              <span className="material-icons-outlined">help</span>
              Hỗ trợ
            </Link>
            <div className={cx("dropdown-help__content-container")}>
              <div className={cx("dropdown-help__content")}>
                <div className={cx("dropdown-help__qr-code-container")}>
                  <Image src="/imgs/icon-ATC.webp" alt="help" fill />
                </div>
                <span>
                  Nhấp <Link href="/contact">vào đây</Link> để được hỗ trợ
                  nhé!!!
                </span>
              </div>
            </div>
          </div>
          <Link
            href="tel: 0559 695 594"
            className={cx("header__support-info__hotline")}>
            <span className="material-icons-outlined">call</span>
            Hotline: 0559 695 594
          </Link>
        </div>
        <CustomerLogo className={cx("header--mobile__logo")} white />
        <div className={cx("header--mobile__noti-support")}>
          <Link href="/contact" className={cx("help--mobile")}>
            <span className="material-icons-outlined" title="Hỗ trợ">
              help
            </span>
          </Link>
        </div>
      </div>
    </nav>
  );
}
