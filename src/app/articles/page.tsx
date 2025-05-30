import React from "react";
import ArticleCard from "@/components/ArticleCard";
import Pagination from "@/components/Paginations";
import { notFound } from "next/navigation";
interface Props {
  searchParams: {
    author?: string;
    tags?: string;
    page?: string;
  };
}
// http://localhost:3001/api/articles?tags=test&author_id=1
async function getArticles({ tags, author, page }: Props["searchParams"]) {
  const query = new URLSearchParams({
    ...(tags ? { tags } : {}),
    ...(author ? { author } : {}),
    ...(page ? { page } : {}),
  }).toString();

  const res = await fetch(`http://localhost:3001/api/articles?${query}`, {
    method: "GET",
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Failer to fetch articles");
  }
  return res.json();
}

async function Articles({ searchParams }: Props) {
  console.log(searchParams);

  const articles = await getArticles(searchParams);

  if (!articles) return notFound;
  const {
    page,
    totalPages,
    nextPage,
    hasNextPage,
    hasPrevPage,
    totalCount,
    data,
  } = articles;

  return (
    <div className="grid grid-rows-[20px_1fr_20px] justify-items-center p-8 pb-20 gap-16 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] items-center sm:items-start">
        <h1 className="text-sm">
          Хайлтын илэрч {totalCount} ширхэг нийтлэл байна
        </h1>
        <ArticleCard articles={data} />
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          nextPage={nextPage}
          hasNextPage={hasNextPage}
          hasPrevPage={hasPrevPage}
        />
      </main>
    </div>
  );
}

export default Articles;
