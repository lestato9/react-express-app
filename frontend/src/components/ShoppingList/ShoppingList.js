import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { List, Button, Icon } from 'semantic-ui-react';
import moment from 'moment';

import { a_storeShoppingItems, a_setShoppingItemsStatus } from 'redux/actions';
import { api } from 'services/api/api';

import styles from './ShoppingList.module.css';



const mapStateToProps = ({ shoppingItems }) => ({
  shoppingItems
});

const mapDispatchToProps = {
  storeShoppingItems: a_storeShoppingItems,
  setShoppingItemsStatus: a_setShoppingItemsStatus
};

export const _ShoppingList = ({ shoppingItems, storeShoppingItems, setShoppingItemsStatus }) => {
  useEffect(() => {
    setShoppingItemsStatus('isLoading', true);

    api.getShoppingItems()
      .then((res) => {
        storeShoppingItems(res.data);
        setShoppingItemsStatus('isErrored', false);
      })
      .catch((err) => {
        setShoppingItemsStatus('isErrored', true);
        throw new Error(err);
      })
      .finally(() => {
        setShoppingItemsStatus('isLoading', false);
      });
  }, []);

  return (
    <List divided verticalAlign='middle'>
      <List.Header className={styles.shoppingListHeader}>
        <h1>Your shopping list</h1>
        <Button className={styles.shoppingListAddBtn} color="green" icon="add square" compact />
      </List.Header>
      {shoppingItems.list.map(({ _id, name, date }) => (
        <List.Item key={_id}>
          <div className={styles.shoppingItem}>
            <div className={styles.shoppingItemData}>
              <b className="truncate-text">{name}</b>
              <div className="truncate-text">{moment(date).format('DD.MM.YY hh:mm:ss')}</div>
            </div>
            <div className={styles.shoppingItemControls}>
              <Button className={styles.shoppingListDelBtn} color="red" icon compact>
                <Icon name="trash" />
              </Button>
            </div>
          </div>
        </List.Item>
      ))}
    </List>
  );
};

export const ShoppingList = connect(mapStateToProps, mapDispatchToProps)(_ShoppingList);
