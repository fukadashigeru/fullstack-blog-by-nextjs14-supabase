"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { PostType } from "@/typs";
import Link from "next/link";
import { deleteBlog } from "./blog/edit/[id]/page";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
const user = {
  name: "Tom Cook",
  email: "tom@example.com",
  imageUrl:
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
};
const navigation = [
  { name: "Full Stack Blog", href: "#", current: true },
  { name: "Team", href: "#", current: false },
  { name: "Projects", href: "#", current: false },
  { name: "Calendar", href: "#", current: false },
  { name: "Reports", href: "#", current: false },
];
const userNavigation = [
  { name: "Your Profile", href: "#" },
  { name: "Settings", href: "#" },
  { name: "Sign out", href: "#" },
];

// const blogs = [
//   {
//     name: "Leslie Alexander",
//     email: "leslie.alexander@example.com",
//     role: "Co-Founder / CEO",
//     imageUrl:
//       "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
//     lastSeen: "3h ago",
//     lastSeenDateTime: "2023-01-23T13:23Z",
//   },
//   {
//     name: "Michael Foster",
//     email: "michael.foster@example.com",
//     role: "Co-Founder / CTO",
//     imageUrl:
//       "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
//     lastSeen: "3h ago",
//     lastSeenDateTime: "2023-01-23T13:23Z",
//   },
//   {
//     name: "Dries Vincent",
//     email: "dries.vincent@example.com",
//     role: "Business Relations",
//     imageUrl:
//       "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
//     lastSeen: null,
//   },
//   {
//     name: "Lindsay Walton",
//     email: "lindsay.walton@example.com",
//     role: "Front-end Developer",
//     imageUrl:
//       "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
//     lastSeen: "3h ago",
//     lastSeenDateTime: "2023-01-23T13:23Z",
//   },
//   {
//     name: "Courtney Henry",
//     email: "courtney.henry@example.com",
//     role: "Designer",
//     imageUrl:
//       "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
//     lastSeen: "3h ago",
//     lastSeenDateTime: "2023-01-23T13:23Z",
//   },
//   {
//     name: "Tom Cook",
//     email: "tom.cook@example.com",
//     role: "Director of Product",
//     imageUrl:
//       "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
//     lastSeen: null,
//   },
// ];

// async function fetchAllBlogs() {
//   const res = await fetch("/api/blog", {
//     cache: "no-store",
//   });
//   const data = await res.json();
//   return data.posts;
// }

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

const fetchAllBlogs = async () => {
  const res = await fetch("/api/blog", {
    cache: "no-store",
  });
  const data = await res.json();
  return data.posts;
};

// const fetchAllBlogs = async () => {
//   const res = await fetch("/api/blog");
//   const data = await res.json();
//   return data.posts;
// };

