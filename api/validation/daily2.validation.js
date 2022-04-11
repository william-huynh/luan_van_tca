const Bophankd = require("../models/bophankdModel");
const Giamsatvung = require("../models/giamsatvungModel");
const Daily1 = require("../models/daily1Model");

module.exports.postValidation = async (req, res, next) => {
    const bophankdId = req.body.bophankdId;
    const gsvId = req.body.gsvId;
    const daily1Id = req.body.daily1Id;

    if (!bophankdId) {
        return res.status(400).json({ message: "[bophankdId] field is required" }).end();
    }

    if (!gsvId) {
        return res.status(400).json({ message: "[gsvId] field is required" }).end();
    }

    if (!daily1Id) {
        return res.status(400).json({ message: "[daily1Id] field is required" }).end();
    }

    const bophankd = await Bophankd.findById(bophankdId);
    if (!bophankd) {
        return res.status(400).json({ message: "No data found with bophankdId: " +bophankdId }).end();
    }

    const gsv = await Giamsatvung.findById(gsvId);
    if (!gsv) {
        return res.status(400).json({ message: "No data found with gsvId: " +gsvId}).end();
    }

    const daily1 = await Daily1.findById(daily1Id);
    if (!daily1) {
        return res.status(400).json({ message: "No data found with daily1: " +daily1Id}).end();
    }

    return next();
}