const PORT = process.env.PORT || 3000;
const express = require("express");
const app = express();

app.use(express.json());

var date = "2019-06-22T17:34:05.398Z";

const courses = { uid: 1, updateDate: date, titleText:"TITLE", mainText:"MAIN", redirectionUrl:"RURL" };


app.get("/", function(req, res) {
	//when we get an http get request to the root/homepage
	res.send(courses);
});

app.listen(PORT, function() {
	console.log(`Listening on Port ${PORT}`);
});
