// import libs
import React from "react";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";

import { BACKEND_URL } from "@/utils/commonConst";
import { notFound } from "next/navigation";
// import components
import { CustomerProductCard } from "@/components";

//import partials
import { SearchResultContainer } from "./partials";

// import css
import "./page.css";

export const metadata: Metadata = {
  title: "Kết quả tìm kiếm",
  description:
    "Kết quả tìm kiếm trên ForCat Shop sẽ giúp bạn dễ dàng tìm thấy những sản phẩm và thông tin mà bạn đang quan tâm. Hãy khám phá các kết quả tìm kiếm và tìm thấy những điều tuyệt vời mà ForCat mang lại cho bạn!",
};

// fetch data
async function getSearchProduct(searchKey, page) {
  try {
    const res = await fetch(`${BACKEND_URL}/productList/search?searchKey=${searchKey}&page=${page}`, {
      next: { revalidate: 60 },
    });

    const data = await res.json();
    console.log("Dữ liệu tôi cần", data.data)
    return data.data;
  } catch {
    return notFound();
  }
}

export default async function SearchResultPage({
  params,
  searchParams,
}: {
  params: { "search-result": string };
  searchParams?: { [key: string]: string };
}) {
  const { searchKey, page } = searchParams; // Truy cập tham số truy vấn searchKey từ params
  console.log("Lấy từ url", searchKey)
  const searchResults = await getSearchProduct(searchKey, page)
  return <SearchResultContainer searchKey={searchKey} searchResults={searchResults} />;
}
