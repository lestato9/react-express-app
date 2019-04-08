import React from 'react';
import { Modal, Button, Input } from 'semantic-ui-react';
import { Formik } from 'formik';
import { connect } from 'react-redux';
import * as Yup from 'yup';

import { t_createShoppingItem } from 'redux/actions';

import styles from './AddShoppingListItemModal.module.css';

const mapDispatchToProps = { createShoppingItem: t_createShoppingItem };

export const _AddShoppingListItemModal = ({ isModalVisible, closeModal, createShoppingItem }) => {
  return (
    <Modal
      open={isModalVisible}
      onClose={closeModal}
      className={styles.modal}
    >
      <Modal.Header>Add new item to your shopping list</Modal.Header>
      <Modal.Content>
        <Formik
          initialValues={{ name: '' }}
          onSubmit={(values) => {
            createShoppingItem(values);
            closeModal();
          }}
          validationSchema={Yup.object().shape({
            name: Yup.string().required('Required')
          })}
        >
          {(props) => {
            const { values, errors, touched, handleChange, handleBlur, handleSubmit } = props;

            return (
              <form onSubmit={handleSubmit}>
                <div className="regular-input-wrapper">
                  <label className="regular-input-wrapper__label" htmlFor="name">Name</label>
                  <br />
                  <Input
                    id='name'
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.name && touched.name}
                  />
                  {errors.name && touched.name && (
                    <span className="regular-input-wrapper__error">
                      {errors.name}
                    </span>
                  )}
                </div>

                <div className={styles.modalActions}>
                  <Button type="button" onClick={closeModal} content="Discard" />
                  <Button
                    type="submit"
                    content="Add"
                    disabled={!!Object.keys(errors).length}
                    positive
                  />
                </div>
              </form>
            );
          }}
        </Formik>
      </Modal.Content>
    </Modal>
  )
}

export const AddShoppingListItemModal = connect(null, mapDispatchToProps)(_AddShoppingListItemModal);
