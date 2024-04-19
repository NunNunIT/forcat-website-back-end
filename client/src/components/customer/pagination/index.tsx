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
  currentPage: number;
}

const cx = classNames.bind(styles);

export default function Pagination(props: IPaginationProps) {
  const router = useRouter();
  const pathName = usePathname();
  const searchParams = useSearchParams();
  const allParams = Object.fromEntries(searchParams.entries());
  const siblings: number = 2;
  const pages: number[] = Array.from(
    { length: siblings * 2 + 1 },
    (_, i) => props.currentPage - siblings + i
  ).filter((page) => page > 1 && page < props.maxPage);

  const objContinue: {
    isLeftContinue: boolean;
    isRightContinue: boolean;
  } = {
    isLeftContinue: !(pages.length > 0 && pages[0] !== 2),
    isRightContinue:
      !(pages.length > 0 && pages[pages.length - 1] !== props.maxPage - 1)
      && !(pages.length == 0 && props.maxPage > 2),
  };

  return (
    <div className={cx("pagination-container")}>
      {/* The first pagination button */}
      <PaginationButton
        disabled={props.currentPage === 1}
        pathName={pathName}
        allParams={allParams}
        page={props.currentPage - 1}>
        <span className="material-icons-outlined">arrow_back_ios</span>
      </PaginationButton>
      {/* The first page */}
      <PaginationItem
        pathName={pathName}
        currentPage={props.currentPage}
        page={1}
        allParams={allParams}
      />
      {!objContinue.isLeftContinue && <span>...</span>}
      {pages.map((page) => (
        <PaginationItem
          key={page}
          pathName={pathName}
          currentPage={props.currentPage}
          page={page}
          allParams={allParams}
        />
      ))}
      {!objContinue.isRightContinue && <span>...</span>}
      {/* The last page */}
      <PaginationItem
        pathName={pathName}
        currentPage={props.currentPage}
        page={props.maxPage}
        allParams={allParams}
      />
      {/* The last pagination button */}
      <PaginationButton
        disabled={props.currentPage === props.maxPage}
        pathName={pathName}
        allParams={allParams}
        page={props.currentPage + 1}>
        <span className="material-icons-outlined">arrow_forward_ios</span>
      </PaginationButton>
    </div>
  );
}

function PaginationButton({
  className,
  pathName,
  page,
  allParams,
  children,
  disabled,
}: {
  className?: string;
  pathName: string;
  page: number;
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
          pathName
          + "?"
          + objectToSearchParams({ ...allParams, page }).toString()
        )
      }
    >
      {children}
    </button>
  );
}

function PaginationItem({
  className,
  pathName,
  currentPage,
  page,
  allParams,
}: {
  className?: string;
  pathName: string;
  currentPage: number;
  page: number;
  allParams: Object;
}) {
  return (
    <Link
      className={`${cx(
        isActiveClassWithBool(currentPage === page)
      )} ${className}`}
      href={
        pathName
        + "?"
        + objectToSearchParams({ ...allParams, page }).toString()
      }
    >
      {page}
    </Link>
  );
}
