//返回顶部
function goback(){
	var oBack=document.getElementById("back")
	var timer=null
	var oTop=0
	var off=true
	window.onscroll=function(){
				oTop = document.documentElement.scrollTop || document.body.scrollTop;
				
				if(oTop>500){
					oBack.style.display='block'
				}else if(oTop<500){
					oBack.style.display='none'
				};
				if(!off){
					clearInterval(timer)
				}
				off=false;
			}
	oBack.onclick=function(){
				timer=setInterval(function(){
					var backTop = oTop/6;
					if(oTop<=0){
						clearInterval(timer)
					}else{
						document.documentElement.scrollTop=document.body.scrollTop-=backTop
						off=true;
					}
					
				},30)
				
			}
}
	goback()
	
//选项卡

function changecard(){
	var oCompanies=document.getElementById("companies")
	var aA=oCompanies.getElementsByTagName("a")
	var oBox1=document.getElementById("companies_main1")
	var oBox2=document.getElementById("companies_main2")
	var iNum=0
	
	for(var i=0; i<aA.length; i++){
			aA[i].index=i
			aA[i].onclick=function(){
			for(var i=0; i<aA.length; i++){
			aA[i].className=""	
				}
			this.className="companies_active"
			if(this.index==0){
				oBox1.style.display="block"
				oBox2.style.display="none"
			}else{
				oBox1.style.display="none"
				oBox2.style.display="block"
			}
			}
		}
}
	changecard()
//顶部菜单点击

function gouwuche(){
	
	var oCar=document.getElementById("mallcar")
	var oWashwater=document.getElementById("washwater")
	oCar.onclick=function(ev){
		var ev=ev|| event
		ev.cancelBubble=true;
		oWashwater.style.display="block"
	}
	document.onclick=function(){
		oWashwater.style.display="none"
	}
}
	gouwuche()
//左侧菜单栏
function caidan(){
	
	var oMenu=document.getElementById("menu")
	var oLi=oMenu.getElementsByTagName("li")
	/*var oMore=oMenu.getElementsByClassName("sidebar_more")*/
	for( var i=0; i<oLi.length;i++){
		oLi[i].index=i
		oLi[i].onmouseover=function(){
			oLi[this.index].className="menuPart"
			getClass(oLi[this.index],'sidebar_more')[0].style.display="block"
		}
		oLi[i].onmouseout=function(){
			oLi[this.index].className=""
			getClass(oLi[this.index],'sidebar_more')[0].style.display="none"
		}
	}
				function getClass(parent,name){
				var oParent = parent || document;//容错的处理
				var getEle = oParent.getElementsByTagName('*');
				var resultArr=[];
				for(var i=0; i<getEle.length; i++){
					var arr = getEle[i].className.split(' ');//['p1']  ['title','title1']
					for(var j=0; j<arr.length;j++){						
						if(arr[j]==name){
							resultArr.push(getEle[i]);	
						}
					}
				}	
				return resultArr;
			}
}
	caidan()
//banner图

function banner(){
	var oW= 0;
	var oBanner=document.getElementById("banner")
	var oView = document.getElementById("view")
	var oUl = oView.getElementsByTagName('ul')[0];
	var aLis = oUl.children;
	var oOl = document.getElementById("banner").getElementsByTagName('ol')[0];
	var oBnts = oOl.children;
	oUl.innerHTML+=oUl.innerHTML;
	var aLis = oUl.children;
	var oLiWidth = aLis[0].offsetWidth;
	var iNum = 0;
	var timer=null
	//计算轮播图的宽度
			oUl.style.width = aLis[0].offsetWidth*aLis.length + 'px';
			oW= document.documentElement.clientWidth;
	//计算轮播图居中
			oView.style.left = -(oView.offsetWidth - oW)/2 +'px';
//当窗口改变的时候重新计算轮播图居中
			window.onresize=function(){
				oW= document.documentElement.clientWidth;
				oView.style.left = -(oView.offsetWidth - oW)/2 +'px';
			};

		//点解数字按钮切换轮播
		
			for(var i =0; i<oBnts.length;i++){
				oBnts[i].index=i;
				oBnts[i].onclick=function(){
					for(var i =0; i<oBnts.length;i++){
						oBnts[i].className='';
					}
					oBnts[this.index].className='banner_active';
					iNum=this.index;
					animate(oUl,{'left': -this.index*oLiWidth});
				}
			}
//轮播图自动播放
			function play(){
				iNum++;
				if(iNum==aLis.length/2+1){
					oUl.style.left = oUl.offsetLeft + oUl.offsetWidth/2+'px'
					iNum=1;
				}
				for(var i=0; i<oBnts.length;i++){
					oBnts[i].className='';
				};
				if(iNum==aLis.length/2){
					oBnts[0].className='banner_active';
				}else{
					oBnts[iNum].className='banner_active';
				}
				animate(oUl,{'left': -iNum*oLiWidth});
			}
			timer=setInterval(play,4000)
			oBanner.onmousemove=function(){
				clearInterval(timer)
			}
			oBanner.onmouseout=function(){
				timer=setInterval(play,4000)
			}
//获取非行间样式的方法
function getCss(obj,arr){
	if(obj.currentStyle){
		return obj.currentStyle[arr];
	}else{
		return getComputedStyle(obj,false)[arr];
	}
};
//获取class的方法
function getClass(parent,name){
	var oParent = parent || document;
	var aEles = oParent.getElementsByTagName("*");
	var result=[];
	for(var i=0; i<aEles.length;i++){
		var arr= aEles[i].className.split(' ');
		for(var j=0; j<arr.length;j++){
			if(arr[j]==name){
				result.push(aEles[i])
			}						
		}
	};
	return result;
};

//js动画方法
function animate(obj,json,fn){		
	clearInterval(obj.timer);
	obj.timer = setInterval(function(){
		var off=true;
		for(var arr in json){//left:200 top:200   arr=>left
			var cur= 0;
			if(arr=='opacity'){
				cur=parseFloat(getCss(obj,arr))*100;//获取值
			}else{
				cur=parseInt(getCss(obj,arr));
			};
			
			var speed = (json[arr] - cur)/8;
			speed= speed>0 ? Math.ceil(speed):Math.floor(speed);
			
			if(cur != json[arr]){
				off=false;
			};
			if(arr=='opacity'){
				cur+=speed;
				obj.style[arr]= cur/100;
				obj.style.filter='alpha(opacity:'+cur+')';
				
			}else{
				obj.style[arr]= cur+speed+'px';
			}
		}
		if(off){
			clearInterval(obj.timer);
			if(fn){
				fn.call(obj)
			}
		}
		
	},30)
}
}
	banner()
//搜索框
function search(){
	
	var oSearch= document.getElementById("searchBox")
	oSearch.onclick=function(){
		oSearch.value=""
	}
}
	search()