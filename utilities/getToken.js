export const getToken = () => {
    const token = localStorage.getItem("token");
  
    if (!token) {
      throw new Error("Token no disponible");
    }
  
    return {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    };
  };