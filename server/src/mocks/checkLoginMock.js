// Mock implementation of checkLogin middleware
const checkLoginMock = (req, res, next) => {
  // Simulate user is logged in by attaching a fake user object to the request
  req.user = { id: "123", username: "testUser" };
  next();
};
module.exports = checkLoginMock;
