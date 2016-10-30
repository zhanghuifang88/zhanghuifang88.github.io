
//移入首页立即下载执行的代码
$(".download").mouseover(function(){
	$(".details").show();
});
$(".download").mouseout(function(){
	$(".details").hide();
});


var num = 0;//记录页数

var onOff = false;
var prev = 0 ;//保存上一页
//初始第一页背景层级显示
$(".bg").eq(0).css({
	"z-index":1
});
//点击圆点的时候切换页面
$('.circle span').click(function(){
	num = $(this).index();//把圆点的下标值赋给页数
	renderPage();//渲染页面
	
});
//滚轮滚动的时候执行的函数
mouseWheel(document,function(){
	if(onOff)return;
	onOff = true;
	num--;
	if(num < 0){
		num = 4;
		return;
	}
	renderPage();
	
},function(){
	if(onOff)return;
	onOff = true;
	num++;
	if(num > 4){
		num = 0;
	}
	renderPage();
});

function mouseWheel(element,upFn,downFn){
	element.onmousewheel = wheelFn
	if( element.addEventListener ){
		element.addEventListener("DOMMouseScroll",wheelFn,false);
	}
	function wheelFn(ev){
		var direction = true;
		if(ev.wheelDelta){  //ie和chrome
			direction = ev.wheelDelta > 0 ? true : false;
		}else if(ev.detail){ //FF
			direction = ev.detail < 0 ? true : false;
		}
		
		//console.log(direction);

		if( direction ){  //向上
			typeof upFn === "function" && upFn();
		}else{  //向下
			typeof downFn === "function" && downFn();
		}

		ev.preventDefault();
	}

}

//获取到所有页面的内容
var allPage = $(".page");
function renderPage(){
	$(".circle span").removeClass('active').eq(num).addClass('active');
	
	$(".page").hide().eq(num).show();
	$(".bg").eq(prev).css("opacity",0) ;
	$(".bg").eq(num).css({
		opacity: 1,
		zIndex: 1
	});
	prev = num ;
	clearTimeout(document.timer);
	document.timer = setTimeout(function(){
		onOff = false;
	},1000)
	
}