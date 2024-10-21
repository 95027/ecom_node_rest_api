const express = require("express");
const app = express();
require("dotenv").config();
const cors = require('cors');
const routes = require('./src/routes');
const { sequelize } = require("./src/models");
const errorHandler  = require("./src/middlewares/errorMiddleware");


const corsOptions = {
  origin: ['http://localhost:5173'],
}

app.use(cors(corsOptions));
app.use(express.json());
app.use('/v1', routes);




const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("hello world");
});

app.use(errorHandler);

//sequelize.sync({alter: true}).then(() => console.log('db synchronized'));

app.listen(PORT, () => console.log(`server is running on ${PORT}`));
