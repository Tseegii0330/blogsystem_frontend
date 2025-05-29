// components/Header.tsx

import { FC } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const Header: FC = () => {
  return (
    <div className="w-full shadow-sm border-b bg-white">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold text-black">
          MyBlog
        </Link>

        <div className="flex items-center space-x-3">
          <Link href="/auth/login">
            <Button className="cursor-pointer bg-gray-400" size="sm">
              Login
            </Button>
          </Link>
          <Link href="/register">
            <Button className="cursor-pointer" size="sm">
              Register
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
