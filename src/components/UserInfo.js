export default class UserInfo {
  constructor({ nameSelector, captionSelector }) {
    this._nameContainer = document.querySelector(nameSelector);
    this._captionContainer = document.querySelector(captionSelector);
  }

  getUserinfo() {
    return {username: this._nameContainer.textContent, caption: this._captionContainer.textContent}
  }

  setUserInfo(userData) {
    this._nameContainer.textContent = userData.username;
    this._captionContainer.textContent = userData.caption;
  }
 }