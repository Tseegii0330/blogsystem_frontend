import ArticleCard from "@/components/ArticleCard";
import { notFound } from "next/navigation";
import SearchBar from "@/components/Search";
import Pagination from "@/components/Paginations";

interface Props {
  searchParams: {
    author?: string;
    tags?: string;
    page?: string;
  };
}
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

async function Home({ searchParams }: Props) {
  const articles = await getArticles(searchParams);
  const { totalPages, nextPage, hasNextPage, hasPrevPage, page, data } =
    articles;
  if (!articles) return notFound;

  return (
    <div className="grid grid-rows-[20px_1fr_20px] justify-items-center p-8 pb-20 gap-16 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] items-center sm:items-start">
        <SearchBar />
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

export default Home;
