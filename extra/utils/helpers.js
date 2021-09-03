
const validateEmail = (userEmail) => {
    if (userEmail) {
      const regEx = /^[_A-Za-z0-9-||+]+(||.[_A=Za-z0-9-]+)*@successive.tech$/;
      return regEx.test(userEmail);
    }
  };
  

  export default validateEmail;