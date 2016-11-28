;(function(){
	
	var H = document.documentElement.clientHeight;
	var list = document.querySelector(".list");
	var allLi = list.getElementsByTagName("li");
	
	for(var i=0; i <  allLi.length; i++){
		fn(allLi[i]);
	}
	function fn(li){
		MTouch(li).swipeUp(
			function(){
				MTween(li,{"translateY":-H},700,"easeIn",function(){
					li.style.display = "none";
					MTween(li,{"translateY":0},700,"easeIn");
					if(li.nextElementSibling){
						console.log(11);
						li.nextElementSibling.style.display = "block";
					}else {
						list.firstElementChild.style.display = "block";
						console.log(list.firstElementChild);
						//li.nextElementSibling.style.display = "none";
					}
					
					
				});
				//li.style.display = "none";
				
			}
		);
	
	}
	
	
	
})();
