;(function(){
	//下面区域
	function views(){
		return {
			W: document.documentElement.clientWidth,
			H: document.documentElement.clientHeight
		}
	}
	var content = tools.$("#content");
	var header = tools.$("#header");
	//内容区域的高度自适应
	content.style.height = views().H - header.offsetHeight + "px";
	//绑定一个resize事件
	window.addEventListener("resize",function(){
		content.style.height = views().H - header.offsetHeight + "px";
	},false)
	var mask = tools.$("#mask");//删除弹窗遮罩
	var box = tools.$("#box");//删除提示框
	var closes = tools.$(".closes")[0];//x号关闭按钮
	var sets = tools.$(".sets")[0];//新建
	var boxBtn = tools.$(".boxBtn")[0];
	var spanBtn = tools.$("span",boxBtn);//确定取消按钮
	var moves = tools.$("#moves");//移动存储位置框
	
   	var empty = tools.$('.empty')[0];//文本区如果没有内容
   	
	var allCheckedSpan = tools.$("#allCheckedSpan");//全选
	//生成一个li
	var contentMuneFiles = document.querySelectorAll(".contentMuneFiles")[0];//ul
	//创建结构
	function createHtml(obj){
		var html = '<div class="listCot" data-file-id='+obj.id+'>'
						+'<span class="filess"></span>'
						+'<strong></strong>'
						+'<mark></mark>'
						+'<p class="names">'+obj.title+'</p>'
						+'<input type="text"/>'
					+'</div>';
		return html;
	}
	
	//得到数据
	var datas = data.files;
	//找到指定id下所有的子数据
	//初始第一层的id是为0
	var initId = 0;
	//文件区域渲染
    function createFilesHtml(datas,id){
      	var childs = dataAction.getChildsById(datas,id);  
      	var str = '';
     	for( var i = 0; i < childs.length; i++ ){
      		str += createHtml(childs[i]);
     	}
			return str;
    }


    contentMuneFiles.innerHTML = createFilesHtml(datas,initId);
	//获取文件
	var allLi = tools.$(".listCot",contentMuneFiles);
	//console.log(allLi);
	//------------------------鼠标移入li的时候操作-----------------------
	//添加移入移出时间的函数
	function moveEvent(){
		for(var i = 0; i < allLi.length;i++){
			moveFn(allLi[i])
		}
	}
	moveEvent();
	function moveFn(li){
		var strong = li.getElementsByTagName("strong")[0];//获取背景
		//console.log(strong)
		var mark = li.getElementsByTagName("mark")[0];//获取单选
		//鼠标移入li的时候，
		li.onmouseover = function(ev){
			strong.className = "listCotBg";//背景选上
			if(mark.Status){//单选状态
				mark.className = "checkeboxs";//没有点击的时候
			}else{
				mark.className = "maskHover";//点击单选的时候
			}
			ev.cancelBubble;
		}
		//鼠标移出的时候
		li.onmouseout = function(ev){
			if(mark.Status){//单选没有选上
				mark.className = "";//所有背景消失
				strong.className = "";
			}else {
				mark.className = "maskHover";//单选选上的时候，背景改变
				strong.className = "listCotBg";
			}
			ev.cancelBubble;
		}
		mark.Status = true;//单选状态没有选上的时候，是true
		//点击单选的时候
		mark.addEventListener('click',function(ev){
			
			
			if(mark.Status){
				this.className = "maskHover";//改变背景
				if(whoSelect().length === allMark.length ){//如果所有选中的项等于所有li的length
					allCheckedSpan.className = "allCheckedActive";//全选选上
					onOff = false;//改变全选的状态
				}
				strong.className = "listCotBg";//选上一个，背景改变
				mark.Status = false;
			}else {
				allCheckedSpan.className = "allCheckedBg";//全选没有选上
				onOff = true;
				mark.className = "checkeboxs";
				strong.className = "";
				mark.Status = true;
			}
			ev.stopPropagation();
		},false);
		mark.addEventListener('mousedown',function(ev){
			ev.stopPropagation();
		},false)
		
	}
	
	//全选
	var allMark = tools.$("mark",contentMuneFiles);//所有的单选
	var allStrong =tools. $("strong",contentMuneFiles);
	var onOff = true;
	allCheckedSpan.addEventListener('click',function(ev){
		if(onOff){//全选选中
			allCheckedSpan.className = "allCheckedActive";//全选背景改变
			for(var i = 0; i < allMark.length;i++){
				allMark[i].className = "maskHover";
				allStrong[i].className = "listCotBg";
				allMark[i].Status = false;
			}
			onOff = false;
			
		}else {
			//全选没有选中
			allCheckedSpan.className = "allCheckedBg";
			for(var i = 0; i < allMark.length;i++){
				allMark[i].className = "";
				allStrong[i].className = "";
				allMark[i].Status = true;
			}
			onOff = true;
		}
		ev.stopPropagation();
	},false);
	allCheckedSpan.addEventListener('mousedown',function(ev){
		ev.stopPropagation();
	},false)
	//点击新建的时候
	tools.addEvent(sets,"click",function(ev){
		
		if( sets.onOff ){
			return;
		}
		sets.onOff = true;//
		empty.style.display = "none";
		var newLi = '<div class="listCot" data-file-id='+tools.uuid()+'>'
						+'<span class="filess"></span>'
						+'<strong></strong>'
						+'<mark></mark>'
						+'<p class="names"></p>'
						+'<input type="text"/>'
					+'</div>';
		contentMuneFiles.innerHTML = newLi + contentMuneFiles.innerHTML;
		var first = contentMuneFiles.firstElementChild;
		var allP = tools.$(".names",first)[0];//文件名
		var allInput = tools.$("input",first)[0];//文本框
		allP.style.display = "none";//文字消失
		allInput.style.display = "block";//文本框显示
		allInput.focus();//自动获取焦点
		allInput.style.textAlign = "center";//焦点的位置居中
		ev.stopPropagation();
		//阻止点击输入框冒泡
		tools.addEvent(allInput,"click",function (ev){
            ev.stopPropagation();    
        });
        tools.addEvent(allInput,"mousedown",function (ev){
            ev.stopPropagation();    
        });
	});
	tools.addEvent(document,'mousedown',function(ev){
		if(sets.onOff){
			var indexsLast = tools.$("span",indexsWay)[0];
	    		var pid = indexsLast.dataset.fileId;
			var allInput = tools.$("input",contentMuneFiles)[0];//文本框
			var allP = tools.$(".names",contentMuneFiles)[0];//文件名
			var val = allInput.value;
			//导航中最后一个元素
		   
	        if(val === ""){//判断有没有输入内容
	        		contentMuneFiles.removeChild(contentMuneFiles.firstElementChild);//没有就删除结构
	        		empty.style.display = "block";
				addEventFile();
	    			moveEvent();
				if(whoSelect().length === allLi.length){
					allCheckedSpan.className = "allCheckedActive";
					onOff = false;
				}
				
			//判断有没有重名
			}else if(dataAction.reName(datas,pid,val)){
				tip.style.background = "url(img/name1.png)";
				tip.style.top = 0;
				setTimeout(function(){
					tip.style.top = "-32px";
				},2000)
				contentMuneFiles.removeChild(contentMuneFiles.firstElementChild);
				addEventFile();//点击文件
				moveEvent();//新建完后，调用移入移出函数
			}else{//如果有输入内容
				
				allInput.style.display = "none";//输入框消失
				allP.style.display = "block";//文本显示
				allP.innerHTML = val;//文本显示的内容就是输入的内容
				//数据中添加新数据
				var first = contentMuneFiles.firstElementChild;
			
				var newObj = {
					id:first.dataset.fileId,
					pid:pid,
					title:val,
					type:"file"
				}
				data.files.unshift(newObj);//新的数据放到data前
				//contentMuneFiles.innerHTML = newLi + contentMuneFiles.innerHTML;
				moveEvent();//新建完后，调用移入移出函数
				
				//新建完后所有的选中状态取消
				for(var i = 0; i < allMark.length;i++){
					allMark[i].className = "";
					allStrong[i].className = "";
					allCheckedSpan.className = "allCheckedBg";
					allMark[i].Status = true;
				}
				
				//要找到当前这个新建的文件的父级对应的左侧树形菜单，
              	//找到下一级 > ul
				
                var tree = tools.getTreeById("tree-title",pid);
                var nextUl = tree.nextElementSibling;
               	nextUl.innerHTML += view.createTreeLi(datas,newObj);

             //要让有子数据的菜单有箭头

              	tools.removeClass(tools.getTreeById("tree-title",pid),"tree-contro-none");
              	tools.addClass(tools.getTreeById("tree-title",pid),"tree-contro");
                addEventFile();//点击文件
                treeTitleClick();//点击树形菜单
				//创建成功提示
				tip.style.background = "url(img/success.png)";
				tip.style.top = 0;
				setTimeout(function(){
					tip.style.top = "-32px";
				},2000)
			}
			sets.onOff = false;
			ev.stopPropagation();
		}
	})
	sets.addEventListener("mousedown",function(ev){
		ev.stopPropagation();
	},false)
//	//如果点击的是回车键，也可以创建成功
	document.addEventListener("keydown",function(ev){
		if(sets.onOff){
			
			if(ev.keyCode === 13 ){
				var indexsLast = tools.$("span",indexsWay)[0];
		    		var pid = indexsLast.dataset.fileId;
				var allInput = tools.$("input",contentMuneFiles)[0];//文本框
				var allP = tools.$(".names",contentMuneFiles)[0];//文件名
				var val = allInput.value;
				
				if(val === ""){//判断有没有输入内容
		        		contentMuneFiles.removeChild(contentMuneFiles.firstElementChild);//没有就删除结构
					addEventFile();
		    			moveEvent();
					if(whoSelect().length === allLi.length){
						allCheckedSpan.className = "allCheckedActive";
						onOff = false;
					}
					
				//判断有没有重名
				}else if(dataAction.reName(datas,pid,val)){
					tip.style.background = "url(img/name1.png)";
					tip.style.top = 0;
					setTimeout(function(){
						tip.style.top = "-32px";
					},2000)
					contentMuneFiles.removeChild(contentMuneFiles.firstElementChild);
					addEventFile();//点击文件
					moveEvent();//新建完后，调用移入移出函数
				}else{//如果有输入内容
					allInput.style.display = "none";//输入框消失
					allP.style.display = "block";//文本显示
					allP.innerHTML = val;//文本显示的内容就是输入的内容
					//数据中添加新数据
					var first = contentMuneFiles.firstElementChild;
				
					var newObj = {
						id:first.dataset.fileId,
						pid:pid,
						title:val,
						type:"file"
					}
					data.files.unshift(newObj);//新的数据放到data前
					//contentMuneFiles.innerHTML = newLi + contentMuneFiles.innerHTML;
					moveEvent();//新建完后，调用移入移出函数
					
					//新建完后所有的选中状态取消
					for(var i = 0; i < allMark.length;i++){
						allMark[i].className = "";
						allStrong[i].className = "";
						allCheckedSpan.className = "allCheckedBg";
						allMark[i].Status = true;
					}
					
					//要找到当前这个新建的文件的父级对应的左侧树形菜单，
	              	//找到下一级 > ul
					
	                var tree = tools.getTreeById("tree-title",pid);
	                var nextUl = tree.nextElementSibling;
	               	nextUl.innerHTML += view.createTreeLi(datas,newObj);
	
	             //要让有子数据的菜单有箭头
	
	              	tools.removeClass(tools.getTreeById("tree-title",pid),"tree-contro-none");
	              	tools.addClass(tools.getTreeById("tree-title",pid),"tree-contro");
	                addEventFile();//点击文件
	                treeTitleClick();//点击树形菜单
					//创建成功提示
					tip.style.background = "url(img/success.png)";
					tip.style.top = 0;
					setTimeout(function(){
						tip.style.top = "-32px";
					},2000)
					sets.onOff = false;
				}
			}
			//
		}
		
		ev.stopPropagation();
	},false);
	
	//封装哪些是选上的
	function whoSelect(){
	        var arr = [];
	        for( var i = 0; i < allLi.length; i++ ){
	            if( tools.hasClass(allMark[i],"maskHover") ){//判断单选是选上的
	        		arr.push(allMark[i].parentNode);
	        }
	    }
	    return arr;
	}
	//删除选中的文件
	var deletes = document.querySelectorAll(".deletes")[0];
	var tip = tools.$("#tip");
	//console.log(deletes)
	/*
		点击删除的时候，1.判断有没有要删除的文件
			2.选中一个删除，选中全选删除
			3.全部删除完后，全选不能勾选
	 */
	deletes.onclick = function(ev){
		deletes.deletes = true;
		if(whoSelect().length === 0){
			//alert("请选择要删除的内容");
			tip.style.background = "url(img/d1.png)";
			tip.style.top = 0;
			setTimeout(function(){
				tip.style.top = "-32px";
			},2000)
			
		}
		for(var i = 0; i < allLi.length; i++){
			if( whoSelect().length > 0 ){//判断单选是选上的
				mask.style.display = "block";
	        		box.style.display = "block";
	        		//drag(box);//-------------------------------------------------
	        		//点击x号取消删除的时候
	        		closes.addEventListener('click',function(ev){
	        			mask.style.display = "none";//遮罩和弹框消失
	        			box.style.display = "none";
	        			deletes.deletes = false;
	        			ev.stopPropagation();
	        		},false)
	        		//点击确定的时候
	        		spanBtn[0].addEventListener('click',function(ev){ 
	        			mask.style.display = "none";
	        			box.style.display = "none";
	        			var idArr = [];
	        			for(var i = 0; i < whoSelect().length; i++){
	        				var fileId = whoSelect()[i].dataset.fileId;
						var tree = tools.getTreeById("tree-title",fileId);
                        
                        //点击到里面没有内容的时候
						if(!dataAction.hasChilds(datas,fileId)){
							empty.style.display = "block";
							
					    }else {
					    		empty.style.display = "none";
					    }
                        
                        contentMuneFiles.removeChild(whoSelect()[i]);//删除li
						tree.parentNode.parentNode.removeChild(tree.parentNode);

                        idArr.push(fileId);
						i--;
		        		}
	        			
	        			dataAction.batchDelect(datas,idArr);   
                    
					allCheckedSpan.className = "allCheckedBg";
                    
        				//删除成功提示
		        		tip.style.background = "url(img/d2.png)";
		        		tip.style.top = 0;
					setTimeout(function(){
					tip.style.top = "-32px";
					},2000)
					ev.stopPropagation();
					
					deletes.deletes = false;
	        		},false)
	        		//点击取消的时候
	        		spanBtn[1].addEventListener('click',function(ev){
	        			mask.style.display = "none";//遮罩和弹框消失
	        			box.style.display = "none";
	        			deletes.deletes = false;
	        		},false)
	        		ev.stopPropagation();
	        		
	        	}
			
		}
		ev.cancelBubble;
	};
	deletes.addEventListener('mousedown',function(ev){
		ev.stopPropagation();
	},false);
	
	//点击重命名的时候
	var changeName = document.querySelectorAll(".changeName")[0];
	
	changeName.addEventListener('click',function(ev){
		
		changeName.onOff = true;
		if(whoSelect().length === 0){//重命名没有选中的时候
			tip.style.background = "url(img/d1.png)";
			tip.style.top = 0;
			setTimeout(function(){
				tip.style.top = "-32px";
			},2000)
			return;
		}else if(whoSelect().length >1){//重命名没有选中大于1的时候
			tip.style.background = "url(img/name2.png)";
			tip.style.top = 0;
			setTimeout(function(){
				tip.style.top = "-32px";
			},2000)
			//return;
		}else{
				var mark = tools.$(".maskHover")[0];
				var div = mark.parentNode;//文件夹
				var allText = tools.$(".names",div)[0];//文件名
				var allInputText = tools.$('input',div)[0];//文本框
				allText.style.display = "none";//文字消失
				allInputText.value = allText.innerHTML;
				allInputText.select();//重命名的时候文件名是选中的
				allInputText.style.display = "block";//文本框显示
				allInputText.focus();//自动获取焦点
				allInputText.style.textAlign = "center";//焦点的位置居中
				treeTitleClick();
		}	
		
		ev.stopPropagation();
		
	},false);
	
	changeName.addEventListener('mousedown',function(ev){
		ev.stopPropagation();
	},false);
	
	document.addEventListener('mousedown',function(ev){
		
		if(changeName.onOff){
			
			var mark = tools.$(".maskHover")[0];//单选
			var div = mark.parentNode;//文件夹
			var allText = tools.$(".names",div)[0];//文件名
			var allInputText = tools.$('input',div)[0];//文本框
			var pid = div.dataset.fileId;
			var val = allInputText.value;
			if(whoSelect().length > 1){
				for (var i = 0; i < allLi.length; i++) {
					allMark[i].className = '';
					allStrong.className = '';
				}
			}else if( val == allText.innerHTML){
				allInputText.style.display = "none";//输入框消失
				allText.style.display = "block";//文本显示
				allText.innerHTML = allInputText.value;//文本显示的内容就是输入的内容
				
			}else if(dataAction.reName(datas,pid,val)){//重名了
				tip.style.background = "url(img/name1.png)";
				tip.style.top = 0;
				setTimeout(function(){
					tip.style.top = "-32px";
				},2000)
				allInputText.value = allText.innerHTML;
				
			}else{
				for(var i = 0; i < allLi.length;i++){
					allMark[i].className = "";
					allStrong[i].className = "";
					allMark[i].Status = true;
				}
				allInputText.style.display = "none";//输入框消失
				allText.style.display = "block";//文本显示
				allText.innerHTML = allInputText.value;//文本显示的内容就是输入的内容
				//操作数据
				//找到重命名的这条数据，更改数据
				var titleName = allText.innerHTML;//获取到修改的名字
				for (var i = 0; i < datas.length; i++) {
					if(datas[i].id == pid){
						datas[i].title =  titleName;
						break;
					}
				}
				
				//要找到当前这个重命名的文件的父级对应的左侧树形菜单，
              	var tree = tools.getTreeById("tree-title",pid);//获取到树形菜单的结构
                var ellipsis = tools.$('.ellipsis',tree)[0];
                ellipsis.innerHTML = titleName;
                
                
				tip.style.background = "url(img/changename.png)";
				tip.style.top = 0;
				setTimeout(function(){
					tip.style.top = "-32px";
				},2000)
				
			}
			
			changeName.onOff = false;	
		}
		ev.stopPropagation();
		
	},false);
	//如果点击的是回车键，也可以更名成功
	document.addEventListener("keydown",function(ev){
		if(changeName.onOff){
			if(ev.keyCode === 13 ){
				
				var mark = tools.$(".maskHover")[0];//单选
				var div = mark.parentNode;//文件夹
				var allText = tools.$(".names",div)[0];//文件名
				var allInputText = tools.$('input',div)[0];//文本框
				var pid = div.dataset.fileId;
				var val = allInputText.value;
				if(dataAction.reName(datas,pid,val)){//重名了
					console.log("33");
					tip.style.background = "url(img/name1.png)";
					tip.style.top = 0;
					setTimeout(function(){
						tip.style.top = "-32px";
					},2000)
					allInputText.value = allText.innerHTML;
					
				}else{
					for(var i = 0; i < allLi.length;i++){
						allMark[i].className = "";
						allStrong[i].className = "";
						allMark[i].Status = true;
					}
					allInputText.style.display = "none";//输入框消失
					allText.style.display = "block";//文本显示
					allText.innerHTML = allInputText.value;//文本显示的内容就是输入的内容
					//操作数据
					//找到重命名的这条数据，更改数据
					var titleName = allText.innerHTML;//获取到修改的名字
					for (var i = 0; i < datas.length; i++) {
						if(datas[i].id == pid){
							datas[i].title =  titleName;
							break;
						}
					}
					
					//要找到当前这个重命名的文件的父级对应的左侧树形菜单，
	              	var tree = tools.getTreeById("tree-title",pid);//获取到树形菜单的结构
	                var ellipsis = tools.$('.ellipsis',tree)[0];
	                ellipsis.innerHTML = titleName;
	                
	                
					tip.style.background = "url(img/changename.png)";
					tip.style.top = 0;
					setTimeout(function(){
						tip.style.top = "-32px";
					},2000)
				}
				changeName.onOff = false;	
			}
		}
		ev.stopPropagation();
			
	},false);
	
	/*    --------------选框----------------*/
	function getRect(obj){
		return obj.getBoundingClientRect();
	}
	function duang(obj1,obj2){
		var obj1Info = getRect(obj1);	
		var obj2Info = getRect(obj2);	
		//obj1的上下左右
		var obj1L = obj1Info.left;
		var obj1R = obj1Info.right;
		var obj1T = obj1Info.top;
		var obj1B = obj1Info.bottom;
		//obj2的上下左右
		var obj2L = obj2Info.left;
		var obj2R = obj2Info.right;
		var obj2T = obj2Info.top;
		var obj2B = obj2Info.bottom;
		//排除掉没碰上的区域

		if( obj1R < obj2L || obj1L > obj2R || obj1B < obj2T || obj1T > obj2B){
			return false;
		}else{
			return true;
		}
	}
	var disX = disY = 0;
	var newDiv = null;
	var shadowTarget = null;
    var tips = null;
	document.addEventListener("mousedown", function(ev){
		var target = ev.target;
        ev.preventDefault(); 
		if(tools.parents(target,".tree-menu") || tools.parents(target,".left") || tools.parents(target,".handleFile") || deletes.deletes || navMove.isMove ){
			return;
		}
		newDiv = document.createElement("div")
		newDiv.className = "selectBox";
		newDiv.style.left = ev.clientX + "px";
		newDiv.style.top = ev.clientY + "px";
		disX = ev.clientX;
		disY = ev.clientY;
		
		//拖拽移动
        if( tools.parents(target,".listCot") ){
       
            tools.addEvent(document,"mousemove",moveFileFn);
            tools.addEvent(document,"mouseup",upFileFn);
            shadowTarget = tools.parents(target,".listCot");//获取到的是文件夹
            
            return;
        }
		
		rightList.style.display = "none";
		document.addEventListener("mousemove",moveFunc,false); 
		
		document.addEventListener("mouseup",upFunc,false);
		//在全选的时候，把全选取消掉
		//全选没有选中
			allCheckedSpan.className = "allCheckedBg";
			for(var i = 0; i < allMark.length;i++){
				allMark[i].className = "";
				allStrong[i].className = "";
				allMark[i].Status = true;
			}
			onOff = true;
		ev.stopPropagation();
		if(!sets.onOff){
			ev.preventDefault();		
		}
	},false);
	
	
	
	var shadow = null;
    var isDrag = false;  //是否正在拖拽剪影
    var pengObj = null;  //碰上的那个元素
    function moveFileFn(ev){
    
        if( Math.abs(ev.clientX - disX) > 10 ||  Math.abs(ev.clientY - disY) > 10 ){
           
            if(!shadow){
                shadow = view.moveFileShadow();//剪影
                document.body.appendChild(shadow);
                shadow.style.display = 'block';
                tips = document.createElement("div");
                tips.style.cssText = 'width:30px;height: 30px;position:absolute;left:0;top:0;'
                document.body.appendChild(tips);
                
            }

            isDrag = true;

            tips.style.left = ev.clientX + 'px';
            tips.style.top = ev.clientY + 'px';

            shadow.style.left = ev.clientX+5 + 'px';
            shadow.style.top = ev.clientY+5 + 'px';
			//分割线
			var fileCk = tools.$('mark',shadowTarget)[0];
			var fileBg = tools.$('strong',shadowTarget)[0];
            if( !tools.hasClass(fileCk,"maskHover") ){//拖动单个文件如果没有选上
				//清空所有的
                for(var i = 0; i < allMark.length;i++){
					allMark[i].className = "";
					allStrong[i].className = "";
					allMark[i].Status = true;
				}
				//allCheckedSpan.className = "allCheckedBg";
				
                tools.addClass(fileBg,"listCotBg");
                tools.addClass(fileCk,"maskHover");
				onOff = true;
            }

            //计数

            var selectArr = whoSelect();

            var sum = tools.$(".sum",shadow)[0];
            var icons = tools.$(".icons",shadow)[0];
			sum.innerHTML = selectArr.length;
            
            var str = '';
            var len = selectArr.length > 4 ? 4 : selectArr.length;

            for( var i = 0; i < len; i++ ){
                str += '<i class="icon icon'+i+' filetype icon-folder"></i> '
            }

            icons.innerHTML = str;

            pengObj = null;

            //碰撞检测

            for( var i = 0; i < allLi.length; i++ ){
                //要碰撞的元素是否存在于被选中的数组中
                if(!indexOf(selectArr,allLi[i]) && tools.duang(tips,allLi[i])  ){
                    allLi[i].style.background = "pink";
                    pengObj = allLi[i];
                }else{
                    allLi[i].style.background = "";
                        
                }

            }
        }
    }



    function indexOf(arr,item){
        for( var i = 0; i < arr.length; i++ ){
            if( arr[i] === item ){
            return true;
            }
        }  

        return false;
    }

    function upFileFn(ev){
    		tools.removeEvent(document,"mousemove",moveFileFn);
        tools.removeEvent(document,"mouseup",upFileFn);
        if( shadow ){
            document.body.removeChild(shadow);
            document.body.removeChild(tips);

            shadow = null;
        }   
        //如果被碰上的元素存在
        //1 .把选中的元素对应的数据的pid变成被碰上的元素对应的id
        //2 
        if( pengObj ){
                var moveId = pengObj.dataset.fileId;
                var selectArr = whoSelect();

                var childsTitle = dataAction.getChildsById(datas,moveId);
                var a = true;
                b:for( var i = 0; i < selectArr.length; i++ ){
                    a = true;
                    var getData = dataAction.getDataById(datas,selectArr[i].dataset.fileId);
                    //要移动的数据，不能存在于被移入的数据的子数据中 
                    //判断的依据是数据的 title
                    for( var j = 0; j < childsTitle.length; j++ ){
                        if( childsTitle[j].title == getData.title ){
                            //fullTip("warn","部分移动失败,重名了");
                            alert("warn部分移动失败,重名了");
                            a = false;
                           // continue b;
                            break;
                        }
                    }

                    if( a ){
                         getData.pid = moveId;
                    }  
                }

                //文件区域渲染
                var cur = tools.$(".current-path")[0].dataset.fileId;
                
                //分割线
                contentMuneFiles.innerHTML = createFilesHtml(datas,cur);
                //菜单区域渲染
                treeMenu.innerHTML = view.createTreeHtml(datas,-1);
                //定位到某个菜单上
                tools.addClass(tools.getTreeById("tree-title",cur),"tree-nav");

                pengObj = null;
				addEventFile();//点击文件
				treeTitleClick();//点击树形菜单
				moveEvent();//鼠标移入移出函数
        }else{//没碰上
        		
//      		if( whoSelect().length == 1 ){
//      			for (var i = 0; i < allLi.length; i++) {
//					allMark[i].className = '';
//					allStrong[i].className = '';
//					allMark[i].Status = true;
//				}
//      		}
			//allMark[i].Status = false;
			isDrag  =false;
		}
        ev.stopPropagation();
    }
	
	//框选移动
	//document上移动
	function moveFunc(ev){
		//判断拉出来的选取宽或高大于20像素的时候再生成div
		if(Math.abs(ev.clientX - disX) > 20 || Math.abs(ev.clientY - disY) >20){
			//在移动的时候才生成
			document.body.appendChild(newDiv);
			newDiv.style.width = Math.abs(ev.clientX - disX) + "px";
			newDiv.style.height = Math.abs(ev.clientY - disY) + "px";
			newDiv.style.left = Math.min(ev.clientX , disX) + "px";
			newDiv.style.top = Math.min(ev.clientY , disY) + "px";
			//如果选框碰到div的某一项，就改变div颜色
			for(var i = 0; i < allLi.length; i++){
				if(duang(newDiv,allLi[i])){//如果框选碰到了li
					allMark[i].className = "maskHover";//单选选中
					allStrong[i].className = "listCotBg";//添加背景
					allMark[i].Status = false;//改变单选状态
					if(whoSelect().length == allLi.length){//如果选中了所有的li
						allCheckedSpan.className = "allCheckedActive";//全选选上
						onOff = false;//改变全选的状态
					}
				}else{
					allMark[i].className = "";
					allStrong[i].className = "";
					allCheckedSpan.className = "allCheckedBg";
					onOff = true;
				}
			}
		}
		ev.stopPropagation();
	};
	//抬起
	function upFunc(ev){
		document.removeEventListener("mousemove",moveFunc,false);
		document.removeEventListener("mousemove",upFunc,false);
		var newDiv = document.querySelectorAll(".selectBox")[0];//抬起的时候获取一下这个选框div
		if(newDiv){//如果能获取到这个选框再删除
			document.body.removeChild(newDiv)
		}
		ev.stopPropagation();
	};
	
	
	
//------------------移动到-----------------------
var navMove = tools.$(".navMove")[0];//移动到

    tools.addEvent(navMove,"click",function (){
        var selectArr = whoSelect();
        if( selectArr.length === 0 ) {
            //alert("warn","请选择要移动的");
            tip.style.background = "url(img/d1.png)";
			tip.style.top = 0;
			setTimeout(function(){
				tip.style.top = "-32px";
			},2000)
			
        }else{
			//出现弹框
			mask.style.display = "block";
            navMove.isMove = true;
			var moveId = 0;  //保存选择要移动文件的id
			var isMove = true;  //默认是不可以关闭
			
			dialog({
            		title:"选择存储位置",
                content:view.moveDialogHtml(),
                okFn:function (){
                		//可以移动
                    if( !isMove ){

                        //移动数据

                        //3. 3. 可以移动的文件夹下，重名的不能移动

                        var childsTitle = dataAction.getChildsById(datas,moveId);
                        var a = true;
                        b:for( var i = 0; i < selectArr.length; i++ ){
                             a = true;
                            var getData = dataAction.getDataById(datas,selectArr[i].dataset.fileId);
                            
                            //要移动的数据，不能存在于被移入的数据的子数据中 
                            //判断的依据是数据的 title
                            for( var j = 0; j < childsTitle.length; j++ ){
                                if( childsTitle[j].title == getData.title ){
                                    alert("warn","部分移动失败,重名了");
                                    a = false;
                                   // continue b;
                                    break;
                                }
                            }
							
                            if( a ){
                                 getData.pid = moveId;
                            }  
                        }
						
						
                        //文件区域渲染
                        var cur = tools.$(".current-path")[0].dataset.fileId;
                        //分割线
                        contentMuneFiles.innerHTML = createFilesHtml(datas,cur);
                        //菜单区域渲染
                        treeMenu.innerHTML = view.createTreeHtml(datas,-1);
                        //定位到某个菜单上
                        tools.addClass(tools.getTreeById("tree-title",cur),"tree-nav");
                        navMove.isMove = false;
                        addEventFile();//点击文件
						treeTitleClick();//点击树形菜单
						moveEvent();//鼠标移入移出函数
						
                    }
                    //点击到里面没有内容的时候
					if(!dataAction.hasChilds(datas,cur)){
						empty.style.display = "block";
						
				    }else {
				    		empty.style.display = "none";
				    }
						
					return isMove;       
                }
            }); 
			
            //弹框的父级
            var fullPop = tools.$(".full-pop")[0];


            //渲染弹框中的树形菜单
            var dirTree = tools.$(".dirTree",fullPop)[0];
            tools.addClass(dirTree,"tree-menu-comm");
            dirTree.innerHTML = view.createTreeHtml(datas,-1);
			//填写内容
            var fileName = tools.$(".file-name",fullPop)[0];
            var fileNum = tools.$(".file-num",fullPop)[0];
            var selectFirstId = selectArr[0].dataset.fileId;

            //错误信息提示
            var error = tools.$(".error",fullPop)[0];

            fileName.innerHTML = dataAction.getDataById(datas,selectFirstId).title;
            if( selectArr.length>1 ){

                fileNum.innerHTML = '等 '+selectArr.length+' 个文件 ';
            }

            var prevId = 0;


            tools.addEvent(dirTree,"click",function (ev){
                var target = ev.target;

                if( target = tools.parents(target,".tree-title") ){

                    isMove = false;

                    //点击菜单的那个id
                    var clickFileId = target.dataset.fileId;
                    tools.removeClass(tools.getTreeById("tree-title",prevId,dirTree),"tree-nav");
                    tools.addClass(target,"tree-nav");

                    prevId = clickFileId;
					/*
                        1. 不能移动到被移动的这些元素的父级上
                        2. 不能移动到本身或子元素下
                        3. 可以移动的文件夹下，重名的不能移动
                    */ 

                    error.innerHTML = "";

                    //被移动的元素的父id
                    var firstSelectId = selectArr[0].dataset.fileId;

                    var parent = dataAction.getParent(datas,firstSelectId);

                    if( clickFileId == parent.id ){
                        error.innerHTML = "文件已经在当前文件夹下";
                        isMove = true;
                    }

                    //2. 不能移动到本身或子孙元素下
                    //[1,2,3,4,5]

                    //selectArr 选中元素的集合
                    //clickFileId 点击树形菜单的那个菜单的id

                    for( var i = 0; i < selectArr.length; i++ ){
                        //找到选中元素的所有的子孙数据
                        var selectId = selectArr[i].dataset.fileId;
                        var childs = dataAction.getChildsAll(datas,selectId);

                        for( var j = 0; j < childs.length; j++ ){
                            if( childs[j].id == clickFileId ){
                                error.innerHTML = "不能移动到本身或子孙元素下";
                                isMove = true;
                                break;
                            }
                        }
                    }

                    moveId = clickFileId;


                } 
            })
		}
    })

	tools.addEvent(navMove,"mousedown",function (ev){
		ev.stopPropagation();
	})



//------------------------------------------操作数据--------------------------

//contentMuneFiles 文本区容器
//allLi 所有的文件
//给所有的文件添加点击处理
addEventFile();
function addEventFile(){
    for( var i = 0; i < allLi.length; i++ ){
        tools.addEvent(allLi[i],"click",function (ev){
        		if(ev.target.nodeName !== "MARK" && contextmenuonOff){//如果点击的不是单选
        			 
        			rightList.style.display = "none";//右击自定义菜单
        			var fileId = this.dataset.fileId;  //找到这个文件的id
				var childs = dataAction.getChildsById(datas,fileId);//通过父文件的id找到子文件的id
				
				contentMuneFiles.innerHTML = createFilesHtml(datas,fileId);
				
				
				//点击到里面没有内容的时候
				if(!dataAction.hasChilds(datas,fileId)){
					empty.style.display = "block";
					
			    }else {
			    		empty.style.display = "none";
			    }
			    
			    
			    //生成完结构后，让文件有点击事件处理程序
				addEventFile();
				//为每个子元素添加移入移出事件
				moveEvent();
				//再点击的时候，生成导航区域的结构
				indexsWay.innerHTML = createPathNavConstruct(datas,fileId);
				
				var tree = getTreeById("tree-title",fileId);
				
				tools.removeClass(prevObj,"tree-nav");
				tools.addClass(tree,"tree-nav");
				
				prevObj = tree;
				
				
			}
			ev.stopPropagation();
        });
    }
}

 //文件导航区域
var indexsWay = tools.$(".indexsWay")[0];//路径导航
function createPathNavConstruct(datas,id){
      //初始的时候找到指定id的所有的父级
    var parents = dataAction.getParentsById(datas,id).reverse();
    //根据数据生成文件导航的结构
    var str = '';
    var zIndex = parents.length+10;

   	for( var i = 0; i < parents.length-1; i++ ){
      	 str += '<a href="javascript:;"'
       	+' style="z-index:'+(zIndex--)+'" data-file-id="'+parents[i].id+'">'+parents[i].title+'</a>';
                                 
   	}
   	str += '<span class="current-path" style="z-index:'+zIndex+'" data-file-id="'+parents[parents.length-1].id+'">'+parents[parents.length-1].title+'</span>';   
    return str;
}
indexsWay.innerHTML = createPathNavConstruct(datas,initId);

//利用事件委托，把点击处理添加在文件导航区域的容器indexsWay
	indexsWay.addEventListener('click',function(ev){
		var target = ev.target;
        if( target.nodeName === "A" ){
            var fileId = target.dataset.fileId;
            //点击到里面没有内容的时候
			if(!dataAction.hasChilds(datas,fileId)){
				empty.style.display = "block";
				
		    }else {
		    		empty.style.display = "none";
		    }
			//点击导航区域渲染文件区域的内容
            contentMuneFiles.innerHTML = createFilesHtml(datas,fileId);
            addEventFile();
            moveEvent();
            //点击导航区域渲染点击导航区域
          	indexsWay.innerHTML = createPathNavConstruct(datas,fileId);

            var tree = getTreeById("tree-title",fileId);

                tools.removeClass(prevObj,"tree-nav");
                tools.addClass(tree,"tree-nav");

                prevObj = tree;

      	}
	},false)
  
  

  
//树形菜单区域

    var treeMenu = tools.$(".tree-menu")[0];
	function createTreeHtml(datas,id){
        var tree_childs = dataAction.getChildsById(datas,id);
		var html =   '<ul>';

          	for( var i = 0; i < tree_childs.length; i++ ){
            //有一个阶梯状的树形菜单，需要给div缩进一下，padding-left 相差是14px
            //问题：当这个id在树形菜单中是第几级？？？
			var level = dataAction.getLevel(datas,tree_childs[i].id);

            /*
              背景      tree-nav
              是否有图标   没有图标 tree-contro-none
              图标是展开还是关闭的  展开的 tree-contro
            */

            var treeNav = id === -1 ? "tree-nav" : "";
           //没有子级就添加 tree-contro-none 有子级默认都是展开的 添加tree-contro

            //判断某个id下是否有子级
            var hasChild = dataAction.hasChilds(datas,tree_childs[i].id);

            var treeContro = hasChild ? "tree-contro" : "tree-contro-none";


                html += '<li>'
	                +'<div data-file-id="'+tree_childs[i].id+'" class="tree-title '+treeNav+' '+treeContro+'" style="padding-left:'+level*14+'px;">'
	                    +'<span>'
	                        +'<strong class="ellipsis">'+tree_childs[i].title+'</strong>'
	                        +'<i class="ico"></i>'
	                    +'</span>'
	                +'</div>'

                html += createTreeHtml(datas,tree_childs[i].id);

                html += '</li>'

            }


        html += '</ul>';

        return html;
    }

    treeMenu.innerHTML = createTreeHtml(datas,-1);
    
    
    
   
 //找到所有的树形菜单的标题 div tree-title

   	var treeTitle = tools.$(".tree-title");

   	var prevObj = treeTitle[0];
   //树形菜单点击事件
   	treeTitleClick();
   	
	function treeTitleClick(){
		for( var i = 0; i < treeTitle.length; i++ ){
	        tools.addEvent(treeTitle[i],"click",function (){
	            var fileId = this.dataset.fileId;
				//点击到里面没有内容的时候
				if(!dataAction.hasChilds(datas,fileId)){
					empty.style.display = "block";
					
			    }else {
			    		empty.style.display = "none";
			    }
	         //点击导航区域渲染文件区域的内容
	        		contentMuneFiles.innerHTML = createFilesHtml(datas,fileId);
	            addEventFile();
	            moveEvent();
	         //点击导航区域渲染点击导航区域
	            indexsWay.innerHTML = createPathNavConstruct(datas,fileId);

	            var tree = getTreeById("tree-title",fileId);
	
	                tools.removeClass(prevObj,"tree-nav");
	                tools.addClass(tree,"tree-nav");
	
	                prevObj = tree;
	        })
	    }
	}
      
   
    getTreeById("tree-title",2)

   //找到某一类class的元素，身上自定属性（格式：data-file-id），匹配到的元素

    function getTreeById(classNams,id){
        var classElement = tools.$("."+classNams);

        for( var i = 0; i < classElement.length; i++ ){
            if( classElement[i].dataset.fileId == id ){
            		return  classElement[i];
            }
        }

        return null;
    }
    
   	
  //在文本区域点击右击的时候
  	var rightList = tools.$('#rightList');
  	var contentMuneRight = tools.$('.contentMuneRight');//右侧容器
  	var contextmenuonOff = true;
	document.addEventListener('contextmenu',function(ev){
		
		
		
		if(contextmenuonOff ){
			var target = ev.target;
			target = tools.parents(target,".listCot");
			var li = tools.parents(target,".listCot");
			
//			for (var i = 0; i < allLi.length; i++) {
//				
//				if(allLi[i] === li){
//					
//					for (var i = 0; i < allLi.length; i++) {
//						allMark[i].className = "";
//						allStrong[i].className = "";
//						allMark[i].Status = true;
//						rightList.style.display = "none";
//						
//					}
//					var checked = tools.$('mark',li)[0];//单选
//			        var flieBg = tools.$('strong',li)[0];//背景
//					
//					checked.className = 'maskHover';
//					flieBg.className = 'listCotBg';
//					checked.Status = false;
//					rightList.style.display = "block";
//					rightList.style.left = ev.clientX + "px";
//					rightList.style.top = ev.clientY + "px";
//				}
//
//			}
			
			
			if( target = tools.parents(target,".listCot") ){
					
					
					var li = tools.parents(target,".listCot");
					var checked = tools.$('mark',li)[0];//单选
					var flieBg = tools.$('strong',li)[0];//背景
					checked.className = 'maskHover';
					flieBg.className = 'listCotBg';
					checked.Status = false;
					rightList.style.display = "block";
					rightList.style.left = ev.clientX + "px";
					rightList.style.top = ev.clientY + "px";

				
			}
			!contextmenuonOff;
		}
		ev.preventDefault();//先阻止浏览器默认行为的出现
		ev.stopPropagation();
	},false);
	

	var rightDelete = tools.$('.right_delete',rightList)[0];//删除
	var rightMove = tools.$('.right_move',rightList)[0];//移动到
	var rightResetName = tools.$('.right_reset_name',rightList)[0];//重命名
	//删除
	rightDelete.addEventListener('mousedown',function(ev){
		rightList.style.display = "none";
		deletes.click();
		ev.stopPropagation();
	},false);
	
	//移动到
	rightMove.addEventListener('mousedown',function(ev){
		rightList.style.display = "none";
		navMove.click();
		ev.stopPropagation();
	},false);
	//重命名
	rightResetName.addEventListener('click',function(ev){
		rightList.style.display = "none";
		changeName.click();
		ev.stopPropagation();
	},false);
	rightResetName.addEventListener('mousedown',function(ev){
		ev.stopPropagation();
	},false);
	
	
}());		
	


