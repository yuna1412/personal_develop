import React, { useState } from "react";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import './App.css';
import SigninForm from './SigninForm';
import AccountPage from './AccountPage';
import LoginForm from "./LoginForm";

function App() {
  const [signedInUsername, setSignedInUsername] = useState('');

  const handleSignIn = (username) => {
    setSignedInUsername(username);
  };

  const handleDeleteAccount = () => {
    setSignedInUsername(''); // アカウントが削除されたらsignedInUsernameを空にする
  };

  return (
    <BrowserRouter>
      <div className="App">
              <Link to="/"/>
              <Link to="/LoginForm"/>
              <Link to="/AccountPage"/>
          <Routes>
            <Route
              path="/"
              element={<SigninForm onSignIn={handleSignIn} />} // onSignInを渡す
            />
            <Route 
              path="/LoginForm" 
              element={<LoginForm signedInUsername={signedInUsername} onDeleteAccount={handleDeleteAccount} />} // signedInUsernameとonDeleteAccountを渡す
            />
            <Route 
              path="/AccountPage" 
              element={<AccountPage signedInUsername={signedInUsername} onDeleteAccount={handleDeleteAccount} />} // signedInUsernameとonDeleteAccountを渡す
            />
            {/* サインインページへのリダイレクト */}
            <Route path="/*" element={<SigninForm onSignIn={handleSignIn} />} />
          </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
