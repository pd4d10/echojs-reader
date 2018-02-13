import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => (
  <header>
    <h1>
      <Link to="/">Echo JS</Link>
    </h1>
    <nav>
      <Link to="/">top</Link>
      <Link to="/latest">latest</Link>
      <Link to="/random">random</Link>
      <Link to="/submit">submit</Link>
    </nav>
    <nav id="account">
      <a href="/login">login / register</a>
    </nav>
    <a id="link-menu-mobile" href="#">
      &lt;~&gt;
    </a>
  </header>
)

export default Header
