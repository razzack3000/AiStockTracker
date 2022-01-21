import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

class Graph extends React.Component {
  constructor(props){
    super(props)
  }

  render() {

    return (
      //<p>{JSON.stringify(this.props.data)}</p>
      <React.Fragment>
      <AreaChart
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
        <XAxis dataKey="c" />
        <YAxis />
        <Tooltip />
        <Area type="monotone" dataKey="c" stroke="#8884d8" fill="#8884d8" />
      </AreaChart>
    </React.Fragment>

    )
  }
}

export default Graph
