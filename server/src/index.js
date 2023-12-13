require("./models/User");
require("./models/Mesocycle");


const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/authRoutes");
const requireAuth = require("./middlewares/requireAuth");
const mesocycleRoutes = require("./routes/mesocycleRoutes");

const app = express();

app.use(bodyParser.json());
app.use(authRoutes);
app.use(mesocycleRoutes);

const mongoUri = "mongodb+srv://admin:gYapZM4OoeXImLHl@cluster0.aflaywn.mongodb.net/?retryWrites=true&w=majority";

if (!mongoUri) {
  throw new Error(
    `MongoURI was not supplied.  Make sure you watch the video on setting up Mongo DB!`
  );
}
mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});
mongoose.connection.on("connected", () => {
  console.log("Connected to mongo instance");
});
mongoose.connection.on("error", (err) => {
  console.error("Error connecting to mongo", err);
});

app.get("/", requireAuth, (req, res) => {
  res.send(`Your email: ${req.user.email}`);
});

app.listen(3000, () => {
  console.log("Listening on port 3000");
});
