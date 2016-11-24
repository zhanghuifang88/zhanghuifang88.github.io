;(function(){
	var registerBack = document.querySelector(".registerBack");
	registerBack.addEventListener('touchstart', function(e) {
		registerBack.href="login.html";
		e.stopPropagation();
	});
	
	
	//注册框
	var registerNum = document.querySelector(".registerNum");
	
	registerNum.addEventListener('touchstart', function(e) {
		registerPassword.disabled = false;
		registerBtn.disabled = false;
		e.stopPropagation();
	});
	
	registerNum.addEventListener('blur', function(e) {
		e.stopPropagation();
		var re = /^[1,9]\d{10}$/;
		var val = this.value;
		
		if( re.test(val) ){
			for(var attr in localStorage){
				if(attr == val){
					alert('用户名已存在,请重新输入');
					this.value = "";
				}
			}
		}else{
			alert("手机号不存在,请重新输入");
			registerPassword.disabled = true;
			registerBtn.disabled = true;
			
		}	
		
	});
	
	//密码
	
	var registerPassword = document.querySelector(".registerPassword");
	registerPassword.addEventListener('touchstart', function(e) {
		e.stopPropagation();
		registerNum.disabled = false;
		registerBtn.disabled = false;	
		
	});
	registerPassword.addEventListener('blur', function(e) {
		e.stopPropagation();
		var val = this.value;
		var re3 = /^(?=.*[a-zA-Z])(?=.*[0-9])\w{6,12}$/g;
		if( re3.test(val)){
			registerPassword.disabled = false;
			registerBtn.disabled = false;
			
		}else{
			//alert("密码格式输入不正确");
			registerNum.disabled = true;
			registerBtn.disabled = true;
		}	

	});
	
	//注册按钮
	var registerBtn = document.querySelector(".registerBtn");
	registerBtn.addEventListener('touchstart', function(e) {
		e.stopPropagation();
		
		var telV = registerNum.value;
		var passV = registerPassword.value;
		if(telV == "" && passV == ""){
			registerBtn.disabled = true;
			alert("请先注册");
		}else {
			registerBtn.disabled = false;
			localStorage.setItem(telV,passV);
			alert("注册成功");
			open("login.html");
		}	
	});
	
})();
