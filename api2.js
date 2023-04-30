const https = require("https");

const options = {
  hostname: "pokeapi.co",
  port: 443,
  path: "/api/v2/pokemon?limit=20",
  method: "GET",
};

let data = "";

https
  .request(options, (res) => {
    res
      .on("data", (chunk) => {
        data += chunk;
      })
      .on("end", () => {
        try {
          const results = JSON.parse(data).results;
          console.log("Results:", results);
        } catch (err) {
          console.error("Error while parsing JSON:", err);
        }
      })
      .on("error", (err) => {
        console.error("Error while reading stream:", err);
      });
  })
  .end();
