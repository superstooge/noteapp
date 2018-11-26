import React from "react";
import { shallow, mount } from "enzyme";
import NoteEditor from "../components/NoteEditor";
import "../setupTest";
import configureStore from "redux-mock-store";
import { Editor, convertToRaw } from "draft-js";
const initialState = {
  currentNote: {
    id: 3,
    title: "TODO list",
    note:
      '{"blocks":[{"key":"6esrt","text":"Todo 1","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"39ldo","text":"Todo 2","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"6ju02","text":"Todo 3","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"c03fj","text":"Todo 4","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}'
  },
  voiceInput: ""
};
const mockStore = configureStore();
let store;
beforeEach(() => {
  store = mockStore(initialState);
});
it("renders without crashing", () => {
  shallow(<NoteEditor store={store} />);
});
it("renders title correctly", () => {
  const component = mount(<NoteEditor store={store} />);
  expect(component.find(".note-title").props().value).toEqual(
    initialState.currentNote.title
  );
});
it("renders text correctly", () => {
  const component = mount(<NoteEditor store={store} />);
  const rawContent = JSON.stringify(
    convertToRaw(
      component
        .find(Editor)
        .props()
        .editorState.getCurrentContent()
    )
  );
  expect(rawContent).toEqual(initialState.currentNote.note);
});