export default function Home() {
  const router = useRouter();
  // const posts = await fetchAllBlogs();
  // console.log(posts);

  const [posts, setPosts] = useState([]);
  useEffect(() => {
    fetchAllBlogs().then((posts) => setPosts(posts));
  }, []);

  const handleDelete = async (id: number) => {
    const loadingToastId = toast.loading("削除中です...");
    const data = await deleteBlog(id);
    // レスポンスを処理...
    // メイン画面にリダイレクト
    toast.dismiss(loadingToastId);
    // ブログ一覧の更新
    const updatedPosts = await fetchAllBlogs();
    setPosts(updatedPosts);
  };

  return (
    <>
      <Toaster />
      {/*
        This example requires updating your template:

        ```
        <html class="h-full bg-gray-100">
        <body class="h-full">
        ```
      */}
      <div className="min-h-full">
        <Disclosure as="nav" className="bg-gray-800">
          {({ open }) => (
            <>
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <img
                        className="h-8 w-8"
                        src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                        alt="Your Company"
                      />
                    </div>
                    <div className="hidden md:block">
                      <div className="ml-10 flex items-baseline space-x-4">
                        {navigation.map((item) => (
                          <a
                            key={item.name}
                            href={item.href}
                            className={classNames(
                              item.current
                                ? "bg-gray-900 text-white"
                                : "text-gray-300 hover:bg-gray-700 hover:text-white",
                              "rounded-md px-3 py-2 text-sm font-medium"
                            )}
                            aria-current={item.current ? "page" : undefined}
                          >
                            {item.name}
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="hidden md:block">
                    <div className="ml-4 flex items-center md:ml-6">
                      <button
                        type="button"
                        className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                      >
                        <span className="absolute -inset-1.5" />
                        <span className="sr-only">View notifications</span>
                        <BellIcon className="h-6 w-6" aria-hidden="true" />
                      </button>

                      {/* Profile dropdown */}
                      <Menu as="div" className="relative ml-3">
                        <div>
                          <Menu.Button className="relative flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                            <span className="absolute -inset-1.5" />
                            <span className="sr-only">Open user menu</span>
                            <img
                              className="h-8 w-8 rounded-full"
                              src={user.imageUrl}
                              alt=""
                            />
                          </Menu.Button>
                        </div>
                        <Transition
                          as={Fragment}
                          enter="transition ease-out duration-100"
                          enterFrom="transform opacity-0 scale-95"
                          enterTo="transform opacity-100 scale-100"
                          leave="transition ease-in duration-75"
                          leaveFrom="transform opacity-100 scale-100"
                          leaveTo="transform opacity-0 scale-95"
                        >
                          <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                            {userNavigation.map((item) => (
                              <Menu.Item key={item.name}>
                                {({ active }) => (
                                  <a
                                    href={item.href}
                                    className={classNames(
                                      active ? "bg-gray-100" : "",
                                      "block px-4 py-2 text-sm text-gray-700"
                                    )}
                                  >
                                    {item.name}
                                  </a>
                                )}
                              </Menu.Item>
                            ))}
                          </Menu.Items>
                        </Transition>
                      </Menu>
                    </div>
                  </div>
                  <div className="-mr-2 flex md:hidden">
                    {/* Mobile menu button */}
                    <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                      <span className="absolute -inset-0.5" />
                      <span className="sr-only">Open main menu</span>
                      {open ? (
                        <XMarkIcon
                          className="block h-6 w-6"
                          aria-hidden="true"
                        />
                      ) : (
                        <Bars3Icon
                          className="block h-6 w-6"
                          aria-hidden="true"
                        />
                      )}
                    </Disclosure.Button>
                  </div>
                </div>
              </div>

              <Disclosure.Panel className="md:hidden">
                <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
                  {navigation.map((item) => (
                    <Disclosure.Button
                      key={item.name}
                      as="a"
                      href={item.href}
                      className={classNames(
                        item.current
                          ? "bg-gray-900 text-white"
                          : "text-gray-300 hover:bg-gray-700 hover:text-white",
                        "block rounded-md px-3 py-2 text-base font-medium"
                      )}
                      aria-current={item.current ? "page" : undefined}
                    >
                      {item.name}
                    </Disclosure.Button>
                  ))}
                </div>
                <div className="border-t border-gray-700 pb-3 pt-4">
                  <div className="flex items-center px-5">
                    <div className="flex-shrink-0">
                      <img
                        className="h-10 w-10 rounded-full"
                        src={user.imageUrl}
                        alt=""
                      />
                    </div>
                    <div className="ml-3">
                      <div className="text-base font-medium leading-none text-white">
                        {user.name}
                      </div>
                      <div className="text-sm font-medium leading-none text-gray-400">
                        {user.email}
                      </div>
                    </div>
                    <button
                      type="button"
                      className="relative ml-auto flex-shrink-0 rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                    >
                      <span className="absolute -inset-1.5" />
                      <span className="sr-only">View notifications</span>
                      <BellIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>
                  <div className="mt-3 space-y-1 px-2">
                    {userNavigation.map((item) => (
                      <Disclosure.Button
                        key={item.name}
                        as="a"
                        href={item.href}
                        className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                      >
                        {item.name}
                      </Disclosure.Button>
                    ))}
                  </div>
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>

        <header className="bg-white shadow">
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              Full Stack Blog
            </h1>
          </div>
        </header>
        <main>
          <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
            {/* <div className="flex justify-end my-4">
              <Button variant="secondary">ブログの新規作成</Button>
            </div> */}
            <div className="flex justify-end my-4">
              <Link href={"/blog/add"}>
                <Button>ブログの新規作成</Button>
              </Link>
            </div>
            <ul role="list" className="divide-y divide-gray-200 border rounded">
              {posts.map((post: PostType) => (
                <li key={post.id} className="flex justify-between gap-x-6 p-5">
                  <div className="flex min-w-0 gap-x-4r">
                    {/* <img
                      className="h-12 w-12 flex-none rounded-full bg-gray-50"
                      src={blog.imageUrl}
                      alt=""
                    /> */}
                    <div className="min-w-0 flex-auto">
                      <p className="text-sm font-semibold leading-6 text-gray-900">
                        {post.title}
                      </p>
                      <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                        {post.description}
                      </p>
                    </div>
                  </div>
                  <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                    <div className="mt-6 flex items-center justify-end gap-x-4">
                      <Link href={`/blog/edit/${post.id}`}>
                        <Button variant="secondary">編集</Button>
                      </Link>
                      <Button
                        variant="link"
                        onClick={() => handleDelete(post.id)}
                      >
                        削除
                      </Button>
                    </div>

                    {/* <p className="text-sm leading-6 text-gray-900">
                      {person.role}
                    </p>
                    {person.lastSeen ? (
                      <p className="mt-1 text-xs leading-5 text-gray-500">
                        Last seen{" "}
                        <time dateTime={person.lastSeenDateTime}>
                          {person.lastSeen}
                        </time>
                      </p>
                    ) : (
                      <div className="mt-1 flex items-center gap-x-1.5">
                        <div className="flex-none rounded-full bg-emerald-500/20 p-1">
                          <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                        </div>
                        <p className="text-xs leading-5 text-gray-500">
                          Online
                        </p>
                      </div>
                    )} */}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </main>
      </div>
    </>
  );
}
