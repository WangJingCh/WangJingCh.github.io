
var chessBoard=[];
var over=false;
//赢法数组
var wins=[];

//赢法的统计数据
var myWin=[];
var computerWin=[]

for(var i=0;i<15;i++){
	chessBoard[i]=[];
	for(var j=0;j<15;j++){
		chessBoard[i][j]=0;
	}
}

for (var i = 0; i < 15; i++) {
	wins[i]=[];
	for (var j = 0; j < 15; j++) {
		wins[i][j]=[];
	}
}

var count=0;
//横线赢法
for (var i = 0; i < 15; i++) {
	for(var j=0; j<11;j++){
		for(var k=0;k<5;k++){
			wins[i][j+k][count]=true;
		}
		count++;
	}
}
//竖线赢法
for (var i = 0; i < 15; i++) {
	for(var j=0; j<11;j++){
		for(var k=0;k<5;k++){
			wins[j+k][i][count]=true;
		}
		count++;
	}
}
//斜线赢法
for (var i = 0; i < 11; i++) {
	for(var j=0; j<11;j++){
		for(var k=0;k<5;k++){
			wins[i+k][j+k][count]=true;
		}
		count++;
	}
}
//反斜线赢法
for (var i = 0; i < 11; i++) {
	for(var j=14; j>3;j--){
		for(var k=0;k<5;k++){
			wins[i+k][j-k][count]=true;
		}
		count++;
	}
}
console.log(count);
for (var i = 0; i < count; i++) {
	myWin[i]=0;
	computerWin[i]=0;
}

var chess=document.querySelector('canvas');
var oC=chess.getContext('2d');
var me=true;
oC.strokeStyle="#BFBFBF";

//画棋盘
var drawBox=function(){
	for(var i=0; i<15;i++){
		oC.moveTo(15+i*30,15);
		oC.lineTo(15+i*30,435);
		oC.stroke();
		oC.moveTo(15,15+i*30);
		oC.lineTo(435,15+i*30);
		oC.stroke();
	}
}
drawBox();
//画旗子
var oneStep=function(i,j,me){
	oC.beginPath();
	oC.arc(15+i*30,15+j*30,13,0,2*Math.PI);
	oC.closePath();
	var gradient=oC.createRadialGradient(15+i*30+2,15+j*30-2,13,15+i*30+2,15+j*30-2,5);
	if(me){
		gradient.addColorStop(0,"#0A0A0A");
		gradient.addColorStop(1,"#636766");
	}else{
		gradient.addColorStop(0,"#D1D1D1");
		gradient.addColorStop(1,"#F9F9F9");
	}
	
	oC.fillStyle=gradient;
	oC.fill();
}

chess.onclick=function(e){
	if(over){
		return;
	}
	if(!me){
		return;
	}
	var x=e.offsetX;
	var y=e.offsetY;
	var i=Math.floor(x/30);
	var j=Math.floor(y/30);
	if(chessBoard[i][j]==0){
		oneStep(i,j,me);
		chessBoard[i][j]=1;
		for(var k=0; k<count;k++){
			if(wins[i][j][k]){
				myWin[k]++;
				computerWin[k]=6;
				if (myWin[k] == 5) {
					window.alert('你赢了');
					over =true;
				}
			}
		}
		if (!over) {
			me=!me;
			comuterAi();
		}
	}
}
var comuterAi = function (){
	var myScore=[];
	var computerScore=[];
	var max=0;
	var u=0,v=0;
	for(var i=0;i<15;i++){
		myScore[i]=[];
		computerScore[i]=[];
		for(var j=0;j<15;j++){
			myScore[i][j]=0;
			computerScore[i][j]=0;
		}
	}
	for(var i=0;i<15;i++){
		for(var j=0;j<15;j++){
			if (chessBoard[i][j]==0) {
				for(var k=0;k<count;k++){
					if(wins[i][j][k]){
						if (myWin[k]==1) {
							myScore[i][j]+=200;
						}else if(myWin[k]==2){
							myScore[i][j]+=2000;
						}else if(myWin[k]==3){
							myScore[i][j]+=5000;
						}else if(myWin[k]==4){
							myScore[i][j]+=10000;
						}
						if (computerWin[k]==1) {
							computerScore[i][j]+=220;
						}else if(computerWin[k]==2){
							computerScore[i][j]+=2200;
						}else if(computerWin[k]==3){
							computerScore[i][j]+=5200;
						}else if(computerWin[k]==4){
							computerScore[i][j]+=200000;
						}
					}
				}
				if(myScore[i][j]>max){
					max=myScore[i][j];
					u=i;
					v=j;
				}else if(myScore[i][j]=max){
					if (computerScore[i][j]>computerScore[u][v]) {
						u=i;
						v=j;
					}
				}
				if(computerScore[i][j]>max){
					max=myScore[i][j];
					u=i;
					v=j;
				}else if(computerScore[i][j]=max){
					if (myScore[i][j]>myScore[u][v]) {
						u=i;
						v=j;
					}
				}
			}
		}
	}
	oneStep(u,v,false);
	chessBoard[u][v]=2;
	for(var k=0; k<count;k++){
		if(wins[u][v][k]){
			computerWin[k]++;
			myWin[k]=6;
			if (computerWin[k] == 5) {
				window.alert('计算机赢了');
				over =true;
			}
		}
	}
	if (!over) {
		me=!me;
	}
}


//落子
