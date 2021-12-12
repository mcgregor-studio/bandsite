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
    name: `name`, 
    placeholder: `Enter your name`
  });
let commentsInputComment = newElem(`textarea`, `comments__form--comment`);
  addAtt(commentsInputComment, {
    type: `text`,
    name: `comment`,
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
let dateValue = (fullDate.getMonth()+1) + `/` + fullDate.getDate() + `/` + fullDate.getFullYear();

//Functions
  //Dynamic date function
    //Note: The function skips hours & minutes and goes to seconds; this is because the date info provided 
    //is not specific enough to measure by either metric.
  function dynamicDate(date) {
    //variables to measure each time in seconds
    let timePassedInSeconds = ((fullDate - new Date(date)) / 1000);
    let yearInSeconds = 31536000;
    let monthInSeconds = yearInSeconds / 12;
    let weekInSeconds = 604800;
    let dayInSeconds = weekInSeconds / 7;

    //if statement chain to account for:
    //- X years ago
    //- 1 year ago
    //- X months ago
    //- 1 month ago
    //- X days ago 
    //- 1 day ago
    //- A few seconds ago  
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
  //displayComments function
function displayComment(arr) {
  //declare element to hold comments array and appends it in the HTML
  let arrayEl = newElem(`div`,`comments--array`);
  divMargin.appendChild(arrayEl);

  //forEach method to display each comment
  arr.forEach(elem => {  
    //Declare all of the variables to use for each comment
    let containerEl = newElem(`card`, `comments__container`);
    let displayEl = newElem(`div`, `comments__display`);
    let nameEl = newElem(`h4`, `comments__display--name`);
    let dateEl = newElem(`p`, `comments__display--date`)
    let commentEl = newElem(`p`, `text__comments`);
    let imageEl = newElem(`img`, `comments__display--image`);
    let dividerEl = newElem(`div`, `divider`);

    //Create the innerText of the respective variables based on the GET request data
    nameEl.innerText = elem.name;
    dateEl.innerText = dynamicDate(elem.timestamp);
    commentEl.innerText = elem.comment;

    //Append it to the arrayEl variable declared above
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
  //Function to create new object and add it to array based on HTML input
  //It also validates the inputs to ensure that each one isn't empty
let addComment = (event) => {
  //preventDefault method to prevent page from reloading
  event.preventDefault();

  //declaring variables for all form elements and input values for the name and comment text fields
  let formElements = commentsForm.children;
  let nameValue = event.target.name.value;
  let commentValue = event.target.comment.value;

  //if the name value or comment value are empty strings, then add the invalid class and alert the end user
  if (nameValue === `` || commentValue === ``) {
    commentsInputName.classList.add(`invalid`);
    commentsInputComment.classList.add(`invalid`);
    alert (`Please fill out all fields.`);
  } else {
  //Else: 
  //Check to see if any of the form elements have the invalid class and remove it
  for (let i = 0; i < formElements.length; i++) {
    if (formElements[i].classList.contains(`invalid`)) {
      formElements[i].classList.remove(`invalid`);
    }
  }
  //Declare an empty object
  let commentsObj = {};
  //Populate the object with keys that have the same values as their respective input values
  commentsObj.name = nameValue;
  commentsObj.timestamp = dynamicDate(dateValue);
  commentsObj.comment = commentValue;

  //Stringify the commentsObj object
  JSON.stringify(commentsObj);

  //Declare arr as the element with the class 'comments--array' that was created earlier
  let arr = document.querySelector(`.comments--array`);
  //Remove it
  arr.remove();
  //add the now-populated commentsObj variable to the comments array
  commentsArray.unshift(commentsObj);
  //run the displayComment function again with the new object
  displayComment(commentsArray);
  //reset the form fields
  commentsForm.reset();
  }
}
  //Add an event listener that uses the addComment function when the end user submits a form
  commentsForm.addEventListener(`submit`, addComment);
  //'insertAfter' function
function insertAfter(ref, elem) {
  ref.parentNode.insertBefore(elem, ref.nextSibling);
};

//Building sections in HTML
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
  //declare GET request data as a variable
let commentsArray = comment.data;
  //Displaying commments based on API data
displayComment(commentsArray)
})
.catch(error => console.log(error));