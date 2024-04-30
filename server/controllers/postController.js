const registerController = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name) {
      return res
        .status(400)
        .send({ success: false, message: "Name is required" });
    }

    if (!email) {
      return res
        .status(400)
        .send({ success: false, message: "Email is required" });
    }

    if (!password || password.length < 6) {
      return res.status(400).send({
        success: false,
        message: "Password is required and must be at least 6 characters long",
      });
    }

    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(500).send({
        success: false,
        message: "User already registered with this email",
      });
    }

    const hashedPassword = await hashPassword(password); // Şifreyi hash'le

    const user = await new userModel({
      name,
      email,
      password: hashedPassword,
    }).save(); // Kullanıcıyı kaydet

    res.status(201).send({
      success: true,
      message: "Registration successful, please log in",
    });
  } catch (error) {
    console.error("Error during registration:", error);
    return res.status(500).send({
      success: false,
      message: "Error in register API",
      error,
    });
  }
};
