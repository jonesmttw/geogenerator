var auth;
var urlroot = location.protocol + '//' + location.host + '/';
var map;
var randomgeo;
var geoslider;

var drawcontrol, drawitems;

$(function(){
	$.get(urlroot + 'auth', function(data){
		auth = data;
		generateMap();
	});

	geoslider = $('#num-geo').slider({
		tooltip_position: 'bottom',
		formatter: function(value) {
			return 'Current value: ' + value;
		}
	});

	$('#geo-type .btn').click(function(){
		$('#geo-type .btn.active').removeClass('active');
		$(this).addClass('active');
	});

	$('#btn-draw').click(function(){
		if(drawitems.length()){
			var bbox = boundsToArray(drawitems.getLayers()[0].getBounds()),
			shape = $('#geo-type .btn.active').data('geo'),
			geo = turf.random(shape, geoslider.slider('getValue'), { bbox: bbox, max_verticies: randomNumVerticies(shape, 10) });
			
			if(shape === 'polyline'){
				for(var i = 0; i < geo.features.length; i++){
					geo.features[i].geometry.coordinates = lineclip.polyline(geo.features[i].geometry.coordinates, bbox)[0];
				}
			} else if(shape === 'polygons'){
				for(var i = 0; i < geo.features.length; i++){
					geo.features[i].geometry.coordinates[0] = lineclip.polygon(geo.features[i].geometry.coordinates[0], bbox);
				}
			}

			if(randomgeo) map.removeLayer(randomgeo);
			randomgeo = L.geoJson(geo).addTo(map);
		}
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

	// extending the LayerGroup to add length()
	L.LayerGroup.prototype.length = function() { return this.getLayers().length; };

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
		drawitems.addLayer(e.layer);
	});
}

// format for random is [w lng, s lat, e lng, n lat]
function boundsToArray(bbox){
	return [bbox._southWest.lng, bbox._southWest.lat, bbox._northEast.lng, bbox._northEast.lat];
}

// returns a random number of vertices for the shape
function randomNumVerticies(shape, max){
	if(shape === 'point') return 1;

	var min = shape === 'polyline'  ? 2 : 4;
	return Math.floor(Math.random() * (max - min + 1) + min);
}

function exportToGeoJson(){
	return JSON.stringify(drawitems.toGeoJSON());
}

function exportToKml(isZipped){

}
