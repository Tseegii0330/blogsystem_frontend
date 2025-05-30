"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import Cookies from "js-cookie";

function VerifyEmailPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState("");
  const { setUser, setIsLoggedIn } = useAuth();
  const token = searchParams.get("token");

  useEffect(() => {
    const verifyEmail = async () => {
      if (!token) {
        setError("Token олдсонгүй");
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(
          `http://localhost:3001/api/verify-email?token=${token}`
        );
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error || "Verification амжилтгүй.");
        }

        setVerified(true);
        toast.success("Имэйл амжилттай баталгаажлаа!");

        Cookies.set("token", token);

        localStorage.setItem("user", JSON.stringify(data.user));
        setIsLoggedIn(true);
        setUser(data.user);

        setTimeout(() => {
          router.push("/");
        }, 3000);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
          toast.error(err.message);
        } else {
          setError("An unknown error occurred.");
          toast.error("An unknown error occurred.");
        }
      } finally {
        setLoading(false);
      }
    };

    verifyEmail();
  }, [token]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 px-4">
      <div className="bg-white shadow-md rounded-lg p-6 max-w-md w-full text-center">
        {loading ? (
          <div className="flex flex-col items-center">
            <Loader2 className="h-6 w-6 animate-spin text-gray-600" />
            <p className="mt-2 text-sm text-gray-500">
              Имэйл баталгаажуулж байна...
            </p>
          </div>
        ) : verified ? (
          <>
            <h2 className="text-lg font-semibold text-green-600 mb-2">
              Имэйл амжилттай баталгаажлаа!
            </h2>
            <p className="text-sm text-gray-500 mb-4">
              Та 3 секундын дараа нүүр хуудас руу шилжих болно...
            </p>
            <Button onClick={() => router.push("/")}>Гараар шилжих</Button>
          </>
        ) : (
          <>
            <h2 className="text-lg font-semibold text-red-600 mb-2">
              Баталгаажуулалт амжилтгүй боллоо
            </h2>
            <p className="text-sm text-gray-500">{error}</p>
          </>
        )}
      </div>
    </div>
  );
}

export default VerifyEmailPage;
