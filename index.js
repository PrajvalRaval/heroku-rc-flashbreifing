const PORT = process.env.PORT || 3000;
const express = require("express");
const axios = require('axios');
const app = express();

var client = require('redis').createClient(process.env.REDIS_URL);

client.on('error', (err) => {
  console.log("Error " + err);
});

app.use(express.json());


app.get('/', (req, res) => {

  return client.get(`redisdb:message`, (err, result) => {

    if (result) {
      const resultJSON = JSON.parse(result);
      return res.status(200).json(resultJSON);
    } else {
      return axios.get(`https://bots.rocket.chat/api/v1/channels.anonymousread?roomName=flashbriefingchannel`)
        .then(response => {

          const responseJSON = JSON.stringify({
            uid: response.data.messages[0]._id,
            updateDate: response.data.messages[0].ts,
            titleText: "RC FLASH BRIEFING",
            mainText: response.data.messages[0].msg,
            redirectionUrl: "https://bots.rocket.chat/channel/flashbriefingchannel"
          });

          client.setex(`redisdb:message`, 120, responseJSON);

          return res.status(200).json(responseJSON);
        })
        .catch(err => {
          return res.json(err);
        });
    }
  });
});




app.listen(PORT, function () {
  console.log(`Listening on Port ${PORT}`);
});
