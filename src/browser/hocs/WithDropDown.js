import React from 'react';
import styled from 'styled-components';
import Colors from 'CONSTANTS/Colors';
import { BoxShadow, NoSelect } from 'MISC/Styles';

const Container = styled.div`
  position: relative;
`;

const DropdownContainer = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  margin-top: 20px;
  min-width: 100%;
  background-color: ${Colors.WHITE};
  border: 1px solid ${Colors.LIGHT_GREY};
  transition: all 0.15s ease-in-out;
  ${BoxShadow}
  
  &:before {
    content: "";
    display: block;
    width: 9px;
    height: 9px;
    background-color: ${Colors.WHITE};
    position: absolute;
    top: 0;
    right: 10px;
    border-left: 1px solid ${Colors.LIGHT_GREY};
    border-top: 1px solid ${Colors.LIGHT_GREY};
    transform: translate3d(-50%, -55%, 0) rotate(45deg);
  }
  
  z-index: ${p => p.visible ? '50' : '-50'};
  opacity: ${p => p.visible ? '1' : '0'};
  transform: translate3d(0, ${p => p.visible ? '0' : '15px'}, 0);
`;

const ButtonContainer = styled.div`
  border: 1px solid red;
  cursor: pointer;
  ${NoSelect};
`;

export default (DropDownComponent) => (ButtonComponent) => {
  return class extends React.PureComponent {
    constructor (props) {
      super(props);

      this.buttonRef = React.createRef();
      this.dropdownRef = React.createRef();
      this.state = {
        isOpen: false
      };
    }

    componentDidMount () {
      document.addEventListener('click', this.watchClick);
    }

    componentWillUnmount () {
      document.removeEventListener('click', this.watchClick);
    }

    toggleDropdown = (event) => {
      event.stopPropagation();
      event.preventDefault();
      event.nativeEvent.stopImmediatePropagation();
      this.setState({ isOpen: !this.state.isOpen });
    };

    watchClick = (event) => {
      const { target } = event;

      // Click inside the dropdown, do nothing
      if (this.dropdownRef.current === target ||
        this.dropdownRef.current.contains(target)) {
        return;
      }

      // Close dropdown
      this.setState({ isOpen: false });
    };

    render () {
      const { isOpen } = this.state;

      return (
        <Container
          onClick={this.toggleDropdown}
          {...this.props}
          >
          <ButtonContainer>
            <ButtonComponent ref={this.buttonRef} />
          </ButtonContainer>
          <DropdownContainer
            ref={this.dropdownRef}
            visible={isOpen}
            >
            <DropDownComponent />
          </DropdownContainer>
        </Container>
      );
    }
  };
};