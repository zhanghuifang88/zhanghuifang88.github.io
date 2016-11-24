;(function(){
	//皮肤切换
	var skin = $(".skin")[0];
	skin.addEventListener("touchstart",function(e){
		skin.href = "skin.html";
		
		e.stopPropagation();
	});
	//用户登录
	var user = $(".user")[0];
	user.addEventListener("touchstart",function(e){
		user.href = "login.html";
		e.stopPropagation();
	});
	
	var meun = $(".meun")[0];
	var allLi = $(".meun li");
	var circle = $(".circle")[0];
	var allSpan = $(".circle span");//圆点
	var liW = parseInt(getComputedStyle(allLi[0]).width);
	var len = allLi.length;
	var n = 0;//圆点下标
	var m = 0;//li
	//向左滑
	MTouch(".meun").swipeLeft(
		function(){
			
			n++;
			m++;
			for(var i = 0;i < allSpan.length ;i++){
				allSpan[i].className = "";//清空上一个圆点的背景颜色
			}
			if( n > allSpan.length - 1 ){
				n = 0;//处理边界问题，如果圆点下标大于圆点个数-1，让圆点下标再回到第一个圆点
			};
			allSpan[n].className = "sActive ";
			
			// 0 1 
			if(m > len - 1 ){
				allLi[0].style.left = len*liW + "px"//让第一张相对于自己定位，走到最后一张的后面
			}
			if( m > len ){
				allLi[0].style.left = 0;//瞬间把li相对自己定位拉回
				meun.style.left = 0;
				m = 1;
			}
			var l = -m*liW;
			MTween(meun,"left",1000,l,"linear");
			
		}
	);
	//向右滑
	MTouch(".meun").swipeRight(
		function(){
			n--;
			m--;
			for(var i = 0;i < allSpan.length ;i++){
				allSpan[i].className = "";
			}
			if( n < 0 ){
				n = allSpan.length - 1;
			}
			allSpan[n].className = "sActive";
			
			if(m<0){
				allLi[len-1].style.left = -len*liW + "px";//让最后一张相对于自己定位，放到第一张的前面
			}
			if(m<-1){
				allLi[len-1].style.left = 0;
				meun.style.left =  -(len-1)*liW + "px";
				m = len-2;
				//console.log(m);
			}
			var l = -m*liW;
			MTween(meun,"left",1000,l,"linear");
			
		}	
	);
	
	//滑屏
	
	swipe();
	function swipe(){
		var wrap = $(".wrap")[0];
		var wrapCon = $(".wrapCon")[0];
		
		var startPoint = 0;
		var startEl = 0;
		var timeDis = 0;
		var translateDis = 0;
		var lastTime = 0;
		var lastTranslate = 0;
		//pageX,pageY
		wrap.addEventListener(
			"touchstart",
			function(e){
				wrapCon.style.transition = "none";
				startPoint = e.changedTouches[0].pageY;
				startEl = wrapCon.offsetTop;
				timeDis = 0;
				translateDis = 0;
				lastTime = new Date().getTime();
				lastTranslate = startEl;
			}
		);
		wrap.addEventListener(
			"touchmove",
			function(e){
				var nowTime = new Date().getTime();
				var nowPoint = e.changedTouches[0].pageY;
				var dis = nowPoint - startPoint;
				var top = startEl + dis;
				wrapCon.style.top = top + "px";
				timeDis = nowTime - lastTime;
				translateDis = top - lastTranslate;
				lastTime = nowTime;
				lastTranslate = top;
			}
		);
		wrap.addEventListener(
			"touchend",
			function(){
				var speed = translateDis/timeDis;
				var type = "ease";
				speed = isNaN(speed)?0:speed;
				var target = wrapCon.offsetTop + speed*300;
				var time = Math.abs(speed*400);
				if(target > 0) {
					target = 0;
					type = "ease";
				}
				if(target < wrap.clientHeight - wrapCon.offsetHeight){
					target = wrap.clientHeight - wrapCon.offsetHeight;
					type = "ease";
				}
				wrapCon.style.transition = time+"ms "+type;
				wrapCon.style.top = target + "px";
			}
		);
	}
	
	var searchBox = $(".searchBox")[0];
	searchBox.addEventListener("touchstart",function(e){
		e.stopPropagation();
	});
	
})();
