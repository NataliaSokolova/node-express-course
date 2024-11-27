//console.log("Express Tutorial");
const express = require("express");
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const { products, people } = require("./data");
const peopleRouter = require("./routes/people");
app.use(express.static("./methods-public "));

app.use("/api/v1/people", peopleRouter);

const logger = (req, res, next) => {
  const currentTime = new Date().toISOString();
  console.log(`Here is log: [${currentTime}] ${req.method} ${req.url}`);
  next();
};

app.use(logger);

app.get("/about", logger, (req, res) => {
  res.send("About Page");
});

app.get("/api/v1/test", (req, res) => {
  res.json({ message: "It worked!" });
});

app.get("/api/v1/people", (req, res) => {
  res.json(people);
});

app.get("/api/v1/products", (req, res) => {
  res.json(products);
});

app.get("/api/v1/products/:productID", (req, res) => {
  const idToFind = parseInt(req.params.productID);

  const product = products.find((p) => p.id === idToFind);

  if (!product) {
    res.status(404).json({ message: "That product was not found." });
  } else {
    res.json(product);
  }
});

app.get("/api/v1/query", (req, res) => {
  const { search, limit, maxPrice } = req.query;
  let filteredProducts = [...products];

  if (search) {
    filteredProducts = filteredProducts.filter((product) => {
      return product.name.toLowerCase().includes(search.toLowerCase());
    });
  }

  if (maxPrice) {
    const price = parseFloat(maxPrice);
    if (price) {
      filteredProducts = filteredProducts.filter((product) => {
        return product.price < price;
      });
    } else {
      return res.status(400).json({ error: "Invalid maxPrice value" });
    }
  }

  if (limit) {
    const limitValue = parseInt(limit, 10);
    if (!isNaN(limitValue)) {
      filteredProducts = filteredProducts.slice(0, limitValue);
    } else {
      filteredProducts = filteredProducts.slice(5);
    }
  }

  res.status(200).json(filteredProducts);
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
