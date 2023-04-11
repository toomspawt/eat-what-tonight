import { useEffect, useState } from 'react'
import CuisineCard from './CuisineCard';
import useAxios from "../utils/useAxios";

function FilterRange(props) {
    return (
        <div className="filter-range">
            <label>{props.label}</label>
            <input 
                id={props.id}
                type="number" 
                min="0" 
                step="1" 
                value={props.value}
                onChange={props.onChange}
                />
        </div>
    )
}

function FilterTF(props) {
    //console.log(props.value);
    return (
        <div className="filter-tf">
            <span>{props.label}</span>
            <label className="filter-tf-switch">
                <input 
                    id={props.id} 
                    type="checkbox" 
                    checked={props.value}
                    onChange={props.onChange}
                    />
                <span className="slider-round"></span>
                </label>
        </div>
    )
}

function FilterCard({ user }) {
    let [filters, setFilters] = useState({
        caloriesMin: 20,
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

    return (
        <div>
            <div className='card filter-card'>
                <FilterRange
                    label="calories (min)"
                    id="caloriesMin"
                    value={filters.caloriesMin}
                    onChange={(e) => handleChangeInput(e)}
                />
                <FilterRange
                    label="calories (max)"
                    id="caloriesMax"
                    value={filters.caloriesMax}
                    onChange={(e) => handleChangeInput(e)}
                />
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