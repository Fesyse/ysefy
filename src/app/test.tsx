"use server";

import { getServerAuthSession } from "@/server/auth";
import { api } from "@/trpc/server";

export const Test = async () => {
  const session = await getServerAuthSession();
  if (!session?.user) return null;

  const hello = await api.post.hello({ text: "Hello" });

  return <div className="w-full max-w-xs">{hello.greeting}</div>;
};
