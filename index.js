import { timeStamp } from "console";
import { createRequire } from "module";

const require = createRequire(import.meta.url);

const express = require("express");

const path = require("path")

const cookieParser = require("cookie-parser")

const { restrictToLoggedinUser,checkAuth } = require("./middleware/auth")

const app = express();

const PORT = 8001;

const urlRouter = require("./routes/url");

const staticRouter = require("./routes/staticRouter")

const userRouter = require("./routes/user")

const { connectToMongoDb } = require("./connect");

app.set('view engine','ejs'); //this is how we tell express that which engine we ave to use

app.set('views', path.resolve("./views"))

const URL = require("./models/url");

await connectToMongoDb("mongodb://localhost:27017/short-url").then(
  console.log("mongodb connected"),
); //we always givees the database name with the url parsing onnly
//connection to mongoose


app.use(express.json());
//to process the form data from html we will need a middlewre

app.use(express.urlencoded({extended : false})); //supports both form data and json dat a

app.use(cookieParser()) //since we are using cookie in the auth so

app.use("/user", userRouter);

app.use("/url", checkAuth, urlRouter);

app.use("/static" , staticRouter); 

app.get("/:shortId", async (req, res) => {
  //first we have to get the shortid
  const shortId = req.params.shortId;
  //we have to update the visited also and get the enrty also
  const entry = await URL.findOneAndUpdate(
    {
      shortId: shortId,
    },
    {
      $push: {
        visitHistory: {
          timeStamp: Date.now(),
        },
      },
    },
  );

  if (!entry) {
    return res.status(404).json({ error: "Short URL not found" });
  }

  res.redirect(entry.redirectUrl);
});

app.listen(PORT, () => {
  console.log(`server started at port : ${PORT}`);
});
