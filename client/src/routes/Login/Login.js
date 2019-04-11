import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Button, Input } from 'semantic-ui-react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { routes } from 'config';
import { t_login } from 'redux/thunks';

import styles from './Login.module.css';


const mapDispatchToProps = {
  login: t_login
}

export const _Login = (props) => {
  const { login } = props;

  return (
    <div className={styles.loginPage}>
      <div className="container">
        <div className={styles.loginPageInner}>
          <Formik
            initialValues={{ name: '', password: '' }}
            onSubmit={(values) => login(values)}
            validationSchema={Yup.object().shape({
              name: Yup.string().required('Required'),
              password: Yup.string().required('Required')
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
                      fluid
                    />
                    {errors.name && touched.name && (
                      <span className="regular-input-wrapper__error">
                        {errors.name}
                      </span>
                    )}
                  </div>
                  <div className="regular-input-wrapper">
                    <label className="regular-input-wrapper__label" htmlFor="password">Password</label>
                    <br />
                    <Input
                      id='password'
                      type='password'
                      value={values.password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={errors.password && touched.password}
                      fluid
                    />
                    {errors.password && touched.password && (
                      <span className="regular-input-wrapper__error">
                        {errors.password}
                      </span>
                    )}
                  </div>

                  <div className={styles.formActions}>
                    <Button
                      type="submit"
                      content="Login"
                      fluid
                      positive
                    />

                    <div className={styles.getAccount}>
                      <div className={styles.getAccountText}>
                        ... or if you don't have an account yet, get one in 5 seconds
                      </div>
                      <Link
                        to={routes.signup.path}
                      >
                        <Button
                          content="Signup"
                          color='blue'
                          fluid
                        />
                      </Link>
                    </div>
                  </div>
                </form>
              );
            }}
          </Formik>
        </div>
      </div>
    </div>
  )
}

export const Login = connect(null, mapDispatchToProps)(_Login);

