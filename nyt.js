
$("#button").on("click", function() {
	// api stuff
	var authKey = "b9f91d369ff59547cd47b931d8cbc56b:0:74623931";
	var queryURLBase = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=" +
	 authKey + "&q=";

	// initialize values
	var searchTerm = $("#searchBox").val();
	var records = $("#numRec").val();

	// check for valid dates
	if(parseInt($("#startDate").val()) < 1900 && parseInt($("#startDate").val()) > 2017){
		alert("Date Invalid");
		return false;
	}
	var startDate = parseInt($("#startDate").val());

	var endDate = NaN;
	if(parseInt($("#endDate").val()) > 1900){
		endDate = parseInt($("#endDate").val());
	}

	// construct api url
	var queryURL = queryURLBase + searchTerm + records + startDate;

	if(endDate != NaN){
		queryURL = queryURL + endDate;
	}

	$.ajax({
	        url: queryURL,
	        method: "GET"
	      }).done(function(response) {
	      	
	      	console.log("response");
	      	var results = response.data;

	      });
});

function printStuff(input, index){

}