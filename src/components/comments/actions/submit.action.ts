"use server";

import { validateRequest } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { getCommentDataIncluded, PostDataType } from "@/lib/types";
import { createCommentSchema } from "@/lib/validation-schema";

export async function submitComment({
  post,
  content,
}: {
  post: PostDataType;
  content: string;
}) {
  const { user } = await validateRequest();
  if (!user) throw new Error("Unauthorized");

  const { content: validatedContent } = createCommentSchema.parse({ content });
  const newComment = await prisma.comment.create({
    data: { content: validatedContent, postId: post.id, userId: user.id },
    include: getCommentDataIncluded(user.id),
  });

  return newComment;
}

export async function delteComment(id: string) {
  const { user } = await validateRequest();
  if (!user) throw new Error("Unauthorized");

  const comment = await prisma.comment.findUnique({
    where: { id },
  });
  if (!comment) throw new Error("Comment not found");

  if (comment.userId !== user.id) throw new Error("Unauthorized");

  const deltedComment = await prisma.comment.delete({
    where: { id },
    include: getCommentDataIncluded(user.id),
  });

  return deltedComment;
}
