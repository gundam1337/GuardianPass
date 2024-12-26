import React, { useState } from "react";
import { Card, CardContent } from "@/components/molecules/shadcn/card";
import { Button } from "@/components/molecules/shadcn/button";
import { Switch } from "@/components/molecules/shadcn/switch";
import { Slider } from "@/components/molecules/shadcn/slider";
import { Input } from "@/components/molecules/shadcn/input";
import { Separator } from "@/components/molecules/shadcn/separator";

import { Copy, Shuffle } from "lucide-react";

interface PasswordOptions {
  length: number;
  includeLowercase: boolean;
  includeUppercase: boolean;
  includeNumbers: boolean;
  includeSpecial: boolean;
}

const PasswordGenerator: React.FC = () => {
  const [password, setPassword] = useState<string>("");
  const [options, setOptions] = useState<PasswordOptions>({
    length: 6,
    includeLowercase: true,
    includeUppercase: true,
    includeNumbers: true,
    includeSpecial: false,
  });

  const generatePassword = (): void => {
    let charset: string = "";
    if (options.includeLowercase) charset += "abcdefghijklmnopqrstuvwxyz";
    if (options.includeUppercase) charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (options.includeNumbers) charset += "0123456789";
    if (options.includeSpecial) charset += "!@#$%^&*()_+-=[]{}|;:,.<>?";

    let generatedPassword: string = "";

    for (let i = 0; i < options.length; i++) {
      const randomIndex: number = Math.floor(Math.random() * charset.length);
      generatedPassword += charset[randomIndex];
    }
    setPassword(generatedPassword);
  };

  const copyToClipboard = async (): Promise<void> => {
    try {
      await navigator.clipboard.writeText(password);
    } catch (error) {
      console.error("Failed to copy password:", error);
    }
  };

  const updateOption = (
    key: keyof PasswordOptions,
    value: boolean | number
  ): void => {
    setOptions((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <div className="w-full max-w-md mx-auto p-4">
      <Card className=" text-zinc-400">
        <CardContent className="pt-6 space-y-6">
          <div className="relative">
            <Input
              value={password}
              readOnly
              className="w-full bg-zinc-900 border-none text-zinc-300"
              placeholder="your password generated"
            />
            <button
              onClick={copyToClipboard}
              className="absolute right-3 top-1/2 -translate-y-1/2"
              type="button"
              aria-label="Copy password"
            >
              <Copy className="h-4 w-4" />
            </button>
          </div>

          <Button
            onClick={generatePassword}
            className="w-full bg-white hover:bg-zinc-200 text-black flex items-center justify-center gap-2"
          >
            <Shuffle className="h-4 w-4" />
            Generate Password
          </Button>

          <div className="space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span>Length - {options.length}</span>
              </div>
              <Slider
                value={[options.length]}
                onValueChange={(value) => updateOption("length", value[0])}
                min={6}
                max={50}
                step={1}
                className="w-full"
              />
              <p className="text-sm text-zinc-500">
                Adjust the length of the password by sliding the control.
              </p>
            </div>
            <Separator />
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-base">Lowercase Letters</p>
                  <p className="text-sm text-zinc-500">
                    Include lowercase letters in the generated password.
                  </p>
                </div>
                <Switch
                  checked={options.includeLowercase}
                  onCheckedChange={(checked) =>
                    updateOption("includeLowercase", checked)
                  }
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-base">Uppercase Letters</p>
                  <p className="text-sm text-zinc-500">
                    Include uppercase letters in the generated password.
                  </p>
                </div>
                <Switch
                  checked={options.includeUppercase}
                  onCheckedChange={(checked) =>
                    updateOption("includeUppercase", checked)
                  }
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-base">Digits</p>
                  <p className="text-sm text-zinc-500">
                    Include digits in the generated password.
                  </p>
                </div>
                <Switch
                  checked={options.includeNumbers}
                  onCheckedChange={(checked) =>
                    updateOption("includeNumbers", checked)
                  }
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-base">Special Characters</p>
                  <p className="text-sm text-zinc-500">
                    Include special characters in the generated password.
                  </p>
                </div>
                <Switch
                  checked={options.includeSpecial}
                  onCheckedChange={(checked) =>
                    updateOption("includeSpecial", checked)
                  }
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PasswordGenerator;
