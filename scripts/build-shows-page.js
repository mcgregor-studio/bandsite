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
let showsTable = newElem(`table`, `shows__table`);
let showsLocation = newElem(`p`, `text--body`);
  showsLocation.innerText = `San Francisco, CA`;
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
  //Adding container and image elements
shows.appendChild(divMargin);
divMargin.appendChild(showsTable);

function displayShowsTable() {
    for (let i = 0; i < showsArray.length; i++) {
        let tableRow = newElem(`tr`, `shows__table--row`);
        let tableData = newElem(`td`, `shows__table--data`);
        let tableButton = newElem(`button`, `shows__table--button`);
    }
}