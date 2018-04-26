//WAITS FOR THE PAGE TO LOAD THEN EXECUTES
$(document).ready(function () {
	// HIDES START MENU
	function HideStartMenu() {
		$('#startButton').on("click", function (e) { $('.hideStartMenu').hide(3000) });
	}

	// UPDATES THE QUESTIONS
	function UpdateQuestion() {

		//INITIALIZATION
		let idx = DATABASE.index;
		let currentQuestion = DATABASE.multipleQuestion[idx];

		//CHECKS TO SEE IF INDEX IS LESS THAN 6 (SINCE TOTAL QUESTIONS IS 6) TO UPDATE
		if (DATABASE.index < 6) {
			//SETS THE HTML ANSWER VALUES
			$('#questionHeader').html((DATABASE.index) + 1)
			$('#questionTxt').html(currentQuestion);
			$('#button1').html(DATABASE.multipleChoice[idx][0]);
			$('#button2').html(DATABASE.multipleChoice[idx][1]);
			$('#button3').html(DATABASE.multipleChoice[idx][2]);
			$('#button4').html(DATABASE.multipleChoice[idx][3]);

			//SETS VALUES TO DETERMINE CORRECT ANSWER 
			for (let loopIndex = 1; loopIndex < 5; loopIndex++) {
				if ($('#button' + loopIndex).html() == DATABASE.multipleAnswer[idx]) {
					$('#button' + loopIndex).val("A");
				}
				else {
					$('#button' + loopIndex).val("B");
				}
			}

		}

	}

	// DISABLES AND ENABLES THE NEXT BUTTON
	function EnableDisableButton() {

		// ENABLES BUTTON WHEN A QUESTION BUTTON IS CLICKED
		$('.questionButtons').on("click", function (e) { $('#nextButton').attr('disabled', false) });

		// GOES TO NEXT QUESTION, THEN ENABLES BACK BUTTONS AND DISABLES NEXT BUTTON
		// ALSO CONTAINS THE FUNCTIONS THAT HIDE THE QUESTIONS
		$('#nextButton').on("click", function (e) {
			$('#nextButton').attr('disabled', true);
			$('#resultPrompt').hide(0);
			for (let enableIndex = 1; enableIndex < 5; enableIndex++) {
				$('#button' + enableIndex).attr('disabled', false);
			}
			//IF INDEX REACHES 6 COUNTS, IT'LL HIDE QUESTION TAB
			if (DATABASE.index === 5) {
				HideQuestions();
			}

		});
	}


	// SHOWS THE QUESTIONS THROUGHOUT THE QUIZ
	function ShowQuestion() {
		//UPDATES THE QUESTION WHEN STARTING THE QUIZ
		UpdateQuestion();
		$('#startButton').on("click", function (e) { $('.tempHidden').show(3000) });
	}

	//CHECKS USERS QUESTION IF CORRECT OR INCORRECT AND OUTPUTS RESULTS AT THE TOP
	function CheckAndPromptResults() {

		//FOR LOOP THAT GOES THROUGH THE BUTTON NUMBERS
		for (let loopIndex = 1; loopIndex < 5; loopIndex++) {
			// CORRECT ANSWER CHECK (GOES THROUGH IF VALUE = A THEN PROMPTS TO USER CORRECT)
			$('#button' + loopIndex).on("click", function (e) {
				if ($('#button' + loopIndex).val() === "A") {
					$('.correctCounter').html((DATABASE.correct++) + 1);
					$('#resultPrompt').show(0);
					$('#resultPrompt').html("CORRECT!");
					//DISABLES BUTTONS WHEN BUTTON CLICKED
					for (let disableIndex = 1; disableIndex < 5; disableIndex++) {
						$('#button' + disableIndex).attr('disabled', true);
					}
				}
				//ELSE PROMPTS INCORRECT
				else {
					$('.incorrectCounter').html((DATABASE.incorrect++) + 1);
					$('#resultPrompt').show(0);
					//USES A FOR LOOP TO GET CORRECT VALUE TO INPUT TO PROMPT
					for(let firstLoop = 1; firstLoop < 5; firstLoop++){
						if ($('#button' + firstLoop).val() === "A"){
							let correctHtml = ($('#button' + firstLoop).html());
							$('#resultPrompt').html("INCORRECT! the correct answer is - " + correctHtml);
						}
					}		
					//DISABLES BUTTONS WHEN BUTTON CLICKED
					for (let disableIndex = 1; disableIndex < 5; disableIndex++) {
						$('#button' + disableIndex).attr('disabled', true);
					}
				}
			});
		}
	};

	//HIDES THE QUIZZING PORTION AND CALLS SHOWRESULTS FXN(CALLED LINE 55)
	function HideQuestions() {
			$('#nextButton').on("click", function (e) { $('.tempHidden').hide(1000) });
			ShowResults();
	}

	//SHOWS THE RESULTS AND CALLS RESTART QUIZ FXN
	function ShowResults() {

		$('#nextButton').on("click", function (e) {
			$('.resultsView').show(1000)
		});
		$('.correctCounter').html(DATABASE.correct);
		$('.incorrectCounter').html(DATABASE.incorrect);

		//CALLS RESTARTQUIZ FXN
		RestartQuiz();
	}

	// UPDATES INDEX AND COUNTER
	function UpdateIndex() {
		//CHECKS INDEX TO NOT REACH MORE THAN 6 COUNTS
		if (DATABASE.index < 5) {
			$('#nextButton').on("click", function (e) {
				//IF STATEMENT TO NOT LET THE USER UPDATE COUNTER
				if (DATABASE.index < 5) {
					$('#questionCount').html((DATABASE.index++) + 2)
					//UPDATES QUESTION EVERYTIME NEXTBUTTON IS CLICKED
					UpdateQuestion();
				}
			});
		}
	}


	//REINITIALIZES QUIZ AND GOES BACK TO START MENU
	function RestartQuiz() {
		$('#restartButton').on("click", function (e) { $('.resultsView').hide(2000) });
		$('#restartButton').on("click", function (e) { $('.hideStartMenu').show(2000); ReinitializeQuiz(); location.reload });
	}

	// REINITIALIZES THE QUIZ DATA
	function ReinitializeQuiz() {
		//RELOADS THE DOCUMENT PAGE TO THE START OF THE QUIZ
		location.reload();
	}

	//INITIALIZATION OF THE FUNCTIONS
	function init() {

		HideStartMenu();
		ShowQuestion();
		UpdateIndex()
		EnableDisableButton();
		CheckAndPromptResults();
	}
	
	//EXECUTES FUNCTIONS
	init();
});