// // // функция для лайка
// handleLikeCard() {
//   const isLikes = card.isLiked(); // true/false
//   if(isLiked) {
//     api.deleteLike() //если карточка лайкнута мной - вызвать delete
//     .then(() => {
//       card.handleLike();
//     })
//   } else {
//     api.setLike() // если нет - like
//     .then(() => {
//       card.handleLikeCard();
//     })
//   }
// }

//   добавить ownerId и likeCard в конструктор класса Card





//   const createCard = function(cardObject) {
//     const card = new Card(cardObject, cardTemplate, imagePopup.open, userId, () => {
//       const cardId = card.getCardId();
  
//       // const userId = card.getUserId();
  
//       api.deleteCard(cardId) 
//         .then(() => {
//         card.handleCardDelete();
//       })  
//       .catch((error => console.log(`Ошибка ${error}`)))}, 
      
      
      
      
      

      
      
      
      
      
      
  //     () => {
     
  //     api.getUserInfo()
  //     .then(res => {
  //       userId = res._id;
  //       return userId;
  //     })
  //     .catch((error => console.log(`Ошибка ${error}`)))
  //   }); 
  //   const cardId = card.getCardId();
  //   const isLiked = card.isLiked(); // true/false
  // if(isLiked) {
  //   api.deleteLike(cardId) //если карточка лайкнута мной - вызвать delete
  //   .then(res => {
  //     card.handleLike(res.likes);
  //   })
  // } else {
  //   api.setLike(cardId) // если нет - like
  //   .then(res => {
  //     card.handleLikeCard(res.likes);
  //   })
  // }
  
  //    return card.generateCard();
  //   }
  
    
  
    
  // }


  // const cardId = card.getCardId();
    // const isLiked = card.isLiked(); // true/false
    // console.log(isLiked);
    //   if(isLiked) {
    //     api.deleteLike(cardId) //если карточка лайкнута мной - вызвать delete
    //     .then(res => {
    //       card._likes = res.likes;
    //       card.handleLike();
    //     })
    //   } else {
    //     api.setLike(cardId) // если нет - like
    //     .then(res => {
    //       card._likes = res.likes;
    //       card.handleLike();
    //     })
    //   }