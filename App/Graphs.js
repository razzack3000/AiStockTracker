import React from 'react'
import { fetchStockData } from './api'
import Graph from './Graph.js'
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

    this.getData = this.getData.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  getData(stockTicker,startDate,endDate){
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
    this.setState({[event.target.name]: event.target.value});

  }

  handleSubmit(event) {
    this.setState({
      listOfStocks: [...this.state.listOfStocks, this.state.ticker],
      dateValueStart:this.state.dateValueStart,
      dateValueEnd: this.state.dateValueEnd
    },
      () => {
        this.state.listOfStocks.map((index) => {
          this.getData(index)
        })
      }
    );

    event.preventDefault();
  }


  render() {

    return (
      <React.Fragment>
       <form onSubmit={this.handleSubmit}>

        <label>
          Add your desired stock ticker:
          <input value={this.state.ticker} name='ticker' onChange={this.handleChange} />
        </label>

        <label>
          Please input desired date range
          <input value={this.state.dateValueStart} name='dateValueStart' onChange={this.handleChange} />
          <input value={this.state.dateValueEnd} name='dateValueEnd' onChange={this.handleChange} />
        </label>
        <input type="submit" value="Add" />
      </form>

      {this.state.error && <p>Failed to load data!</p>}

      {/* {(this.state.listOfStocks.length > 0) && <p>{JSON.stringify(this.state.data)}</p>} */}
      {(this.state.listOfStocks.length > 0) &&
      this.state.listOfStocks.map((i) => (
        <Graph data={this.state.data} ticker={i}/>

      ))}

    </React.Fragment>
    )
  }
}

export default Graphs