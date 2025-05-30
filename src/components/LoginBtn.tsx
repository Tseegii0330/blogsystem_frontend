"use client";

import React from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Link from "next/link";
import { Button } from "@/components/ui/button";

import { User } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function LoginBtn() {
  const { isLoggedIn, logout, user } = useAuth();
  console.log(isLoggedIn);

  return (
    <div>
      {isLoggedIn ? (
        <Popover>
          <PopoverTrigger>
            <User className="border-2 rounded-full bg-amber-500 w-10 h-10 p-2 cursor-pointer" />
          </PopoverTrigger>
          <PopoverContent>
            <div className="flex flex-col gap-2 space-x-3">
              <Link href="/account" className="bg-gray-300 p-2 rounded p-0 m-0">
                {user?.name}
              </Link>
              <Button
                className="cursor-pointer bg-red-700"
                size="sm"
                onClick={logout}
              >
                Гарах
              </Button>
            </div>
          </PopoverContent>
        </Popover>
      ) : (
        <div className="flex items-center space-x-3">
          <Link href="/auth/login">
            <Button className="cursor-pointer bg-gray-400" size="sm">
              Login
            </Button>
          </Link>
          <Link href="/auth/register">
            <Button className="cursor-pointer" size="sm">
              Register
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
}
