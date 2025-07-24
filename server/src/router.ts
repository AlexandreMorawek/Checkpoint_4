import express from "express";

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

import { validateArticle } from "./Middleware/articleValidation";
// Define item-related routes
import articleAction from "./modules/article/articleAction";

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
router.post("/api/users", userAction.add);

/* ************************************************************************* */

export default router;
