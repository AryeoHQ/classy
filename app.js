const express = require("express");
const TeachableMachine = require("@sashido/teachablemachine-node");

const model = new TeachableMachine({
  modelUrl: "https://teachablemachine.withgoogle.com/models/3fT64Mmk1/"
});

const app = express();
const port = 5000;

app.get("/image/classify", async (req, res) => {
  const { url } = req.query;

  return model.classify({
    imageUrl: url,
  }).then((predictions) => {
    console.log(predictions);
    return res.json(predictions);
  }).catch((e) => {
    console.error(e);
    res.status(500).send("Something went wrong!")
  });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
