import React from 'react';
import ReactDOM from 'react-dom/client'
import './sample.css'
import './static/css/index.css'
import FilterCard from './FilterCard';
import CuisineCard from './CuisineCard'

class Layout extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            showCuisine: false,
            caloriesMin: 20,
            caloriesMax: 2000,
            vegan: false,
            alcoholFree: false,
            dairyFree: false,
            cuisineType: "",
            cuisine: "",
        }

        this.handleChangeInput = this.handleChangeInput.bind(this);
        this.requestCuisine = this.requestCuisine.bind(this);
    } 

    // handle changes in filters
    handleChangeInput = (event) => {
        //let target = event.target.id;
        this.setState({[event.target.id]: (event.target.type === "checkbox" ? !this.state[event.target.id] : event.target.value)});
        console.log(event.target.type);
    }

    // show/hide cuisine card
    flipCard = () => {
        this.setState({showCuisine: !this.state.showCuisine});
    }

    // fetch API
    requestCuisine = () => {

        // helper function 
        let objToQueryString = (obj) => {
            const keyValuePairs = [];
            for (let i = 0; i<obj.length; i++) if (obj[i][1] !== "") {
                keyValuePairs.push(encodeURIComponent(obj[i][0]) + '=' + encodeURIComponent(obj[i][1]));
            }
            return keyValuePairs.join('&');
        }

        // fetch API
        const queryString = objToQueryString([
            ["type", "public"],
            ["app_id", "d70fdf06"],
            ["app_key", "4bbfb3bca8ebfe0e162ae8af5a0b2844"],
            ["calories", this.state.caloriesMin + "-" + this.state.caloriesMax],
            ["random", true],
            ["health", this.state.alcoholFree ? "alcohol-free" : ""],
            ["health", this.state.dairyFree ? "dairy-free" : ""],
            ["health", this.state.vegan ? "vegan" : ""]
        ]);

        console.log(`https://api.edamam.com/api/recipes/v2?${queryString}`);
        fetch(`https://api.edamam.com/api/recipes/v2?${queryString}`)
        .then(response => response.json())
        .then(data => {  
            this.setState({
                cuisine: data.hits[0].recipe,
            })
        })

    }

    render(){
        return (
            <div className='container'>
                <div className='card-container'>
                    <FilterCard 
                        {...this.state}
                        handleChange={this.handleChangeInput}
                    />

                    {this.state.showCuisine 
                    ? <CuisineCard 
                        onClick={this.flipCard}
                        cuisine={this.state.cuisine}
                    />
                    : <button onClick={() => {this.flipCard(); this.requestCuisine();}}>Ready for some...</button>}
                </div>
            </div>
        )
    }
}

// ========================================

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Layout />);
  