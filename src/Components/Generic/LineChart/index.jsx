import './index.css'
import {Line} from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';
// Register the plugin to all charts:
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Filler,
  Tooltip,
  Legend
);
export default function LineChart(props){
    return(<div className={`line-chart line-${props.val}`}>
      <Line
        data={props.data}
        height={200}
    ></Line></div>)
}