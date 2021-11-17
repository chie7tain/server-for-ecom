"use strict";
// export {};
const path = require("path");
// import uuid package
const { v4: uuidv4 } = require("uuid");
const fs = require("fs");
// clear error
const { writeDataToFile } = require("../utils");
let products = fs.readFileSync(path.join(__dirname, "../../products.json"), "utf-8");
products = JSON.parse(products);
const pathToData = path.join(__dirname, "../../products.json");
function findAll() {
    return new Promise((resolve, reject) => {
        resolve(products);
    });
}
function findById(id) {
    return new Promise((resolve, reject) => {
        const product = products.find((product) => product.id === id);
        resolve(product);
    });
}
function create(product) {
    return new Promise((resolve, reject) => {
        const newProduct = { id: uuidv4(), ...product };
        products.push(newProduct);
        writeDataToFile(pathToData, products);
        resolve(newProduct);
    });
}
function update(id, product) {
    return new Promise((resolve, reject) => {
        const index = products.findIndex((product) => product.id === id);
        products[index] = { id, ...product };
        writeDataToFile(pathToData, products);
        resolve(products[index]);
    });
}
function remove(id) {
    return new Promise((resolve, reject) => {
        products = products.filter((product) => product.id !== id);
        writeDataToFile(pathToData, products);
        resolve();
    });
}
module.exports = {
    findAll,
    findById,
    create,
    update,
    remove,
};
