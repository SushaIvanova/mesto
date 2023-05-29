

export default class UserInfo {
  constructor({ nameSelector, captionSelector, avatarSelector }) {
    this._nameContainer = document.querySelector(nameSelector);
    this._captionContainer = document.querySelector(captionSelector);
    this._avatar = document.querySelector(avatarSelector);
    this._id = null;
  }

  getUserinfo() {
    return {username: this._nameContainer.textContent, caption: this._captionContainer.textContent}
  }

  

  setUserInfo(userData) {
    this._nameContainer.textContent = userData.username;
    this._captionContainer.textContent = userData.caption;
    this._avatar.src = userData.avatar;
    this._id = userData.id;
  } 
 }
  // // способ с деструктуризацией (работают оба):
  
  // setUserInfo({username, caption, avatar}) {
  //   this._nameContainer.textContent = username;
  //   this._captionContainer.textContent = caption;
  //   this._avatar.src = avatar;
  // }

  (card) => {
    //   const cardId = card.getCardId();
    
    //   api.deleteCard(cardId) 
    //     .then(res => {
    //       console.log(res);
    //     card.handleCardDelete();
    //     deletePopup.close();
    //   } .catch((error => console.log(`Ошибка ${error}`)))
}