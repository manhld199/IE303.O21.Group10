"use client";

// import libs
import classNames from "classnames/bind";
import Link from "next/link";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

// import utils
import { isActiveClassWithBool, objectToSearchParams } from "@/utils";

// import css
import styles from "./pagination.module.css";

interface IPaginationProps {
  maxPage: number;
  className?: string;
}

const cx = classNames.bind(styles);

export default function CustomerPagination(props: IPaginationProps) {
  const pathName = usePathname();
  const searchParams = useSearchParams();
  if (props.maxPage <= 1) {
    return <></>;
  }

  const allParams = Object.fromEntries(searchParams.entries());
  const siblings: number = 2;
  const currentPage: number = allParams.p ? parseInt(allParams.p as string) : 0;
  const pages: number[] = Array.from(
    { length: siblings * 2 + 1 },
    (_, i) => currentPage - siblings + i
  ).filter((page) => page > 1 && page < props.maxPage);

  const objContinue: {
    isLeftContinue: boolean;
    isRightContinue: boolean;
  } = {
    isLeftContinue: !(pages.length > 0 && pages[0] !== 2),
    isRightContinue:
      !(pages.length > 0 && pages[pages.length - 1] !== props.maxPage - 1) &&
      !(pages.length == 0 && props.maxPage > 2),
  };

  return (
    <div className={`${cx("pagination-container")} ${props.className}`}>
      {/* The first pagination button */}
      <PaginationButton
        disabled={currentPage === 0}
        pathName={pathName}
        allParams={allParams}
        p={currentPage - 1}>
        <span className="material-icons-outlined">arrow_back_ios</span>
      </PaginationButton>
      {/* The first page */}
      <PaginationItem
        pathName={pathName}
        currentPage={currentPage}
        p={0}
        allParams={allParams}
      />
      {!objContinue.isLeftContinue && <span>...</span>}
      {(pages ?? []).map((page) => (
        <PaginationItem
          key={page}
          pathName={pathName}
          currentPage={currentPage}
          p={page - 1}
          allParams={allParams}
        />
      ))}
      {!objContinue.isRightContinue && <span>...</span>}
      {/* The last page */}
      <PaginationItem
        pathName={pathName}
        currentPage={currentPage}
        p={props.maxPage - 1}
        allParams={allParams}
      />
      {/* The last pagination button */}
      <PaginationButton
        disabled={currentPage === props.maxPage - 1}
        pathName={pathName}
        allParams={allParams}
        p={currentPage + 1}>
        <span className="material-icons-outlined">arrow_forward_ios</span>
      </PaginationButton>
    </div>
  );
}

function PaginationButton({
  className,
  pathName,
  p,
  allParams,
  children,
  disabled,
}: {
  className?: string;
  pathName: string;
  p: number;
  allParams: Object;
  disabled: boolean;
  children?: React.ReactNode;
}) {
  const router = useRouter();
  return (
    <button
      className={className}
      disabled={disabled}
      onClick={() =>
        router.push(
          pathName + "?" + objectToSearchParams({ ...allParams, p }).toString()
        )
      }>
      {children}
    </button>
  );
}

function PaginationItem({
  className,
  pathName,
  currentPage,
  p,
  allParams,
}: {
  className?: string;
  pathName: string;
  currentPage: number;
  p: number;
  allParams: Object;
}) {
  return (
    <Link
      className={`${cx(isActiveClassWithBool(currentPage === p))} ${className}`}
      href={
        pathName + "?" + objectToSearchParams({ ...allParams, p }).toString()
      }>
      {p + 1}
    </Link>
  );
}
