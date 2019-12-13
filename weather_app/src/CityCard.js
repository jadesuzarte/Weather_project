import React from 'react'
import axios from 'axios'

export function CityCard(props) {
    let info = props.citiesInfo
   let cityImage= props.image

console.log(cityImage);

    return (
        <div className="weather_info">
        <p>City: {info.name}</p>
        <p>Base :{info.base}</p>
        <p> Timezone:{info.timezone}</p>
         <p> Visibility:{info.visibility}</p>
         <img src={cityImage}/>
        <div className="image_city">
        </div>
</div>
    )
}