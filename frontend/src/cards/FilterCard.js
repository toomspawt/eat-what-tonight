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
    return (
        <div className="filter-tf">
            <span>{props.label}</span>
            <label className="filter-tf-switch">
                <input 
                    id={props.id} 
                    type="checkbox" 
                    defaultChecked={props.value}
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
                setFilters(response.data.response);
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
            } catch {
                console.log("Something went wrong")
            }
        };
        fetchData();
    }
    
    const handleChangeInput = (event) => {
        let newFilters = filters;
        newFilters[event.target.id] = (event.target.type === "checkbox" ? !newFilters[event.target.id] : Number(event.target.value));
        setFilters({...newFilters});
        //console.log(filters);
    }

    return (
        <div>
            <div className='card filter-card'>
                <FilterRange
                    label="calories (min)"
                    id="caloriesMin"
                    value={filters.caloriesMin}
                    onChange={handleChangeInput}
                />
                <FilterRange
                    label="calories (max)"
                    id="caloriesMax"
                    value={filters.caloriesMax}
                    onChange={handleChangeInput}
                />
                <FilterTF 
                    label="Vegan" 
                    id='vegan'
                    value={filters.vegan} 
                    onChange={handleChangeInput}
                />
                <FilterTF 
                    label="Alcohol Free" 
                    id='alcoholFree'
                    value={filters.alcoholFree} 
                    onChange={handleChangeInput}
                />
                <FilterTF 
                    label="Dairy Free" 
                    id='dairyFree'
                    value={filters.dairyFree} 
                    onChange={handleChangeInput}
                />

                {
                    // "Set as default button, appeared if authenticated"
                    user && <button onClick={newDefault}>Set as default</button>
                }
            </div>
            
            <CuisineCard
                filters={filters}
            />
        </div>
    )
}

export default FilterCard;