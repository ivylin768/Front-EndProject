function showNumWithAnimation(i,j,num) {
    let numCell = $("#number-cell-"+i+"-"+j);

    //设置一般样式
    // numCell.text(num); //显示数字
    numCell.text(personalize(num)); //显示定制化文本
    numCell.css('color',getNumColor(num));
    numCell.css('background-color',getNumBackgroundColor(num));

    //设置宽高及位置动画
    numCell.animate({
        width:cellSildeLength+"px",
        height:cellSildeLength+"px",
        top:getPosTop(i,j),
        left:getPosLeft(i,j)
    },50);

}

function moveWithAnimation(fromX,fromY,toX,toY) {
    let numCell = $("#number-cell-"+fromX+"-"+fromY);

    numCell.animate({
        top:getPosTop(toX,toY),
        left:getPosLeft(toX,toY),
    },200);
}