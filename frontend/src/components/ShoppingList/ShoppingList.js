import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { ShoppingListItem } from './ShoppingListItem/ShoppingListItem';
import { a_storeShoppingItems, a_setShoppingItemsStatus } from 'redux/actions';
import { api } from 'services/api/api';


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
    <div>
      {shoppingItems.list.map((item) => <ShoppingListItem key={item._id} {...item} />)}
    </div>
  );
};

export const ShoppingList = connect(mapStateToProps, mapDispatchToProps)(_ShoppingList);
