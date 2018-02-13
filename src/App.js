import React, { Component } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import Header from './header'
import Footer from './footer'

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Header />
          <Footer />
        </div>
      </Router>
    )
  }
}

export default App
