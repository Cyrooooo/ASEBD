
const infoBox = document.getElementById('infoBox');
const myButton = document.getElementById('myButton');
const closeButton = document.getElementById('closeButton');

myButton.addEventListener('click', function() {
  infoBox.style.display = 'block';
  centerInfoBox();
});

closeButton.addEventListener('click', function() {
  infoBox.style.display = 'none';
});

function centerInfoBox() {
  const width = infoBox.offsetWidth;
  const height = infoBox.offsetHeight;
  const left = (window.innerWidth - width) / 2;
  const top = (window.innerHeight - height) / 2;

  infoBox.style.left = left + 'px';
  infoBox.style.top = top + 'px';
}

window.addEventListener('resize', centerInfoBox);

const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

document.addEventListener('click', (event) => {
    if (!hamburger.contains(event.target) && !navLinks.contains(event.target)) {
        navLinks.classList.remove('active');
    }
});

const form = document.getElementById('inquireForm');
const alertDiv = document.querySelector('.alert');

const firebaseConfig = {
apiKey: "AIzaSyDeX8lk9AludQVdYgAUw_SU5GNXN1yy1Fo",
authDomain: "asebdenggtechservices.firebaseapp.com",
databaseURL: "https://asebdenggtechservices-default-rtdb.asia-southeast1.firebasedatabase.app",
projectId: "asebdenggtechservices",
storageBucket: "asebdenggtechservices.firebasestorage.app",
messagingSenderId: "888911937919",
appId: "1:888911937919:web:ff46d929055b8035129a4a"
};

firebase.initializeApp(firebaseConfig);

const inquireFormDB = firebase.database().ref("inquireForm");
const db = firebase.firestore();

document.getElementById("inquireForm").addEventListener("submit", submitForm);

function submitForm(e) {
e.preventDefault();

const name = getElementVal("name");
const email = getElementVal("email");
const message = getElementVal("message");

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

if (name === "" || email === "" || message === "") {
  alert("Please fill in all fields before submitting.");
  return;
}

if (!emailPattern.test(email)) {
  alert("Please enter a valid email address.");
  return;
}

saveMessages(name, email, message);
saveToFirestore(name, email, message);

document.querySelector(".alert").style.display = "block";

setTimeout(() => {
document.querySelector(".alert").style.display = "none";
}, 3000);

document.getElementById("inquireForm").reset();
}

const saveMessages = (name, email, message) => {
const newInquireForm = inquireFormDB.push();

newInquireForm.set({
name: name,
email: email,
message: message,
timestamp: firebase.database.ServerValue.TIMESTAMP,
});
};

const saveToFirestore = (name, email, message) => {
db.collection("inquiries").add({
name: name,
email: email,
message: message,
timestamp: firebase.firestore.FieldValue.serverTimestamp() 
})
.then(() => {
console.log("Firestore document successfully written!");
})
.catch((error) => {
console.error("Error adding Firestore document: ", error);
alert("An error occurred with Firestore. Please try again.");
});
};

const getElementVal = (id) => {
return document.getElementById(id).value;
};

