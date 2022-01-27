
// Legacy file - Not needed.


export function fetchStockData(){
  return fetch('https://api.polygon.io/v2/aggs/grouped/locale/us/market/stocks/2020-10-14?adjusted=true&apiKey=a2qwjfHSc4TWL5AML9sbjFaJTiMV1FPI')
  // .then((result) => result.json)
  .then((data) => {
    return data
  })
}



import { polygonClient, restClient, websocketClient } from "@polygon.io/client-js";
const rest = restClient("a2qwjfHSc4TWL5AML9sbjFaJTiMV1FPI");

// you can use the api now

rest.stocks
  .previousClose("C:AAPL")
  .then((data) => {
    return data
  })
  .catch(/* your error handler*/);

