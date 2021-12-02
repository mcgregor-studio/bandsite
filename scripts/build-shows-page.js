//Function to create new elements with class names
function newElem(elem, className) {
    let newElem = document.createElement(elem);
    newElem.classList.add(className);
    return newElem;
  }
  //Function to add attributes
function inputAtt(elem, att, value) {
    elem.setAttribute(att, value);
   return elem;
  }

//Element Variables
  //Containers
let divMargin = newElem(`div`, `margin`);
let shows = newElem(`section`, `shows`);
let showsContainer = newElem(`div`, `shows__container`)
  //Header
let showsHeader = newElem(`h1`, `text__header--section`);
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
let hero = document.querySelector(`.hero`);

//Shows array
let showsArray = [
    { date: `Mon Sept 06 2021`, 
      venue: `Ronald Lane`,
    },
    { date: `Tue Sept 21 2021`, 
      venue: `Pier 3 East`,
    },
    { date: `Fri Oct 15 2021`, 
      venue: `View Lounge`,
    },
    { date: `Sat Nov 06 2021`, 
      venue: `Hyatt Agency`,
    },
    { date: `Fri Nov 26 2021`, 
      venue: `Moscow Center`,
    },
    { date: `Wed Dec 15 2021`, 
      venue: `Press Club`,
    }
   ];

//'insertAfter' function
function insertAfter(ref, elem) {
    ref.parentNode.insertBefore(elem, ref.nextSibling);
};

//Adding comments section and HTML comment to demarcate it
insertAfter(hero, shows);
let showsTitle = document.createComment(` Shows `);
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

//Function to display all shows
function displayShows(arr) {

  for (let i = 0; i < arr.length; i++) {
    let rowEl = newElem(`tr`, `shows__table--row`);
    let dateHeaderEl = newElem(`td`, `text__header--mobile`);
    let dateEl = newElem(`td`, `text--shows-date`);
    let venueHeaderEl = newElem(`td`, `text__header--mobile`);
    let venueEl = newElem(`td`, `text--shows-venue`);
    let locationHeaderEl = newElem(`td`, `text__header--mobile`)
    let locationEl = newElem(`td`, `text--shows-location`);
    let buttonContainerEl = newElem(`td`, `shows__table--button-container`)
    let buttonEl = newElem(`button`, `shows__table--button`);
      inputAtt(buttonEl, `type`, `button`);

    dateHeaderEl.innerText = `Date`;
    dateEl.innerText = arr[i].date;
    venueHeaderEl.innerText = `Venue`;
    venueEl.innerText = arr[i].venue;
    locationHeaderEl.innerText = `Location`;
    locationEl.innerText = `San Francisco, CA`
    buttonEl.innerText = `Buy Tickets`;

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
  }
};
displayShows(showsArray);



//Event listener to change the colour of the table row
showsTable.addEventListener (`click`, (event) => {
  let active = event.target;
  let activeRow = showsTable.children;

  for (let i = 0; i < activeRow.length; i++) {
    if (activeRow[i].className === `shows__table--row active-row`) {
      activeRow[i].classList.remove(`active-row`);
    }
  }

  if (active.nodeName === `TD`) {
    active.parentNode.classList.add(`active-row`)
  } else if (active.nodeName === `TR`) {
    active.classList.add(`active-row`);
  } else {}
});