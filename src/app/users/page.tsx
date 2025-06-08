import React from "react";
import { UserDataTable } from "@/components/UserTable";
import { cookies } from "next/headers";

const getUser = async (token: string) => {
  const res = await fetch(`http://localhost:3001/api/users/list`, {
    method: "GET",
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${token}`,
    },
  });
  if (!res.ok) {
    throw new Error("Failer to fetch articles");
  }
  return res.json();
};

async function users() {
  const cookieStore = await cookies();

  const token = cookieStore.get("token");

  if (!token?.value) {
    return <div>Token олдсонгүй. Нэвтрэх шаардлагатай.</div>;
  }

  const data = await getUser(token.value);

  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 xl:max-w-5xl xl:px-0">
      <UserDataTable data={data.list} />
    </div>
  );
}

export default users;
