import React, { Component, Fragment } from "react";
import micon from "../static/micon.svg";
import micoff from "../static/micoff.svg";
import { actionsTypes, dispatchAction } from "../actions/actions";
import "./Speech.scss";
import config from "../appconfig.json";
const noop = () => {};
class Speech extends Component {
  static defaultProps = {
    onresult: noop,
    onspeechstart: noop,
    onspeechend: noop,
    onerror: noop
  };
  constructor(props) {
    super(props);
    this.state = {
      listening: false,
      transcript: ""
    };
    this.initSpeech();
    this.startListening = this.startListening.bind(this);
    this.stopListening = this.stopListening.bind(this);
  }

  initSpeech = () => {
    const SpeechRecognition =
      window.SpeechRecognition ||
      window.webkitSpeechRecognition ||
      this.props.mockSpeechRecognition;

    this.speech = new SpeechRecognition();
    this.speech.onspeechstart = () => {
      //   console.log("on speech start");
      this.props.onspeechstart();
    };
    this.speech.onspeechend = () => {
      //   console.log("on speech end");
      this.stopListening();
    };
    this.speech.onerror = e => {
      //   console.log("on error", e);
      this.stopListening();
    };
    this.speech.onresult = event => {
      const transcript = [...event.results].pop()[0].transcript;
      // console.log(transcript);
      this.setState({ transcript });
    };
    this.speech.continuous = true;
    this.speech.interimResults = true;
    this.speech.lang = config.speechRecognitionLang;
  };

  stopListening = () => {
    this.speech.stop();
    this.speech.abort();
    this.setState({ listening: false, transcript: "" });
    dispatchAction(actionsTypes.SPEECH_INPUT_ADD, this.state.transcript);
  };
  abort = () => {
    this.speech.stop();
    this.speech.abort();
    this.setState({ listening: false, transcript: "" });
  };

  startListening = () => {
    this.speech.start();
    this.setState({ listening: true });
  };

  componentWillUnmount() {
    this.stopListening();
  }

  render() {
    const { listening } = this.state;
    let icon = this.state.listening ? micon : micoff;
    let clickHandler = this.state.listening
      ? this.stopListening
      : this.startListening;
    return (
      <Fragment>
        {listening && (
          <div className="button-cancel" onClick={this.abort}>
            X
          </div>
        )}
        <div className="vouce-output">
          <div>{this.state.transcript}</div>
        </div>
        <div
          className={`voiceinput ${listening ? "listening" : ""}`}
          onClick={clickHandler}
        >
          <img alt="voice input" src={icon} />
        </div>
      </Fragment>
    );
  }
}

export default Speech;
