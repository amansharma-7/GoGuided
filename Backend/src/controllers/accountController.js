const catchAsync = require("../../utils/catchAsync");
const Account = require("../models/accountModel");
const AppError = require("../../utils/appError");
const { VALID_ROLES, RECORDS_PER_PAGE } = require("../../utils/constants");

exports.getAccountsByRole = catchAsync(async (req, res, next) => {
  const { role } = req.params;
  const inputRole = role?.trim().toLowerCase();

  if (!inputRole || !VALID_ROLES.includes(inputRole)) {
    return next(new AppError(`Invalid role: ${role}`, 400));
  }

  const roleSelectFields = {
    user: "name email phone lastLoggedIn",
    guide: "name email phone lastLoggedIn",
    admin: "name email phone lastLoggedIn role",
    superadmin: "name email phone lastLoggedIn role",
  };

  // Pagination
  const page = parseInt(req.query.page, 10) || 1;
  const limit = RECORDS_PER_PAGE;
  const skip = (page - 1) * limit;

  const totalCount = await Account.countDocuments({ role: inputRole });
  const totalPages = Math.ceil(totalCount / limit);

  if (page > totalPages && totalPages !== 0) {
    return next(
      new AppError(`Page ${page} exceeds total pages (${totalPages})`, 400)
    );
  }

  let accounts = await Account.find({ role: inputRole })
    .skip(skip)
    .limit(limit)
    .select(roleSelectFields[inputRole]);

  if (!accounts.length) {
    return next(new AppError(`No accounts found for role: ${role}`, 404));
  }

  // Flatten populated user into account object
  accounts = accounts.map((account) => {
    const accountObj = account.toObject();
    const { user, ...rest } = accountObj;
    return {
      ...rest,
      ...(user || {}), // Spread safely
    };
  });

  res.status(200).json({
    status: "success",
    results: accounts.length,
    totalCount,
    totalPages,
    currentPage: page,
    data: { accounts },
  });
});
