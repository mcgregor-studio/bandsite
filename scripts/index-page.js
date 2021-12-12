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
const commentsAPI = axios.get(`https://project-1-api.herokuapp.com/comments?api_key=90e8de57-7098-4abf-a88f-1f04ceed7207`); 
  //Containers
const divMargin = newElem(`div`, `margin`);
const comments = newElem(`section`, `comments`);
const commentsContainer = newElem(`div`, `comments__container`);
  //Header & Divider
const commentsHeader = newElem(`h1`, `text__header--section`);
const commentsDivider = newElem(`div`, `divider`);
  //Form
let commentsForm = newElem(`form`, `comments__form`);
  //Labels
let commentsLabelName = newElem(`label`, `comments__form--label`);
  addAtt(commentsLabelName, {for: `name`});
let commentsLabelComment = newElem(`label`, `comments__form--label`);
  addAtt(commentsLabelComment, {for: `comment`});
  //Inputs
let commentsInputName = newElem(`input`, `comments__form--name`);
  addAtt(commentsInputName, {
    type: `text`, 
    name: `input_name`, 
    placeholder: `Enter your name`
  });
let commentsInputComment = newElem(`textarea`, `comments__form--comment`);
  addAtt(commentsInputComment, {
    type: `text`,
    name: `input_comment`,
    placeholder: `Add a new comment`,
    rows: `4`
  });
let commentsButton = newElem(`input`, `comments__form--button`);
  addAtt(commentsButton, {
    type: `submit`,
    value: `Comment`});
  //Image
let commentsImage = newElem(`img`, `comments__image`);
  addAtt(commentsImage, {src: `assets/images/Mohan-muruge.jpg`});
  //References
const gallery = document.querySelector(`.gallery`);

  //Date
let fullDate = new Date;
  //Dynamic date function
    //Note: The function skips hours & minutes and goes to seconds; this is because the date info provided 
    //is not specific enough to measure by either metric.
  function dynamicDate(date) {
    let timePassedInSeconds = ((fullDate - new Date(date)) / 1000);
    let yearInSeconds = 31536000;
    let monthInSeconds = yearInSeconds / 12;
    let weekInSeconds = 604800;
    let dayInSeconds = weekInSeconds / 7;

    if (timePassedInSeconds / yearInSeconds > 1) {
      return Math.round(timePassedInSeconds / yearInSeconds) + ` years ago`;   
    } else if ((Math.floor(timePassedInSeconds / monthInSeconds)) === 12) {
      return `1 year ago`;
    } else if (timePassedInSeconds / monthInSeconds > 1) {
      return Math.round(timePassedInSeconds / monthInSeconds) + ` months ago`;
    } else if (Math.floor(timePassedInSeconds / monthInSeconds) === 1) {
      return `1 month ago`;
    } else if (timePassedInSeconds / weekInSeconds > 1) {
      return Math.round(timePassedInSeconds / weekInSeconds) + ` weeks ago`;
    } else if (Math.floor(timePassedInSeconds / weekInSeconds) === 1) {
      return `1 week ago`;
    } else if (timePassedInSeconds / dayInSeconds > 1) {
      return Math.round(timePassedInSeconds / dayInSeconds) + ` days ago`;
    } else if (Math.floor(timePassedInSeconds / dayInSeconds) === 1) {
      return `1 day ago`;
    } else {
      return `A few seconds ago`;
    }
  }

//Building sections in HTML
  //'insertAfter' function
function insertAfter(ref, elem) {
    ref.parentNode.insertBefore(elem, ref.nextSibling);
};

  //Adding comments section and HTML comment to demarcate it
insertAfter(gallery, comments);
const commentsTitle = document.createComment(` Comments `);
document.body.insertBefore(commentsTitle, comments);

//Adding the element variables declared in the 'Element Variables' section to the HTML
  //Adding container and image elements
comments.appendChild(divMargin);
  divMargin.append(
    commentsHeader, 
    commentsContainer);
      commentsContainer.appendChild(commentsImage);

    commentsHeader.innerText = `Join the Conversation`; 
  //Adding form elements
    commentsContainer.appendChild(commentsForm);
      commentsForm.append(
        commentsLabelName, 
        commentsInputName, 
        commentsLabelComment, 
        commentsInputComment, 
        commentsButton);

        commentsLabelName.innerText = `Name`;
        commentsLabelComment.innerText = `Comment`;
  //Adding divider
divMargin.appendChild(commentsDivider);

//Promise handling
commentsAPI.then(comment => {

  let commentsArray = comment.data;
  //displayComments function
function displayComment(arr) {
  let arrayEl = newElem(`div`,`comments--array`);
  divMargin.appendChild(arrayEl);

  arr.forEach(elem => {  
    let containerEl = newElem(`card`, `comments__container`);
    let displayEl = newElem(`div`, `comments__display`);
    let nameEl = newElem(`h4`, `comments__display--name`);
    let dateEl = newElem(`p`, `comments__display--date`)
    let commentEl = newElem(`p`, `text__comments`);
    let imageEl = newElem(`img`, `comments__display--image`);
    let dividerEl = newElem(`div`, `divider`);

    nameEl.innerText = elem.name;
    dateEl.innerText = dynamicDate(elem.timestamp);
    commentEl.innerText = elem.comment;

    arrayEl.appendChild(containerEl);
    containerEl.append(
      imageEl, 
      displayEl);
    displayEl.append(
      nameEl, 
      dateEl, 
      commentEl);
    arrayEl.appendChild(dividerEl);
    })
  }

//Displaying commments based on API data
  displayComment(commentsArray)

//Function to create new object and add it to array based on HTML input
  //It also validates the inputs to ensure that each one isn't empty

let addComment = (event) => {
  event.preventDefault();

  let formElements = commentsForm.children;
  let nameValue = event.target.input_name.value;
  let commentValue = event.target.input_comment.value;

  if (nameValue === `` || commentValue === ``) {
    commentsInputName.classList.add(`invalid`);
    commentsInputComment.classList.add(`invalid`);
    alert (`Please fill out all fields.`);
  } else {
  let commentsObj = {};

  for (let i = 0; i < formElements.length; i++) {
    if (formElements[i].classList.contains(`invalid`)) {
      formElements[i].classList.remove(`invalid`);
    }
  }
  
  commentsObj.name = nameValue;
  commentsObj.timestamp = dynamicDate(dateValue);
  commentsObj.comment = commentValue;

  let arr = document.querySelector(`.comments--array`);
  arr.remove();
  commentsArray.unshift(commentsObj);
  displayComment(commentsArray);
  commentsForm.reset();
  }
}

commentsForm.addEventListener(`submit`, addComment);
})
.catch(error => console.log(error));