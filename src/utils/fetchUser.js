// eslint-disable-next-line import/prefer-default-export
export const fetchUser = () => {
  const userInfo =
    localStorage.getItem('user') !== 'undefined'
      ? localStorage.getItem('user')
      : localStorage.clear();
  return userInfo;
};
