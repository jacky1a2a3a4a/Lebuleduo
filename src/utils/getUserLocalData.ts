/**
 * 從 localStorage 獲取 UsersID
 * @returns {number | null} 返回 UsersID 或 null（如果不存在）
 */
export const getUsersID = (): number | null => {
  const usersID = localStorage.getItem('UsersID');
  return usersID ? Number(usersID) : null;
};

/**
 * 從 localStorage 獲取 UserName
 * @returns {string | null} 返回 UserName 或 null（如果不存在）
 */
export const getUserName = (): string | null => {
  const userData = JSON.parse(localStorage.getItem('user_data') || '{}');
  return userData.displayName || null;
};

/**
 * 設置 UsersID 到 localStorage
 * @param {string} usersID - 要設置的 UsersID
 */
export const setUsersID = (usersID: string): void => {
  localStorage.setItem('UsersID', usersID);
};

/**
 * 從 localStorage 移除 UsersID
 */
export const removeUsersID = (): void => {
  localStorage.removeItem('UsersID');
};
