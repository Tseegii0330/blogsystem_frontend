"use client";

import { FunctionComponent, useState } from "react";
import Cookies from "js-cookie";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { Textarea } from "@/components/ui/textarea";
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

const formSchema = z.object({
  title: z.string().min(2, {
    message: "Нэр оруулна уу",
  }),
  content: z.string().min(2, {
    message: "Мэдээлэл оруулна уу",
  }),
  tags: z.array(z.string()),
  user_id: z.number(),
  is_published: z.boolean(),
});

interface ArticleFormProps {
  article?: articleType | null;
}
const EditForm: FunctionComponent<ArticleFormProps> = ({ article }) => {
  const token = Cookies.get("token");
  const router = useRouter();
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState<string[]>(article?.tags || []);

  const handleAddTag = () => {
    const trimmed = tagInput.trim();

    if (trimmed && !tags.includes(trimmed)) {
      setTags([...tags, trimmed]);
      setTagInput("");
    }
  };

  const handleDeleteTag = (index: number) => {
    const newTags = [...tags];
    newTags.splice(index, 1);
    setTags(newTags);
  };
  console.log("tags: ", tags);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: article?.title || "",
      content: article?.content || "",
      tags: article?.tags || [],
      user_id: article?.user_id,
      is_published: article?.is_published || false,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const finalValues = {
      ...values,
      tags: tags,
    };

    if (article) {
      // Update
      fetch(`http://localhost:3001/api/articles/${article.id}`, {
        method: "PUT",
        body: JSON.stringify(finalValues),
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
      })
        .then(async (res) => {
          if (!res.ok) {
            const err = await res.json();
            throw new Error(err.message || "Алдаа гарлаа");
          }
          toast.success("Амжилттай хадгаллаа");
        })
        .catch((error) => {
          toast.warning(error.message);
        });
    } else {
      // Create
      fetch("http://localhost:3001/api/articles", {
        method: "POST",
        body: JSON.stringify(finalValues),
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
      })
        .then((res) => res.json())
        .then(({ article, error }) => {
          toast.success("Амжилттай хадгаллаа");

          if (error) {
            throw new Error(error.message);
          }

          router.push(`/articles/edit/${article?.id}`);
        })
        .catch((error) => {
          toast.success(error.message);
        });
    }
  }

  return (
    <>
      <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-3xl md:leading-14 mt-4">
        {article ? "Нийтлэл засах" : "Нийтлэл нэмэх"}
      </h1>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Нэр</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="space-y-4">
            <div className="flex gap-2">
              <Input
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                placeholder="Таг бичнэ үү"
              />
              <Button type="button" onClick={handleAddTag}>
                Нэмэх
              </Button>
            </div>

            <div className="flex flex-wrap gap-2">
              {tags.map((tag, index) => (
                <div
                  key={index}
                  className="flex items-center bg-gray-200 px-3 py-1 rounded-full text-sm"
                >
                  {tag}
                  <button
                    className="ml-2 text-red-500 font-bold"
                    onClick={() => handleDeleteTag(index)}
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>

          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Дэлгэрэнгүй</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Type your content here."
                    className="resize-none"
                    {...field}
                    onChange={(e) => field.onChange(e.target.value)}
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
