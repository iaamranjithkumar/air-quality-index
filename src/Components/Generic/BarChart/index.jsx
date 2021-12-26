import './index.css'
import {Bar} from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
// Register the plugin to all charts:
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);
export default function BarChart(props){
    return(<div className={'bar-chart'}>
      <Bar
        data={props.data}
        options={props.options || {}}
        height={props.height}
    ></Bar></div>)
}