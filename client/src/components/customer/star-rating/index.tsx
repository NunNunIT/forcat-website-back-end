// import libs
import classNameNames from "classnames/bind";

// import css
import styles from "./star-rating.module.css";

const cx = classNameNames.bind(styles);

export default function CustomerStarRating(props: IStarRatingProps) {
  let rating = props.rating;

  return (
    <div className={props.className}>
      {Array(5)
        .fill(null)
        .map((_, index) => {
          if (rating >= 0.75) {
            rating--;
            return (
              <span key={index} className={`material-icons ` + cx("star")}>
                grade
              </span>
            ); // Filled star
          }

          if (rating >= 0.25) {
            rating = 0;
            return (
              <span
                key={index}
                className={`material-icons-outlined ` + cx("star")}>
                star_half
              </span>
            ); // Half star
          }

          return (
            <span
              key={index}
              className={`material-icons-outlined ` + cx("star")}>
              grade
            </span>
          ); // Outlined star
        })}
    </div>
  );
};
