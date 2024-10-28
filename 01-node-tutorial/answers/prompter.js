const http = require("http");
var StringDecoder = require("string_decoder").StringDecoder;

const getBody = (req, callback) => {
  const decode = new StringDecoder("utf-8");
  let body = "";
  req.on("data", function (data) {
    body += decode.write(data);
  });
  req.on("end", function () {
    body += decode.end();
    const body1 = decodeURI(body);
    const bodyArray = body1.split("&");
    const resultHash = {};
    bodyArray.forEach((part) => {
      const partArray = part.split("=");
      resultHash[partArray[0]] = partArray[1];
      console.log("The body of the post is ", body);

    });
    callback(resultHash);
  });
};




let randomNumber = Math.floor(Math.random() * 100) + 1;
let feedback = "Guess a number between 1 and 100.";

const form = () => {
  return `
  <body>
  <p>${feedback}</p>
  <form method="POST">
  <input name="item" type="number" min="1" max="100"></input>
  <button type="submit">Submit</button>
  </form>
  </body>
  `;
};
      

const server = http.createServer((req, res) => {
  if (req.method === "POST") {
    getBody(req, (body) => {
      if (body["item"]) {
        const guess = parseInt(body["item"], 10);
        if (guess > randomNumber) {
          feedback = "Your guess is too high!";
        } else if (guess < randomNumber) {
          feedback = "Your guess is too low!";
        } else {
          feedback = `Correct! The number was ${randomNumber}. Generating a new number...`;
          randomNumber = Math.floor(Math.random() * 100) + 1; // Reset
        }
      }


      res.writeHead(303, {
        Location: "/",
      });
      res.end();
    });
  } else {
    res.end(form());
  }
});

server.listen(3000);
console.log("The server is listening on port 3000.");
