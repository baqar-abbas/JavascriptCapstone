"use strict";
(self["webpackChunkjavascriptcapstone"] = self["webpackChunkjavascriptcapstone"] || []).push([["index"],{

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _style_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./style.css */ "./src/style.css");
/* harmony import */ var _modules_cards_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/cards.js */ "./src/modules/cards.js");


window.onload = (0,_modules_cards_js__WEBPACK_IMPORTED_MODULE_1__["default"])();

/***/ }),

/***/ "./src/modules/APIcomments.js":
/*!************************************!*\
  !*** ./src/modules/APIcomments.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "addComments": () => (/* binding */ addComments),
/* harmony export */   "getComments": () => (/* binding */ getComments)
/* harmony export */ });
const getComments = async itemId => {
  const response = await fetch(`https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/mfcv5DOSxch5uyyxzNLo/comments?item_id=${itemId}`);
  const data = await response.json();
  return data;
};
const addComments = async (username, comment, itemID) => {
  const response = await fetch('https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/mfcv5DOSxch5uyyxzNLo/comments', {
    method: 'POST',
    body: JSON.stringify({
      item_id: itemID,
      username,
      comment
    }),
    headers: {
      'Content-Type': 'application/json; charset=UTF-8'
    }
  });
  return response.text();
};


/***/ }),

/***/ "./src/modules/GetRequest.js":
/*!***********************************!*\
  !*** ./src/modules/GetRequest.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getPictures)
/* harmony export */ });
const baseUrl = 'https://api.nasa.gov/planetary/apod?api_key=';
const key = 'tygJQhOZyexQcPqa69DGCJJLkrrmCAqoVIgUheiO';
const startDate = '2022-02-20';
const endDate = '2022-04-01';
const url = `${baseUrl}${key}&start_date=${startDate}&end_date=${endDate}`;
const getPictures = async () => {
  const response = await fetch(url);
  const answer = await response.json();
  return answer;
};


/***/ }),

/***/ "./src/modules/cards.js":
/*!******************************!*\
  !*** ./src/modules/cards.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ createCards)
/* harmony export */ });
/* harmony import */ var _GetRequest_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./GetRequest.js */ "./src/modules/GetRequest.js");
/* harmony import */ var _involvementApp_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./involvementApp.js */ "./src/modules/involvementApp.js");
/* harmony import */ var _showCommentsCard_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./showCommentsCard.js */ "./src/modules/showCommentsCard.js");
/* harmony import */ var _counts_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./counts.js */ "./src/modules/counts.js");


 // eslint-disable-line import/no-cycle

const itemGrid = document.querySelector('.item-grid');
const createCards = async () => {
  const myPictures = await (0,_GetRequest_js__WEBPACK_IMPORTED_MODULE_0__["default"])();
  myPictures.forEach((item, i) => {
    const card = document.createElement('div');
    card.classList.add('card');
    if (item.media_type === 'image') {
      const media = document.createElement('img');
      media.classList.add('picture');
      media.src = item.url;
      card.appendChild(media);
      media.addEventListener('click', async () => {
        await (0,_showCommentsCard_js__WEBPACK_IMPORTED_MODULE_2__["default"])(item.title);
        const modal = document.querySelector('.comment-model');
        modal.classList.add('active');
      });
    } else {
      const media = document.createElement('iframe');
      media.classList.add('video');
      media.src = item.url;
      card.appendChild(media);
    }
    const titleContainer = document.createElement('div');
    titleContainer.classList.add('title-container');
    const cardTitle = document.createElement('h3');
    cardTitle.textContent = item.title;
    cardTitle.classList.add('card-title');
    const contentContainer = document.createElement('div');
    contentContainer.classList.add('content-container');
    const likesContainer = document.createElement('div');
    likesContainer.classList.add('likes-container');
    const love = document.createElement('i');
    love.classList.add('fas', 'fa-heart');
    love.setAttribute('index', `${i}`);
    likesContainer.appendChild(love);
    const likes = document.createElement('p');
    likes.textContent = '0 likes';
    const likeNumber = async () => {
      const itemLikes = await (0,_involvementApp_js__WEBPACK_IMPORTED_MODULE_1__.getLikes)();
      itemLikes.forEach(like => {
        if (like.item_id === `picture-${i}`) {
          likes.textContent = '';
          likes.classList.add('like-number');
          likes.textContent = `${like.likes} likes`;
        }
      });
    };
    love.addEventListener('click', async () => {
      await (0,_involvementApp_js__WEBPACK_IMPORTED_MODULE_1__.postLike)(`picture-${i}`);
      likeNumber();
    });
    likeNumber();
    likesContainer.appendChild(likes);
    const comment = document.createElement('button');
    comment.classList.add('comment-btn');
    comment.type = 'button';
    comment.setAttribute('title', `${item.title}`);
    comment.innerText = 'Comments';
    comment.addEventListener('click', async () => {
      const modal = document.querySelector('.comment-model');
      modal.innerHTML = '';
      modal.style.display = 'block';
      modal.classList.add('active');
      await (0,_showCommentsCard_js__WEBPACK_IMPORTED_MODULE_2__["default"])(item.title);
    });
    titleContainer.appendChild(cardTitle);
    titleContainer.appendChild(contentContainer);
    contentContainer.appendChild(likesContainer);
    contentContainer.appendChild(comment);
    card.appendChild(titleContainer);
    card.setAttribute('index', `${i}`);
    itemGrid.appendChild(card);
  });
  const counter = document.getElementById('picture-counter');
  if (myPictures.length === 0) {
    counter.textContent = 0;
  } else {
    counter.textContent = (0,_counts_js__WEBPACK_IMPORTED_MODULE_3__["default"])();
  }
};


/***/ }),

/***/ "./src/modules/comments.js":
/*!*********************************!*\
  !*** ./src/modules/comments.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ displayComments)
/* harmony export */ });
/* harmony import */ var _APIcomments_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./APIcomments.js */ "./src/modules/APIcomments.js");

const displayComments = async userID => {
  const comments = await (0,_APIcomments_js__WEBPACK_IMPORTED_MODULE_0__.getComments)(userID);
  if (comments.length === undefined) {
    const commentCounter = document.querySelector('.comment-counter');
    commentCounter.innerHTML = '(0)';
  } else {
    comments.forEach(comment => {
      const commentContainer = document.querySelector('.comment-container');
      const li = document.createElement('li');
      li.classList.add('single-comment');
      const time = document.createElement('span');
      time.classList.add('comment-time');
      time.innerText = `${comment.creation_date}, `;
      const author = document.createElement('span');
      author.classList.add('comment-author');
      author.innerText = `${comment.username}: `;
      const message = document.createElement('span');
      message.classList.add('commentMsg');
      message.innerText = comment.comment;
      li.append(time, author, message);
      commentContainer.appendChild(li);
    });
  }
};


/***/ }),

/***/ "./src/modules/countComments.js":
/*!**************************************!*\
  !*** ./src/modules/countComments.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const countComments = () => {
  const allComments = document.querySelectorAll('.single-comment').length;
  return allComments;
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (countComments);

/***/ }),

/***/ "./src/modules/counts.js":
/*!*******************************!*\
  !*** ./src/modules/counts.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const countCards = () => {
  const myArray = document.querySelectorAll('.card');
  const count = myArray.length;
  return count;
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (countCards);

/***/ }),

/***/ "./src/modules/involvementApp.js":
/*!***************************************!*\
  !*** ./src/modules/involvementApp.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getLikes": () => (/* binding */ getLikes),
/* harmony export */   "postLike": () => (/* binding */ postLike)
/* harmony export */ });
const postLike = async itemId => {
  const response = await fetch('https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/mfcv5DOSxch5uyyxzNLo/likes/', {
    method: 'POST',
    body: JSON.stringify({
      item_id: itemId
    }),
    headers: {
      'Content-Type': 'application/json; charset=UTF-8'
    }
  });
  return response.text();
};
const getLikes = async () => {
  const response = await fetch('https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/mfcv5DOSxch5uyyxzNLo/likes/');
  const data = await response.json();
  return data;
};


/***/ }),

/***/ "./src/modules/showCommentsCard.js":
/*!*****************************************!*\
  !*** ./src/modules/showCommentsCard.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ showCommentCard)
/* harmony export */ });
/* harmony import */ var _GetRequest_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./GetRequest.js */ "./src/modules/GetRequest.js");
/* harmony import */ var _comments_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./comments.js */ "./src/modules/comments.js");
/* harmony import */ var _APIcomments_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./APIcomments.js */ "./src/modules/APIcomments.js");
/* harmony import */ var _countComments_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./countComments.js */ "./src/modules/countComments.js");




