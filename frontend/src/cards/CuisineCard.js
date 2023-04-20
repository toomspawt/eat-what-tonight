import React from "react";
import '../static/css/cuisine.css'

function CuisineCard(props) {
    const cuisine = props.cuisine;
    console.log(cuisine);
    if (cuisine === "") return (<p></p>)


    // helper function
    const toArray = (attribute) => {
        let arr = [];
        for (let key in cuisine[attribute]) arr.push(cuisine[attribute][key]);
        if (arr.length > 3) {arr = [arr[0], arr[1], arr[2]]}
        return arr;
    }

    // cuisine info
    const dishType = toArray("dishType").join(',');
    const mealType = toArray("mealType").join(',');
    const cuisineType = toArray("cuisineType").join(',');

    const nutritionFacts = () => {return (
        <div 
            className="card card-container-large performance-facts"
            style={{
                "border": "1px solid black",
                "margin": "auto",

            }}
        >
            <header className="performance-facts__header">
                <h1 className="performance-facts__title">Nutrition Facts</h1>
                <p>Serving Size {Math.round(cuisine.totalWeight/cuisine.yield)}g</p>
                <p>Serving Count {cuisine.yield}</p>
            </header>
            <table className="performance-facts__table">
                <thead>
                    <tr>
                        <th colSpan="3" className="small-info">Amount Per Serving</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th colSpan="2"><b>Calories </b>{Math.round(cuisine.calories/cuisine.yield)}</th>
                        <td>Calories from Fat {Math.round(cuisine.digest[0].total*9/cuisine.yield)}</td>
                    </tr>
                    <tr className="thick-row">
                        <td colSpan="3" className="small-info"><b>% Daily Value*</b></td>
                    </tr>
                    <tr>
                        <th colSpan="2"><b>Total Fat </b>{Math.round(cuisine.digest[0].total/cuisine.yield)}g</th>
                        <td><b>{Math.round(cuisine.digest[0].daily/cuisine.yield)}%</b></td>
                    </tr>
                    <tr>
                        <td className="blank-cell"></td>
                        <th>Saturated Fat {Math.round(cuisine.digest[0].sub[0].total/cuisine.yield)}g</th>
                        <td><b>{Math.round(cuisine.digest[0].sub[0].daily/cuisine.yield)}%</b></td>
                    </tr>
                    <tr>
                        <td className="blank-cell"></td>
                        <th>Trans Fat {Math.round(cuisine.digest[0].sub[1].total/cuisine.yield)}g</th>
                        <td></td>
                    </tr>
                <tr>
                    <th colSpan="2"><b>Cholesterol </b>{Math.round(cuisine.digest[3].total/cuisine.yield)}mg</th>
                    <td><b>{Math.round(cuisine.digest[3].daily/cuisine.yield)}%</b></td>
                </tr>
                <tr>
                    <th colSpan="2"><b>Sodium </b>{Math.round(cuisine.digest[4].total/cuisine.yield)}mg</th>
                    <td><b>{Math.round(cuisine.digest[0].daily/cuisine.yield)}%</b></td>
                </tr>
                <tr>
                    <th colSpan="2"><b>Total Carbohydrate </b>{Math.round(cuisine.digest[1].total/cuisine.yield)}g</th>
                    <td><b>{Math.round(cuisine.digest[1].daily/cuisine.yield)}%</b></td>
                </tr>
                <tr>
                    <td className="blank-cell"></td>
                    <th>Dietary Fiber {Math.round(cuisine.digest[1].sub[1].total/cuisine.yield)}g</th>
                    <td><b>{Math.round(cuisine.digest[1].sub[1].daily/cuisine.yield)}%</b></td>
                </tr>
                <tr>
                    <td className="blank-cell" ></td>
                    <th>Sugars {Math.round(cuisine.digest[1].sub[2].total/cuisine.yield)}g</th>
                    <td></td>
                </tr>
                <tr className="thick-end">
                    <th colSpan="2"><b>Protein </b>{Math.round(cuisine.digest[2].total/cuisine.yield)}g</th>
                    <td></td>
                </tr>
                </tbody>
            </table>

            <table className="performance-facts__table--grid">
                <tbody>
                <tr>
                    <td colSpan="2">Vitamin A {Math.round(cuisine.digest[11].daily/cuisine.yield)}%</td>
                    <td>Vitamin C {Math.round(cuisine.digest[12].daily/cuisine.yield)}%</td>
                </tr>
                <tr className="thin-end">
                    <td colSpan="2">Calcium {Math.round(cuisine.digest[5].daily/cuisine.yield)}%</td>
                    <td>Iron {Math.round(cuisine.digest[8].daily/cuisine.yield)}%</td>
                </tr>
                </tbody>
            </table>

            <p className="small-info">* Percent Daily Values are based on a 2,000 calorie diet. Your daily values may be higher or lower depending on your calorie needs:</p>
            <table className="performance-facts__table--small small-info">
                <thead>
                <tr>
                    <td colSpan="2"></td>
                    <th>Calories:</th>
                    <th>2,000</th>
                    <th>2,500</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <th colSpan="2">Total Fat</th>
                    <td>Less than</td>
                    <td>65g</td>
                    <td>80g</td>
                </tr>
                <tr>
                    <td className="blank-cell"></td>
                    <th>Saturated Fat</th>
                    <td>Less than</td>
                    <td>20g</td>
                    <td>25g</td>
                </tr>
                <tr>
                    <th colSpan="2">Cholesterol</th>
                    <td>Less than</td>
                    <td>300mg</td>
                    <td>300 mg</td>
                </tr>
                <tr>
                    <th colSpan="2">Sodium</th>
                    <td>Less than</td>
                    <td>2,400mg</td>
                    <td>2,400mg</td>
                </tr>
                <tr>
                    <th colSpan="3">Total Carbohydrate</th>
                    <td>300g</td>
                    <td>375g</td>
                </tr>
                <tr>
                    <td className="blank-cell"></td>
                    <th colSpan="2">Dietary Fiber</th>
                    <td>25g</td>
                    <td>30g</td>
                </tr>
                </tbody>
            </table>
            <p className="small-info">Calories per gram: </p>
            <p className="small-info text-center">
                Fat 9
                &bull;
                Carbohydrate 4
                &bull;
                Protein 4
            </p>
        </div>
    )}

    // render card
    return (
        <div>
            <div className="card card-container-large info-card" style={{"padding": "0px"}}>
                <div className="recipe-image">
                    <img src={cuisine.image} alt={cuisine.label}/>
                </div>
                
                <div className="recipe-info">
                    <h3>{cuisine.label}</h3>
                    <p>
                        {Math.round(cuisine.calories/cuisine.yield)} calories per serving 
                    </p>
                    <hr/>
                    <div className="recipe-type">
                        <div>
                            <h4>dish type</h4>
                            <p>{dishType}</p>

                        </div>
                        <div>
                            <h4>meal type</h4>
                            <p>{mealType}</p>
                        </div>
                        <div>
                            <h4>cuisine type</h4>
                            <p>{cuisineType}</p>
                        </div>
                    </div>
                    <div className="filter-btn-group">
                        <p className="filter-btn button-set" onClick={props.flipCard}>Don't like this?</p>
                        <a href={cuisine.url} className="filter-btn button-request" target="_blank" rel="noreferrer"> 
                            recipe   
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-right" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"/>
                            </svg>
                        </a>
                    </div>
                    
                </div>
            </div> 
            {nutritionFacts()}
        </div>
    )

}

export default CuisineCard;