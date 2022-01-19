import React from 'react'
import { fetchStockData } from './api'
import { polygonClient, restClient, websocketClient } from "@polygon.io/client-js";
const rest = restClient("a2qwjfHSc4TWL5AML9sbjFaJTiMV1FPI");

class Graphs extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      data: {},
      listOfStocks: [],
      error: false,
      value: ''
    }
    this.getData = this.getData.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);


  }
  getData(stockTicker){
    console.log("getting data for: " + stockTicker)

    rest.stocks.aggregates(stockTicker, 1, "day", "2021-01-07", "2021-01-14")
      .then((stockData) => {

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
    this.setState({value: event.target.value});

  }

  handleSubmit(event) {
    this.setState({
      listOfStocks: [...this.state.listOfStocks, this.state.value]},
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
          <input value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Add" />
      </form>


      {this.state.error && <p>Failed to load data!</p>}

      {(this.state.listOfStocks.length > 0) && <p>{JSON.stringify(this.state.data)}</p>}
      </React.Fragment>
    )
  }
}

export default Graphs