import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function LoginForm({ onSignIn }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // useNavigateフックを使って遷移処理を行う

  const handleSubmit = async (event) => {
    event.preventDefault();
    // ユーザー名とパスワードが空でない場合のみ処理を続行
    if (!username || !password) {
      alert('ユーザー名またはパスワードが入力されていません');
      return;
    }
    try {
      const response = await fetch('http://localhost:8080/users/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      });

      if (!response.ok) {
        throw new Error('Failed to add user');
      }

      console.log('ユーザーが追加されました');
      onSignIn(username); // ユーザーが追加されたら、親コンポーネントにusernameを渡す
      setUsername('');
      setPassword('');
      navigate('/AccountPage'); // ユーザーが追加された後、AccountPageに遷移する
    } catch (error) {
      console.error('エラー:', error.message);
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
