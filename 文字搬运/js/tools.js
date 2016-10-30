// JavaScript Document
function $(selector,context){
	context = context || document
	var char = selector.charAt(0);
	if(char==="#"){
		return document.getElementById(selector.substring(1));
	}else if(char === "."){
		return context.getElementsByClassName(selector.substring(1));
	}else {
		return context.getElementsByTagName(selector);
		
		
	}
}
