import React from "react";
import EditForm from "@/components/EditForm";

interface EditProps {
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

async function editPage({ params }: EditProps) {
  const id = params.id;
  const article = await getArticleById(id);

  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 xl:max-w-5xl xl:px-0">
      <EditForm article={article} />
    </div>
  );
}

export default editPage;
