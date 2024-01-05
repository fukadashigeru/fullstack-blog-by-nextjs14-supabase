"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";
import React, { useState, useRef } from "react";
import toast, { Toaster } from "react-hot-toast";

const PostBlog = async (
  title: string | undefined,
  description: string | undefined
) => {
  const response = await fetch("/api/blog", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    // body: JSON.stringify({ title, description }),
    body: JSON.stringify({
      // title: titleRef.current ? titleRef.current.value : "",
      // description: descriptionRef.current ? descriptionRef.current.value : "",
      title: title,
      description: description,
    }),
  });

  // console.log(response.json());
  // return response.json();
  const data = await response.json();
  console.log(data);
  return data;
};

const PostBlogPage = () => {
  const router = useRouter();
  // const [title, setTitle] = useState("");
  // const [description, setDescription] = useState("");
  const titleRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const loadingToastId = toast.loading("投稿中です...");

    const data = await PostBlog(
      titleRef.current?.value,
      descriptionRef.current?.value
    );
    // レスポンスを処理...

    // メイン画面にリダイレクト
    router.push("/");
    router.refresh();
    toast.dismiss(loadingToastId);
    // const successToastId = toast.success("投稿に成功しました。");
    // toast.dismiss(successToastId);
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
                  ブログ新規登録
                </h2>
                <p className="mt-1 text-sm leading-6 text-gray-600">
                  ブログを投稿してください。
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
                        ref={descriptionRef}
                        className="h-64"
                      />
                    </div>
                    <p className="mt-3 text-sm leading-6 text-gray-600">
                      投稿したいブログの内容を入力してください。
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-6 flex items-center justify-end gap-x-6">
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
              <Button>投稿</Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default PostBlogPage;
