import React, { Component } from "react";
import NoteButton from "./NoteButton";
import { connect } from "react-redux";
import { actionsTypes, dispatchAction } from "../actions/actions";
import PropTypes from "prop-types";
import "./NotesList.scss";
import filter from "../static/filter.svg";
class NotesList extends Component {
  constructor() {
    super();
    this.state = {
      query: ""
    };
    this.filterNotes = evt => {
      const { value: query } = evt.currentTarget;
      this.setState({ query });
    };
  }
  componentDidMount() {
    dispatchAction(actionsTypes.LIST_NOTES);
  }
  renderNotes = () => {
    const { notes, currentNoteId } = this.props;
    if (notes.length === 0) {
      return <div className="no-notes">No notes to display</div>;
    }
    const { query } = this.state;
    return notes.map((item, i) => {
      return item.title.toLowerCase().indexOf(query.toLowerCase()) > -1 ? (
        <NoteButton
          key={i}
          {...item}
          selected={currentNoteId === item.id ? true : false}
        />
      ) : null;
    });
  };
  render() {
    const { notes } = this.props;
    return (
      <div className="notes-list">
        {notes.length > 0 && (
          <div className="notes-search">
            <img src={filter} />
            <input
              type="text"
              placeholder="filter notes"
              value={this.state.query}
              onChange={this.filterNotes}
            />
          </div>
        )}
        {this.renderNotes()}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    notes: state.notes,
    currentNoteId: state.currentNote.id
  };
}

NotesList.propTypes = {
  notes: PropTypes.array,
  currentNoteId: PropTypes.number
};

export default connect(mapStateToProps)(NotesList);
