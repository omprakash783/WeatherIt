import React from 'react'
import Currency from './Currency.js'
import Weather from './Weather.js'
import './styles.css'

export default class Location extends React.Component{

constructor (props){
  super(props)
  this.state = {
    latitude:null,
    longitude:null,
    address:null,
    countryCode:null
  }
  ///this.getLocation = this.getLocation.bind(this)
  this.getCoordinates = this.getCoordinates.bind(this)
  this.handleError = this.handleError.bind(this)
  this.getAddress = this.getAddress.bind(this)
}


componentDidMount(){
  if(navigator.geolocation) navigator.geolocation.getCurrentPosition(this.getCoordinates,this.handleError)
  else alert("Geolocation is not supported in your browser")
}

getCoordinates(position){
  console.log(position.coords.latitude)
  this.setState({
    latitude:position.coords.latitude,
    longitude: position.coords.longitude
  })
  
  this.getAddress();
}

getAddress(){
  fetch(`https://api.tomtom.com/search/2/reverseGeocode/${this.state.latitude},${this.state.longitude}.json?key=Ar16sc94xysWEKZmZ2RS0JoEz5PkLK6a`)
  .then(data=>data.json())
  .then(res=>this.setState({address:res.addresses[0].address.freeformAddress,
                            countryCode:res.addresses[0].address.countryCodeISO3
                           }))
  .catch(err=>alert(err))
}

handleError(error) {
  switch(error.code) {
    case error.PERMISSION_DENIED:
      alert("User denied the request for Geolocation.")
      break;
    case error.POSITION_UNAVAILABLE:
       alert("Location information is unavailable.")
      break;
    case error.TIMEOUT:
      alert("The request to get user location timed out.")
      break;
    case error.UNKNOWN_ERROR:
      alert("An unknown error occurred.")
      break;
    default:
      alert("An unknown error occurred.")
      
  }
}

render(){
  return (
    <div id="location">
      <button id='locbtn'>Location</button> 
      <h3 id='h3loc'>{this.state.address}</h3>
      <iframe title="map loading"
       width="550"
       height="350"
       border="0" 
       align='top'
         src='https://www.google.com/maps/embed/v1/place?key=AIzaSyAO3jYSdlLqUCbQRADLDRnpR8wjcPdaSIg&q={this.state.address}&zoom=15' >
      </iframe>
     
    { this.state.countryCode && <Currency countryCode = {this.state.countryCode} /> }
   
    { this.state.latitude &&  <Weather lat={this.state.latitude} long={this.state.longitude} /> }
    
    </div>
  )
}

}