"use client";

import { SearchIcon } from "lucide-react";

import { Input } from "./molecules/shadcn/input";

const SearchPassword = () => {
  return (
    <div className="relative w-full min-w-0">
      <SearchIcon className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-zinc-600" />
      <Input type="search" placeholder="Search" className="pl-11" />
    </div>
  );
};

export default SearchPassword;
