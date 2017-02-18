var clock=null;
var state=0;
var speed=4;

function init(){
	for(var i=0;i<4;i++){
		createRow();
	}
	$('main').onclick=function(ev){
		judge(ev);
	}
	clock=window.setInterval('move()',30);
}
//点击黑块
function judge(ev){
	if(ev.target.className.indexOf('black')==-1){
		pass;
	}else{
		ev.target.calssName='cell';
		ev.target.style.background='#fff';
		ev.target.parentNode.pass=1;
		score();
	}
}
function fail(){
	clearInterval(clock);
	alert('你的最终得分为：'+parseInt($('score').innerHTML));
}
//创建div，
function createDiv(className){
	var div=document.createElement('div');
	div.className=className;
	return div;
}
//创建一个<div class="row">并且有4个子节点<div class=""cell>
function createRow(){
	var con=$('con');
	var row=createDiv('row');
	var arr=createcell();

	con.appendChild(row);
	for (var i = 0; i < 4; i++) {
		row.appendChild(createDiv(arr[i]))
	}
	if (con.firstChild==null) {
		con.appendChild(row);
	}else{
		con.insertBefore(row,con.firstChild)
	}
}
function $(id){
	return document.getElementById(id);
}

function createcell(){
	var temp=['cell','cell','cell','cell',];
	var i=Math.floor(Math.random()*4);
	temp[i]='cell black';
	return temp;
}
//黑块移动
function move(){
	var con=$('con');
	var top=parseInt(window.getComputedStyle(con,null)['top']);
	if (speed+top>0) {
		top=0;
	}else{
		top+=speed;
	}
	con.style.top=top+'px';
	if(top==0){
		createRow();
		con.style.top='-100px';
		delrow();
	}else if(top==(-10+speed)){
		var rows=con.childNodes;
		if((rows.length==5)&&(rows[rows.length-1].pass!==1)){
			fail();
		}
	}
}


//加速函数
function speedup(){
	speed+=2;
	if(speed==20){
		alert('无敌是多么多么寂寞')
	}
}
//删除div#con的子节点中最后一个row；
function delrow(){
	var con=$('con');
	if(con.childNodes.length==6){
		con.removeChild(con.lastChild);
	}
}
//积分
function score(){
	var newScore=parseInt($('score').innerHTML)+1;
	$('score').innerHTML=newScore;
	if(newScore%10==0){
		speedup();
	}
}
init();