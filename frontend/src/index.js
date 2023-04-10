import React from 'react';
import ReactDOM from 'react-dom/client'
import './static/css/index.css'
import FilterCard from './cards/FilterCard';
import CuisineCard from './cards/CuisineCard';
import LoginCard from './cards/LoginCard';
import { AuthProvider } from "./context/AuthContext";
import { useContext } from "react";
import AuthContext from "./context/AuthContext";
/*
function initializeFilters() {
  const { user } = useContext(AuthContext);
  const defaultFilter = user ? {
    caloriesMin: 20,
    caloriesMax: 2000,
    vegan: false,
    alcoholFree: false,
    dairyFree: false,
  } : {
    caloriesMin: 20,
    caloriesMax: 2000,
    vegan: true,
    alcoholFree: true,
    dairyFree: true,
  }

  return defaultFilter;
}
*/
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
              <AuthProvider>
                
                <LoginCard />

                <FilterCard 
                    filters={this.state.filters}
                    handleChange={this.handleChangeInput}
                />

                <CuisineCard
                  filters={this.state.filters}
                  showCuisine={false}
                />
              </AuthProvider>
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
  