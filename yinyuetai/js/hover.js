// JavaScript Document

window.onload = function(){
	
	var oUl = document.getElementById('example-ul');
	var aLi = oUl.getElementsByTagName('li');
		
	for(var i=0; i<aLi.length; i++){
		aLi[i].onmouseover = function(){
			for(var j=0; j<aLi.length; j++){
				aLi[j].className = 'exampleList';	
			}
			this.className = "exampleList list_active";	
		}
	}
	
}