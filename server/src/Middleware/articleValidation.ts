import type { RequestHandler } from "express";
import { z } from "zod";

export const rowSchema = z.object({
  title: z.string({
    message: "Le titre doit être renseigné.",
  }),
  content: z.string({
    message: "Le contenu de l'article doit être renseigné.",
  }),
  categories_id: z.number({
    message: "La catégorie de l'article doit être renseigné.",
  }),
});

export const validateArticle: RequestHandler = async (req, res, next) => {
  try {
    await rowSchema.parseAsync(req.body);
    next();
  } catch (err) {
    if (err instanceof z.ZodError) {
      const errors = err.issues.map((e) => ({
        path: e.path.join("."),
        message: e.message,
      }));
      void res
        .status(422)
        .json({ message: "Erreur de validation des données", errors });
      return;
    }
    next(err);
  }
};
