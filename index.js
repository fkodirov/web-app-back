const express = require("express");

const authRouter = require("./authRouter");
const PORT = process.env.PORT || 5000;

const app = express();
app.use(express.json());
app.use("/auth", authRouter);

const start = () => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
};

start();
