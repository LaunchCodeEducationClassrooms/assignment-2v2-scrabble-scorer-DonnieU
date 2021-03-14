// inspired by https://exercism.io/tracks/javascript/exercises/etl/solutions/91f99a3cca9548cebe5975d7ebca6a85

const input = require("readline-sync");

const oldPointStructure = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};

function oldScrabbleScorer(word) {
	word = word.toUpperCase();
	let letterPoints = "";
 
	for (let i = 0; i < word.length; i++) {
 
	  for (const pointValue in oldPointStructure) {
 
		 if (oldPointStructure[pointValue].includes(word[i])) {
			letterPoints += `Points for '${word[i]}': ${pointValue}\n`
		 }
 
	  }
	}
	return letterPoints;
 }

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //
function initialPrompt() {
   let word = input.question("Let's play some scrabble! Enter a word: ");
   //console.log(oldScrabbleScorer( word ));
   return word;
}

let simpleScore = function( word ){
  return word.length*1;
}

let vowelBonusScore = function( word ){
  const struct = {
    a:3, b:1, c:1, d:1, e:3, f:1, g:1, h:1, i:3, j:1, k:1, l:1, m:1, n:1,
    o:3, p:1, q:1, r:1, s:1, t:1, u:3, v:1, w:1, x:1, y:3, z:1
  };

  let letterPoints = 0;
  let lowerWord = word.toLowerCase()
  for( i = 0; i < lowerWord.length; i++ ){
    letterPoints += struct[lowerWord[i]]
  }
  return letterPoints;
}

let scrabbleScore = function( word ){
  // let newObj = transform(oldPointStructure);
  let lowerWord = word.toLowerCase()
  let sum = 0;
  for( i = 0; i < lowerWord.length; i++ ){
    sum += newPointStructure[lowerWord[i]]
  }
  return sum;  
}

/*
let simpleScoreObject = {
  'name': "Simple Score",
  'description': "Each letter is worth 1 point.",
  'scorerFunction':function(word){ return simpleScore(word) }
};

let vowelBonusScoreObject = {
  'name': "Bonus Vowels",
  'description': "Vowels are 3 pts, consonants are 1 pt.",
  'scorerFunction': function(word){ return vowelBonusScore(word) }
};

// let oldScrabbleScorerObject = {
let newScrabbleScorerObject = {
  'name': "Scrabble",
  'description': "The traditional scoring algorithm",
  'scorerFunction': function(word){ return scrabbleScore(word) }
};
*/
/*
const scoringAlgorithms = [
  simpleScoreObject,
  vowelBonusScoreObject,
  oldScrabbleScorerObject
];
*/

/*
const scoringAlgorithms = [
  simpleScoreObject,
  vowelBonusScoreObject,
  newScrabbleScorerObject
];
*/

const scoringAlgorithms = [ 
  new Object({ 
    name: 'Simple Score', 
    description: 'Each letter is worth 1 point.', 
    scorerFunction: function(word){ return simpleScore(word) } }),
  
  new Object({ 
    name: 'Bonus Vowels', 
    description: 'Vowels are 3 pts, consonants are 1 pt.', 
    scorerFunction: function(word){ return vowelBonusScore(word)} }),
  
  new Object({ 
    name: 'Scrabble', 
    description: 'The traditional scoring algorithm', 
    scorerFunction: function(word){ return scrabbleScore(word)} })
];

function scorerPrompt( word ) {
  console.log("Which scoring algorithm would you like to use?")
  console.log()
  console.log(`0 - ${scoringAlgorithms[0].name}: ${scoringAlgorithms[0].description}`)
  console.log(`1 - ${scoringAlgorithms[1].name}: ${scoringAlgorithms[1].description}`)
  console.log(`2 - ${scoringAlgorithms[2].name}: ${scoringAlgorithms[2].description}`)
  let algoSelection = input.question("Enter 0, 1, or 2: ")
  console.log(`Score for '${word}': ${scoringAlgorithms[algoSelection].scorerFunction(word)}`)
}

function transform( oldPointStructure ){
  let newObj = {};

  for( key in oldPointStructure ){
    for( i = 0; i < oldPointStructure[key].length; i++ ){
      newObj[oldPointStructure[key][i].toLowerCase()] = parseInt(key);
    }
  } 
  // console.log(newObj);
  return newObj;
}

let newPointStructure = transform(oldPointStructure);
    //a:1, b:3, c:3, d:2, e:1, f:4, g:2, h:4, i:1, j:8, k:5, l:1, m:3, n:1,
    //o:1, p:3, q:10, r:1, s:1, t:1, u:1, v:4, w:4, x:8, y:4, z:10

function runProgram() {
   let word = initialPrompt();
   scorerPrompt( word );
}

// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScore: simpleScore,
   vowelBonusScore: vowelBonusScore,
   scrabbleScore: scrabbleScore,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
	runProgram: runProgram,
	scorerPrompt: scorerPrompt
};

