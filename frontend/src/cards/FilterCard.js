import { useEffect, useState } from 'react'
import CuisineCard from './CuisineCard';
import useAxios from "../utils/useAxios";

function FilterRange(props) {
    return (
        <div className="filter-range">
            <svg 
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor" className="bi bi-arrow-up-circle" viewBox="0 0 16 16"
                onClick={() => props.buttonClick(props.id, 50)}
            >
                <path fillRule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-7.5 3.5a.5.5 0 0 1-1 0V5.707L5.354 7.854a.5.5 0 1 1-.708-.708l3-3a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 5.707V11.5z"/>
            </svg>
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
                onClick={() => props.buttonClick(props.id, -50)}
            >
                <path fillRule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v5.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V4.5z"/>
            </svg>
        </div>
    )
}

function FilterTF(props) {
    //console.log(props.value);
    return (
        <div>
            <input 
                className='checkbox-tf'
                id={props.id} 
                type="checkbox" 
                checked={props.value}
                onChange={props.onChange}
            />
            <label className="label-tf" htmlFor={props.id}>
                <div className="tick-mark"></div>
            </label>
        </div>
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

    const api = useAxios();

    // if authenticated, get user's filters
    useEffect(() => {
        if (user) {
            const fetchData = async () => {
                try {
                    const response = await api.get("/filter/");
                    setFilters({...response.data.response});
                    //console.log(response.data.response)
                    //console.log(filters)
                } catch {
                    console.log("Something went wrong");
                }
            };
            fetchData();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // allow user to set current filters as defaults
    const newDefault = () => {
        const fetchData = async () => {
            try {
                const response = await api.post("/filter/", {
                    filters: filters
                })
                //console.log(filters)
                console.log(response.data.response)
            } catch {
                console.log("Something went wrong")
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

    return (
        <div>
            <div className='card card-container-large'>
                <h3 style={{"textAlign": "center", "paddingBottom": "20px"}}>Should be something...</h3>
                <div className='filter-group' id="range-group">
                    From
                    <FilterRange
                        label="calories (min)"
                        id="caloriesMin"
                        value={filters.caloriesMin}
                        onChange={(e) => handleChangeInput(e)}
                        buttonClick={numberInputChange}
                    />
                    to
                    <FilterRange
                        label="calories (max)"
                        id="caloriesMax"
                        value={filters.caloriesMax}
                        onChange={(e) => handleChangeInput(e)}
                        buttonClick={numberInputChange}
                    />
                    kcal
                </div>
                <p className="password-not-match">{filters.caloriesMin > filters.caloriesMax ? "Range error" : ""}</p>
                <div className='filter-group'>
                    <FilterTF 
                        label="Vegan" 
                        id='vegan'
                        value={filters.vegan} 
                        onChange={(e) => handleChangeInput(e)}
                    />
                    <FilterTF 
                        label="Alcohol Free" 
                        id='alcoholFree'
                        value={filters.alcoholFree} 
                        onChange={(e) => handleChangeInput(e)}
                    />
                    <FilterTF 
                        label="Dairy Free" 
                        id='dairyFree'
                        value={filters.dairyFree} 
                        onChange={(e) => handleChangeInput(e)}
                    />
                </div>

                {
                    // "Set as default button, appeared if authenticated"
                    user && <button onClick={() => newDefault()}>Set as default</button>
                }
            </div>
            
            <CuisineCard
                filters={filters}
            />
        </div>
    )
    
}

export default FilterCard;