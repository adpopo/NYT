//search button
$("#search").on("click", function() {
	// initialize values
	var searchTerm = $("#SearchTerm").val();
	var records = $("#numRec").val();
	var startDate = parseInt($("#startYear").val());

	// check for valid start date
	if(startDate < 1851 || startDate > 2017){
		alert("Date Invalid");
		return false;
	}
	startDate += "0101";

	// check for valid end date
	console.log(parseInt($("#endYear").val()));
	var endDate = "20171231";
	if(parseInt($("#endYear").val()) > 1851 &&
		parseInt($("#endYear").val()) > parseInt($("#startYear").val())){
		endDate = parseInt($("#endYear").val()) + "0101";
	}
	console.log(endDate);

	// construct api url
	var queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
	queryURL += '?' + $.param({
	  'api-key': "b9f91d369ff59547cd47b931d8cbc56b:0:74623931",
	  'q': searchTerm,
	  'begin_date': startDate,
	  'end_date': endDate
	});

	$.ajax({
	        url: queryURL,
	        method: "GET"
	      }).done(function(response) {
	      	
	      	var results = response.response.docs;

	      	//create box to put articles in
	      	var articles = $("<div>");
	      	articles.html("Top Articles");
	      	articles.addClass("articleBox");
	      	$("#articles").html(articles);

	      	//loop through and insert articles
	      	for(var i = 0; i<records; i++){
	      		$("#articles").append(printStuff(results, i));
	      	}

	      });
});

//function to generate html for each article
//takes 2 arguments: the ajax return.docs object and the index of the article in the arry
//returns a div
function printStuff(input, i){
	var article = input[i];
	var newDiv = $("<div>");
	newDiv.addClass("article");
	//generate headline
	newDiv.html("<h2><a href='" + article.web_url + "'>" + article.headline.main + "</a></h2>");
	newDiv.append("<h3>" + article.byline.original + "</h3>");
	//article timecode
	newDiv.append("<br><p>" + article.pub_date + "</p>");
	//article link
	newDiv.append("<a href='" + article.web_url + "'>" + article.web_url + "</a>")
	//article number box
	var numBox = $("<button>");
	numBox.addClass("btn btn_primary");
	numBox.html(i+1);
	newDiv.prepend(numBox);

	return newDiv;
}

//clear button
$("#clear").on("click", function() {
	$("#articles").empty();
});