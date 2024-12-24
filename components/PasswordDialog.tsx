"use client";
import React, { useReducer, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/molecules/shadcn/dialog";
import { Button } from "@/components/molecules/shadcn/button";
import { Input } from "@/components/molecules/shadcn/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/molecules/shadcn/select";
import { EyeIcon, EyeOffIcon, Plus } from "lucide-react";

// Sample categories for demonstration
const sampleCategories = [
  { id: "1", name: "Social Media", slug: "social" },
  { id: "2", name: "Banking", slug: "banking" },
  { id: "3", name: "Email", slug: "email" },
];

const PasswordDialog = () => {
  const [isOpen, toggleIsOpen] = useReducer((state) => !state, false);
  const [seePassword, toggleSeePassword] = useReducer((state) => !state, false);

  const [formData, setFormData] = useState({
    websiteName: "",
    username: "",
    email: "",
    password: "",
    url: "",
    category: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCategoryChange = (value) => {
    setFormData((prev) => ({
      ...prev,
      category: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    setFormData({
      websiteName: "",
      username: "",
      email: "",
      password: "",
      url: "",
      category: "",
    });
    toggleIsOpen();
  };

  return (
    <Dialog open={isOpen} onOpenChange={toggleIsOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add new password
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add New Password</DialogTitle>
          <DialogDescription>
            Enter the necessary information to create a new password and save.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <label className="text-sm font-medium">Category</label>
            <Select
              onValueChange={handleCategoryChange}
              value={formData.category}
            >
              <SelectTrigger autoFocus className="capitalize">
                <SelectValue placeholder="Select Categories" />
              </SelectTrigger>
              <SelectContent>
                {sampleCategories.map((category) => (
                  <SelectItem
                    key={category.id}
                    value={category.id}
                    className="capitalize"
                  >
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Website Name</label>
            <Input
              name="websiteName"
              placeholder="Enter website name"
              value={formData.websiteName}
              onChange={handleInputChange}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">
              Email <span className="text-zinc-500">(Optional)</span>
            </label>
            <Input
              name="email"
              placeholder="Enter email address"
              value={formData.email}
              onChange={handleInputChange}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">
              Username <span className="text-zinc-500">(Optional)</span>
            </label>
            <Input
              name="username"
              placeholder="Enter username"
              value={formData.username}
              onChange={handleInputChange}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Password</label>
            <div className="flex items-center space-x-3">
              <Input
                name="password"
                type={seePassword ? "text" : "password"}
                placeholder="Enter password"
                value={formData.password}
                onChange={handleInputChange}
              />
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={toggleSeePassword}
              >
                {seePassword ? (
                  <EyeOffIcon className="h-4 w-4 text-zinc-700" />
                ) : (
                  <EyeIcon className="h-4 w-4 text-zinc-700" />
                )}
              </Button>
            </div>
            <p className="text-sm text-zinc-500">
              Enter the password for the website or service.
            </p>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">
              URL <span className="text-zinc-500">(Optional)</span>
            </label>
            <Input
              name="url"
              placeholder="Enter website URL"
              value={formData.url}
              onChange={handleInputChange}
            />
          </div>

          <Button type="submit" className="w-full">
            Create
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default PasswordDialog;
