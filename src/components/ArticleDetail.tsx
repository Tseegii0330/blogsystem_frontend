"use client";

import React, { FC } from "react";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { articleType } from "@/types/type";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface ArticleDetailProps {
  article: articleType;
}

const ArticleDetail: FC<ArticleDetailProps> = ({ article }) => {
  const { user } = useAuth();

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
      {user?.role == "admin" || user?.role == "editor" ? (
        <div className="flex justify-between items-center">
          <Button>
            <Link href={`/articles/edit/${article.id}`}>Засах</Link>
          </Button>
          <Button className="bg-red-500">
            <span>Устгах</span>
          </Button>
        </div>
      ) : (
        <span></span>
      )}
    </div>
  );
};

export default ArticleDetail;
