import { useRef, useState, useEffect } from 'react';
import './App.css';

import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { collection, query, orderBy, limit, addDoc, serverTimestamp } from 'firebase/firestore';
import { GoogleAuthProvider, signInWithPopup, getAuth } from 'firebase/auth';


import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollection } from 'react-firebase-hooks/firestore';

// firebase API keys GET from .env file
// function useFirebaseInit() {
//   const [firebaseConfig, setFirebaseConfig] = useState(null);

//   const fetchConfig = async () => {
//     const response = await fetch('http://localhost:8000/env-vars');
//     const envVars = await response.json();
//     console.log(envVars);
//     setFirebaseConfig(envVars);
//   };

//   useEffect(() => {
//     fetchConfig();
//   }, []);

//   useEffect(() => {
//     if (firebaseConfig) {
//       const app = initializeApp(firebaseConfig);
//     }
//   }, [firebaseConfig]);

// }

const firebaseConfig = {
  // config here
};

const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
const auth = getAuth(app);

function App() {
  const [user] = useAuthState(auth);

  return (
    <div className="App">
      <header>
        <h1>glblcht</h1>
        <SignOut />
      </header>

      <section>{user ? <ChatRoom /> : <SignIn />}</section>
    </div>
  )
}


function SignIn() {
  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider);
  };

  return (
    <>
      <button className="sign-in" onClick={signInWithGoogle}>
        Sign in with Google
      </button>
      <p style={{textAlign: 'center'}}>
        Do not violate the community guidelines or you will be banned for life!
      </p>
    </>
  );
}


function SignOut() {
  return (
    auth.currentUser && (
      <button className="sign-out" onClick={() => auth.signOut()}>
        Sign Out
      </button>
    )
  );
}

function ChatRoom() {
  const dummy = useRef();

  const messagesRef = collection(firestore, 'messages');
  const messagesQuery = query(messagesRef, orderBy('createdAt'), limit(20));

  const [snapshot] = useCollection(messagesQuery);

  const messages = snapshot
    ? snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
    : [];

  const [formValue, setFormValue] = useState('');

  const sendMessage = async (e) => {
    e.preventDefault();

    const { uid, photoURL } = auth.currentUser;

    await addDoc(messagesRef, {
      text: formValue,
      createdAt: serverTimestamp(),
      uid,
      photoURL,
    });
    setFormValue('');
    dummy.current.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <main>
      <div className="chatRoom">
        {messages &&
          messages.map((msg) => <ChatMessage key={msg.id} message={msg} />)}
        <div ref={dummy}></div>
      </div>


      <form onSubmit={sendMessage}>
        <input
          value={formValue}
          onChange={(e) => setFormValue(e.target.value)}
          placeholder="Say something kind"
        />

        <button type="submit" disabled={!formValue}>
          Send
        </button>
      </form>
    </main>
  );
}


function ChatMessage(props) {
  const { text, uid, photoURL } = props.message;

  const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received';

  return (
    <>
      <div className={`message ${messageClass}`}>
        <img
          src={
            photoURL ||
            'https://api.adorable.io/avatars/23/abott@adorable.png'
          }
        />
        <p>{text}</p>
      </div>
    </>
  );
}

export default App
