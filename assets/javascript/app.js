$(document).ready(function(){
    //Trivia questions
    var triviaQuestions = [{
        question: "What animal breeds so quickly that two of them can have created over 1 million relatives in a matter of 18 months?",
        choices: ["Rats","Dogs","Cats","Possums"],
        answer: "Rats",
    },{
        question: "If this animal didn't maintain its teeth, they would eventually grow into its brain.",
        choices: ["Lions", "Tigers", "Rhinoceros", "Beavers"],
        answer: "Beavers",
    }, {
        question: "What animal creates the loudest sound out of any animal?",
        choices: ["Elephants", "Lions", "Blue Whales", "Beluga Whales"],
        answer: "Blue Whale",
    }, {
        question: "What animal produces the largest eggs in the world?",
        choices: ["Ostriches", "Whale Sharks", "Southern Cassowary", "Blue Whales"],
        answer: "Whale Sharks",
    }, {
        question: "Which animal does not have eye balls?",
        choices: ["Owls", "Snakes", "Squid", "Chicken"],
        answer: "Owls",
    }, {
        question: "Which bird has the largest wingspan out of all living birds?",
        choices: ["Bald Eagle", "Condor", "Vultures", "Wandering Albatross"],
        answer: "Wandering Albatross",
    }, {
        question: "How many legs does a lobster typically have?",
        choices: ["8", "10", "12", "14"],
        answer: "10",
    }];

    //Game Objects and game related functions
    var trivia = {
        questions: triviaQuestions,
        currentQuestion: 0,
        timer: 10,
        answeredCorrect: 0,
        answeredIncorrect: 0,
        notAnswered: 0,

        timerDown: function(){
            trivia.timer --;
            $("#timer").html("You have " + trivia.timer +" seconds remaining!");
            if (trivia.timer<=0) {
                trivia.notAnswered();
            }
        },
        
        renderQuestion: function(){
            timer = setInterval(trivia.timer,1000);
            var aq=$("<p>");
            var askQuestion = triviaQuestions[trivia.currentQuestion].question;
            aq.text(askQuestion);
            $("#button-display").html(aq);
            for (var i = 0; i < triviaQuestions[trivia.currentQuestion].choices.legnth; i++) {
                var questionChoices = $("<button>");
                questionChoices.addClass("choices");
                questionChoices.attr("data-name" , triviaQuestions[trivia.currentQuestion].choices[i]);
                questionChoices.text(triviaQuestions[trivia.currentQuestion].choices[i]);
                $("#button-display").append(questionChoices);
            }
        },

        nextQuestion: function(){
            trivia.timer = 10;
            $("#timer").html(trivia.timer);
            trivia.currentQuestion++;
            trivia.renderQuestion();
        },

        noAnswer: function(){
            clearInterval(timer);
            trivia.notAnswered++;
            var Fail = $("<h2>");
            var realAnswer = $("<h3>");
            Fail.addClass("answerMessage");
            Fail.text("You failed to put an answer down! Should've at least guessed!");
            realAnswer.addClass("answerMessage");
            realAnswer.html("The correct answer was " + triviaQuestions[trivia.currentQuestion].answer);
            $("#button-display").html(Fail);
            $("#button-display").append(realAnswer);
            if(trivia.currentQuestion == questions.length-1){
              setTimer(trivia.results,3*1000);
            } else {
              setTimer(trivia.nextQuestion,3*1000);
            };
          },

        results: function(){
            clearInterval(timer);
            var answered = $("<h2>");
            var correct = $("<h3>");
            var wrong = $("<h3>");
            var blank = $("<h3>");
            var restart = $("<button>")
            answered.addClass("answerMessage");
            answered.html("Good Job!");
            correct.addClass("answerMessage");
            correct.html("Correct Answers: " + trivia.answeredCorrect);
            wrong.addClass("answerMessage");
            wrong.html("Wrong Answers: " + trivia.answeredIncorrect);
            blank.addClass("answerMessage");
            blank.html("Not Answered: " + trivia.notAnswered);
            restart.addClass("refresh");
            restart.html("Restart Game?");
            $("#display").html(answered);
            $("#display").append(correct);
            $("#display").append(wrong);
            $("#display").append(blank);
            $("#display").append(restart);
          },
      

          clicked: function(click){
            clearInterval(timer);
            if ($(click.target).data("name") == triviaQuestions[trivia.currentQuestion].answer) {
              trivia.answeredCorrectly();
            } else {
              trivia.answeredIncorrectly();
            }
          },
      
          answeredCorrectly: function(){
              clearInterval(timer);
              trivia.answeredCorrect++;
              var GJ = $("<h2>");
              GJ.addClass("answerMessage");
              GJ.html("Correct! You're pretty knowledgeable!")
              $("#display").html(GJ);
              if(trivia.currentQuestion == questions.length-1){
                setTimer(trivia.results,3*1000);
              } else {
                setTimer(trivia.nextQuestion,3*1000);
              }
          },
      
          answeredIncorrectly: function(){
              clearInterval(timer);
              trivia.answeredIncorrect++;
              var Bad = $("<h2>");
              var reveal = $("<h3>");
              Bad.addClass("answerMessage");
              Bad.html("Wow... I can't believe you didn't know that.")
              reveal.addClass("answerMessage");
              reveal.html("The correct answer was " + triviaQuestions[trivia.currentQuestion].answer);
              $("#display").html(Bad);
              $("#display").append(reveal);
              if(trivia.currentQuestion == questions.length-1){
                setTimer(trivia.results,3*1000);
              } else {
                setTimer(trivia.nextQuestion,3*1000);
              }
          },
      
          refresh: function(){
            trivia.currentQuestion = 0;
            trivia.answeredCorrect = 0;
            trivia.answeredIncorrect = 0;
            trivia.notAnswered = 0;
            trivia.timer= 10;
            trivia.renderQuestion();
          },
        };
      
    $("#start").click(function(){
        $("#start").remove();
        trivia.renderQuestion();
    });
      
    $(document).on('click', '.choices',function(click){
        trivia.clicked(click);
    })
      
    $(document).on('click', '.refresh',function(){
        trivia.refresh();
    })
      
      

      


});