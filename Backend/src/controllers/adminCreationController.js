const crypto = require("crypto");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const User = require("../models/userModel");
const { sendAdminWelcomeEmail } = require("../utils/email");

exports.createAdmin = catchAsync(async (req, res, next) => {
  const { email, name, phone } = req.body;

  let user = await User.findOne({ email });

  // Split name into first and last name
  const [firstName = "", ...rest] = name.trim().split(" ");
  const lastName = rest.join(" ") || "";

  /**
   * CASE 1: User exists but is not admin
   * Update role and missing fields
   */
  if (user && user.role !== "admin") {
    user.role = "admin";
    user.firstName = user.firstName || firstName;
    user.lastName = user.lastName || lastName;
    user.phone = user.phone || phone;
    await user.save();

    // Send email to inform user of admin promotion (no password needed)
    await sendAdminWelcomeEmail({
      user: {
        email: user.email,
        firstName: user.firstName,
      },
    });

    return res.status(200).json({
      isSuccess: true,
      message: "User role updated to admin and welcome email sent.",
      data: {
        id: user._id,
        email: user.email,
      },
    });
  }

  /**
   * CASE 2: User exists and is already admin
   */
  if (user && user.role === "admin") {
    return res.status(400).json({
      isSuccess: false,
      message: "User is already an admin.",
    });
  }

  /**
   * CASE 3: User doesn't exist, create with temporary password
   */
  const tempPassword = crypto.randomBytes(6).toString("hex");

  user = await User.create({
    firstName,
    lastName,
    email,
    phone,
    password: tempPassword,
    role: "admin",
  });

  // Send email with the temporary password
  await sendAdminWelcomeEmail({
    user: {
      email: user.email,
      firstName: user.firstName,
    },
    tempPassword,
  });

  return res.status(201).json({
    isSuccess: true,
    message: "Admin created and welcome email sent successfully.",
    data: {
      id: user._id,
      email: user.email,
    },
  });
});

// DELETE ADMIN
exports.deleteAdmin = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const user = await User.findById(id);
  if (!user) {
    return next(new AppError("No Admin found with that ID", 404));
  }

  if (user.role !== "admin") {
    return next(new AppError("This user is not an admin", 400));
  }

  await User.findByIdAndDelete(id);

  res.status(200).json({
    status: "success",
    message: "Admin deleted successfully",
  });
});

exports.getUsers = catchAsync(async (req, res, next) => {
  const { search, role, sort, startDate, endDate } = req.query;

  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 10;
  const skip = (page - 1) * limit;

  const baseFilter = { isDeleted: false };
  const filterConditions = [baseFilter];

  if (role) {
    filterConditions.push({ role });
  }

  if (search) {
    filterConditions.push({
      $or: [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
      ],
    });
  }

  if (startDate && endDate) {
    const start = new Date(startDate).setUTCHours(0, 0, 0, 0);
    const end = new Date(endDate).setUTCHours(23, 59, 59, 999);

    filterConditions.push({
      createdAt: {
        $gte: start,
        $lte: end,
      },
    });
  }

  const finalFilter =
    filterConditions.length > 1 ? { $and: filterConditions } : baseFilter;

  const sortOrder = { createdAt: sort === "desc" ? -1 : 1 };

  const [users, total] = await Promise.all([
    User.find(finalFilter)
      .sort(sortOrder)
      .skip(skip)
      .limit(limit)
      .select(
        "firstName lastName email phone createdAt updatedAt role priority "
      ),
    User.countDocuments(finalFilter),
  ]);

  res.status(200).json({
    status: "success",
    results: users.length,
    total,
    page,
    totalPages: Math.ceil(total / limit),
    data: { users },
  });
});
