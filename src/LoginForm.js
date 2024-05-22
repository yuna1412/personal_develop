import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function LoginForm({ onSignIn }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!username || !password) {
      setError('ユーザー名またはパスワードが入力されていません');
      return;
    }

    console.log(username);
    console.log(password);

    setLoading(true);

    try {
      const response = await fetch('http://localhost:8080/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      });

      console.log(response);

      if (!response.ok) {
        throw new Error('そのアカウントは存在しません');
      }
      const userData = await response.json();
      console.log('ログインに成功しました:', userData);
      onSignIn(username);
      setUsername('');
      setPassword('');
      navigate('/AccountPage');
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setError(null);
  }, [username, password]); // 入力が変更されるたびにエラーをクリア

  const handleLogout = () => {
    navigate("/");
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
        <button onClick={handleLogout}>新規登録</button>
        <button type="submit" disabled={loading}>
          {loading ? '処理中...' : 'ログイン'}
        </button>
        {error && <p>{error}</p>}
      </form>
    </div>
  );
}

export default LoginForm;
