// Run script in strict mode
"use strict";

//Global Variables
const X_CLASS="x";
const CIRCLE_CLASS="circle";
const cellElements=document.querySelectorAll("[data-cell]");
const board=document.getElementById('board');
const winningMessageText=document.querySelector("[data-winning-message-text]");
const messageContainer=document.getElementById("messageContainer");
const restartButton=document.getElementById("restart-button");
let circleTurn;
const winningCombinations=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];


 startGame();
 restartButton.addEventListener('click',startGame);

 function startGame(){
    circleTurn=false;
     cellElements.forEach(cell=>{
         cell.classList.remove(X_CLASS);
         cell.classList.remove(CIRCLE_CLASS);
         cell.removeEventListener("click",handleClick);
        cell.addEventListener('click',handleClick,{once:true});
    });
    setBoardHoverClass();
    messageContainer.classList.remove('show');
}

function handleClick(e){
    const cell=e.target;
    const currentClass=circleTurn?CIRCLE_CLASS:X_CLASS;
    // 1.placemark
    placeMark(cell,currentClass);
    // 2.Check for win
    if(checkWin(currentClass)){
        endGame(false) ;
     } 
     // 3.check for draw
     else if(isDraw()){
         endGame(true);
     }
     else{
         // 4.switch turn
         swapTurns();
         setBoardHoverClass();
       }

}
function placeMark(cell,currentClass){
    cell.classList.add(currentClass);
    
}
function swapTurns(){
    circleTurn=!circleTurn; 
}
function setBoardHoverClass(){
    board.classList.remove(X_CLASS);
    board.classList.remove(CIRCLE_CLASS);
    if(circleTurn){
        board.classList.add(CIRCLE_CLASS);
    }
    else{
        board.classList.add(X_CLASS);
    }

}
function checkWin(currentClass){
    return winningCombinations.some(combination=>{
        return combination.every(index=>{
            return cellElements[index].classList.contains(currentClass);
        })
    })
}
function endGame(draw){
    if(draw){
        winningMessageText.innerText="Draw!";

    }else{
        winningMessageText.innerText=`${circleTurn?"0's" :"X's"}Wins!`;
    }
    messageContainer.classList.add('show');
        
        
}
function isDraw(){
    return [...cellElements].every(cell=>{
        return cell.classList.contains(X_CLASS)||cell.classList.contains(CIRCLE_CLASS)
    })
}
// Created:by Pramesh Karki using web dev simplified tutorial
