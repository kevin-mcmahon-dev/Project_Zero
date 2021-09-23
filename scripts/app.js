let lives = 3;
let timer = 0;
let level = 1;
let score = 0;

let moveBlockLeftInterval;
let moveBlockMiddleLeftInterval;
let moveBlockRightInterval;
let moveBlockMiddleRightInterval;
let timerInterval;

let highScore = [];

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

    let incrementLeft = 0; //defined outside function so the value can accumulate
    let incrementMiddleLeft = 0;
    let incrementRight = 0;
    let incrementMiddleRight = 0;

    //Controls motion of obstacles, hit detection, and detemines if player has reached end zone
    function moveBlockLeft() {

        incrementLeft += 2;

        $(".motionLeft").css({ marginRight: `${-60+incrementLeft}px`, marginLeft: `${720-incrementLeft}px` }); //had difficulty with syntax of template literals in this case

        if (incrementLeft >= 780) { //resets increment value when obstacle leaves game area, creating appearance that it looped back to original location
            incrementLeft = 0;
        }

        if (playerX < (incrementLeft - 60 + obstacleWidth) && (playerX + playerWidth) > (incrementLeft-60) && 
            (startRow === 9 || startRow === 7 || startRow === 5 || startRow === 3)) {
            console.log("hit from right");
            lostLife();
        }

        if (startRow === 1 && level < 10) {
            increaseLevel();
        } else if (startRow === 1 && level >= 10) {
            
            if (lives === 1) {
                score += 50;
            } else if (lives === 2) {
                score += 200;
            } else if (lives === 3) {
                score += 500;
            }

            winGame();
        }
    }

    function moveBlockMiddleLeft() {

        incrementMiddleLeft += 2;

        $(".motionLeftOffset").css({ marginRight: `${360 + incrementMiddleLeft}px`, marginLeft: `${300-incrementMiddleLeft}px` });

        if (incrementMiddleLeft >= 360) {
            incrementMiddleLeft = -420;
        }

        if (playerX < (incrementMiddleLeft + obstacleWidth + 360) && (playerX + playerWidth) > (incrementMiddleLeft + 360) && 
            (startRow === 9 || startRow === 7 || startRow === 5 || startRow === 3)) {
            console.log("hit from right");
            lostLife();
        }

        if (startRow === 1 && level < 10) {
            increaseLevel();
        } else if (startRow === 1 && level >= 10) {
            
            if (lives === 1) {
                score += 50;
            } else if (lives === 2) {
                score += 200;
            } else if (lives === 3) {
                score += 500;
            }

            winGame();
        }
    } 

    function moveBlockRight() {

        incrementRight += 2;

        $(".motionRight").css({ marginRight: `${720-incrementRight}px`, marginLeft: `${-60+incrementRight}px` }); 

        if (incrementRight >= 780) { //resets increment value when obstacle leaves game area, creating appearance that it looped back to original location
            incrementRight = 0;
        }

        if (playerX < ((720-incrementRight)+obstacleWidth) && (playerX + playerWidth) > (720-incrementRight) && 
            (startRow === 8 || startRow === 6 || startRow === 4 || startRow === 2)) {
            console.log("hit from left");
            lostLife();
        }

        if (startRow === 1 && level < 10) {
            increaseLevel();
        } else if (startRow === 1 && level >= 10) {
            
            if (lives === 1) {
                score += 50;
            } else if (lives === 2) {
                score += 200;
            } else if (lives === 3) {
                score += 500;
            }

            winGame();
        }
    }

    function moveBlockMiddleRight() {

        incrementMiddleRight += 2;

        $(".motionRightOffset").css({ marginRight: `${300-incrementMiddleRight}px`, marginLeft: `${360 + incrementMiddleRight}px` }); 

        if (incrementMiddleRight >= 360) {
            incrementMiddleRight = -420;
        }

        if (playerX < ((300-incrementMiddleRight)+obstacleWidth) && (playerX + playerWidth) > (300-incrementMiddleRight) && 
            (startRow === 8 || startRow === 6 || startRow === 4 || startRow === 2)) {
            console.log("hit from left");
            lostLife();
        }

        //If player reaches end zone, game is over, and winGame() is executed
        if (startRow === 1 && level < 10) {
            increaseLevel();
        } else if (startRow === 1 && level >= 10) {
            
            if (lives === 1) {
                score += 50;
            } else if (lives === 2) {
                score += 200;
            } else if (lives === 3) {
                score += 500;
            }

            winGame();
        }
    }

    moveBlockLeftInterval = setInterval(moveBlockLeft, 4);
    moveBlockMiddleLeftInterval =setInterval(moveBlockMiddleLeft, 7);
    moveBlockRightInterval =setInterval(moveBlockRight, 5);
    moveBlockMiddleRightInterval = setInterval(moveBlockMiddleRight, 4);

    function increaseLevel() {
        level += 1;
        $(".Level-Counter").text(`Level: ${level}`);
        if (lives === 1) {
            lives += 1;
            $(".heart2").css({display: "inline"});
            score += 50;
            $(".Score-Counter").text(`Score: ${score}`);
        } else if (lives === 2) {
            lives += 1;
            $(".heart3").css({display: "inline"});
            score += 200;
            $(".Score-Counter").text(`Score: ${score}`);
        } else if (lives === 3) {
            score += 500;
            $(".Score-Counter").text(`Score: ${score}`);
        }

        $(".player").css({gridRow: "10", marginRight: "339px", marginLeft: "339px"});
        startRow = 10; //player start row
        startPlayerMarginRight = 339;
        startPlayerMarginLeft = 339;
        console.log(level);

    }
    //Defines what occurs when player wins game
    function winGame() {
        $(".player").css({gridRow: "10", marginRight: "339px", marginLeft: "339px"});
        startRow = 10; //player start row
        startPlayerMarginRight = 339;
        startPlayerMarginLeft = 339;
        highScore.push(score);
        console.log(highScore);
        highScore.sort();
        
        $("#gameContainer").css({display: "none"});
        $(".Win-Message").text(`You Win! You completed the game in ${timer} seconds with a score of ${score}!`);
        $(".High-Score").text(`Your High Score is ${highScore[highScore.length-1]}`);
        $(".Win-Message").css({display: "block"});
        $(".High-Score").css({display: "block"});
        $(".playAgain").css({display: "block"});
        lives = 3;
        level = 1;
        //Prevents key entry stacking issues
        window.removeEventListener("keydown", keyInput, true);
        return console.log("You Win!");
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
            $(".player").css({gridRow: "10", marginRight: "339px", marginLeft: "339px"});
            $("#gameContainer").css({display: "none"});
            $(".Loss-Message").css({display: "block"})
            $(".playAgain").css({display: "block"});
            lives = 3;
            level = 1;
            //Prevents key entry stacking issues
            window.removeEventListener("keydown", keyInput, true);
            return console.log("You Lose!");
        }
    }

    ///Function and event listener for arrow key inputs
    //Source: https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key#example
    function keyInput(e) {
        switch (e.key) {
            case "ArrowDown":
                if (startRow === 10) {
                    break;
                }
                console.log("down");
                $(".player").css({gridRow: `${startRow = startRow + 1}`});
                break;
            case "ArrowUp":
                if (startRow === 1) {
                    break;
                }
                console.log("up");
                $(".player").css({gridRow: `${startRow = startRow - 1}`});
                break;
            case "ArrowLeft":
                if (startPlayerMarginLeft < 0) {
                    lostLife();
                    break;
                }
                console.log("left");
                $(".player").css({marginRight: `${startPlayerMarginRight += 52}px`, marginLeft: `${startPlayerMarginLeft -= 52}px`});
                break;
            case "ArrowRight":
                if (startPlayerMarginRight < 0) {
                    lostLife();
                    break;
                }
                console.log("right");
                $(".player").css({marginRight: `${startPlayerMarginRight -= 52}px`, marginLeft: `${startPlayerMarginLeft += 52}px`});

                break;
            default:
                return;
        }

        playerX = startPlayerMarginRight;
        e.preventDefault();
    }
    
    window.addEventListener("keydown", keyInput, true);

    //tracks time in the game
    function timerRun() {
        timer++;
        $(".Timer").text(`Time: ${timer}s`);
    }
    timerInterval = setInterval(timerRun, 1000);
}

