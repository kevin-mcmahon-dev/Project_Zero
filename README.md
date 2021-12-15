# Dodge-the-boulders

In this game, the player must navigate from the start zone, through a field of obstacles to reach the end zone. The obstacles are a series of horizontally moving blocks. Each row of obstacles will alternately be moving left or right. The player can use the up and down arrow keys to navigate forward or backward from row to row. The player can use the left and right arrow keys to move sideways along the row that the player is currently in. When the player makes contact with an obstacle or moves off the game area, one life is lost. When a life is lost, the player is reset to the start zone. In each game, the player has three lives before the game is over. When a player safely reaches the end zone, the level is completed and the player is automatically reset to the start zone for the next level. When 10 levels are completed, the game is won.

Wireframe: https://www.figma.com/file/qjRsvv79B4qnapadc0eFkC/Project_Zero?node-id=1%3A45

User Story:
1) Player clicks "Start" to begin the game.
2) Player uses up and down keys to move vertically between the rows.
3) Player uses left and right keys to move horizontally along the row they currently occupy.
4) Player must navigate from start zone to end zone across a series of rows, avoiding moving obstacles within each row.
5) If player makes contact with an obstacle or moves off the game board, the player loses one life and begins at the safe zone.
6) If player loses three lives, the game is lost and the Loss Screen is displayed.
7) If the player reaches the end zone, the level is won, the user is transported back to the start zone, and the next level automatically begins.
8) After completing 10 levels, the game is won. The Win Screen is displayed.
9) Player is prompted on Game Over and Win screens to play again.

Bonus Objective: Add a series of levels. When the player finishes one level, they are moved to the start zone of the next level.

Bonus Objective: Have the rows of obstacles cascade downward away from the end zone. If the player moves off the bottom of the page, a life is lost. 

Bonus Objective: After making the rows cascade downward, the game dynamic is changed so that the objective is to survive as long as possible without dying. There is a safe start zone, but no end zone. The safe start zone is removed after the player makes their first move.
