import React from "react";

interface EditProps {
  params: {
    id: string;
  };
}

const getArticleById = async (id: string) => {
  const res = await fetch(`http://localhost:3001/api/articles/${id}`);
  const data = await res.json();
  if (!data.success) {
    throw new Error("Failed to fetch articl");
  }
  return data.article;
};

async function editPage({ params }: EditProps) {
  const id = params.id;
  const article = await getArticleById(id);

  console.log(article);

  return (
    <div>
      <span>Засах</span>
    </div>
  );
}

export default editPage;
