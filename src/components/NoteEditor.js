import React, { Component } from 'react';
import saveIcon from '../static/save.svg';
import { connect } from 'react-redux';
import {
  Editor,
  EditorState,
  convertFromRaw,
  RichUtils,
  getDefaultKeyBinding,
  convertToRaw,
  Modifier
} from 'draft-js';
import {
  InlineStyleControls,
  BlockStyleControls,
  getBlockStyle,
  styleMap
} from './StylesControl';
import { actionsTypes, dispatchAction } from '../actions/actions';
import PropTypes from 'prop-types';
import './NoteEditor.scss';

class NoteEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      id: null,
      editorState: EditorState.createEmpty()
    };
    this.focus = () => this.refs.editor.focus();
    this.onChange = editorState => {
      return this.setState({ editorState });
    };
    this.onClickSave = () => {
      const { editorState, title } = this.state;
      if (this.isUpdated() && title !== '') {
        const { id } = this.props.currentNote;
        dispatchAction(actionsTypes.SAVE_NOTE, {
          id,
          title,
          note: JSON.stringify(convertToRaw(editorState.getCurrentContent()))
        });
      }
    };
    this.isUpdated = () => {
      const { note, title } = this.props.currentNote;
      return (
        (JSON.stringify(
          convertToRaw(this.state.editorState.getCurrentContent())
        ) !== note ||
          title !== this.state.title) &&
        this.state.title !== ''
      );
    };
    this.handleKeyCommand = this.handleKeyCommand.bind(this);
    this.mapKeyToEditorCommand = this.mapKeyToEditorCommand.bind(this);
    this.toggleBlockType = this.toggleBlockType.bind(this);
    this.toggleInlineStyle = this.toggleInlineStyle.bind(this);
    this.onChangeTitle = this.onChangeTitle.bind(this);
  }

  static getDerivedStateFromProps(props, state) {
    const { id, title, note } = props.currentNote;
    const { voiceInput } = props;
    let newState = { ...state };
    if (id && id !== state.id) {
      let blocks = JSON.parse(note);
      newState.editorState = EditorState.createWithContent(
        convertFromRaw(blocks)
      );
      newState.title = title;
    }
    if (!id && id !== state.id) {
      newState.editorState = EditorState.createEmpty();
      newState.title = '';
    }
    if (voiceInput !== '') {
      console.log('adding new text from voice', voiceInput);
      const newContent = Modifier.insertText(
        state.editorState.getCurrentContent(),
        state.editorState.getSelection(),
        voiceInput
      );

      const editorState = EditorState.push(
        state.editorState,
        newContent,
        'insert-fragment'
      );
      newState.editorState = editorState;
    }
    newState.id = id;
    return newState;
  }
  componentDidUpdate() {
    const { voiceInput } = this.props;
    if (voiceInput !== '') {
      dispatchAction(actionsTypes.SPEECH_INPUT_CLEAR);
    }
  }
  onChangeTitle(evt) {
    const { value: title } = evt.currentTarget;
    this.setState({ title });
  }
  handleKeyCommand(command, editorState) {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      this.onChange(newState);
      return true;
    }
    return false;
  }
  mapKeyToEditorCommand(e) {
    if (e.keyCode === 9 /* TAB */) {
      const newEditorState = RichUtils.onTab(
        e,
        this.state.editorState,
        4 /* maxDepth */
      );
      if (newEditorState !== this.state.editorState) {
        this.onChange(newEditorState);
      }
      return;
    }
    return getDefaultKeyBinding(e);
  }
  toggleBlockType(blockType) {
    this.onChange(RichUtils.toggleBlockType(this.state.editorState, blockType));
  }
  toggleInlineStyle(inlineStyle) {
    this.onChange(
      RichUtils.toggleInlineStyle(this.state.editorState, inlineStyle)
    );
  }
  render() {
    const { editorState, title } = this.state;

    // If the user changes block type before entering any text, we can
    // either style the placeholder or hide it. Let's just hide it now.
    let className = 'RichEditor-editor';
    var contentState = editorState.getCurrentContent();
    if (!contentState.hasText()) {
      if (
        contentState
          .getBlockMap()
          .first()
          .getType() !== 'unstyled'
      ) {
        className += ' RichEditor-hidePlaceholder';
      }
    }
    return (
      <div className="note-editor-group">
        <input
          name="note-title"
          type="text"
          placeholder="Note title"
          className="note-title"
          value={title}
          onChange={this.onChangeTitle}
        />
        <div className="RichEditor-root">
          <BlockStyleControls
            editorState={editorState}
            onToggle={this.toggleBlockType}
          />
          <InlineStyleControls
            editorState={editorState}
            onToggle={this.toggleInlineStyle}
          />
          <div className={className} onClick={this.focus}>
            <Editor
              blockStyleFn={getBlockStyle}
              customStyleMap={styleMap}
              editorState={editorState}
              handleKeyCommand={this.handleKeyCommand}
              keyBindingFn={this.mapKeyToEditorCommand}
              onChange={this.onChange}
              placeholder="Create new note..."
              ref="editor"
              spellCheck={true}
            />
          </div>
        </div>
        <div
          className={`save-button ${
            this.isUpdated() && title !== '' ? '' : 'button-disabled'
          }`}
          onClick={this.onClickSave}
        >
          <img alt="save note" src={saveIcon} />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    currentNote: { ...state.currentNote },
    voiceInput: state.voiceInput
  };
}

NoteEditor.propTypes = {
  title: PropTypes.string,
  id: PropTypes.number,
  note: PropTypes.string,
  voiceInput: PropTypes.string
};

export default connect(mapStateToProps)(NoteEditor);
