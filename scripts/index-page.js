//Function to create new elements with class names
function newElem(elem, className) {
  let newElem = document.createElement(elem);
  newElem.classList.add(className);
  return newElem;
}
//Function to add attributes
function inputAtt(elem, att, value, idName, inputText) {
  elem.setAttribute(att, value)
if (elem.nodeName === `INPUT`){
    elem.id = idName;
    elem.setAttribute(`name`, idName);
    elem.setAttribute(`value`, inputText);
 } 
 return elem;
}


//Element Variables
  //Containers
let divMargin = newElem(`div`, `margin`);
let comments = newElem(`section`, `comments`);
let commentsContainer = newElem(`div`, `comments__container`);
  //Header & Divider
let commentsHeader = newElem(`h1`, `text--section-header`);
let commentsDivider = newElem(`div`, `comments--divider`);
  //Form & Inputs
let commentsForm = newElem(`form`, `comments__form`);
let commentsLabelName = newElem(`label`, `comments__form--label`);
  inputAtt(commentsLabelName, `for`, `name`);
let commentsInputName = newElem(`input`, `comments__form--name`);
  inputAtt(commentsInputName, `type`, `text`, `name`, `Enter your name`);
let commentsLabelText = newElem(`label`, `comments__form--label`);
  inputAtt(commentsLabelText, `for`, `name`);
let commentsInputText = newElem(`input`, `comments__form--text`);
  inputAtt(commentsInputText, `type`, `text`, `comment`, `Add a new comment`);
let commentsButton = newElem(`button`, `comments__form--button`);
  inputAtt(commentsButton, `type`, `button`);
let commentsImage = newElem(`img`, `comments__image`);
  inputAtt(commentsImage,  `src`, `assets/images/Mohan-muruge.jpg`);
  //Previous Comments Card
let commentsCard = newElem(`card`, `commments__card`);

//Reference variables
let gallery = document.querySelector(`.gallery`);

//Comments array
let commentsArray = [
  { name: `Connor Walton`, 
    date: 02/17/2021, 
    comment: `This is art. This is inexplicable magic expressed in the purest way, everything that makes up this majestic work deserves reverence. Let us appreciate this for what it is and what it contains.`
  },
  { name: `Emilie Beach`,
    date: 01/09/2021,
    comment: `I feel blessed to have seen them in person. What a show! They were just perfection. If there was one day of my life I could relive, this would be it. What an incredible day.`
  },
  { name: `Miles Acosta`,
    date: 12/20/2020,
    comment: `I can't stop listening. Every time I hear one of their songs - the vocals - it gives me goosebumps. Shivers straight down my spine. What a beautiful expression of creativity. Can't get enough.`
  }]

//'insertAfter' function
function insertAfter(ref, elem) {
    ref.parentNode.insertBefore(elem, ref.nextSibling);
}

//Adding comments section and HTML comment to demarcate it
insertAfter(gallery, comments);
let commentsTitle = document.createComment(` Comments `);
document.body.insertBefore(commentsTitle, comments);

//Adding the element variables declared in the 'Element Variables' section to the HTML
  //Adding container and image elements
comments.appendChild(divMargin);
divMargin.appendChild(commentsHeader);
commentsHeader.innerText = `Join the Conversation`;
divMargin.appendChild(commentsContainer);
commentsContainer.appendChild(commentsImage);
  //Adding form elements
commentsContainer.appendChild(commentsForm)
commentsForm.appendChild(commentsLabelName);
commentsLabelName.innerText = `Name`;
commentsForm.appendChild(commentsInputName);
commentsForm.appendChild(commentsLabelText);
commentsLabelText.innerText = `Comment`;
commentsForm.appendChild(commentsInputText);
commentsForm.appendChild(commentsButton);
commentsButton.innerText = `Comment`;
  //Adding divider
divMargin.appendChild(commentsDivider);



//displayComments function
function displayComment(arr) {
  for (let i = 0; i < arr.length; i++) {
  
    }
  }