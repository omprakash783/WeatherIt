import React from 'react'
import moment from 'moment'
import './styles.css'

export default class Weather extends React.Component {
    
    constructor(props){
        super(props)
        this.state = {
            latitude:this.props.lat,
            longitude:this.props.long,
            forecast:null
        }
    }

    componentDidMount(){
        console.log(this.state.latitude)
        fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${this.state.latitude}&lon=${this.state.longitude}&exclude=hourly,minutely&units=metric&appid=61bc9cd50e223e318727edf00296b923`)
        .then(res=>res.json())
        .then(res=>this.setState({
            forecast:res.daily
        }))
        
    }

    showWeather = () =>{
        if(document.getElementById("forcast").style.display === "none")document.getElementById("forcast").style.display = "block"
        else document.getElementById("forcast").style.display = "none"
    }

    render(){
    return (
        <div> 
            {this.state.forecast && (<div>
               <h3 id='h3wea'> WEATHER</h3>
            <table id='tbweather'>
            <tr><th>Today</th><th>DayTemp</th><th>NightTemp</th><th>Weather</th></tr> 
            <tr><td>{moment(this.state.forecast[0].dt*1000).format('DD-MMM-YYYY')}</td> <td>{this.state.forecast[0].temp.day}&deg;C </td><td>{this.state.forecast[0].temp.night}&deg;C </td> <td>{this.state.forecast[0].weather[0].description}</td> </tr>
            </table>
            <button id='weabtn' onClick={this.showWeather}>Get Weather Details of Next Three Days</button>
                <div id='forcast' style={{display:"none"}}>
                    <table id='droptable'>
                        <tr><th>Date</th>  <th> MaxTemp &deg;C</th>   <th>MinTemp &deg;C</th>   <th>Weather</th> </tr>
                        <tr><td>{moment(this.state.forecast[1].dt*1000).format('DD-MMM-YYYY')}</td> <td>{this.state.forecast[1].temp.max}</td> <td>{this.state.forecast[1].temp.min}</td> <td>{this.state.forecast[1].weather[0].description}</td></tr>
                        <tr> <td>{moment(this.state.forecast[2].dt*1000).format('DD-MMM-YYYY')}</td>   <td>{this.state.forecast[2].temp.max}</td>  <td>{this.state.forecast[2].temp.min}</td>  <td>{this.state.forecast[2].weather[0].description}</td> </tr>
                        <tr><td>{moment(this.state.forecast[3].dt*1000).format('DD-MMM-YYYY')}</td>  <td>{this.state.forecast[3].temp.max}</td>  <td>{this.state.forecast[3].temp.min}</td>  <td>{this.state.forecast[3].weather[0].description}</td> </tr>
                    </table>
                </div>
            </div>
           )}
            
        </div>
    )
    }
}


