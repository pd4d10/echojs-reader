import React from 'react'
import { Link } from 'react-router-dom'

const Content = props => (
  <div id="content">
    <div id="sitenews">Site News</div>
    <h2>Top news</h2>
    <section id="newslist">
      {props.items.map(item => (
        <article>
          <a className="uparrow" href="#up" onClick={() => {}}>
            ▲
          </a>{' '}
          <h2>
            <a rel="nofollow" href={item.url}>
              {item.title}
            </a>
          </h2>{' '}
          <address>at {item.domain}</address>
          <a className="downarrow" href="#down">
            ▼
          </a>
          <p>
            <span className="upvotes">{item.up}</span> up and{' '}
            <span className="downvotes">{item.down}</span> down, posted by{' '}
            <username>
              <Link to={`/user/${item.user}`}>{item.user}</Link>
            </username>{' '}
            {item.time}{' '}
            <Link to={`/news/${item.id}`}>{item.comment_count} comments</Link>
          </p>
        </article>
      ))}
    </section>
  </div>
)

export default Content
