import React, { FC } from "react";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { articleType } from "@/types/type";

interface ArticleDetailProps {
  article: articleType;
}

const ArticleDetail: FC<ArticleDetailProps> = ({ article }) => {
  return (
    <div>
      <div className="p-5 space-y-3">
        <div className="flex flex-wrap gap-2">
          {article.tags.map((tag, idx) => (
            <Badge key={idx} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
        <div className="text-xs text-gray-500">
          {/* By {article.author.name} •{" "} */}
          {format(new Date(article.created_at), "yyyy-MM-dd")}
        </div>
        <h2 className="text-xl font-semibold text-gray-900 hover:underline">
          {article.title}
        </h2>

        <p className="text-sm text-gray-700 line-clamp-3">{article.content}</p>
      </div>
    </div>
  );
};

export default ArticleDetail;
