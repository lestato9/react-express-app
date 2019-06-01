import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { List, Button } from 'semantic-ui-react';

import { ShoppingListItem } from './ShoppingListItem/ShoppingListItem';
import { AddShoppingListItemModal } from './AddShoppingListItemModal/AddShoppingListItemModal';
import { t_getShoppingItems } from 'redux/thunks';
import { getPropSafe } from 'helpers';

import styles from './ShoppingList.module.css';


const mapStateToProps = ({ shoppingItems }) => ({
  shoppingItems
});

const mapDispatchToProps = {
  getShoppingItems: t_getShoppingItems
};

export const _ShoppingList = ({ shoppingItems, getShoppingItems }) => {
  const [isModalVisible, changeModalState] = useState(false);

  const openModal = () => changeModalState(true);
  const closeModal = () => changeModalState(false);

  useEffect(() => getShoppingItems(), []);

  return (
    <>
      <List verticalAlign='middle' divided>
        <List.Header className={styles.shoppingListHeader}>
          <div>
            <h1>Your shopping list</h1>
            <div>List is common and free to edit for anyone logged in, so I'm not responsible for its content</div>
          </div>
          <Button
            onClick={openModal}
            className={styles.shoppingListAddBtn}
            color="blue"
            icon="add square"
            content="Add"
          />
        </List.Header>
        {getPropSafe(() => shoppingItems.list, []).map((item) => <ShoppingListItem key={item._id} {...item} />)}
      </List>

      <AddShoppingListItemModal
        isModalVisible={isModalVisible}
        closeModal={closeModal}
      />
    </>
  );
};

export const ShoppingList = connect(mapStateToProps, mapDispatchToProps)(_ShoppingList);
