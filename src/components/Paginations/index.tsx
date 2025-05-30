"use client";

import React, { useCallback } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";

interface props {
  currentPage: number;
  totalPages: number;
  nextPage: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
}

const Pagination: React.FC<props> = ({
  currentPage,
  totalPages,
  nextPage,
  hasNextPage,
  hasPrevPage,
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );
  console.log("currentPage", currentPage);

  return (
    <nav className="flex items-center justify-between border-t border-gray-200 px-4 w-full pb-12">
      <div className="flex w-0 flex-1">
        <button
          disabled={!hasPrevPage}
          onClick={() =>
            router.push(
              pathname + "?" + createQueryString("page", `${currentPage - 1}`)
            )
          }
          className="inline-flex items-center cursor-pointer border-t-2 border-transparent pr-1 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
        >
          <ArrowLeft aria-hidden="true" className="mr-3 size-5 text-gray-400" />
          Өмнөх
        </button>
      </div>

      <div className="hidden md:-mt-px md:flex">
        <button
          type="button"
          onClick={() =>
            router.push(
              pathname + "?" + createQueryString("page", `${currentPage}`)
            )
          }
          className={`inline-flex cursor-pointer items-center border-t-2 px-4 pt-4 text-sm font-medium hover:text-gray-700`}
        >
          {totalPages}of{currentPage}
        </button>
      </div>
      <div className="-mt-px flex w-0 flex-1 justify-end">
        <button
          disabled={!hasNextPage}
          onClick={() =>
            router.push(
              pathname + "?" + createQueryString("page", `${nextPage}`)
            )
          }
          className="cursor-pointer  inline-flex items-center border-t-2 border-transparent pl-1 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
        >
          Дараах
          <ArrowRight
            aria-hidden="true"
            className="ml-3 size-5 text-gray-400"
          />
        </button>
      </div>
    </nav>
  );
};
export default Pagination;