const showCommentCard = async title => {
  const myPicturesJson = await (0,_GetRequest_js__WEBPACK_IMPORTED_MODULE_0__["default"])();
  const stringifiedJson = JSON.stringify(myPicturesJson);
  const myPictures = JSON.parse(stringifiedJson);
  myPictures.forEach((element, index) => {
    if (element.title === title) {
      const commentModel = document.querySelector('.comment-model');
      const commentCard = document.createElement('div');
      commentCard.classList.add('comment-card');
      commentCard.setAttribute('index', index);
      const closeIcon = document.createElement('div');
      closeIcon.classList.add('close-icon');
      const icon = document.createElement('i');
      icon.classList.add('fas', 'fa-times', 'cross');
      closeIcon.appendChild(icon);
      const closeClick = () => {
        commentModel.classList.remove('active');
        commentModel.style.display = 'none';
        commentModel.innerHTML = '';
      };
      closeIcon.addEventListener('click', closeClick);
      const mainDescription = document.createElement('div');
      mainDescription.classList.add('main-description');
      if (element.media_type === 'image') {
        const media = document.createElement('img');
        media.classList.add('mediaImage');
        media.src = element.url;
        mainDescription.appendChild(media);
      } else {
        const media = document.createElement('iframe');
        media.classList.add('mediaVideo');
        media.src = element.url;
        mainDescription.appendChild(media);
      }
      const h1 = document.createElement('h1');
      h1.classList.add('image-title');
      h1.innerText = element.title;
      const explanation = document.createElement('p');
      explanation.classList.add('image-explanation');
      explanation.innerText = element.explanation;
      const extraExplanation = document.createElement('p');
      const copyright = document.createElement('span');
      copyright.classList.add('copyright');
      copyright.innerText = `By ${element.copyright ?? 'Anonymous'}`;
      const imageDate = document.createElement('span');
      imageDate.classList.add('image-date');
      imageDate.innerText = `${element.date}`;
      extraExplanation.append(copyright, imageDate);
      const h2 = document.createElement('h2');
      h2.innerText = 'Comments ';
      const commentCounter = document.createElement('span');
      commentCounter.classList.add('comment-counter');
      h2.appendChild(commentCounter);
      const commentContainer = document.createElement('ul');
      commentContainer.classList.add('comment-container');
      const commentTitle = document.createElement('h2');
      commentTitle.innerText = 'Add a comment';
      const form = document.createElement('form');
      form.innerHTML = `
          <input type="text" placeholder="Your name" class="name-input input" required autocomplete="off" />
          <textarea name="comment-input" class="comment-input input" placeholder="Your insights..." required></textarea>
          <button type="submit">Submit Comment</button>
          `;
      mainDescription.append(h1, explanation, extraExplanation, h2, commentContainer, commentTitle, form); // eslint-disable-line max-len
      commentCard.append(closeIcon, mainDescription);
      commentModel.appendChild(commentCard);
      form.addEventListener('submit', async event => {
        event.preventDefault();
        commentContainer.innerHTML = '';
        const username = document.querySelector('.name-input').value;
        const commentMessage = document.querySelector('.comment-input').value;
        const userID = commentCard.getAttribute('index');
        await (0,_APIcomments_js__WEBPACK_IMPORTED_MODULE_2__.addComments)(username, commentMessage, userID);
        await (0,_comments_js__WEBPACK_IMPORTED_MODULE_1__["default"])(userID);
        form.reset();
        const counter = document.querySelector('.comment-counter');
        counter.innerText = `(${(0,_countComments_js__WEBPACK_IMPORTED_MODULE_3__["default"])()})`;
      });
    }
  });
  const commentCard = document.querySelector('.comment-card');
  const userID = commentCard.getAttribute('index');
  await (0,_comments_js__WEBPACK_IMPORTED_MODULE_1__["default"])(userID);
  const commentCounter = document.querySelector('.comment-counter');
  commentCounter.innerText = `(${(0,_countComments_js__WEBPACK_IMPORTED_MODULE_3__["default"])()})`;
};


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/style.css":
/*!*************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/style.css ***!
  \*************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, "* {\r\n  margin: 0;\r\n  padding: 0;\r\n  box-sizing: border-box;\r\n  font-family: 'Poppins', sans-serif;\r\n}\r\n\r\n.app-container {\r\n  width: 100%;\r\n  height: auto;\r\n  margin-left: auto;\r\n  margin-right: auto;\r\n  background-color: rgba(89, 81, 92, 0.726);\r\n  margin-top: 0;\r\n}\r\n\r\n.heading {\r\n  display: flex;\r\n  flex-direction: row;\r\n  justify-content: space-between;\r\n  align-items: center;\r\n  margin: 0 1rem;\r\n  height: 3rem;\r\n  padding: 0.3rem;\r\n}\r\n\r\n.heading .web-title {\r\n  font-size: 3rem;\r\n  padding: 0.5rem;\r\n  font-weight: 900;\r\n  font-family: 'Monoton', cursive;\r\n}\r\n\r\na {\r\n  text-decoration: none;\r\n}\r\n\r\n.heading .navbar ul {\r\n  display: flex;\r\n  flex-direction: row;\r\n  margin-right: 1rem;\r\n}\r\n\r\n.navbar ul li {\r\n  list-style: none;\r\n  margin-right: 1.5rem;\r\n}\r\n\r\n.navbar ul li a:hover {\r\n  background-color: rgb(133, 129, 126);\r\n  border-radius: 0.2rem;\r\n  color: whitesmoke;\r\n}\r\n\r\n/* main section style of the website */\r\n.app-container .content {\r\n  display: flex;\r\n  width: 100%;\r\n  margin-left: auto;\r\n  margin-right: auto;\r\n  background-color: #20262e;\r\n}\r\n\r\n.content section {\r\n  display: flex;\r\n  flex-direction: column;\r\n}\r\n\r\n.title-link {\r\n  text-align: center;\r\n  font-size: 2rem;\r\n  font-style: normal;\r\n  font-weight: 600;\r\n  margin-bottom: 1rem;\r\n  color: whitesmoke;\r\n}\r\n\r\n.content .item-grid {\r\n  display: flex;\r\n  flex-direction: row;\r\n  flex-wrap: wrap;\r\n  width: 100%;\r\n  height: auto;\r\n  background-color: #20262e;\r\n}\r\n\r\n.card {\r\n  display: flex;\r\n  flex-direction: column;\r\n  width: 23rem;\r\n  height: 28rem;\r\n  background-color: #8a929c;\r\n  margin-top: 1rem;\r\n  margin-bottom: 1rem;\r\n  margin-left: 3.5rem;\r\n  padding: 0.4rem;\r\n  border-radius: 0.5rem;\r\n  transition: ease-in-out 0.5s;\r\n}\r\n\r\n.card:hover {\r\n  transform: scale(1.08);\r\n  cursor: pointer;\r\n}\r\n\r\n.picture {\r\n  width: 22rem;\r\n  height: 17rem;\r\n  margin-right: 2rem;\r\n}\r\n\r\n.mediaImage {\r\n  width: 69rem;\r\n  height: 45rem;\r\n}\r\n\r\n.comment-model {\r\n  flex-direction: column;\r\n  width: 90vw;\r\n  height: 90vh;\r\n  margin-left: auto;\r\n  margin-right: auto;\r\n  position: fixed;\r\n  z-index: 20;\r\n  top: 2%;\r\n  left: 4%;\r\n  overflow-y: auto;\r\n  bottom: 2%; \r\n  background-color: #8a929c;\r\n  display: none; \r\n}\r\n\r\n.comment-card {\r\n  display: flex;\r\n  flex-direction: column;\r\n  padding: 1rem 2rem;\r\n  width: 95%;\r\n  height: 49rem;\r\n  background-color: rgb(226, 236, 233);\r\n  margin-left: 2rem;\r\n  border-radius: 0.4rem;\r\n  margin-bottom: 3rem;\r\n}\r\n\r\n.cross {\r\n  font-size: 2rem;\r\n  cursor: pointer;\r\n} \r\n\r\nform {\r\n  display: flex;\r\n  flex-direction: column;\r\n  margin-bottom: 2rem;\r\n}\r\n\r\n.input {\r\n  width: 20rem;\r\n  height: 3rem;\r\n}\r\n\r\nform button {\r\n  width: 10rem;\r\n  height: 3rem;\r\n}\r\n\r\n.comment-btn {\r\n  cursor: pointer;\r\n  font-weight: 600;\r\n  width: 7rem;\r\n  height: 2rem;\r\n}\r\n\r\n.fa-heart:hover {\r\n  color: red;\r\n  transition: 0.5s;\r\n  transform: scaleX(1.2);\r\n}\r\n\r\nfooter {\r\n  text-align: center;\r\n  font-size: 14px;\r\n  height: 4rem;\r\n  padding: 1rem;\r\n  font-style: italic;\r\n}", "",{"version":3,"sources":["webpack://./src/style.css"],"names":[],"mappings":"AAAA;EACE,SAAS;EACT,UAAU;EACV,sBAAsB;EACtB,kCAAkC;AACpC;;AAEA;EACE,WAAW;EACX,YAAY;EACZ,iBAAiB;EACjB,kBAAkB;EAClB,yCAAyC;EACzC,aAAa;AACf;;AAEA;EACE,aAAa;EACb,mBAAmB;EACnB,8BAA8B;EAC9B,mBAAmB;EACnB,cAAc;EACd,YAAY;EACZ,eAAe;AACjB;;AAEA;EACE,eAAe;EACf,eAAe;EACf,gBAAgB;EAChB,+BAA+B;AACjC;;AAEA;EACE,qBAAqB;AACvB;;AAEA;EACE,aAAa;EACb,mBAAmB;EACnB,kBAAkB;AACpB;;AAEA;EACE,gBAAgB;EAChB,oBAAoB;AACtB;;AAEA;EACE,oCAAoC;EACpC,qBAAqB;EACrB,iBAAiB;AACnB;;AAEA,sCAAsC;AACtC;EACE,aAAa;EACb,WAAW;EACX,iBAAiB;EACjB,kBAAkB;EAClB,yBAAyB;AAC3B;;AAEA;EACE,aAAa;EACb,sBAAsB;AACxB;;AAEA;EACE,kBAAkB;EAClB,eAAe;EACf,kBAAkB;EAClB,gBAAgB;EAChB,mBAAmB;EACnB,iBAAiB;AACnB;;AAEA;EACE,aAAa;EACb,mBAAmB;EACnB,eAAe;EACf,WAAW;EACX,YAAY;EACZ,yBAAyB;AAC3B;;AAEA;EACE,aAAa;EACb,sBAAsB;EACtB,YAAY;EACZ,aAAa;EACb,yBAAyB;EACzB,gBAAgB;EAChB,mBAAmB;EACnB,mBAAmB;EACnB,eAAe;EACf,qBAAqB;EACrB,4BAA4B;AAC9B;;AAEA;EACE,sBAAsB;EACtB,eAAe;AACjB;;AAEA;EACE,YAAY;EACZ,aAAa;EACb,kBAAkB;AACpB;;AAEA;EACE,YAAY;EACZ,aAAa;AACf;;AAEA;EACE,sBAAsB;EACtB,WAAW;EACX,YAAY;EACZ,iBAAiB;EACjB,kBAAkB;EAClB,eAAe;EACf,WAAW;EACX,OAAO;EACP,QAAQ;EACR,gBAAgB;EAChB,UAAU;EACV,yBAAyB;EACzB,aAAa;AACf;;AAEA;EACE,aAAa;EACb,sBAAsB;EACtB,kBAAkB;EAClB,UAAU;EACV,aAAa;EACb,oCAAoC;EACpC,iBAAiB;EACjB,qBAAqB;EACrB,mBAAmB;AACrB;;AAEA;EACE,eAAe;EACf,eAAe;AACjB;;AAEA;EACE,aAAa;EACb,sBAAsB;EACtB,mBAAmB;AACrB;;AAEA;EACE,YAAY;EACZ,YAAY;AACd;;AAEA;EACE,YAAY;EACZ,YAAY;AACd;;AAEA;EACE,eAAe;EACf,gBAAgB;EAChB,WAAW;EACX,YAAY;AACd;;AAEA;EACE,UAAU;EACV,gBAAgB;EAChB,sBAAsB;AACxB;;AAEA;EACE,kBAAkB;EAClB,eAAe;EACf,YAAY;EACZ,aAAa;EACb,kBAAkB;AACpB","sourcesContent":["* {\r\n  margin: 0;\r\n  padding: 0;\r\n  box-sizing: border-box;\r\n  font-family: 'Poppins', sans-serif;\r\n}\r\n\r\n.app-container {\r\n  width: 100%;\r\n  height: auto;\r\n  margin-left: auto;\r\n  margin-right: auto;\r\n  background-color: rgba(89, 81, 92, 0.726);\r\n  margin-top: 0;\r\n}\r\n\r\n.heading {\r\n  display: flex;\r\n  flex-direction: row;\r\n  justify-content: space-between;\r\n  align-items: center;\r\n  margin: 0 1rem;\r\n  height: 3rem;\r\n  padding: 0.3rem;\r\n}\r\n\r\n.heading .web-title {\r\n  font-size: 3rem;\r\n  padding: 0.5rem;\r\n  font-weight: 900;\r\n  font-family: 'Monoton', cursive;\r\n}\r\n\r\na {\r\n  text-decoration: none;\r\n}\r\n\r\n.heading .navbar ul {\r\n  display: flex;\r\n  flex-direction: row;\r\n  margin-right: 1rem;\r\n}\r\n\r\n.navbar ul li {\r\n  list-style: none;\r\n  margin-right: 1.5rem;\r\n}\r\n\r\n.navbar ul li a:hover {\r\n  background-color: rgb(133, 129, 126);\r\n  border-radius: 0.2rem;\r\n  color: whitesmoke;\r\n}\r\n\r\n/* main section style of the website */\r\n.app-container .content {\r\n  display: flex;\r\n  width: 100%;\r\n  margin-left: auto;\r\n  margin-right: auto;\r\n  background-color: #20262e;\r\n}\r\n\r\n.content section {\r\n  display: flex;\r\n  flex-direction: column;\r\n}\r\n\r\n.title-link {\r\n  text-align: center;\r\n  font-size: 2rem;\r\n  font-style: normal;\r\n  font-weight: 600;\r\n  margin-bottom: 1rem;\r\n  color: whitesmoke;\r\n}\r\n\r\n.content .item-grid {\r\n  display: flex;\r\n  flex-direction: row;\r\n  flex-wrap: wrap;\r\n  width: 100%;\r\n  height: auto;\r\n  background-color: #20262e;\r\n}\r\n\r\n.card {\r\n  display: flex;\r\n  flex-direction: column;\r\n  width: 23rem;\r\n  height: 28rem;\r\n  background-color: #8a929c;\r\n  margin-top: 1rem;\r\n  margin-bottom: 1rem;\r\n  margin-left: 3.5rem;\r\n  padding: 0.4rem;\r\n  border-radius: 0.5rem;\r\n  transition: ease-in-out 0.5s;\r\n}\r\n\r\n.card:hover {\r\n  transform: scale(1.08);\r\n  cursor: pointer;\r\n}\r\n\r\n.picture {\r\n  width: 22rem;\r\n  height: 17rem;\r\n  margin-right: 2rem;\r\n}\r\n\r\n.mediaImage {\r\n  width: 69rem;\r\n  height: 45rem;\r\n}\r\n\r\n.comment-model {\r\n  flex-direction: column;\r\n  width: 90vw;\r\n  height: 90vh;\r\n  margin-left: auto;\r\n  margin-right: auto;\r\n  position: fixed;\r\n  z-index: 20;\r\n  top: 2%;\r\n  left: 4%;\r\n  overflow-y: auto;\r\n  bottom: 2%; \r\n  background-color: #8a929c;\r\n  display: none; \r\n}\r\n\r\n.comment-card {\r\n  display: flex;\r\n  flex-direction: column;\r\n  padding: 1rem 2rem;\r\n  width: 95%;\r\n  height: 49rem;\r\n  background-color: rgb(226, 236, 233);\r\n  margin-left: 2rem;\r\n  border-radius: 0.4rem;\r\n  margin-bottom: 3rem;\r\n}\r\n\r\n.cross {\r\n  font-size: 2rem;\r\n  cursor: pointer;\r\n} \r\n\r\nform {\r\n  display: flex;\r\n  flex-direction: column;\r\n  margin-bottom: 2rem;\r\n}\r\n\r\n.input {\r\n  width: 20rem;\r\n  height: 3rem;\r\n}\r\n\r\nform button {\r\n  width: 10rem;\r\n  height: 3rem;\r\n}\r\n\r\n.comment-btn {\r\n  cursor: pointer;\r\n  font-weight: 600;\r\n  width: 7rem;\r\n  height: 2rem;\r\n}\r\n\r\n.fa-heart:hover {\r\n  color: red;\r\n  transition: 0.5s;\r\n  transform: scaleX(1.2);\r\n}\r\n\r\nfooter {\r\n  text-align: center;\r\n  font-size: 14px;\r\n  height: 4rem;\r\n  padding: 1rem;\r\n  font-style: italic;\r\n}"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {



/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = [];

  // return the list of modules as css string
  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";
      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }
      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }
      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }
      content += cssWithMappingToString(item);
      if (needLayer) {
        content += "}";
      }
      if (item[2]) {
        content += "}";
      }
      if (item[4]) {
        content += "}";
      }
      return content;
    }).join("");
  };

  // import a list of modules into the list
  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }
    var alreadyImportedModules = {};
    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];
        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }
    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);
      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }
      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }
      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }
      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }
      list.push(item);
    }
  };
  return list;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/sourceMaps.js":
/*!************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/sourceMaps.js ***!
  \************************************************************/
/***/ ((module) => {



module.exports = function (item) {
  var content = item[1];
  var cssMapping = item[3];
  if (!cssMapping) {
    return content;
  }
  if (typeof btoa === "function") {
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    return [content].concat([sourceMapping]).join("\n");
  }
  return [content].join("\n");
};

/***/ }),

/***/ "./src/style.css":
/*!***********************!*\
  !*** ./src/style.css ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../node_modules/css-loader/dist/cjs.js!./style.css */ "./node_modules/css-loader/dist/cjs.js!./src/style.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module) => {



var stylesInDOM = [];
function getIndexByIdentifier(identifier) {
  var result = -1;
  for (var i = 0; i < stylesInDOM.length; i++) {
    if (stylesInDOM[i].identifier === identifier) {
      result = i;
      break;
    }
  }
  return result;
}
function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];
  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var indexByIdentifier = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3],
      supports: item[4],
      layer: item[5]
    };
    if (indexByIdentifier !== -1) {
      stylesInDOM[indexByIdentifier].references++;
      stylesInDOM[indexByIdentifier].updater(obj);
    } else {
      var updater = addElementStyle(obj, options);
      options.byIndex = i;
      stylesInDOM.splice(i, 0, {
        identifier: identifier,
        updater: updater,
        references: 1
      });
    }
    identifiers.push(identifier);
  }
  return identifiers;
}
function addElementStyle(obj, options) {
  var api = options.domAPI(options);
  api.update(obj);
  var updater = function updater(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {
        return;
      }
      api.update(obj = newObj);
    } else {
      api.remove();
    }
  };
  return updater;
}
module.exports = function (list, options) {
  options = options || {};
  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];
    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDOM[index].references--;
    }
    var newLastIdentifiers = modulesToDom(newList, options);
    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];
      var _index = getIndexByIdentifier(_identifier);
      if (stylesInDOM[_index].references === 0) {
        stylesInDOM[_index].updater();
        stylesInDOM.splice(_index, 1);
      }
    }
    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertBySelector.js":
