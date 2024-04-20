"use client";

// import libs
import classNames from "classnames/bind";
import { Suspense, useEffect, useState } from "react";
import Link from "next/link";

// import components
import { LoadingSpinner } from "@/components";

// import css
import styles from "./table-of-content.module.css";

const cx = classNames.bind(styles);

export default function TableOfContent(
  { targetClassName, className }:
    { targetClassName: string, className?: string, }
) {
  const [headings, setHeadings] = useState<any[]>([]);

  useEffect(() => {
    const wrapper = document.querySelector(`.${targetClassName}`);
    if (!wrapper) return;
    const headings = wrapper.querySelectorAll("h2, h3, h4");
    setHeadings(Array.from(headings));
  }, []);

  return (
    <Suspense fallback={ <LoadingSpinner />}>
      <details className={`${cx("table-of-content-container")} ${className}`}>
        <summary className={cx("table-of-content__title")}>
          <h2>Nội dung</h2>
          <span className={cx(`material-icons-outlined ${cx("icon-on")}`)}>
            keyboard_double_arrow_up
          </span>
          <span className={cx(`material-icons-outlined ${cx("icon-off")}`)}>
            keyboard_double_arrow_down
          </span>
        </summary>
        <ul className={cx("table-of-content__list")}>
          {headings.map((heading) => {
            const level = heading.tagName.toLowerCase();
            const id = heading.getAttribute("id");
            return (
              <li
                key={id}
                className={cx(
                  "table-of-content__item",
                  `table-of-content__item--${level}`
                )}
              >
                <Link href={`#${id}`}>{heading.textContent}</Link>
              </li>
            );
          })}
        </ul>
      </details>
    </Suspense>
  )
}