"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("http://localhost:3001/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const result = await res.json();

      if (!result.success) {
        throw new Error("Нэвтрэх амжилтгүй.");
      }

      const token = result.data.token;
      const user = result.data.user;

      document.cookie = `token=${token}; path=/; max-age=3600`;

      localStorage.setItem("user", JSON.stringify(user));

      toast.success("Амжилттай нэвтэрлээ!");
      router.push("/");
    } catch (err: unknown) {
      if (err instanceof Error) {
        toast.error(err.message || "Login error");
      } else {
        toast.error("Login error");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center flex-col mt-12 w-full gap-4">
      <h1 className="text-4xl font-bold text-yellow-400 ">Нэвтрэх</h1>
      <form
        onSubmit={handleLogin}
        className="max-w-sm mx-auto space-y-4 w-full"
      >
        <Input
          type="email"
          placeholder="Имэйл"
          value={email}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setEmail(e.target.value)
          }
          required
        />
        <Input
          type="password"
          placeholder="Нууц үг"
          value={password}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setPassword(e.target.value)
          }
          required
        />
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Нэвтэрч байна..." : "Нэвтрэх"}
        </Button>
      </form>
    </div>
  );
}
