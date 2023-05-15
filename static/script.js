function getHistory(){
	return document.getElementById("history-value").innerText;
}
function printHistory(num){
	document.getElementById("history-value").innerText=num;
}
function getOutput(){
	return document.getElementById("output-value").innerText;
}
function printOutput(num){
	if(num==""){
		document.getElementById("output-value").innerText=num;
	}
	else{
		document.getElementById("output-value").innerText=getFormattedNumber(num);
	}	
}
function getFormattedNumber(num){
	if(num=="-"){
		return "";
	}
	var n = Number(num);
	var value = n.toLocaleString("en");
	return value;
}
function reverseNumberFormat(num){
	return Number(num.replace(/,/g,''));
}
var operator = document.getElementsByClassName("operator");
for(var i =0;i<operator.length;i++){
	operator[i].addEventListener('click',function(){
		if(this.id=="clear"){
			printHistory("");
			printOutput("");
		}
		else if(this.id=="backspace"){
			var output=reverseNumberFormat(getOutput()).toString();
			if(output){//if output has a value
				output= output.substr(0,output.length-1);
				printOutput(output);
			}
		}
		else{
			var output=getOutput();
			var history=getHistory();
			if(output==""&&history!=""){
				if(isNaN(history[history.length-1])){
					history= history.substr(0,history.length-1);
				}
			}
			if(output!="" || history!=""){
				output= output==""?output:reverseNumberFormat(output);
				history=history+output;
				if(this.id=="="){
					var result=eval(history);
					printOutput(result);
					printHistory("");
				}
				else{
					history=history+this.id;
					printHistory(history);
					printOutput("");
				}
			}
		}
		
	});
}
function calc(number){
  for(var i =0;i<number.length;i++){
  	number[i].addEventListener('click',function(){
  		var output=reverseNumberFormat(getOutput());
  		if(output!=NaN){ //if output is a number
  			output=output+this.id;
  			printOutput(output);
  		}
  	});
  }
}
var number = document.getElementsByClassName("number");
calc(number);
var zero = document.getElementsByClassName("zero");
calc(zero);

function clicked() {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "https://api.countapi.xyz/hit/osmiumNetwork/EduKit");
    xhr.responseType = "json";
    xhr.onload = function() {
        alert(`You are the ${this.response.value} person to get rolled`);
    }
    xhr.send();
}

function openInNewTab(url) {

  win = window.open();
  win.document.body.style.margin = '0';
  win.document.body.style.height = '100vh';

  var iframe = win.document.createElement('iframe');
  iframe.style.border = 'none';
  iframe.style.width = '100%';
  iframe.style.height = '100%';
  iframe.style.margin = '0';
  iframe.id = 'content';
  iframe.src = url;
  win.document.body.appendChild(iframe);

}

const equalButton = document.getElementById("=");
const addButton = document.getElementById("+");
equalButton.addEventListener("click", () => {
	count += 1;
	c = 0;
	
	if (count == 3) {
	  count = 0;
	  openInNewTab(window.location.href + "search.html");
	};
});

addButton.addEventListener("click", () => {
	count = 0;
	c += 1;
		 
	if (c === 3) {
		c=0;
		document.body.innerHTML = `
			<video width="100%" height="100%" autoplay onplay="clicked()">
			<source src="roll.mp4" type="video/mp4">
			Your browser does not support HTML5 video.
			</video>`;
	}
});