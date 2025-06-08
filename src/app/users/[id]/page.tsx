import React from "react";
import EditUserForm from "@/components/UserEditForm";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";

interface EditProps {
  params: {
    id: string;
  };
}

const getUserById = async ({ id, token }: { id: string; token: string }) => {
  const res = await fetch(`http://localhost:3001/api/users/${id}`, {
    method: "GET",
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${token}`,
    },
  });
  const data = await res.json();
  if (!data.success) {
    return data.message;
  }
  return data.user;
};

async function editPage({ params }: EditProps) {
  const cookieStore = await cookies();

  const token = cookieStore.get("token")?.value;

  const id = params.id;
  if (!id || !token) {
    throw new Error("ID or token is missing.");
  }

  const data = await getUserById({ id, token });

  console.log("data: ", data);

  if (!data) notFound();

  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 xl:max-w-5xl xl:px-0">
      <EditUserForm user={data} />
    </div>
  );
}

export default editPage;
