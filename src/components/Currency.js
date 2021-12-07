import React from 'react'
import './styles.css'

export default class Currency extends React.Component {
   
    constructor(props){
        super(props)
        this.state = {
          USD_Rate:null,
          Euro_Rate:null,
          currencyCode:null,
          currencyUSD:null,
          currencyEuro:null,
          countryCode:this.props.countryCode
        }
    }

    componentDidMount(){
        console.log(this.state.countryCode)
        fetch(`https://restcountries.com/v3.1/alpha/${this.state.countryCode}`)
        .then(res=>res.json())
        .then(res=>{this.setState({
            currencyCode: Object.keys(res[0].currencies)[0]
            })
            console.log(this.state.currencyCode)
             return fetch(`https://v6.exchangerate-api.com/v6/7504c34ae780c77e38efe33b/pair/${this.state.currencyCode}/USD`)
         })
        .then(res=>res.json())
        .then(res=>{
            this.setState({currencyUSD:res.conversion_rate})
            return fetch(`https://v6.exchangerate-api.com/v6/7504c34ae780c77e38efe33b/pair/${this.state.currencyCode}/EUR`)
        })
        .then(res=>res.json())
        .then(res=>this.setState({currencyEuro:res.conversion_rate})) 
        .catch(err=>alert(err))
    }

   render(){
    return (
        <div id='currency'>
            <h3 id='h3cur'> CURRENCY EXCHANGE RATE</h3>
            <table>
            <tr><th> Currency</th>  <th> ConversionRate </th> </tr>
            <tr><td>{this.state.currencyCode}USD</td> <td> {this.state.currencyUSD} </td> </tr>
            <tr><td>{this.state.currencyCode}Euro</td> <td> {this.state.currencyEuro} </td> </tr>
            </table>
        </div>
    )
   }
}


