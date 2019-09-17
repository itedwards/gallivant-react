import React from 'react'

export default class CardList extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <pre>{JSON.stringify(this.props.pins, null, 2)}</pre>
    )
    
  }
}