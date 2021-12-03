//Function to create new elements with class names
function newElem(elem, className) {
  let newElem = document.createElement(elem);
  newElem.classList.add(className);
  return newElem;
}

//Element Variables
  //Containers
let divMargin = newElem(`div`, `margin`);
let comments = newElem(`section`, `comments`);
let commentsContainer = newElem(`div`, `comments__container`);
  //Header & Divider
let commentsHeader = newElem(`h1`, `text__header--section`);
let commentsDivider = newElem(`div`, `divider`);
  //Form
let commentsForm = newElem(`form`, `comments__form`);
  //Labels
let commentsLabelName = newElem(`label`, `comments__form--label`);
  commentsLabelName.setAttribute(`for`, `name`);
let commentsLabelComment = newElem(`label`, `comments__form--label`);
  commentsLabelComment.setAttribute(`for`, `comment`);
  //Inputs
let commentsInputName = newElem(`input`, `comments__form--name`);
  commentsInputName.setAttribute(`type`, `text`);
  commentsInputName.setAttribute(`name`, `input_name`)
  commentsInputName.setAttribute(`placeholder`, `Enter your name`)
let commentsInputComment = newElem(`textarea`, `comments__form--comment`);
  commentsInputComment.setAttribute(`type`, `text`);
  commentsInputComment.setAttribute(`name`, `input_comment`);
  commentsInputComment.setAttribute(`placeholder`, `Add a new comment`);
  commentsInputComment.setAttribute(`rows`, `4`);
let commentsButton = newElem(`input`, `comments__form--button`);
  commentsButton.setAttribute(`type`, `submit`);
  commentsButton.setAttribute(`value`, `Comment`);
  //Image
let commentsImage = newElem(`img`, `comments__image`);
  commentsImage.setAttribute(`src`, `assets/images/Mohan-muruge.jpg`);
  //Date
let fullDate = new Date();
let commentsDate = (fullDate.getMonth()+1) + `/` + fullDate.getDate() + `/` + fullDate.getFullYear();
  //References
let gallery = document.querySelector(`.gallery`);

//Comments array
let commentsArray = [
  { name: `Connor Walton`, 
    date: `02/17/2021`, 
    comment: `This is art. This is inexplicable magic expressed in the purest way, everything that makes up this majestic work deserves reverence. Let us appreciate this for what it is and what it contains.`
  },
  { name: `Emilie Beach`,
    date: `01/09/2021`,
    comment: `I feel blessed to have seen them in person. What a show! They were just perfection. If there was one day of my life I could relive, this would be it. What an incredible day.`
  },
  { name: `Miles Acosta`,
    date: `12/20/2020`,
    comment: `I can't stop listening. Every time I hear one of their songs - the vocals - it gives me goosebumps. Shivers straight down my spine. What a beautiful expression of creativity. Can't get enough.`
  }];

//'insertAfter' function
function insertAfter(ref, elem) {
    ref.parentNode.insertBefore(elem, ref.nextSibling);
};

//Adding comments section and HTML comment to demarcate it
insertAfter(gallery, comments);
let commentsTitle = document.createComment(` Comments `);
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

//displayComments function
function displayComment(arr) {
  let arrayEl = newElem(`div`,`comments--array`);
  divMargin.appendChild(arrayEl);
  for (let i = 0; i < arr.length; i++) {
    let containerEl = newElem(`card`, `comments__container`);
    let displayEl = newElem(`div`, `comments__display`);
    let nameEl = newElem(`h4`, `comments__display--name`);
    let dateEl = newElem(`p`, `comments__display--date`)
    let commentEl = newElem(`p`, `text__comments`);
    let imageEl = newElem(`img`, `comments__display--image`);
    let dividerEl = newElem(`div`, `divider`);

    nameEl.innerText = arr[i].name;
    dateEl.innerText = arr[i].date;
    commentEl.innerText = arr[i].comment;

    arrayEl.appendChild(containerEl);
    containerEl.append(
      imageEl, 
      displayEl);
    displayEl.append(
      nameEl, 
      dateEl, 
      commentEl);
    arrayEl.appendChild(dividerEl);
    }
  }

displayComment(commentsArray);

//Form validation
function validate() {
  let formElements = commentsForm.children;

  if (commentsInputName.value === ``) { 
    commentsInputName.classList.add(`invalid`);
    alert (`Please enter your name.`);
  } else if (commentsInputComment.value === ``) {
    commentsInputComment.classList.add(`invalid`);
    alert (`Please enter a comment.`);
  } else {
    for (let i = 0; i < formElements.length; i++) {
      if (formElements[i].classList.contains(`invalid`)) {
        formElements[i].classList.remove(`invalid`);
      }
    }
  }
}

commentsForm.setAttribute(`onsubmit`, `validate()`)

//Event listener to create new object and add it to array based on HTML input
commentsForm.addEventListener(`submit`, (event) => {
    event.preventDefault();
    let commentsObj = {};
    let formTarget = event.target;
    commentsObj.name = formTarget.input_name.value;
    commentsObj.date = commentsDate;
    commentsObj.comment = formTarget.input_comment.value;

    let arrDelete = document.querySelector(`.comments--array`);
    arrDelete.remove();
    commentsArray.unshift(commentsObj);
    displayComment(commentsArray);
    commentsForm.reset();
});

