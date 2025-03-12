'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useAuthStore } from '@/store/useAuthStore';
import ProfileIcon from '../ProfileIcon/ProfileIcon';
import ProfileDropdown from '../ProfileDropdown/ProfileDropdown';
import styles from './UserProfile.module.scss';

const UserProfile = () => {
  const dropdownRef = useRef(null); // 드롭다운 참조
  const [toggleDropdown, setToggleDropdown] = useState(false);
  const [editName, setEditName] = useState('');
  const { authUser, logout, deleteAccount, modifyAccount } = useAuthStore();

  // 영역 밖 클릭 시 드롭다운 닫기
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setToggleDropdown(false);
      }
    };

    if (toggleDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [toggleDropdown]);

  // 로그아웃
  const handleLogout = () => {
    setToggleDropdown(false);
    logout();
  };

  // 회원탈퇴
  const handleDelete = async () => {
    const hasConfirmed = confirm('정말로 탈퇴하시겠습니까?');

    if (hasConfirmed) {
      try {
        await deleteAccount(authUser?.id);
        setToggleDropdown(false);
        logout();
      } catch (error) {
        console.error('Header Delete User Error', error);
      }
    }
  };

  // 닉네임 변경
  const handleModify = async () => {
    if (!editName.trim()) {
      alert('닉네임을 입력해 주세요.');
      return;
    }

    if (editName === authUser?.username) {
      alert('기존 닉네임과 동일합니다.');
      return;
    }

    const hasConfirmed = confirm('닉네임을 변경하시겠습니까?');

    if (hasConfirmed) {
      try {
        const res = await modifyAccount({ userId: authUser?.id, username: editName });
        alert(`닉네임이 "${res.user.username}"(으)로 변경되었습니다.`);
        setEditName('');
        setToggleDropdown(false);
      } catch (error) {
        alert(error);
        console.error('Header Update Name Error', error);
      }
    }
  };

  return authUser ? (
    <div className={styles.userProfile} ref={dropdownRef}>
      <ProfileIcon username={authUser?.username} setToggleDropdown={setToggleDropdown} />
      {toggleDropdown && (
        <ProfileDropdown
          authUser={authUser}
          editName={editName}
          setEditName={setEditName}
          handleLogout={handleLogout}
          handleDelete={handleDelete}
          handleModify={handleModify}
        />
      )}
    </div>
  ) : (
    <Link href="/auth" className={styles.loginBtn}>
      로그인
    </Link>
  );
};

export default UserProfile;
