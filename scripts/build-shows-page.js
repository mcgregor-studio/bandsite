//Function to create new elements with class names
function newElem(elem, className) {
    let newElem = document.createElement(elem);
    newElem.classList.add(className);
    return newElem;
  }

//Element Variables
  //Shows API
const showsAPI = axios.get(`https://project-1-api.herokuapp.com/showdates?api_key=90e8de57-7098-4abf-a88f-1f04ceed7207`); 
  //Containers
const divMargin = newElem(`div`, `margin`);
const shows = newElem(`section`, `shows`);
const showsContainer = newElem(`div`, `shows__container`)
  //Header
const showsHeader = newElem(`h1`, `text__header--section`);
  showsHeader.innerText = `Shows`;
  //Table Elements
  let showsTable = newElem(`table`, `shows__table`);
  let showsHeaderRow = newElem(`tr`, `shows__table--header-row`);
  let headerRowDate = newElem(`th`, `text__header--table`);
    headerRowDate.innerText = `Date`;
  let headerRowVenue = newElem(`th`, `text__header--table`);
    headerRowVenue.innerText = `Venue`;
  let headerRowLocation = newElem(`th`, `text__header--table`);
    headerRowLocation.innerText = `Location`;
//Reference variable 
const hero = document.querySelector(`.hero`);

//'insertAfter' function
function insertAfter(ref, elem) {
    ref.parentNode.insertBefore(elem, ref.nextSibling);
};

//Adding comments section and HTML comment to demarcate it
insertAfter(hero, shows);
const showsTitle = document.createComment(` Shows `);
document.body.insertBefore(showsTitle, shows);

//Adding the element variables declared in the 'Element Variables' section to the HTML
  //Adding container and section header
shows.appendChild(divMargin);
divMargin.append(
  showsHeader, 
  showsContainer);
  //adding table and table headers
showsContainer.appendChild(showsTable);
showsTable.appendChild(showsHeaderRow);
  showsHeaderRow.append(
    headerRowDate,
    headerRowVenue,
    headerRowLocation
  );

//Promise handling
showsAPI.then(show => {

//declare GET request data as a variable
let showsArray = show.data;

//forEach method to display all shows
showsArray.forEach(elem => {
  //declaring variables for DOM
    let rowEl = newElem(`tr`, `shows__table--row`);
    let dateHeaderEl = newElem(`td`, `text__header--mobile`);
    let dateEl = newElem(`td`, `text--shows-date`);
    let venueHeaderEl = newElem(`td`, `text__header--mobile`);
    let venueEl = newElem(`td`, `text--shows-venue`);
    let locationHeaderEl = newElem(`td`, `text__header--mobile`)
    let locationEl = newElem(`td`, `text--shows-location`);
    let buttonContainerEl = newElem(`td`, `shows__table--button-container`)
    let buttonEl = newElem(`button`, `shows__table--button`);
      buttonEl.setAttribute(`type`, `button`);
    //Reformatting data from GET request for the date value
      //Create a new full date by parsing the JSON so it can be read by Javascript
    let fullDate = new Date(JSON.parse(elem.date));
      //create a regex to look for all commas globally
    let commaRegex = /,/g;
      //create an options object to convert the date to a locale string
    const options = {weekday: `short`, year: `numeric`, month: `short`, day: `2-digit`};
      //convert the full date to a locale date string and remove all commas by replacing them with nothing
    let dateValue = fullDate.toLocaleDateString(`en-US`, options).replace(commaRegex, ``);


  //Inputting inner text for each variable based on GET request data
    dateHeaderEl.innerText = `Date`;
    dateEl.innerText = dateValue;
    venueHeaderEl.innerText = `Venue`;
    venueEl.innerText = elem.place;
    locationHeaderEl.innerText = `Location`;
    locationEl.innerText = elem.location;
    buttonEl.innerText = `Buy Tickets`;

  //Appending each element in the table
    showsTable.appendChild(rowEl);
     rowEl.append(
       dateHeaderEl,
       dateEl,
       venueHeaderEl,
       venueEl,
       locationHeaderEl,
       locationEl,
       buttonContainerEl
      );
       buttonContainerEl.appendChild(buttonEl);
  });
})
//Catch to handle any errors
.catch(error => console.log(error));

//Event listener to change the colour of the table row
showsTable.addEventListener (`click`, (event) => {
  //declare the event target and full shows table as a variable
  let rowTarget = event.target;
  let tableRows = showsTable.children;

  //loop through all of the rows in the table
  for (let i = 0; i < tableRows.length; i++) {
    //if they have the active-row class, remove it
    if (tableRows[i].classList.contains(`active-row`)) {
      tableRows[i].classList.remove(`active-row`);
    }
  }

  //if the event target is a td element, add the active-row class to the parent element (ie. the tr element)
  if (rowTarget.nodeName === `TD`) {
    rowTarget.parentNode.classList.add(`active-row`)
  } 
  //if the event target is a tr element, add the active-row class to it directly
  else if (rowTarget.nodeName === `TR`) {
    rowTarget.classList.add(`active-row`);
  }
  //Otherwise, do nothing 
  else {}
});