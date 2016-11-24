;(function(){
	var loginBack = document.querySelector(".loginBack");
	loginBack.addEventListener('touchstart', function(e){
		console.log(111);
		loginBack.href="index.html";
		e.stopPropagation();
	});
	//用户名
	var phNum = document.querySelector(".phNum");
	phNum.addEventListener('touchstart', function(e){
		e.stopPropagation();
	});
	//密码
	var passwords = document.querySelector(".passwords");
	passwords.addEventListener('touchstart', function(e){
		e.stopPropagation();
	});
	//登录
	var onOff = false;
	var loginBtn = document.querySelector(".loginBtn");
	var tips = document.querySelector(".tips");
	loginBtn.addEventListener('touchstart', function(e){
		console.log(111);
		e.stopPropagation();
		var userName = phNum.value;
		var passWord = passwords.value;
		for(var key in localStorage){
			var val = localStorage[key];
			console.log(111);
			if(userName == key && passWord == val){
				onOff = true;
				
			}else {
				console.log(333);
				tips.innerHTML = "用户名或密码不正确";
				phNum.value = "";
				passwords.value = "";
			}
		};
		if(onOff){
			console.log(222);
			tips.innerHTML = "登录成功";
			onOff = false;
			open('index.html');
		}
	});
	
	
	
	//去注册
	var goRegister = document.querySelector(".goRegister");
	goRegister.addEventListener('touchstart', function(e) {
		goRegister.href="register.html";
		e.stopPropagation();
	});
})();
