import express from "express";

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Define item-related routes
import { validateArticle } from "./Middleware/articleValidation";
import { validateUser } from "./Middleware/userValidation";
import articleAction from "./modules/article/articleAction";
import authAction from "./modules/auth/authAction";

router.get("/api/articles", articleAction.browse);
router.get("/api/article/:id", articleAction.read);
router.put("/api/articles/:id", articleAction.edit);
router.post("/api/articles", validateArticle, articleAction.add);
router.delete("/api/articles/:id", articleAction.destroy);

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
router.post("/api/logout", authAction.logout);

/* ************************************************************************* */

export default router;
