const https = require("https");
const { createWriteStream } = require("fs");

const options = {
  hostname: "pokeapi.co",
  port: 443,
  path: "/api/v2/pokemon?limit=20",
  method: "GET",
};

https
  .request(options, (res) => {
    res
      .pipe(createWriteStream("pokemon.json"))
      .on("finish", () => {
        console.log("File saved successfully!");
        const results = require("./pokemon.json").results;
        console.log("Results:", results);
      })
      .on("error", (err) => {
        console.error("Error while writing to file:", err);
      });
  })
  .end();
