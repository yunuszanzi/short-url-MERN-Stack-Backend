const express = require("express");
const {
  handleGenerateNewShortURL,
  handleRedirectToOriginalURL,
  handleGetVisitAnalytics,
} = require("../controllers/url");
const router = express.Router();

router.post("/", handleGenerateNewShortURL);
router.get("/:shortId", handleRedirectToOriginalURL);
router.get("/analytics/:shortId", handleGetVisitAnalytics);

module.exports = router;
