import React from "react";
import ArticleDetail from "@/components/ArticleDetail";
interface propsType {
  params: {
    id: string;
  };
}

const getArticleById = async (id: string) => {
  const res = await fetch(`http://localhost:3001/api/articles/${id}`, {
    method: "GET",
    cache: "no-store",
  });
  const data = await res.json();
  if (!data.success) {
    throw new Error("Failed to fetch articl");
  }
  return data.article;
};
async function AticleDetail({ params }: propsType) {
  const id = params.id;
  const article = await getArticleById(id);
  return (
    <div className="grid grid-rows-[20px_1fr_20px] justify-items-center p-8 pb-20 gap-16 font-[family-name:var(--font-geist-sans)]">
      <div className="flex flex-col gap-[32px] items-center sm:items-start">
        <ArticleDetail article={article} />
      </div>
    </div>
  );
}

export default AticleDetail;
