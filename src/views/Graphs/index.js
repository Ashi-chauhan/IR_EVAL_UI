import React, {useEffect, useState} from 'react'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official';
import Navbar from '../../navbar';

export const Graphs = () => {
	const [graphData, setGraphData] = useState([]);

	const graph1Data = JSON.parse(localStorage.getItem('graph1Data'));
	const graph2Data = JSON.parse(localStorage.getItem('graph2Data'));


	const options1 = {
		title: {
			text: "Precision Data"
		},
		xAxis: {
			categories: ['P_5', 'P_10', 'P_15', 'P_100','P_200' ]
		},
		series: graph1Data
	};

	const options2 = {
		title: {
			text: "Relevant Data"
		},
		xAxis: {
			categories: ['num_q', 'num_rel', 'num_rel_ret', 'map' ]
		},
		series: graph2Data
	};

	return (
		<div>
			<Navbar/>
			<HighchartsReact
				highcharts={Highcharts}
				options={options1}
			/>
			<HighchartsReact
				highcharts={Highcharts}
				options={options2}
			/>
		</div>
	)
};


