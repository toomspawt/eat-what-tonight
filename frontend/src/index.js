import React from 'react';
import ReactDOM from 'react-dom/client'
import './sample.css'
import './static/css/index.css'
import FilterCard from './cards/FilterCard';
import CuisineCard from './cards/CuisineCard';
import LoginCard from './cards/LoginCard';
import UserCard from './cards/UserCard';

class App extends React.Component{
  constructor(props) {
    super(props);
      this.state = {
          filters: {
            caloriesMin: 20,
            caloriesMax: 2000,
            vegan: false,
            alcoholFree: false,
            dairyFree: false,
          },
          isLoggedIn: false,
      }

      this.handleChangeInput = this.handleChangeInput.bind(this);
  } 

  // handle changes in filters
  handleChangeInput = (event) => {
      //let target = event.target.id;
      this.setState({[event.target.id]: (event.target.type === "checkbox" ? !this.state[event.target.id] : event.target.value)});
      console.log(event.target.type);
  }

  render(){
    return (
        <div className='container'>
            <div className='card-container'>
                

                <FilterCard 
                    filters={this.state.filters}
                    handleChange={this.handleChangeInput}
                />

                <CuisineCard
                  filters={this.state.filters}
                  showCuisine={false}
                />

            </div>
        </div>
    )
  }
}

// ========================================

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  //<React.StrictMode>
    <App />
  //</React.StrictMode>
);
  