import { Button } from "@repo/ui/base/button";
import { signIn } from "next-auth/react";
import React from "react";

type Props = {
  providerType: string;
  isLoading?: boolean;
  children: React.ReactNode;
  callbackUrl: string;
};

export default function ProviderButton({
  children,
  providerType,
  isLoading = false,
  callbackUrl,
}: Props) {
  return (
    <Button
      variant="outline"
      type="button"
      disabled={isLoading}
      onClick={() => signIn(providerType, { callbackUrl })}
    >
      {children}
    </Button>
  );
}
