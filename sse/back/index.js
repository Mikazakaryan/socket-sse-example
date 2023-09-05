const express = require("express");
const app = express();

let counter = 0;

app.get("/counter", (_, response) => {
  const headers = {
    "Content-Type": "text/event-stream",
    Connection: "keep-alive",
    "Cache-Control": "no-cache",
  };
  response.writeHead(200, headers);

  setInterval(() => {
    console.log("sent counter ", counter);

    response.write(JSON.stringify({ counter }));

    ++counter;
  }, 1000);
});

app.listen(3000);
