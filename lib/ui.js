import { roundsAmount } from '../main.js';
import { playAsText } from './rock-paper-scissors.js';

/**
 * Býr til takka fyrir umferðir, festir `onClick` við og bætir
 * við `.rounds__buttons`.
 *
 * @param {number} max Hámark umferða
 * @param {function} onClick Fall sem keyra skal þegar ýtt er á takka
 */
  export function createButtons(max, onClick) {
    let element;
    let parent;
    let nr;
    let nrOfRounds;
    for(let i = 1; i < max; i += 2){
      element = document.createElement("button");
      element.classList = "num-of-rounds button";
      nr = document.createTextNode(i);
      element.appendChild(nr);
      parent = document.getElementsByClassName("rounds__buttons")[0];
      parent.appendChild(element);
      nrOfRounds = element.addEventListener('click', () => {
        show(onClick);
        roundsAmount(i);
      });
    }
  }

  export function show(part) {
    // Element fyrir „parta“ leiks sem við viljum fela og sýna
    const start = document.querySelector('.start');
    const rounds = document.querySelector('.rounds');
    const play = document.querySelector('.play');
    const result = document.querySelector('.result');

    // Felum allt
    start.classList.add('hidden');
    rounds.classList.add('hidden');
    play.classList.add('hidden');
    result.classList.add('hidden');

    // og sýnum það sem beðið er um
    switch (part) {
      case 'start':
        start.classList.remove('hidden');
        break;
      case 'rounds':
        rounds.classList.remove('hidden');
        break;
      case 'play':
        play.classList.remove('hidden');
        break;
      case 'result':
        result.classList.remove('hidden');
        break;
      default:
        console.warn(`${part} óþekkt`);
    }

    // Halló debugger! Við getum sett þetta lykilorð til að láta debugger stoppa
    // þar sem við viljum í flæði forritanna okkar
    // debugger;
  }

  /**
   * Uppfærir öll gildi stöðu skjás innan `.result` áður en sýndur.
   * @param {Results} r Gildi fyrir skjá
   */
  export function updateResultScreen(player, computer, result, currentRound, totalRounds, playerWins, computerWins) {

    const resultPlayer = document.querySelector('.result__player');
    resultPlayer.textContent = playAsText(player);

    const resultComp = document.querySelector('.result__computer');
    resultComp.textContent = playAsText(computer);

    const resultResult = document.querySelector('.result__result');
    resultResult.textContent = result;

    const resultCurrRound = document.querySelector('.result__currentRound');
    resultCurrRound.textContent = currentRound;

    const resultTotalRounds = document.querySelector('.result__totalRounds');
    resultTotalRounds.textContent = totalRounds;

    const resultStatus = document.querySelector('.result__status');
    resultStatus.textContent = "Staðan er " + playerWins + " - " + computerWins;

  }
