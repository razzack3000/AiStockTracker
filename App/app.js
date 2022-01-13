import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import Graphs from './Graphs.js'
class App extends React.Component {

  render() {
   return(
     <Graphs />
   )
  }
}


ReactDOM.render(<App/>, document.getElementById('app'));