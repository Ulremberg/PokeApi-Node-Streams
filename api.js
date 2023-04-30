const http = require("http");
const https = require("https");
const JSONStream = require("JSONStream");

const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "application/json" });
  const pokemonList = [];
  const options = {
    hostname: "pokeapi.co",
    port: 443,
    path: "/api/v2/pokemon?limit=2000",
    method: "GET",
  };
  const pokeapiRequest = https.request(options, (pokeapiResponse) => {
    pokeapiResponse
      .pipe(JSONStream.parse("results.*"))
      .on("data", (pokemon) => {
        pokemonList.push(pokemon);
      })
      .on("end", () => {
        console.log(JSON.stringify(pokemonList));
        res.write(JSON.stringify(pokemonList));
        res.end();
      });
  });
  pokeapiRequest.on("error", (err) => {
    console.error(err);
    res.statusCode = 500;
    res.end();
  });
  pokeapiRequest.end();
});

server.listen(3000, () => {
  console.log("Server running at http://localhost:3000/");
});
