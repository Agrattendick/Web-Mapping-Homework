/*Create a map using Leaflet that plots all of the earthquakes from your data set based on their longitude and latitude.

   * Your data markers should reflect the magnitude of the earthquake in their size and color. 
     Earthquakes with higher magnitudes should appear larger and darker in color.

   * Include popups that provide additional information about the earthquake when a marker is clicked.

   * Create a legend that will provide context for your map data.

   * Your visualization should look something like the map above.


   * to run this application run python -m http.server 
        -> make sure you open the terminal at the location the index.html file is located
   
   */

// We need to ccreate the map object and tell it it what level to zoom for the default view 



var map = L.map("map", {
    center: [ 40.7, -94.5],
    zoom: 3
  });
  

// Then send the api request 
L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href='https://www.openstreetmap.org/'>OpenStreetMap</a> contributors, <a href='https://creativecommons.org/licenses/by-sa/2.0/'>CC-BY-SA</a>, Imagery © <a href='https://www.mapbox.com/'>Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.streets",
  accessToken: API_KEY
}).addTo(map);


d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson", function(data) {

        //console.log(data);
        plotData(data);

/*         createLegend() */
        
});


/** We can start by putting data on the map 
 * 
 *   Step 1: put the data on the map. 
 *        1.1 Since we are using geoJson data we need to use the L.geoJson function to plot the data on the map
 *        1.2 Resources -- https://leafletjs.com/reference-1.3.4.html#geojson
 * 
 * 
 *   Step 2: We can use the options in the GeoJson file to color our map 
 *        2.1: We need to color the map based on the Earthquake Manitude
 */

function plotData(data){

  // step 1.1 + 1.2 goes here
  L.geoJson(data,
      {
        pointToLayer: function(feature, latlng){
          return L.circleMarker(latlng);
      }, 
      style: plotStyles,
      onEachFeature: function(feature, layer) {
        layer.bindPopup("Magnitude: " + feature.properties.mag + "<br>Location: " + feature.properties.place);
      }

    }).addTo(map);
}

function plotStyles(feature) {
  return {
    opacity: 1,
    fillOpacity: 1,
    fillColor: getFillColor(feature.properties.mag), //"here is where you can color your earthquakes, Hint: you can use a function",
    color: "#000000",
    radius: getRadius(feature.properties.mag), //"here is where you can determined the earthquake magnitude by size", see above hint
    stroke: true,
    weight: 0.5
  };
}
function getFillColor(mag) {

    switch (true) {
        case mag <= 2.5: return "#98fb98";
        case mag > 2.5 && mag <= 5.5: return "#228b22";
        case mag > 5.5 && mag <= 6.0: return "#FFFF33";
        case mag > 6.0 && mag <= 7.0: return "#CCCC00";
        case mag > 7.0 && mag <= 8.0: return "#FF4500";
        case mag >= 8.0: return "#FF0000";
        
    }
}

function getRadius(mag) {
    var radius = 0
    if (mag === 0) {
        radius = 1
    }
    else {
        radius = mag * 2;
    }
    return radius
    
};

var legend = L.control({position: 'bottomright'});

legend.onAdd = function() {

    var div = L.DomUtil.create('div', 'info legend');
    magnitude = [0, 2.5, 5.5, 6.1, 7.0, 8.0];
    labels = ["#98fb98", "#228b22", "#FFFF33", "#CCCC00", "#FF4500", "#FF0000"];

      for (var i = 0; i < magnitude.length; i++) {
        div.innerHTML +=
            '<i style = "background:' + labels[i] + '"></i>' + 
            magnitude[i] + (magnitude[i+1] ? '&ndash;' + magnitude[i+1] + '<br>' : '+');
    }

    return div;
};
legend.addTo(map);

function getMagnitude(mag) {
   console.log(
     /*define the rules for the magnitude size and color you 
       will need to be "return the results to the caller function with the return statement.*/
       );
}

/* Last step is adding ledgend with

     L.control({ }).onAdd = function(){}

     don't forget to add the ledgend to the map with addTo(map)

*/