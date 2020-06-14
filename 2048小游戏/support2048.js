var screenWidth = window.screen.availWidth;//获取屏幕宽度
var gridContainerWidth = 0.92 * screenWidth;
var cellSpace = 0.04 * screenWidth;
var cellSildeLength = 0.18 * screenWidth;

function getPosTop(i,j) {
    return cellSpace+i*(cellSpace+cellSildeLength);
}

function getPosLeft(i,j) {
    return cellSpace+j*(cellSpace+cellSildeLength);
}

function getNumBackgroundColor(num) {
    switch(num) {
        case 2: return "#eee4da"; break;
        case 4: return "#ede0c8"; break;
        case 8: return "#f2b179"; break;
        case 16: return "#f59563"; break;
        case 32: return "#f67c5f"; break;
        case 64: return "#f65e3b"; break;
        case 128: return "#edcf72"; break;
        case 256: return "#edcc61"; break;
        case 512: return "#9c0"; break;
        case 1024: return "#33b5e5"; break;
        case 2048: return "#09c"; break;
        case 4096: return "#a6c"; break;
        case 4096: return "#93c"; break;
    }

    return "black";
}

function getNumColor(num) {
    if (num <= 4)
      return "#776e65";
    
    return "white";
}

function noSpace(array) {
    for (let i=0; i<4; i++)
      for (let j=0; j<4; j++) {
        if (array[i][j] === 0)
          return false;
      }
    
    return true;
  }

function canMoveLeft(array) {
    for(let i=0; i<4; i++)
      for(let j=1; j<4; j++)
        if (array[i][j] !== 0)
          if(array[i][j-1] === 0 || array[i][j-1] === array[i][j])//左侧有为空或值相等的格子
            return true;
    
    return false;
}

function canMoveUp(array) {
  for(let i=1; i<4; i++)
    for(let j=0; j<4; j++)
      if(array[i-1][j] === 0 || array[i-1][j] === array[i][j])//上侧有为空或值相等的格子
        return true;
  
  return false;
}

function canMoveRight(array) {
  for(let i=0; i<4; i++)
    for(let j=0; j<3; j++)
      if(array[i][j+1] === 0 || array[i][j+1] === array[i][j]) //右侧有为空或值相等的格子
        return true;

  return false;
}

function canMoveDown(array) {
  for(let i=0; i<3; i++)
    for(let j=0; j<4; j++)
      if(array[i+1][j] === 0 || array[i+1][j] === array[i][j]) //下侧有为空或值相等的格子
        return true;

  return false;
}

function noBlockHorizontal(row,startCol,endCol,array) {//两个格子水平方向之间无障碍格子（值非空的格子）
  for(let j=startCol+1; j<endCol; j++)
    if(array[row][j] !== 0) //中间有不为空的格子
      return false;
  
  return true;
}

function noBlockVertical(startRow,endRow,col,array) {//两个格子垂直方向之间无障碍格子（值非空的格子）
  for(let i=startRow+1; i<endRow; i++)
    if(array[i][col] !== 0)
      return false;

  return true;
}

function personalize(num) { //定制化显示文字
  switch(num) {
    case 2: return "小白"; break;
    case 4: return "实习生"; break;
    case 8: return "程序猿"; break;
    case 16: return "项目经理"; break;
    case 32: return "架构师"; break;
    case 64: return "技术经理"; break;
    case 128: return "高级经理"; break;
    case 256: return "技术总监"; break;
    case 512: return "副总裁"; break;
    case 1024: return "CTO"; break;
    case 2048: return "总裁"; break;
  }
}