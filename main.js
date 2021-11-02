import { show } from './lib/ui.js';
import { createButtons } from './lib/ui.js';
import { updateResultScreen } from './lib/ui.js';
import { checkGame } from './lib/rock-paper-scissors.js';
import { computerPlay } from './lib/rock-paper-scissors.js';

/** Hámarks fjöldi best-of leikja, ætti að vera jákvæð heiltala stærri en 0 */
const MAX_BEST_OF = 10;

/** Fjöldi leikja sem á að spila í núverandi umferð */
let totalRounds;

/** Númer umferðar í núverandi umferð */
let currentRound = 0;

/** Sigrar spilara í núverandi umferð */
let playerWins = 0;

/** Töp spilara í núverandi umferð */
let computerWins = 0;

let wasTied = false;

/**
 * Utanumhald um alla spilaða leiki, hver leikur er geymdur á forminu:
 *
 * ```
 * {
 *   player: 2,
 *   computer: 1,
 *   win: true,
 * }
 * ```
 */
const games = [];

/**
 * Uppfærir stöðu eftir að spilari hefur spilað.
 * Athugar hvort leik sé lokið, uppfærir stöðu skjá með `updateResultScreen`.
 * Birtir annað hvort `Næsti leikur` takka ef leik er lokið eða `Næsta umferð`
 * ef spila þarf fleiri leiki.
 *
 * @param {number} player Það sem spilari spilaði
 */
function playRound(playerChose) {
  let compChose = computerPlay();
  let result = checkGame(playerChose, compChose);

  switch(result){
    case 1:
      result = 'Þú sigrar';
      if(!wasTied){
        currentRound++;
      }
      wasTied = false;
      playerWins++;
      break;
    case 0:
      result = 'Jafntefli';
      if(!wasTied){
        currentRound++;
        wasTied = true;
      }
      break;
    case -1:
      result = 'Tölvan sigrar';
      if(!wasTied){
        currentRound++;
      }
      wasTied = false;
      computerWins++;
  }
  const finishGame = document.querySelector('button.finishGame');
  const nextRound = document.querySelector('button.nextRound');
  finishGame.classList.add('hidden');
  nextRound.classList.add('hidden');
  if( playerWins >= Math.ceil(totalRounds/2) || computerWins >= Math.ceil(totalRounds/2)){ // sýnir takkana
    finishGame.classList.remove('hidden');
  }else{
    nextRound.classList.remove('hidden');
  }
  updateResultScreen(
    playerChose,
    compChose,
    result,
    currentRound,
    totalRounds,
    playerWins,
    computerWins
  );
}

export function roundsAmount(amount){
  totalRounds = amount;
}

// Takki sem byrjar leik
document
  .querySelector('.start button')
  .addEventListener('click', () => show('rounds'));

// Búum til takka
totalRounds = createButtons(MAX_BEST_OF, 'play');

// takki sem spilar næsta round
document
  .querySelector('button.nextRound')
  .addEventListener('click', () => show('play'));

// takki sem fer í næsta leik
document
.querySelector('button.finishGame')
.addEventListener('click', () => {
  finishGame();
  show('rounds');
});

// Event listeners fyrir skæri, blað, steinn takka
document.querySelector('button.scissor').addEventListener('click', () => {
  show('result');
  playRound('1');
});
document.querySelector('button.paper').addEventListener('click', () => {
  show('result');
  playRound('2');
});
document.querySelector('button.rock').addEventListener('click', () => {
  show('result');
  playRound('3');
});

/**
 * Uppfærir stöðu yfir alla spilaða leiki þegar leik lýkur.
 * Gerir tilbúið þannig að hægt sé að spila annan leik í framhaldinu.
 */
function finishGame() {
  let win = false;
  let winText;
  let text;
  let liTag;
  let parent;
  let tagW = document.querySelector('.games__wins');
  let playerW = tagW.textContent;
  let tagL = document.querySelector('.games__losses');
  let playerL = tagL.textContent;
  if(playerWins > computerWins){ // player vinnur
    playerW++;
    tagW.textContent = playerW;
    win = true;
  }else{ // tölva vinnur
    playerL++;
    tagL.textContent = playerL;
  }

  document.querySelector('.games__played').textContent = +playerW + +playerL;

  let percentWin = playerW/(+playerW + +playerL);
  let percentLoss = playerL/(+playerW + +playerL);

  document.querySelector('.games__winratio').textContent = (percentWin*100).toFixed(2);
  document.querySelector('.games__lossratio').textContent = (percentLoss*100).toFixed(2);

  // Bætum við nýjasta leik
  games.push({
    playerWins,
    computerWins,
    win
  });

  if(win){
    winText = "Þú vannst";
  }else{
    winText = "Tölva vann";
  }

  text = document.createTextNode(winText + " " + playerWins + " - " + computerWins);
  liTag = document.createElement("li");
  liTag.appendChild(text);
  parent = document.getElementsByClassName("games__list")[0];
  parent.appendChild(liTag);

  // Núllstillum breytur
  currentRound = 0;
  playerWins = 0;
  computerWins = 0;
}
