import React, { Fragment } from 'react';
import styled from 'styled-components';
import _ from 'lodash';
import { Query, Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import Loader from '../components/Loader';
import RestaurantCard from '../components/RestaurantCard';
import Input from 'COMPONENTS/Form/BaseInput';
import Button from 'COMPONENTS/Form/BaseButton';

/* QUERIES */
const GET_RESTAURANTS_LIST = gql`
  {
    restaurantsList {
      id,
      name,
      rating
    }
  }
`;

const List = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

export default class RestaurantsList extends React.Component {
  render () {
    return (
      <Query query={GET_RESTAURANTS_LIST}>
        {({ error, loading, data }) => {
          if (error) return <p>Error</p>;
          if (loading) return <p>Loading</p>;

          return data.restaurantsList.map(r => <RestaurantCard key={r.id} {...r} />)
        }}
      </Query>
    );
  }
}