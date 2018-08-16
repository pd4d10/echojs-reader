import React from 'react'
import List from '../components/list'

export class LatestScreen extends React.Component {
  render() {
    return <List {...this.props} sort="latest" />
  }
}
