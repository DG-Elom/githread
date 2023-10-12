import { getAuthSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Post } from "@/src/features/post/Post";
import { getLatestPosts } from "@/src/features/query/post.query";
import React from "react";

export default async function Home() {
  const session = getAuthSession;
  console.log(session);
  if (!session) return;
  const posts = await getLatestPosts();
  return (
    <div className="divide-y divide-muted">
      {posts.map((p) => (
        <Post key={p.id} post={p} />
      ))}
    </div>
  );
}