/*!********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \********************************************************************/
/***/ ((module) => {



var memo = {};

/* istanbul ignore next  */
function getTarget(target) {
  if (typeof memo[target] === "undefined") {
    var styleTarget = document.querySelector(target);

    // Special case to return head of iframe instead of iframe itself
    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
      try {
        // This will throw an exception if access to iframe is blocked
        // due to cross-origin restrictions
        styleTarget = styleTarget.contentDocument.head;
      } catch (e) {
        // istanbul ignore next
        styleTarget = null;
      }
    }
    memo[target] = styleTarget;
  }
  return memo[target];
}

/* istanbul ignore next  */
function insertBySelector(insert, style) {
  var target = getTarget(insert);
  if (!target) {
    throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
  }
  target.appendChild(style);
}
module.exports = insertBySelector;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertStyleElement.js":
/*!**********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \**********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function insertStyleElement(options) {
  var element = document.createElement("style");
  options.setAttributes(element, options.attributes);
  options.insert(element, options.options);
  return element;
}
module.exports = insertStyleElement;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



/* istanbul ignore next  */
function setAttributesWithoutAttributes(styleElement) {
  var nonce =  true ? __webpack_require__.nc : 0;
  if (nonce) {
    styleElement.setAttribute("nonce", nonce);
  }
}
module.exports = setAttributesWithoutAttributes;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleDomAPI.js":
/*!***************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \***************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function apply(styleElement, options, obj) {
  var css = "";
  if (obj.supports) {
    css += "@supports (".concat(obj.supports, ") {");
  }
  if (obj.media) {
    css += "@media ".concat(obj.media, " {");
  }
  var needLayer = typeof obj.layer !== "undefined";
  if (needLayer) {
    css += "@layer".concat(obj.layer.length > 0 ? " ".concat(obj.layer) : "", " {");
  }
  css += obj.css;
  if (needLayer) {
    css += "}";
  }
  if (obj.media) {
    css += "}";
  }
  if (obj.supports) {
    css += "}";
  }
  var sourceMap = obj.sourceMap;
  if (sourceMap && typeof btoa !== "undefined") {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  }

  // For old IE
  /* istanbul ignore if  */
  options.styleTagTransform(css, styleElement, options.options);
}
function removeStyleElement(styleElement) {
  // istanbul ignore if
  if (styleElement.parentNode === null) {
    return false;
  }
  styleElement.parentNode.removeChild(styleElement);
}

