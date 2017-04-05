chrome.runtime.onMessage.addListener(function (request, sender, callback){
	if(request.action == "xhttp"){
		var xhttp = new XMLHttpRequest();
		xhttp.onload = function(){
			var response = xhttp.responseText;
			callback(response);
		};
		
		xhttp.open(request.method, request.url, true);
		if(request.method == 'POST'){
			xhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
			
		}
		xhttp.send(request.data);
		return true;
	}
});
