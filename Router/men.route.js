const express = require("express");
const {MEN} = require("../models/men.model");
const { Router } = require("express");

const mensRouter = Router();

mensRouter.get("/", async (req, res) => {
    const { sortFilter } = req.query;
    let data;
    if (sortFilter) {
      if (sortFilter == "asc") {
        data = await MEN.find()
          .sort({ Price: 1 })
          .collation({ locale: "en_US", numericOrdering: true });
      } else if (sortFilter == "desc") {
        data = await MEN.find()
          .sort({ Price: -1 })
          .collation({ locale: "en_US", numericOrdering: true });
      } else {
        data = await MEN.find({ color: sortFilter });
      }
    } else {
      data = await MEN.find();
    }
  
    res.send(data);
});

mensRouter.get("/productdetails/:id", async (req, res) => {
  const { id } = req.params;

  const data = await MEN.find({ _id: id });
  res.status(200).send(data);
});

mensRouter.post("/insert",  async (req, res) => {
  const { Image, Brand_Name, Price, color } = req.body;

  const data = await MEN.create({
    Image,
    Brand_Name,
    Price,
    color,
  });

  res.status(200).send("Data Added");
});

module.exports = mensRouter;