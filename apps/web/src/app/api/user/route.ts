import { auth } from "@/lib/auth/auth";
import { prisma } from "@repo/database";
import { z } from "zod";
import {
  Validate,
  personalNameValidator,
  urlValidator,
} from "@repo/utility/src/io/validators";
import { AuthRequest } from "@/lib/auth/types";

export const POST = auth(async (req: AuthRequest) => {
  const session = req.auth;

  if (!session || session === null || typeof session?.user?.id !== "string") {
    Response.json({ error: "Unauthenticated" }, { status: 401 });
  }
  /* 
  const acceptLanguage = req.headers['accept-language'];

  // Parse the header to get an array of language tags
  const languages = acceptLanguage.split(',');

  // Extract the primary language from the first element in the array
  const primaryLanguage = languages[0].trim(); */

  const { image, name } = await req.json();
  const data = { image, name };

  // Zod Check ...
  const objectValidator = z.object({
    name: personalNameValidator.optional(),
    image: urlValidator.optional(),
  });

  // Function to validate an object
  const error = Validate(objectValidator)(data);
  if (error) {
    return Response.json({ error }, { status: 400 });
  }

  // update user
  try {
    const updatedUser = await prisma.user.update({
      where: {
        id: session.user.id,
      },
      data: {
        image,
        name,
      },
    });
    return Response.json(updatedUser);
  } catch (error) {
    return Response.error();
  }
}) as any;
