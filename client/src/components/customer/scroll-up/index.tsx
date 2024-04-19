"use client";
import { useEffect } from "react";

// import css
import "./style.css";

export default function Scrollup() {
  useEffect(() => {
    const span = document.querySelector(".scrollup") as HTMLSpanElement;
    window.onscroll = function () {
      this.scrollY >= 300
        ? span.classList.add("scroll-up__show")
        : span.classList.remove("scroll-up__show");
    };

    span.onclick = function () {
      window.scroll({
        top: 0,
        behavior: "smooth",
      });
    };

    // Dọn dẹp event listener
    return () => {
      window.onscroll = null;
      span.onclick = null;
    };
  }, []);
  return (
    <div className="scrollup">
      <span className="material-icons-round">expand_less</span>
    </div>
  );
}
