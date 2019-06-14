import React, { Component } from "react";

import api from "../../services/api";
import Popup from "reactjs-popup";

import SuccessIcon from "../../assets/img/check.gif";
import ErrorIcon from "../../assets/img/error.gif";

import "./styles.css";

export default class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentMessage: {},
      chatMessages: [],
      formData: {},
      lastId: "",
      renderMessage: false,
      renderNextMessage: false,
      responseError: false,
      responseSuccess: false,
      showSubmit: false,
      open: false
    };
  }

  componentDidMount() {
    const { stages } = this.props;
    var { currentMessage, chatMessages } = this.state;

    currentMessage = stages[0];
    chatMessages.push(currentMessage);
    this.setState({ renderMesage: true });

    this.renderNextMessage(currentMessage, true);
  }

  renderNextMessage = (currentMessage, renderNextMessage = false) => {
    if (currentMessage.trigger && renderNextMessage) {
      let index = currentMessage.trigger;
      let nextMessage = this.props.stages[index];

      this.renderMessages(nextMessage);
    }
  };

  renderMessages = messageObject => {
    setTimeout(() => {
      if (messageObject.endChat) {
        this.setState({
          renderNextMessage: false,
          showSubmit: true
        });
        this.setFocusOnDivWithId(messageObject.id);
        return false;
      }

      this.state.chatMessages.push(messageObject);
      this.setState({
        renderMessage: true,
        currentMessage: messageObject
      });

      this.setFocusOnDivWithId(messageObject.id);

      typeof messageObject.message === "string" &&
        this.renderNextMessage(messageObject, true);
    }, 600);
  };

  inputSubmit = (inputField, buttonSubmit) => {
    let { formData, currentMessage } = this.state;
    inputField.disabled = true;
    buttonSubmit.disabled = true;

    formData[`${inputField.name}`] = inputField.value;
    this.setState({ lastInputName: inputField.name });

    this.renderNextMessage(currentMessage, true);
  };

  handleStars = value => {
    let { formData, currentMessage } = this.state;

    formData["stars"] = value;

    this.renderNextMessage(currentMessage, true);
  };

  setFocusOnDivWithId = elementId => {
    const scrollIntoViewOptions = { behavior: "smooth", block: "center" };
    document.getElementById(elementId).scrollIntoView(scrollIntoViewOptions);
  };

  handleMessage = data => {
    let { formData } = this.state;

    return typeof data === "string"
      ? data.replace("{previousValue}", formData["name"])
      : data;
  };

  handleSubmit = async () => {
    let response = await api
      .post("/posts", this.state.formData)
      .then(function(response) {
        return response;
      })
      .catch(function(error) {
        return error;
      });

    if (response.status === 201) {
      await this.setState({
        responseSuccess: true,
        chatMessages: [],
        showSubmit: false
      });

      this.componentDidMount();
    } else {
      await this.setState({
        responseError: true,
        chatMessages: [],
        showSubmit: false
      });

      this.componentDidMount();
    }

    await this.setState({ open: true });
  };

  closeModal = () => {
    this.setState({ open: false });
  };

  render() {
    const {
      chatMessages,
      showSubmit,
      currentMessage
    } = this.state;

    return (
      <div className="chat-box" id="chat">
        {chatMessages.map(data => (
          <div
            key={data.id}
            id={data.id}
            className={`chat-message-box ${data.chatClass}`}
          >
            <div className="chat-avatar-container">
              <img className="chat-avatar" src={data.avatar} alt="Avatar" />
            </div>
            <div className="chat-message">
              {this.handleMessage(data.message)}
            </div>
          </div>
        ))}
        {showSubmit && (
          <div
            className="btn"
            id={currentMessage.trigger}
            onClick={this.handleSubmit}
          >
            Salvar
          </div>
        )}
        <Popup
          open={this.state.open}
          closeOnDocumentClick
          onClose={this.closeModal}
        >
          <div className="modal">
            <a className="close" href="#!" onClick={this.closeModal}>
              &times;
            </a>
            {this.state.responseSuccess && (
              <div className="modal-box success">
                <img height="150px" src={SuccessIcon} alt="Sucesso" />
                <span>Formulário enviado com sucesso!</span>
              </div>
            )}
            {this.state.responseError && (
              <div className="modal-box error">
                <img height="150px" src={ErrorIcon} alt="Error" />
                <span>
                  Error ao enviar o formulário, tente novamente mais tarde!
                </span>
              </div>
            )}
          </div>
        </Popup>
      </div>
    );
  }
}
