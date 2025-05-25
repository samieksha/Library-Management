export const getUsers = () => {
    return JSON.parse(localStorage.getItem("users")) || [];
  };
  
  export const saveUsers = (users) => {
    localStorage.setItem("users", JSON.stringify(users));
  };
  
  export const getLoggedInUser = () => {
    try {
      const item = localStorage.getItem("loggedInUser");
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error("Failed to parse loggedInUser from localStorage", error);
      return null;
    }
  };
  
  export const setLoggedInUser = (user) => {
    localStorage.setItem("loggedInUser", JSON.stringify(user));
  };

  export const logoutUser = () => {
    localStorage.removeItem("loggedInUser");
  };