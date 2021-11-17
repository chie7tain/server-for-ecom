export {};
import { writeFile, writeFileSync, appendFileSync } from "fs";
// const fs = require("fs");
// fs.
import { IncomingMessage } from "http";
import { Buffer } from "buffer";
// const fs = require("fs");
const path = require("path");

function writeDataToFile(filepath: string, content: string) {
  try {
    console.log(content);
    writeFileSync(filepath, JSON.stringify(content));
    // appendFileSync(filepath, JSON.stringify(content));
  } catch (error) {
    console.log(error);
  }
}
function getPostData(req: IncomingMessage) {
  return new Promise((resolve, reject) => {
    try {
      let body = "";
      req.on("data", (chunk) => {
        body += chunk.toString();
      });
      req.on("end", () => {
        resolve(body);
      });
    } catch (error) {
      reject(error);
    }
  });
}
module.exports = {
  writeDataToFile,
  getPostData,
};
