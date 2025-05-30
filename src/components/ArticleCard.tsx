"use client";

import { FC } from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { articleType } from "@/types/type";

interface ArticleCardProps {
  articles: articleType[];
}

const ArticleCard: FC<ArticleCardProps> = ({ articles }) => {
  if (!articles) return <div>Нийтлэл олдсонгүй</div>;
  return (
    <div className="flex flex-col gap-6 w-full">
      {articles.map((article, idx) => (
        <Card
          className="rounded-2xl shadow-md hover:shadow-lg transition-all border"
          key={idx}
        >
          <CardContent className="p-5 space-y-3">
            {/* Тагууд */}
            <div className="flex flex-wrap gap-2">
              {article.tags.map((tag, idx) => (
                <Badge key={idx} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>

            {/* Гарчиг */}
            <Link href={`/articles/${article.id}`}>
              <h2 className="text-xl font-semibold text-gray-900 hover:underline">
                {article.title}
              </h2>
            </Link>

            {/* Хураангуй */}
            <p className="text-sm text-gray-700 line-clamp-3">
              {article.content}
            </p>

            {/* Хэрэглэгч + Огноо */}
            <div className="text-xs text-gray-500">
              {/* By {article.author.name} •{" "} */}
              {format(new Date(article.created_at), "yyyy-MM-dd")}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ArticleCard;
