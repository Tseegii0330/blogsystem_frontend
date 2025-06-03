"use client";

import React from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Link from "next/link";
import { Button } from "@/components/ui/button";

import { User, Plus, LogOut, Book } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function LoginBtn() {
  const { isLoggedIn, logout, user } = useAuth();
  console.log(isLoggedIn);
  console.log(user);

  return (
    <div>
      {isLoggedIn ? (
        <Popover>
          <PopoverTrigger>
            <User className="border-2 rounded-full bg-amber-500 w-10 h-10 p-2 cursor-pointer" />
          </PopoverTrigger>
          <PopoverContent>
            <div className="flex flex-col gap-2 space-x-3">
              <p>{user?.name}</p>
              {user?.role == "admin" || user?.role == "editor" ? (
                <div className="flex flex-col gap-2 space-x-3 w-full">
                  <Button className="cursor-pointer bg-gray-400 w-full ">
                    <Book />
                    Dashbaord
                  </Button>
                  <Button className="cursor-pointer bg-gray-400 w-full ">
                    <Book />
                    нийтлэлүүд
                  </Button>
                  <Button
                    className="cursor-pointer bg-gray-400 w-full "
                    size="sm"
                    // onClick={logout}
                  >
                    <Plus />
                    Нийтлэл нэмэх
                  </Button>
                </div>
              ) : (
                <div className="flex flex-col gap-2 space-x-3 w-full">
                  <Button className="cursor-pointer bg-gray-400 w-full ">
                    <Book />
                    Миний нийтлэлүүд
                  </Button>
                  <Button
                    className="cursor-pointer bg-gray-400 w-full "
                    size="sm"
                    // onClick={logout}
                  >
                    <Plus />
                    Нийтлэл нэмэх
                  </Button>
                </div>
              )}
              <Button
                className="cursor-pointer bg-red-700"
                size="sm"
                onClick={logout}
              >
                <LogOut />
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
