"use client";
import React, { useState, useEffect } from "react";
import { Input } from "@/components/molecules/shadcn/input";
import { Progress } from "@/components/molecules/shadcn/progress";
import { Copy} from "lucide-react";

import {
  Alert,
  AlertTitle,
  AlertDescription,
} from "@/components/molecules/shadcn/alert";
import { Check, X } from "lucide-react";

interface PasswordCriteria {
  hasMinLength: boolean;
  hasUpperCase: boolean;
  hasLowerCase: boolean;
  hasNumber: boolean;
  hasSpecialChar: boolean;
}

export default function PasswordAnalyzer(): React.ReactElement {
  const [password, setPassword] = useState("");
  const [strength, setStrength] = useState(0);
  const [criteria, setCriteria] = useState<PasswordCriteria>({
    hasMinLength: false,
    hasUpperCase: false,
    hasLowerCase: false,
    hasNumber: false,
    hasSpecialChar: false,
  });

  const analyzePassword = (pass: string) => {
    const newCriteria = {
      hasMinLength: pass.length >= 8,
      hasUpperCase: /[A-Z]/.test(pass),
      hasLowerCase: /[a-z]/.test(pass),
      hasNumber: /\d/.test(pass),
      hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(pass),
    };

    setCriteria(newCriteria);

    // Calculate strength percentage
    const criteriaCount = Object.values(newCriteria).filter(Boolean).length;
    setStrength((criteriaCount / 5) * 100);
  };

  useEffect(() => {
    analyzePassword(password);
  }, [password]);

  const getStrengthColor = () => {
    if (strength <= 20) return "bg-red-500";
    if (strength <= 40) return "bg-orange-500";
    if (strength <= 60) return "bg-yellow-500";
    if (strength <= 80) return "bg-blue-500";
    return "bg-green-500";
  };

  const getStrengthText = () => {
    if (strength <= 20) return "Very Weak";
    if (strength <= 40) return "Weak";
    if (strength <= 60) return "Medium";
    if (strength <= 80) return "Strong";
    return "Very Strong";
  };

  const CriteriaItem = ({ met, text }: { met: boolean; text: string }) => (
    <div className="flex items-center space-x-2">
      {met ? (
        <Check className="h-4 w-4 text-green-500" />
      ) : (
        <X className="h-4 w-4 text-red-500" />
      )}
      <span className={met ? "text-green-500" : "text-red-500"}>{text}</span>
    </div>
  );

  const copyToClipboard = async (): Promise<void> => {
    try {
      await navigator.clipboard.writeText(password);
    } catch (error) {
      console.error("Failed to copy password:", error);
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto space-y-4">
      {/* <h2 className="text-2xl font-bold mb-4">Password Analyzer</h2> */}

      <div className="space-y-4">
        <div className="relative">
          <Input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full"
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

        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-sm">Strength:</span>
            <span className="text-sm font-medium">{getStrengthText()}</span>
          </div>
          <Progress value={strength} className={`h-2 ${getStrengthColor()}`} />
        </div>

        <Alert>
          <AlertTitle>Password Requirements</AlertTitle>
          <AlertDescription>
            <div className="mt-2 space-y-2">
              <CriteriaItem
                met={criteria.hasMinLength}
                text="At least 8 characters"
              />
              <CriteriaItem
                met={criteria.hasUpperCase}
                text="At least one uppercase letter"
              />
              <CriteriaItem
                met={criteria.hasLowerCase}
                text="At least one lowercase letter"
              />
              <CriteriaItem
                met={criteria.hasNumber}
                text="At least one number"
              />
              <CriteriaItem
                met={criteria.hasSpecialChar}
                text="At least one special character"
              />
            </div>
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );
}
