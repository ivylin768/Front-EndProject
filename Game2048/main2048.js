var board = new Array();//游戏的主要数据，4x4格子
var hasConflicted = new Array();//记录每个格子是否叠加过
var score = 0;//分数

$(document).ready(function() {//当整个程序加载完毕
    prepareForMobile();
    newgame();
});

function prepareForMobile() {
  if (screenWidth > 500) {
    gridContainerWidth = 500;
    cellSpace = 20;
    cellSildeLength = 100;
  }

  $("#grid-container").css("width",gridContainerWidth-2*cellSpace);
  $("#grid-container").css("height",gridContainerWidth-2*cellSpace);
  $("#grid-container").css("padding",cellSpace);
  $("#grid-container").css("border-radius",0.02 * gridContainerWidth);

  $(".grid-cell").css("width",cellSildeLength);
  $(".grid-cell").css("height",cellSildeLength);
  $(".grid-cell").css("border-radius",0.02 * cellSildeLength);
}

function newgame() {
    //初始化棋盘格
    init();
    //在随机两个格子生成数字
    generateOneNumber();
    generateOneNumber();
}

function init() {

  for (let i = 0; i < 4; i ++)
    for (let j = 0; j < 4; j++) { //遍历每个格子

      let gridCell = $("#grid-cell-"+i+"-"+j);
      gridCell.css('top', getPosTop(i,j));//确定格子距离顶部位置【放在support2048.js]
      gridCell.css('left', getPosLeft(i,j));//确定格子距离左侧位置
        
    }

  for (let i = 0; i < 4; i++) {
    board[i] = new Array();//两次遍历使board成为一个二维数组
    hasConflicted[i] = new Array();
    for (let j = 0; j < 4; j++) {
      board[i][j] = 0;  //每个二维数组值初始化为0
      hasConflicted[i][j] = false; //初始化每个格子的叠加状态为false
    }
  }
  
  score = 0;
  updateScore();
  updateBoardView();
}

function updateBoardView() { //根据board值更改前端显示
  $(".number-cell").remove();//若已有number-cell元素，删掉原有元素

  for (let i = 0; i < 4; i++) 
    for (let j = 0; j < 4; j++) {
      $("#grid-container").append('<div class="number-cell" id="number-cell-'+i+'-'+j+'"></div>');

      let theNumCell = $("#number-cell-"+i+"-"+j);
      if (board[i][j] === 0) { //numberCell不显示
        theNumCell.css('width','0px');
        theNumCell.css('height','0px');
        theNumCell.css('top',getPosTop(i,j)+cellSildeLength/2);
        theNumCell.css('left',getPosLeft(i,j)+cellSildeLength/2);
      } else {
        theNumCell.css('width',cellSildeLength);
        theNumCell.css('height',cellSildeLength);
        theNumCell.css('top',getPosTop(i,j));
        theNumCell.css('left',getPosLeft(i,j));
        // theNumCell.text(board[i][j]);//数值作为文字显示
        theNumCell.text(personalize(board[i][j]));//定制化显示数值相应的文字
        theNumCell.css('color',getNumColor(board[i][j]));
        theNumCell.css('background-color',getNumBackgroundColor(board[i][j]));
      }

      hasConflicted[i][j] = false; //重置每个格子的叠加状态为false
    }

  //设置文本正常显示【行高&字体】
  $(".number-cell").css("line-height",cellSildeLength+"px");
  $(".number-cell").css("font-size",0.18*cellSildeLength+"px");
  $(".number-cell").css("border-radius",0.02 * cellSildeLength);
}

