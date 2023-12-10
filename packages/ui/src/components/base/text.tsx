import { cn } from "@repo/ui/lib/utils";
import React from "react";

const H1 = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h1
    ref={ref}
    className={cn("text-primary text-5xl font-extrabold", className)}
    {...props}
  />
));
H1.displayName = "H1";

const H2 = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h2
    ref={ref}
    className={cn("text-primary text-3xl font-semibold leading-9", className)}
    {...props}
  />
));
H2.displayName = "H2";

const H3 = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "text-primary text-2xl font-semibold leading-loose",
      className
    )}
    {...props}
  />
));
H3.displayName = "H3";

const H4 = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h4
    ref={ref}
    className={cn("text-primary text-xl font-semibold leading-7", className)}
    {...props}
  />
));
H4.displayName = "H4";

type TextType =
  | "normal"
  | "muted"
  | "blockquote"
  | "lead"
  | "large"
  | "small"
  | "subtle"
  | "error";

const getTailwindClasses = (type: TextType) => {
  switch (type) {
    case "normal":
      return "text-primary leading-7";
    case "error":
      return "text-destructive leading-7";
    case "muted":
      return "text-muted leading-7";
    case "blockquote":
      return "text-primary italic leading-7";
    case "lead":
      return "text-primary text-xl leading-7";
    case "large":
      return "text-primary text-lg font-semibold leading-7";
    case "small":
      return "text-muted-foreground text-sm font-medium leading-[14px]";
    case "subtle":
      return "text-muted-foreground text-sm leading-tight";
  }
};

const Text = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement> & { type?: TextType }
>(({ className, type = "normal", ...props }, ref) => (
  <p ref={ref} className={cn(getTailwindClasses(type), className)} {...props} />
));
Text.displayName = "Text";

export { Text, H1, H2, H3, H4 };
