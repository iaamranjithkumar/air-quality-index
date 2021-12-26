import React, {useState} from 'react';
import { ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { getEnv, exportCities} from './Utilities/Common'
import { handleMessage } from './Utilities/AQIUtils';
import Details from './Components/Custom/AirQualityIndex/DetailComponent';
import ListCities from './Components/Custom/AirQualityIndex/CitiesListComponent';
import './App.css';
const ws = new WebSocket(getEnv('AQI_WS_URL'))
let isFirstLoad=true
function handleSocketOpen(){
  if(isFirstLoad){
    isFirstLoad=false
  }
  else{
    toast.success('Reconnected...', {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      });
  }
}
function handleSocketClose(){
  toast.error('Connection Interrupted. Trying to reconnect...', {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    });
}
function App() {
  const citiesInfo = {}
  Object.keys(exportCities).forEach(x=>{
    citiesInfo[x]=null
  })
  const [airIndex, setAirIndex] = useState(citiesInfo)
  const [isOpen,setOpen] = useState(false)
  const [isClose, setClose] = useState(false)
  const [airIndexHistory, setAirIndexHistory] = useState(null)
  const [airIndexOverall, setAirIndexOverall] = useState(null)
  const [currentAllCityIndex,setCurrentAllCityIndex] = useState(null)
  let state = {airIndex, isOpen, isClose, airIndexHistory,airIndexOverall, currentAllCityIndex, setAirIndex,setOpen,setClose,setAirIndexHistory,setAirIndexOverall, setCurrentAllCityIndex}
  ws.onopen = handleSocketOpen
  ws.onclose = handleSocketClose
  ws.onmessage = e => handleMessage(e, state)
  return (
    <div className='container'>
      <section className='header'>
        <nav>
          <a href='/' className='logo'>AQI</a>
          <div className='nav-menu'>
            <ul>
              <li><a href="#cityDetails">Live AQI</a></li>
              <li><a href="#cityList">AQI History</a></li>
            </ul>
          </div>
        </nav>
        <div className="header-container">
            <h1>AIR QUALITY INDEX - INDIA</h1>
            <p>The Air Quality Index, or AQI, is the system used to warn the public when air pollution is dangerous. The AQI tracks ozone (smog) and particle pollution <br/>(tiny particles from ash, power plants and factories, vehicle exhaust, soil dust, pollen, and other pollution), as well as four other widespread air pollutants.</p>
        </div>
      </section>
        <section className="aqi-section-container">
          <div className='air-index-detail-container'>
            {airIndex &&  <Details title="Live AQI of Indian Cities" data={airIndex} currentAllAirIndex={currentAllCityIndex}></Details>}
          </div>
          {airIndexHistory && <ListCities cityList={airIndexHistory} /> }
          {/* {airIndexOverall && <div className='city-comparision-container'><LineChart key={'overall'} data={airIndexOverall} val={'Overall'}></LineChart></div>} */}
        </section>
        <ToastContainer
      />
    </div>
  );
}

export default App;
