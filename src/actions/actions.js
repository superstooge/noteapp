import store from '../store';
export const actionsTypes = {
  LIST_NOTES: 'LIST_NOTES',
  LIST_NOTES_SUCCEEDED: 'LIST_NOTES_SUCCEEDED',
  LIST_NOTES_FAILED: 'LIST_NOTES_FAILED',
  LOAD_NOTE: 'LOAD_NOTE',
  LOAD_NOTE_SUCCEEDED: 'LOAD_NOTE_SUCCEEDED',
  LOAD_NOTE_FAILED: 'LOAD_NOTE_FAILED',
  EDIT_TITLE: 'EDIT_TITLE',
  SAVE_NOTE: 'SAVE_NOTE',
  SAVE_NOTE_FAILED: 'SAVE_NOTE_FAILED',
  CREATE_NEW_NOTE: 'CREATE_NEW_NOTE',
  SPEECH_INPUT_ADD: 'SPEECH_INPUT_ADD',
  SPEECH_INPUT_CLEAR: 'SPEECH_INPUT_CLEAR'
};
export const dispatchAction = (type, payload) => {
  // console.log('action > ', type, payload);
  store.dispatch({
    type,
    payload
  });
};

export const saveNoteSuccededAction = (list, id) => {
  const action = {
    type: 'SAVE_NOTE_SUCCEDED',
    payload: list
  };
  if (id) {
    action.id = id;
  }
  store.dispatch(action);
};
