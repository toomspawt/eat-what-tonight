import React from "react";

class CuisineCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showCuisine: false,
            filters: props.filters,
            cuisine: "",
        }
        this.requestCuisine = this.requestCuisine.bind(this);
    }

    // show/hide cuisine card
    flipCard = () => {
        this.setState({showCuisine: !this.state.showCuisine});
    }

    // fetch API
    requestCuisine = () => {

        const filters = this.state.filters;
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
            this.setState({
                cuisine: data.hits[0].recipe,
            })
        })
    }

    renderCuisine() {
        const cuisine = this.state.cuisine;

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
                <button onClick={this.flipCard}>Ehh... maybe something else?</button>
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

    render() {
        return !this.state.showCuisine ? (
            <button onClick={() => {this.flipCard(); this.requestCuisine();}}>Ready for some...</button>
        ) : (
            this.renderCuisine()
        )
    }
}

/*
function CuisineCard(props) {
    let cuisine = "";
    console.log(props.showCuisine)
    if (!props.showCuisine) return (
        <button onClick={props.flipCard}>Ready for some...</button>
    )

    const filters = props.filters;
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
        cuisine = data.hits[0].recipe;
        console.log(cuisine);
    })
    console.log(cuisine);

    return (<h1>Successful!</h1>)
/*
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
            <p>{cuisine.label}</p>
            <img src={cuisine.image} alt={cuisine.label}/>
            {/* Information }
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
            {/* Nutrition }
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
*/
export default CuisineCard;