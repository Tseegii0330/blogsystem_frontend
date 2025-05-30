"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push(`/articles?author=${query}`);
  };

  return (
    <div className="w-full">
      <form className="flex item-center gap-2" onSubmit={submitHandler}>
        <input
          onChange={(e) => setQuery(e.target.value)}
          type="text"
          className={`bg-transparent border-2 rounded p-1 right-0 top-0 text-black font-normal outline-none placeholder-gray-200 w-full`}
          placeholder="search author name"
        />
        <button
          type="submit"
          className="text-xs text-white font-semibold leading-4 mx-0 bg-black hover:bg-green-500 border-2 p-2 rounded cursor-pointer"
        >
          Хайх
          <span className={`bg-white`}></span>
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
