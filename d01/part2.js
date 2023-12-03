#!/usr/bin/env node

import { open } from "node:fs/promises";

function extractTextNumbers(line) {
  const textToDigits = {
    one: "o1e",
    two: "t2o",
    three: "t3e",
    four: "f4r",
    five: "f5e",
    six: "s6x",
    seven: "s7n",
    eight: "e8t",
    nine: "n9e",
  };

  Object.keys(textToDigits).forEach((key) => {
    line = line.replaceAll(key, textToDigits[key]);
  });
  return line.split("\n");
}

function sumCalibrationValue(){
    const lines = extractTextNumbers(data)
    console.log(lines)
}

async function main() {
  const inputFile = await open(process.argv[2]);
  for await (const line of inputFile.readLines()) {
    // console.log(line);
  }
}

main();
