import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import ModalDialog from '../_shared/ModalDialog';
import DateTextField from '../_shared/DateTextField';
import DomainPropTypes from '../constants/prop-types';

export default class ModalWrapper extends PureComponent {
  static propTypes = {
    value: DomainPropTypes.date,
    children: PropTypes.node.isRequired,
    format: PropTypes.string.isRequired,
    onAccept: PropTypes.func.isRequired,
    onDismiss: PropTypes.func.isRequired,
    allowClear: PropTypes.bool,
    onClear: PropTypes.func.isRequired,
    dialogContentClassName: PropTypes.string,
    invalidLabel: PropTypes.string,
  }

  static defaultProps = {
    dialogContentClassName: '',
    invalidLabel: undefined,
    value: new Date(),
    allowClear: false,
  }

  state = {
    open: false,
  }

  togglePicker = () => {
    this.setState({ open: !this.state.open });
  }

  handleAccept = () => {
    this.togglePicker(); // close
    this.props.onAccept();
  }

  handleDismiss = () => {
    this.togglePicker();
    this.props.onDismiss();
  }

  handleClear = () => {
    this.togglePicker();
    this.props.onClear();
  }

  render() {
    const {
      value,
      format,
      children,
      dialogContentClassName,
      onAccept,
      onDismiss,
      allowClear,
      onClear,
      invalidLabel,
      ...other
    } = this.props;

    return (
      <div>
        <DateTextField
          value={value}
          format={format}
          onClick={this.togglePicker}
          invalidLabel={invalidLabel}
          {...other}
        />

        <ModalDialog
          open={this.state.open}
          onAccept={this.handleAccept}
          onDismiss={this.handleDismiss}
          allowClear={allowClear}
          onClear={this.handleClear}
          dialogContentClassName={dialogContentClassName}
        >
          { children }
        </ModalDialog>
      </div>
    );
  }
}
