//Function to create new elements with class names
function newElem(elem, className) {
  let newElem = document.createElement(elem);
  newElem.classList.add(className);
  return newElem;
}
//Function to add attributes to elements
function addAtt(elem, att) {
  for (key in att) {
    elem.setAttribute(key, att[key]);
  }
}

//Element Variables
//Comments API
const herokuURL = `https://project-1-api.herokuapp.com/comments`;
const apiKey = `?api_key=90e8de57-7098-4abf-a88f-1f04ceed7207`;
const commentsAPI = herokuURL + apiKey;
//Containers
const divMargin = newElem(`div`, `margin`);
const comments = newElem(`section`, `comments`);
const commentsContainer = newElem(`div`, `comments__container`);
//Header
const commentsHeader = newElem(`h1`, `text__header--section`);
//Form
let commentsForm = newElem(`form`, `comments__form`);
//Labels
let commentsLabelName = newElem(`label`, `comments__form--label`);
addAtt(commentsLabelName, { for: `name` });
let commentsLabelComment = newElem(`label`, `comments__form--label`);
addAtt(commentsLabelComment, { for: `comment` });
//Inputs
let commentsInputName = newElem(`input`, `comments__form--name`);
addAtt(commentsInputName, {
  type: `text`,
  name: `name`,
  placeholder: `Enter your name`,
});
let commentsInputComment = newElem(`textarea`, `comments__form--comment`);
addAtt(commentsInputComment, {
  type: `text`,
  name: `comment`,
  placeholder: `Add a new comment`,
  rows: `4`,
});
let commentsButton = newElem(`input`, `comments__form--button`);
addAtt(commentsButton, {
  type: `submit`,
  value: `Comment`,
});
//Image
let commentsImage = newElem(`img`, `comments__image`);
addAtt(commentsImage, { src: `assets/images/Mohan-muruge.jpg` });
//Array
let commentsArray = newElem(`div`, `comments--array`);
//References
const gallery = document.querySelector(`.gallery`);
//Date
let fullDate = new Date();
let dateValue = `${
  fullDate.getMonth() + 1
}/${fullDate.getDate()}/${fullDate.getFullYear()}`;

//Functions
//Dynamic date function
function dynamicDate(date) {
  let timePassedInSeconds = (fullDate - new Date(date)) / 1000;
  let yearInSeconds = 31536000;
  let monthInSeconds = yearInSeconds / 12;
  let weekInSeconds = 604800;
  let dayInSeconds = weekInSeconds / 7;
  let hourInSeconds = 3600;

  if (timePassedInSeconds / yearInSeconds > 1.5) {
    return `${Math.round(timePassedInSeconds / yearInSeconds)} years ago`;
  } else if (
    Math.floor(timePassedInSeconds / monthInSeconds) === 12 ||
    Math.round(timePassedInSeconds / monthInSeconds) === 12
  ) {
    return `1 year ago`;
  } else if (timePassedInSeconds / monthInSeconds > 1.5) {
    return `${Math.round(timePassedInSeconds / monthInSeconds)} months ago`;
  } else if (Math.floor(timePassedInSeconds / monthInSeconds) === 1) {
    return `1 month ago`;
  } else if (timePassedInSeconds / weekInSeconds > 1.5) {
    return `${Math.round(timePassedInSeconds / weekInSeconds)} weeks ago`;
  } else if (Math.floor(timePassedInSeconds / weekInSeconds) === 1) {
    return `1 week ago`;
  } else if (timePassedInSeconds / dayInSeconds > 1.5) {
    return `${Math.round(timePassedInSeconds / dayInSeconds)} days ago`;
  } else if (Math.floor(timePassedInSeconds / dayInSeconds) === 1) {
    return `1 day ago`;
  } else if (timePassedInSeconds / hourInSeconds > 1.5) {
    return `${Math.round(timePassedInSeconds / hourInSeconds)} hours ago`;
  } else if (Math.floor(timePassedInSeconds / hourInSeconds) === 1) {
    return `1 hour ago`;
  } else if (timePassedInSeconds / 60 > 1.5) {
    return `${Math.round(timePassedInSeconds / 60)} minutes ago`;
  } else if (Math.floor(timePassedInSeconds / 60) === 1) {
    return `1 minute ago`;
  } else {
    return `A few seconds ago`;
  }
}

