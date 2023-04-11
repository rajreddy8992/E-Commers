import express from 'express';
import bodyparser from "body-parser";
const app = express();
const userRouter  = require("./src/routes/user.route")
app.use(bodyparser.json());
//This allows us to access network layer
require("./src/config/db.config")
app.all("*", function (req: any, res: any, next: any) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    res.header("Access-Control-Expose-Headers", "Content-Disposition");
    res.header(
      "Access-Control-Allow-Methods",
      "GET, POST, OPTIONS, PUT, PATCH, DELETE"
    );
    next();
  });
app.use(userRouter);
app.use(express.raw());
app.listen(5000, () => {
    console.log(`server is runing  5000`);
});