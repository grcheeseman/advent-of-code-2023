#!/usr/bin/env node

import { open } from "node:fs/promises";

const goal = {
  red: 12,
  green: 13,
  blue: 14,
};

function stringSplit(line) {
  let gameInfo = {
    max: {},
    power: 0,
    rounds: [],
  };
  let colonIndex = line.indexOf(":");
  let allRounds = line.substring(colonIndex + 1);
  //   console.log(allRounds)
  let individualRounds = allRounds.split(";");
  //   console.log(individualRounds)

  for (let i = 0; i < individualRounds.length; i++) {
    let results = individualRounds[i].split(",");
    // console.log(results)
    let outcomes = {
      red: 0,
      green: 0,
      blue: 0,
    };
    for (let g = 0; g < results.length; g++) {
      let result = results[g].trim().split(" ");
      let count = Number(result[0]);
      outcomes[result[1]] = count;
      if (gameInfo.max[result[1]]) {
        if (count > gameInfo.max[result[1]]) {
          gameInfo.max[result[1]] = count;
        }
      } else {
        gameInfo.max[result[1]] = count;
      }
    }
    gameInfo.rounds.push(outcomes);
    // console.log(outcomes)
  }
}

async function main() {
  const inputFile = await open(process.argv[2]);

  for await (const line of inputFile.readLines()) {
    const strings = stringSplit(line);
  }

  // console.log(line);
}

main();
