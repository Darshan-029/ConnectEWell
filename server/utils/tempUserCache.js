const tempUsers = new Map();

function setTempUser(userId) {
  tempUsers.set("vapi-user", {
    userId,
    expires: Date.now() + 10 * 60 * 1000,
  });
}

function getTempUser() {
  const data = tempUsers.get("vapi-user");
  if (data && data.expires > Date.now()) {
    return data.userId;
  }
  return null;
}

module.exports = { setTempUser, getTempUser };
