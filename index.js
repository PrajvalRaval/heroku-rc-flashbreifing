const PORT = process.env.PORT || 3000;
const express = require("express");
const axios = require('axios');
const app = express();

app.use(express.json());

var speechText;
var date;
var _id;

const flashBriefingMessage = async () => {
  await axios
    .get(`https://bots.rocket.chat/api/v1/channels.anonymousread?roomName=flashbriefingchannel`)
    .then((res) => {

      speechText = res.data.messages[0].msg;
      date = res.data.messages[0].ts;
      _id = res.data.messages[0]._id;
      console.log(res.data.messages[0].msg);
      console.log(res.data.messages[0].ts);
      console.log(res.data.messages[0]._id);

    })
    .catch((err) => {
      console.log(err.message);
    });
};

const courses = {
  uid: _id,
  updateDate: date,
  titleText: "RC FLASH BRIEFING",
  mainText: speechText,
  redirectionUrl: "COMING SOON"
};


app.get("/", function async (req, res) {
  await flashBriefingMessage();
  //when we get an http get request to the root/homepage
  res.send(courses);
});

app.listen(PORT, function () {
  console.log(`Listening on Port ${PORT}`);
});
