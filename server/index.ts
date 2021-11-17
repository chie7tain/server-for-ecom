import http, { IncomingMessage, Server, ServerResponse } from "http";
const {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("./controllers/productController");
/*
implement your server code here
*/

const server: Server = http.createServer(
  (req: IncomingMessage, res: ServerResponse) => {
    // get products endpoint
    if (req.url === "/api/products" && req.method === "GET") {
      getProducts(req, res);
    }
    // get product endpoint
    else if (req.url?.match(/\/api\/products\/\d+/) && req.method === "GET") {
      const id = req.url.split("/")[3];
      getProduct(req, res, id);
    }

    // create product endpoint
    else if (req.url === "/api/products" && req.method === "POST") {
      createProduct(req, res);
    }
    // ======================================================
    else if (
      req.url?.match(/\/api\/products\/([0-9]+)/) &&
      req.method === "PUT"
    ) {
      const id = req.url.split("/")[3];
      console.log("we are here");
      console.log(id);
      updateProduct(req, res, id);
    } else if (
      req.url?.match(/\/api\/products\/\d+/) &&
      req.method === "DELETE"
    ) {
      const id = req.url.split("/")[3];
      deleteProduct(req, res, id);
    }
    // no page found endpoint
    else {
      res.statusCode = 404;
      res.setHeader("Content-Type", "text/html");
      res.write("<h1>Page not found</h1>");
      res.end();
    }
  }
);

const PATH = process.env.PORT || 3000;

server.listen(PATH, () => console.log(`Server running on port ${PATH}`));
