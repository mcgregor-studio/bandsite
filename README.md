## Description

This is the second project that I created during the Brainstation web development program. I was responsible for the following: 

# Tools & Resources
- Make use of a design package (assets, style guide, and creative mockup) to create a functional and 
  responsive site

# Functional Requirements
- Return Home Link: Located in the top-left corner of the nav is the wordmark / logo "BANDSITE". Clicking on this should return visitors to the bio page.

# Visual Design Requirements
- The site must resemble the mockups and design specs provided in the design package
- The site must be responsive at all dimensions, including between, above & below the provided   
  break-points (between 320px and 1920px your site should be consistent)
- The site must be approached using a mobile-first design approach.
- Responsive units used wherever possible in order to have elements respond to changes in the 
  browser window size. Use px values to calculate responsive units wherever necessary.

# Implementation Requirements
## First Sprint
- Sass must be used for all styling, and take advantage of Sass variables, plus any other Sass features 
  that can help improve the code.
- Class naming for all styling must use BEM.
- Layout of the site must use Flexbox. 
## Second Sprint
Comments Section
- There must be an array in JavaScript with 3 default comment objects to start. Comments must have a name, a timestamp, and the comment text.
- There must be a function called displayComment() that takes in one comment object as a parameter and displays it on the page using JavaScript DOM manipulation.
- No template literals should be used. All dynamic HTML should be added to DOM via DOM Methods for individual elements. Avoid bulk assigning stringified HTML using innerHTML
- An HTML Form with the following functionality must be used:
  - That submits using the addEventListener
  - Prevents the page from reloading when submitting a new comment
  - Constructs a new comment object
  - Pushes a new comment object to an array of comments
  - Clears all comments from the page
  - Re-renders to the page all comments from the comment array
  - Clears the input fields after submitting a new comment
Shows Page
- A song of my own choice from SoundCloud was required to be embedded using an iframe
- A list of concerts must be created using JavaScript DOM manipulation / flexbox layout.
- An array must be created in JavaScript with all of concerts data and render the concerts HTML dynamically using the array data. 
- No template literals should be used. All dynamic HTML should be added to DOM via DOM Methods for individual elements. Avoid bulk assigning stringified HTML using innerHTML
- Utilize your knowledge of JavaScript DOM Manipulation and built in functions to create all the content between the hero image and the footer, as well as create your own functions as necessary. There should be no need to have any shows content housed within your html file for this section.
- The individual rows of the Shows table must have different styling applied depending on the state of the table row, utilizing both JavaScript and Sass.
- The individual rows of the Shows table need to have a hover state applied to them when a cursor is hovering over the table row, as per style guide. 
- Additionally, clicking on an individual row should make that row "selected" or "active", applying a modifier CSS class via JavaScript. JavaScript and Sass must both be utilized to accomplish this.
Styling is still applied through the Sass files. Do not use the built in JavaScript DOM style method.

# Additional Skills
I have also included the following: 
## First Sprint
- Navigation Hover: Hover effects have been added to the navigation in accordance with the style guide.
- Photo Gallery Hover: Use of the filter property to have the images of the gallery grayscale by default, and when the user hovers over each image it returns to color.
- Mailto Link: Located in the footer of the web page is the contact information for several agents. Clicking on the email addresses listed should open up a user's mail account where they can begin to draft a message to the specific contact.
## Second Sprint
- Form Validation: Upon validation, if there are any errors:
  - Prevent the form from submitting.
  - Adjust the state of the form fields to show the error state that is specified in the Style Guide.
If there are no errors:
  - Clear any error states from the form fields.
  - Submit the form.
