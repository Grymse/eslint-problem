"use client";

import * as React from "react";

import { Input } from "@repo/ui/base/input";
import { Label } from "@repo/ui/base/label";
import { Button } from "@repo/ui/base/button";
import ProviderButton from "./ProviderButton";
import Image from "next/image";
import { signIn } from "next-auth/react";
import { Validate, emailValidator } from "@repo/utility/src/io/validators";
import { Text } from "@repo/ui/base/text";
import { useSearchParams } from "next/navigation";
import { cn } from "@repo/ui/lib/utils";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const [error, setError] = React.useState<string | null>(null);
  const callbackUrl = useCallbackUrl();

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const email = e.currentTarget.email.value;

    const error = Validate(emailValidator)(email);

    if (error) {
      setError(error);
      return;
    }

    signIn("email", {
      email: e.currentTarget.email.value,
      callbackUrl,
    });
  };

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={onSubmit}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              Email
            </Label>
            <Input
              id="email"
              placeholder="name@example.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              required
            />
            <Text type="error">{error}</Text>
          </div>
          <Button>Sign In with Email</Button>
        </div>
      </form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      <ProviderButton callbackUrl={callbackUrl} providerType="google">
        <Image
          alt="google-icon"
          src="/images/auth/google-icon.svg"
          width={24}
          height={24}
          className="mr-2"
        />
        Google
      </ProviderButton>
      {/* <ProviderButton callbackUrl={callbackUrl} providerType="azure-ad">
        <Image
          alt="google-icon"
          src="/images/auth/outlook-icon.svg"
          width={24}
          height={24}
          className="mr-2"
        />
        Outlook
      </ProviderButton> */}
    </div>
  );
}

function useCallbackUrl() {
  const searchParams = useSearchParams();
  return React.useMemo(() => {
    const url = searchParams.get("callbackUrl") || "/";
    if (Array.isArray(url)) return url[0];
    return url;
  }, [searchParams]);
}
