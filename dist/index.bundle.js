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


// import './stylesForComment.css';

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
      modal.classList.add('active');
      // modal.innerHTML = '';
      // modal.style.display= 'block';
      modal.style.display = 'block';
      // console.log(item.title);
      await (0,_showCommentsCard_js__WEBPACK_IMPORTED_MODULE_2__["default"])(item.title);
      // const appblur = document.querySelector('.app-container');
      // appblur.style.position = 'absolute';
      // appblur.style.backdropFilter = 'blur(15px)';
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
  // console.log(counter)
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
  const response = await fetch('https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/PXvVn75NsImDnwHgqLa4/likes/', {
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
  const response = await fetch('https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/tygJQhOZyexQcPqa69DGCJJLkrrmCAqoVIgUheiO/likes/');
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
      icon.classList.add('fas', 'fa-times');
      closeIcon.appendChild(icon);
      const closeClick = () => {
        commentModel.classList.remove('active');
        // commentModel.innerHTML = '';
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
      //    commentModel.style.display = 'block';
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
___CSS_LOADER_EXPORT___.push([module.id, "* {\r\n  margin: 0;\r\n  padding: 0;\r\n  box-sizing: border-box;\r\n  font-family: 'Poppins', sans-serif;\r\n}\r\n\r\n.app-container {\r\n  width: 100%;\r\n  height: auto;\r\n  margin-left: auto;\r\n  margin-right: auto;\r\n  background-color: rgba(89, 81, 92, 0.726);\r\n  margin-top: 0;\r\n}\r\n\r\n.heading {\r\n  display: flex;\r\n  flex-direction: row;\r\n  justify-content: space-between;\r\n  align-items: center;\r\n  margin: 0 1rem;\r\n  height: 3rem;\r\n  padding: 0.3rem;\r\n}\r\n\r\n.heading .web-title {\r\n  font-size: 3rem;\r\n  padding: 0.5rem;\r\n  font-weight: 900;\r\n  font-family: 'Monoton', cursive;\r\n}\r\n\r\na {\r\n  text-decoration: none;\r\n}\r\n\r\n.heading .navbar ul {\r\n  display: flex;\r\n  flex-direction: row;\r\n  margin-right: 1rem;\r\n}\r\n\r\n.navbar ul li {\r\n  list-style: none;\r\n  margin-right: 1.5rem;\r\n}\r\n\r\n.navbar ul li a:hover {\r\n  background-color: rgb(133, 129, 126);\r\n  border-radius: 0.2rem;\r\n  color: whitesmoke;\r\n}\r\n\r\n/* main section style of the website */\r\n.app-container .content {\r\n  display: flex;\r\n  width: 100%;\r\n  margin-left: auto;\r\n  margin-right: auto;\r\n  background-color: #20262e;\r\n\r\n  /* position: absolute; */\r\n}\r\n\r\n.content section {\r\n  display: flex;\r\n  flex-direction: column;\r\n}\r\n\r\n.title-link {\r\n  text-align: center;\r\n  font-size: 2rem;\r\n  font-style: normal;\r\n  font-weight: 600;\r\n  margin-bottom: 1rem;\r\n  color: whitesmoke;\r\n}\r\n\r\n.content .item-grid {\r\n  display: flex;\r\n  flex-direction: row;\r\n  flex-wrap: wrap;\r\n  width: 100%;\r\n  height: auto;\r\n  background-color: #20262e;\r\n}\r\n\r\n.card {\r\n  display: flex;\r\n  flex-direction: column;\r\n  width: 23rem;\r\n  height: 26rem;\r\n  background-color: #8a929c;\r\n  margin-top: 1rem;\r\n  margin-bottom: 1rem;\r\n  margin-left: 3.5rem;\r\n  padding: 0.4rem;\r\n  border-radius: 0.5rem;\r\n  transition: ease-in-out 0.5s;\r\n\r\n  /* backdrop-filter: blur(10px); */\r\n}\r\n\r\n.card:hover {\r\n  transform: scale(1.08);\r\n  cursor: pointer;\r\n}\r\n\r\n.picture {\r\n  width: 22rem;\r\n  height: 17rem;\r\n  margin-right: 2rem;\r\n}\r\n\r\n.comment-model {\r\n  /* display: flex; */\r\n  flex-direction: column;\r\n  width: 90vw;\r\n  height: 80rem;\r\n  margin-left: 4rem;\r\n  position: absolute;\r\n  z-index: 20;\r\n  top: 25%;\r\n  bottom: 20%;\r\n  display: none;\r\n}\r\n\r\n.comment-card {\r\n  display: flex;\r\n  flex-direction: column;\r\n  padding: 2rem 6rem;\r\n  width: 100%;\r\n  background-color: rgb(226, 236, 233);\r\n  margin-left: 2rem;\r\n  border-radius: 0.4rem;\r\n}\r\n\r\nform {\r\n  display: flex;\r\n  flex-direction: column;\r\n}\r\n\r\n.input {\r\n  width: 20rem;\r\n  height: 3rem;\r\n}\r\n\r\nform button {\r\n  width: 10rem;\r\n  height: 3rem;\r\n}\r\n\r\nfooter {\r\n  text-align: center;\r\n  font-size: 14px;\r\n  height: 4rem;\r\n  padding: 1rem;\r\n  font-style: italic;\r\n}\r\n", "",{"version":3,"sources":["webpack://./src/style.css"],"names":[],"mappings":"AAAA;EACE,SAAS;EACT,UAAU;EACV,sBAAsB;EACtB,kCAAkC;AACpC;;AAEA;EACE,WAAW;EACX,YAAY;EACZ,iBAAiB;EACjB,kBAAkB;EAClB,yCAAyC;EACzC,aAAa;AACf;;AAEA;EACE,aAAa;EACb,mBAAmB;EACnB,8BAA8B;EAC9B,mBAAmB;EACnB,cAAc;EACd,YAAY;EACZ,eAAe;AACjB;;AAEA;EACE,eAAe;EACf,eAAe;EACf,gBAAgB;EAChB,+BAA+B;AACjC;;AAEA;EACE,qBAAqB;AACvB;;AAEA;EACE,aAAa;EACb,mBAAmB;EACnB,kBAAkB;AACpB;;AAEA;EACE,gBAAgB;EAChB,oBAAoB;AACtB;;AAEA;EACE,oCAAoC;EACpC,qBAAqB;EACrB,iBAAiB;AACnB;;AAEA,sCAAsC;AACtC;EACE,aAAa;EACb,WAAW;EACX,iBAAiB;EACjB,kBAAkB;EAClB,yBAAyB;;EAEzB,wBAAwB;AAC1B;;AAEA;EACE,aAAa;EACb,sBAAsB;AACxB;;AAEA;EACE,kBAAkB;EAClB,eAAe;EACf,kBAAkB;EAClB,gBAAgB;EAChB,mBAAmB;EACnB,iBAAiB;AACnB;;AAEA;EACE,aAAa;EACb,mBAAmB;EACnB,eAAe;EACf,WAAW;EACX,YAAY;EACZ,yBAAyB;AAC3B;;AAEA;EACE,aAAa;EACb,sBAAsB;EACtB,YAAY;EACZ,aAAa;EACb,yBAAyB;EACzB,gBAAgB;EAChB,mBAAmB;EACnB,mBAAmB;EACnB,eAAe;EACf,qBAAqB;EACrB,4BAA4B;;EAE5B,iCAAiC;AACnC;;AAEA;EACE,sBAAsB;EACtB,eAAe;AACjB;;AAEA;EACE,YAAY;EACZ,aAAa;EACb,kBAAkB;AACpB;;AAEA;EACE,mBAAmB;EACnB,sBAAsB;EACtB,WAAW;EACX,aAAa;EACb,iBAAiB;EACjB,kBAAkB;EAClB,WAAW;EACX,QAAQ;EACR,WAAW;EACX,aAAa;AACf;;AAEA;EACE,aAAa;EACb,sBAAsB;EACtB,kBAAkB;EAClB,WAAW;EACX,oCAAoC;EACpC,iBAAiB;EACjB,qBAAqB;AACvB;;AAEA;EACE,aAAa;EACb,sBAAsB;AACxB;;AAEA;EACE,YAAY;EACZ,YAAY;AACd;;AAEA;EACE,YAAY;EACZ,YAAY;AACd;;AAEA;EACE,kBAAkB;EAClB,eAAe;EACf,YAAY;EACZ,aAAa;EACb,kBAAkB;AACpB","sourcesContent":["* {\r\n  margin: 0;\r\n  padding: 0;\r\n  box-sizing: border-box;\r\n  font-family: 'Poppins', sans-serif;\r\n}\r\n\r\n.app-container {\r\n  width: 100%;\r\n  height: auto;\r\n  margin-left: auto;\r\n  margin-right: auto;\r\n  background-color: rgba(89, 81, 92, 0.726);\r\n  margin-top: 0;\r\n}\r\n\r\n.heading {\r\n  display: flex;\r\n  flex-direction: row;\r\n  justify-content: space-between;\r\n  align-items: center;\r\n  margin: 0 1rem;\r\n  height: 3rem;\r\n  padding: 0.3rem;\r\n}\r\n\r\n.heading .web-title {\r\n  font-size: 3rem;\r\n  padding: 0.5rem;\r\n  font-weight: 900;\r\n  font-family: 'Monoton', cursive;\r\n}\r\n\r\na {\r\n  text-decoration: none;\r\n}\r\n\r\n.heading .navbar ul {\r\n  display: flex;\r\n  flex-direction: row;\r\n  margin-right: 1rem;\r\n}\r\n\r\n.navbar ul li {\r\n  list-style: none;\r\n  margin-right: 1.5rem;\r\n}\r\n\r\n.navbar ul li a:hover {\r\n  background-color: rgb(133, 129, 126);\r\n  border-radius: 0.2rem;\r\n  color: whitesmoke;\r\n}\r\n\r\n/* main section style of the website */\r\n.app-container .content {\r\n  display: flex;\r\n  width: 100%;\r\n  margin-left: auto;\r\n  margin-right: auto;\r\n  background-color: #20262e;\r\n\r\n  /* position: absolute; */\r\n}\r\n\r\n.content section {\r\n  display: flex;\r\n  flex-direction: column;\r\n}\r\n\r\n.title-link {\r\n  text-align: center;\r\n  font-size: 2rem;\r\n  font-style: normal;\r\n  font-weight: 600;\r\n  margin-bottom: 1rem;\r\n  color: whitesmoke;\r\n}\r\n\r\n.content .item-grid {\r\n  display: flex;\r\n  flex-direction: row;\r\n  flex-wrap: wrap;\r\n  width: 100%;\r\n  height: auto;\r\n  background-color: #20262e;\r\n}\r\n\r\n.card {\r\n  display: flex;\r\n  flex-direction: column;\r\n  width: 23rem;\r\n  height: 26rem;\r\n  background-color: #8a929c;\r\n  margin-top: 1rem;\r\n  margin-bottom: 1rem;\r\n  margin-left: 3.5rem;\r\n  padding: 0.4rem;\r\n  border-radius: 0.5rem;\r\n  transition: ease-in-out 0.5s;\r\n\r\n  /* backdrop-filter: blur(10px); */\r\n}\r\n\r\n.card:hover {\r\n  transform: scale(1.08);\r\n  cursor: pointer;\r\n}\r\n\r\n.picture {\r\n  width: 22rem;\r\n  height: 17rem;\r\n  margin-right: 2rem;\r\n}\r\n\r\n.comment-model {\r\n  /* display: flex; */\r\n  flex-direction: column;\r\n  width: 90vw;\r\n  height: 80rem;\r\n  margin-left: 4rem;\r\n  position: absolute;\r\n  z-index: 20;\r\n  top: 25%;\r\n  bottom: 20%;\r\n  display: none;\r\n}\r\n\r\n.comment-card {\r\n  display: flex;\r\n  flex-direction: column;\r\n  padding: 2rem 6rem;\r\n  width: 100%;\r\n  background-color: rgb(226, 236, 233);\r\n  margin-left: 2rem;\r\n  border-radius: 0.4rem;\r\n}\r\n\r\nform {\r\n  display: flex;\r\n  flex-direction: column;\r\n}\r\n\r\n.input {\r\n  width: 20rem;\r\n  height: 3rem;\r\n}\r\n\r\nform button {\r\n  width: 10rem;\r\n  height: 3rem;\r\n}\r\n\r\nfooter {\r\n  text-align: center;\r\n  font-size: 14px;\r\n  height: 4rem;\r\n  padding: 1rem;\r\n  font-style: italic;\r\n}\r\n"],"sourceRoot":""}]);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7O0FDakNhOztBQUViO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7QUNUYTs7QUFFYjtBQUNBO0FBQ0EsY0FBYyxLQUF3QyxHQUFHLHNCQUFpQixHQUFHLENBQUk7QUFDakY7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7OztBQ1RhOztBQUViO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0RBQWtEO0FBQ2xEO0FBQ0E7QUFDQSwwQ0FBMEM7QUFDMUM7QUFDQTtBQUNBO0FBQ0EsaUZBQWlGO0FBQ2pGO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EseURBQXlEO0FBQ3pEOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQ0FBa0M7QUFDbEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7O0FDNURhOztBQUViO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vamF2YXNjcmlwdGNhcHN0b25lLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovL2phdmFzY3JpcHRjYXBzdG9uZS8uL3NyYy9tb2R1bGVzL0FQSWNvbW1lbnRzLmpzIiwid2VicGFjazovL2phdmFzY3JpcHRjYXBzdG9uZS8uL3NyYy9tb2R1bGVzL0dldFJlcXVlc3QuanMiLCJ3ZWJwYWNrOi8vamF2YXNjcmlwdGNhcHN0b25lLy4vc3JjL21vZHVsZXMvY2FyZHMuanMiLCJ3ZWJwYWNrOi8vamF2YXNjcmlwdGNhcHN0b25lLy4vc3JjL21vZHVsZXMvY29tbWVudHMuanMiLCJ3ZWJwYWNrOi8vamF2YXNjcmlwdGNhcHN0b25lLy4vc3JjL21vZHVsZXMvY291bnRDb21tZW50cy5qcyIsIndlYnBhY2s6Ly9qYXZhc2NyaXB0Y2Fwc3RvbmUvLi9zcmMvbW9kdWxlcy9jb3VudHMuanMiLCJ3ZWJwYWNrOi8vamF2YXNjcmlwdGNhcHN0b25lLy4vc3JjL21vZHVsZXMvaW52b2x2ZW1lbnRBcHAuanMiLCJ3ZWJwYWNrOi8vamF2YXNjcmlwdGNhcHN0b25lLy4vc3JjL21vZHVsZXMvc2hvd0NvbW1lbnRzQ2FyZC5qcyIsIndlYnBhY2s6Ly9qYXZhc2NyaXB0Y2Fwc3RvbmUvLi9zcmMvc3R5bGUuY3NzIiwid2VicGFjazovL2phdmFzY3JpcHRjYXBzdG9uZS8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanMiLCJ3ZWJwYWNrOi8vamF2YXNjcmlwdGNhcHN0b25lLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanMiLCJ3ZWJwYWNrOi8vamF2YXNjcmlwdGNhcHN0b25lLy4vc3JjL3N0eWxlLmNzcz83MTYzIiwid2VicGFjazovL2phdmFzY3JpcHRjYXBzdG9uZS8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qcyIsIndlYnBhY2s6Ly9qYXZhc2NyaXB0Y2Fwc3RvbmUvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzIiwid2VicGFjazovL2phdmFzY3JpcHRjYXBzdG9uZS8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qcyIsIndlYnBhY2s6Ly9qYXZhc2NyaXB0Y2Fwc3RvbmUvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanMiLCJ3ZWJwYWNrOi8vamF2YXNjcmlwdGNhcHN0b25lLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanMiLCJ3ZWJwYWNrOi8vamF2YXNjcmlwdGNhcHN0b25lLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICcuL3N0eWxlLmNzcyc7XG5pbXBvcnQgY3JlYXRlQ2FyZHMgZnJvbSAnLi9tb2R1bGVzL2NhcmRzLmpzJztcbi8vIGltcG9ydCAnLi9zdHlsZXNGb3JDb21tZW50LmNzcyc7XG5cbndpbmRvdy5vbmxvYWQgPSBjcmVhdGVDYXJkcygpOyIsImNvbnN0IGdldENvbW1lbnRzID0gYXN5bmMgKGl0ZW1JZCkgPT4ge1xuICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKGBodHRwczovL3VzLWNlbnRyYWwxLWludm9sdmVtZW50LWFwaS5jbG91ZGZ1bmN0aW9ucy5uZXQvY2Fwc3RvbmVBcGkvYXBwcy9tZmN2NURPU3hjaDV1eXl4ek5Mby9jb21tZW50cz9pdGVtX2lkPSR7aXRlbUlkfWApO1xuICBjb25zdCBkYXRhID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xuICByZXR1cm4gZGF0YTtcbn07XG5cbmNvbnN0IGFkZENvbW1lbnRzID0gYXN5bmMgKHVzZXJuYW1lLCBjb21tZW50LCBpdGVtSUQpID0+IHtcbiAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaCgnaHR0cHM6Ly91cy1jZW50cmFsMS1pbnZvbHZlbWVudC1hcGkuY2xvdWRmdW5jdGlvbnMubmV0L2NhcHN0b25lQXBpL2FwcHMvbWZjdjVET1N4Y2g1dXl5eHpOTG8vY29tbWVudHMnLCB7XG4gICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgYm9keTogSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgaXRlbV9pZDogaXRlbUlELFxuICAgICAgdXNlcm5hbWUsXG4gICAgICBjb21tZW50LFxuICAgIH0pLFxuICAgIGhlYWRlcnM6IHtcbiAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbjsgY2hhcnNldD1VVEYtOCcsXG4gICAgfSxcbiAgfSk7XG4gIHJldHVybiByZXNwb25zZS50ZXh0KCk7XG59O1xuXG5leHBvcnQgeyBnZXRDb21tZW50cywgYWRkQ29tbWVudHMgfTsiLCJjb25zdCBiYXNlVXJsID0gJ2h0dHBzOi8vYXBpLm5hc2EuZ292L3BsYW5ldGFyeS9hcG9kP2FwaV9rZXk9JztcbmNvbnN0IGtleSA9ICd0eWdKUWhPWnlleFFjUHFhNjlER0NKSkxrcnJtQ0Fxb1ZJZ1VoZWlPJztcbmNvbnN0IHN0YXJ0RGF0ZSA9ICcyMDIyLTAyLTIwJztcbmNvbnN0IGVuZERhdGUgPSAnMjAyMi0wNC0wMSc7XG5jb25zdCB1cmwgPSBgJHtiYXNlVXJsfSR7a2V5fSZzdGFydF9kYXRlPSR7c3RhcnREYXRlfSZlbmRfZGF0ZT0ke2VuZERhdGV9YDtcblxuY29uc3QgZ2V0UGljdHVyZXMgPSBhc3luYyAoKSA9PiB7XG4gIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2godXJsKTtcbiAgY29uc3QgYW5zd2VyID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xuICByZXR1cm4gYW5zd2VyO1xufTtcblxuZXhwb3J0IHsgZ2V0UGljdHVyZXMgYXMgZGVmYXVsdCB9OyIsImltcG9ydCBnZXRQaWN0dXJlcyBmcm9tICcuL0dldFJlcXVlc3QuanMnO1xuaW1wb3J0IHsgcG9zdExpa2UsIGdldExpa2VzIH0gZnJvbSAnLi9pbnZvbHZlbWVudEFwcC5qcyc7XG5pbXBvcnQgc2hvd0NvbW1lbnRDYXJkIGZyb20gJy4vc2hvd0NvbW1lbnRzQ2FyZC5qcyc7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgaW1wb3J0L25vLWN5Y2xlXG5pbXBvcnQgY291bnRDYXJkcyBmcm9tICcuL2NvdW50cy5qcyc7XG5cbmNvbnN0IGl0ZW1HcmlkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLml0ZW0tZ3JpZCcpO1xuXG5jb25zdCBjcmVhdGVDYXJkcyA9IGFzeW5jICgpID0+IHtcbiAgY29uc3QgbXlQaWN0dXJlcyA9IGF3YWl0IGdldFBpY3R1cmVzKCk7XG5cbiAgbXlQaWN0dXJlcy5mb3JFYWNoKChpdGVtLCBpKSA9PiB7XG4gICAgY29uc3QgY2FyZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGNhcmQuY2xhc3NMaXN0LmFkZCgnY2FyZCcpO1xuXG4gICAgaWYgKGl0ZW0ubWVkaWFfdHlwZSA9PT0gJ2ltYWdlJykge1xuICAgICAgY29uc3QgbWVkaWEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKTtcbiAgICAgIG1lZGlhLmNsYXNzTGlzdC5hZGQoJ3BpY3R1cmUnKTtcbiAgICAgIG1lZGlhLnNyYyA9IGl0ZW0udXJsO1xuICAgICAgY2FyZC5hcHBlbmRDaGlsZChtZWRpYSk7XG4gICAgICBtZWRpYS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGFzeW5jICgpID0+IHtcbiAgICAgICAgYXdhaXQgc2hvd0NvbW1lbnRDYXJkKGl0ZW0udGl0bGUpO1xuICAgICAgICBjb25zdCBtb2RhbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jb21tZW50LW1vZGVsJyk7XG4gICAgICAgIG1vZGFsLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IG1lZGlhID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaWZyYW1lJyk7XG4gICAgICBtZWRpYS5jbGFzc0xpc3QuYWRkKCd2aWRlbycpO1xuICAgICAgbWVkaWEuc3JjID0gaXRlbS51cmw7XG4gICAgICBjYXJkLmFwcGVuZENoaWxkKG1lZGlhKTtcbiAgICB9XG5cbiAgICBjb25zdCB0aXRsZUNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIHRpdGxlQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ3RpdGxlLWNvbnRhaW5lcicpO1xuXG4gICAgY29uc3QgY2FyZFRpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaDMnKTtcbiAgICBjYXJkVGl0bGUudGV4dENvbnRlbnQgPSBpdGVtLnRpdGxlO1xuICAgIGNhcmRUaXRsZS5jbGFzc0xpc3QuYWRkKCdjYXJkLXRpdGxlJyk7XG5cbiAgICBjb25zdCBjb250ZW50Q29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgY29udGVudENvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCdjb250ZW50LWNvbnRhaW5lcicpO1xuXG4gICAgY29uc3QgbGlrZXNDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBsaWtlc0NvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCdsaWtlcy1jb250YWluZXInKTtcblxuICAgIGNvbnN0IGxvdmUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpJyk7XG4gICAgbG92ZS5jbGFzc0xpc3QuYWRkKCdmYXMnLCAnZmEtaGVhcnQnKTtcbiAgICBsb3ZlLnNldEF0dHJpYnV0ZSgnaW5kZXgnLCBgJHtpfWApO1xuICAgIGxpa2VzQ29udGFpbmVyLmFwcGVuZENoaWxkKGxvdmUpO1xuXG4gICAgY29uc3QgbGlrZXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XG4gICAgbGlrZXMudGV4dENvbnRlbnQgPSAnMCBsaWtlcyc7XG5cbiAgICBjb25zdCBsaWtlTnVtYmVyID0gYXN5bmMgKCkgPT4ge1xuICAgICAgY29uc3QgaXRlbUxpa2VzID0gYXdhaXQgZ2V0TGlrZXMoKTtcbiAgICAgIGl0ZW1MaWtlcy5mb3JFYWNoKChsaWtlKSA9PiB7XG4gICAgICAgIGlmIChsaWtlLml0ZW1faWQgPT09IGBwaWN0dXJlLSR7aX1gKSB7XG4gICAgICAgICAgbGlrZXMudGV4dENvbnRlbnQgPSAnJztcbiAgICAgICAgICBsaWtlcy5jbGFzc0xpc3QuYWRkKCdsaWtlLW51bWJlcicpO1xuICAgICAgICAgIGxpa2VzLnRleHRDb250ZW50ID0gYCR7bGlrZS5saWtlc30gbGlrZXNgO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9O1xuXG4gICAgbG92ZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGFzeW5jICgpID0+IHtcbiAgICAgIGF3YWl0IHBvc3RMaWtlKGBwaWN0dXJlLSR7aX1gKTtcbiAgICAgIGxpa2VOdW1iZXIoKTtcbiAgICB9KTtcblxuICAgIGxpa2VOdW1iZXIoKTtcbiAgICBsaWtlc0NvbnRhaW5lci5hcHBlbmRDaGlsZChsaWtlcyk7XG5cbiAgICBjb25zdCBjb21tZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gICAgY29tbWVudC5jbGFzc0xpc3QuYWRkKCdjb21tZW50LWJ0bicpO1xuICAgIGNvbW1lbnQudHlwZSA9ICdidXR0b24nO1xuICAgIGNvbW1lbnQuc2V0QXR0cmlidXRlKCd0aXRsZScsIGAke2l0ZW0udGl0bGV9YCk7XG4gICAgY29tbWVudC5pbm5lclRleHQgPSAnQ29tbWVudHMnO1xuXG4gICAgY29tbWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGFzeW5jICgpID0+IHtcbiAgICAgIGNvbnN0IG1vZGFsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNvbW1lbnQtbW9kZWwnKTtcbiAgICAgIG1vZGFsLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xuICAgICAgLy8gbW9kYWwuaW5uZXJIVE1MID0gJyc7XG4gICAgICAvLyBtb2RhbC5zdHlsZS5kaXNwbGF5PSAnYmxvY2snO1xuICAgICAgbW9kYWwuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG4gICAgICAvLyBjb25zb2xlLmxvZyhpdGVtLnRpdGxlKTtcbiAgICAgIGF3YWl0IHNob3dDb21tZW50Q2FyZChpdGVtLnRpdGxlKTtcbiAgICAgIC8vIGNvbnN0IGFwcGJsdXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYXBwLWNvbnRhaW5lcicpO1xuICAgICAgLy8gYXBwYmx1ci5zdHlsZS5wb3NpdGlvbiA9ICdhYnNvbHV0ZSc7XG4gICAgICAvLyBhcHBibHVyLnN0eWxlLmJhY2tkcm9wRmlsdGVyID0gJ2JsdXIoMTVweCknO1xuICAgIH0pO1xuXG4gICAgdGl0bGVDb250YWluZXIuYXBwZW5kQ2hpbGQoY2FyZFRpdGxlKTtcbiAgICB0aXRsZUNvbnRhaW5lci5hcHBlbmRDaGlsZChjb250ZW50Q29udGFpbmVyKTtcbiAgICBjb250ZW50Q29udGFpbmVyLmFwcGVuZENoaWxkKGxpa2VzQ29udGFpbmVyKTtcbiAgICBjb250ZW50Q29udGFpbmVyLmFwcGVuZENoaWxkKGNvbW1lbnQpO1xuICAgIGNhcmQuYXBwZW5kQ2hpbGQodGl0bGVDb250YWluZXIpO1xuICAgIGNhcmQuc2V0QXR0cmlidXRlKCdpbmRleCcsIGAke2l9YCk7XG4gICAgaXRlbUdyaWQuYXBwZW5kQ2hpbGQoY2FyZCk7XG4gIH0pO1xuXG4gIGNvbnN0IGNvdW50ZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncGljdHVyZS1jb3VudGVyJyk7XG4gIGlmIChteVBpY3R1cmVzLmxlbmd0aCA9PT0gMCkge1xuICAgIGNvdW50ZXIudGV4dENvbnRlbnQgPSAwO1xuICB9IGVsc2Uge1xuICAgIGNvdW50ZXIudGV4dENvbnRlbnQgPSBjb3VudENhcmRzKCk7XG4gIH1cbiAgLy8gY29uc29sZS5sb2coY291bnRlcilcbn07XG5cbmV4cG9ydCB7IGNyZWF0ZUNhcmRzIGFzIGRlZmF1bHQgfTsiLCJpbXBvcnQgeyBnZXRDb21tZW50cyB9IGZyb20gJy4vQVBJY29tbWVudHMuanMnO1xuXG5jb25zdCBkaXNwbGF5Q29tbWVudHMgPSBhc3luYyAodXNlcklEKSA9PiB7XG4gIGNvbnN0IGNvbW1lbnRzID0gYXdhaXQgZ2V0Q29tbWVudHModXNlcklEKTtcblxuICBpZiAoY29tbWVudHMubGVuZ3RoID09PSB1bmRlZmluZWQpIHtcbiAgICBjb25zdCBjb21tZW50Q291bnRlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jb21tZW50LWNvdW50ZXInKTtcbiAgICBjb21tZW50Q291bnRlci5pbm5lckhUTUwgPSAnKDApJztcbiAgfSBlbHNlIHtcbiAgICBjb21tZW50cy5mb3JFYWNoKChjb21tZW50KSA9PiB7XG4gICAgICBjb25zdCBjb21tZW50Q29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNvbW1lbnQtY29udGFpbmVyJyk7XG5cbiAgICAgIGNvbnN0IGxpID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKTtcbiAgICAgIGxpLmNsYXNzTGlzdC5hZGQoJ3NpbmdsZS1jb21tZW50Jyk7XG4gICAgICBjb25zdCB0aW1lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgICAgdGltZS5jbGFzc0xpc3QuYWRkKCdjb21tZW50LXRpbWUnKTtcbiAgICAgIHRpbWUuaW5uZXJUZXh0ID0gYCR7Y29tbWVudC5jcmVhdGlvbl9kYXRlfSwgYDtcblxuICAgICAgY29uc3QgYXV0aG9yID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgICAgYXV0aG9yLmNsYXNzTGlzdC5hZGQoJ2NvbW1lbnQtYXV0aG9yJyk7XG4gICAgICBhdXRob3IuaW5uZXJUZXh0ID0gYCR7Y29tbWVudC51c2VybmFtZX06IGA7XG5cbiAgICAgIGNvbnN0IG1lc3NhZ2UgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgICBtZXNzYWdlLmNsYXNzTGlzdC5hZGQoJ2NvbW1lbnRNc2cnKTtcbiAgICAgIG1lc3NhZ2UuaW5uZXJUZXh0ID0gY29tbWVudC5jb21tZW50O1xuXG4gICAgICBsaS5hcHBlbmQodGltZSwgYXV0aG9yLCBtZXNzYWdlKTtcbiAgICAgIGNvbW1lbnRDb250YWluZXIuYXBwZW5kQ2hpbGQobGkpO1xuICAgIH0pO1xuICB9XG59O1xuXG5leHBvcnQgeyBkaXNwbGF5Q29tbWVudHMgYXMgZGVmYXVsdCB9OyIsImNvbnN0IGNvdW50Q29tbWVudHMgPSAoKSA9PiB7XG4gIGNvbnN0IGFsbENvbW1lbnRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnNpbmdsZS1jb21tZW50JykubGVuZ3RoO1xuICByZXR1cm4gYWxsQ29tbWVudHM7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBjb3VudENvbW1lbnRzOyIsImNvbnN0IGNvdW50Q2FyZHMgPSAoKSA9PiB7XG4gIGNvbnN0IG15QXJyYXkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuY2FyZCcpO1xuICBjb25zdCBjb3VudCA9IG15QXJyYXkubGVuZ3RoO1xuICByZXR1cm4gY291bnQ7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBjb3VudENhcmRzOyIsImNvbnN0IHBvc3RMaWtlID0gYXN5bmMgKGl0ZW1JZCkgPT4ge1xuICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKCdodHRwczovL3VzLWNlbnRyYWwxLWludm9sdmVtZW50LWFwaS5jbG91ZGZ1bmN0aW9ucy5uZXQvY2Fwc3RvbmVBcGkvYXBwcy9QWHZWbjc1TnNJbURud0hncUxhNC9saWtlcy8nLCB7XG4gICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgYm9keTogSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgaXRlbV9pZDogaXRlbUlkLFxuICAgIH0pLFxuICAgIGhlYWRlcnM6IHtcbiAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbjsgY2hhcnNldD1VVEYtOCcsXG4gICAgfSxcbiAgfSk7XG4gIHJldHVybiByZXNwb25zZS50ZXh0KCk7XG59O1xuXG5jb25zdCBnZXRMaWtlcyA9IGFzeW5jICgpID0+IHtcbiAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaCgnaHR0cHM6Ly91cy1jZW50cmFsMS1pbnZvbHZlbWVudC1hcGkuY2xvdWRmdW5jdGlvbnMubmV0L2NhcHN0b25lQXBpL2FwcHMvdHlnSlFoT1p5ZXhRY1BxYTY5REdDSkpMa3JybUNBcW9WSWdVaGVpTy9saWtlcy8nKTtcbiAgY29uc3QgZGF0YSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcbiAgcmV0dXJuIGRhdGE7XG59O1xuXG5leHBvcnQgeyBwb3N0TGlrZSwgZ2V0TGlrZXMgfTsiLCJpbXBvcnQgZ2V0UGljdHVyZXMgZnJvbSAnLi9HZXRSZXF1ZXN0LmpzJztcbmltcG9ydCBkaXNwbGF5Q29tbWVudHMgZnJvbSAnLi9jb21tZW50cy5qcyc7XG5pbXBvcnQgeyBhZGRDb21tZW50cyB9IGZyb20gJy4vQVBJY29tbWVudHMuanMnO1xuaW1wb3J0IGNvdW50Q29tbWVudHMgZnJvbSAnLi9jb3VudENvbW1lbnRzLmpzJztcblxuY29uc3Qgc2hvd0NvbW1lbnRDYXJkID0gYXN5bmMgKHRpdGxlKSA9PiB7XG4gIGNvbnN0IG15UGljdHVyZXNKc29uID0gYXdhaXQgZ2V0UGljdHVyZXMoKTtcbiAgY29uc3Qgc3RyaW5naWZpZWRKc29uID0gSlNPTi5zdHJpbmdpZnkobXlQaWN0dXJlc0pzb24pO1xuICBjb25zdCBteVBpY3R1cmVzID0gSlNPTi5wYXJzZShzdHJpbmdpZmllZEpzb24pO1xuXG4gIG15UGljdHVyZXMuZm9yRWFjaCgoZWxlbWVudCwgaW5kZXgpID0+IHtcbiAgICBpZiAoZWxlbWVudC50aXRsZSA9PT0gdGl0bGUpIHtcbiAgICAgIGNvbnN0IGNvbW1lbnRNb2RlbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jb21tZW50LW1vZGVsJyk7XG4gICAgICBjb25zdCBjb21tZW50Q2FyZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgY29tbWVudENhcmQuY2xhc3NMaXN0LmFkZCgnY29tbWVudC1jYXJkJyk7XG4gICAgICBjb21tZW50Q2FyZC5zZXRBdHRyaWJ1dGUoJ2luZGV4JywgaW5kZXgpO1xuXG4gICAgICBjb25zdCBjbG9zZUljb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgIGNsb3NlSWNvbi5jbGFzc0xpc3QuYWRkKCdjbG9zZS1pY29uJyk7XG4gICAgICBjb25zdCBpY29uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaScpO1xuICAgICAgaWNvbi5jbGFzc0xpc3QuYWRkKCdmYXMnLCAnZmEtdGltZXMnKTtcbiAgICAgIGNsb3NlSWNvbi5hcHBlbmRDaGlsZChpY29uKTtcblxuICAgICAgY29uc3QgY2xvc2VDbGljayA9ICgpID0+IHtcbiAgICAgICAgY29tbWVudE1vZGVsLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpO1xuICAgICAgICAvLyBjb21tZW50TW9kZWwuaW5uZXJIVE1MID0gJyc7XG4gICAgICAgIGNvbW1lbnRNb2RlbC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgICAgICBjb21tZW50TW9kZWwuaW5uZXJIVE1MID0gJyc7XG4gICAgICB9O1xuXG4gICAgICBjbG9zZUljb24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBjbG9zZUNsaWNrKTtcblxuICAgICAgY29uc3QgbWFpbkRlc2NyaXB0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICBtYWluRGVzY3JpcHRpb24uY2xhc3NMaXN0LmFkZCgnbWFpbi1kZXNjcmlwdGlvbicpO1xuXG4gICAgICBpZiAoZWxlbWVudC5tZWRpYV90eXBlID09PSAnaW1hZ2UnKSB7XG4gICAgICAgIGNvbnN0IG1lZGlhID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJyk7XG4gICAgICAgIG1lZGlhLmNsYXNzTGlzdC5hZGQoJ21lZGlhSW1hZ2UnKTtcbiAgICAgICAgbWVkaWEuc3JjID0gZWxlbWVudC51cmw7XG4gICAgICAgIG1haW5EZXNjcmlwdGlvbi5hcHBlbmRDaGlsZChtZWRpYSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zdCBtZWRpYSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lmcmFtZScpO1xuICAgICAgICBtZWRpYS5jbGFzc0xpc3QuYWRkKCdtZWRpYVZpZGVvJyk7XG4gICAgICAgIG1lZGlhLnNyYyA9IGVsZW1lbnQudXJsO1xuICAgICAgICBtYWluRGVzY3JpcHRpb24uYXBwZW5kQ2hpbGQobWVkaWEpO1xuICAgICAgfVxuICAgICAgY29uc3QgaDEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdoMScpO1xuICAgICAgaDEuY2xhc3NMaXN0LmFkZCgnaW1hZ2UtdGl0bGUnKTtcbiAgICAgIGgxLmlubmVyVGV4dCA9IGVsZW1lbnQudGl0bGU7XG5cbiAgICAgIGNvbnN0IGV4cGxhbmF0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xuICAgICAgZXhwbGFuYXRpb24uY2xhc3NMaXN0LmFkZCgnaW1hZ2UtZXhwbGFuYXRpb24nKTtcbiAgICAgIGV4cGxhbmF0aW9uLmlubmVyVGV4dCA9IGVsZW1lbnQuZXhwbGFuYXRpb247XG5cbiAgICAgIGNvbnN0IGV4dHJhRXhwbGFuYXRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XG4gICAgICBjb25zdCBjb3B5cmlnaHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgICBjb3B5cmlnaHQuY2xhc3NMaXN0LmFkZCgnY29weXJpZ2h0Jyk7XG4gICAgICBjb3B5cmlnaHQuaW5uZXJUZXh0ID0gYEJ5ICR7ZWxlbWVudC5jb3B5cmlnaHQgPz8gJ0Fub255bW91cyd9YDtcblxuICAgICAgY29uc3QgaW1hZ2VEYXRlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgICAgaW1hZ2VEYXRlLmNsYXNzTGlzdC5hZGQoJ2ltYWdlLWRhdGUnKTtcbiAgICAgIGltYWdlRGF0ZS5pbm5lclRleHQgPSBgJHtlbGVtZW50LmRhdGV9YDtcbiAgICAgIGV4dHJhRXhwbGFuYXRpb24uYXBwZW5kKGNvcHlyaWdodCwgaW1hZ2VEYXRlKTtcblxuICAgICAgY29uc3QgaDIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdoMicpO1xuICAgICAgaDIuaW5uZXJUZXh0ID0gJ0NvbW1lbnRzICc7XG4gICAgICBjb25zdCBjb21tZW50Q291bnRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICAgIGNvbW1lbnRDb3VudGVyLmNsYXNzTGlzdC5hZGQoJ2NvbW1lbnQtY291bnRlcicpO1xuXG4gICAgICBoMi5hcHBlbmRDaGlsZChjb21tZW50Q291bnRlcik7XG5cbiAgICAgIGNvbnN0IGNvbW1lbnRDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd1bCcpO1xuICAgICAgY29tbWVudENvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCdjb21tZW50LWNvbnRhaW5lcicpO1xuXG4gICAgICBjb25zdCBjb21tZW50VGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdoMicpO1xuICAgICAgY29tbWVudFRpdGxlLmlubmVyVGV4dCA9ICdBZGQgYSBjb21tZW50JztcblxuICAgICAgY29uc3QgZm9ybSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2Zvcm0nKTtcbiAgICAgIGZvcm0uaW5uZXJIVE1MID0gYFxuICAgICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIHBsYWNlaG9sZGVyPVwiWW91ciBuYW1lXCIgY2xhc3M9XCJuYW1lLWlucHV0IGlucHV0XCIgcmVxdWlyZWQgYXV0b2NvbXBsZXRlPVwib2ZmXCIgLz5cbiAgICAgICAgICA8dGV4dGFyZWEgbmFtZT1cImNvbW1lbnQtaW5wdXRcIiBjbGFzcz1cImNvbW1lbnQtaW5wdXQgaW5wdXRcIiBwbGFjZWhvbGRlcj1cIllvdXIgaW5zaWdodHMuLi5cIiByZXF1aXJlZD48L3RleHRhcmVhPlxuICAgICAgICAgIDxidXR0b24gdHlwZT1cInN1Ym1pdFwiPlN1Ym1pdCBDb21tZW50PC9idXR0b24+XG4gICAgICAgICAgYDtcblxuICAgICAgbWFpbkRlc2NyaXB0aW9uLmFwcGVuZChoMSwgZXhwbGFuYXRpb24sIGV4dHJhRXhwbGFuYXRpb24sIGgyLCBjb21tZW50Q29udGFpbmVyLCBjb21tZW50VGl0bGUsIGZvcm0pOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG1heC1sZW5cbiAgICAgIGNvbW1lbnRDYXJkLmFwcGVuZChjbG9zZUljb24sIG1haW5EZXNjcmlwdGlvbik7XG4gICAgICBjb21tZW50TW9kZWwuYXBwZW5kQ2hpbGQoY29tbWVudENhcmQpO1xuICAgICAgLy8gICAgY29tbWVudE1vZGVsLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuICAgICAgZm9ybS5hZGRFdmVudExpc3RlbmVyKCdzdWJtaXQnLCBhc3luYyAoZXZlbnQpID0+IHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgY29tbWVudENvbnRhaW5lci5pbm5lckhUTUwgPSAnJztcblxuICAgICAgICBjb25zdCB1c2VybmFtZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5uYW1lLWlucHV0JykudmFsdWU7XG4gICAgICAgIGNvbnN0IGNvbW1lbnRNZXNzYWdlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNvbW1lbnQtaW5wdXQnKS52YWx1ZTtcbiAgICAgICAgY29uc3QgdXNlcklEID0gY29tbWVudENhcmQuZ2V0QXR0cmlidXRlKCdpbmRleCcpO1xuXG4gICAgICAgIGF3YWl0IGFkZENvbW1lbnRzKHVzZXJuYW1lLCBjb21tZW50TWVzc2FnZSwgdXNlcklEKTtcbiAgICAgICAgYXdhaXQgZGlzcGxheUNvbW1lbnRzKHVzZXJJRCk7XG5cbiAgICAgICAgZm9ybS5yZXNldCgpO1xuXG4gICAgICAgIGNvbnN0IGNvdW50ZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY29tbWVudC1jb3VudGVyJyk7XG4gICAgICAgIGNvdW50ZXIuaW5uZXJUZXh0ID0gYCgke2NvdW50Q29tbWVudHMoKX0pYDtcbiAgICAgIH0pO1xuICAgIH1cbiAgfSk7XG5cbiAgY29uc3QgY29tbWVudENhcmQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY29tbWVudC1jYXJkJyk7XG4gIGNvbnN0IHVzZXJJRCA9IGNvbW1lbnRDYXJkLmdldEF0dHJpYnV0ZSgnaW5kZXgnKTtcbiAgYXdhaXQgZGlzcGxheUNvbW1lbnRzKHVzZXJJRCk7XG5cbiAgY29uc3QgY29tbWVudENvdW50ZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY29tbWVudC1jb3VudGVyJyk7XG4gIGNvbW1lbnRDb3VudGVyLmlubmVyVGV4dCA9IGAoJHtjb3VudENvbW1lbnRzKCl9KWA7XG59O1xuXG5leHBvcnQgeyBzaG93Q29tbWVudENhcmQgYXMgZGVmYXVsdCB9OyIsIi8vIEltcG9ydHNcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fIGZyb20gXCIuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qc1wiO1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyBmcm9tIFwiLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qc1wiO1xudmFyIF9fX0NTU19MT0FERVJfRVhQT1JUX19fID0gX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18pO1xuLy8gTW9kdWxlXG5fX19DU1NfTE9BREVSX0VYUE9SVF9fXy5wdXNoKFttb2R1bGUuaWQsIFwiKiB7XFxyXFxuICBtYXJnaW46IDA7XFxyXFxuICBwYWRkaW5nOiAwO1xcclxcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcXHJcXG4gIGZvbnQtZmFtaWx5OiAnUG9wcGlucycsIHNhbnMtc2VyaWY7XFxyXFxufVxcclxcblxcclxcbi5hcHAtY29udGFpbmVyIHtcXHJcXG4gIHdpZHRoOiAxMDAlO1xcclxcbiAgaGVpZ2h0OiBhdXRvO1xcclxcbiAgbWFyZ2luLWxlZnQ6IGF1dG87XFxyXFxuICBtYXJnaW4tcmlnaHQ6IGF1dG87XFxyXFxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDg5LCA4MSwgOTIsIDAuNzI2KTtcXHJcXG4gIG1hcmdpbi10b3A6IDA7XFxyXFxufVxcclxcblxcclxcbi5oZWFkaW5nIHtcXHJcXG4gIGRpc3BsYXk6IGZsZXg7XFxyXFxuICBmbGV4LWRpcmVjdGlvbjogcm93O1xcclxcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xcclxcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXHJcXG4gIG1hcmdpbjogMCAxcmVtO1xcclxcbiAgaGVpZ2h0OiAzcmVtO1xcclxcbiAgcGFkZGluZzogMC4zcmVtO1xcclxcbn1cXHJcXG5cXHJcXG4uaGVhZGluZyAud2ViLXRpdGxlIHtcXHJcXG4gIGZvbnQtc2l6ZTogM3JlbTtcXHJcXG4gIHBhZGRpbmc6IDAuNXJlbTtcXHJcXG4gIGZvbnQtd2VpZ2h0OiA5MDA7XFxyXFxuICBmb250LWZhbWlseTogJ01vbm90b24nLCBjdXJzaXZlO1xcclxcbn1cXHJcXG5cXHJcXG5hIHtcXHJcXG4gIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcXHJcXG59XFxyXFxuXFxyXFxuLmhlYWRpbmcgLm5hdmJhciB1bCB7XFxyXFxuICBkaXNwbGF5OiBmbGV4O1xcclxcbiAgZmxleC1kaXJlY3Rpb246IHJvdztcXHJcXG4gIG1hcmdpbi1yaWdodDogMXJlbTtcXHJcXG59XFxyXFxuXFxyXFxuLm5hdmJhciB1bCBsaSB7XFxyXFxuICBsaXN0LXN0eWxlOiBub25lO1xcclxcbiAgbWFyZ2luLXJpZ2h0OiAxLjVyZW07XFxyXFxufVxcclxcblxcclxcbi5uYXZiYXIgdWwgbGkgYTpob3ZlciB7XFxyXFxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMTMzLCAxMjksIDEyNik7XFxyXFxuICBib3JkZXItcmFkaXVzOiAwLjJyZW07XFxyXFxuICBjb2xvcjogd2hpdGVzbW9rZTtcXHJcXG59XFxyXFxuXFxyXFxuLyogbWFpbiBzZWN0aW9uIHN0eWxlIG9mIHRoZSB3ZWJzaXRlICovXFxyXFxuLmFwcC1jb250YWluZXIgLmNvbnRlbnQge1xcclxcbiAgZGlzcGxheTogZmxleDtcXHJcXG4gIHdpZHRoOiAxMDAlO1xcclxcbiAgbWFyZ2luLWxlZnQ6IGF1dG87XFxyXFxuICBtYXJnaW4tcmlnaHQ6IGF1dG87XFxyXFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMjAyNjJlO1xcclxcblxcclxcbiAgLyogcG9zaXRpb246IGFic29sdXRlOyAqL1xcclxcbn1cXHJcXG5cXHJcXG4uY29udGVudCBzZWN0aW9uIHtcXHJcXG4gIGRpc3BsYXk6IGZsZXg7XFxyXFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcclxcbn1cXHJcXG5cXHJcXG4udGl0bGUtbGluayB7XFxyXFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxyXFxuICBmb250LXNpemU6IDJyZW07XFxyXFxuICBmb250LXN0eWxlOiBub3JtYWw7XFxyXFxuICBmb250LXdlaWdodDogNjAwO1xcclxcbiAgbWFyZ2luLWJvdHRvbTogMXJlbTtcXHJcXG4gIGNvbG9yOiB3aGl0ZXNtb2tlO1xcclxcbn1cXHJcXG5cXHJcXG4uY29udGVudCAuaXRlbS1ncmlkIHtcXHJcXG4gIGRpc3BsYXk6IGZsZXg7XFxyXFxuICBmbGV4LWRpcmVjdGlvbjogcm93O1xcclxcbiAgZmxleC13cmFwOiB3cmFwO1xcclxcbiAgd2lkdGg6IDEwMCU7XFxyXFxuICBoZWlnaHQ6IGF1dG87XFxyXFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMjAyNjJlO1xcclxcbn1cXHJcXG5cXHJcXG4uY2FyZCB7XFxyXFxuICBkaXNwbGF5OiBmbGV4O1xcclxcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXHJcXG4gIHdpZHRoOiAyM3JlbTtcXHJcXG4gIGhlaWdodDogMjZyZW07XFxyXFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjOGE5MjljO1xcclxcbiAgbWFyZ2luLXRvcDogMXJlbTtcXHJcXG4gIG1hcmdpbi1ib3R0b206IDFyZW07XFxyXFxuICBtYXJnaW4tbGVmdDogMy41cmVtO1xcclxcbiAgcGFkZGluZzogMC40cmVtO1xcclxcbiAgYm9yZGVyLXJhZGl1czogMC41cmVtO1xcclxcbiAgdHJhbnNpdGlvbjogZWFzZS1pbi1vdXQgMC41cztcXHJcXG5cXHJcXG4gIC8qIGJhY2tkcm9wLWZpbHRlcjogYmx1cigxMHB4KTsgKi9cXHJcXG59XFxyXFxuXFxyXFxuLmNhcmQ6aG92ZXIge1xcclxcbiAgdHJhbnNmb3JtOiBzY2FsZSgxLjA4KTtcXHJcXG4gIGN1cnNvcjogcG9pbnRlcjtcXHJcXG59XFxyXFxuXFxyXFxuLnBpY3R1cmUge1xcclxcbiAgd2lkdGg6IDIycmVtO1xcclxcbiAgaGVpZ2h0OiAxN3JlbTtcXHJcXG4gIG1hcmdpbi1yaWdodDogMnJlbTtcXHJcXG59XFxyXFxuXFxyXFxuLmNvbW1lbnQtbW9kZWwge1xcclxcbiAgLyogZGlzcGxheTogZmxleDsgKi9cXHJcXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxyXFxuICB3aWR0aDogOTB2dztcXHJcXG4gIGhlaWdodDogODByZW07XFxyXFxuICBtYXJnaW4tbGVmdDogNHJlbTtcXHJcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXHJcXG4gIHotaW5kZXg6IDIwO1xcclxcbiAgdG9wOiAyNSU7XFxyXFxuICBib3R0b206IDIwJTtcXHJcXG4gIGRpc3BsYXk6IG5vbmU7XFxyXFxufVxcclxcblxcclxcbi5jb21tZW50LWNhcmQge1xcclxcbiAgZGlzcGxheTogZmxleDtcXHJcXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxyXFxuICBwYWRkaW5nOiAycmVtIDZyZW07XFxyXFxuICB3aWR0aDogMTAwJTtcXHJcXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYigyMjYsIDIzNiwgMjMzKTtcXHJcXG4gIG1hcmdpbi1sZWZ0OiAycmVtO1xcclxcbiAgYm9yZGVyLXJhZGl1czogMC40cmVtO1xcclxcbn1cXHJcXG5cXHJcXG5mb3JtIHtcXHJcXG4gIGRpc3BsYXk6IGZsZXg7XFxyXFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcclxcbn1cXHJcXG5cXHJcXG4uaW5wdXQge1xcclxcbiAgd2lkdGg6IDIwcmVtO1xcclxcbiAgaGVpZ2h0OiAzcmVtO1xcclxcbn1cXHJcXG5cXHJcXG5mb3JtIGJ1dHRvbiB7XFxyXFxuICB3aWR0aDogMTByZW07XFxyXFxuICBoZWlnaHQ6IDNyZW07XFxyXFxufVxcclxcblxcclxcbmZvb3RlciB7XFxyXFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxyXFxuICBmb250LXNpemU6IDE0cHg7XFxyXFxuICBoZWlnaHQ6IDRyZW07XFxyXFxuICBwYWRkaW5nOiAxcmVtO1xcclxcbiAgZm9udC1zdHlsZTogaXRhbGljO1xcclxcbn1cXHJcXG5cIiwgXCJcIix7XCJ2ZXJzaW9uXCI6MyxcInNvdXJjZXNcIjpbXCJ3ZWJwYWNrOi8vLi9zcmMvc3R5bGUuY3NzXCJdLFwibmFtZXNcIjpbXSxcIm1hcHBpbmdzXCI6XCJBQUFBO0VBQ0UsU0FBUztFQUNULFVBQVU7RUFDVixzQkFBc0I7RUFDdEIsa0NBQWtDO0FBQ3BDOztBQUVBO0VBQ0UsV0FBVztFQUNYLFlBQVk7RUFDWixpQkFBaUI7RUFDakIsa0JBQWtCO0VBQ2xCLHlDQUF5QztFQUN6QyxhQUFhO0FBQ2Y7O0FBRUE7RUFDRSxhQUFhO0VBQ2IsbUJBQW1CO0VBQ25CLDhCQUE4QjtFQUM5QixtQkFBbUI7RUFDbkIsY0FBYztFQUNkLFlBQVk7RUFDWixlQUFlO0FBQ2pCOztBQUVBO0VBQ0UsZUFBZTtFQUNmLGVBQWU7RUFDZixnQkFBZ0I7RUFDaEIsK0JBQStCO0FBQ2pDOztBQUVBO0VBQ0UscUJBQXFCO0FBQ3ZCOztBQUVBO0VBQ0UsYUFBYTtFQUNiLG1CQUFtQjtFQUNuQixrQkFBa0I7QUFDcEI7O0FBRUE7RUFDRSxnQkFBZ0I7RUFDaEIsb0JBQW9CO0FBQ3RCOztBQUVBO0VBQ0Usb0NBQW9DO0VBQ3BDLHFCQUFxQjtFQUNyQixpQkFBaUI7QUFDbkI7O0FBRUEsc0NBQXNDO0FBQ3RDO0VBQ0UsYUFBYTtFQUNiLFdBQVc7RUFDWCxpQkFBaUI7RUFDakIsa0JBQWtCO0VBQ2xCLHlCQUF5Qjs7RUFFekIsd0JBQXdCO0FBQzFCOztBQUVBO0VBQ0UsYUFBYTtFQUNiLHNCQUFzQjtBQUN4Qjs7QUFFQTtFQUNFLGtCQUFrQjtFQUNsQixlQUFlO0VBQ2Ysa0JBQWtCO0VBQ2xCLGdCQUFnQjtFQUNoQixtQkFBbUI7RUFDbkIsaUJBQWlCO0FBQ25COztBQUVBO0VBQ0UsYUFBYTtFQUNiLG1CQUFtQjtFQUNuQixlQUFlO0VBQ2YsV0FBVztFQUNYLFlBQVk7RUFDWix5QkFBeUI7QUFDM0I7O0FBRUE7RUFDRSxhQUFhO0VBQ2Isc0JBQXNCO0VBQ3RCLFlBQVk7RUFDWixhQUFhO0VBQ2IseUJBQXlCO0VBQ3pCLGdCQUFnQjtFQUNoQixtQkFBbUI7RUFDbkIsbUJBQW1CO0VBQ25CLGVBQWU7RUFDZixxQkFBcUI7RUFDckIsNEJBQTRCOztFQUU1QixpQ0FBaUM7QUFDbkM7O0FBRUE7RUFDRSxzQkFBc0I7RUFDdEIsZUFBZTtBQUNqQjs7QUFFQTtFQUNFLFlBQVk7RUFDWixhQUFhO0VBQ2Isa0JBQWtCO0FBQ3BCOztBQUVBO0VBQ0UsbUJBQW1CO0VBQ25CLHNCQUFzQjtFQUN0QixXQUFXO0VBQ1gsYUFBYTtFQUNiLGlCQUFpQjtFQUNqQixrQkFBa0I7RUFDbEIsV0FBVztFQUNYLFFBQVE7RUFDUixXQUFXO0VBQ1gsYUFBYTtBQUNmOztBQUVBO0VBQ0UsYUFBYTtFQUNiLHNCQUFzQjtFQUN0QixrQkFBa0I7RUFDbEIsV0FBVztFQUNYLG9DQUFvQztFQUNwQyxpQkFBaUI7RUFDakIscUJBQXFCO0FBQ3ZCOztBQUVBO0VBQ0UsYUFBYTtFQUNiLHNCQUFzQjtBQUN4Qjs7QUFFQTtFQUNFLFlBQVk7RUFDWixZQUFZO0FBQ2Q7O0FBRUE7RUFDRSxZQUFZO0VBQ1osWUFBWTtBQUNkOztBQUVBO0VBQ0Usa0JBQWtCO0VBQ2xCLGVBQWU7RUFDZixZQUFZO0VBQ1osYUFBYTtFQUNiLGtCQUFrQjtBQUNwQlwiLFwic291cmNlc0NvbnRlbnRcIjpbXCIqIHtcXHJcXG4gIG1hcmdpbjogMDtcXHJcXG4gIHBhZGRpbmc6IDA7XFxyXFxuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xcclxcbiAgZm9udC1mYW1pbHk6ICdQb3BwaW5zJywgc2Fucy1zZXJpZjtcXHJcXG59XFxyXFxuXFxyXFxuLmFwcC1jb250YWluZXIge1xcclxcbiAgd2lkdGg6IDEwMCU7XFxyXFxuICBoZWlnaHQ6IGF1dG87XFxyXFxuICBtYXJnaW4tbGVmdDogYXV0bztcXHJcXG4gIG1hcmdpbi1yaWdodDogYXV0bztcXHJcXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYmEoODksIDgxLCA5MiwgMC43MjYpO1xcclxcbiAgbWFyZ2luLXRvcDogMDtcXHJcXG59XFxyXFxuXFxyXFxuLmhlYWRpbmcge1xcclxcbiAgZGlzcGxheTogZmxleDtcXHJcXG4gIGZsZXgtZGlyZWN0aW9uOiByb3c7XFxyXFxuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XFxyXFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcclxcbiAgbWFyZ2luOiAwIDFyZW07XFxyXFxuICBoZWlnaHQ6IDNyZW07XFxyXFxuICBwYWRkaW5nOiAwLjNyZW07XFxyXFxufVxcclxcblxcclxcbi5oZWFkaW5nIC53ZWItdGl0bGUge1xcclxcbiAgZm9udC1zaXplOiAzcmVtO1xcclxcbiAgcGFkZGluZzogMC41cmVtO1xcclxcbiAgZm9udC13ZWlnaHQ6IDkwMDtcXHJcXG4gIGZvbnQtZmFtaWx5OiAnTW9ub3RvbicsIGN1cnNpdmU7XFxyXFxufVxcclxcblxcclxcbmEge1xcclxcbiAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xcclxcbn1cXHJcXG5cXHJcXG4uaGVhZGluZyAubmF2YmFyIHVsIHtcXHJcXG4gIGRpc3BsYXk6IGZsZXg7XFxyXFxuICBmbGV4LWRpcmVjdGlvbjogcm93O1xcclxcbiAgbWFyZ2luLXJpZ2h0OiAxcmVtO1xcclxcbn1cXHJcXG5cXHJcXG4ubmF2YmFyIHVsIGxpIHtcXHJcXG4gIGxpc3Qtc3R5bGU6IG5vbmU7XFxyXFxuICBtYXJnaW4tcmlnaHQ6IDEuNXJlbTtcXHJcXG59XFxyXFxuXFxyXFxuLm5hdmJhciB1bCBsaSBhOmhvdmVyIHtcXHJcXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYigxMzMsIDEyOSwgMTI2KTtcXHJcXG4gIGJvcmRlci1yYWRpdXM6IDAuMnJlbTtcXHJcXG4gIGNvbG9yOiB3aGl0ZXNtb2tlO1xcclxcbn1cXHJcXG5cXHJcXG4vKiBtYWluIHNlY3Rpb24gc3R5bGUgb2YgdGhlIHdlYnNpdGUgKi9cXHJcXG4uYXBwLWNvbnRhaW5lciAuY29udGVudCB7XFxyXFxuICBkaXNwbGF5OiBmbGV4O1xcclxcbiAgd2lkdGg6IDEwMCU7XFxyXFxuICBtYXJnaW4tbGVmdDogYXV0bztcXHJcXG4gIG1hcmdpbi1yaWdodDogYXV0bztcXHJcXG4gIGJhY2tncm91bmQtY29sb3I6ICMyMDI2MmU7XFxyXFxuXFxyXFxuICAvKiBwb3NpdGlvbjogYWJzb2x1dGU7ICovXFxyXFxufVxcclxcblxcclxcbi5jb250ZW50IHNlY3Rpb24ge1xcclxcbiAgZGlzcGxheTogZmxleDtcXHJcXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxyXFxufVxcclxcblxcclxcbi50aXRsZS1saW5rIHtcXHJcXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcXHJcXG4gIGZvbnQtc2l6ZTogMnJlbTtcXHJcXG4gIGZvbnQtc3R5bGU6IG5vcm1hbDtcXHJcXG4gIGZvbnQtd2VpZ2h0OiA2MDA7XFxyXFxuICBtYXJnaW4tYm90dG9tOiAxcmVtO1xcclxcbiAgY29sb3I6IHdoaXRlc21va2U7XFxyXFxufVxcclxcblxcclxcbi5jb250ZW50IC5pdGVtLWdyaWQge1xcclxcbiAgZGlzcGxheTogZmxleDtcXHJcXG4gIGZsZXgtZGlyZWN0aW9uOiByb3c7XFxyXFxuICBmbGV4LXdyYXA6IHdyYXA7XFxyXFxuICB3aWR0aDogMTAwJTtcXHJcXG4gIGhlaWdodDogYXV0bztcXHJcXG4gIGJhY2tncm91bmQtY29sb3I6ICMyMDI2MmU7XFxyXFxufVxcclxcblxcclxcbi5jYXJkIHtcXHJcXG4gIGRpc3BsYXk6IGZsZXg7XFxyXFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcclxcbiAgd2lkdGg6IDIzcmVtO1xcclxcbiAgaGVpZ2h0OiAyNnJlbTtcXHJcXG4gIGJhY2tncm91bmQtY29sb3I6ICM4YTkyOWM7XFxyXFxuICBtYXJnaW4tdG9wOiAxcmVtO1xcclxcbiAgbWFyZ2luLWJvdHRvbTogMXJlbTtcXHJcXG4gIG1hcmdpbi1sZWZ0OiAzLjVyZW07XFxyXFxuICBwYWRkaW5nOiAwLjRyZW07XFxyXFxuICBib3JkZXItcmFkaXVzOiAwLjVyZW07XFxyXFxuICB0cmFuc2l0aW9uOiBlYXNlLWluLW91dCAwLjVzO1xcclxcblxcclxcbiAgLyogYmFja2Ryb3AtZmlsdGVyOiBibHVyKDEwcHgpOyAqL1xcclxcbn1cXHJcXG5cXHJcXG4uY2FyZDpob3ZlciB7XFxyXFxuICB0cmFuc2Zvcm06IHNjYWxlKDEuMDgpO1xcclxcbiAgY3Vyc29yOiBwb2ludGVyO1xcclxcbn1cXHJcXG5cXHJcXG4ucGljdHVyZSB7XFxyXFxuICB3aWR0aDogMjJyZW07XFxyXFxuICBoZWlnaHQ6IDE3cmVtO1xcclxcbiAgbWFyZ2luLXJpZ2h0OiAycmVtO1xcclxcbn1cXHJcXG5cXHJcXG4uY29tbWVudC1tb2RlbCB7XFxyXFxuICAvKiBkaXNwbGF5OiBmbGV4OyAqL1xcclxcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXHJcXG4gIHdpZHRoOiA5MHZ3O1xcclxcbiAgaGVpZ2h0OiA4MHJlbTtcXHJcXG4gIG1hcmdpbi1sZWZ0OiA0cmVtO1xcclxcbiAgcG9zaXRpb246IGFic29sdXRlO1xcclxcbiAgei1pbmRleDogMjA7XFxyXFxuICB0b3A6IDI1JTtcXHJcXG4gIGJvdHRvbTogMjAlO1xcclxcbiAgZGlzcGxheTogbm9uZTtcXHJcXG59XFxyXFxuXFxyXFxuLmNvbW1lbnQtY2FyZCB7XFxyXFxuICBkaXNwbGF5OiBmbGV4O1xcclxcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXHJcXG4gIHBhZGRpbmc6IDJyZW0gNnJlbTtcXHJcXG4gIHdpZHRoOiAxMDAlO1xcclxcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDIyNiwgMjM2LCAyMzMpO1xcclxcbiAgbWFyZ2luLWxlZnQ6IDJyZW07XFxyXFxuICBib3JkZXItcmFkaXVzOiAwLjRyZW07XFxyXFxufVxcclxcblxcclxcbmZvcm0ge1xcclxcbiAgZGlzcGxheTogZmxleDtcXHJcXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxyXFxufVxcclxcblxcclxcbi5pbnB1dCB7XFxyXFxuICB3aWR0aDogMjByZW07XFxyXFxuICBoZWlnaHQ6IDNyZW07XFxyXFxufVxcclxcblxcclxcbmZvcm0gYnV0dG9uIHtcXHJcXG4gIHdpZHRoOiAxMHJlbTtcXHJcXG4gIGhlaWdodDogM3JlbTtcXHJcXG59XFxyXFxuXFxyXFxuZm9vdGVyIHtcXHJcXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcXHJcXG4gIGZvbnQtc2l6ZTogMTRweDtcXHJcXG4gIGhlaWdodDogNHJlbTtcXHJcXG4gIHBhZGRpbmc6IDFyZW07XFxyXFxuICBmb250LXN0eWxlOiBpdGFsaWM7XFxyXFxufVxcclxcblwiXSxcInNvdXJjZVJvb3RcIjpcIlwifV0pO1xuLy8gRXhwb3J0c1xuZXhwb3J0IGRlZmF1bHQgX19fQ1NTX0xPQURFUl9FWFBPUlRfX187XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuLypcbiAgTUlUIExpY2Vuc2UgaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcbiAgQXV0aG9yIFRvYmlhcyBLb3BwZXJzIEBzb2tyYVxuKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcpIHtcbiAgdmFyIGxpc3QgPSBbXTtcblxuICAvLyByZXR1cm4gdGhlIGxpc3Qgb2YgbW9kdWxlcyBhcyBjc3Mgc3RyaW5nXG4gIGxpc3QudG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZygpIHtcbiAgICByZXR1cm4gdGhpcy5tYXAoZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgIHZhciBjb250ZW50ID0gXCJcIjtcbiAgICAgIHZhciBuZWVkTGF5ZXIgPSB0eXBlb2YgaXRlbVs1XSAhPT0gXCJ1bmRlZmluZWRcIjtcbiAgICAgIGlmIChpdGVtWzRdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChpdGVtWzRdLCBcIikge1wiKTtcbiAgICAgIH1cbiAgICAgIGlmIChpdGVtWzJdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAbWVkaWEgXCIuY29uY2F0KGl0ZW1bMl0sIFwiIHtcIik7XG4gICAgICB9XG4gICAgICBpZiAobmVlZExheWVyKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAbGF5ZXJcIi5jb25jYXQoaXRlbVs1XS5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KGl0ZW1bNV0pIDogXCJcIiwgXCIge1wiKTtcbiAgICAgIH1cbiAgICAgIGNvbnRlbnQgKz0gY3NzV2l0aE1hcHBpbmdUb1N0cmluZyhpdGVtKTtcbiAgICAgIGlmIChuZWVkTGF5ZXIpIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cbiAgICAgIGlmIChpdGVtWzJdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG4gICAgICBpZiAoaXRlbVs0XSkge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGNvbnRlbnQ7XG4gICAgfSkuam9pbihcIlwiKTtcbiAgfTtcblxuICAvLyBpbXBvcnQgYSBsaXN0IG9mIG1vZHVsZXMgaW50byB0aGUgbGlzdFxuICBsaXN0LmkgPSBmdW5jdGlvbiBpKG1vZHVsZXMsIG1lZGlhLCBkZWR1cGUsIHN1cHBvcnRzLCBsYXllcikge1xuICAgIGlmICh0eXBlb2YgbW9kdWxlcyA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgbW9kdWxlcyA9IFtbbnVsbCwgbW9kdWxlcywgdW5kZWZpbmVkXV07XG4gICAgfVxuICAgIHZhciBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzID0ge307XG4gICAgaWYgKGRlZHVwZSkge1xuICAgICAgZm9yICh2YXIgayA9IDA7IGsgPCB0aGlzLmxlbmd0aDsgaysrKSB7XG4gICAgICAgIHZhciBpZCA9IHRoaXNba11bMF07XG4gICAgICAgIGlmIChpZCAhPSBudWxsKSB7XG4gICAgICAgICAgYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpZF0gPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGZvciAodmFyIF9rID0gMDsgX2sgPCBtb2R1bGVzLmxlbmd0aDsgX2srKykge1xuICAgICAgdmFyIGl0ZW0gPSBbXS5jb25jYXQobW9kdWxlc1tfa10pO1xuICAgICAgaWYgKGRlZHVwZSAmJiBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2l0ZW1bMF1dKSB7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuICAgICAgaWYgKHR5cGVvZiBsYXllciAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICBpZiAodHlwZW9mIGl0ZW1bNV0gPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgICBpdGVtWzVdID0gbGF5ZXI7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQGxheWVyXCIuY29uY2F0KGl0ZW1bNV0ubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChpdGVtWzVdKSA6IFwiXCIsIFwiIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzVdID0gbGF5ZXI7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChtZWRpYSkge1xuICAgICAgICBpZiAoIWl0ZW1bMl0pIHtcbiAgICAgICAgICBpdGVtWzJdID0gbWVkaWE7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQG1lZGlhIFwiLmNvbmNhdChpdGVtWzJdLCBcIiB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVsyXSA9IG1lZGlhO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAoc3VwcG9ydHMpIHtcbiAgICAgICAgaWYgKCFpdGVtWzRdKSB7XG4gICAgICAgICAgaXRlbVs0XSA9IFwiXCIuY29uY2F0KHN1cHBvcnRzKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChpdGVtWzRdLCBcIikge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bNF0gPSBzdXBwb3J0cztcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgbGlzdC5wdXNoKGl0ZW0pO1xuICAgIH1cbiAgfTtcbiAgcmV0dXJuIGxpc3Q7XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdGVtKSB7XG4gIHZhciBjb250ZW50ID0gaXRlbVsxXTtcbiAgdmFyIGNzc01hcHBpbmcgPSBpdGVtWzNdO1xuICBpZiAoIWNzc01hcHBpbmcpIHtcbiAgICByZXR1cm4gY29udGVudDtcbiAgfVxuICBpZiAodHlwZW9mIGJ0b2EgPT09IFwiZnVuY3Rpb25cIikge1xuICAgIHZhciBiYXNlNjQgPSBidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShjc3NNYXBwaW5nKSkpKTtcbiAgICB2YXIgZGF0YSA9IFwic291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtODtiYXNlNjQsXCIuY29uY2F0KGJhc2U2NCk7XG4gICAgdmFyIHNvdXJjZU1hcHBpbmcgPSBcIi8qIyBcIi5jb25jYXQoZGF0YSwgXCIgKi9cIik7XG4gICAgcmV0dXJuIFtjb250ZW50XS5jb25jYXQoW3NvdXJjZU1hcHBpbmddKS5qb2luKFwiXFxuXCIpO1xuICB9XG4gIHJldHVybiBbY29udGVudF0uam9pbihcIlxcblwiKTtcbn07IiwiXG4gICAgICBpbXBvcnQgQVBJIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzXCI7XG4gICAgICBpbXBvcnQgZG9tQVBJIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRGbiBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanNcIjtcbiAgICAgIGltcG9ydCBzZXRBdHRyaWJ1dGVzIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0U3R5bGVFbGVtZW50IGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzXCI7XG4gICAgICBpbXBvcnQgc3R5bGVUYWdUcmFuc2Zvcm1GbiBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzXCI7XG4gICAgICBpbXBvcnQgY29udGVudCwgKiBhcyBuYW1lZEV4cG9ydCBmcm9tIFwiISEuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL3N0eWxlLmNzc1wiO1xuICAgICAgXG4gICAgICBcblxudmFyIG9wdGlvbnMgPSB7fTtcblxub3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybSA9IHN0eWxlVGFnVHJhbnNmb3JtRm47XG5vcHRpb25zLnNldEF0dHJpYnV0ZXMgPSBzZXRBdHRyaWJ1dGVzO1xuXG4gICAgICBvcHRpb25zLmluc2VydCA9IGluc2VydEZuLmJpbmQobnVsbCwgXCJoZWFkXCIpO1xuICAgIFxub3B0aW9ucy5kb21BUEkgPSBkb21BUEk7XG5vcHRpb25zLmluc2VydFN0eWxlRWxlbWVudCA9IGluc2VydFN0eWxlRWxlbWVudDtcblxudmFyIHVwZGF0ZSA9IEFQSShjb250ZW50LCBvcHRpb25zKTtcblxuXG5cbmV4cG9ydCAqIGZyb20gXCIhIS4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vc3R5bGUuY3NzXCI7XG4gICAgICAgZXhwb3J0IGRlZmF1bHQgY29udGVudCAmJiBjb250ZW50LmxvY2FscyA/IGNvbnRlbnQubG9jYWxzIDogdW5kZWZpbmVkO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBzdHlsZXNJbkRPTSA9IFtdO1xuZnVuY3Rpb24gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcikge1xuICB2YXIgcmVzdWx0ID0gLTE7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgc3R5bGVzSW5ET00ubGVuZ3RoOyBpKyspIHtcbiAgICBpZiAoc3R5bGVzSW5ET01baV0uaWRlbnRpZmllciA9PT0gaWRlbnRpZmllcikge1xuICAgICAgcmVzdWx0ID0gaTtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuZnVuY3Rpb24gbW9kdWxlc1RvRG9tKGxpc3QsIG9wdGlvbnMpIHtcbiAgdmFyIGlkQ291bnRNYXAgPSB7fTtcbiAgdmFyIGlkZW50aWZpZXJzID0gW107XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7IGkrKykge1xuICAgIHZhciBpdGVtID0gbGlzdFtpXTtcbiAgICB2YXIgaWQgPSBvcHRpb25zLmJhc2UgPyBpdGVtWzBdICsgb3B0aW9ucy5iYXNlIDogaXRlbVswXTtcbiAgICB2YXIgY291bnQgPSBpZENvdW50TWFwW2lkXSB8fCAwO1xuICAgIHZhciBpZGVudGlmaWVyID0gXCJcIi5jb25jYXQoaWQsIFwiIFwiKS5jb25jYXQoY291bnQpO1xuICAgIGlkQ291bnRNYXBbaWRdID0gY291bnQgKyAxO1xuICAgIHZhciBpbmRleEJ5SWRlbnRpZmllciA9IGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpO1xuICAgIHZhciBvYmogPSB7XG4gICAgICBjc3M6IGl0ZW1bMV0sXG4gICAgICBtZWRpYTogaXRlbVsyXSxcbiAgICAgIHNvdXJjZU1hcDogaXRlbVszXSxcbiAgICAgIHN1cHBvcnRzOiBpdGVtWzRdLFxuICAgICAgbGF5ZXI6IGl0ZW1bNV1cbiAgICB9O1xuICAgIGlmIChpbmRleEJ5SWRlbnRpZmllciAhPT0gLTEpIHtcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4QnlJZGVudGlmaWVyXS5yZWZlcmVuY2VzKys7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleEJ5SWRlbnRpZmllcl0udXBkYXRlcihvYmopO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgdXBkYXRlciA9IGFkZEVsZW1lbnRTdHlsZShvYmosIG9wdGlvbnMpO1xuICAgICAgb3B0aW9ucy5ieUluZGV4ID0gaTtcbiAgICAgIHN0eWxlc0luRE9NLnNwbGljZShpLCAwLCB7XG4gICAgICAgIGlkZW50aWZpZXI6IGlkZW50aWZpZXIsXG4gICAgICAgIHVwZGF0ZXI6IHVwZGF0ZXIsXG4gICAgICAgIHJlZmVyZW5jZXM6IDFcbiAgICAgIH0pO1xuICAgIH1cbiAgICBpZGVudGlmaWVycy5wdXNoKGlkZW50aWZpZXIpO1xuICB9XG4gIHJldHVybiBpZGVudGlmaWVycztcbn1cbmZ1bmN0aW9uIGFkZEVsZW1lbnRTdHlsZShvYmosIG9wdGlvbnMpIHtcbiAgdmFyIGFwaSA9IG9wdGlvbnMuZG9tQVBJKG9wdGlvbnMpO1xuICBhcGkudXBkYXRlKG9iaik7XG4gIHZhciB1cGRhdGVyID0gZnVuY3Rpb24gdXBkYXRlcihuZXdPYmopIHtcbiAgICBpZiAobmV3T2JqKSB7XG4gICAgICBpZiAobmV3T2JqLmNzcyA9PT0gb2JqLmNzcyAmJiBuZXdPYmoubWVkaWEgPT09IG9iai5tZWRpYSAmJiBuZXdPYmouc291cmNlTWFwID09PSBvYmouc291cmNlTWFwICYmIG5ld09iai5zdXBwb3J0cyA9PT0gb2JqLnN1cHBvcnRzICYmIG5ld09iai5sYXllciA9PT0gb2JqLmxheWVyKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGFwaS51cGRhdGUob2JqID0gbmV3T2JqKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYXBpLnJlbW92ZSgpO1xuICAgIH1cbiAgfTtcbiAgcmV0dXJuIHVwZGF0ZXI7XG59XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChsaXN0LCBvcHRpb25zKSB7XG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICBsaXN0ID0gbGlzdCB8fCBbXTtcbiAgdmFyIGxhc3RJZGVudGlmaWVycyA9IG1vZHVsZXNUb0RvbShsaXN0LCBvcHRpb25zKTtcbiAgcmV0dXJuIGZ1bmN0aW9uIHVwZGF0ZShuZXdMaXN0KSB7XG4gICAgbmV3TGlzdCA9IG5ld0xpc3QgfHwgW107XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsYXN0SWRlbnRpZmllcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBpZGVudGlmaWVyID0gbGFzdElkZW50aWZpZXJzW2ldO1xuICAgICAgdmFyIGluZGV4ID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcik7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleF0ucmVmZXJlbmNlcy0tO1xuICAgIH1cbiAgICB2YXIgbmV3TGFzdElkZW50aWZpZXJzID0gbW9kdWxlc1RvRG9tKG5ld0xpc3QsIG9wdGlvbnMpO1xuICAgIGZvciAodmFyIF9pID0gMDsgX2kgPCBsYXN0SWRlbnRpZmllcnMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICB2YXIgX2lkZW50aWZpZXIgPSBsYXN0SWRlbnRpZmllcnNbX2ldO1xuICAgICAgdmFyIF9pbmRleCA9IGdldEluZGV4QnlJZGVudGlmaWVyKF9pZGVudGlmaWVyKTtcbiAgICAgIGlmIChzdHlsZXNJbkRPTVtfaW5kZXhdLnJlZmVyZW5jZXMgPT09IDApIHtcbiAgICAgICAgc3R5bGVzSW5ET01bX2luZGV4XS51cGRhdGVyKCk7XG4gICAgICAgIHN0eWxlc0luRE9NLnNwbGljZShfaW5kZXgsIDEpO1xuICAgICAgfVxuICAgIH1cbiAgICBsYXN0SWRlbnRpZmllcnMgPSBuZXdMYXN0SWRlbnRpZmllcnM7XG4gIH07XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgbWVtbyA9IHt9O1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGdldFRhcmdldCh0YXJnZXQpIHtcbiAgaWYgKHR5cGVvZiBtZW1vW3RhcmdldF0gPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICB2YXIgc3R5bGVUYXJnZXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRhcmdldCk7XG5cbiAgICAvLyBTcGVjaWFsIGNhc2UgdG8gcmV0dXJuIGhlYWQgb2YgaWZyYW1lIGluc3RlYWQgb2YgaWZyYW1lIGl0c2VsZlxuICAgIGlmICh3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQgJiYgc3R5bGVUYXJnZXQgaW5zdGFuY2VvZiB3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIC8vIFRoaXMgd2lsbCB0aHJvdyBhbiBleGNlcHRpb24gaWYgYWNjZXNzIHRvIGlmcmFtZSBpcyBibG9ja2VkXG4gICAgICAgIC8vIGR1ZSB0byBjcm9zcy1vcmlnaW4gcmVzdHJpY3Rpb25zXG4gICAgICAgIHN0eWxlVGFyZ2V0ID0gc3R5bGVUYXJnZXQuY29udGVudERvY3VtZW50LmhlYWQ7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIC8vIGlzdGFuYnVsIGlnbm9yZSBuZXh0XG4gICAgICAgIHN0eWxlVGFyZ2V0ID0gbnVsbDtcbiAgICAgIH1cbiAgICB9XG4gICAgbWVtb1t0YXJnZXRdID0gc3R5bGVUYXJnZXQ7XG4gIH1cbiAgcmV0dXJuIG1lbW9bdGFyZ2V0XTtcbn1cblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBpbnNlcnRCeVNlbGVjdG9yKGluc2VydCwgc3R5bGUpIHtcbiAgdmFyIHRhcmdldCA9IGdldFRhcmdldChpbnNlcnQpO1xuICBpZiAoIXRhcmdldCkge1xuICAgIHRocm93IG5ldyBFcnJvcihcIkNvdWxkbid0IGZpbmQgYSBzdHlsZSB0YXJnZXQuIFRoaXMgcHJvYmFibHkgbWVhbnMgdGhhdCB0aGUgdmFsdWUgZm9yIHRoZSAnaW5zZXJ0JyBwYXJhbWV0ZXIgaXMgaW52YWxpZC5cIik7XG4gIH1cbiAgdGFyZ2V0LmFwcGVuZENoaWxkKHN0eWxlKTtcbn1cbm1vZHVsZS5leHBvcnRzID0gaW5zZXJ0QnlTZWxlY3RvcjsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBpbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucykge1xuICB2YXIgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzdHlsZVwiKTtcbiAgb3B0aW9ucy5zZXRBdHRyaWJ1dGVzKGVsZW1lbnQsIG9wdGlvbnMuYXR0cmlidXRlcyk7XG4gIG9wdGlvbnMuaW5zZXJ0KGVsZW1lbnQsIG9wdGlvbnMub3B0aW9ucyk7XG4gIHJldHVybiBlbGVtZW50O1xufVxubW9kdWxlLmV4cG9ydHMgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzKHN0eWxlRWxlbWVudCkge1xuICB2YXIgbm9uY2UgPSB0eXBlb2YgX193ZWJwYWNrX25vbmNlX18gIT09IFwidW5kZWZpbmVkXCIgPyBfX3dlYnBhY2tfbm9uY2VfXyA6IG51bGw7XG4gIGlmIChub25jZSkge1xuICAgIHN0eWxlRWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJub25jZVwiLCBub25jZSk7XG4gIH1cbn1cbm1vZHVsZS5leHBvcnRzID0gc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGFwcGx5KHN0eWxlRWxlbWVudCwgb3B0aW9ucywgb2JqKSB7XG4gIHZhciBjc3MgPSBcIlwiO1xuICBpZiAob2JqLnN1cHBvcnRzKSB7XG4gICAgY3NzICs9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQob2JqLnN1cHBvcnRzLCBcIikge1wiKTtcbiAgfVxuICBpZiAob2JqLm1lZGlhKSB7XG4gICAgY3NzICs9IFwiQG1lZGlhIFwiLmNvbmNhdChvYmoubWVkaWEsIFwiIHtcIik7XG4gIH1cbiAgdmFyIG5lZWRMYXllciA9IHR5cGVvZiBvYmoubGF5ZXIgIT09IFwidW5kZWZpbmVkXCI7XG4gIGlmIChuZWVkTGF5ZXIpIHtcbiAgICBjc3MgKz0gXCJAbGF5ZXJcIi5jb25jYXQob2JqLmxheWVyLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQob2JqLmxheWVyKSA6IFwiXCIsIFwiIHtcIik7XG4gIH1cbiAgY3NzICs9IG9iai5jc3M7XG4gIGlmIChuZWVkTGF5ZXIpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cbiAgaWYgKG9iai5tZWRpYSkge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuICBpZiAob2JqLnN1cHBvcnRzKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG4gIHZhciBzb3VyY2VNYXAgPSBvYmouc291cmNlTWFwO1xuICBpZiAoc291cmNlTWFwICYmIHR5cGVvZiBidG9hICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgY3NzICs9IFwiXFxuLyojIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxcIi5jb25jYXQoYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoc291cmNlTWFwKSkpKSwgXCIgKi9cIik7XG4gIH1cblxuICAvLyBGb3Igb2xkIElFXG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAgKi9cbiAgb3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybShjc3MsIHN0eWxlRWxlbWVudCwgb3B0aW9ucy5vcHRpb25zKTtcbn1cbmZ1bmN0aW9uIHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpIHtcbiAgLy8gaXN0YW5idWwgaWdub3JlIGlmXG4gIGlmIChzdHlsZUVsZW1lbnQucGFyZW50Tm9kZSA9PT0gbnVsbCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICBzdHlsZUVsZW1lbnQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQpO1xufVxuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGRvbUFQSShvcHRpb25zKSB7XG4gIGlmICh0eXBlb2YgZG9jdW1lbnQgPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICByZXR1cm4ge1xuICAgICAgdXBkYXRlOiBmdW5jdGlvbiB1cGRhdGUoKSB7fSxcbiAgICAgIHJlbW92ZTogZnVuY3Rpb24gcmVtb3ZlKCkge31cbiAgICB9O1xuICB9XG4gIHZhciBzdHlsZUVsZW1lbnQgPSBvcHRpb25zLmluc2VydFN0eWxlRWxlbWVudChvcHRpb25zKTtcbiAgcmV0dXJuIHtcbiAgICB1cGRhdGU6IGZ1bmN0aW9uIHVwZGF0ZShvYmopIHtcbiAgICAgIGFwcGx5KHN0eWxlRWxlbWVudCwgb3B0aW9ucywgb2JqKTtcbiAgICB9LFxuICAgIHJlbW92ZTogZnVuY3Rpb24gcmVtb3ZlKCkge1xuICAgICAgcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCk7XG4gICAgfVxuICB9O1xufVxubW9kdWxlLmV4cG9ydHMgPSBkb21BUEk7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gc3R5bGVUYWdUcmFuc2Zvcm0oY3NzLCBzdHlsZUVsZW1lbnQpIHtcbiAgaWYgKHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0KSB7XG4gICAgc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQuY3NzVGV4dCA9IGNzcztcbiAgfSBlbHNlIHtcbiAgICB3aGlsZSAoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpIHtcbiAgICAgIHN0eWxlRWxlbWVudC5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCk7XG4gICAgfVxuICAgIHN0eWxlRWxlbWVudC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjc3MpKTtcbiAgfVxufVxubW9kdWxlLmV4cG9ydHMgPSBzdHlsZVRhZ1RyYW5zZm9ybTsiXSwibmFtZXMiOlsiY3JlYXRlQ2FyZHMiLCJ3aW5kb3ciLCJvbmxvYWQiLCJnZXRDb21tZW50cyIsIml0ZW1JZCIsInJlc3BvbnNlIiwiZmV0Y2giLCJkYXRhIiwianNvbiIsImFkZENvbW1lbnRzIiwidXNlcm5hbWUiLCJjb21tZW50IiwiaXRlbUlEIiwibWV0aG9kIiwiYm9keSIsIkpTT04iLCJzdHJpbmdpZnkiLCJpdGVtX2lkIiwiaGVhZGVycyIsInRleHQiLCJiYXNlVXJsIiwia2V5Iiwic3RhcnREYXRlIiwiZW5kRGF0ZSIsInVybCIsImdldFBpY3R1cmVzIiwiYW5zd2VyIiwiZGVmYXVsdCIsInBvc3RMaWtlIiwiZ2V0TGlrZXMiLCJzaG93Q29tbWVudENhcmQiLCJjb3VudENhcmRzIiwiaXRlbUdyaWQiLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3IiLCJteVBpY3R1cmVzIiwiZm9yRWFjaCIsIml0ZW0iLCJpIiwiY2FyZCIsImNyZWF0ZUVsZW1lbnQiLCJjbGFzc0xpc3QiLCJhZGQiLCJtZWRpYV90eXBlIiwibWVkaWEiLCJzcmMiLCJhcHBlbmRDaGlsZCIsImFkZEV2ZW50TGlzdGVuZXIiLCJ0aXRsZSIsIm1vZGFsIiwidGl0bGVDb250YWluZXIiLCJjYXJkVGl0bGUiLCJ0ZXh0Q29udGVudCIsImNvbnRlbnRDb250YWluZXIiLCJsaWtlc0NvbnRhaW5lciIsImxvdmUiLCJzZXRBdHRyaWJ1dGUiLCJsaWtlcyIsImxpa2VOdW1iZXIiLCJpdGVtTGlrZXMiLCJsaWtlIiwidHlwZSIsImlubmVyVGV4dCIsInN0eWxlIiwiZGlzcGxheSIsImNvdW50ZXIiLCJnZXRFbGVtZW50QnlJZCIsImxlbmd0aCIsImRpc3BsYXlDb21tZW50cyIsInVzZXJJRCIsImNvbW1lbnRzIiwidW5kZWZpbmVkIiwiY29tbWVudENvdW50ZXIiLCJpbm5lckhUTUwiLCJjb21tZW50Q29udGFpbmVyIiwibGkiLCJ0aW1lIiwiY3JlYXRpb25fZGF0ZSIsImF1dGhvciIsIm1lc3NhZ2UiLCJhcHBlbmQiLCJjb3VudENvbW1lbnRzIiwiYWxsQ29tbWVudHMiLCJxdWVyeVNlbGVjdG9yQWxsIiwibXlBcnJheSIsImNvdW50IiwibXlQaWN0dXJlc0pzb24iLCJzdHJpbmdpZmllZEpzb24iLCJwYXJzZSIsImVsZW1lbnQiLCJpbmRleCIsImNvbW1lbnRNb2RlbCIsImNvbW1lbnRDYXJkIiwiY2xvc2VJY29uIiwiaWNvbiIsImNsb3NlQ2xpY2siLCJyZW1vdmUiLCJtYWluRGVzY3JpcHRpb24iLCJoMSIsImV4cGxhbmF0aW9uIiwiZXh0cmFFeHBsYW5hdGlvbiIsImNvcHlyaWdodCIsImltYWdlRGF0ZSIsImRhdGUiLCJoMiIsImNvbW1lbnRUaXRsZSIsImZvcm0iLCJldmVudCIsInByZXZlbnREZWZhdWx0IiwidmFsdWUiLCJjb21tZW50TWVzc2FnZSIsImdldEF0dHJpYnV0ZSIsInJlc2V0Il0sInNvdXJjZVJvb3QiOiIifQ==