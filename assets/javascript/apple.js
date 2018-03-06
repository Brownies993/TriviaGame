$(document).ready(function() {

    // Collect Questions and Answers
  
      // Show only New Game info on page load
    $('.game').hide();
    $('.results').hide();
    // Create HTML for game
  
    // Set Variables
    
    var correct;
    var wrong;
    var answer;
    var counter;
    var count;
    var timeout;
    var i = 0;
  
    var activeQuestion = {
      question: "",
      answer: '',
      choices: [],
    }
  
    // Questions 
      // Possible Answers
      // Correct Answer
  
    // This will be filled in during New Game function and emptied out throughout the game
    var questions = {};
    function setQuestions() {
        questions = {
          q1: {
              question:"What year was El Salvador Founded?",
              answer:"1821",
              choices:['1795', '1803', '1776', '1821'],
          },
            
          q2: {
           question: "When(date) was El Salvador Founded?",
           answer:"September 15",
           choices:['July 5', 'September 15', 'October 31', 'July 22'],
          },
          q3: {
             question: "What is the capital of El Salvador?",
            answer: "San Salvador",
            choices:['San Jose', 'Ilobasco', 'San Salvador', 'San Miguel'],
          },
          q3:{
              question:"What's the population of El Salvador?",
              answer:"6 million",
              choices:['2.5 milliom', '4 million', '6 million', '1 billion'],
          },
          q4:{
              question:"What country is pupusas from?",
              answer:"El Salvador",
              choices:['Mexico', 'Guatemala', 'Hunduras', 'El Salvador'],
          },
          q5:{
              question:"Is Orchata a drink from El Salvador?",
              answer:"Yes",
              choices:['Yes', 'No'],
          },
          q6:{
              question:"Does Orchata on tree?",
              answer:"Yes",
              choices:['Yes', 'No'],
          },
          q7:{
              question:"What language does the people of El Salvador speaks?",
              answer:"Spanish",
              choices:['Italian', 'French', 'latin', 'Spainsh'],
          },
          q8:{
              question:"Is El Salvador a big country or small country?",
              answer:"Big Country",
              choices:['Big Country', 'Small Country'],
          },
          q9:{
              question:"Where is El Salvador located?",
              answer: "Central America",
              choices:['Europe', 'Africa', 'Central America', 'South America'],
          },
        };
    }
     // Timer Settings
  var questionTimer = {
    //Time Per Question
    time: 15,
    reset: function(t) {
      questionTimer.time = t;
      $('.timeLeft').html('Time Left: ' + questionTimer.time);
    },
    gameTimeout: function(){
      timeout = setTimeout(questionTimer.timeUp, 1000*16);
    },
    count: function() {
      $('.timeLeft').html('Time Left: ' +questionTimer.time);
      questionTimer.time--;
    },
    countDown: function(){
      counter = setInterval(questionTimer.count,1000);
    },
    stopTimer: function(){
      clearInterval(counter);
    },
    timeUp: function(){
      wrong++;
      questionTimer.reset(5)
      $('.answers').html('<h2>Incorrect! The answer is ' + activeQuestion.answer + ' </h2>');
      setTimeout(game, 5000);
    },
  };

  // Run this to make sure there are still questions left
  function gameOver() {
    if (Object.keys(questions).length === 0) {
      questionTimer.stopTimer();
      $('.game').hide();
      $('.results').show();
      $('.correct').html('Number Correct: ' + correct);
      $('.wrong').html('Number Incorrect: ' + wrong);
      activeQuestion = false;
    };
  };

  // Check if selected answer is correct or incorrect
  function answerCheck() {
    if (answer == activeQuestion.answer && questionTimer.time > 0) {
      correct++;
      questionTimer.reset(5);
      $('.answers').html('<h2>Correct! The answer is ' + activeQuestion.answer + ' </h2>');
      setTimeout(game, 5000);   
    }
      
    if (answer != activeQuestion.answer){
      questionTimer.timeUp();
    }
  }

   //Randomize order of possible answers
  function randomize() {
    activeQuestion.choices.sort(function() { 
      return 0.5 - Math.random(); 
    });
  };

  // Starts up the game
  function game(){

    // Checks to see if there are no more questions first
    gameOver();

    // If there are still questions left
    if (Object.keys(questions).length > 0) {

      // Get Question
      var keys = Object.keys(questions);
      var objIndex = keys[ keys.length * Math.random() << 0];
      activeQuestion = questions[objIndex];

      // Reorder the choices so it's not obvious
      randomize();

      // Delete question so it can't be pulled again
      delete questions[objIndex];

      // Empty out answer area from previous question
      $('.answers').empty();

      // Stop and Reset timer incase it was running
      questionTimer.stopTimer();
      questionTimer.reset(15);
      questionTimer.gameTimeout()

      // Start Timer
      questionTimer.countDown();

      // Place question information into .game area
      $('.question').html(activeQuestion.question);
      // Reset counter
      i=0;

      //Create buttons for possible answers
      $(activeQuestion.choices).each(function() {
      $('.answers').append('<button class="btn btn-lg option text-center">' + activeQuestion.choices[i] + '</button>');
      i++;
      });
    }; 

    // When you click on a possible answer
    $('.option').on('click', function(){
        answer = $(this).html();
        answerCheck();
        clearTimeout(timeout);
      });
  };

   // New Game Function
    // Resets score to zero
    // Sets new time countdown
  function newGame() {
    $('.results').hide();
    // questions = questionInfo;
    correct = 0;
    wrong = 0;
    $('.game').show();
  }

 
  $('.home').on('click','.start',function(){
    setQuestions();
    newGame();
    
    game();
  });
    

});