const boardEl = document.getElementById('board');
const playerInfo = document.getElementById('player');
const SIZE = 8;
const board = initBoard();

draw();

function draw(){
  board.forEach((row,rowIndex)=>{
    row.forEach((cell,colIndex)=>{
      const cellEl = document.createElement('div');
      cellEl.classList.add('cell');
      cellEl.setAttribute('id',`${rowIndex},${colIndex}`);
      cellEl.classList.add(getCellColor(rowIndex,colIndex));
      
      if(cell) {
        cellEl.innerHTML = cell.icon;
        cellEl.style = `fill: ${cell.color}`
        cellEl.setAttribute('draggable',true);
        cellEl.addEventListener('dragstart',(e)=>dragStart(rowIndex,colIndex));
        cellEl.addEventListener('dragend',dragEnd);
      };
      boardEl.appendChild(cellEl);
    })
  })
}

let player = 'white';
playerInfo.innerText = `${player}'s turn to play!`;
let start;
let legalMoves;
let check = false;
let isStillCheck = false;

function dragEnd(e){
  if(board[start[0]][start[1]].color !== player) return;
  const  {offsetX,offsetY} = e;
  const rowCount = Math.floor(offsetY/60);
  const colCount = Math.floor(offsetX/60);
  for(let i = 0;i<legalMoves.length;i++){
    const [moveRow,moveCol] = legalMoves[i];
    if(moveRow===rowCount && moveCol===colCount){
      const [startRow,startCol] = start;
      const [endRow,endCol] = [startRow+moveRow,startCol+moveCol];
      //if there is a check we need to check if this move is legal for the check
      if(check){
        const newBoard = [[],[],[],[],[],[],[],[]];
        for(let i = 0;i<board.length;i++){
          for(let j =0;j<board.length;j++){
            newBoard[i][j] = board[i][j]; 
          }
        }
        newBoard[endRow][endCol] = newBoard[startRow][startCol];
        newBoard[endRow][endCol].pos = {row:endRow,col:endCol}
        newBoard[startRow][startCol] = '';
        const prevPlayer = player==='white' ? 'black' : 'white';
        isStillCheck = isCheck(newBoard,prevPlayer);
      }
      if(!isStillCheck){

        board[endRow][endCol] = board[startRow][startCol];
        board[endRow][endCol].pos = {row:endRow,col:endCol}
        board[startRow][startCol] = '';
        
        //remove everything from start Element
        const startEl = document.getElementById(`${startRow},${startCol}`);
        startEl.removeAttribute('draggable');
        startEl.removeEventListener('dragstart',dragStart);
        startEl.removeEventListener('dragend',dragEnd);
        startEl.innerHTML = '';
       

        //add everything here
        //check if the pawn in the last row or first row and make it queen
        if(board[endRow][endCol].type === 'pawn' && (endRow===0 || endRow===7)){
          board[endRow][endCol] = new Queen(board[endRow][endCol].color,{row:endRow,col:endCol})
        }
        const cell = board[endRow][endCol];
        const endEl = document.getElementById(`${endRow},${endCol}`);
        endEl.innerHTML = cell.icon;
        endEl.style = `fill: ${cell.color}`
        endEl.setAttribute('draggable',true);
        endEl.addEventListener('dragstart',(e)=>dragStart(endRow,endCol));
        endEl.addEventListener('dragend',dragEnd);
        
        check = isCheck(board,player);
        isStillCheck = false;
        player = player === 'white' ? 'black' : 'white';
        playerInfo.innerText = `${player}'s turn to play!`;
        return;
      }
    }
  }
}

function dragStart(row,col){
  start = [row,col];
  if(board[row][col].color !== player) return;
  legalMoves = board[row][col].legalMoves(board);
}

function isCheck(board,player){
  for(let row = 0;row<board.length;row++){
    for(let col = 0;col<board.length;col++){
      const piece = board[row][col];
      if(piece && piece.color === player){
        const moves = piece.legalMoves(board);
        for(let i = 0;i<moves.length;i++){
          const [moveRow,moveCol] = moves[i];
          const targetRow = row+moveRow;
          const targetCol = col+moveCol;
          const target = board[targetRow][targetCol];
          if(target && target.color!==player && target.type==='king'){
            return true;
          }
        }
      }
    }
  }
  return false;
}

function initBoard (){
  const newBoard = [[],[],[],[],[],[],[],[]];
  for(let i = 0;i<newBoard.length;i++){
    for(let j = 0;j<newBoard.length;j++){
      if(i===0){//black side
        if(j===0 || j===newBoard.length-1){
          newBoard[i][j] = new Rook('black',{row:i,col:j});
        }else if(j===1 || j=== newBoard.length-2){
          newBoard[i][j] = new Knight('black',{row:i,col:j})
        }else if(j===2 || j === newBoard.length-3){
          newBoard[i][j] = new Bishop('black',{row:i,col:j})
        }else if(j===3){
          newBoard[i][j] = new Queen('black',{row:i,col:j})
        }else{
          newBoard[i][j] = new King('black',{row:i,col:j})
        }
      }else if(i===1){
        newBoard[i][j] = new Pawn('black',{row:i,col:j})
      }else if(i===6){ //white side
        newBoard[i][j] = new Pawn('white',{row:i,col:j})
      }else if(i===7){
        if(j===0 || j===newBoard.length-1){
          newBoard[i][j] = new Rook('white',{row:i,col:j})
        }else if(j===1 || j=== newBoard.length-2){
          newBoard[i][j] = new Knight('white',{row:i,col:j})
        }else if(j===2 || j === newBoard.length-3){
          newBoard[i][j] = new Bishop('white',{row:i,col:j})
        }else if(j===3){
          newBoard[i][j] = new Queen('white',{row:i,col:j})
        }else{
          newBoard[i][j] = new King('white',{row:i,col:j})
        }
      }else{
        newBoard[i][j] = ''
      }
    }
  }
  
  return newBoard;
}

function getCellColor (rowIndex,colIndex){
  let color;
    if(rowIndex%2===0){
      if(colIndex%2==0){
        color = 'grey'
      }else{
        color = 'teal'
      } 
    }else{
      if(colIndex%2==0){
        color = 'teal'
      }else{
        color = 'grey'
      } 
    }
    return color;
}


