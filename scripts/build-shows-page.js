//Function to create new elements with class names
function newElem(elem, className) {
    let newElem = document.createElement(elem);
    newElem.classList.add(className);
    return newElem;
  }

//Element Variables
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

//Shows array
const showsArray = [
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

//Function to display all shows
function displayShows(arr) {
 arr.forEach(elem => {
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

    dateHeaderEl.innerText = `Date`;
    dateEl.innerText = elem.date;
    venueHeaderEl.innerText = `Venue`;
    venueEl.innerText = elem.venue;
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
  });
};
displayShows(showsArray);

//Event listener to change the colour of the table row
showsTable.addEventListener (`click`, (event) => {
  let rowTarget = event.target;
  let tableRows = showsTable.children;

  for (let i = 0; i < tableRows.length; i++) {
    if (tableRows[i].classList.contains(`active-row`)) {
      tableRows[i].classList.remove(`active-row`);
    }
  }

  if (rowTarget.nodeName === `TD`) {
    rowTarget.parentNode.classList.add(`active-row`)
  } else if (rowTarget.nodeName === `TR`) {
    rowTarget.classList.add(`active-row`);
  } else {}
});