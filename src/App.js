import React, { Component } from "react";

import "./App.css";

import Chat from "./pages/Chat";
import ReactStars from "react-stars";

import Bot from "./assets/img/support.svg";
import User from "./assets/img/student.svg";
import SendIcon from "./assets/img/send.svg";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.chat = React.createRef();
  }

  handleFormSubmit = event => {
    event.preventDefault();

    let inputTag = event.target.getElementsByTagName("input");
    let button = event.target.getElementsByTagName("button");

    this.chat.current.inputSubmit(inputTag[0], button[0]);
  };

  handleStars = value => {
    this.chat.current.handleStars(value);
  };

  render() {
    return (
      <div className="App">
        <h1>DNA ChatBot</h1>
        <Chat
          ref={this.chat}
          stages={[
            {
              id: "0",
              chatClass: "bot-chat",
              avatar: Bot,
              message:
                "Olá, eu sou Chatnilson, tudo bem? Para começarmos, preciso saber seu nome.",
              trigger: "1"
            },
            {
              id: "1",
              chatClass: "user-chat",
              avatar: User,
              message: (
                <form action="" method="post" onSubmit={this.handleFormSubmit}>
                  <input
                    type="text"
                    placeholder="Nome e sobrenome"
                    autoFocus
                    name="name"
                    id="name"
                    autoComplete="off"
                    required
                  />
                  <button type="submit" className="send-button">
                    <img
                      src={SendIcon}
                      height="20px"
                      className="send-icon"
                      alt="Enviar"
                    />
                  </button>
                </form>
              ),
              trigger: "2"
            },
            {
              id: "2",
              chatClass: "bot-chat",
              avatar: Bot,
              message:
                "Que satisfação, {previousValue}. Agora que sei seu nome, qual a cidade e estado que você mora?",
              trigger: "3"
            },
            {
              id: "3",
              chatClass: "user-chat",
              avatar: User,
              message: (
                <form action="" method="post" onSubmit={this.handleFormSubmit}>
                  <input
                    type="text"
                    placeholder="Cidade"
                    autoFocus
                    name="city"
                    required
                    autoComplete="off"
                  />
                  <button type="submit" className="send-button">
                    <img
                      src={SendIcon}
                      height="20px"
                      className="send-icon"
                      alt="Enviar"
                    />
                  </button>
                </form>
              ),
              trigger: "4"
            },
            {
              id: "4",
              chatClass: "bot-chat",
              avatar: Bot,
              message:
                "Legal, agora que sabemos sua cidade e estado. Quando foi que você nasceu?",
              trigger: "5"
            },
            {
              id: "5",
              chatClass: "user-chat",
              avatar: User,
              message: (
                <form action="" method="post" onSubmit={this.handleFormSubmit}>
                  <input
                    type="date"
                    autoFocus
                    name="birthDate"
                    max="2004-01-31"
                    min="1919-01-01"
                    required
                    autoComplete="off"
                  />
                  <button type="submit" className="send-button">
                    <img
                      src={SendIcon}
                      height="20px"
                      className="send-icon"
                      alt="Enviar"
                    />
                  </button>
                </form>
              ),
              trigger: "6"
            },
            {
              id: "6",
              chatClass: "bot-chat",
              avatar: Bot,
              message: "Agora me fala teu e-mail, por gentileza.",
              trigger: "7"
            },
            {
              id: "7",
              chatClass: "user-chat",
              avatar: User,
              message: (
                <form action="" method="post" onSubmit={this.handleFormSubmit}>
                  <input
                    type="email"
                    placeholder="E-mail"
                    autoFocus
                    name="email"
                    autoComplete="off"
                    pattern="[^@\s]+@[^@\s]+\.[^@\s]+"
                    required
                  />
                  <button type="submit" className="send-button">
                    <img
                      src={SendIcon}
                      height="20px"
                      className="send-icon"
                      alt="Enviar"
                    />
                  </button>
                </form>
              ),
              trigger: "8"
            },
            {
              id: "8",
              chatClass: "bot-chat",
              avatar: Bot,
              message:
                "Você finalizou o teste Faça uma avaliação sobre o processo que realizou até chegar aqui. Nós agradecemos!",
              trigger: "9"
            },
            {
              id: "9",
              chatClass: "user-chat",
              avatar: User,
              message: <ReactStars size={20} onChange={this.handleStars} />,
              trigger: "10"
            },
            {
              id: "10",
              endChat: true
            }
          ]}
        />
      </div>
    );
  }
}
