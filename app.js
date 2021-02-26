const express = require("express");
const app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

function getDateObj(date = new Date()) {
  const utc = date.toUTCString();
  const unix = date.valueOf();
  return { unix, utc };
}

app.get("/api/timestamp/:data?", (req, res) => {
  const data = req.params.data;
  const invalid = { error: "Invalid Date" };
  let date;

  if (!data) {
    res.json(getDateObj());
  } else {
    // check if data is in unix form
    if (data.match(/^[0-9]+$/g)) {
      date = new Date(parseInt(data, 10));
      res.json(getDateObj(date));
      // can be in a date form or not valid
    } else {
      date = new Date(data);
      if (date != "Invalid Date") {
        date.setUTCDate(date.getDate());
        date.setUTCHours(0);
        date.setUTCMinutes(0);
        date.setUTCSeconds(0);
        res.json(getDateObj(date));
      } else res.json(invalid);
    }
  }
});

module.exports = app;
