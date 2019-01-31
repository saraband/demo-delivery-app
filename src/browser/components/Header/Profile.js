import React from 'react';
import styled from 'styled-components';
import Colors from 'CONSTANTS/Colors';
import ProfileSVG from 'ASSETS/images/profile.svg';
import FontSizes from 'CONSTANTS/FontSizes';
import BaseButton, { ButtonTypes, TextContainer } from 'COMPONENTS/Form/BaseButton';
import PropTypes from 'prop-types';
import {Breakpoints} from 'HELPERS/MediaQueries';
import { BoxShadow } from 'MISC/Styles';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import LangSelect from './LangSelect';

const Container = styled.div`
  border: 1px solid red;
  display: flex;
  align-items: center;
`;

const ProfileButton = styled(BaseButton).attrs({
  round: true,
  type: ButtonTypes.FULL,
  color: Colors.WHITE
})`
  width: 35px;
  height: 35px;
  
  ${TextContainer} {
    padding: 7px;
  }
`;

const ProfileLogo = styled(ProfileSVG)`
  height: 20px;
`;

const ConnectedAs = styled.p`
  color: ${Colors.WHITE};
  font-size: ${FontSizes.SMALL};
  font-weight: lighter;
  padding: 10px;
`;

const Username = styled.span`
  font-weight: normal;
`;

const GET_ACCOUNT_INFO = gql`
  query accountInfo {
    self {
      username
      email
    }
  }
`;

export default class Index extends React.PureComponent {
  render() {
    return (
      <Query query={GET_ACCOUNT_INFO}>
        {({ data, loading, error }) => {
          if (loading) return <p>Loading</p>;
          if (error) return <p>Error</p>;

          const {
            email,
            username
          } = data.self;

          return (
            <Container>
              <ConnectedAs>Connected as <Username>{username}</Username></ConnectedAs>
              <ProfileButton><ProfileLogo /></ProfileButton>
              <LangSelect />
            </Container>
          );
        }}
      </Query>
    );
  }
};

Index.propTypes = {
  fixedWidth: PropTypes.bool
};

Index.defaultProps = {
  fixedWidth: false
};