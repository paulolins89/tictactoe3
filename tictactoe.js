//Listens for the choices on the intro screen and makes it disappear after selection

const Gameboard = (() => {
    //set initial variables and selectors
    const board = ['', '', '', '', '', '', '', '', ''];
    let currentPlayer = 'X';
    const squares = document.querySelectorAll('.square');
    const buttons = document.querySelectorAll('.buttons');

    //function to restart game by putting blanks in html and board variable
    const restartGame = () => {
        for (i=0; i<9 ; i++){
            document.getElementById(i).innerHTML = '';
            board[i] = '';
            currentPlayer = 'X';
        }
    }

    //event listener for game selections
    squares.forEach(square => {
        square.addEventListener('click', e =>{
            if (board[e.target.id] == ''){
                //after the player selects where to mark, it will add the sign to the html
                document.getElementById(e.target.id).innerHTML = currentPlayer;
                board[e.target.id] = currentPlayer;
                //the game will then check if a winner was decided, if true, it ends the game and makes it impossible for 
                //player to more to the board
                if ((Gameflow.checkWinner(board,currentPlayer) == true) || (Gameflow.checkWinner(board,currentPlayer) == 'tie')){
                    Gameflow.checkWinner(board,currentPlayer);
                    for (i=0; i<9 ; i++){
                        if(board[i] == ''){
                        board[i] = ' ';
                        }
                    }
                //if false, it changes to the other player
                }else{
                    currentPlayer = Gameflow.changePlayer(currentPlayer);
                };
                
            }
        })
    })

    buttons.forEach(button => {
        button.addEventListener('click', e =>{
            restartGame();
            document.getElementById('whoseturn').innerHTML = "X's turn";
            if (e.target.id == 'change') {
                document.getElementById('vschoose').style.removeProperty('display');
                document.getElementById('playscreen').style.display = 'none';
            }
        })
    })
})();

const Gameflow = (() => {
    const winningCombos = [[0, 1, 2],
                           [3, 4, 5],
                           [6, 7, 8],
                           [0, 3, 6],
                           [1, 4, 7],
                           [2, 5, 8],
                           [0, 4, 8],
                           [2, 4, 6],];

    

    //this function changes the current player                        
    const changePlayer = currentPlayer => {
        if (currentPlayer == 'X'){
            document.getElementById('whoseturn').innerHTML = "O's turn";
            return 'O';
        }else{
            document.getElementById('whoseturn').innerHTML = "X's turn";
            return 'X';
        }
    }

    //function which checks if there is a winner at every turn
    const checkWinner = (arr, val) => {
        var indexes = [], i = -1;
        //makes an array with the index of the selection of the current player
        while ((i = arr.indexOf(val, i+1)) != -1){
            indexes.push(i);
        }
        //compares the current players index array to the winning combinations
        for (k=0; k<winningCombos.length; k++){
            let truthArray = [];
            for(j=0; j<winningCombos[k].length; j++){
                truthArray.push(indexes.includes(winningCombos[k][j]))
            }
            if (truthArray.every(Boolean) == true){
                document.getElementById('whoseturn').innerHTML = val + ' wins!'
                return true;
            }else{
                if(indexes.length == 5){
                    document.getElementById('whoseturn').innerHTML = "It's a tie!"
                    return 'tie';
                }
                truthArray = [];
            }
        }
    }
    
    return {changePlayer, checkWinner};
})();

