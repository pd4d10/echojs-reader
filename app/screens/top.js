import React from 'react'
import List from '../components/list'

export default class TopScreen extends React.Component {
  render() {
    return <List {...this.props} sort="top" />
  }
}
