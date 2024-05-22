import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function LoginForm({ onSignIn }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!username || !password) {
      alert('ユーザー名またはパスワードが入力されていません');
      return;
    }

    try {
      const response = await fetch('http://localhost:8080/users/find?find=' + username, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Failed to find user');
      }

      const userData = await response.json();
      if (userData.length === 0 || userData[0].password !== password) {
        throw new Error('Invalid username or password');
      }

      onSignIn(username);
      setUsername('');
      setPassword('');
      navigate('/AccountPage');
    } catch (error) {
      console.error('エラー:', error.message);
      alert('ログインに失敗しました: ' + error.message);
    }
  };

  return (
    <div>
      <h2>ログイン</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">ユーザー名:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">パスワード:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">ログイン</button>
      </form>
    </div>
  );
}

export default LoginForm;
