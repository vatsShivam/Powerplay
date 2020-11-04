import { Link } from "react-router-dom";
import React, { Component } from 'react';
import './BeerDetails.css';  
import axios from "../../axios";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import Spinner from "../../components/UI/Spinner/Spinner";
class BeerDetails extends Component {
    constructor(props){
        super(props);
        this.state = {
            
            data : [],
            loading:false
        };
    }
   componentWillMount(){
       this.setState({loading:true})
   const id=this.props.match.params.id;
 
    axios
    .get(
     
     `/beers/${id}`
    
    )
    .then((resp) => {

        if(resp!==undefined){
     this.setState({data:resp.data[0],loading:false})
        }
   
    
    })
    .catch((error) => {
     
      console.log(error);
    });
   }
   renderBeerData() {
    const details = this.state.data;
  
    const {
        image_url,
      name,
      abv,
      ibu,
      description,
      brewers_tips,
      contributed_by,
      food_pairing,
      
     
      } =details;
    
      return(
        <div className="wrapper">

                <div className="section1">
                  <div className="bris">
                 <img src={image_url} className="shiv" style={{height:"240px"}}/>
                  </div>
                     <h1 className="names">
                       Name: {name}
                     </h1>
                     <h2 className="cate">
                       Abv: {abv}
                     </h2>
                     
                     <p className="cate">
                       Ibu: {ibu}
                     </p>
                     <p className="cate">
                       Food Pairing: {food_pairing}
                     </p>
                     
                     <p className="cate">
                       Description:{description}
                     </p>
                     <p className="cate">
                       Brewers Tips:{brewers_tips}
                     </p>
                     <p className="cate">
                       Contributed By: {contributed_by}
                     </p>
                 
                    <Link to="/"> <p className="adds">Back To DahBoard</p></Link>
                </div>
                
          
            </div>
      )
      }
   
    render() {
        let beer = (
            <div className="body">
            {this.renderBeerData()}
            
            </div>
        )
        if (this.state.loading) {
            beer = <Spinner />;
          }
      
          return beer;
    
        }
      
    }
    export default withErrorHandler(BeerDetails, axios);