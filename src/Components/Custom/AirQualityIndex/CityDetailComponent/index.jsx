import LineChart from "../../../Generic/LineChart";
import './index.css'
export default function CityDetails(props){
    return(<div className="city-details">
        <h3>{props.city} Air Quality Index History</h3>
        <LineChart val = {props.city} data={props.data} height={200} />
    </div>)
}