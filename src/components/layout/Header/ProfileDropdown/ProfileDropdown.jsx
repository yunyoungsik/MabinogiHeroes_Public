'use client';

import React, { useState } from 'react';
import { PenLine } from 'lucide-react';
import styles from './ProfileDropdown.module.scss';
import LineButton from '@/components/ui/Button/LineButton';
import IconButton from '@/components/ui/Button/IconButton';

const ProfileDropdown = ({ authUser, handleLogout, handleDelete, handleModify }) => {
  const { username = 'Unknown', email } = authUser || {};
  const [editName, setEditName] = useState('');
  const isEditing = editName !== '';

  // 수정 모드 활성화
  const handleEditClick = () => setEditName(username);

  return (
    <div className={styles.profileDropdown}>
      {isEditing ? (
        // ✅ 편집 모드 UI
        <div className={styles.editBox}>
          <input
            value={editName}
            placeholder="닉네임(2~10글자)"
            minLength={2}
            maxLength={10}
            onChange={(e) => setEditName(e.target.value)}
          />
          <div className={styles.buttonGroup}>
            <LineButton handler={() => setEditName('')}>취소</LineButton>
            <LineButton handler={() => handleModify(editName)}>변경</LineButton>
          </div>
        </div>
      ) : (
        // ✅ 기본 모드 UI
        <>
          <div className={styles.profile}>
            <div className={styles.name}>
              <h2 className={styles.username}>{username}</h2>
              <IconButton handler={handleEditClick} className={styles.edit}>
                <PenLine size={16} stroke="#8b95a1" />
              </IconButton>
            </div>
            <div className={styles.email}>
              <p>{email}</p>
              <button className={styles.delete} onClick={handleDelete}>
                회원탈퇴
              </button>
            </div>
          </div>

          <div className={styles.buttonGroup}>
            <LineButton padding={'var(--space-1) var(--space-2)'} handler={handleLogout}>로그아웃</LineButton>
          </div>
        </>
      )}
    </div>
  );
};

export default ProfileDropdown;
