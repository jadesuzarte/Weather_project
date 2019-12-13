import React from 'react'

export function CityCard(props) {
    let info = props.citiesInfo

getImage() {
fetch(`https://source.unsplash.com/1600x900/?${info.name}`)
.then
}
   
console.log(info)
    return (
        <div className="weather_info">
        <p>City: {info.name}</p>
        <p>Base :{info.base}</p>
        <p> Timezone:{info.timezone}</p>
         <p> Visibility:{info.visibility}</p>
        <div className="random_image">
        </div>
</div>
    )
}