"use client";

import React, { useState, ChangeEvent, FormEvent } from "react";

import { useUser } from "@clerk/clerk-react";
import { api } from "../convex/_generated/api";
import { useMutation } from "convex/react";

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
import { useToast } from "@/components/molecules/shadcn/hooks/use-toast";

interface Category {
  id: string;
  name: string;
  slug: string;
}

interface FormData {
  websiteName: string;
  username: string;
  email: string;
  password: string;
  url: string;
  category: string;
}

interface FormErrors {
  websiteName?: string;
  password?: string;
  category?: string;
  email?: string;
  url?: string;
}

const INITIAL_FORM_DATA: FormData = {
  websiteName: "",
  username: "",
  email: "",
  password: "",
  url: "",
  category: "",
};

//to add the the new categories
const sampleCategories: Category[] = [
  { id: "1", name: "Social Media", slug: "social" },
  { id: "2", name: "Entertainment", slug: "entertainment" },
  { id: "3", name: "Email", slug: "email" },
];

const PasswordDialog: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [seePassword, setSeePassword] = useState(false);

  const [formData, setFormData] = useState<FormData>(INITIAL_FORM_DATA);
  const [errors, setErrors] = useState<FormErrors>({});

  const addPassword = useMutation(
    api.password.createPasswordVaultEntryPersonal
  );

  const { toast } = useToast();

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.websiteName.trim()) {
      newErrors.websiteName = "Website name is required";
    }

    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
    }

    if (!formData.category) {
      newErrors.category = "Category is required";
    }

    //to use another validator for the email
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (formData.url && !/^https?:\/\/.*/.test(formData.url)) {
      newErrors.url = "URL must start with http:// or https://";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const handleCategoryChange = (value: string): void => {
    setFormData((prev) => ({
      ...prev,
      category: value,
    }));
    if (errors.category) {
      setErrors((prev) => ({
        ...prev,
        category: undefined,
      }));
    }
  };


  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    if (!validateForm()) {
      toast({
        variant: "destructive",
        title: "Validation Error",
        description: "Please fill in all required fields correctly.",
      });
      return;
    }

    try {
      await addPassword({
        websiteName: formData.websiteName,
        username: formData.username,
        email: formData.email,
        password: formData.password, // Plain password - will be encrypted server-side
        url: formData.url,
        category: formData.category,
      });

      toast({
        title: "Success!",
        description: "Password has been saved successfully.",
      });

      setFormData(INITIAL_FORM_DATA);
      setIsOpen(false);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to save password. Please try again.",
      });
    }
};

  const toggleIsOpen = () => setIsOpen((prev) => !prev);
  const toggleSeePassword = () => setSeePassword((prev) => !prev);

  const { user } = useUser();
  console.log("user", user?.id);

  return (
    <Dialog open={isOpen} onOpenChange={toggleIsOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add new password
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[80%] xl:max-w-3xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Password</DialogTitle>
          <DialogDescription>
            Enter the necessary information to create a new password and save.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <label htmlFor="category" className="text-sm font-medium">
              Category<span className="text-red-500">*</span>
            </label>
            <Select
              onValueChange={handleCategoryChange}
              value={formData.category}
            >
              <SelectTrigger id="category" autoFocus className="capitalize">
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
            {errors.category && (
              <p className="text-sm text-red-500">{errors.category}</p>
            )}
          </div>

          <div className="space-y-2">
            <label htmlFor="websiteName" className="text-sm font-medium">
              Website Name<span className="text-red-500">*</span>
            </label>
            <Input
              id="websiteName"
              name="websiteName"
              placeholder="Enter website name"
              value={formData.websiteName}
              onChange={handleInputChange}
              className={errors.websiteName ? "border-red-500" : ""}
            />
            {errors.websiteName && (
              <p className="text-sm text-red-500">{errors.websiteName}</p>
            )}
          </div>

          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium">
              Email <span className="text-zinc-500">(Optional)</span>
            </label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="Enter email address"
              value={formData.email}
              onChange={handleInputChange}
              className={errors.email ? "border-red-500" : ""}
            />
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email}</p>
            )}
          </div>

          <div className="space-y-2">
            <label htmlFor="username" className="text-sm font-medium">
              Username <span className="text-zinc-500">(Optional)</span>
            </label>
            <Input
              id="username"
              name="username"
              placeholder="Enter username"
              value={formData.username}
              onChange={handleInputChange}
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-medium">
              Password<span className="text-red-500">*</span>
            </label>
            <div className="flex items-center space-x-3">
              <Input
                id="password"
                name="password"
                type={seePassword ? "text" : "password"}
                placeholder="Enter password"
                value={formData.password}
                onChange={handleInputChange}
                className={errors.password ? "border-red-500" : ""}
              />
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={toggleSeePassword}
                aria-label={seePassword ? "Hide password" : "Show password"}
              >
                {seePassword ? (
                  <EyeOffIcon className="h-4 w-4 text-zinc-700" />
                ) : (
                  <EyeIcon className="h-4 w-4 text-zinc-700" />
                )}
              </Button>
            </div>
            {errors.password && (
              <p className="text-sm text-red-500">{errors.password}</p>
            )}
            <p className="text-sm text-zinc-500">
              Enter the password for the website or service.
            </p>
          </div>

          <div className="space-y-2">
            <label htmlFor="url" className="text-sm font-medium">
              URL <span className="text-zinc-500">(Optional)</span>
            </label>
            <Input
              id="url"
              name="url"
              type="url"
              placeholder="Enter website URL"
              value={formData.url}
              onChange={handleInputChange}
              className={errors.url ? "border-red-500" : ""}
            />
            {errors.url && <p className="text-sm text-red-500">{errors.url}</p>}
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
