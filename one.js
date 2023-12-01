#!/usr/bin/env node

import { open } from "node:fs/promises";

// turn a single line into a calibration value
function processLine(line) {
  let numbersOnly = /\d/g;
  let matches = line.match(numbersOnly);
  // console.log(matches);
  let first = matches.slice(0, 1);
  //   console.log(first);
  let last = matches.slice(matches.length - 1);
  //   console.log(last);
  let firstAndLast = first + last;
  //   console.log(firstAndLast);

  return parseInt(firstAndLast);
}

async function main() {
  const inputFile = await open(process.argv[2]);

  let sum = 0;
  for await (const line of inputFile.readLines()) {
    sum += processLine(line);
  }
  console.log(sum);
}

main();
