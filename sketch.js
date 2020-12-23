let board = [
  ['' , '' ,''],
  ['' , '' ,''],
  ['' , '' ,'']
] ;

let ai = 'X' ; 
let human = 'O' ;
let currentPlayer = human;
let w ; let h ;

function setup() {
  createCanvas(400, 400);
   w = width / 3 ; 
   h = height / 3 ; 
   bestMove() ;
  // nextTurn() ;
}

function mousePressed(){
  if(currentPlayer == human){
    let i = floor(mouseX / w) ; 
    let j = floor(mouseY / h) ; 
    if(board[i][j] == ''){
      board[i][j] = human ; 
      currentPlayer = ai ; 
      bestMove() ;
    }
  }
}

function equal3(a , b, c){
  return (a == b && b == c && a != '') ; 
}

function checkWinner(){
  let winner = null ; 
  
  // check horizontal 
  
  for(let i = 0 ; i < 3 ; ++ i){
    if( equal3(board[i][0],board[i][1], board[i][2])){
      winner = board[i][0] ; 
    }
  }
  
  for(let i = 0 ; i < 3 ; ++ i){
    if(equal3(board[0][i],board[1][i], board[2][i])){
      winner = board[0][i] ; 
    }
  }
  
  if(equal3(board[0][0],board[1][1], board[2][2]))winner = board[0][0] ;
  if(equal3(board[0][2],board[1][1], board[2][0]))winner = board[1][1] ; 
  let openSpots = 0 ; 
  for(let i = 0 ;i < 3 ;++ i){
    for(let j = 0 ;j < 3; ++ j){
      if(board[i][j] == ''){
        ++ openSpots ; 
      }
    }
  }
  if(winner == null && openSpots == 0){
    return 'tie' ; 
  }else {
    return winner ; 
  }
}

function draw() {
  background(255);
  frameRate(3) ; 

  
  for(let i = 1 ;i <= 2 ; ++ i ){
    line(w * i , 0 , w * i , height) ;
    line(0 , h * i , width , h * i) ; 
  }
  
  for(let i = 0 ; i < 3 ;i ++ ){
    for(let j = 0 ;j < 3 ;j ++ ){
      let x = w * i + w / 2 ;
      let y = h * j + h / 2; 
      let spot = board[i][j] ; 
      textSize(32) ; 
      strokeWeight(5) ; 
      if(spot == ai){
        let xr = w / 4 ;
        line(x-xr,y-xr,x+xr,y+xr); 
        line(x+xr,y-xr,x-xr,y+xr)  ; 
      }else if(spot == human){
        noFill() ; 
        ellipse(x , y , w / 2) ; 
      }
    }
  }
  let result = checkWinner() ; 
  if(result != null){
    noLoop() ; 
    let resultP =createP('') ;
    resultP.style('font-size' , '32pt') ; 
    if(result == 'tie'){
      resultP.html('Tie!') ; 
    }else{
      resultP.html(`${result} wins!`) ; 
    }
  }
}