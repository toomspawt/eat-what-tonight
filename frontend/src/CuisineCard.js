import React from "react";

function CuisineCard(props) {
    const cuisine = props.cuisine;

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
        <div className="card">
            <button onClick={props.onClick}>Ehh... maybe something else?</button>
            {console.log(cuisine)}
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

export default CuisineCard;