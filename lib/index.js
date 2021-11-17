"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const { getProducts, getProduct, createProduct, updateProduct, deleteProduct, } = require("./controllers/productController");
/*
implement your server code here
*/
const server = http_1.default.createServer((req, res) => {
    var _a, _b, _c;
    // get products endpoint
    if (req.url === "/api/products" && req.method === "GET") {
        getProducts(req, res);
    }
    // get product endpoint
    else if (((_a = req.url) === null || _a === void 0 ? void 0 : _a.match(/\/api\/products\/\d+/)) && req.method === "GET") {
        const id = req.url.split("/")[3];
        getProduct(req, res, id);
    }
    // create product endpoint
    else if (req.url === "/api/products" && req.method === "POST") {
        createProduct(req, res);
    }
    // ======================================================
    else if (((_b = req.url) === null || _b === void 0 ? void 0 : _b.match(/\/api\/products\/([0-9]+)/)) &&
        req.method === "PUT") {
        const id = req.url.split("/")[3];
        console.log("we are here");
        console.log(id);
        updateProduct(req, res, id);
    }
    else if (((_c = req.url) === null || _c === void 0 ? void 0 : _c.match(/\/api\/products\/\d+/)) &&
        req.method === "DELETE") {
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
});
const PORT = process.env.PORT || 3005;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
// const server :Server = http.createServer((req: IncomingMessage, res: ServerResponse) => {
//     if (req.method === "GET") {
//       res.end(JSON.stringify({ name: "hello" }));
//     }
//   }
// );
// server.listen(3005);
