const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Account must have a name"],
    },
    email: {
      type: String,
      required: [true, "Account must have an email"],
      unique: true,
      lowercase: true,
    },
    phone: {
      type: String,
      required: [true, "Phone number is required."],
    },
    password: {
      type: String,
      required: [true, "Account must have a password"],
      minlength: 8,
      select: false,
    },
    profilePicture: {
      public_id: {
        type: String,
      },
      secure_url: {
        type: String,
      },
    },
    role: {
      type: String,
      enum: ["user", "guide", "admin"],
      default: "user",
    },
    emailVerificationToken: String,
    emailVerificationTokenExpires: Date,
    resetPasswordToken: String,
    resetPasswordTokenExpires: Date,
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    lastLoggedIn: { type: Date },
    bookings: [{ type: mongoose.Schema.Types.ObjectId, ref: "Booking" }],
    experience: {
      type: Number,
      default: 0,
      min: 0,
    },
    bookings: [{ type: mongoose.Schema.Types.ObjectId, ref: "Booking" }],
    numberOfTours: {
      type: Number,
      default: 0,
    },
    lastTour: {
      type: String,
      default: null,
    },
    status: {
      type: String,
      default: "available",
      enum: ["available", "unavailable"],
    },
  },
  {
    timestamps: true,
  }
);

// Hash password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// Password check method
userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

const User = mongoose.model("User", userSchema);

module.exports = User;
