import CityDetails from "../CityDetailComponent";
import Accordian from "../../../Generic/Accordian";
import './index.css'
export default function ListCities(props){
    return(<section id="cityList" className="cities-list">
        <h2>
            Cities AQI History
        </h2>
        <div className="cities-history">
            {props.cityList && Object.keys(props.cityList).map(city=>{
                return(props.cityList[city] && <Accordian title={city} key={city} content = {<CityDetails city={city} data={props.cityList[city].results} ></CityDetails>}/>)
            })}
        </div>
    </section>)
}