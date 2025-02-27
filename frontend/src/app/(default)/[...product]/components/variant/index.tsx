"use client";

// import libs
import Link from "next/link";
import Image from "next/image";
import { CldImage } from "next-cloudinary";
import { usePathname } from "next/navigation";
import classNames from "classnames/bind";

// import css
import styles from "./product-variant.module.css";

// use css
const cx = classNames.bind(styles);

let isActive;
export default function ProductVariant({
  pid,
  variant,
  firstActive,
  ...props
}: {
  pid: any;
  variant: IVariant;
  firstActive?: any;
}) {
  const pathname = decodeURIComponent(usePathname());

  if (firstActive) {
    isActive = "variant__active";
  } else {
    isActive = pathname == variant.url ? "variant__active" : "";
  }

  return (
    <Link
      className={cx("variant", isActive)}
      href={`${variant.url}?pid=${pid.replaceAll("+", "%2B")}`}
      title={variant.name}>
      <div
        className={cx("variant__tick-div", isActive ? "variant__display" : "")}>
        <Image
          className={cx("variant__tick")}
          src="/imgs/product-page/tick.webp"
          alt="Decoration tick"
          fill={true}
        />
      </div>
      <div className={cx("variant__image-div")}>
        <CldImage
          className={cx("variant__image")}
          src={variant.image.url}
          alt={variant.image.alt}
          fill={true}
        />
      </div>
      <div className={cx("variant__name")}>{variant.name}</div>
    </Link>
  );
}
