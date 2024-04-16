const User = require("./models/userModel");
const adminSeeder = async () => {
  //check whether admin exist or not

  const isAdminExists = await User.findOne({
    email: "admin@gmail.com",
  });
  if (!isAdminExists) {
    await User.create({
      name: "Admin Admin",
      email: "admin@gmail.com",
      password: "addmin@2177",
      role: "admin",
    });
    console.log("Admin Created successfully: admin@gmail.com, pw:admin@2177");
  } else {
    console.log("Admin Credential: admin@gmail.com, pw:admin@2177");
  }
};
module.exports = adminSeeder;