function generateOneNumber() {

  //判断棋盘是否还有空间
  if(noSpace(board))
    return false;
  
  //生成随机位置0-3
  let randX = parseInt(Math.floor(Math.random() * 4));
  let randY = parseInt(Math.floor(Math.random() * 4));

  //【待进一步优化】
  //先随机找50次
  let time = 0;
  while(time < 50) {
    if (board[randX][randY] === 0)
      break;
    else {
      randX = parseInt(Math.floor(Math.random() * 4));
      randY = parseInt(Math.floor(Math.random() * 4));
      time ++;
    }
  }
  //再人工找出空格子
  if(time === 50) {
    for(let i=0; i<4; i++)
      for(let j=0; j<4; j++)
        if(board[i][j] === 0) {
          randX = i;
          randY = j;
        }
  }
    
  //等概率随机生成2or4
  let randNum = Math.random() < 0.5 ? 2:4;

  //在随机位置显示随机数字
  board[randX][randY] = randNum;
  showNumWithAnimation(randX,randY,randNum);

  return true;

}

$(document).keydown(function(event){
  switch(event.keyCode) {
    case 37: //left
      event.preventDefault();//阻止按键响应默认事件
      if(moveLeft()){ //调用函数并判断执行结果，若有向左移，则新产生随机数并判断游戏是否结束
        setTimeout(generateOneNumber,210);//让动画充分显示完再产生随机数字
        setTimeout(isGameOver,300);//让动画充分显示完再显示游戏结束
      };
      break;
    case 38: //up
      event.preventDefault();
      if(moveUp()){
        setTimeout(generateOneNumber,210);
        setTimeout(isGameOver,300);
      };
      break;
    case 39: //right
      event.preventDefault();
      if(moveRight()){
        setTimeout(generateOneNumber,210);
        setTimeout(isGameOver,300);
      };
      break;
    case 40: //down
      event.preventDefault();
      if(moveDown()){
        setTimeout(generateOneNumber,210);
        setTimeout(isGameOver,300);
      };
      break;
    default: //default
      break;
  }
});

document.addEventListener("touchstart",function(event) {
  startX = event.touches[0].pageX;
  startY = event.touches[0].pageY;
});

//排除Android4.0的19827号bug
document.addEventListener("touchmove",function(event) {
  event.preventDefault();
}, { passive: false });

document.addEventListener("touchend",function(event) {
  let endX = event.changedTouches[0].pageX;
  let endY = event.changedTouches[0].pageY;

  //判断滑动方向
  let deltaX = endX - startX;
  let deltaY = endY - startY;

  //设置阈值排除无效滑动
  if(Math.abs(deltaX) < 0.3*screenWidth && Math.abs(deltaY) < 0.3*screenWidth)
    return;//滑动在阈值内则return不再执行本函数后面语句

  //超过了阈值，属于有效滑动
  if(Math.abs(deltaX) >= Math.abs(deltaY)) {
    //X轴上滑动
    if(deltaX > 0) {
      //右滑
      event.preventDefault();
      if(moveRight()){
        setTimeout(generateOneNumber,210);
        setTimeout(isGameOver,300);
      };
    } else {
      //左滑
      event.preventDefault();
      if(moveLeft()){ 
        setTimeout(generateOneNumber,210);
        setTimeout(isGameOver,300);
      };
    }
  } else {
    //Y轴上滑动
    if(deltaY > 0) {
      //下滑
      event.preventDefault();
      if(moveDown()){
        setTimeout(generateOneNumber,210);
        setTimeout(isGameOver,300);
      };
    } else {
      //上滑
      event.preventDefault();
      if(moveUp()){
        setTimeout(generateOneNumber,210);
        setTimeout(isGameOver,300);
      };
    }
  }
});

function isGameOver(){
  if(noSpace(board) && !canMove())
    gameover();
}

function gameover() {
  alert("Game Over!");
}

