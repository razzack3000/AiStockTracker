import React from 'react'
import { fetchStockData } from './api'
import { polygonClient, restClient, websocketClient } from "@polygon.io/client-js";
const rest = restClient("a2qwjfHSc4TWL5AML9sbjFaJTiMV1FPI");

class Graphs extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      data: {},
      listOfStocks: ['AAPL','GOOG'],
      error: false
    }

    for (let ticker of this.state.listOfStocks) {
      this.getData(ticker)
    }

    const getData = this.getData.bind(this);
  }
  getData(stockTicker){
    rest.stocks.previousClose(stockTicker)
      .then((stockData) => {
        //console.log(data)
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

  render() {
    return (
      <React.Fragment>
      {this.state.error && <p>"failed to load data!"</p>}
      {!this.state.error && <p>{JSON.stringify(this.state.data)}</p>}
      </React.Fragment>


    )
  }
}

export default Graphs