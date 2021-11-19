"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Product = require("../models/productModel");
const { getPostData } = require("../utils");
// @desc    Get all products
// @route   GET /api/v1/products
async function getProducts(req, res) {
  try {
    const products = await Product.findAll();
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.write(JSON.stringify(products));
    res.end();
  } catch (error) {
    console.log(error);
  }
}
// @desc    Get single product
// @route   GET /api/v1/products/:id
async function getProduct(req, res, id) {
  try {
    const product = await Product.findById(id);
    if (!product) {
      res.statusCode = 404;
      res.setHeader("Content-Type", "text/html");
      res.write("<h1>Product not found</h1>");
      res.end();
    } else {
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.write(JSON.stringify(product));
      res.end();
    }
  } catch (error) {
    console.log(error);
  }
}
// {
//     "id": "1",
//     "productName": "T Shirt",
//     "productDescription": "Men's Vintage Shirt Casual Short Sleeve T-Shirt",
//     "productVarieties": [
//       {
//         "size": "large",
//         "color": "orange",
//         "quantity": "15",
//         "images": [
//           "https://ng.jumia.is/unsafe/fit-in/500x500/filters:fill(white)/product/83/453283/1.jpg?6332",
//           "https://ng.jumia.is/unsafe/fit-in/500x500/filters:fill(white)/product/83/453283/2.jpg?6332"
//         ],
//         "price": "23000"
//       },
//       {
//         "size": "medium",
//         "color": "large",
//         "quantity": "35",
//         "images": [
//           "https://ng.jumia.is/unsafe/fit-in/500x500/filters:fill(white)/product/86/690064/1.jpg?7852",
//           "https://ng.jumia.is/unsafe/fit-in/500x500/filters:fill(white)/product/86/690064/3.jpg?3113"
//         ],
//         "price": "35000"
//       }
//     ],
//     "dateUploaded": "1636633307531",
//     "dateEdited": "1636633307531"
//   },

// @desc    Create product
// @route   POST /api/v1/products
async function createProduct(req, res) {
  try {
    const body = await getPostData(req);
    console.log("ser", body);
    const { productName, productDescription } = JSON.parse(body);
    console.log(productName, productDescription);
    const newProduct = await Product.create({
      title,
      description,
      price,
    });
    res.statusCode = 201;
    res.setHeader("Content-Type", "application/json");
    res.write(JSON.stringify(newProduct));
    res.end();
  } catch (error) {
    console.log(error);
  }
}
// @desc    Update product
// @route   PUT /api/v1/products/:id
async function updateProduct(req, res, id) {
  try {
    const product = await Product.findById(id);
    if (!product) {
      res.statusCode = 404;
      res.setHeader("Content-Type", "text/html");
      res.write("<h1>Product not found</h1>");
      res.end();
    } else {
      const body = await getPostData(req);
      const { title, description, price } = JSON.parse(body);
      const updatedProduct = await Product.update(id, {
        title: title || product.title,
        description: description || product.description,
        price: price || product.price,
      });
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.write(JSON.stringify(updatedProduct));
      res.end();
    }
  } catch (error) {
    console.log(error);
  }
}
// @desc    Delete product
//  @route  DELETE /api/v1/products/:id
async function deleteProduct(req, res, id) {
  try {
    const product = await Product.findById(id);
    if (!product) {
      res.statusCode = 404;
      res.setHeader("Content-Type", "text/html");
      res.write("<h1>Product not found</h1>");
      res.end();
    } else {
      await Product.remove(id);
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.write(
        JSON.stringify({ message: `Product ${id} deleted successfully` })
      );
      res.end();
    }
  } catch (error) {}
}
module.exports = {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};
