import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

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
    console.log(data);
    return (
      //<p>{JSON.stringify(this.props.data)}</p>
      <React.Fragment >
      {data && <AreaChart className="graph"
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

    {stockTickerConversion[this.props.ticker] ? <p className="ticker">{stockTickerConversion[this.props.ticker]}</p> : <p>{this.props.ticker}</p>}

    </React.Fragment>

    )
  }
}

export default Graph
