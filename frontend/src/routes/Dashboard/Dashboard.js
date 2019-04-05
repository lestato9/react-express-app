import React, { Component } from 'react'
import { ShoppingList } from 'components/ShoppingList/ShoppingList';

export class Dashboard extends Component {
  render() {
    return (
      <div>
        <ShoppingList />
      </div>
    )
  }
}
