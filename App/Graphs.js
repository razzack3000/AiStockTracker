import React from 'react'
import { fetchStockData } from './api'
import { polygonClient, restClient, websocketClient } from "@polygon.io/client-js";
const rest = restClient("a2qwjfHSc4TWL5AML9sbjFaJTiMV1FPI");

class Graphs extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      data: {},
      listOfStocks: ['AAPL']
    }
    const getData = this.getData.bind(this);
  }
  getData(stockTicker){
    rest.stocks.previousClose(stockTicker)
    .then((stockData) => {
      //console.log(data)
      this.setState({
        data: {...this.state.data, stockTicker: stockData}
      })
    })
  }

  render() {
    for (let ticker in this.state.listOfStocks) {
      this.getData(ticker)
    }
    return (
     <h1>{JSON.stringify(this.state.data)}</h1>

    )
  }
}

export default Graphs