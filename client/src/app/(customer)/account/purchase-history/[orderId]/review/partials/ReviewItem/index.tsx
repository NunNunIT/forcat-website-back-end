"use client";

// import libs
import Link from "next/link";
import { useState, useEffect } from "react";
import { CldImage } from "next-cloudinary";
import Skeleton from 'react-loading-skeleton';

// import constant
import { BACKEND_URL_REVIEWS } from "@/utils/commonConst";

// import css
import 'react-loading-skeleton/dist/skeleton.css';
import axios from "axios";

export function SkeletonReviewItem() {
  return (
    <div className="review-item">
      <section className="product-container">
        <div className="product__img-container">
          <Skeleton width={160} height={160} />
        </div>
        <div className="product__detail">
          <Skeleton count={3} />
        </div>
      </section>
      <section className="review__rating">
        Chất lượng sản phẩm:
        <span className="review__star-rating">
          {[1, 2, 3, 4, 5].map((index) =>
            <span key={index} className="material-icons">grade</span>
          )}
        </span>
      </section>
      <div className="image-upload-container">
        <input type="file" id="imageUpload" name="image" className="imageUpload" accept="image/*" />
        <label htmlFor="imageUpload" className="image-upload-label">
          <span className="material-icons-outlined">
            add_a_photo
          </span> Thêm hình ảnh
        </label>
      </div>
      <div>
        <h5>Đánh giá của bạn:</h5>
        <textarea name="review_content"
          cols={30} rows={8}
          placeholder="Vui lòng cho đánh giá của bạn vào đây..."
          readOnly
        />
      </div>
      <button className="btn btn--filled sec" disabled>
        Đánh giá
      </button>
    </div>
  )
}

interface IDataForm {
  product_id_hashed: string,
  product_variant_name: string,
  order_id: string,
  user_info: {
    user_name: string,
    user_avt?: string,
  },
  review_rating: number;
  review_context: string;
}

export default function ReviewItem(props: IReviewItem) {
  const [reviewRating, setReviewRating] = useState<number>(props.review_rating);
  const [dataForm, setDataForm] = useState<IDataForm>({
    product_id_hashed: props.product_id_hashed,
    product_variant_name: props.variant_name,
    order_id: props.order_id,
    user_info: {
      user_name: "Lê Trung Hiếu",
    },
    review_rating: props.review_rating,
    review_context: props.review_context,
  });
  const handleChangeForm = (e) => {
    setDataForm(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }
  const handleSubmitForm = async (e) => {
    e.preventDefault();
    // alert(JSON.stringify(dataForm));
    const RES = await axios.post(BACKEND_URL_REVIEWS, dataForm);
    const json: IResponseJSON = RES.data;

    if (!json.success)
      throw json;

    alert("Đánh giá thành công!");
  }

  useEffect(() => {
    setDataForm(prev => ({
      ...prev,
      review_rating: reviewRating,
    }))
  }, [reviewRating])

  return (
    <form className="review-item"
      onSubmit={handleSubmitForm}
    >
      <section className="product-container">
        <div className="product__img-container">
          <CldImage src={props.variant_img.link} alt={props.variant_img.alt} fill />
        </div>
        <div className="product__detail">
          <h5>
            <Link href={`/${props.product_slug}?pid=${props.product_id_hashed}`}>
            {props.product_name}
            </Link>
            </h5>
          <span>Phân loại sản phẩm: {props.variant_name}</span>
          <span>{props.unit_price}đ</span>
          <span>x{props.quantity}</span>
        </div>
      </section>
      <section className="review__rating">
        Chất lượng sản phẩm:
        <input name="review_rating" value={reviewRating} type="hidden" />
        <span className="review__star-rating">
          {[1, 2, 3, 4, 5].map((index) =>
            <span key={index}
              className={`material-icons${(index <= reviewRating) ? "" : "-outlined"}`}
              onClick={() => { setReviewRating(index) }}
            >
              grade
            </span>
          )}
        </span>
      </section>
      <div className="image-upload-container">
        <input type="file" id="imageUpload" name="image" className="imageUpload" accept="image/*" />
        <label htmlFor="imageUpload" className="image-upload-label">
          <span className="material-icons-outlined">
            add_a_photo
          </span> Thêm hình ảnh
        </label>
      </div>
      <div>
        <h5>Đánh giá của bạn:</h5>
        <textarea name="review_context"
          cols={30} rows={8}
          placeholder="Vui lòng cho đánh giá của bạn vào đây..."
          defaultValue={props.review_context}
          onChange={handleChangeForm}
        />
      </div>
      <button className="btn btn--filled sec"
        type="submit"
        disabled={dataForm.review_context === ""}
      >
        Đánh giá
      </button>
    </form>
  )
}