#!/usr/bin/env node

import { open } from "node:fs/promises";




async function main() {
    const inputFile = await open(process.argv[2]);
  
    for await (const line of inputFile.readLines()) {
    }
    // console.log(line);
  }

main();