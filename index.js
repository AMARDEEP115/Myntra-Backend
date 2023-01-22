const express = require("express");
const cors = require("cors");

const {USER} = require("./models/user.model");
const { connection }= require("./config/db");
const userRouter = require("./Router/user.route");
const mensRouter = require("./Router/men.route");
const womensRouter = require("./Router/women.route");

const {Authentication} = require("./middlewares/auth.middleware");

const cartRouter = require("./Router/cart.route");
const orderRouter = require("./Router/order.route");

require("dotenv").config();

const mongoURL = process.env.URL;
const port = process.env.PORT;



const app = express();

app.use(express.json());

app.use(cors({origin: "*"}));

app.get("/", (req, res) => {
    res.send("homepage");
});

app.use('/users',userRouter)
app.use('/mens',mensRouter)
app.use('/womens',womensRouter)
app.use(Authentication);
app.use('/cart',cartRouter);
app.use("/order",orderRouter);



app.listen(port, async()=>{
    try{
        await connection;
        console.log("Connected to DB")

    }catch(err){
        console.log(err);
        console.log("Error while connecting to DB");
    }
    console.log(`server is running at port ${port}`);
});