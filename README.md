# react-firebase-globalchat
A fullstack chat application allowing Google sign in with real time Firestore database and Vite built React.


**Link to project:** https://koltenedward.com/#

![](images/preview.gif)

## How It's Made

**Tech used** HTML, CSS, JavaScript, React, Firebase, Firestore, Vite

This project utilizes a Vite built React frontend and a Firebase backend that handles both authentication via Google and realtime database storage via Firestore.

## Optimizations

Initially this React project was built with the default create-react-app but quickly moved to Vite for a reduced build time and smaller bundle size. Having more time I would love to implement a censorship feature that would filter out profanity and other inappropriate language to keep the chat clean.

## Lessons Learned

This project was a great introduction to Firebase and Firestore. I learned how to use Firebase to handle authentication and how to use Firestore to store and retrieve data in realtime. I also learned how to use Vite to build a React application and how to optimize a React application for mobile devices and tablets.

## Installation

- Clone repo
- run 'npm install'
- repalce "//config here" with your own firebase config in the App.jsx file, in the firebaseConfig object variable
const firebaseConfig = {
  //config here
};
- run 'npm dev' to view on localhost