#!/usr/bin/env node

import { open } from "node:fs/promises";

const GOAL = {
  red: 12,
  green: 13,
  blue: 14,
};

function parseGame(line) {
  let gameInfo = {
    max: {},
    id: 0,
    rounds: [],
  };
  let firstSpace = line.indexOf(" ");
  let colonIndex = line.indexOf(":");
  gameInfo.id = Number(line.substring(firstSpace + 1, colonIndex));
  let allRounds = line.substring(colonIndex + 1);
  // console.log(allRounds)
  let individualRounds = allRounds.split(";");
  // console.log(individualRounds)

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
      //   console.log(result)
      let count = Number(result[0]);
      //   console.log(count)
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
  //   gameInfo.sum = gameInfo.max.red * gameInfo.max.green * gameInfo.max.blue;

  return gameInfo;
}

function isPossible(game) {
  for (let key in GOAL) {
    if (game.max[key] > GOAL[key]) {
      return false;
    }
  }
  return true;
}

async function main() {
  const inputFile = await open(process.argv[2]);

  let games = [];

  for await (const line of inputFile.readLines()) {
    const game = parseGame(line);
    games.push(game);
  }

  //   console.log(games.length);
  let possibleGames = games.filter(isPossible);
//   console.log(possibleGames.length);

  let sum = possibleGames.reduce((sum, game) => sum + game.id, 0);
  console.log(sum);
}

main();
