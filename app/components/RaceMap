var React = require('react');


var Map = React.createClass({
 

  // updateCurrentLocation(){
  //   if(this.state.previousMarker){
  //     this.state.previousMarker.setIcon({
  //       path: google.maps.SymbolPath.BACKWARD_CLOSED_ARROW,
  //       strokeColor: "red",
  //       scale: 5
  //     });
  //   }
  //   this.state.currentMarker.setIcon({
  //     path: google.maps.SymbolPath.BACKWARD_CLOSED_ARROW,
  //     strokeColor: "green",
  //     scale: 5
  //   });
  //   this.state.previousMarker = this.state.currentMarker;
  // },


  componentDidMount(){
    console.log('POOP',this.props);
    var self = this;
    var map = new GMaps({
      el: '#map',
      lat: 37.7837696,
      lng: -122.4090773,
      styles: [{"featureType":"administrative","elementType":"labels.text.fill","stylers":[{"color":"#444444"}]},{"featureType":"landscape","elementType":"all","stylers":[{"color":"#f2f2f2"}]},{"featureType":"poi","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"all","stylers":[{"saturation":-100},{"lightness":45}]},{"featureType":"road.highway","elementType":"all","stylers":[{"visibility":"simplified"}]},{"featureType":"road.arterial","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"all","stylers":[{"color":"#46bcec"},{"visibility":"on"}]}]
    });
  },

  componentDidUpdate(){
    var that = this;
    if(this.props.activeRace.name !== undefined){
      var map = new GMaps({
        el: '#map',
        lat: this.props.activeRace.waymarks[0][1],
        lng: this.props.activeRace.waymarks[0][0],
        styles: [{"featureType":"administrative","elementType":"labels.text.fill","stylers":[{"color":"#444444"}]},{"featureType":"landscape","elementType":"all","stylers":[{"color":"#f2f2f2"}]},{"featureType":"poi","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"all","stylers":[{"saturation":-100},{"lightness":45}]},{"featureType":"road.highway","elementType":"all","stylers":[{"visibility":"simplified"}]},{"featureType":"road.arterial","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"all","stylers":[{"color":"#46bcec"},{"visibility":"on"}]}]
      });

      this.props.activeRace.waymarks.forEach(function(marks, index){
        map.addMarker({
          lat: marks[1],
          lng: marks[0],
          id: index,
          icon: {
            path: google.maps.SymbolPath.BACKWARD_CLOSED_ARROW,
            strokeColor: "red",
            scale: 5
          }
        });
      });

      //need to resize the map to include all 
    } else {
      var map = new GMaps({
        el: '#map',
        lat: 37.7837696,
        lng: -122.4090773,
        styles: [{"featureType":"administrative","elementType":"labels.text.fill","stylers":[{"color":"#444444"}]},{"featureType":"landscape","elementType":"all","stylers":[{"color":"#f2f2f2"}]},{"featureType":"poi","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"all","stylers":[{"saturation":-100},{"lightness":45}]},{"featureType":"road.highway","elementType":"all","stylers":[{"visibility":"simplified"}]},{"featureType":"road.arterial","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"all","stylers":[{"color":"#46bcec"},{"visibility":"on"}]}]
      });

      this.props.user.availableRaces.forEach(function(race, index){
        map.addMarker({
          lat: race.start_location.coordinates[1],
          lng: race.start_location.coordinates[0],
          title: race.name,
          id: race._id,
          icon: {
            path: google.maps.SymbolPath.BACKWARD_CLOSED_ARROW,
            strokeColor: "red",
            scale: 5
          },
          click: function(e) {
            for(var i = 0; i < that.props.user.availableRaces.length; i++){
              if(that.props.user.availableRaces[i]._id === e.id) {
                that.props.raceAction.selectRace(that.props.user.availableRaces[i]);    
              }
            }
          }
        });
      });
    }
  },
    

  render(){

    return (
      <div>
        <div className="map-holder">
          <p>Loading......</p>
          <div id="map"></div>
        </div>
      </div>
    );
  }

});

module.exports = Map;