//Render comments function
function renderComment(elem) {
  let containerEl = newElem(`card`, `comments__container`);
  addAtt(containerEl, { id: elem.id });
  let displayEl = newElem(`div`, `comments__display`);
  let cornerContainerEl = newElem(`div`, `comments__display--container`);
  let nameEl = newElem(`h4`, `comments__display--name`);
  let dateEl = newElem(`p`, `comments__display--date`);
  let deleteEl = newElem(`img`, `comments__display--delete-icon`);
  addAtt(deleteEl, { src: `./assets/icons/SVG/icon-delete.svg` });
  deleteEl.addEventListener(`click`, deleteComment);
  let likeEl = newElem(`img`, `comments__display--like-icon`);
  addAtt(likeEl, { src: `./assets/icons/SVG/icon-like.svg` });
  likeEl.addEventListener(`click`, likeComment);
  let likeCounter = newElem(`p`, `comments__display--like-counter`);
  let commentEl = newElem(`p`, `text__comments`);
  let imageEl = newElem(`img`, `comments__display--image`);

  nameEl.innerText = elem.name;
  dateEl.innerText = dynamicDate(elem.timestamp);
  likeCounter.innerText = `Likes: ${elem.likes}`;
  commentEl.innerText = elem.comment;

  commentsArray.prepend(containerEl);
  containerEl.append(imageEl, displayEl);
  displayEl.append(nameEl, cornerContainerEl, commentEl);
  cornerContainerEl.append(dateEl, likeCounter, likeEl, deleteEl);
}

//Display comment function (includes function validation)
const displayComment = (event) => {
  event.preventDefault();
  let formElements = commentsForm.children;
  let nameValue = event.target.name.value;
  let commentValue = event.target.comment.value;

  if (nameValue === `` || commentValue === ``) {
    commentsInputName.classList.add(`invalid`);
    commentsInputComment.classList.add(`invalid`);
    alert(`Please fill out all fields.`);
  } else {
    for (let i = 0; i < formElements.length; i++) {
      if (formElements[i].classList.contains(`invalid`)) {
        formElements[i].classList.remove(`invalid`);
      }
    }

    const commentsObj = {};
    commentsObj.name = nameValue;
    commentsObj.comment = commentValue;

    axios
      .post(commentsAPI, commentsObj)
      .then((result) => {
        renderComment(result.data);
      })
      .catch((error) => console.log(error));

    commentsForm.reset();
  }
};

//Like function
const likeComment = (event) => {
  let comment = event.target.parentNode.parentNode.parentNode;
  let putRequest = `${herokuURL}/${comment.id}/like${apiKey}`;
  console.log(putRequest);
  axios
    .put(putRequest)
    .then((result) => {
      let commentToLike = document.getElementById(result.data.id);
      let like = commentToLike.lastChild.children[1].children[1];
      return (like.innerHTML = `Likes: ${result.data.likes}`);
    })
    .catch((error) => console.log(error));
};

//Delete function
const deleteComment = (event) => {
  let comment = event.target.parentNode.parentNode.parentNode;
  let deleteRequest = `${herokuURL}/${comment.id}${apiKey}`;
  let confirmDelete = confirm(`Are you sure you want to delete this comment?`);
  if (confirmDelete) {
    axios
      .delete(deleteRequest)
      .then((result) => {
        let commentToDelete = document.getElementById(result.data.id);
        commentToDelete.remove();
      })
      .catch((error) => console.log(error));
  }
};

//'insertAfter' function
function insertAfter(ref, elem) {
  ref.parentNode.insertBefore(elem, ref.nextSibling);
}

//Building sections in HTML
//Adding comments section and HTML comment to demarcate it
insertAfter(gallery, comments);
const commentsTitle = document.createComment(` Comments `);
document.body.insertBefore(commentsTitle, comments);
//Adding the element variables declared in the 'Element Variables' section to the HTML
//Adding container and image elements
comments.appendChild(divMargin);
divMargin.append(commentsHeader, commentsContainer);
commentsContainer.appendChild(commentsImage);

commentsHeader.innerText = `Join the Conversation`;
//Adding form elements
commentsContainer.appendChild(commentsForm);
commentsForm.append(
  commentsLabelName,
  commentsInputName,
  commentsLabelComment,
  commentsInputComment,
  commentsButton
);

commentsLabelName.innerText = `Name`;
commentsLabelComment.innerText = `Comment`;
//Adding comments array
divMargin.appendChild(commentsArray);

//Promise handling
//GET request
axios
  .get(commentsAPI)
  .then((comment) => {
    let arr = comment.data;
    //sort each data element by how recently they were made
    arr
      .sort((a, b) => {
        return a.timestamp - b.timestamp;
      })
      //renders each one in the DOM
      .forEach((elem) => {
        renderComment(elem);
      });
  })
  .catch((error) => console.log(error));

//Event listeners
//Adding comments
commentsForm.addEventListener(`submit`, displayComment);
