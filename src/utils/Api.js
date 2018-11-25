import {
  dispatchAction,
  actionsTypes,
  saveNoteSuccededAction
} from "../actions/actions";
import { createNotification } from "./notifications";
import config from "../appconfig.json";

const username = "admin";
const password = "1234";
const credentials = window.btoa(username + ":" + password);

export default {
  saveNote: async noteObj => {
    const { id } = noteObj;
    try {
      let result = await fetch(`${config.apiBaseUrl}${id ? `/${id}` : ""}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          Authorization: `Basic  ${credentials}`
        },
        body: JSON.stringify(noteObj)
      });
      let res = await result.json();

      result = await fetch(config.apiBaseUrl, {
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          Authorization: `Basic  ${credentials}`
        }
      });
      let list = await result.json();

      if (res.message === "Success") {
        createNotification("success", `Note '${noteObj.title}' saved!`);
        saveNoteSuccededAction(list.data, id);
      }
    } catch (error) {
      createNotification(
        "error",
        `Note '${noteObj.title}' was not saved
      ${error.message}`
      );
      dispatchAction(actionsTypes.SAVE_NOTE_FAILED, error.message);
    }
  },
  loadNote: async id => {
    try {
      let result = await fetch(`${config.apiBaseUrl}/${id}`, {
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          Authorization: `Basic  ${credentials}`
        }
      });
      let res = await result.json();
      if (res.message === "Success") {
        dispatchAction(actionsTypes.LOAD_NOTE_SUCCEEDED, res.data);
      } else {
        dispatchAction(actionsTypes.LOAD_NOTE_FAILED);
      }
    } catch (error) {
      createNotification(
        "error",
        `Could not load note
      ${error.message}`
      );
      dispatchAction(actionsTypes.LOAD_NOTE_FAILED, error.message);
    }
  },
  getNotes: async () => {
    try {
      let result = await fetch(config.apiBaseUrl, {
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          Authorization: `Basic  ${credentials}`
        }
      });
      let res = await result.json();
      if (res.message === "Success") {
        dispatchAction(actionsTypes.LIST_NOTES_SUCCEEDED, res.data);
      } else {
        createNotification("error", `Could not load notes list:`);
        dispatchAction(actionsTypes.LIST_NOTES_FAILED, res.data);
      }
    } catch (error) {
      createNotification(
        "error",
        `Could not load notes list
      ${error.message}`
      );
      dispatchAction(actionsTypes.LIST_NOTES_FAILED, error.message);
    }
  }
};
