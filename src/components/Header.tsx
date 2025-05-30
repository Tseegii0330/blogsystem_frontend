"use client";

import { FC } from "react";
import Link from "next/link";
import LoginBtn from "./LoginBtn";

const Header: FC = () => {
  return (
    <div className="w-full shadow-sm border-b bg-white">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold text-black">
          Bloy system
        </Link>
        <LoginBtn />
      </div>
    </div>
  );
};

export default Header;
