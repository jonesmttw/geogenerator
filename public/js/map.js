var auth;
var urlroot = location.protocol + '//' + location.host + '/';
var map;

$(function(){
	$.get(urlroot + 'auth', function(data){
		auth = data;
		generateMap();
	});
});

function generateMap(){
	map =  L.map('lmap').setView([38.935085, -43.422855], 4);

	if(!auth){
		L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
		    attribution: 'Map data © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors',
		    maxZoom: 18,
		}).addTo(map);
	} else {
		L.tileLayer('http://api.tiles.mapbox.com/v4/{mapId}/{z}/{x}/{y}.png?access_token={token}', {
		    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
		    maxZoom: 18,
		    mapId: auth.mapid,
		    token: auth.token
		}).addTo(map);
	}
}
