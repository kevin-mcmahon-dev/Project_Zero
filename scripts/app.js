let lives = 3;
let timer = 0;

function playGame() {

    $(".player").css({backgroundColor: "rgba(0,0,0,100)"});
    $(".obstacle").css({backgroundColor: "rgba(0,0,0,100)"});
    $(".startGame").css({display: "none"});

    let playerX; //Assigned value based on arrow key entry
    let playerWidth = 42;
    let obstacleWidth = 60;

    let startRow = 10; //player start row
    let startPlayerMarginRight = 339;
    let startPlayerMarginLeft = 339;

    let increment = 0; //defined outside function so the value can accumulate
    let incrementMiddle = 0;

    //Controls motion of obstacles, hit detection, and detemines if player has reached end zone
    function moveBlock() {

        increment += 2;
        incrementMiddle += 2;

        $(".motionLeft").css({ marginRight: `${increment}px`, marginLeft: `${660-increment}px` }); //had difficulty with syntax of template literals in this case
        $(".motionRight").css({ marginRight: `${660-increment}px`, marginLeft: `${increment}px` }); 

        $(".motionLeftOffset").css({ marginRight: `${360 + incrementMiddle}px`, marginLeft: `${300-incrementMiddle}px` });
        $(".motionRightOffset").css({ marginRight: `${300-incrementMiddle}px`, marginLeft: `${360 + incrementMiddle}px` }); 

        if (increment >= 720) { //resets increment value when obstacle leaves game area, creating appearance that it looped back to original location
            increment = 0;
        }

        if (incrementMiddle >= 360) {
            incrementMiddle = -360;
        }

        if (playerX < (increment + obstacleWidth) && (playerX + playerWidth) > increment && 
            (startRow === 9 || startRow === 7 || startRow === 5 || startRow === 3)) {
            console.log("hit from right");
            lostLife();
        }

        if (playerX < (incrementMiddle + obstacleWidth + 360) && (playerX + playerWidth) > (incrementMiddle + 360) && 
            (startRow === 9 || startRow === 7 || startRow === 5 || startRow === 3)) {
            console.log("hit from right");
            lostLife();
        }

        if (playerX < ((660-increment)+obstacleWidth) && (playerX + playerWidth) > (660-increment) && 
            (startRow === 8 || startRow === 6 || startRow === 4 || startRow === 2)) {
            console.log("hit from left");
            lostLife();
        }

        if (playerX < ((300-incrementMiddle)+obstacleWidth) && (playerX + playerWidth) > (300-incrementMiddle) && 
            (startRow === 8 || startRow === 6 || startRow === 4 || startRow === 2)) {
            console.log("hit from left");
            lostLife();
        }

        //If player reaches end zone, game is over, and winGame() is executed
        if (startRow === 1) {
            winGame();
        }
    }

    setInterval(moveBlock, 30);

    //Defines what occurs when player wins game
    function winGame() {
        $(".player").css({gridRow: "10", marginRight: "339px", marginLeft: "339px"});
        startRow = 10; //player start row
        startPlayerMarginRight = 339;
        startPlayerMarginLeft = 339;

        $("#gameContainer").css({display: "none"});
        $(".Win-Message").css({display: "block"})
        $(".playAgain").css({display: "block"});
        lives = 3;
        return;
    }

    function lostLife() {
        console.log("lost life");
        lives -= 1;
        $(".player").css({gridRow: "10", marginRight: "339px", marginLeft: "339px"});
        startRow = 10; //player start row
        startPlayerMarginRight = 339;
        startPlayerMarginLeft = 339;

        if (lives === 2) {
            $(".heart3").css({display: "none"});
        } else if (lives === 1) {
            $(".heart2").css({display: "none"});
        } else if (lives <= 0) {
            $("#gameContainer").css({display: "none"});
            $(".Loss-Message").css({display: "block"})
            $(".playAgain").css({display: "block"});
            return;
        }
    }

    ///Event listener to read for arrow key inputs
    window.addEventListener("keydown", function (e) {
        // if (e.defaultPrevented) {
        //     return;
        // }
        switch (e.key) {
            case "ArrowDown":
                if (startRow === 10) {
                    break;
                }
                $(".player").css({gridRow: `${startRow = startRow + 1}`});
                break;
            case "ArrowUp":
                if (startRow === 1) {
                    break;
                }
                $(".player").css({gridRow: `${startRow = startRow - 1}`});
                break;
            case "ArrowLeft":
                if (startPlayerMarginLeft < 0) {
                    lostLife();
                    break;
                }
                $(".player").css({marginRight: `${startPlayerMarginRight += 52}px`, marginLeft: `${startPlayerMarginLeft -= 52}px`});
                break;
            case "ArrowRight":
                if (startPlayerMarginRight < 0) {
                    lostLife();
                    break;
                }
                $(".player").css({marginRight: `${startPlayerMarginRight -= 52}px`, marginLeft: `${startPlayerMarginLeft += 52}px`});

                break;
            // default:
            //     return;
        }

        playerX = startPlayerMarginRight;
        e.preventDefault();
    }, true);
    
    //tracks time in the game
    function timerRun() {
        timer++;
        $(".Timer").text(`Time: ${timer}s`);
    }
    setInterval(timerRun, 1000);
}

//Event listener on button to start game
$(".startGame").on("click", playGame);

//Button click to play again after victory or gameover
$(".playAgain").on("click", function () {
    console.log("Another one");

    $("#gameContainer").css({display: "grid"});
    $(".Loss-Message").css({display: "none"});
    $(".Win-Message").css({display: "none"});
    $(".playAgain").css({display: "none"});

    lives = 3;
    timer = 0;
    $(".Timer").text(`Time: ${timer}s`);
    $(".heart2").css({display: "inline"});
    $(".heart3").css({display: "inline"});
    $(".player").css({gridRow: "10", marginRight: "339px", marginLeft: "339px"});
    document.querySelector("#gameContainer").reset();
    // $("#gameContainer").reset();

    playGame();
});

