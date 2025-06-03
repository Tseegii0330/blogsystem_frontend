"use client";

import { useState, useEffect, FunctionComponent } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { articleType } from "@/types/type";
import { useAuth } from "@/context/AuthContext";

const formSchema = z.object({
  title: z.string().min(2, {
    message: "Нэр оруулна уу",
  }),
  content: z.string().min(2, {
    message: "Мэдээлэл оруулна уу",
  }),
  tags: z.array(z.string()),
  author_id: z.number(),
  is_published: z.boolean(),
});

interface ArticleFormProps {
  article?: articleType | null;
}
const EditForm: FunctionComponent<ArticleFormProps> = ({ article }) => {
  const router = useRouter();

  const [infoMessage, setInfoMessage] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: article?.title || "",
      content: article?.content || "",
      tags: article?.tags || [],
      author_id: article?.author_id,
      is_published: article?.is_published || false,
    },
  });

  useEffect(() => {
    if (!infoMessage) return;

    const timeout = setTimeout(() => {
      setInfoMessage(null);
    }, 2000);

    return () => {
      clearTimeout(timeout);
    };
  }, [infoMessage]);

  function onSubmit(values: z.infer<typeof formSchema>) {
    const finalValues = {
      ...values,
    };

    if (article) {
      // Update
      fetch(`/api/ticket/${article.id}`, {
        method: "PUT",
        body: JSON.stringify(finalValues),
      })
        .then(() => {
          setInfoMessage("Амжилттай хадгаллаа");
        })
        .catch((error) => {
          setInfoMessage(error.message);
        });
    } else {
      // Create
      fetch("/api/ticket", {
        method: "POST",
        body: JSON.stringify(finalValues),
      })
        .then((res) => res.json())
        .then(({ ticket, error }) => {
          setInfoMessage("Амжилттай хадгаллаа");

          if (error) {
            throw new Error(error.message);
          }

          router.push(`/ticket/edit/${ticket?.id}`);
        })
        .catch((error) => {
          setInfoMessage(error.message);
        });
    }
  }

  return (
    <>
      <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-3xl md:leading-14 mt-4">
        {article ? "Нийтлэл засах" : "Нийтлэл нэмэх"}
      </h1>
      {infoMessage && (
        <div className="py-4 text-md text-sky-400">{infoMessage}</div>
      )}

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Үнэ</FormLabel>
                <FormControl>
                  <Input
                    type="string"
                    {...field}
                    onChange={(e) => field.onChange(parseInt(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="is_published"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>Public болгох?</FormLabel>
                </div>
              </FormItem>
            )}
          />

          <div>
            <Button className="float-right" type="submit">
              Хадгалах
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
};

export default EditForm;
