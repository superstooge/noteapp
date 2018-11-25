import React, { Fragment } from "react";
import NotesList from "../components/NotesList";
import NoteEditor from "../components/NoteEditor";
import { NotificationContainer } from "react-notifications";
import Speech from "../components/Speech";

let isOpera =
  (!!window.opr && !!window.opr.addons) ||
  !!window.opera ||
  navigator.userAgent.indexOf(" OPR/") >= 0;
let isIE = /*@cc_on!@*/ false || !!document.documentMode;
let isEdge = !isIE && !!window.StyleMedia;

const Home = () => {
  return (
    <Fragment>
      <div className="home">
        <NotesList />
        <NoteEditor />
        {!isOpera && !isEdge && <Speech />}
      </div>
      <NotificationContainer />
    </Fragment>
  );
};

export default Home;
