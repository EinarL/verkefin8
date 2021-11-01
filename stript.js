/**
 * Skæri, blað, steinn.
 * Spilað gegnum console.
 */

/** Hámarks fjöldi best-of leikja, ætti að vera jákvæð heiltala stærri en 0 */
const MAX_BEST_OF = 10;

/** Global breyta sem heldur utan um heildar sigra */
let wins = 0;

/** Global breyta sem heldur utan um heildar töp */
let losses = 0;

/**
 * Athugar hvort gefin tala sé gild sem best-of gildi.
 * @param {number} bestOf Tala sem skal athuga
 * @return {boolean} true eða false
 */
function isValidBestOf(bestOf) {
  if (isNaN(bestOf)) {
    return false;
  }

  // Ekki á bili
  if (0 >= bestOf || bestOf >= MAX_BEST_OF) {
    return false;
  }

  // Ekki oddatala
  if (bestOf % 2 !== 1) {
    return false;
  }

  return true;
}
console.assert(isValidBestOf(1) === true, '1 er valid best of');
console.assert(isValidBestOf(2) === false, '2 er ekki er valid best of');
console.assert(isValidBestOf(9) === true, '9 er valid best of');

function playAsText(play) {
  switch (play) {
    case '1':
      return 'Skæri';
    case '2':
      return 'Blað';
    case '3':
      return 'Steinn';
    default:
      return 'Óþekkt';
  }
}
console.assert(playAsText('1') === 'Skæri', '1 táknar skæri')
console.assert(playAsText('2') === 'Blað', '2 táknar blað')
console.assert(playAsText('3') === 'Steinn', '3 táknar steinn')
console.assert(playAsText('foo') === 'Óþekkt', 'Annað er óþekkt')

/**
 * Athugar hvort spilari eða tölva vinnur.
 * @param {number} player Það sem spilari spilaði
 * @param {number} computer Það sem tölva spilaði
 * @returns -1 ef tölva vann, 0 ef jafntefli, 1 ef spilari vann
 */
function checkGame(player, computer) {
  // Skæri vinnur blað
  if (player === '1' && computer === '2') {
    return 1;
  }

  // Blað vinnur stein
  if (player === '2' && computer === '3') {
    return 1;
  }

  // Steinn vinnur skæri
  if (player === '3' && computer === '1') {
    return 1;
  }

  // Jafntefli!
  if (player === computer) {
    return 0;
  }

  // Annars vinnur tölva!
  return -1;
}
console.assert(checkGame('1', '2') === 1, 'Skæri vinnur blað');
console.assert(checkGame('2', '3') === 1, 'Blað vinnur stein');
console.assert(checkGame('3', '1') === 1, 'Steinn vinnur skæri');
console.assert(checkGame('1', '1') === 0, 'Skæri og skæri eru jafntefli');
console.assert(checkGame('1', '3') === -1, 'Skæri tapar fyrir stein');

/**
 * Spilar einn leik.
 * @returns -1 ef tölva vann, 0 ef jafntefli, 1 ef spilari vann
 */
function round() {
  const player = prompt('Hvað setur þú út? Skæri (1), blað (2), eða steinn (3)?');

  if (player === null) {
    return null;
  }

  if (playAsText(player) === 'Óþekkt') {
    alert(`${player} er ógilt gildi! Tölva sigrar.`);
  }

  const computer = (Math.floor(Math.random() * 3) + 1).toString();

  const result = checkGame(player, computer);

  alert(`Þú spilaðir: ${playAsText(player)}.
Tölva spilaði: ${playAsText(computer)}.
${result === 1 ? 'Þú sigrar.' : (result === -1 ? 'Tölva sigrar.' : 'Jafntefli.')}`);

  return result;
}
// Hér getum við ekki skrifað test þar sem fallið mun biðja notanda um inntak!

/**
 * Spilar leik og bætir útkomu (sigur eða tap) við í viðeigandi global breytu.
 */
function play() {
  const bestOf = prompt(`Besta af hve mörgum leikjum? Verður að vera jákvæð oddatala minni en ${MAX_BEST_OF}.`)
  const bestOfNumber = Number.parseInt(bestOf, 10);

  if (bestOfNumber === null) {
    return;
  }

  if (!isValidBestOf(bestOf)) {
    console.error(`${bestOf} er ekki löglegt gildi.`);
    return;
  }

  let playerWins = 0;
  let computerWins = 0;

  let done = false;
  do {
    const result = round();

    if (result === null) {
      return;
    }

    if (result === 1) {
      playerWins += 1;
    } else if (result === -1) {
      computerWins += 1;
    }

    done = (playerWins / bestOf > 0.5) || (computerWins / bestOf > 0.5);
  } while (!done);

  if (playerWins > computerWins) {
    alert('Þú vinnur!');
    wins += 1;
  } else {
    alert('Tölva vinnur.');
    losses += 1;
  }
}
// Hér getum við ekki skrifað test þar sem fallið mun biðja notanda um inntak!

/**
 * Birtir stöðu spilara.
 */
function games() {
  const total = wins + losses;
  console.log(`Þú hefur spilað ${total} leiki.`);

  if (total > 0) {
    console.log(`Þú hefur unnið ${wins}, eða ${(wins/total * 100).toFixed(2)}% af heild.
Þú hefur tapað ${losses}, eða ${(losses/total * 100).toFixed(2)}% af heild.`)
  }
}
// Hér getum við ekki skrifað test þar sem fallið les úr global state