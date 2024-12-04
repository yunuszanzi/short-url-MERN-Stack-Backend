const URL = require("../models/url");
const shortid = require("shortid");
const handleGenerateNewShortURL = async (req, res) => {
  const body = req.body;
  if (!body.url) return res.status(400).json({ error: "url is required" });
  else {
    const shortID = shortid.generate();
    await URL.create({
      shortId: shortID,
      redirectUrl: body.url,
      visitHistory: [],
    });
    return res.status(200).json({ msg: "short id created", id: shortID });
  }
};

const handleRedirectToOriginalURL = async (req, res) => {
  const shortId = req.params.shortId;
  const entry = await URL.findOneAndUpdate(
    {
      shortId,
    },
    {
      $push: { visitHistory: { timestamp: Date.now() } },
    }
  );
  if (!entry) return res.status(404).json({ error: "Short id not found" });
  return res.redirect(entry.redirectUrl);
};

const handleGetVisitAnalytics = async (req, res) => {
  const shortId = req.params.shortId;
  const data = await URL.findOne({ shortId });
  res.json({
    // status: "success",
    // id: shortId,
    total_clicks: data.visitHistory.length,
    data: data,
  });
  // return res.status(200).json({ data: data });
};

module.exports = {
  handleGenerateNewShortURL,
  handleRedirectToOriginalURL,
  handleGetVisitAnalytics,
};
