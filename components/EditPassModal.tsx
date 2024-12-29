"use client";
import React, { useReducer, useState, ChangeEvent, FormEvent } from "react";
import { Input } from "@/components/molecules/shadcn/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/molecules/shadcn/select";
import { EyeIcon, EyeOffIcon, Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/molecules/shadcn/dialog";
import { Button } from "@/components/molecules/shadcn/button";
import { DropdownMenuItem } from "@/components/molecules/shadcn/dropdown-menu";

interface EditEntryModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

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

const INITIAL_FORM_DATA: FormData = {
  websiteName: "",
  username: "",
  email: "",
  password: "",
  url: "",
  category: "",
};
interface Category {
  id: string;
  name: string;
  slug: string;
}
const sampleCategories: Category[] = [
  { id: "1", name: "Social Media", slug: "social" },
  { id: "2", name: "Banking", slug: "banking" },
  { id: "3", name: "Email", slug: "email" },
];

export function EditEntryModal({ open, onOpenChange }: EditEntryModalProps) {
  const [isOpen, toggleIsOpen] = useReducer((state: boolean) => !state, false);
  const [seePassword, toggleSeePassword] = useReducer(
    (state: boolean) => !state,
    false
  );
  const [formData, setFormData] = useState<FormData>(INITIAL_FORM_DATA);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCategoryChange = (value: string): void => {
    setFormData((prev) => ({
      ...prev,
      category: value,
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    console.log(formData);
    setFormData(INITIAL_FORM_DATA);
    toggleIsOpen();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[80%] xl:max-w-3xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit password</DialogTitle>
          <DialogDescription>edit your password</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <label htmlFor="category" className="text-sm font-medium">
              Category
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
          </div>

          <div className="space-y-2">
            <label htmlFor="websiteName" className="text-sm font-medium">
              Website Name
            </label>
            <Input
              id="websiteName"
              name="websiteName"
              placeholder="Enter website name"
              value={formData.websiteName}
              onChange={handleInputChange}
              required
            />
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
            />
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
              Password
            </label>
            <div className="flex items-center space-x-3">
              <Input
                id="password"
                name="password"
                type={seePassword ? "text" : "password"}
                placeholder="Enter password"
                value={formData.password}
                onChange={handleInputChange}
                required
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
            />
          </div>

          <Button type="submit" className="w-full">
            Update
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

// This is the component that will be used in the dropdown menu
export function EditEntryAction() {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <DropdownMenuItem
        onSelect={(e) => {
          e.preventDefault();
          setOpen(true);
        }}
      >
        Edit Entry
      </DropdownMenuItem>
      <EditEntryModal open={open} onOpenChange={setOpen} />
    </>
  );
}
