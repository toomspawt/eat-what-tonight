import React from 'react';

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
                onChange={(e) => props.handleChange(e)}
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
                    onChange={(e) => props.handleChange(e)} 
                    />
                <span className="slider-round"></span>
                </label>
        </div>
    )
}


function FilterCard(props) {
    return (
        <div className='card filter-card' onClick={props.onClick}>
            <FilterRange
                label="calories (min)"
                id="caloriesMin"
                value={props.filters.caloriesMin}
                handleChange={props.handleChange}
            />
            <FilterRange
                label="calories (max)"
                id="caloriesMax"
                value={props.filters.caloriesMax}
                handleChange={props.handleChange}
            />
            <FilterTF 
                label="Vegan" 
                id='vegan'
                value={props.filters.vegan} 
                handleChange={props.handleChange} 
            />
            <FilterTF 
                label="Alcohol Free" 
                id='alcoholFree'
                value={props.filters.alcoholFree} 
                handleChange={props.handleChange} 
            />
            <FilterTF 
                label="Dairy Free" 
                id='dairyFree'
                value={props.filters.dairyFree} 
                handleChange={props.handleChange} 
            />
        </div>
    )
}


export default FilterCard;