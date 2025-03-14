const inquirer = require('inquirer');
const { endRound } = require('./round');
const { takeTurn } = require('./turn')

const genList = (round) => {
  let card = round.currentCard;
  let choices = card.answers.map((answer, index) => {
    return {
      key: index,
      value: answer
    }
  });
  return {
    type: 'rawlist',
    message: card.question,
    name: 'answers',
    choices: choices
  };
}

const getRound = (round) => {
  return Promise.resolve(round);
}

const confirmUpdate = (id, round) => {
  const feedback = takeTurn(id, round);
  return {
    name: 'feedback',
    message: `Your answer of ${id} is ${feedback}`
  }
}

async function main(round) {
  const currentRound = await getRound(round);
  const getAnswer = await inquirer.prompt(genList(currentRound));
  const getConfirm = await inquirer.prompt(confirmUpdate(getAnswer.answers, round));
    if(!round.currentCard) {
      console.timeEnd('timer');
      console.log(endRound(round)) ;
    } else {
      main(round);
    }
}

module.exports.main = main;