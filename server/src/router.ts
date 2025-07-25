import express from "express";

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Define item-related routes
import { validateArticle } from "./Middleware/articleValidation";
import authMiddleware from "./Middleware/authMiddleware";
import connectedMiddleware from "./Middleware/connectedMiddleware";
import { validateUser } from "./Middleware/userValidation";
import articleAction from "./modules/article/articleAction";
import authAction from "./modules/auth/authAction";

router.get("/api/articles", articleAction.browse);
router.get("/api/articles/:id", articleAction.read);
router.put("/api/articles/:id", authMiddleware.verifyToken, articleAction.edit);
router.post(
  "/api/articles",
  authMiddleware.verifyToken,
  validateArticle,
  articleAction.add,
);
router.delete(
  "/api/articles/:id",
  authMiddleware.verifyToken,
  articleAction.destroy,
);

import categoryAction from "./modules/category/categoryAction";

router.get("/api/categories", categoryAction.browse);
router.get("/api/categories/:id", categoryAction.read);
router.put("/api/categories/:id", categoryAction.edit);

import userAction from "./modules/user/userAction";

router.get("/api/users/:id", userAction.read);
router.post(
  "/api/register",
  validateUser,
  authAction.hashPassword,
  userAction.add,
);

router.post("/api/login", authAction.login);
router.get(
  "/api/me",
  authMiddleware.verifyToken,
  connectedMiddleware.connected,
);
router.post("/api/logout", authAction.logout);

/* ************************************************************************* */

export default router;
