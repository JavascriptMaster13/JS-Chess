class Rook{
  constructor(color,pos){
    this.color = color
    this.icon = `<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M32 192V48c0-8.8 7.2-16 16-16h64c8.8 0 16 7.2 16 16V88c0 4.4 3.6 8 8 8h32c4.4 0 8-3.6 8-8V48c0-8.8 7.2-16 16-16h64c8.8 0 16 7.2 16 16V88c0 4.4 3.6 8 8 8h32c4.4 0 8-3.6 8-8V48c0-8.8 7.2-16 16-16h64c8.8 0 16 7.2 16 16V192c0 10.1-4.7 19.6-12.8 25.6L352 256l16 144H80L96 256 44.8 217.6C36.7 211.6 32 202.1 32 192zm176 96h32c8.8 0 16-7.2 16-16V224c0-17.7-14.3-32-32-32s-32 14.3-32 32v48c0 8.8 7.2 16 16 16zM22.6 473.4L64 432H384l41.4 41.4c4.2 4.2 6.6 10 6.6 16c0 12.5-10.1 22.6-22.6 22.6H38.6C26.1 512 16 501.9 16 489.4c0-6 2.4-11.8 6.6-16z"/></svg>`
    this.pos = pos;
  }

  legalMoves(board){
    const legalMoves = [];
    
    //vertical down
    let row = this.pos.row+1;
    while(row<board.length){
      if(board[row][this.pos.col]){
        if(board[row][this.pos.col].color!==this.color){
          legalMoves.push([row-this.pos.row,0]);
        }
        break;
      }else{
        legalMoves.push([row-this.pos.row,0]);
      }
      row++
    }
    //vertical up
    row = this.pos.row-1;
    while(row>=0){
      if(board[row][this.pos.col]){
        if(board[row][this.pos.col].color!==this.color){
          legalMoves.push([row-this.pos.row,0]);
        }
        break;
      }else{
        legalMoves.push([row-this.pos.row,0]);
      }
      row--;
    }
    //horizontal right
    let col = this.pos.col+1;
    while(col<board.length){
      if(board[this.pos.row][col]){
        if(board[this.pos.row][col].color!==this.color){
          legalMoves.push([0,col-this.pos.col]);
        }
        break;
      }else{
        legalMoves.push([0,col-this.pos.col]);
      }
      col++;
    }
    //horizontal left
    col = this.pos.col-1;
    while(col>=0){
      if(board[this.pos.row][col]){
        if(board[this.pos.row][col].color!==this.color){
          legalMoves.push([0,col-this.pos.col]);
        }
        break;
      }else{
        legalMoves.push([0,col-this.pos.col]);
      }
      col--;
    }
    return legalMoves;
  }
}