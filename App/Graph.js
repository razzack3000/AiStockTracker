import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
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
    return (
      <div className="graph">

      {stockTickerConversion[this.props.ticker] ? <p className="graphLabels">{stockTickerConversion[this.props.ticker]}</p> : <p className="graphLabels">{this.props.ticker}</p>}

      <div className="graph">
      {data && <AreaChart
        width={500}
        height={400}
        data={this.props.data[this.props.ticker]}
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0,
        }}
        >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="" />
        <YAxis />
        <Tooltip />
        <Area type="monotone" dataKey="c" stroke="#8884d8" fill="#D8F3FF" />
      </AreaChart>}



      {/* <IconButton size="small" className="button">
        <DeleteIcon onClick={() => this.props.deleteGraph(this.props.ticker)}>

        </DeleteIcon>

        </IconButton> */}


        {/* <IconButton aria-label="delete" onClick={() => this.props.deleteGraph(this.props.ticker)}>
        <DeleteIcon fontSize="inherit" />
        </IconButton> */}

        <Button onClick={() => this.props.deleteGraph(this.props.ticker)} variant="outlined" size="small">
          Remove
        </Button>
      </div>
        </div>
    )
  }
}

export default Graph