//Event listener on button to start game
$(".startGame").on("click", playGame);

//Button click to play again after victory or gameover
$(".playAgain").on("click", function () {

    $("#gameContainer").css({display: "grid"});
    $(".Loss-Message").css({display: "none"});
    $(".Win-Message").css({display: "none"});
    $(".High-Score").css({display: "none"});
    $(".playAgain").css({display: "none"});

    lives = 3;
    timer = 0;
    level = 1;
    score = 0;

    $(".Score-Counter").text(`Score: 0`);
    $(".Level-Counter").text(`Level: ${level}`);
    $(".Timer").text(`Time: ${timer}s`);
    $(".heart2").css({display: "inline"});
    $(".heart3").css({display: "inline"});
    $(".player").css({gridRow: "10", marginRight: "339px", marginLeft: "339px"});

    // document.querySelector("#gameContainer").reset();
    clearInterval(moveBlockLeftInterval);
    clearInterval(moveBlockMiddleLeftInterval);
    clearInterval(moveBlockRightInterval);
    clearInterval(moveBlockMiddleRightInterval);
    clearInterval(timerInterval);
    playGame();
});

// Original key entry eventlistener with anonymous function

//    window.addEventListener("keydown", function (e) {
//         // if (e.defaultPrevented) {
//         //     return;
//         // }
//         switch (e.key) {
//             case "ArrowDown":
//                 if (startRow === 10) {
//                     break;
//                 }
//                 console.log("down");
//                 $(".player").css({gridRow: `${startRow = startRow + 1}`});
//                 break;
//             case "ArrowUp":
//                 if (startRow === 1) {
//                     break;
//                 }
//                 console.log("up");
//                 $(".player").css({gridRow: `${startRow = startRow - 1}`});
//                 break;
//             case "ArrowLeft":
//                 if (startPlayerMarginLeft < 0) {
//                     lostLife();
//                     break;
//                 }
//                 console.log("left");
//                 $(".player").css({marginRight: `${startPlayerMarginRight += 52}px`, marginLeft: `${startPlayerMarginLeft -= 52}px`});
//                 break;
//             case "ArrowRight":
//                 if (startPlayerMarginRight < 0) {
//                     lostLife();
//                     break;
//                 }
//                 console.log("right");
//                 $(".player").css({marginRight: `${startPlayerMarginRight -= 52}px`, marginLeft: `${startPlayerMarginLeft += 52}px`});

//                 break;
//             default:
//                 return;
//         }

//         playerX = startPlayerMarginRight;
//         e.preventDefault();
//     }, true);
