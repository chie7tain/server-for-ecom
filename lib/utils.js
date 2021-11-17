"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
// const fs = require("fs");
const path = require("path");
function writeDataToFile(filepath, content) {
    try {
        console.log(content);
        fs_1.writeFileSync(filepath, JSON.stringify(content));
        // appendFileSync(filepath, JSON.stringify(content));
    }
    catch (error) {
        console.log(error);
    }
}
function getPostData(req) {
    return new Promise((resolve, reject) => {
        try {
            let body = "";
            req.on("data", (chunk) => {
                body += chunk.toString();
            });
            req.on("end", () => {
                resolve(body);
            });
        }
        catch (error) {
            reject(error);
        }
    });
}
module.exports = {
    writeDataToFile,
    getPostData,
};
