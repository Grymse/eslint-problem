"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@repo/ui/base/button";
import { CardContent, CardFooter } from "@repo/ui/base/card";
import { Input } from "@repo/ui/base/input";
import { Label } from "@repo/ui/base/label";
import { useState } from "react";
import { Text } from "@repo/ui/base/text";

export default function NewUserForm() {
  const { update, data } = useSession();
  const [name, setName] = useState(data?.user?.name || "");
  const router = useRouter();
  const [error, setError] = useState<string>("");

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // @ts-ignore
    const name = e.currentTarget?.name?.value as string | undefined;

    // Post to API
    fetch("/api/user", {
      method: "POST",
      body: JSON.stringify({ name }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(async (res) => {
        const data = await res.json();

        if (res.status === 200) {
          update({ name: data.name });
          router.push("/");
          return;
        }
        setError(data.error);
      })
      .catch(setError);
  }

  return (
    <form onSubmit={onSubmit}>
      <CardContent className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            type="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Text type="error">{error}</Text>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full">Create account</Button>
      </CardFooter>
    </form>
  );
}
