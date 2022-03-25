const classNames = {
  show: 'show',
  message: 'message',
  messageReceived: 'message--received',
  messageSelf: 'message--self',
  messageAuthor: 'message__author',
  messageContent: 'message__content',
};

const loginForm = document.getElementById('welcome-form');
const messagesSection = document.getElementById('messages-section');
const messagesList = document.getElementById('messages-list');
const addMessageForm = document.getElementById('add-messages-form');
const userNameInput = document.getElementById('username');
const messageContentInput = document.getElementById('message-content');

let userName;
const login = (event) => {
  event.preventDefault();
  if (!userNameInput.value) {
    alert('Name cannot be empty');
    return;
  }
  userName = userNameInput.value;
  console.log(userName);
  loginForm.classList.remove(classNames.show);
  messagesSection.classList.add(classNames.show);
};

const sendMessage = (event) => {
  event.preventDefault();
  if (!messageContentInput.value) {
    alert("You can't send an empty message");
    return;
  }
  addMessage(userName, messageContentInput.value);
  messageContentInput.value = '';
};

const addMessage = (author, content) => {
  const message = document.createElement('li');
  message.classList.add(classNames.message);
  message.classList.add(classNames.messageReceived);
  if (author === userName) {
    message.classList.add(classNames.messageSelf);
  }
  const authorElement = document.createElement('h3');
  authorElement.classList.add(classNames.messageAuthor);
  authorElement.innerText = author === userName ? 'You' : author;
  const contentElement = document.createElement('div');
  contentElement.classList.add(classNames.messageContent);
  contentElement.innerText = content;
  message.appendChild(authorElement);
  message.appendChild(contentElement);
  messagesList.appendChild(message);
};

loginForm.addEventListener('submit', login);
addMessageForm.addEventListener('submit', sendMessage);
