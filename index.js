const PORT = process.env.PORT || 3000;
const express = require("express");
const axios = require('axios');
const app = express();

app.use(express.json());

var result;

const flashBriefingMessage = async () => {
  await axios
    .get(`https://bots.rocket.chat/api/v1/channels.anonymousread?roomName=flashbriefingchannel`)
    .then((res) => {

      result = JSON.parse({
        uid: res.data.messages[0]._id,
        updateDate: res.data.messages[0].ts,
        titleText: "RC FLASH BRIEFING",
        mainText: res.data.messages[0].msg,
        redirectionUrl: "COMING SOON"
      });

    })
    .catch((err) => {
      console.log(err.message);
    });
};


app.get('/', async (req, res) => {
  try {
    await flashBriefingMessage();
    res.send(result);
  } catch {
    //this will eventually be handled by your error handling middleware
    res.send("ERROR");
  }
})


app.listen(PORT, function () {
  console.log(`Listening on Port ${PORT}`);
});
