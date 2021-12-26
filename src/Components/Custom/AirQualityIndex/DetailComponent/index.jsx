import BarChart from '../../../Generic/BarChart'
import { GetlastUpdated, tableHeadings, ratingStandards } from '../../../../Utilities/Common'
import Table from '../../../Generic/Table'
import './index.css'

export default function Details(props){
    let tableBody=[]
    Object.keys(props.data).sort().forEach(x=>{
        tableBody.push({
            style:{backgroundColor: (props.data[x] && props.data[x].color) || 'transparent'},
            data:[
                {data:x},
                {style:{fontWeight: 500},data:(props.data[x] && props.data[x].score)|| 'Fetching...'},
                {data:(props.data[x] && GetlastUpdated(props.data[x].currentTimestamp || new Date())) || ''}
            ]
        })
    })
    
    return(<section className='all-city-detail-container' id="cityDetails">
        <h3>{props.title}</h3>
        <div className='aqi-details-data'>
            <div className = "row">
                <div className='aqi-detail-table'>
                    <Table headings={{data:tableHeadings}} body={tableBody}/>
                </div>
                <div className='rating-standards'>
                    <ul style={{ listStyle: 'none' }}>
                        {Object.keys(ratingStandards).map((x)=>{
                            return(<li key={x}>
                                <span className='color-standard' style={{backgroundColor: ratingStandards[x].color}}></span><span className='color-standard-text'>{x}({ratingStandards[x].range})</span>
                            </li>
                        )})}
                    </ul>
                </div>
            </div>
        </div>
       {props.currentAllAirIndex && <div className='aqi-all-city-content'>
           <h3>Live AQI Chart</h3>
           <div className='aqi-bar-chart'>
                <BarChart data={props.currentAllAirIndex}></BarChart>
            </div>
        </div>}
    </section>)
}