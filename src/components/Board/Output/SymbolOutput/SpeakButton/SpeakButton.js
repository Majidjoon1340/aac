import React, { Component } from 'react';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import VolumeUpIcon from '@material-ui/icons/VolumeUp';
import { Scannable } from 'react-scannable';

export class SpeakButton extends Component {
  static propTypes = {
    hidden: PropTypes.bool,
    onClick: PropTypes.func,
    increaseOutputButtons: PropTypes.bool
  };

  render() {
    const { hidden, onClick, increaseOutputButtons, ...other } = this.props;

    return (
      <Scannable disabled={hidden}>
        <IconButton
          aria-label="Speak sentence"
          onClick={onClick}
          className={
            increaseOutputButtons ? 'Output__button__lg' : 'Output__button__sm'
          }
          style={{
            backgroundColor: '#2e7d32',
            color: '#ffffff',
            margin: '0 4px',
            boxShadow: '0 2px 8px rgba(46, 125, 50, 0.4)',
            visibility: hidden ? 'hidden' : 'visible'
          }}
          {...other}
        >
          <VolumeUpIcon
            className={
              increaseOutputButtons ? 'Output__icon__lg' : 'Output__icon__sm'
            }
            style={{ color: '#ffffff' }}
          />
        </IconButton>
      </Scannable>
    );
  }
}

export default SpeakButton;
