import React, { useState } from 'react'
import { fetchStockData } from './api'
import Graph from './Graph.js'
import "./index.css";
import { polygonClient, restClient, websocketClient } from "@polygon.io/client-js";
const rest = restClient("a2qwjfHSc4TWL5AML9sbjFaJTiMV1FPI");


class Graphs extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      data: {},
      listOfStocks: [],
      error: false,
      ticker: '',
      dateValueStart:'',
      dateValueEnd: ''
    }
    this.counter = 0;
    this.getData = this.getData.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.deleteGraph = this.deleteGraph.bind(this);
  }
  getData(stockTicker,startDate,endDate){
    console.log("getting data for: " + stockTicker)

    rest.stocks.aggregates(stockTicker, 1, "day", this.state.dateValueStart, this.state.dateValueEnd)
      .then((stockData) => {
      // use the following format for date 2021-01-17
        this.counter++
        // this.setState({
        //     data: {...this.state.data, [stockTicker]: {...this.state.data[stockTicker], [this.counter]: stockData.results}}
        // })
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
    if(this.state.data[this.state.ticker]){
     // this.counter++
      this.setState({
        listOfStocks: [...this.state.listOfStocks, `${this.state.ticker} ${this.counter}`],
        //  dateValueStart:this.state.dateValueStart,
        //  dateValueEnd: this.state.dateValueEnd
      },
      () => {
      //this.state.listOfStocks.map((index) => {
        this.getData(this.state.listOfStocks[this.state.listOfStocks.length-1])
      //})
    }
  )
  } else { this.setState({
    listOfStocks: [...this.state.listOfStocks, `${this.state.ticker}`],
    //  dateValueStart:this.state.dateValueStart,
    //  dateValueEnd: this.state.dateValueEnd
  },
    () => {
      //this.state.listOfStocks.map((index) => {
        this.getData(this.state.listOfStocks[this.state.listOfStocks.length-1])
      //})
    }
  ) }

  event.preventDefault();
}


  deleteGraph(selectedTicker){
    const newTickers = this.state.listOfStocks.filter((element) => {
      return element !== selectedTicker
    });
    console.log(newTickers)
    this.setState({
      listOfStocks: newTickers
    })
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
        {(this.state.listOfStocks.length > 0) &&
        this.state.listOfStocks.map((i) => (
          <Graph key={`${i}-stock`} data={this.state.data} ticker={i} counter={this.counter} latestStock={this.state.listOfStocks[this.state.listOfStocks.length-1]} deleteGraph={this.deleteGraph}/>
        ))}
        </div>
      </div>
    )
  }
}

export default Graphs