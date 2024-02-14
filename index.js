//Import firebase functions

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://realtime-database-69249-default-rtdb.firebaseio.com//"
}

//define or initialize the app, connect to the database, and create references to database tables or locations
const app = initializeApp(appSettings)
const database = getDatabase(app)
const endorsementInDB = ref(database, "endorsement")

// connect to html elements so they can be pushed to the db and updated on the page
const endorsementTextEl = document.getElementById("endorsement-text")
const publishButtonEl = document.getElementById("publish-button")
const endorsementListEl = document.getElementById("endorsement-list")

// push text to the db when someone clicks the publish button
publishButtonEl.addEventListener("click", function() {
    let inputValue = endorsementTextEl.value
    
    push(endorsementInDB, inputValue)

    clearInputFieldEl()
})

// clear the input field on the page
function clearInputFieldEl() {
    endorsementTextEl.value = ""
}

// get a current snapshot of the database whenever new data is added
onValue(endorsementInDB, function(snapshot) {
    
    //check to see if the endorsement table has any entries (used to prevent a null error)
    if (snapshot.exists()) {
        
        //create an array of the database entries (with both keys and values)
        let itemsArray = Object.entries(snapshot.val())
        
        //remove existing items from the page so we don't get duplicates
        clearEndorsementListEl()

        //split the array into keys and values
        for (let i = 0; i < itemsArray.length; i++) {
            let currentItem = itemsArray[i]
            let currentItemID = itemsArray[0]
            let currentItemValue = itemsArray[1]

            //add the current item to the list
            appendItemToEndorsementList(currentItem)
        }
    } else {
        endorsementListEl.innerHTML = "Leave an endorsement for someone!"
    }
})

function clearEndorsementListEl() {
    endorsementListEl.innerHTML = ""
}

function appendItemToEndorsementList(item) {
    let itemID = item[0]
    let itemValue = item[1]

    let newEl = document.createElement("li")
    const listClass = document.querySelector('li')
   

    newEl.textContent = itemValue

    endorsementListEl.append(newEl)
}


/* Things to do
    1. Connect to the firebase database
    2. Create some variables to
        a. Interact with html elements
        b. Interact with the database
    3. Set the initial state of the app & variables
    4. Create a function to do something when the publish button is clicked
        a. add the input text to the database
        b. add text to the html display

*/