function moveLeft() {
  if(!canMoveLeft(board))
    return false;

  //move left
  for(let i=0; i<4; i++)
    for(let j=1; j<4; j++) //从左往右遍历右边三列（从j=1到j=3）
      if(board[i][j] !== 0) {
        for(let k=0; k<j; k++) //遍历board[i][j]左侧所有格子
          if(board[i][k] === 0 && noBlockHorizontal(i,k,j,board)) {
            //move【先移动再赋值
            moveWithAnimation(i,j,i,k);
            board[i][k] = board[i][j];
            board[i][j] = 0;

            continue;//结束本次判断
          } else if (board[i][k] === board[i][j] && noBlockHorizontal(i,k,j,board) && hasConflicted[i][k] === false) {
            //move
            moveWithAnimation(i,j,i,k);
            //add
            board[i][k] += board[i][j];
            board[i][j] = 0;
            //add score
            score += board[i][k];
            updateScore();
            //hasConflicted
            hasConflicted[i][k] = true;
            continue;//结束本次判断
          }
      } 

  setTimeout(updateBoardView,200);//200毫秒后再执行updateBoardView()
  return true;
}

function moveUp() {
  if(!canMoveUp(board))
    return false;

  for(let i=1; i<4; i++) //从上往下遍历下面三行（从i=1到i=3）
    for(let j=0; j<4; j++)
      if(board[i][j] !== 0)
        for(let k=0; k<i; k++) {
          if(board[k][j] === 0 && noBlockVertical(k,i,j,board)) {
            //move
            moveWithAnimation(i,j,k,j);
            board[k][j] = board[i][j];
            board[i][j] = 0;

            continue;
          } else if(board[k][j] === board[i][j] && noBlockVertical(k,i,j,board) && hasConflicted[k][j] === false) {
            //move
            moveWithAnimation(i,j,k,j);
            //add
            board[k][j] += board[i][j];
            board[i][j] =0;
            //add score
            score += board[k][j];
            updateScore();
            //hasConflicted
            hasConflicted[k][j] = true;
            continue;
          }
        }

  setTimeout(updateBoardView,200);
  return true;
}

function moveRight() {
  if(!canMoveRight(board))
    return false;

  for(let i=0; i<4; i++)
    for(let j=2; j>-1; j--)//从右往左遍历左边三列（从j=2到j=0）
      if(board[i][j] !== 0)
        for(let k=3; k>j; k--)
          if(board[i][k] === 0 && noBlockHorizontal(i,j,k,board)) {
            //move
            moveWithAnimation(i,j,i,k);
            board[i][k] =board[i][j];
            board[i][j] = 0;

            continue;
          } else if(board[i][k] === board[i][j] && noBlockHorizontal(i,j,k,board) && hasConflicted[i][k] === false) {
            //move
            moveWithAnimation(i,j,i,k);
            //add
            board[i][k] += board[i][j];
            board[i][j] = 0;
            //add score
            score += board[i][k];
            updateScore();
            //hasConflicted
            hasConflicted[i][k] = true;
            continue;
          }
   
  setTimeout(updateBoardView,200);
  return true;
}

function moveDown() {
  if(!canMoveDown(board))
    return false;

  for(let i=2; i>-1; i--) //从下往上遍历上面三行（从i=2到i=0）
    for(let j=0; j<4; j++)
      if(board[i][j] !== 0)
        for(let k=3; k>i; k--)
          if(board[k][j] === 0 && noBlockVertical(i,k,j,board)) {
            //move
            moveWithAnimation(i,j,k,j);
            board[k][j] = board[i][j];
            board[i][j] = 0;

            continue;
          } else if(board[k][j] === board[i][j] && noBlockVertical(i,k,j,board) && hasConflicted[k][j] === false) {
            //move
            moveWithAnimation(i,j,k,j);
            board[k][j] += board[i][j];
            board[i][j] = 0;
            //add score
            score += board[k][j];
            updateScore();
            //hasConflicted
            hasConflicted[k][j] = true;
            continue;
          }

  setTimeout(updateBoardView,200);
  return true;      
}

function canMove() {
  if(moveLeft() || moveUp() || moveRight() || moveDown())
    return true;

  return false;//已经不能移动
}

function updateScore() {
  $("#score").text(score);
}