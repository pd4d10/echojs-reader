import React, { Component } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import Header from './header'
import Footer from './footer'
import Content from './content'

const items = [
  {
    id: 24228,
    title: 'React v16.0 released!',
    url: 'https://facebook.github.io/react/blog/2017/09/26/react-v16.0.html',
    domain: 'facebook.github.io',
    up: 26,
    down: 0,
    time: '4 days ago',
    comment_count: 2,
  },
]

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Header />
          <Content items={items} />
          <Footer />
        </div>
      </Router>
    )
  }
}

export default App
