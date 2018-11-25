import Api from '../utils/Api';
export const notesReducer = (state = {}, action) => {
  if (action.type === 'LIST_NOTES') {
    Api.getNotes();
  }
  if (action.type === 'LIST_NOTES_SUCCEEDED') {
    state = { ...state, notes: action.payload };
  }
  if (action.type === 'LIST_NOTES_FAILED') {
    state = { ...state, errors: action.payload };
  }
  if (action.type === 'LOAD_NOTE') {
    Api.loadNote(action.payload);
  }
  if (action.type === 'LOAD_NOTE_SUCCEEDED') {
    state = { ...state, currentNote: action.payload };
  }
  if (action.type === 'LOAD_NOTE_FAILED') {
    state = { ...state, errors: action.payload };
  }
  if (action.type === 'EDIT_TITLE') {
    state = {
      ...state,
      currentNote: { ...state.currentNote, title: action.payload }
    };
  }
  if (action.type === 'SAVE_NOTE') {
    state = {
      ...state,
      currentNote: {
        ...state.currentNote,
        title: action.payload.title,
        note: action.payload.note
      }
    };
    Api.saveNote(action.payload);
  }
  if (action.type === 'SAVE_NOTE_SUCCEDED') {
    state = { ...state, notes: action.payload };
    if (action.hasOwnProperty('id')) {
      state.currentNote.id = action.id;
    } else {
      state.currentNote.id = action.payload[0].id;
    }
  }
  if (action.type === 'CREATE_NEW_NOTE') {
    state = {
      ...state,
      currentNote: { id: null, title: '', note: '' }
    };
  }
  if (action.type === 'SPEECH_INPUT_ADD') {
    state = {
      ...state,
      voiceInput: action.payload
    };
  }
  if (action.type === 'SPEECH_INPUT_CLEAR') {
    state = {
      ...state,
      voiceInput: ''
    };
  }

  return state;
};
