var token;
var urlroot = location.protocol + '//' + location.host + '/';
var map;

$(function(){
	$.get(urlroot + 'auth', function(data){
		token = data;
		generateMap();
	});
});

function generateMap(){
	map =  L.map('lmap').setView([38.935085, -43.422855], 4);

	L.tileLayer('http://api.tiles.mapbox.com/v4/{mapId}/{z}/{x}/{y}.png?access_token={token}', {
	    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
	    maxZoom: 18,
	    mapId: token,
	    token: 'pk.eyJ1Ijoiam9uZXNtdHR3IiwiYSI6ImVQWlpITUkifQ.LTDAo3Z7FdctyG1GqlwfMg'
	}).addTo(map);
}
