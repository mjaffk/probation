import React, { Component } from 'react'

class Menu extends Component {
  render() {
    return (<div className="card w-100 text-center mt-3">
        <div className="card-body">
          { this.props.children }
        </div>
      </div>)
  }
}

export default Menu
