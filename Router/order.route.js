const express = require("express");
const orderModel = require("../models/order.model");
const { Router } = require("express");

const orderRouter = Router();

orderRouter.post("/create",  async (req, res) => {
  const order=req.body;

  const data = new orderModel(order);
  await data.save();

  res.status(200).send("Data Added");
});

orderRouter.get("/", async (req, res) => {
    const user_token=req.headers.authorization;
    const decoded=jwt.verify(user_token, process.env.TOKEN_KEY);
    const { userId } = decoded;
  
    const items = await orderModel.find({ userId: userId });
  
    res.status(200).send(items);
});

orderRouter.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;
  console.log(id);
  const data = await MEN.find({ _id: id });
  res.status(200).send(data);
});


module.exports = orderRouter;