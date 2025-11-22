// Create a CRD application (CRUD without update) 
// ✅using json-server or another API
// ✅Use fetch and async/await to interact with the API
// ✅Use a form to create/post new entities
// ✅Build a way for users to delete entities
// ✅Include a way to get entities from the API and display them
//  4.5 You do NOT need update, but you can add it if you'd like
// ✅5 Use Bootstrap and/or CSS to style your project



// Get the html div with the id "books-container" by assigning it to a variable to give the fetched books data a place to be displayed
const booksContainer = document.getElementById("books-container")

// The 'onFetchBooksClick" function was assigned to the html button labeled 'fetch books." That function is described here 
async function onFetchBooksClick() { // I want the resonse to clicking the 'fetch books' button to be the data from the json-server fake api database
    // I want to be able to see the book data so this function has to wait for the server with 'await, which makes the function asynchronous, so the function has to be labeled 'async'
    const response = await fetch("http://localhost:3000/book")
    // parse data so json-server understands
    const readingList = await response.json()
    // Set the contents of the books-container div to be a string of HTML with a div for each book
    // The map will map each book object to a string 
    booksContainer.innerHTML = readingList.map(
        book => `<div>
            <h4>${book.title}</h4>
            <p>${book.author}</p>
            <button onclick="onAddReviewClick(${book.id})" class="btn btn-outline-info mb-5 add-btn">Add Review</button>
            <button onclick="onDeleteBookClick(${book.id})" class="btn btn-outline-danger mb-5 delete-btn">Delete Book</button>
            </div>`
    // join will join that mapped array of strings into one long string, with an empty space between each div
    ).join("")
    //make the 'add review' and 'delete buttons' show up again using querySelector to select the button id and display each button inline with each book in the reading list
    document.querySelectorAll(".add-btn").forEach(btn => {
        btn.style.display = "inline-block"
    })
    document.querySelectorAll(".delete-btn").forEach(btn => {
        btn.style.display = "inline-block"
    })
}

// create a new item using the add books button
async function onCreateBookClick() {
    // made a variable for the value input for the title and author form by getting the id of each text box and taking the value of the text that was input
    const titleInput = document.getElementById("book-title").value
    const authorInput = document.getElementById("author-name").value
    const newBook = { // make the input value data an object with curly braces
        title: titleInput, //adds each value input to title and author form to the json database
        author: authorInput
    }
    const response = await fetch("http://localhost:3000/book", {
        method: "POST", // create
        headers: { "Content-Type": "application/json" }, // copy-pasted
        body: JSON.stringify(newBook) // Turns JS data into JSON data
    })
    // parse out the newly created item from the response body because that newly created item will have the id given to it by the backend
    const newlyCreatedItem = await response.json()
    // check that it was added correctly
    console.log("Created book: ", newBook)
    // the form resets when the add book button is clicked
    document.getElementById("add-book").reset()
    // calls the fetch button function to immediately display the newly added book on the reading list without refreshing or clicking the fetch button again
    onFetchBooksClick()
}

// create the delete function - the function needs an id to know which specific book to delte
async function onDeleteBookClick(id) {
    await fetch("http://localhost:3000/book/" + id, { // fetch the server data with the book id to tell the delete function which book id to target when deleting
        method: "DELETE",
    })
    // calls the fetch function to immediately display the new reading list when the book is deleted
    onFetchBooksClick()
}


// ****** UPDATE FUNCTION NOT ADDED *******

// I want adding a review to be an update - didn't get there this time
async function onUpdateBookClick() { 
    // I want to click the 'add review' button and have a text input box show up the user can write in and submit

    fetch("http://localhost:3000/reviews/" + lastCreatedItem.id, {
        method: "PUT", // update
        headers: { "Content-Type": "application/json" },
        // In a real app this updated data would probably be
        // from the user filling out some kind of update form
        // or specifying some kind of update they want to make
        body: JSON.stringify({ title: "Test Updated", genreId: 2 })
    })
}


//