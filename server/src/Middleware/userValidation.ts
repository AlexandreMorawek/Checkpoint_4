import type { RequestHandler } from "express";
import { z } from "zod";

export const rowSchema = z.object({
  username: z
    .string()
    .min(1, "Le username doit contenir au moins un caractère.")
    .max(30, "Le username ne doit pas dépasser 30 caractères."),
  password: z
    .string()
    .min(1, "Le mot de passe doit contenir au moins un caractère.")
    .max(30, "Le mot de passe ne doit pas dépasser 30 caractères."),
});

export const validateUser: RequestHandler = async (req, res, next) => {
  try {
    await rowSchema.parseAsync(req.body);
    next();
  } catch (err) {
    if (err instanceof z.ZodError) {
      const errors = err.issues.map((e) => ({
        path: e.path.join("."),
        message: e.message,
      }));
      void res.status(422).json({
        message: "Erreur lors de la création de l'utilisateur",
        errors,
      });
      return;
    }
    next(err);
  }
};
