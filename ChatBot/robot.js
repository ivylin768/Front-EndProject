// 找到发送按钮
var sendBtn = document.getElementsByTagName('button')[0];
// 找到输入框
var inputArea = document.getElementsByTagName('textarea')[0];
// 找到消息列表
var msgList = document.getElementsByClassName('message-list')[0];

/**
 * 统一的添加消息函数
 * @param msg 需要添加的消息
 * @param className 消息节点的类名
 */
function sendMsg(msg, className) {
  var msgEle = document.createElement('li');
  msgEle.className = className;
  //实现发送'/表情'（斜杠考虑中英文符号）到消息框的时候，消息框显示发送了一张图片
  var emoji = '<img src="https://tse3-mm.cn.bing.net/th/id/OIP.NIdAbDyKty-VTkyb_my4xAHaHV?pid=Api&rs=1" style="background:none;width:32px;height:32px">';
  // //Method1【只能实现纯表情消息的替换】
  // if (msg == '/表情' || msg == '/表情') {
  //   msgEle.innerHTML = '<div>' + emoji +'</div>';
  // } else {
  //   msgEle.innerHTML = '<div>' + msg +'</div>';
  // }
  //Method2【可实现文字拼接表情的消息】
  var newMsg = msg.replace('/表情',emoji);
  newMsg = msg.replace('/表情',emoji);
  msgEle.innerHTML = '<div>' + newMsg +'</div>';
  msgList.appendChild(msgEle);
  //实现自动显示最新消息，即消息列表滚动到最底部，页面不被遮挡
  msgEle.scrollIntoView(false);//先把msgList的css设为overflow:auto;可滚动
  ///【完善】因为message-list__item-robot和message-list__item-user都有margin-bottom,滚动条没有滚到最底部
  
}

// 发送机器人消息
function robotSendMsg(msg) {
  sendMsg(msg,'message-list__item message-list__item-robot');
}

// 发送用户消息
function selfSendMsg(msg) {
  // if(inputArea.value)
    sendMsg(msg,'message-list__item message-list__item-user');
}

// ajax函数
function ajax(method, url, data, cb) {
  var xhr = new XMLHttpRequest();
  xhr.open(method,url);
  xhr.send(data);
  xhr.onreadystatechange = function() {
    // readyState 为 4 时表示已经全部接收到响应数据
    if (xhr.readyState === 4) {
      // Http 状态码大于等于 200 小于 300，或者等于 304，表示请求成功
      if (200 < xhr.status <= 300 || xhr.status === 304) {
        cb(xhr.responseText);
      } else {
        cb(null);
      }
    }
  }
}

function handleSendMsg() {
  // 得到用户输入
  var userMsg = inputArea.value;
  //判断用户是否有输入&输入是否为空格
  //判断多个空格

  //Method1【replace，每次只能替换掉一个空格】
  // let pureUserMsg = userMsg;
  // while(userMsg.lastIndexOf(' ')>=0)
  //   pureUserMsg = pureUserMsg.replace(' ','');

  //Method2【用trim() 方法删除字符串的头尾空格，同时不改变原字符串】
  if(userMsg && userMsg.trim()) {//用户有输入且不全为空格
    // debugger
    // 将用户输入信息添加到对话列表中
    selfSendMsg(userMsg);
    // 清空用户输入信息
    inputArea.value = '';
    // 发送 Ajax 请求
    ajax(
      'GET',
      'https://robotchat.xhxly.cn/api.php?key=free&appid=0&msg=' + userMsg,
      null,
      // 数据返回的回调函数
      function(res) {
        //替换机器人名字
        var finalRes = res.replace('菲菲','ivy');
        // 获取实际对话内容，返回的数据是字符串,需要用JSON.parse把字符串转换成对象
        var robotMsg = JSON.parse(finalRes).content;
        // 将返回信息添加到对话列表
        robotSendMsg(robotMsg);
      }
    )
  } else {
    // 清空用户输入信息
    inputArea.value = '';
  } 
}

//添加button事件监听
sendBtn.addEventListener('click',handleSendMsg);

//实现敲击回车按钮，自动发送消息
// //Method1
document.addEventListener('keypress',handleEnterMsg);

function handleEnterMsg(e) {
  if(e && e.keyCode === 13 && !e.shiftKey) {//shift+enter则换行【原本想做control+enter，但Mac系统的command键较难识别】
    // debugger
    // alert('Enter1');
    e.preventDefault();//要阻止默认事件【否则会在发送消息后输入框多输出一个换行符】
    handleSendMsg();
  }
}
//Method2
// document.onkeydown = function (event) {
//   if(event.keyCode === 13) { //enter键
//     // alert('Enter2');
//     handleSendMsg();
//   }
// }

//实现机器人回复的时候自动显示最新消息，也就是消息列表滚动到最底部，页面不被遮挡
// msgList.scrollIntoView(false);//先把msgList的css设为overflow:auto;
//这样并不会自动滚动到最新消息，要对最新消息的element设置.scrollIntoView(false)