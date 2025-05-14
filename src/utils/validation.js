function isValidEmail(email) {
  const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  return emailRegex.test(email);
}

function isValidName(name) {
  return typeof name==='string' && name.length>=3;
}

function isUniqueNumericId(id, users) {
  return typeof id==='number'&& !users.some(user=> user.id===id);
}

function validateUser(user, users, update=false){
  const { name, email, id } = user;
  if (!isValidName(name)){
    return {
      isValid: false,
      error: 'The name must have at least 3 characters'
    };
  }
  if (!isValidEmail(email)) {
    return { isValid: false, error: "The email is not valid"}
  }
  if (!update) {
    if(!isUniqueNumericId(id, users)) {
      return { isValid: false, error:"The ID must be a number and unique"}
    }
  }
  return { isValid: true };
}

module.exports = {
  isValidEmail,
  isValidName,
  isUniqueNumericId,
  validateUser
};