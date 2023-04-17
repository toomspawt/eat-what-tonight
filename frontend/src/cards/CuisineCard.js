import React, { useState } from "react";

function CuisineCard(props) {
    const filters = props.filters;
    
    let [showCuisine, setShowCuisine] = useState(false);
    let [cuisine, setCuisine] = useState("");

    // show/hide cuisine card
    const flipCard = () => {
        setShowCuisine(!showCuisine);
    }

    const validateFilters = () => {
        return filters.caloriesMax >= filters.caloriesMin;
    }
    
    // fetch API
    const requestCuisine = () => {
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
            ["calories", filters.caloriesMin + "-" + filters.caloriesMax],
            ["random", true],
            ["health", filters.alcoholFree ? "alcohol-free" : ""],
            ["health", filters.dairyFree ? "dairy-free" : ""],
            ["health", filters.vegan ? "vegan" : ""]
        ]);

        console.log(`https://api.edamam.com/api/recipes/v2?${queryString}`);
        fetch(`https://api.edamam.com/api/recipes/v2?${queryString}`)
        .then(response => response.json())
        .then(data => {
            setCuisine(data.hits[0].recipe);
        })
    }

    // render received information
    const renderCuisine = () => {
        // helper function
        const toArray = (attribute) => {
            let arr = [];
            for (let key in cuisine[attribute]) arr.push(cuisine[attribute][key]);
            return arr;
        }

        // cuisine info
        const dishType = toArray("dishType").join(',');
        const mealType = toArray("mealType").join(',');
        const cuisineType = toArray("cuisineType").join(',');
        const ingredients = toArray("ingredientLines").map((d, i) => {
            return (<li key={i}>{d}</li>)
        })
        
        // nutritrion
        const nutrition = toArray("digest");

        const primaryNutrition = nutrition.slice(0, 3).map((d, i) => {
            return (<li key={i}>{d.label}: {Math.floor(d.total/cuisine.yield)}{d.unit}</li>)
        })

        const secondaryNutrition = nutrition.slice(3).map((d, i) => {
            return (<li key={i}>{d.label}: {Math.floor(d.total/cuisine.yield)}{d.unit}</li>)
        })
        
        // render card
        return (
            <div className="card card-modified">
                <button onClick={flipCard}>Ehh... maybe something else?</button>
                <p>{cuisine.label}</p>
                <img src={cuisine.image} alt={cuisine.label}/>
                {/* Information */}
                <div className="info">
                    <p>Type: {dishType}</p>
                    <p>Meal: {mealType}</p>
                    <p>Cuisine: {cuisineType}</p>
                    <p>See full recipe on: <a href={cuisine.url} target="_blank" rel="noreferrer noopener">{cuisine.source}</a></p>
                    <div className="ingredients">
                        {ingredients}
                    </div>
                </div>
                <p>********************</p>
                {/* Nutrition */}
                <div className="nutrtion">
                    <div className="nutrition-calo">
                        {Math.floor(cuisine.calories/cuisine.yield)} kcal per serving ({cuisine.yield} total)
                    </div>
                    <p>-----------------</p>
                    <div className="nutritrion-primary">
                        {primaryNutrition}
                    </div>
                    <p>-----------------</p>
                    <div className="nutritrion-secondary">
                        {secondaryNutrition}
                    </div>
                </div>
            </div>
        )
    }

    return !showCuisine ? (
        <div>
            <div className="card card-modified" 
            onClick={() => {
                if (validateFilters()) {
                    flipCard(); requestCuisine();
                } else {
                    alert("Invalid filters!")
                }
            }}
        >
            Ready for some...
            </div>
        </div>
    ) : (
        renderCuisine()
    )

}

export default CuisineCard;