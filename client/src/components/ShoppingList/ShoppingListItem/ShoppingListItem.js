import React, { useState } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { List, Button, Icon } from 'semantic-ui-react';

import { t_deleteShoppingItem } from 'redux/thunks';

import styles from './ShoppingListItem.module.css';

const mapDispatchToProps = {
  deleteShoppingItem: t_deleteShoppingItem
};

export const _ShoppingListItem = ({ _id, name, date, deleteShoppingItem }) => {
  return (
    <List.Item>
      <div className={styles.shoppingItem}>
        <div className={styles.shoppingItemData}>
          <b className="truncate-text">{name}</b>
          <div className="truncate-text">{moment(date).format('DD.MM.YY hh:mm:ss')}</div>
        </div>
        <div className={styles.shoppingItemControls}>
          <Button
            onClick={() => deleteShoppingItem(_id)}
            className={styles.shoppingItemDelBtn}
            color="red"
            icon
            compact
          >
            <Icon name="trash" />
          </Button>
        </div>
      </div>
    </List.Item>
  )
}

export const ShoppingListItem = connect(null, mapDispatchToProps)(_ShoppingListItem);
