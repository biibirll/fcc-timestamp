import express from "express";
import cors from "cors";

const port = 3000;

const app = express();
app.use(cors({ optionsSuccessStatus: 200 }));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

app.get("/api/", (req, res) => {
  const currentTime = new Date();

  res.json({ unix: currentTime.getTime(), utc: currentTime.toUTCString() });
});

app.get("/api/:date", (req, res) => {
  const onlyDigitsRE = /^[0-9]+$/;
  let date: Date;

  if (onlyDigitsRE.test(req.params.date)) {
    date = new Date(parseInt(req.params.date));
  } else {
    date = new Date(req.params.date);
  }

  if (isNaN(date.getTime())) {
    return res.status(400).json({ error: "Invalid Date" });
  }

  res.json({ unix: date.getTime(), utc: date.toUTCString() });
});

const listener = app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
