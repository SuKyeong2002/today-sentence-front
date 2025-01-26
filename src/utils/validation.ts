export const validateEmail = (email: string): boolean => {
    const emailRegex =
      /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailRegex.test(email);
  };
  
  export const validateNickname = (nickname: string): boolean => {
    return nickname.length >= 2;
  };
  
  export const validatePassword = (password: string): boolean => {
    return password.length >= 8;
  };