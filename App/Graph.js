import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Label, ResponsiveContainer } from 'recharts';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

import "./index.css";

class Graph extends React.Component {
  constructor(props){
    super(props)
  }

  render() {
     const stockTickerConversion = {
      "AAPL": 'Apple',
      "GOOG": 'Google',
      "TSLA": 'Tesla',
      "MSFT": 'Microsoft',
      "AMD": 'AMD',
      "NVDA": 'Nvidia',
      "NFLX": 'Netflix'
    }
     const data = this.props.data[this.props.ticker];

     const closingPrice = data[data.length-1].c
     console.log(closingPrice)
    return (
      <div className="graph">
      {stockTickerConversion[this.props.ticker] ? <p className="graphLabels">{stockTickerConversion[this.props.ticker]}</p> : <p className="graphLabels">{this.props.ticker}</p>}
      <div className="price">
        <h5>Latest value:  $ {closingPrice}</h5>
      </div>

      <div className="graph">
      <Button onClick={() => this.props.deleteGraph(this.props.ticker)} variant="outlined" size="small">
          Remove
        </Button>
      {data && <AreaChart
        width={500}
        height={400}
        data={this.props.data[this.props.ticker]}
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 10,
        }}
        >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="">
         <Label className="Xaxis"value="Day #s" offset={0} position="insideBottom" />
      </XAxis>
        <YAxis className="Yaxis" label={{ value: 'Value ($)', angle: -90, position: 'insideLeft', textAnchor: 'middle' }} />/>

        <Tooltip />
        <Area type="monotone" dataKey="c" stroke="#8884d8" fill="#D8F3FF" />
      </AreaChart>}


      </div>
        </div>
    )
  }
}

export default Graph
