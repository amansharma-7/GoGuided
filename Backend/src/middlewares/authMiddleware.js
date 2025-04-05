exports.auth = async (req, res, next) => {
  try {
    // console.log("data is", req.body);
    const token =
      req.cookies.token ||
      req.header("Authorization").replace("Bearer ", "") ||
      req.body.token;
    if (!token) {
      return res.status(401).json({
        success: false,
      });
    }

    // verify the token
    try {
      const decode = jwt.verify(token, process.env.JWT_SECRET);
    } catch (e) {
      return res.status(401).json({
        success: false,
        message: "token is invalid",
      });
    }
    next();
  } catch (err) {
    // console.log(err);
    return res.status(401).json({
      success: false,
      message: "Something went wrong while verifying token",
    });
  }
};
