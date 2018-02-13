import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => (
  <footer>
    <Link to="/about">about</Link> |{' '}
    <a href="https://github.com/pd4d10/echojs">source code</a> |{' '}
    <a href="/rss">rss feed</a> |{' '}
    <a href="https://twitter.com/echojs">twitter</a>
  </footer>
)

export default Footer
