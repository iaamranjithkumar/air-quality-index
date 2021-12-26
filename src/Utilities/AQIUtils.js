import { SetParams, exportCities } from "./Common"
export function handleMessage(e, state){
    let data = JSON.parse(e.data)
    let currentAirIndex = {...state.airIndex} 
    let currentAirIndexHistory = state.airIndexHistory ? {...state.airIndexHistory} : {...state.airIndex}
    data.forEach(x=>{
      let currentCityDetails = SetParams(x.aqi, currentAirIndex && currentAirIndex[x.city])
      currentAirIndex[x.city] = currentCityDetails
      var d = new Date(currentCityDetails.currentTimestamp) 
      d = `${d.getDate()}/${d.getMonth()} ${d.getHours()}:${d.getMinutes()}:${parseInt(d.getSeconds()) - parseInt(d.getSeconds()%20)}`
      if(currentAirIndexHistory[x.city]){
        if(currentAirIndexHistory[x.city]['data'] && currentAirIndexHistory[x.city]['data'][d]){
          currentAirIndexHistory[x.city]['data'][d].sum = parseFloat(currentAirIndexHistory[x.city]['data'][d].sum) + parseFloat(currentCityDetails.score)
          currentAirIndexHistory[x.city]['data'][d].count+=1
        }
        else{
          currentAirIndexHistory[x.city]['data'][d] = {sum:currentCityDetails.score, count:1}
        }
      }
      else{
        if(!currentAirIndexHistory[x.city]){
          currentAirIndexHistory[x.city]={}
        }
        currentAirIndexHistory[x.city]['data'] = {[d]:{sum:currentCityDetails.score, count:1}}
      }
      currentAirIndexHistory[x.city].results = calculateChartValues(currentAirIndexHistory[x.city]['data'],x.city)
    })

    state.setAirIndex(currentAirIndex)
    state.setAirIndexHistory(currentAirIndexHistory)
    state.setAirIndexOverall(combinedChartResult(currentAirIndexHistory))
    state.setCurrentAllCityIndex(overallChartResults(currentAirIndex))
  }

  function calculateChartValues(data,city){
    let results = {labels:[], datasets:[{data:[],label:city, fill:'origin', borderColor: exportCities[city].borderColor, backgroundColor:exportCities[city].backgroundColor, borderWidth: 2}]}
    const keys = Object.keys(data)
    let limit = keys.length>35 ? keys.length-35 : 0
    keys.forEach((x,i)=>{
      if(i>=limit){
        results.labels.push(x)
        results.datasets[0].data.push(parseFloat(data[x].sum/data[x].count).toFixed(2))
      }
    })
    return results
  }

  function combinedChartResult(data){
    let results = {labels:[], datasets:[]}
    Object.keys(data).forEach(x=>{
      if(data[x]){
        let dataset={...data[x].results.datasets[0]}
        dataset.fill=false
        results.datasets.push(dataset)
        results.labels.push(...data[x].results.labels)
      }
    })
    results.labels = [...new Set(results.labels)]
    return results
  }

  function overallChartResults(data){
    let results = {labels:[], datasets:[{data:[],label:'Air Quality Index', fill:true, backgroundColor:'rgba(75, 192, 192, 0.2)',borderColor:'rgba(7, 129, 129, 1)', borderWidth: 1}]}
    Object.keys(data).forEach(city=>{
        if(data[city]){
            results.labels.push(city)
            results.datasets[0].data.push(data[city].score)
        }
    })
    return results
  }