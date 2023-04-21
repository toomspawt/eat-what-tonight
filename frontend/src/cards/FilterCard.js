import { useEffect, useState } from 'react'
import CuisineCard from './CuisineCard';
import useAxios from "../utils/useAxios";
import "../static/css/filter.css"
import ReactCardFlip from 'react-card-flip';

function FilterRange(props) {
    return (
        <div className="filter-range">
            <svg 
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor" className="bi bi-arrow-up-circle" viewBox="0 0 16 16"
                onClick={() => props.buttonClick(props.id, -50)}
            >
                <path fillRule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>            </svg>
            <input 
                id={props.id}
                type="number" 
                min={0}
                max={1000}
                step={1} 
                value={props.value}
                onChange={props.onChange}
            />
            <svg 
                xmlns="http://www.w3.org/2000/svg" 
                fill="currentColor" className="bi bi-arrow-down-circle" viewBox="0 0 16 16"
                onClick={() => props.buttonClick(props.id, 50)}
            >
                <path fillRule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
            </svg>
        </div>
    )
}

function FilterTF(props) {
    //console.log(props.value);
    return (
        <li className="tg-list-item">
            <input 
                className="tgl tgl-flip" type="checkbox"
                id={props.id} checked={props.value}
                onChange={props.onChange}
            />
            <label className="tgl-btn" data-tg-off="Nope" data-tg-on="Yeah!" htmlFor={props.id}></label>
        </li>
    )
}

function FilterCard({ user }) {
    let [filters, setFilters] = useState({
        caloriesMin: 100,
        caloriesMax: 2000,
        vegan: false,
        alcoholFree: false,
        dairyFree: true,
    });

    // if authenticated, get user's filters
    const api = useAxios();
    useEffect(() => {
        if (user) {
            const fetchData = async () => {
                try {
                    const response = await api.get("/filter/");
                    setFilters({...response.data.response});
                    console.log("philter---", filters)
                    //console.log(response.data.response)
                    //console.log(filters)
                } catch {
                    console.log("Something went wrong");
                }
            };
            fetchData();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user]);
    
    // show/hide cuisine card
    let [showCuisine, setShowCuisine] = useState(false);
    let [cuisine, setCuisine] = useState("");
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

    // allow user to set current filters as defaults
    const newDefault = () => {
        const fetchData = async () => {
            try {
                const response = await api.post("/filter/", {
                    filters: filters
                })
                //console.log(filters)
                alert("Successful!")
                console.log(response.data.response)
            } catch {
                alert("Something went wrong!")
            }
        };
        fetchData();
    }
    
    const handleChangeInput = (event) => {
        let newFilters = filters;
        newFilters[event.target.id] = (event.target.type === "checkbox" ? (event.target.checked) : Number(event.target.value));
        setFilters({...newFilters});
        console.log(filters);
    }

    const numberInputChange = (numberFilter, value) => {
        let newFilters = filters;
        newFilters[numberFilter] += value;
        newFilters[numberFilter] = newFilters[numberFilter] >= 0 ? newFilters[numberFilter] : 0;
        newFilters[numberFilter] = newFilters[numberFilter] <= 10000 ? newFilters[numberFilter] : 10000;
        setFilters({...newFilters});
        console.log(filters);
    }

    
    const renderFilters = () => {
        return (
        <div className='card card-container-large'>
            <h2>Order</h2>
            <div className="item-wrapper">
                <div className="item">
                    <div className="title">Calories (min)</div>
                    <div className="space"></div>
                    <div className="price">
                        <FilterRange
                            id="caloriesMin"
                            value={filters.caloriesMin}
                            onChange={(e) => handleChangeInput(e)}
                            buttonClick={numberInputChange}
                        />
                    </div>
                </div>
                <p className="description">Minimum deliciousness</p>
            </div>
            <div className="item-wrapper">
                <div className="item">
                    <div className="title">Calories (max)</div>
                    <div className="space"></div>
                    <div className="price">
                        <FilterRange
                            id="caloriesMax"
                            value={filters.caloriesMax}
                            onChange={(e) => handleChangeInput(e)}
                            buttonClick={numberInputChange}
                        />
                    </div>
                </div>
                <p className="description">Maximum deliciousness (to which your weight can endure)</p>
                <p className="description password-not-match">{filters.caloriesMin > filters.caloriesMax ? "Range error" : ""}</p>
            </div>
            <div className="item-wrapper">
                <div className="item">
                    <div className="title">Vegan</div>
                    <div className="space"></div>
                    <div className="price">
                        <FilterTF 
                            id='vegan'
                            value={filters.vegan} 
                            onChange={(e) => handleChangeInput(e)}
                        />
                    </div>
                </div>

                <p className="description">
                    {filters.vegan ? "I want to save the world!" : "I want human food"}
                </p>
            </div>
            <div className="item-wrapper">
                <div className="item">
                    <div className="title">Alcohol free</div>
                    <div className="space"></div>
                    <div className="price">
                        <FilterTF 
                            id='alcoholFree'
                            value={filters.alcoholFree} 
                            onChange={(e) => handleChangeInput(e)}
                        />
                    </div>
                </div>
                <p className="description">
                    {filters.alcoholFree ? "I don't care if the Russians laugh at me" : "No great story starts with someone eating salad"}
                </p>
            </div>
            <div className="item-wrapper">
                <div className="item">
                    <div className="title">Dairy free</div>
                    <div className="space"></div>
                    <div className="price">
                        <FilterTF 
                            id='dairyFree'
                            value={filters.dairyFree} 
                            onChange={(e) => handleChangeInput(e)}
                        />
                    </div>
                </div>
                <p className="description">
                    {filters.dairyFree ? "I just hate hapiness" : "Who could live without cheese?"}
                </p>
            </div>
            <div className='item-wrapper'>
                <div className='filter-btn-group'>
                    {
                        // "Set as default button, appeared if authenticated"
                        user && <button className='filter-btn button-set' onClick={() => newDefault()}>Set default</button>
                    }
                    <button 
                        className='filter-btn button-request'
                        onClick={() => {
                            if (validateFilters()) {
                                flipCard(); requestCuisine();
                            } else {
                                alert("Invalid filters!")
                            }
                        }}
                    >
                        Generate food
                    </button>
                </div>
            </div>
        </div>
        )
    } 

    return (
        <ReactCardFlip isFlipped={showCuisine} flipDirection="horizontal">
            {renderFilters()}

            <CuisineCard
                cuisine={cuisine}
                flipCard={flipCard}
            />
        </ReactCardFlip>
    )   
    
}

export default FilterCard;