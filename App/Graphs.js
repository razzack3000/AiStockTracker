import React, { useState } from 'react'
import { fetchStockData } from './api'
import Graph from './Graph.js'
import "./index.css";
import { polygonClient, restClient, websocketClient } from "@polygon.io/client-js";
const rest = restClient("a2qwjfHSc4TWL5AML9sbjFaJTiMV1FPI");
import DatePicker from "react-datepicker";



class Graphs extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      data: {},
      error: false,
      ticker: '',
      dateValueStart:'',
      dateValueEnd: ''
    }
    this.getData = this.getData.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.deleteGraph = this.deleteGraph.bind(this);
  }
  getData(stockTicker){
    console.log("getting data for: " + stockTicker)

    rest.stocks.aggregates(stockTicker, 1, "day", this.state.dateValueStart, this.state.dateValueEnd)
      .then((stockData) => {
      // use the following format for date 2021-01-17

        this.setState({
          data: {...this.state.data, [stockTicker]: stockData.results}
      })
    })
      .catch(e => {
        console.log(e)
        this.setState({
          error: true
        })
      })
  }
  handleChange(event) {
    this.setState({[event.target.name]: [event.target.value]});
    event.preventDefault();
  }

  handleSubmit(event) {
  this.getData(this.state.ticker)

  event.preventDefault();
}
  deleteGraph(selectedTicker) {
      let state = {...this.state};
      delete state.data[selectedTicker];
      this.setState(state);

  }
  render() {

    return (
      <div>

        <h1 className="heading">Stock Tracker</h1>
        <form onSubmit={this.handleSubmit}>
          <div className="tickerData">
            <label >
            Add your desired stock ticker:
            </label>
          </div >
            <div className="tickerData">
              <input className="tickerDataInput" value={this.state.ticker} name='ticker' onChange={this.handleChange} />

            </div>

            <div className="tickerData">
            <div className="tickerData">
            <label >
                Please input desired date range (ex: 2020-01-15)
            </label>
            </div>


            <div className="tickerDataInput">

              <input className="tickerDataInput" value={this.state.dateValueStart} name='dateValueStart' onChange={this.handleChange} />
            </div>

            <div className="tickerData">
            <label>
              To:
            </label >
            </div>

            <div className="tickerDataInput">
              <input className="tickerDataInput" value={this.state.dateValueEnd} name='dateValueEnd' onChange={this.handleChange} />
            </div>

            <div className="tickerDataInputAdd">
              <input className="tickerDataInput" type="submit" value="Add" />
            </div>

            </div>
        </form>

      {this.state.error && <p>Failed to load data!</p>}

        <div className="container">
        {(Object.keys(this.state.data).length > 0) &&
        Object.keys(this.state.data).map((element,i) => (
          <Graph key={`${i}`} data={this.state.data} ticker={element}  deleteGraph={this.deleteGraph}/>
        ))}
        </div>
      </div>
    )
  }
}

export default Graphs