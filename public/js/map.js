var auth;
var urlroot = location.protocol + '//' + location.host + '/';
var map;

var drawcontrol, drawitems;

$(function(){
	$.get(urlroot + 'auth', function(data){
		auth = data;
		generateMap();
	});
});

function generateMap(){
	map =  L.map('lmap').setView([38.935085, -43.422855], 4);

	if(!auth.mapid || !auth.token){
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

	drawitems = new L.FeatureGroup();
	map.addLayer(drawitems);

	L.drawLocal.draw.toolbar.buttons.rectangle = 'Draw Bounding Box';
	
	// creating the draw control
	// for now just allowing a bounding box square for the geometry to be generated within
	drawcontrol = new L.Control.Draw({
		draw: { 
			marker: false,
			polyline: false,
			circle: false,
			polygon: false
		},
		edit: {
			featureGroup: drawitems
		}
	});
	map.addControl(drawcontrol);

	map.on('draw:created', function(e){
		map.addLayer(e.layer);
	});


}
