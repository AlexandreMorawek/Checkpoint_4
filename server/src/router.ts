import express from "express";

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Define item-related routes
import articleAction from "./modules/article/articleAction";

router.get("/api/articles", articleAction.browse);

/* ************************************************************************* */

export default router;
