import React, { Component } from 'react'
import { ShoppingList } from 'components/ShoppingList/ShoppingList';

import styles from './Dashboard.module.css';

export class Dashboard extends Component {
  render() {
    return (
      <div className={styles.dashoboardPage}>
        <div className="container">
          <ShoppingList />
        </div>
      </div>
    )
  }
}
