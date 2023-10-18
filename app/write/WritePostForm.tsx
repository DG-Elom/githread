"use client";

import { ContentTextArea } from "@/src/features/post/ContentTextArea";
import { Form, FormField, FormItem, useZodForm } from "@/components/ui/form";
import { PostLayout } from "@/src/features/post/PostLayout";
import { User } from "@prisma/client";
import { useRouter } from "next/navigation";
import z from "zod";
import { Button } from "@/components/ui/button";

const Schema = z.object({
  content: z.string().min(1).max(500),
});

export type WritePostFormValues = z.infer<typeof Schema>;

type WritePostFormProps = {
  user: User;
  onSubmit: (values: WritePostFormValues) => Promise<string>;
};
export const WritePostForm = ({ user, onSubmit }: WritePostFormProps) => {
  const form = useZodForm({
    schema: Schema,
  });
  const router = useRouter();

  return (
    <PostLayout user={user}>
      <Form
        form={form}
        onSubmit={async (values) => {
          const postId = await onSubmit(values);
          console.log("Submit client side", postId);
          router.push(`/posts/${postId}`);
        }}
      >
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <ContentTextArea {...field} />
            </FormItem>
          )}
        />

        <div className="flex w-full justify-end">
          <Button size="sm">Post</Button>
        </div>
      </Form>
    </PostLayout>
  );
};
