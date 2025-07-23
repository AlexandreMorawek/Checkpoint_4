import express from "express";

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Define item-related routes
import articleAction from "./modules/article/articleAction";

router.get("/api/articles", articleAction.browse);
router.post("/api/articles", articleAction.add);

import categoryAction from "./modules/category/categoryAction";

router.get("/api/categories", categoryAction.browse);

/* ************************************************************************* */

export default router;
