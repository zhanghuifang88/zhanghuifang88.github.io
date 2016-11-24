;(function(){
	function $(s){
		return document.querySelector(s);
	}
	var picture = $(".picture");
	console.log(picture);
	
	//css(picture,'translate',3);
	
	var pictureBack = $(".pictureBack");
	pictureBack.addEventListener('touchstart', function(e) {
		pictureBack.href="index.html";
		e.stopPropagation();
	});
	
	var list1 = $(".list1");
	//fn(list1);
	var list2 = $(".list2");
	//fn(list2);
	var list3 = $(".list3");
	//fn(list3);/
	var list4 = $(".list4");
	//fn(list4);
	//导航
	var picNav = $(".picNav");
	var allTitle = picNav.getElementsByTagName("li");
	//所有的列表
	var scroll = $(".scroll");
	var allUl = scroll.getElementsByTagName("ul");
	//为导航的每一个标签添加点击事件
	for(var i = 0; i < allTitle.length; i++){
		allTitle[i].index = i;//保存下标
		//当点击标签时，当前的显示样式，并且让每个标签显示对应的内容
		allTitle[i].addEventListener('touchstart', function(e) {
			for(var j = 0; j < allTitle.length; j++){
				allTitle[j].className = "";
				allUl[j].style.display = "none";
			}
			this.className = "liActive";
			allUl[this.index].style.display = "block";
			
			e.stopPropagation();
		});
			
		
	}
	
	
	

	var data = [];
	for(var i = 0; i < 20; i++){
		data.push("image/"+(i%20+1)+".jpg");
	};
	var footer = $(".footer");
	var main = $(".main");
	var picList = $(".picList");
	var li = picList.getElementsByTagName("li");
	var rem = document.documentElement.getBoundingClientRect().width/18;
	var length = 8;
	var start = 0;
	var mainScroll = new MScroll({
		element: main,
		showBar: true
	});
	mainScroll.onscroll = function(){
		showImg();
	};
	mainScroll.onscrollover = function(){
		showImg();
	};
	mainScroll.onscrollstart = function(){
		if(this.iScroll.y <= this.minTranslate.y ){
			footer.style.display = "block";
		}
	};
	mainScroll.onscrollend = function(){
		if(this.iScroll.y <= this.minTranslate.y - 2*rem ){
			// 在end时候清除掉MScroll的timer可以清除掉缓冲和回弹动画
			clearTimeout(mainScroll.timer);
			//console.log("加载");
			start += length;
			create();
			mainScroll.reSize();
		}
	};
	create();
	mainScroll.reSize();
	function create(){
		if(start >= data.length){
		//console.log(111);
			footer.innerHTML = "对不起没有更多图片";
			setTimeout(function(){
				mainScroll.iScroll.y = mainScroll.minTranslate.y;
				// 修改了mainScroll.iScroll 之后 记的调用MScroll.setTranslate()(不带动画) 或者 MScroll.move()(带动画) 进行位置同步
				//mainScroll.setTranslate();
				mainScroll.move();
				mainScroll.onscroll = null;
				mainScroll.onscrollover = null;
				mainScroll.onscrollstart = null;
				mainScroll.onscrollend = null;
			},1000);
			return;
		}
		var end = start + length;
		end = end > data.length?data.length:end;
		for(var i = start; i < end; i++){
			createLi(data[i]);
		}
		footer.style.display = "none";
	}
	function createLi(url){
		var li = document.createElement("li");
		var a = document.createElement("a");
		li.dataset.src = url;
		li.dataset.isShow = false; 
		li.appendChild(a);
		picList.appendChild(li);
	}
	showImg();
	function showImg(){
		for(var i = 0; i < li.length; i++){
			var rect = li[i].getBoundingClientRect();
			var top = rect.top;
			var bottom = top+rect.height;
			if(top < main.offsetHeight + 2*rem
			  && bottom > 2*rem
			  && li[i].dataset.isShow == "false"
			  ){
			  	li[i].dataset.isShow = true;
				creatImg(li[i]);	
			}
		}
	}
	function creatImg(li){
		var img = new Image();
		img.src = li.dataset.src;
		img.onload = function(){
			li.children[0].appendChild(img);
			setTimeout(function(){
				img.style.opacity = 1;
			},50);
		};
	}
	
	
	
})();
