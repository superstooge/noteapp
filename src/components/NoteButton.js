import React, { Component } from 'react';
import { actionsTypes, dispatchAction } from '../actions/actions';
import arrow from '../static/arrow-point-to-right.svg';
import PropTypes from 'prop-types';
import './NoteButton.scss';
class NoteButton extends Component {
  onClickNote = () => {
    const { id } = this.props;
    dispatchAction(actionsTypes.LOAD_NOTE, id);
  };
  render() {
    const { title, selected } = this.props;
    return (
      <div
        className={`button-note ${selected ? 'button-note-selected' : ''}`}
        onClick={this.onClickNote}
      >
        {title}
        <span className="button-note-arrow">
          <img alt="click to edit note" src={arrow} />
        </span>
      </div>
    );
  }
}

NoteButton.propTypes = {
  title: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  selected: PropTypes.bool
};

export default NoteButton;