/* istanbul ignore next  */
function domAPI(options) {
  if (typeof document === "undefined") {
    return {
      update: function update() {},
      remove: function remove() {}
    };
  }
  var styleElement = options.insertStyleElement(options);
  return {
    update: function update(obj) {
      apply(styleElement, options, obj);
    },
    remove: function remove() {
      removeStyleElement(styleElement);
    }
  };
}
module.exports = domAPI;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleTagTransform.js":
/*!*********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \*********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function styleTagTransform(css, styleElement) {
  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css;
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild);
    }
    styleElement.appendChild(document.createTextNode(css));
  }
}
module.exports = styleTagTransform;

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ var __webpack_exports__ = (__webpack_exec__("./src/index.js"));
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0NBQWtDO0FBQ2xDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7OztBQzVEYTs7QUFFYjtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL2phdmFzY3JpcHRjYXBzdG9uZS8uL3NyYy9pbmRleC5qcyIsIndlYnBhY2s6Ly9qYXZhc2NyaXB0Y2Fwc3RvbmUvLi9zcmMvbW9kdWxlcy9BUEljb21tZW50cy5qcyIsIndlYnBhY2s6Ly9qYXZhc2NyaXB0Y2Fwc3RvbmUvLi9zcmMvbW9kdWxlcy9HZXRSZXF1ZXN0LmpzIiwid2VicGFjazovL2phdmFzY3JpcHRjYXBzdG9uZS8uL3NyYy9tb2R1bGVzL2NhcmRzLmpzIiwid2VicGFjazovL2phdmFzY3JpcHRjYXBzdG9uZS8uL3NyYy9tb2R1bGVzL2NvbW1lbnRzLmpzIiwid2VicGFjazovL2phdmFzY3JpcHRjYXBzdG9uZS8uL3NyYy9tb2R1bGVzL2NvdW50Q29tbWVudHMuanMiLCJ3ZWJwYWNrOi8vamF2YXNjcmlwdGNhcHN0b25lLy4vc3JjL21vZHVsZXMvY291bnRzLmpzIiwid2VicGFjazovL2phdmFzY3JpcHRjYXBzdG9uZS8uL3NyYy9tb2R1bGVzL2ludm9sdmVtZW50QXBwLmpzIiwid2VicGFjazovL2phdmFzY3JpcHRjYXBzdG9uZS8uL3NyYy9tb2R1bGVzL3Nob3dDb21tZW50c0NhcmQuanMiLCJ3ZWJwYWNrOi8vamF2YXNjcmlwdGNhcHN0b25lLy4vc3JjL3N0eWxlLmNzcyIsIndlYnBhY2s6Ly9qYXZhc2NyaXB0Y2Fwc3RvbmUvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzIiwid2VicGFjazovL2phdmFzY3JpcHRjYXBzdG9uZS8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzIiwid2VicGFjazovL2phdmFzY3JpcHRjYXBzdG9uZS8uL3NyYy9zdHlsZS5jc3M/NzE2MyIsIndlYnBhY2s6Ly9qYXZhc2NyaXB0Y2Fwc3RvbmUvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanMiLCJ3ZWJwYWNrOi8vamF2YXNjcmlwdGNhcHN0b25lLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qcyIsIndlYnBhY2s6Ly9qYXZhc2NyaXB0Y2Fwc3RvbmUvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanMiLCJ3ZWJwYWNrOi8vamF2YXNjcmlwdGNhcHN0b25lLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzIiwid2VicGFjazovL2phdmFzY3JpcHRjYXBzdG9uZS8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzIiwid2VicGFjazovL2phdmFzY3JpcHRjYXBzdG9uZS8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAnLi9zdHlsZS5jc3MnO1xuaW1wb3J0IGNyZWF0ZUNhcmRzIGZyb20gJy4vbW9kdWxlcy9jYXJkcy5qcyc7XG5cbndpbmRvdy5vbmxvYWQgPSBjcmVhdGVDYXJkcygpOyIsImNvbnN0IGdldENvbW1lbnRzID0gYXN5bmMgKGl0ZW1JZCkgPT4ge1xuICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKGBodHRwczovL3VzLWNlbnRyYWwxLWludm9sdmVtZW50LWFwaS5jbG91ZGZ1bmN0aW9ucy5uZXQvY2Fwc3RvbmVBcGkvYXBwcy9tZmN2NURPU3hjaDV1eXl4ek5Mby9jb21tZW50cz9pdGVtX2lkPSR7aXRlbUlkfWApO1xuICBjb25zdCBkYXRhID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xuICByZXR1cm4gZGF0YTtcbn07XG5cbmNvbnN0IGFkZENvbW1lbnRzID0gYXN5bmMgKHVzZXJuYW1lLCBjb21tZW50LCBpdGVtSUQpID0+IHtcbiAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaCgnaHR0cHM6Ly91cy1jZW50cmFsMS1pbnZvbHZlbWVudC1hcGkuY2xvdWRmdW5jdGlvbnMubmV0L2NhcHN0b25lQXBpL2FwcHMvbWZjdjVET1N4Y2g1dXl5eHpOTG8vY29tbWVudHMnLCB7XG4gICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgYm9keTogSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgaXRlbV9pZDogaXRlbUlELFxuICAgICAgdXNlcm5hbWUsXG4gICAgICBjb21tZW50LFxuICAgIH0pLFxuICAgIGhlYWRlcnM6IHtcbiAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbjsgY2hhcnNldD1VVEYtOCcsXG4gICAgfSxcbiAgfSk7XG4gIHJldHVybiByZXNwb25zZS50ZXh0KCk7XG59O1xuXG5leHBvcnQgeyBnZXRDb21tZW50cywgYWRkQ29tbWVudHMgfTsiLCJjb25zdCBiYXNlVXJsID0gJ2h0dHBzOi8vYXBpLm5hc2EuZ292L3BsYW5ldGFyeS9hcG9kP2FwaV9rZXk9JztcbmNvbnN0IGtleSA9ICd0eWdKUWhPWnlleFFjUHFhNjlER0NKSkxrcnJtQ0Fxb1ZJZ1VoZWlPJztcbmNvbnN0IHN0YXJ0RGF0ZSA9ICcyMDIyLTAyLTIwJztcbmNvbnN0IGVuZERhdGUgPSAnMjAyMi0wNC0wMSc7XG5jb25zdCB1cmwgPSBgJHtiYXNlVXJsfSR7a2V5fSZzdGFydF9kYXRlPSR7c3RhcnREYXRlfSZlbmRfZGF0ZT0ke2VuZERhdGV9YDtcblxuY29uc3QgZ2V0UGljdHVyZXMgPSBhc3luYyAoKSA9PiB7XG4gIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2godXJsKTtcbiAgY29uc3QgYW5zd2VyID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xuICByZXR1cm4gYW5zd2VyO1xufTtcblxuZXhwb3J0IHsgZ2V0UGljdHVyZXMgYXMgZGVmYXVsdCB9OyIsImltcG9ydCBnZXRQaWN0dXJlcyBmcm9tICcuL0dldFJlcXVlc3QuanMnO1xuaW1wb3J0IHsgcG9zdExpa2UsIGdldExpa2VzIH0gZnJvbSAnLi9pbnZvbHZlbWVudEFwcC5qcyc7XG5pbXBvcnQgc2hvd0NvbW1lbnRDYXJkIGZyb20gJy4vc2hvd0NvbW1lbnRzQ2FyZC5qcyc7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgaW1wb3J0L25vLWN5Y2xlXG5pbXBvcnQgY291bnRDYXJkcyBmcm9tICcuL2NvdW50cy5qcyc7XG5cbmNvbnN0IGl0ZW1HcmlkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLml0ZW0tZ3JpZCcpO1xuXG5jb25zdCBjcmVhdGVDYXJkcyA9IGFzeW5jICgpID0+IHtcbiAgY29uc3QgbXlQaWN0dXJlcyA9IGF3YWl0IGdldFBpY3R1cmVzKCk7XG5cbiAgbXlQaWN0dXJlcy5mb3JFYWNoKChpdGVtLCBpKSA9PiB7XG4gICAgY29uc3QgY2FyZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGNhcmQuY2xhc3NMaXN0LmFkZCgnY2FyZCcpO1xuXG4gICAgaWYgKGl0ZW0ubWVkaWFfdHlwZSA9PT0gJ2ltYWdlJykge1xuICAgICAgY29uc3QgbWVkaWEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKTtcbiAgICAgIG1lZGlhLmNsYXNzTGlzdC5hZGQoJ3BpY3R1cmUnKTtcbiAgICAgIG1lZGlhLnNyYyA9IGl0ZW0udXJsO1xuICAgICAgY2FyZC5hcHBlbmRDaGlsZChtZWRpYSk7XG4gICAgICBtZWRpYS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGFzeW5jICgpID0+IHtcbiAgICAgICAgYXdhaXQgc2hvd0NvbW1lbnRDYXJkKGl0ZW0udGl0bGUpO1xuICAgICAgICBjb25zdCBtb2RhbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jb21tZW50LW1vZGVsJyk7XG4gICAgICAgIG1vZGFsLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IG1lZGlhID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaWZyYW1lJyk7XG4gICAgICBtZWRpYS5jbGFzc0xpc3QuYWRkKCd2aWRlbycpO1xuICAgICAgbWVkaWEuc3JjID0gaXRlbS51cmw7XG4gICAgICBjYXJkLmFwcGVuZENoaWxkKG1lZGlhKTtcbiAgICB9XG5cbiAgICBjb25zdCB0aXRsZUNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIHRpdGxlQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ3RpdGxlLWNvbnRhaW5lcicpO1xuXG4gICAgY29uc3QgY2FyZFRpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaDMnKTtcbiAgICBjYXJkVGl0bGUudGV4dENvbnRlbnQgPSBpdGVtLnRpdGxlO1xuICAgIGNhcmRUaXRsZS5jbGFzc0xpc3QuYWRkKCdjYXJkLXRpdGxlJyk7XG5cbiAgICBjb25zdCBjb250ZW50Q29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgY29udGVudENvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCdjb250ZW50LWNvbnRhaW5lcicpO1xuXG4gICAgY29uc3QgbGlrZXNDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBsaWtlc0NvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCdsaWtlcy1jb250YWluZXInKTtcblxuICAgIGNvbnN0IGxvdmUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpJyk7XG4gICAgbG92ZS5jbGFzc0xpc3QuYWRkKCdmYXMnLCAnZmEtaGVhcnQnKTtcbiAgICBsb3ZlLnNldEF0dHJpYnV0ZSgnaW5kZXgnLCBgJHtpfWApO1xuICAgIGxpa2VzQ29udGFpbmVyLmFwcGVuZENoaWxkKGxvdmUpO1xuXG4gICAgY29uc3QgbGlrZXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XG4gICAgbGlrZXMudGV4dENvbnRlbnQgPSAnMCBsaWtlcyc7XG5cbiAgICBjb25zdCBsaWtlTnVtYmVyID0gYXN5bmMgKCkgPT4ge1xuICAgICAgY29uc3QgaXRlbUxpa2VzID0gYXdhaXQgZ2V0TGlrZXMoKTtcbiAgICAgIGl0ZW1MaWtlcy5mb3JFYWNoKChsaWtlKSA9PiB7XG4gICAgICAgIGlmIChsaWtlLml0ZW1faWQgPT09IGBwaWN0dXJlLSR7aX1gKSB7XG4gICAgICAgICAgbGlrZXMudGV4dENvbnRlbnQgPSAnJztcbiAgICAgICAgICBsaWtlcy5jbGFzc0xpc3QuYWRkKCdsaWtlLW51bWJlcicpO1xuICAgICAgICAgIGxpa2VzLnRleHRDb250ZW50ID0gYCR7bGlrZS5saWtlc30gbGlrZXNgO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9O1xuXG4gICAgbG92ZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGFzeW5jICgpID0+IHtcbiAgICAgIGF3YWl0IHBvc3RMaWtlKGBwaWN0dXJlLSR7aX1gKTtcbiAgICAgIGxpa2VOdW1iZXIoKTtcbiAgICB9KTtcblxuICAgIGxpa2VOdW1iZXIoKTtcbiAgICBsaWtlc0NvbnRhaW5lci5hcHBlbmRDaGlsZChsaWtlcyk7XG5cbiAgICBjb25zdCBjb21tZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gICAgY29tbWVudC5jbGFzc0xpc3QuYWRkKCdjb21tZW50LWJ0bicpO1xuICAgIGNvbW1lbnQudHlwZSA9ICdidXR0b24nO1xuICAgIGNvbW1lbnQuc2V0QXR0cmlidXRlKCd0aXRsZScsIGAke2l0ZW0udGl0bGV9YCk7XG4gICAgY29tbWVudC5pbm5lclRleHQgPSAnQ29tbWVudHMnO1xuXG4gICAgY29tbWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGFzeW5jICgpID0+IHtcbiAgICAgIGNvbnN0IG1vZGFsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNvbW1lbnQtbW9kZWwnKTtcbiAgICAgICBtb2RhbC5pbm5lckhUTUwgPSAnJztcbiAgICAgICBtb2RhbC5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcbiAgICAgIFxuICAgICAgbW9kYWwuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XG4gICAgICBhd2FpdCBzaG93Q29tbWVudENhcmQoaXRlbS50aXRsZSk7XG4gICAgfSk7XG5cbiAgICB0aXRsZUNvbnRhaW5lci5hcHBlbmRDaGlsZChjYXJkVGl0bGUpO1xuICAgIHRpdGxlQ29udGFpbmVyLmFwcGVuZENoaWxkKGNvbnRlbnRDb250YWluZXIpO1xuICAgIGNvbnRlbnRDb250YWluZXIuYXBwZW5kQ2hpbGQobGlrZXNDb250YWluZXIpO1xuICAgIGNvbnRlbnRDb250YWluZXIuYXBwZW5kQ2hpbGQoY29tbWVudCk7XG4gICAgY2FyZC5hcHBlbmRDaGlsZCh0aXRsZUNvbnRhaW5lcik7XG4gICAgY2FyZC5zZXRBdHRyaWJ1dGUoJ2luZGV4JywgYCR7aX1gKTtcbiAgICBpdGVtR3JpZC5hcHBlbmRDaGlsZChjYXJkKTtcbiAgfSk7XG5cbiAgY29uc3QgY291bnRlciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwaWN0dXJlLWNvdW50ZXInKTtcbiAgaWYgKG15UGljdHVyZXMubGVuZ3RoID09PSAwKSB7XG4gICAgY291bnRlci50ZXh0Q29udGVudCA9IDA7XG4gIH0gZWxzZSB7XG4gICAgY291bnRlci50ZXh0Q29udGVudCA9IGNvdW50Q2FyZHMoKTtcbiAgfVxufTtcblxuZXhwb3J0IHsgY3JlYXRlQ2FyZHMgYXMgZGVmYXVsdCB9OyIsImltcG9ydCB7IGdldENvbW1lbnRzIH0gZnJvbSAnLi9BUEljb21tZW50cy5qcyc7XG5cbmNvbnN0IGRpc3BsYXlDb21tZW50cyA9IGFzeW5jICh1c2VySUQpID0+IHtcbiAgY29uc3QgY29tbWVudHMgPSBhd2FpdCBnZXRDb21tZW50cyh1c2VySUQpO1xuXG4gIGlmIChjb21tZW50cy5sZW5ndGggPT09IHVuZGVmaW5lZCkge1xuICAgIGNvbnN0IGNvbW1lbnRDb3VudGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNvbW1lbnQtY291bnRlcicpO1xuICAgIGNvbW1lbnRDb3VudGVyLmlubmVySFRNTCA9ICcoMCknO1xuICB9IGVsc2Uge1xuICAgIGNvbW1lbnRzLmZvckVhY2goKGNvbW1lbnQpID0+IHtcbiAgICAgIGNvbnN0IGNvbW1lbnRDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY29tbWVudC1jb250YWluZXInKTtcblxuICAgICAgY29uc3QgbGkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpO1xuICAgICAgbGkuY2xhc3NMaXN0LmFkZCgnc2luZ2xlLWNvbW1lbnQnKTtcbiAgICAgIGNvbnN0IHRpbWUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgICB0aW1lLmNsYXNzTGlzdC5hZGQoJ2NvbW1lbnQtdGltZScpO1xuICAgICAgdGltZS5pbm5lclRleHQgPSBgJHtjb21tZW50LmNyZWF0aW9uX2RhdGV9LCBgO1xuXG4gICAgICBjb25zdCBhdXRob3IgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgICBhdXRob3IuY2xhc3NMaXN0LmFkZCgnY29tbWVudC1hdXRob3InKTtcbiAgICAgIGF1dGhvci5pbm5lclRleHQgPSBgJHtjb21tZW50LnVzZXJuYW1lfTogYDtcblxuICAgICAgY29uc3QgbWVzc2FnZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICAgIG1lc3NhZ2UuY2xhc3NMaXN0LmFkZCgnY29tbWVudE1zZycpO1xuICAgICAgbWVzc2FnZS5pbm5lclRleHQgPSBjb21tZW50LmNvbW1lbnQ7XG5cbiAgICAgIGxpLmFwcGVuZCh0aW1lLCBhdXRob3IsIG1lc3NhZ2UpO1xuICAgICAgY29tbWVudENvbnRhaW5lci5hcHBlbmRDaGlsZChsaSk7XG4gICAgfSk7XG4gIH1cbn07XG5cbmV4cG9ydCB7IGRpc3BsYXlDb21tZW50cyBhcyBkZWZhdWx0IH07IiwiY29uc3QgY291bnRDb21tZW50cyA9ICgpID0+IHtcbiAgY29uc3QgYWxsQ29tbWVudHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuc2luZ2xlLWNvbW1lbnQnKS5sZW5ndGg7XG4gIHJldHVybiBhbGxDb21tZW50cztcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGNvdW50Q29tbWVudHM7IiwiY29uc3QgY291bnRDYXJkcyA9ICgpID0+IHtcbiAgY29uc3QgbXlBcnJheSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5jYXJkJyk7XG4gIGNvbnN0IGNvdW50ID0gbXlBcnJheS5sZW5ndGg7XG4gIHJldHVybiBjb3VudDtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGNvdW50Q2FyZHM7IiwiY29uc3QgcG9zdExpa2UgPSBhc3luYyAoaXRlbUlkKSA9PiB7XG4gIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goJ2h0dHBzOi8vdXMtY2VudHJhbDEtaW52b2x2ZW1lbnQtYXBpLmNsb3VkZnVuY3Rpb25zLm5ldC9jYXBzdG9uZUFwaS9hcHBzL21mY3Y1RE9TeGNoNXV5eXh6TkxvL2xpa2VzLycsIHtcbiAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7XG4gICAgICBpdGVtX2lkOiBpdGVtSWQsXG4gICAgfSksXG4gICAgaGVhZGVyczoge1xuICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uOyBjaGFyc2V0PVVURi04JyxcbiAgICB9LFxuICB9KTtcbiAgcmV0dXJuIHJlc3BvbnNlLnRleHQoKTtcbn07XG5cbmNvbnN0IGdldExpa2VzID0gYXN5bmMgKCkgPT4ge1xuICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKCdodHRwczovL3VzLWNlbnRyYWwxLWludm9sdmVtZW50LWFwaS5jbG91ZGZ1bmN0aW9ucy5uZXQvY2Fwc3RvbmVBcGkvYXBwcy9tZmN2NURPU3hjaDV1eXl4ek5Mby9saWtlcy8nKTtcbiAgY29uc3QgZGF0YSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcbiAgcmV0dXJuIGRhdGE7XG59O1xuXG5leHBvcnQgeyBwb3N0TGlrZSwgZ2V0TGlrZXMgfTsiLCJpbXBvcnQgZ2V0UGljdHVyZXMgZnJvbSAnLi9HZXRSZXF1ZXN0LmpzJztcbmltcG9ydCBkaXNwbGF5Q29tbWVudHMgZnJvbSAnLi9jb21tZW50cy5qcyc7XG5pbXBvcnQgeyBhZGRDb21tZW50cyB9IGZyb20gJy4vQVBJY29tbWVudHMuanMnO1xuaW1wb3J0IGNvdW50Q29tbWVudHMgZnJvbSAnLi9jb3VudENvbW1lbnRzLmpzJztcblxuY29uc3Qgc2hvd0NvbW1lbnRDYXJkID0gYXN5bmMgKHRpdGxlKSA9PiB7XG4gIGNvbnN0IG15UGljdHVyZXNKc29uID0gYXdhaXQgZ2V0UGljdHVyZXMoKTtcbiAgY29uc3Qgc3RyaW5naWZpZWRKc29uID0gSlNPTi5zdHJpbmdpZnkobXlQaWN0dXJlc0pzb24pO1xuICBjb25zdCBteVBpY3R1cmVzID0gSlNPTi5wYXJzZShzdHJpbmdpZmllZEpzb24pO1xuXG4gIG15UGljdHVyZXMuZm9yRWFjaCgoZWxlbWVudCwgaW5kZXgpID0+IHtcbiAgICBpZiAoZWxlbWVudC50aXRsZSA9PT0gdGl0bGUpIHtcbiAgICAgIGNvbnN0IGNvbW1lbnRNb2RlbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jb21tZW50LW1vZGVsJyk7XG4gICAgICBjb25zdCBjb21tZW50Q2FyZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgY29tbWVudENhcmQuY2xhc3NMaXN0LmFkZCgnY29tbWVudC1jYXJkJyk7XG4gICAgICBjb21tZW50Q2FyZC5zZXRBdHRyaWJ1dGUoJ2luZGV4JywgaW5kZXgpO1xuXG4gICAgICBjb25zdCBjbG9zZUljb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgIGNsb3NlSWNvbi5jbGFzc0xpc3QuYWRkKCdjbG9zZS1pY29uJyk7XG4gICAgICBjb25zdCBpY29uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaScpO1xuICAgICAgaWNvbi5jbGFzc0xpc3QuYWRkKCdmYXMnLCAnZmEtdGltZXMnLCdjcm9zcycpO1xuICAgICAgY2xvc2VJY29uLmFwcGVuZENoaWxkKGljb24pO1xuXG4gICAgICBjb25zdCBjbG9zZUNsaWNrID0gKCkgPT4ge1xuICAgICAgICBjb21tZW50TW9kZWwuY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJyk7XG4gICAgICAgIGNvbW1lbnRNb2RlbC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgICAgICBjb21tZW50TW9kZWwuaW5uZXJIVE1MID0gJyc7XG4gICAgICB9O1xuXG4gICAgICBjbG9zZUljb24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBjbG9zZUNsaWNrKTtcblxuICAgICAgY29uc3QgbWFpbkRlc2NyaXB0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICBtYWluRGVzY3JpcHRpb24uY2xhc3NMaXN0LmFkZCgnbWFpbi1kZXNjcmlwdGlvbicpO1xuXG4gICAgICBpZiAoZWxlbWVudC5tZWRpYV90eXBlID09PSAnaW1hZ2UnKSB7XG4gICAgICAgIGNvbnN0IG1lZGlhID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJyk7XG4gICAgICAgIG1lZGlhLmNsYXNzTGlzdC5hZGQoJ21lZGlhSW1hZ2UnKTtcbiAgICAgICAgbWVkaWEuc3JjID0gZWxlbWVudC51cmw7XG4gICAgICAgIG1haW5EZXNjcmlwdGlvbi5hcHBlbmRDaGlsZChtZWRpYSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zdCBtZWRpYSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lmcmFtZScpO1xuICAgICAgICBtZWRpYS5jbGFzc0xpc3QuYWRkKCdtZWRpYVZpZGVvJyk7XG4gICAgICAgIG1lZGlhLnNyYyA9IGVsZW1lbnQudXJsO1xuICAgICAgICBtYWluRGVzY3JpcHRpb24uYXBwZW5kQ2hpbGQobWVkaWEpO1xuICAgICAgfVxuICAgICAgY29uc3QgaDEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdoMScpO1xuICAgICAgaDEuY2xhc3NMaXN0LmFkZCgnaW1hZ2UtdGl0bGUnKTtcbiAgICAgIGgxLmlubmVyVGV4dCA9IGVsZW1lbnQudGl0bGU7XG5cbiAgICAgIGNvbnN0IGV4cGxhbmF0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xuICAgICAgZXhwbGFuYXRpb24uY2xhc3NMaXN0LmFkZCgnaW1hZ2UtZXhwbGFuYXRpb24nKTtcbiAgICAgIGV4cGxhbmF0aW9uLmlubmVyVGV4dCA9IGVsZW1lbnQuZXhwbGFuYXRpb247XG5cbiAgICAgIGNvbnN0IGV4dHJhRXhwbGFuYXRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XG4gICAgICBjb25zdCBjb3B5cmlnaHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgICBjb3B5cmlnaHQuY2xhc3NMaXN0LmFkZCgnY29weXJpZ2h0Jyk7XG4gICAgICBjb3B5cmlnaHQuaW5uZXJUZXh0ID0gYEJ5ICR7ZWxlbWVudC5jb3B5cmlnaHQgPz8gJ0Fub255bW91cyd9YDtcblxuICAgICAgY29uc3QgaW1hZ2VEYXRlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgICAgaW1hZ2VEYXRlLmNsYXNzTGlzdC5hZGQoJ2ltYWdlLWRhdGUnKTtcbiAgICAgIGltYWdlRGF0ZS5pbm5lclRleHQgPSBgJHtlbGVtZW50LmRhdGV9YDtcbiAgICAgIGV4dHJhRXhwbGFuYXRpb24uYXBwZW5kKGNvcHlyaWdodCwgaW1hZ2VEYXRlKTtcblxuICAgICAgY29uc3QgaDIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdoMicpO1xuICAgICAgaDIuaW5uZXJUZXh0ID0gJ0NvbW1lbnRzICc7XG4gICAgICBjb25zdCBjb21tZW50Q291bnRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICAgIGNvbW1lbnRDb3VudGVyLmNsYXNzTGlzdC5hZGQoJ2NvbW1lbnQtY291bnRlcicpO1xuXG4gICAgICBoMi5hcHBlbmRDaGlsZChjb21tZW50Q291bnRlcik7XG5cbiAgICAgIGNvbnN0IGNvbW1lbnRDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd1bCcpO1xuICAgICAgY29tbWVudENvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCdjb21tZW50LWNvbnRhaW5lcicpO1xuXG4gICAgICBjb25zdCBjb21tZW50VGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdoMicpO1xuICAgICAgY29tbWVudFRpdGxlLmlubmVyVGV4dCA9ICdBZGQgYSBjb21tZW50JztcblxuICAgICAgY29uc3QgZm9ybSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2Zvcm0nKTtcbiAgICAgIGZvcm0uaW5uZXJIVE1MID0gYFxuICAgICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIHBsYWNlaG9sZGVyPVwiWW91ciBuYW1lXCIgY2xhc3M9XCJuYW1lLWlucHV0IGlucHV0XCIgcmVxdWlyZWQgYXV0b2NvbXBsZXRlPVwib2ZmXCIgLz5cbiAgICAgICAgICA8dGV4dGFyZWEgbmFtZT1cImNvbW1lbnQtaW5wdXRcIiBjbGFzcz1cImNvbW1lbnQtaW5wdXQgaW5wdXRcIiBwbGFjZWhvbGRlcj1cIllvdXIgaW5zaWdodHMuLi5cIiByZXF1aXJlZD48L3RleHRhcmVhPlxuICAgICAgICAgIDxidXR0b24gdHlwZT1cInN1Ym1pdFwiPlN1Ym1pdCBDb21tZW50PC9idXR0b24+XG4gICAgICAgICAgYDtcblxuICAgICAgbWFpbkRlc2NyaXB0aW9uLmFwcGVuZChoMSwgZXhwbGFuYXRpb24sIGV4dHJhRXhwbGFuYXRpb24sIGgyLCBjb21tZW50Q29udGFpbmVyLCBjb21tZW50VGl0bGUsIGZvcm0pOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG1heC1sZW5cbiAgICAgIGNvbW1lbnRDYXJkLmFwcGVuZChjbG9zZUljb24sIG1haW5EZXNjcmlwdGlvbik7XG4gICAgICBjb21tZW50TW9kZWwuYXBwZW5kQ2hpbGQoY29tbWVudENhcmQpO1xuICAgICAgICBmb3JtLmFkZEV2ZW50TGlzdGVuZXIoJ3N1Ym1pdCcsIGFzeW5jIChldmVudCkgPT4ge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBjb21tZW50Q29udGFpbmVyLmlubmVySFRNTCA9ICcnO1xuXG4gICAgICAgIGNvbnN0IHVzZXJuYW1lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm5hbWUtaW5wdXQnKS52YWx1ZTtcbiAgICAgICAgY29uc3QgY29tbWVudE1lc3NhZ2UgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY29tbWVudC1pbnB1dCcpLnZhbHVlO1xuICAgICAgICBjb25zdCB1c2VySUQgPSBjb21tZW50Q2FyZC5nZXRBdHRyaWJ1dGUoJ2luZGV4Jyk7XG5cbiAgICAgICAgYXdhaXQgYWRkQ29tbWVudHModXNlcm5hbWUsIGNvbW1lbnRNZXNzYWdlLCB1c2VySUQpO1xuICAgICAgICBhd2FpdCBkaXNwbGF5Q29tbWVudHModXNlcklEKTtcblxuICAgICAgICBmb3JtLnJlc2V0KCk7XG5cbiAgICAgICAgY29uc3QgY291bnRlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jb21tZW50LWNvdW50ZXInKTtcbiAgICAgICAgY291bnRlci5pbm5lclRleHQgPSBgKCR7Y291bnRDb21tZW50cygpfSlgO1xuICAgICAgfSk7XG4gICAgfVxuICB9KTtcblxuICBjb25zdCBjb21tZW50Q2FyZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jb21tZW50LWNhcmQnKTtcbiAgY29uc3QgdXNlcklEID0gY29tbWVudENhcmQuZ2V0QXR0cmlidXRlKCdpbmRleCcpO1xuICBhd2FpdCBkaXNwbGF5Q29tbWVudHModXNlcklEKTtcblxuICBjb25zdCBjb21tZW50Q291bnRlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jb21tZW50LWNvdW50ZXInKTtcbiAgY29tbWVudENvdW50ZXIuaW5uZXJUZXh0ID0gYCgke2NvdW50Q29tbWVudHMoKX0pYDtcbn07XG5cbmV4cG9ydCB7IHNob3dDb21tZW50Q2FyZCBhcyBkZWZhdWx0IH07IiwiLy8gSW1wb3J0c1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18gZnJvbSBcIi4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzXCI7XG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fIGZyb20gXCIuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzXCI7XG52YXIgX19fQ1NTX0xPQURFUl9FWFBPUlRfX18gPSBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyk7XG4vLyBNb2R1bGVcbl9fX0NTU19MT0FERVJfRVhQT1JUX19fLnB1c2goW21vZHVsZS5pZCwgXCIqIHtcXHJcXG4gIG1hcmdpbjogMDtcXHJcXG4gIHBhZGRpbmc6IDA7XFxyXFxuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xcclxcbiAgZm9udC1mYW1pbHk6ICdQb3BwaW5zJywgc2Fucy1zZXJpZjtcXHJcXG59XFxyXFxuXFxyXFxuLmFwcC1jb250YWluZXIge1xcclxcbiAgd2lkdGg6IDEwMCU7XFxyXFxuICBoZWlnaHQ6IGF1dG87XFxyXFxuICBtYXJnaW4tbGVmdDogYXV0bztcXHJcXG4gIG1hcmdpbi1yaWdodDogYXV0bztcXHJcXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYmEoODksIDgxLCA5MiwgMC43MjYpO1xcclxcbiAgbWFyZ2luLXRvcDogMDtcXHJcXG59XFxyXFxuXFxyXFxuLmhlYWRpbmcge1xcclxcbiAgZGlzcGxheTogZmxleDtcXHJcXG4gIGZsZXgtZGlyZWN0aW9uOiByb3c7XFxyXFxuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XFxyXFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcclxcbiAgbWFyZ2luOiAwIDFyZW07XFxyXFxuICBoZWlnaHQ6IDNyZW07XFxyXFxuICBwYWRkaW5nOiAwLjNyZW07XFxyXFxufVxcclxcblxcclxcbi5oZWFkaW5nIC53ZWItdGl0bGUge1xcclxcbiAgZm9udC1zaXplOiAzcmVtO1xcclxcbiAgcGFkZGluZzogMC41cmVtO1xcclxcbiAgZm9udC13ZWlnaHQ6IDkwMDtcXHJcXG4gIGZvbnQtZmFtaWx5OiAnTW9ub3RvbicsIGN1cnNpdmU7XFxyXFxufVxcclxcblxcclxcbmEge1xcclxcbiAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xcclxcbn1cXHJcXG5cXHJcXG4uaGVhZGluZyAubmF2YmFyIHVsIHtcXHJcXG4gIGRpc3BsYXk6IGZsZXg7XFxyXFxuICBmbGV4LWRpcmVjdGlvbjogcm93O1xcclxcbiAgbWFyZ2luLXJpZ2h0OiAxcmVtO1xcclxcbn1cXHJcXG5cXHJcXG4ubmF2YmFyIHVsIGxpIHtcXHJcXG4gIGxpc3Qtc3R5bGU6IG5vbmU7XFxyXFxuICBtYXJnaW4tcmlnaHQ6IDEuNXJlbTtcXHJcXG59XFxyXFxuXFxyXFxuLm5hdmJhciB1bCBsaSBhOmhvdmVyIHtcXHJcXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYigxMzMsIDEyOSwgMTI2KTtcXHJcXG4gIGJvcmRlci1yYWRpdXM6IDAuMnJlbTtcXHJcXG4gIGNvbG9yOiB3aGl0ZXNtb2tlO1xcclxcbn1cXHJcXG5cXHJcXG4vKiBtYWluIHNlY3Rpb24gc3R5bGUgb2YgdGhlIHdlYnNpdGUgKi9cXHJcXG4uYXBwLWNvbnRhaW5lciAuY29udGVudCB7XFxyXFxuICBkaXNwbGF5OiBmbGV4O1xcclxcbiAgd2lkdGg6IDEwMCU7XFxyXFxuICBtYXJnaW4tbGVmdDogYXV0bztcXHJcXG4gIG1hcmdpbi1yaWdodDogYXV0bztcXHJcXG4gIGJhY2tncm91bmQtY29sb3I6ICMyMDI2MmU7XFxyXFxufVxcclxcblxcclxcbi5jb250ZW50IHNlY3Rpb24ge1xcclxcbiAgZGlzcGxheTogZmxleDtcXHJcXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxyXFxufVxcclxcblxcclxcbi50aXRsZS1saW5rIHtcXHJcXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcXHJcXG4gIGZvbnQtc2l6ZTogMnJlbTtcXHJcXG4gIGZvbnQtc3R5bGU6IG5vcm1hbDtcXHJcXG4gIGZvbnQtd2VpZ2h0OiA2MDA7XFxyXFxuICBtYXJnaW4tYm90dG9tOiAxcmVtO1xcclxcbiAgY29sb3I6IHdoaXRlc21va2U7XFxyXFxufVxcclxcblxcclxcbi5jb250ZW50IC5pdGVtLWdyaWQge1xcclxcbiAgZGlzcGxheTogZmxleDtcXHJcXG4gIGZsZXgtZGlyZWN0aW9uOiByb3c7XFxyXFxuICBmbGV4LXdyYXA6IHdyYXA7XFxyXFxuICB3aWR0aDogMTAwJTtcXHJcXG4gIGhlaWdodDogYXV0bztcXHJcXG4gIGJhY2tncm91bmQtY29sb3I6ICMyMDI2MmU7XFxyXFxufVxcclxcblxcclxcbi5jYXJkIHtcXHJcXG4gIGRpc3BsYXk6IGZsZXg7XFxyXFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcclxcbiAgd2lkdGg6IDIzcmVtO1xcclxcbiAgaGVpZ2h0OiAyOHJlbTtcXHJcXG4gIGJhY2tncm91bmQtY29sb3I6ICM4YTkyOWM7XFxyXFxuICBtYXJnaW4tdG9wOiAxcmVtO1xcclxcbiAgbWFyZ2luLWJvdHRvbTogMXJlbTtcXHJcXG4gIG1hcmdpbi1sZWZ0OiAzLjVyZW07XFxyXFxuICBwYWRkaW5nOiAwLjRyZW07XFxyXFxuICBib3JkZXItcmFkaXVzOiAwLjVyZW07XFxyXFxuICB0cmFuc2l0aW9uOiBlYXNlLWluLW91dCAwLjVzO1xcclxcbn1cXHJcXG5cXHJcXG4uY2FyZDpob3ZlciB7XFxyXFxuICB0cmFuc2Zvcm06IHNjYWxlKDEuMDgpO1xcclxcbiAgY3Vyc29yOiBwb2ludGVyO1xcclxcbn1cXHJcXG5cXHJcXG4ucGljdHVyZSB7XFxyXFxuICB3aWR0aDogMjJyZW07XFxyXFxuICBoZWlnaHQ6IDE3cmVtO1xcclxcbiAgbWFyZ2luLXJpZ2h0OiAycmVtO1xcclxcbn1cXHJcXG5cXHJcXG4ubWVkaWFJbWFnZSB7XFxyXFxuICB3aWR0aDogNjlyZW07XFxyXFxuICBoZWlnaHQ6IDQ1cmVtO1xcclxcbn1cXHJcXG5cXHJcXG4uY29tbWVudC1tb2RlbCB7XFxyXFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcclxcbiAgd2lkdGg6IDkwdnc7XFxyXFxuICBoZWlnaHQ6IDkwdmg7XFxyXFxuICBtYXJnaW4tbGVmdDogYXV0bztcXHJcXG4gIG1hcmdpbi1yaWdodDogYXV0bztcXHJcXG4gIHBvc2l0aW9uOiBmaXhlZDtcXHJcXG4gIHotaW5kZXg6IDIwO1xcclxcbiAgdG9wOiAyJTtcXHJcXG4gIGxlZnQ6IDQlO1xcclxcbiAgb3ZlcmZsb3cteTogYXV0bztcXHJcXG4gIGJvdHRvbTogMiU7IFxcclxcbiAgYmFja2dyb3VuZC1jb2xvcjogIzhhOTI5YztcXHJcXG4gIGRpc3BsYXk6IG5vbmU7IFxcclxcbn1cXHJcXG5cXHJcXG4uY29tbWVudC1jYXJkIHtcXHJcXG4gIGRpc3BsYXk6IGZsZXg7XFxyXFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcclxcbiAgcGFkZGluZzogMXJlbSAycmVtO1xcclxcbiAgd2lkdGg6IDk1JTtcXHJcXG4gIGhlaWdodDogNDlyZW07XFxyXFxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMjI2LCAyMzYsIDIzMyk7XFxyXFxuICBtYXJnaW4tbGVmdDogMnJlbTtcXHJcXG4gIGJvcmRlci1yYWRpdXM6IDAuNHJlbTtcXHJcXG4gIG1hcmdpbi1ib3R0b206IDNyZW07XFxyXFxufVxcclxcblxcclxcbi5jcm9zcyB7XFxyXFxuICBmb250LXNpemU6IDJyZW07XFxyXFxuICBjdXJzb3I6IHBvaW50ZXI7XFxyXFxufSBcXHJcXG5cXHJcXG5mb3JtIHtcXHJcXG4gIGRpc3BsYXk6IGZsZXg7XFxyXFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcclxcbiAgbWFyZ2luLWJvdHRvbTogMnJlbTtcXHJcXG59XFxyXFxuXFxyXFxuLmlucHV0IHtcXHJcXG4gIHdpZHRoOiAyMHJlbTtcXHJcXG4gIGhlaWdodDogM3JlbTtcXHJcXG59XFxyXFxuXFxyXFxuZm9ybSBidXR0b24ge1xcclxcbiAgd2lkdGg6IDEwcmVtO1xcclxcbiAgaGVpZ2h0OiAzcmVtO1xcclxcbn1cXHJcXG5cXHJcXG4uY29tbWVudC1idG4ge1xcclxcbiAgY3Vyc29yOiBwb2ludGVyO1xcclxcbiAgZm9udC13ZWlnaHQ6IDYwMDtcXHJcXG4gIHdpZHRoOiA3cmVtO1xcclxcbiAgaGVpZ2h0OiAycmVtO1xcclxcbn1cXHJcXG5cXHJcXG4uZmEtaGVhcnQ6aG92ZXIge1xcclxcbiAgY29sb3I6IHJlZDtcXHJcXG4gIHRyYW5zaXRpb246IDAuNXM7XFxyXFxuICB0cmFuc2Zvcm06IHNjYWxlWCgxLjIpO1xcclxcbn1cXHJcXG5cXHJcXG5mb290ZXIge1xcclxcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xcclxcbiAgZm9udC1zaXplOiAxNHB4O1xcclxcbiAgaGVpZ2h0OiA0cmVtO1xcclxcbiAgcGFkZGluZzogMXJlbTtcXHJcXG4gIGZvbnQtc3R5bGU6IGl0YWxpYztcXHJcXG59XCIsIFwiXCIse1widmVyc2lvblwiOjMsXCJzb3VyY2VzXCI6W1wid2VicGFjazovLy4vc3JjL3N0eWxlLmNzc1wiXSxcIm5hbWVzXCI6W10sXCJtYXBwaW5nc1wiOlwiQUFBQTtFQUNFLFNBQVM7RUFDVCxVQUFVO0VBQ1Ysc0JBQXNCO0VBQ3RCLGtDQUFrQztBQUNwQzs7QUFFQTtFQUNFLFdBQVc7RUFDWCxZQUFZO0VBQ1osaUJBQWlCO0VBQ2pCLGtCQUFrQjtFQUNsQix5Q0FBeUM7RUFDekMsYUFBYTtBQUNmOztBQUVBO0VBQ0UsYUFBYTtFQUNiLG1CQUFtQjtFQUNuQiw4QkFBOEI7RUFDOUIsbUJBQW1CO0VBQ25CLGNBQWM7RUFDZCxZQUFZO0VBQ1osZUFBZTtBQUNqQjs7QUFFQTtFQUNFLGVBQWU7RUFDZixlQUFlO0VBQ2YsZ0JBQWdCO0VBQ2hCLCtCQUErQjtBQUNqQzs7QUFFQTtFQUNFLHFCQUFxQjtBQUN2Qjs7QUFFQTtFQUNFLGFBQWE7RUFDYixtQkFBbUI7RUFDbkIsa0JBQWtCO0FBQ3BCOztBQUVBO0VBQ0UsZ0JBQWdCO0VBQ2hCLG9CQUFvQjtBQUN0Qjs7QUFFQTtFQUNFLG9DQUFvQztFQUNwQyxxQkFBcUI7RUFDckIsaUJBQWlCO0FBQ25COztBQUVBLHNDQUFzQztBQUN0QztFQUNFLGFBQWE7RUFDYixXQUFXO0VBQ1gsaUJBQWlCO0VBQ2pCLGtCQUFrQjtFQUNsQix5QkFBeUI7QUFDM0I7O0FBRUE7RUFDRSxhQUFhO0VBQ2Isc0JBQXNCO0FBQ3hCOztBQUVBO0VBQ0Usa0JBQWtCO0VBQ2xCLGVBQWU7RUFDZixrQkFBa0I7RUFDbEIsZ0JBQWdCO0VBQ2hCLG1CQUFtQjtFQUNuQixpQkFBaUI7QUFDbkI7O0FBRUE7RUFDRSxhQUFhO0VBQ2IsbUJBQW1CO0VBQ25CLGVBQWU7RUFDZixXQUFXO0VBQ1gsWUFBWTtFQUNaLHlCQUF5QjtBQUMzQjs7QUFFQTtFQUNFLGFBQWE7RUFDYixzQkFBc0I7RUFDdEIsWUFBWTtFQUNaLGFBQWE7RUFDYix5QkFBeUI7RUFDekIsZ0JBQWdCO0VBQ2hCLG1CQUFtQjtFQUNuQixtQkFBbUI7RUFDbkIsZUFBZTtFQUNmLHFCQUFxQjtFQUNyQiw0QkFBNEI7QUFDOUI7O0FBRUE7RUFDRSxzQkFBc0I7RUFDdEIsZUFBZTtBQUNqQjs7QUFFQTtFQUNFLFlBQVk7RUFDWixhQUFhO0VBQ2Isa0JBQWtCO0FBQ3BCOztBQUVBO0VBQ0UsWUFBWTtFQUNaLGFBQWE7QUFDZjs7QUFFQTtFQUNFLHNCQUFzQjtFQUN0QixXQUFXO0VBQ1gsWUFBWTtFQUNaLGlCQUFpQjtFQUNqQixrQkFBa0I7RUFDbEIsZUFBZTtFQUNmLFdBQVc7RUFDWCxPQUFPO0VBQ1AsUUFBUTtFQUNSLGdCQUFnQjtFQUNoQixVQUFVO0VBQ1YseUJBQXlCO0VBQ3pCLGFBQWE7QUFDZjs7QUFFQTtFQUNFLGFBQWE7RUFDYixzQkFBc0I7RUFDdEIsa0JBQWtCO0VBQ2xCLFVBQVU7RUFDVixhQUFhO0VBQ2Isb0NBQW9DO0VBQ3BDLGlCQUFpQjtFQUNqQixxQkFBcUI7RUFDckIsbUJBQW1CO0FBQ3JCOztBQUVBO0VBQ0UsZUFBZTtFQUNmLGVBQWU7QUFDakI7O0FBRUE7RUFDRSxhQUFhO0VBQ2Isc0JBQXNCO0VBQ3RCLG1CQUFtQjtBQUNyQjs7QUFFQTtFQUNFLFlBQVk7RUFDWixZQUFZO0FBQ2Q7O0FBRUE7RUFDRSxZQUFZO0VBQ1osWUFBWTtBQUNkOztBQUVBO0VBQ0UsZUFBZTtFQUNmLGdCQUFnQjtFQUNoQixXQUFXO0VBQ1gsWUFBWTtBQUNkOztBQUVBO0VBQ0UsVUFBVTtFQUNWLGdCQUFnQjtFQUNoQixzQkFBc0I7QUFDeEI7O0FBRUE7RUFDRSxrQkFBa0I7RUFDbEIsZUFBZTtFQUNmLFlBQVk7RUFDWixhQUFhO0VBQ2Isa0JBQWtCO0FBQ3BCXCIsXCJzb3VyY2VzQ29udGVudFwiOltcIioge1xcclxcbiAgbWFyZ2luOiAwO1xcclxcbiAgcGFkZGluZzogMDtcXHJcXG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxyXFxuICBmb250LWZhbWlseTogJ1BvcHBpbnMnLCBzYW5zLXNlcmlmO1xcclxcbn1cXHJcXG5cXHJcXG4uYXBwLWNvbnRhaW5lciB7XFxyXFxuICB3aWR0aDogMTAwJTtcXHJcXG4gIGhlaWdodDogYXV0bztcXHJcXG4gIG1hcmdpbi1sZWZ0OiBhdXRvO1xcclxcbiAgbWFyZ2luLXJpZ2h0OiBhdXRvO1xcclxcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSg4OSwgODEsIDkyLCAwLjcyNik7XFxyXFxuICBtYXJnaW4tdG9wOiAwO1xcclxcbn1cXHJcXG5cXHJcXG4uaGVhZGluZyB7XFxyXFxuICBkaXNwbGF5OiBmbGV4O1xcclxcbiAgZmxleC1kaXJlY3Rpb246IHJvdztcXHJcXG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcXHJcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxyXFxuICBtYXJnaW46IDAgMXJlbTtcXHJcXG4gIGhlaWdodDogM3JlbTtcXHJcXG4gIHBhZGRpbmc6IDAuM3JlbTtcXHJcXG59XFxyXFxuXFxyXFxuLmhlYWRpbmcgLndlYi10aXRsZSB7XFxyXFxuICBmb250LXNpemU6IDNyZW07XFxyXFxuICBwYWRkaW5nOiAwLjVyZW07XFxyXFxuICBmb250LXdlaWdodDogOTAwO1xcclxcbiAgZm9udC1mYW1pbHk6ICdNb25vdG9uJywgY3Vyc2l2ZTtcXHJcXG59XFxyXFxuXFxyXFxuYSB7XFxyXFxuICB0ZXh0LWRlY29yYXRpb246IG5vbmU7XFxyXFxufVxcclxcblxcclxcbi5oZWFkaW5nIC5uYXZiYXIgdWwge1xcclxcbiAgZGlzcGxheTogZmxleDtcXHJcXG4gIGZsZXgtZGlyZWN0aW9uOiByb3c7XFxyXFxuICBtYXJnaW4tcmlnaHQ6IDFyZW07XFxyXFxufVxcclxcblxcclxcbi5uYXZiYXIgdWwgbGkge1xcclxcbiAgbGlzdC1zdHlsZTogbm9uZTtcXHJcXG4gIG1hcmdpbi1yaWdodDogMS41cmVtO1xcclxcbn1cXHJcXG5cXHJcXG4ubmF2YmFyIHVsIGxpIGE6aG92ZXIge1xcclxcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDEzMywgMTI5LCAxMjYpO1xcclxcbiAgYm9yZGVyLXJhZGl1czogMC4ycmVtO1xcclxcbiAgY29sb3I6IHdoaXRlc21va2U7XFxyXFxufVxcclxcblxcclxcbi8qIG1haW4gc2VjdGlvbiBzdHlsZSBvZiB0aGUgd2Vic2l0ZSAqL1xcclxcbi5hcHAtY29udGFpbmVyIC5jb250ZW50IHtcXHJcXG4gIGRpc3BsYXk6IGZsZXg7XFxyXFxuICB3aWR0aDogMTAwJTtcXHJcXG4gIG1hcmdpbi1sZWZ0OiBhdXRvO1xcclxcbiAgbWFyZ2luLXJpZ2h0OiBhdXRvO1xcclxcbiAgYmFja2dyb3VuZC1jb2xvcjogIzIwMjYyZTtcXHJcXG59XFxyXFxuXFxyXFxuLmNvbnRlbnQgc2VjdGlvbiB7XFxyXFxuICBkaXNwbGF5OiBmbGV4O1xcclxcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXHJcXG59XFxyXFxuXFxyXFxuLnRpdGxlLWxpbmsge1xcclxcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xcclxcbiAgZm9udC1zaXplOiAycmVtO1xcclxcbiAgZm9udC1zdHlsZTogbm9ybWFsO1xcclxcbiAgZm9udC13ZWlnaHQ6IDYwMDtcXHJcXG4gIG1hcmdpbi1ib3R0b206IDFyZW07XFxyXFxuICBjb2xvcjogd2hpdGVzbW9rZTtcXHJcXG59XFxyXFxuXFxyXFxuLmNvbnRlbnQgLml0ZW0tZ3JpZCB7XFxyXFxuICBkaXNwbGF5OiBmbGV4O1xcclxcbiAgZmxleC1kaXJlY3Rpb246IHJvdztcXHJcXG4gIGZsZXgtd3JhcDogd3JhcDtcXHJcXG4gIHdpZHRoOiAxMDAlO1xcclxcbiAgaGVpZ2h0OiBhdXRvO1xcclxcbiAgYmFja2dyb3VuZC1jb2xvcjogIzIwMjYyZTtcXHJcXG59XFxyXFxuXFxyXFxuLmNhcmQge1xcclxcbiAgZGlzcGxheTogZmxleDtcXHJcXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxyXFxuICB3aWR0aDogMjNyZW07XFxyXFxuICBoZWlnaHQ6IDI4cmVtO1xcclxcbiAgYmFja2dyb3VuZC1jb2xvcjogIzhhOTI5YztcXHJcXG4gIG1hcmdpbi10b3A6IDFyZW07XFxyXFxuICBtYXJnaW4tYm90dG9tOiAxcmVtO1xcclxcbiAgbWFyZ2luLWxlZnQ6IDMuNXJlbTtcXHJcXG4gIHBhZGRpbmc6IDAuNHJlbTtcXHJcXG4gIGJvcmRlci1yYWRpdXM6IDAuNXJlbTtcXHJcXG4gIHRyYW5zaXRpb246IGVhc2UtaW4tb3V0IDAuNXM7XFxyXFxufVxcclxcblxcclxcbi5jYXJkOmhvdmVyIHtcXHJcXG4gIHRyYW5zZm9ybTogc2NhbGUoMS4wOCk7XFxyXFxuICBjdXJzb3I6IHBvaW50ZXI7XFxyXFxufVxcclxcblxcclxcbi5waWN0dXJlIHtcXHJcXG4gIHdpZHRoOiAyMnJlbTtcXHJcXG4gIGhlaWdodDogMTdyZW07XFxyXFxuICBtYXJnaW4tcmlnaHQ6IDJyZW07XFxyXFxufVxcclxcblxcclxcbi5tZWRpYUltYWdlIHtcXHJcXG4gIHdpZHRoOiA2OXJlbTtcXHJcXG4gIGhlaWdodDogNDVyZW07XFxyXFxufVxcclxcblxcclxcbi5jb21tZW50LW1vZGVsIHtcXHJcXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxyXFxuICB3aWR0aDogOTB2dztcXHJcXG4gIGhlaWdodDogOTB2aDtcXHJcXG4gIG1hcmdpbi1sZWZ0OiBhdXRvO1xcclxcbiAgbWFyZ2luLXJpZ2h0OiBhdXRvO1xcclxcbiAgcG9zaXRpb246IGZpeGVkO1xcclxcbiAgei1pbmRleDogMjA7XFxyXFxuICB0b3A6IDIlO1xcclxcbiAgbGVmdDogNCU7XFxyXFxuICBvdmVyZmxvdy15OiBhdXRvO1xcclxcbiAgYm90dG9tOiAyJTsgXFxyXFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjOGE5MjljO1xcclxcbiAgZGlzcGxheTogbm9uZTsgXFxyXFxufVxcclxcblxcclxcbi5jb21tZW50LWNhcmQge1xcclxcbiAgZGlzcGxheTogZmxleDtcXHJcXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxyXFxuICBwYWRkaW5nOiAxcmVtIDJyZW07XFxyXFxuICB3aWR0aDogOTUlO1xcclxcbiAgaGVpZ2h0OiA0OXJlbTtcXHJcXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYigyMjYsIDIzNiwgMjMzKTtcXHJcXG4gIG1hcmdpbi1sZWZ0OiAycmVtO1xcclxcbiAgYm9yZGVyLXJhZGl1czogMC40cmVtO1xcclxcbiAgbWFyZ2luLWJvdHRvbTogM3JlbTtcXHJcXG59XFxyXFxuXFxyXFxuLmNyb3NzIHtcXHJcXG4gIGZvbnQtc2l6ZTogMnJlbTtcXHJcXG4gIGN1cnNvcjogcG9pbnRlcjtcXHJcXG59IFxcclxcblxcclxcbmZvcm0ge1xcclxcbiAgZGlzcGxheTogZmxleDtcXHJcXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxyXFxuICBtYXJnaW4tYm90dG9tOiAycmVtO1xcclxcbn1cXHJcXG5cXHJcXG4uaW5wdXQge1xcclxcbiAgd2lkdGg6IDIwcmVtO1xcclxcbiAgaGVpZ2h0OiAzcmVtO1xcclxcbn1cXHJcXG5cXHJcXG5mb3JtIGJ1dHRvbiB7XFxyXFxuICB3aWR0aDogMTByZW07XFxyXFxuICBoZWlnaHQ6IDNyZW07XFxyXFxufVxcclxcblxcclxcbi5jb21tZW50LWJ0biB7XFxyXFxuICBjdXJzb3I6IHBvaW50ZXI7XFxyXFxuICBmb250LXdlaWdodDogNjAwO1xcclxcbiAgd2lkdGg6IDdyZW07XFxyXFxuICBoZWlnaHQ6IDJyZW07XFxyXFxufVxcclxcblxcclxcbi5mYS1oZWFydDpob3ZlciB7XFxyXFxuICBjb2xvcjogcmVkO1xcclxcbiAgdHJhbnNpdGlvbjogMC41cztcXHJcXG4gIHRyYW5zZm9ybTogc2NhbGVYKDEuMik7XFxyXFxufVxcclxcblxcclxcbmZvb3RlciB7XFxyXFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxyXFxuICBmb250LXNpemU6IDE0cHg7XFxyXFxuICBoZWlnaHQ6IDRyZW07XFxyXFxuICBwYWRkaW5nOiAxcmVtO1xcclxcbiAgZm9udC1zdHlsZTogaXRhbGljO1xcclxcbn1cIl0sXCJzb3VyY2VSb290XCI6XCJcIn1dKTtcbi8vIEV4cG9ydHNcbmV4cG9ydCBkZWZhdWx0IF9fX0NTU19MT0FERVJfRVhQT1JUX19fO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qXG4gIE1JVCBMaWNlbnNlIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXG4gIEF1dGhvciBUb2JpYXMgS29wcGVycyBAc29rcmFcbiovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKSB7XG4gIHZhciBsaXN0ID0gW107XG5cbiAgLy8gcmV0dXJuIHRoZSBsaXN0IG9mIG1vZHVsZXMgYXMgY3NzIHN0cmluZ1xuICBsaXN0LnRvU3RyaW5nID0gZnVuY3Rpb24gdG9TdHJpbmcoKSB7XG4gICAgcmV0dXJuIHRoaXMubWFwKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICB2YXIgY29udGVudCA9IFwiXCI7XG4gICAgICB2YXIgbmVlZExheWVyID0gdHlwZW9mIGl0ZW1bNV0gIT09IFwidW5kZWZpbmVkXCI7XG4gICAgICBpZiAoaXRlbVs0XSkge1xuICAgICAgICBjb250ZW50ICs9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQoaXRlbVs0XSwgXCIpIHtcIik7XG4gICAgICB9XG4gICAgICBpZiAoaXRlbVsyXSkge1xuICAgICAgICBjb250ZW50ICs9IFwiQG1lZGlhIFwiLmNvbmNhdChpdGVtWzJdLCBcIiB7XCIpO1xuICAgICAgfVxuICAgICAgaWYgKG5lZWRMYXllcikge1xuICAgICAgICBjb250ZW50ICs9IFwiQGxheWVyXCIuY29uY2F0KGl0ZW1bNV0ubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChpdGVtWzVdKSA6IFwiXCIsIFwiIHtcIik7XG4gICAgICB9XG4gICAgICBjb250ZW50ICs9IGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcoaXRlbSk7XG4gICAgICBpZiAobmVlZExheWVyKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG4gICAgICBpZiAoaXRlbVsyXSkge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuICAgICAgaWYgKGl0ZW1bNF0pIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cbiAgICAgIHJldHVybiBjb250ZW50O1xuICAgIH0pLmpvaW4oXCJcIik7XG4gIH07XG5cbiAgLy8gaW1wb3J0IGEgbGlzdCBvZiBtb2R1bGVzIGludG8gdGhlIGxpc3RcbiAgbGlzdC5pID0gZnVuY3Rpb24gaShtb2R1bGVzLCBtZWRpYSwgZGVkdXBlLCBzdXBwb3J0cywgbGF5ZXIpIHtcbiAgICBpZiAodHlwZW9mIG1vZHVsZXMgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgIG1vZHVsZXMgPSBbW251bGwsIG1vZHVsZXMsIHVuZGVmaW5lZF1dO1xuICAgIH1cbiAgICB2YXIgYWxyZWFkeUltcG9ydGVkTW9kdWxlcyA9IHt9O1xuICAgIGlmIChkZWR1cGUpIHtcbiAgICAgIGZvciAodmFyIGsgPSAwOyBrIDwgdGhpcy5sZW5ndGg7IGsrKykge1xuICAgICAgICB2YXIgaWQgPSB0aGlzW2tdWzBdO1xuICAgICAgICBpZiAoaWQgIT0gbnVsbCkge1xuICAgICAgICAgIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaWRdID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBmb3IgKHZhciBfayA9IDA7IF9rIDwgbW9kdWxlcy5sZW5ndGg7IF9rKyspIHtcbiAgICAgIHZhciBpdGVtID0gW10uY29uY2F0KG1vZHVsZXNbX2tdKTtcbiAgICAgIGlmIChkZWR1cGUgJiYgYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpdGVtWzBdXSkge1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cbiAgICAgIGlmICh0eXBlb2YgbGF5ZXIgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBpdGVtWzVdID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgICAgaXRlbVs1XSA9IGxheWVyO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBsYXllclwiLmNvbmNhdChpdGVtWzVdLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQoaXRlbVs1XSkgOiBcIlwiLCBcIiB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVs1XSA9IGxheWVyO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAobWVkaWEpIHtcbiAgICAgICAgaWYgKCFpdGVtWzJdKSB7XG4gICAgICAgICAgaXRlbVsyXSA9IG1lZGlhO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBtZWRpYSBcIi5jb25jYXQoaXRlbVsyXSwgXCIge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bMl0gPSBtZWRpYTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKHN1cHBvcnRzKSB7XG4gICAgICAgIGlmICghaXRlbVs0XSkge1xuICAgICAgICAgIGl0ZW1bNF0gPSBcIlwiLmNvbmNhdChzdXBwb3J0cyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQoaXRlbVs0XSwgXCIpIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzRdID0gc3VwcG9ydHM7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGxpc3QucHVzaChpdGVtKTtcbiAgICB9XG4gIH07XG4gIHJldHVybiBsaXN0O1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXRlbSkge1xuICB2YXIgY29udGVudCA9IGl0ZW1bMV07XG4gIHZhciBjc3NNYXBwaW5nID0gaXRlbVszXTtcbiAgaWYgKCFjc3NNYXBwaW5nKSB7XG4gICAgcmV0dXJuIGNvbnRlbnQ7XG4gIH1cbiAgaWYgKHR5cGVvZiBidG9hID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICB2YXIgYmFzZTY0ID0gYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoY3NzTWFwcGluZykpKSk7XG4gICAgdmFyIGRhdGEgPSBcInNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTg7YmFzZTY0LFwiLmNvbmNhdChiYXNlNjQpO1xuICAgIHZhciBzb3VyY2VNYXBwaW5nID0gXCIvKiMgXCIuY29uY2F0KGRhdGEsIFwiICovXCIpO1xuICAgIHJldHVybiBbY29udGVudF0uY29uY2F0KFtzb3VyY2VNYXBwaW5nXSkuam9pbihcIlxcblwiKTtcbiAgfVxuICByZXR1cm4gW2NvbnRlbnRdLmpvaW4oXCJcXG5cIik7XG59OyIsIlxuICAgICAgaW1wb3J0IEFQSSBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qc1wiO1xuICAgICAgaW1wb3J0IGRvbUFQSSBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0Rm4gZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzXCI7XG4gICAgICBpbXBvcnQgc2V0QXR0cmlidXRlcyBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydFN0eWxlRWxlbWVudCBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qc1wiO1xuICAgICAgaW1wb3J0IHN0eWxlVGFnVHJhbnNmb3JtRm4gZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qc1wiO1xuICAgICAgaW1wb3J0IGNvbnRlbnQsICogYXMgbmFtZWRFeHBvcnQgZnJvbSBcIiEhLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9zdHlsZS5jc3NcIjtcbiAgICAgIFxuICAgICAgXG5cbnZhciBvcHRpb25zID0ge307XG5cbm9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0gPSBzdHlsZVRhZ1RyYW5zZm9ybUZuO1xub3B0aW9ucy5zZXRBdHRyaWJ1dGVzID0gc2V0QXR0cmlidXRlcztcblxuICAgICAgb3B0aW9ucy5pbnNlcnQgPSBpbnNlcnRGbi5iaW5kKG51bGwsIFwiaGVhZFwiKTtcbiAgICBcbm9wdGlvbnMuZG9tQVBJID0gZG9tQVBJO1xub3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7XG5cbnZhciB1cGRhdGUgPSBBUEkoY29udGVudCwgb3B0aW9ucyk7XG5cblxuXG5leHBvcnQgKiBmcm9tIFwiISEuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL3N0eWxlLmNzc1wiO1xuICAgICAgIGV4cG9ydCBkZWZhdWx0IGNvbnRlbnQgJiYgY29udGVudC5sb2NhbHMgPyBjb250ZW50LmxvY2FscyA6IHVuZGVmaW5lZDtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgc3R5bGVzSW5ET00gPSBbXTtcbmZ1bmN0aW9uIGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpIHtcbiAgdmFyIHJlc3VsdCA9IC0xO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IHN0eWxlc0luRE9NLmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKHN0eWxlc0luRE9NW2ldLmlkZW50aWZpZXIgPT09IGlkZW50aWZpZXIpIHtcbiAgICAgIHJlc3VsdCA9IGk7XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cbmZ1bmN0aW9uIG1vZHVsZXNUb0RvbShsaXN0LCBvcHRpb25zKSB7XG4gIHZhciBpZENvdW50TWFwID0ge307XG4gIHZhciBpZGVudGlmaWVycyA9IFtdO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgaXRlbSA9IGxpc3RbaV07XG4gICAgdmFyIGlkID0gb3B0aW9ucy5iYXNlID8gaXRlbVswXSArIG9wdGlvbnMuYmFzZSA6IGl0ZW1bMF07XG4gICAgdmFyIGNvdW50ID0gaWRDb3VudE1hcFtpZF0gfHwgMDtcbiAgICB2YXIgaWRlbnRpZmllciA9IFwiXCIuY29uY2F0KGlkLCBcIiBcIikuY29uY2F0KGNvdW50KTtcbiAgICBpZENvdW50TWFwW2lkXSA9IGNvdW50ICsgMTtcbiAgICB2YXIgaW5kZXhCeUlkZW50aWZpZXIgPSBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKTtcbiAgICB2YXIgb2JqID0ge1xuICAgICAgY3NzOiBpdGVtWzFdLFxuICAgICAgbWVkaWE6IGl0ZW1bMl0sXG4gICAgICBzb3VyY2VNYXA6IGl0ZW1bM10sXG4gICAgICBzdXBwb3J0czogaXRlbVs0XSxcbiAgICAgIGxheWVyOiBpdGVtWzVdXG4gICAgfTtcbiAgICBpZiAoaW5kZXhCeUlkZW50aWZpZXIgIT09IC0xKSB7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleEJ5SWRlbnRpZmllcl0ucmVmZXJlbmNlcysrO1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhCeUlkZW50aWZpZXJdLnVwZGF0ZXIob2JqKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIHVwZGF0ZXIgPSBhZGRFbGVtZW50U3R5bGUob2JqLCBvcHRpb25zKTtcbiAgICAgIG9wdGlvbnMuYnlJbmRleCA9IGk7XG4gICAgICBzdHlsZXNJbkRPTS5zcGxpY2UoaSwgMCwge1xuICAgICAgICBpZGVudGlmaWVyOiBpZGVudGlmaWVyLFxuICAgICAgICB1cGRhdGVyOiB1cGRhdGVyLFxuICAgICAgICByZWZlcmVuY2VzOiAxXG4gICAgICB9KTtcbiAgICB9XG4gICAgaWRlbnRpZmllcnMucHVzaChpZGVudGlmaWVyKTtcbiAgfVxuICByZXR1cm4gaWRlbnRpZmllcnM7XG59XG5mdW5jdGlvbiBhZGRFbGVtZW50U3R5bGUob2JqLCBvcHRpb25zKSB7XG4gIHZhciBhcGkgPSBvcHRpb25zLmRvbUFQSShvcHRpb25zKTtcbiAgYXBpLnVwZGF0ZShvYmopO1xuICB2YXIgdXBkYXRlciA9IGZ1bmN0aW9uIHVwZGF0ZXIobmV3T2JqKSB7XG4gICAgaWYgKG5ld09iaikge1xuICAgICAgaWYgKG5ld09iai5jc3MgPT09IG9iai5jc3MgJiYgbmV3T2JqLm1lZGlhID09PSBvYmoubWVkaWEgJiYgbmV3T2JqLnNvdXJjZU1hcCA9PT0gb2JqLnNvdXJjZU1hcCAmJiBuZXdPYmouc3VwcG9ydHMgPT09IG9iai5zdXBwb3J0cyAmJiBuZXdPYmoubGF5ZXIgPT09IG9iai5sYXllcikge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBhcGkudXBkYXRlKG9iaiA9IG5ld09iaik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGFwaS5yZW1vdmUoKTtcbiAgICB9XG4gIH07XG4gIHJldHVybiB1cGRhdGVyO1xufVxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAobGlzdCwgb3B0aW9ucykge1xuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgbGlzdCA9IGxpc3QgfHwgW107XG4gIHZhciBsYXN0SWRlbnRpZmllcnMgPSBtb2R1bGVzVG9Eb20obGlzdCwgb3B0aW9ucyk7XG4gIHJldHVybiBmdW5jdGlvbiB1cGRhdGUobmV3TGlzdCkge1xuICAgIG5ld0xpc3QgPSBuZXdMaXN0IHx8IFtdO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGFzdElkZW50aWZpZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgaWRlbnRpZmllciA9IGxhc3RJZGVudGlmaWVyc1tpXTtcbiAgICAgIHZhciBpbmRleCA9IGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpO1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhdLnJlZmVyZW5jZXMtLTtcbiAgICB9XG4gICAgdmFyIG5ld0xhc3RJZGVudGlmaWVycyA9IG1vZHVsZXNUb0RvbShuZXdMaXN0LCBvcHRpb25zKTtcbiAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgbGFzdElkZW50aWZpZXJzLmxlbmd0aDsgX2krKykge1xuICAgICAgdmFyIF9pZGVudGlmaWVyID0gbGFzdElkZW50aWZpZXJzW19pXTtcbiAgICAgIHZhciBfaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihfaWRlbnRpZmllcik7XG4gICAgICBpZiAoc3R5bGVzSW5ET01bX2luZGV4XS5yZWZlcmVuY2VzID09PSAwKSB7XG4gICAgICAgIHN0eWxlc0luRE9NW19pbmRleF0udXBkYXRlcigpO1xuICAgICAgICBzdHlsZXNJbkRPTS5zcGxpY2UoX2luZGV4LCAxKTtcbiAgICAgIH1cbiAgICB9XG4gICAgbGFzdElkZW50aWZpZXJzID0gbmV3TGFzdElkZW50aWZpZXJzO1xuICB9O1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIG1lbW8gPSB7fTtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBnZXRUYXJnZXQodGFyZ2V0KSB7XG4gIGlmICh0eXBlb2YgbWVtb1t0YXJnZXRdID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgdmFyIHN0eWxlVGFyZ2V0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0YXJnZXQpO1xuXG4gICAgLy8gU3BlY2lhbCBjYXNlIHRvIHJldHVybiBoZWFkIG9mIGlmcmFtZSBpbnN0ZWFkIG9mIGlmcmFtZSBpdHNlbGZcbiAgICBpZiAod2luZG93LkhUTUxJRnJhbWVFbGVtZW50ICYmIHN0eWxlVGFyZ2V0IGluc3RhbmNlb2Ygd2luZG93LkhUTUxJRnJhbWVFbGVtZW50KSB7XG4gICAgICB0cnkge1xuICAgICAgICAvLyBUaGlzIHdpbGwgdGhyb3cgYW4gZXhjZXB0aW9uIGlmIGFjY2VzcyB0byBpZnJhbWUgaXMgYmxvY2tlZFxuICAgICAgICAvLyBkdWUgdG8gY3Jvc3Mtb3JpZ2luIHJlc3RyaWN0aW9uc1xuICAgICAgICBzdHlsZVRhcmdldCA9IHN0eWxlVGFyZ2V0LmNvbnRlbnREb2N1bWVudC5oZWFkO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAvLyBpc3RhbmJ1bCBpZ25vcmUgbmV4dFxuICAgICAgICBzdHlsZVRhcmdldCA9IG51bGw7XG4gICAgICB9XG4gICAgfVxuICAgIG1lbW9bdGFyZ2V0XSA9IHN0eWxlVGFyZ2V0O1xuICB9XG4gIHJldHVybiBtZW1vW3RhcmdldF07XG59XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gaW5zZXJ0QnlTZWxlY3RvcihpbnNlcnQsIHN0eWxlKSB7XG4gIHZhciB0YXJnZXQgPSBnZXRUYXJnZXQoaW5zZXJ0KTtcbiAgaWYgKCF0YXJnZXQpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJDb3VsZG4ndCBmaW5kIGEgc3R5bGUgdGFyZ2V0LiBUaGlzIHByb2JhYmx5IG1lYW5zIHRoYXQgdGhlIHZhbHVlIGZvciB0aGUgJ2luc2VydCcgcGFyYW1ldGVyIGlzIGludmFsaWQuXCIpO1xuICB9XG4gIHRhcmdldC5hcHBlbmRDaGlsZChzdHlsZSk7XG59XG5tb2R1bGUuZXhwb3J0cyA9IGluc2VydEJ5U2VsZWN0b3I7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpIHtcbiAgdmFyIGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3R5bGVcIik7XG4gIG9wdGlvbnMuc2V0QXR0cmlidXRlcyhlbGVtZW50LCBvcHRpb25zLmF0dHJpYnV0ZXMpO1xuICBvcHRpb25zLmluc2VydChlbGVtZW50LCBvcHRpb25zLm9wdGlvbnMpO1xuICByZXR1cm4gZWxlbWVudDtcbn1cbm1vZHVsZS5leHBvcnRzID0gaW5zZXJ0U3R5bGVFbGVtZW50OyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIHNldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcyhzdHlsZUVsZW1lbnQpIHtcbiAgdmFyIG5vbmNlID0gdHlwZW9mIF9fd2VicGFja19ub25jZV9fICE9PSBcInVuZGVmaW5lZFwiID8gX193ZWJwYWNrX25vbmNlX18gOiBudWxsO1xuICBpZiAobm9uY2UpIHtcbiAgICBzdHlsZUVsZW1lbnQuc2V0QXR0cmlidXRlKFwibm9uY2VcIiwgbm9uY2UpO1xuICB9XG59XG5tb2R1bGUuZXhwb3J0cyA9IHNldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlczsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBhcHBseShzdHlsZUVsZW1lbnQsIG9wdGlvbnMsIG9iaikge1xuICB2YXIgY3NzID0gXCJcIjtcbiAgaWYgKG9iai5zdXBwb3J0cykge1xuICAgIGNzcyArPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KG9iai5zdXBwb3J0cywgXCIpIHtcIik7XG4gIH1cbiAgaWYgKG9iai5tZWRpYSkge1xuICAgIGNzcyArPSBcIkBtZWRpYSBcIi5jb25jYXQob2JqLm1lZGlhLCBcIiB7XCIpO1xuICB9XG4gIHZhciBuZWVkTGF5ZXIgPSB0eXBlb2Ygb2JqLmxheWVyICE9PSBcInVuZGVmaW5lZFwiO1xuICBpZiAobmVlZExheWVyKSB7XG4gICAgY3NzICs9IFwiQGxheWVyXCIuY29uY2F0KG9iai5sYXllci5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KG9iai5sYXllcikgOiBcIlwiLCBcIiB7XCIpO1xuICB9XG4gIGNzcyArPSBvYmouY3NzO1xuICBpZiAobmVlZExheWVyKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG4gIGlmIChvYmoubWVkaWEpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cbiAgaWYgKG9iai5zdXBwb3J0cykge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuICB2YXIgc291cmNlTWFwID0gb2JqLnNvdXJjZU1hcDtcbiAgaWYgKHNvdXJjZU1hcCAmJiB0eXBlb2YgYnRvYSAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgIGNzcyArPSBcIlxcbi8qIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsXCIuY29uY2F0KGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KHNvdXJjZU1hcCkpKSksIFwiICovXCIpO1xuICB9XG5cbiAgLy8gRm9yIG9sZCBJRVxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgICovXG4gIG9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0oY3NzLCBzdHlsZUVsZW1lbnQsIG9wdGlvbnMub3B0aW9ucyk7XG59XG5mdW5jdGlvbiByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KSB7XG4gIC8vIGlzdGFuYnVsIGlnbm9yZSBpZlxuICBpZiAoc3R5bGVFbGVtZW50LnBhcmVudE5vZGUgPT09IG51bGwpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgc3R5bGVFbGVtZW50LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50KTtcbn1cblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBkb21BUEkob3B0aW9ucykge1xuICBpZiAodHlwZW9mIGRvY3VtZW50ID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHVwZGF0ZTogZnVuY3Rpb24gdXBkYXRlKCkge30sXG4gICAgICByZW1vdmU6IGZ1bmN0aW9uIHJlbW92ZSgpIHt9XG4gICAgfTtcbiAgfVxuICB2YXIgc3R5bGVFbGVtZW50ID0gb3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucyk7XG4gIHJldHVybiB7XG4gICAgdXBkYXRlOiBmdW5jdGlvbiB1cGRhdGUob2JqKSB7XG4gICAgICBhcHBseShzdHlsZUVsZW1lbnQsIG9wdGlvbnMsIG9iaik7XG4gICAgfSxcbiAgICByZW1vdmU6IGZ1bmN0aW9uIHJlbW92ZSgpIHtcbiAgICAgIHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpO1xuICAgIH1cbiAgfTtcbn1cbm1vZHVsZS5leHBvcnRzID0gZG9tQVBJOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIHN0eWxlVGFnVHJhbnNmb3JtKGNzcywgc3R5bGVFbGVtZW50KSB7XG4gIGlmIChzdHlsZUVsZW1lbnQuc3R5bGVTaGVldCkge1xuICAgIHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0LmNzc1RleHQgPSBjc3M7XG4gIH0gZWxzZSB7XG4gICAgd2hpbGUgKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKSB7XG4gICAgICBzdHlsZUVsZW1lbnQucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpO1xuICAgIH1cbiAgICBzdHlsZUVsZW1lbnQuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzKSk7XG4gIH1cbn1cbm1vZHVsZS5leHBvcnRzID0gc3R5bGVUYWdUcmFuc2Zvcm07Il0sIm5hbWVzIjpbImNyZWF0ZUNhcmRzIiwid2luZG93Iiwib25sb2FkIiwiZ2V0Q29tbWVudHMiLCJpdGVtSWQiLCJyZXNwb25zZSIsImZldGNoIiwiZGF0YSIsImpzb24iLCJhZGRDb21tZW50cyIsInVzZXJuYW1lIiwiY29tbWVudCIsIml0ZW1JRCIsIm1ldGhvZCIsImJvZHkiLCJKU09OIiwic3RyaW5naWZ5IiwiaXRlbV9pZCIsImhlYWRlcnMiLCJ0ZXh0IiwiYmFzZVVybCIsImtleSIsInN0YXJ0RGF0ZSIsImVuZERhdGUiLCJ1cmwiLCJnZXRQaWN0dXJlcyIsImFuc3dlciIsImRlZmF1bHQiLCJwb3N0TGlrZSIsImdldExpa2VzIiwic2hvd0NvbW1lbnRDYXJkIiwiY291bnRDYXJkcyIsIml0ZW1HcmlkIiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwibXlQaWN0dXJlcyIsImZvckVhY2giLCJpdGVtIiwiaSIsImNhcmQiLCJjcmVhdGVFbGVtZW50IiwiY2xhc3NMaXN0IiwiYWRkIiwibWVkaWFfdHlwZSIsIm1lZGlhIiwic3JjIiwiYXBwZW5kQ2hpbGQiLCJhZGRFdmVudExpc3RlbmVyIiwidGl0bGUiLCJtb2RhbCIsInRpdGxlQ29udGFpbmVyIiwiY2FyZFRpdGxlIiwidGV4dENvbnRlbnQiLCJjb250ZW50Q29udGFpbmVyIiwibGlrZXNDb250YWluZXIiLCJsb3ZlIiwic2V0QXR0cmlidXRlIiwibGlrZXMiLCJsaWtlTnVtYmVyIiwiaXRlbUxpa2VzIiwibGlrZSIsInR5cGUiLCJpbm5lclRleHQiLCJpbm5lckhUTUwiLCJzdHlsZSIsImRpc3BsYXkiLCJjb3VudGVyIiwiZ2V0RWxlbWVudEJ5SWQiLCJsZW5ndGgiLCJkaXNwbGF5Q29tbWVudHMiLCJ1c2VySUQiLCJjb21tZW50cyIsInVuZGVmaW5lZCIsImNvbW1lbnRDb3VudGVyIiwiY29tbWVudENvbnRhaW5lciIsImxpIiwidGltZSIsImNyZWF0aW9uX2RhdGUiLCJhdXRob3IiLCJtZXNzYWdlIiwiYXBwZW5kIiwiY291bnRDb21tZW50cyIsImFsbENvbW1lbnRzIiwicXVlcnlTZWxlY3RvckFsbCIsIm15QXJyYXkiLCJjb3VudCIsIm15UGljdHVyZXNKc29uIiwic3RyaW5naWZpZWRKc29uIiwicGFyc2UiLCJlbGVtZW50IiwiaW5kZXgiLCJjb21tZW50TW9kZWwiLCJjb21tZW50Q2FyZCIsImNsb3NlSWNvbiIsImljb24iLCJjbG9zZUNsaWNrIiwicmVtb3ZlIiwibWFpbkRlc2NyaXB0aW9uIiwiaDEiLCJleHBsYW5hdGlvbiIsImV4dHJhRXhwbGFuYXRpb24iLCJjb3B5cmlnaHQiLCJpbWFnZURhdGUiLCJkYXRlIiwiaDIiLCJjb21tZW50VGl0bGUiLCJmb3JtIiwiZXZlbnQiLCJwcmV2ZW50RGVmYXVsdCIsInZhbHVlIiwiY29tbWVudE1lc3NhZ2UiLCJnZXRBdHRyaWJ1dGUiLCJyZXNldCJdLCJzb3VyY2VSb290IjoiIn0=