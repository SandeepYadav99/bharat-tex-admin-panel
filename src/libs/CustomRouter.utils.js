/**
 * Created by charnjeetelectrovese@gmail.com on 7/9/2019.
 */
import React, { Component, Suspense } from 'react';
import { Route, Redirect } from 'react-router-dom';
import {connect, useSelector} from 'react-redux';
import { bindActionCreators } from 'redux';
import RouteName from "../routes/Route.name";
import WaitingComponent from "../components/Waiting.component";
import Constants from "../config/constants";


const CustomRouter = (props) => {
  const { component: Component, roles, ...rest } = props;
  const { is_authenticated, role } = useSelector(state => state.auth);

  if (!is_authenticated && props.private) {
      return (  <Route {...rest} render = {(childProps) => (
              <Redirect to={{
                  pathname : '/login',
                  state : { from: childProps.location}
              }}/>
          )}
          />
      )
  }
  if (roles) {
      const isThere = roles.indexOf(Constants.ROLES.GENERAL) >= 0 || roles.indexOf(role) >= 0;
      if (!isThere) {
         return (  <Route {...rest} render = {(childProps) => (
                 <Redirect to={{
                     pathname : RouteName.EMPLOYEE_DASHBOARD,
                     state : { from: childProps.location}
                 }}/>
             )}
             />
         )
      }
  }
  return (<Route {...rest} render={(childProps) => {
      return (
          <Suspense fallback={<WaitingComponent/>}>
        <Component {...childProps} board_type={props.board_type} category={props.category}  {...props}/>
          </Suspense>
      );
    }}
  />
  );
};


export default (CustomRouter);
