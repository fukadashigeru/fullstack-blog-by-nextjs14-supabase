"use client";
import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import { title } from "process";

const editBlog = async (
  id: number,
  title: string | undefined,
  description: string | undefined
) => {
  const response = await fetch(`/api/blog/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id, title, description }),
  });

  const data = await response.json();
  console.log(data);
  return data;
};

const getBlogById = async (id: number) => {
  const response = await fetch(`/api/blog/${id}`);
  const data = await response.json();
  const post = data.post;
  return post;
};

export const deleteBlog = async (id: number) => {
  const response = await fetch(`/api/blog/${id}`, {
    method: "DELETE",
  });

  const data = await response.json();
  return data;
};

const EditPostPage = ({ params }: { params: { id: number } }) => {
  const router = useRouter();
  const titleRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const loadingToastId = toast.loading("編集中です...");

    const data = await editBlog(
      params.id,
      titleRef.current?.value,
      descriptionRef.current?.value
    );
    // レスポンスを処理...

    // メイン画面にリダイレクト
    router.push("/");
    router.refresh();
    toast.dismiss(loadingToastId);
  };

  // const [post, setPost] = useState<any>(null);
  // useEffect(() => {
  //   const fetchPost = async () => {
  //     const fetchedPost = await getBlogById(params.id);
  //     setPost(fetchedPost);
  //   };

  //   fetchPost();
  // }, []);

  useEffect(() => {
    const fetchPost = async () => {
      const fetchedPost = await getBlogById(params.id);
      if (titleRef.current && descriptionRef.current) {
        titleRef.current.value = fetchedPost.title;
        descriptionRef.current.value = fetchedPost.description;
      }
    };

    fetchPost();
  }, []);

  // useEffect(() => {
  //   getBlogById(params.id)
  //     .then((post) => {
  //       if (titleRef.current && descriptionRef.current) {
  //         titleRef.current.value = post.title;
  //         descriptionRef.current!.value = post.description;
  //       }
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, []);

  const handleDelete = async () => {
    const loadingToastId = toast.loading("削除中です...");
    const data = await deleteBlog(params.id);
    // レスポンスを処理...
    // メイン画面にリダイレクト
    router.push("/");
    router.refresh();
    toast.dismiss(loadingToastId);
  };
  return (
    <>
      <Toaster />
      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-2xl">
          <form onSubmit={handleSubmit}>
            <div className="space-y-12">
              <div className="border-b border-gray-900/10 pb-12">
                <h2 className="text-base font-semibold leading-7 text-gray-900">
                  ブログ編集
                </h2>
                <p className="mt-1 text-sm leading-6 text-gray-600">
                  ブログを編集してください。
                </p>

                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                  <div className="sm:col-span-4">
                    <label
                      htmlFor="username"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      タイトル
                    </label>
                    <div className="mt-2">
                      <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                        {/* <input
                        type="text"
                        name="username"
                        id="username"
                        autoComplete="username"
                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                        placeholder="タイトル"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                      /> */}
                        <Input
                          // value={title}
                          // onChange={(e) => setTitle(e.target.value)}
                          // defaultValue={post?.title}
                          ref={titleRef}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="col-span-full">
                    <label
                      htmlFor="about"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      投稿内容
                    </label>
                    <div className="mt-2">
                      {/* <textarea
                      id="about"
                      name="about"
                      rows={3}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      defaultValue={""}
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    /> */}
                      <Textarea
                        // value={description}
                        // onChange={(e) => setDescription(e.target.value)}
                        // defaultValue={post?.description}
                        ref={descriptionRef}
                        className="h-64"
                      />
                    </div>
                    <p className="mt-3 text-sm leading-6 text-gray-600">
                      編集したいブログの内容を入力してください。
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-6 flex items-center justify-end gap-x-4">
              {/* <button
              type="button"
              className="text-sm font-semibold leading-6 text-gray-900"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Save
            </button> */}
              <Button
                variant="destructive"
                onClick={handleDelete}
                type="button"
              >
                削除
              </Button>
              <Button>編集</Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditPostPage;
