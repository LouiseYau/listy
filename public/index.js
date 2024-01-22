// import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
// import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

// const appSettings = {
//     databaseURL:"https://realtime-database-ed918-default-rtdb.asia-southeast1.firebasedatabase.app/"
// }

// const app = initializeApp(appSettings)
// const database = getDatabase(app)
// const shoppingListInDB = ref(database, "shoppingList")

// const inputFieldEl = document.getElementById("input-field")
// const addButtonEl = document.getElementById("add-button")
// const shoppingListEl = document.getElementById("shopping-list")

// addButtonEl.addEventListener("click", function() {
//     let inputValue = inputFieldEl.value
    
//     push(shoppingListInDB, inputValue)
    
//     clearInputFieldEl()
// })

// onValue(shoppingListInDB, function(snapshot) {
//     if (snapshot.exists()) {
//         let itemsArray = Object.entries(snapshot.val())
    
//         clearShoppingListEl()
        
//         for (let i = 0; i < itemsArray.length; i++) {
//             let currentItem = itemsArray[i]
//             let currentItemID = currentItem[0]
//             let currentItemValue = currentItem[1]
            
//             appendItemToShoppingListEl(currentItem)
//         }    
//     } else {
//         shoppingListEl.innerHTML = "No items here... yet"
//     }
// })

// function clearShoppingListEl() {
//     shoppingListEl.innerHTML = ""
// }

// function clearInputFieldEl() {
//     inputFieldEl.value = ""
// }

// function appendItemToShoppingListEl(item) {
//     let itemID = item[0]
//     let itemValue = item[1]
    
//     let newEl = document.createElement("li")
    
//     newEl.textContent = itemValue
    
//     newEl.addEventListener("click", function() {
//         let exactLocationOfItemInDB = ref(database, `shoppingList/${itemID}`)
        
//         remove(exactLocationOfItemInDB)
//     })
    
//     shoppingListEl.append(newEl)
// }

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDLVdvoqrPsCF2EUbUI9hWVnggX4tlhKUo",
    authDomain: "realtime-database-ed918.firebaseapp.com",
    databaseURL: "https://realtime-database-ed918-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "realtime-database-ed918",
    storageBucket: "realtime-database-ed918.appspot.com",
    messagingSenderId: "174783196849",
    appId: "1:174783196849:web:0922bfedd44bc0767efc90"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const shoppingListInDB = ref(database, "shoppingList");
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
// DOM elements
const inputFieldEl = document.getElementById("input-field");
const addButtonEl = document.getElementById("add-button");
const shoppingListEl = document.getElementById("shopping-list");
const loginButtonEl = document.getElementById("login-button");
const logoutButtonEl = document.getElementById("logout-button");

// Event listeners
addButtonEl.addEventListener("click", function() {
    const inputValue = inputFieldEl.value;
    
    push(shoppingListInDB, { value: inputValue, userId: getCurrentUserId() });
    
    clearInputFieldEl();
});

loginButtonEl.addEventListener("click", signInBtn);
logoutButtonEl.addEventListener("click", signOutBtn);

render();

// Check authentication state
onAuthStateChanged(auth, (user) => {
    if (user) {
        // User is signed in
        render();
        console.log('User is signed in:', user.displayName);
        loginButtonEl.style.display = "none";
        logoutButtonEl.style.display = "inline-block";
    } else {
        // User is signed out
        console.log('User is signed out');
        loginButtonEl.style.display = "inline-block";
        logoutButtonEl.style.display = "none";
    }
});

function render(){
onValue(shoppingListInDB, function(snapshot) {
    if (snapshot.exists()) {
        const itemsArray = Object.entries(snapshot.val());
    
        clearShoppingListEl();
        
        for (let i = 0; i < itemsArray.length; i++) {
            const currentItem = itemsArray[i];
            const currentItemID = currentItem[0];
            const currentItemValue = currentItem[1].value;
            
            // Only display items associated with the current user
            if (getCurrentUserId() === currentItem[1].userId) {
                appendItemToShoppingListEl(currentItem);
            }
        }    
    } else {
        shoppingListEl.innerHTML = "No items here... yet";
    }
});
}

function getCurrentUserId() {
    const user = auth.currentUser;
    return user ? user.uid : null;
}

function signInBtn() {
   
    signInWithPopup(auth, provider)
        .then((result) => {
            // User is signed in, handle the result
            console.log(`user logged in:${result.user}`)
        })
        .catch((error) => {
            // Handle errors
            console.error('Error signing in:', error.message);
        });
}

function signOutBtn(){
    signOut(auth).then(() => {
        // Sign-out successful.
        console.log(`user signed out`)
        clearShoppingListEl()
        shoppingListEl.innerHTML = 'You have been signed out'
        provider.revokeAccess()
      }).catch((error) => {
        // An error happened.
        console.error(error)
      });
}

function clearShoppingListEl() {
    shoppingListEl.innerHTML = "";
}

function clearInputFieldEl() {
    inputFieldEl.value = "";
}

function appendItemToShoppingListEl(item) {
    const itemID = item[0];
    const itemValue = item[1].value;
    
    const newEl = document.createElement("li");
    
    newEl.textContent = itemValue;
    
    newEl.addEventListener("click", function() {
        const exactLocationOfItemInDB = ref(database, `shoppingList/${itemID}`);
        
        remove(exactLocationOfItemInDB);
    });
    
    shoppingListEl.append(newEl);
}
