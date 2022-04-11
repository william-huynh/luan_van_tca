const Bophankd = require("../models/bophankdModel");
const Giamsatvung = require("../models/giamsatvungModel");

module.exports.postValidation = async (req, res, next) => {
    const bophankdId = req.body.bophankdId;
    const gsvId = req.body.gsvId;

    if (!bophankdId) {
        return res.status(400).json({ message: "[bophankdId] field is required" }).end();
    }

    if (!gsvId) {
        return res.status(400).json({ message: "[gsvId] field is required" }).end();
    }

    const bophankd = await Bophankd.findById(bophankdId);
    if (!bophankd) {
        return res.status(400).json({ message: "No data found with bophankdId: " +bophankdId }).end();
    }

    const gsv = await Giamsatvung.findById(gsvId);
    if (!gsv) {
        return res.status(400).json({ message: "No data found with gsvId: " +gsvId}).end();
    }

    return next();
}