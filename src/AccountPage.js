import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AccountPage({ signedInUsername, onDeleteAccount }) {
  const [confirmDelete, setConfirmDelete] = useState(false);
  const navigate = useNavigate();

  const handleDeleteAccount = async () => {
    try {
      const response = await fetch(`http://localhost:8080/users/${signedInUsername}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username: signedInUsername })
      });
      if (!response.ok) {
        throw new Error('Failed to delete account');
      }
      // アカウントが削除されたことを通知
      onDeleteAccount(); // signedInUsernameを空にする
      setConfirmDelete(false); // 確認ダイアログを閉じる
      navigate("/");
      console.log("アカウントが削除されました。");
    } catch (error) {
      console.error('アカウントの削除中にエラーが発生しました:', error);
    }
  };

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <div>
      <h3>ログイン中: {signedInUsername}</h3>
      <button onClick={handleLogout}>ログアウト</button>
      {confirmDelete ? (
        <div>
          <p>本当にアカウントを削除しますか？</p>
          <button onClick={handleDeleteAccount}>はい</button>
          <button onClick={() => setConfirmDelete(false)}>いいえ</button>
        </div>
      ) : (
        <button onClick={() => setConfirmDelete(true)}>アカウントを削除する</button>
      )}
    </div>
  );
}

export default AccountPage;
