import ArticleCard from "@/components/ArticleCard";
// http://localhost:3001/api/articles?tags=test&author_id=1
async function getArticles() {
  const res = await fetch(`http://localhost:3001/api/articles`, {
    method: "GET",
  });
  if (!res.ok) {
    throw new Error("Failer to fetch articles");
  }
  return res.json();
}
async function Home() {
  const articles = await getArticles();

  return (
    <div className="grid grid-rows-[20px_1fr_20px] justify-items-center p-8 pb-20 gap-16 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] items-center sm:items-start">
        <h1 className="text-5xl font-bold text-yellow-400">Бүх нийтлэлүүд</h1>
        <ArticleCard articles={articles.data} />
      </main>
    </div>
  );
}

export default Home;
