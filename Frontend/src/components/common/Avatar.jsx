function Avatar({
  size,
  bgColor,
  textColor,
  textSize,
  fontWeight,
  fullName,
  imageURL = null,
}) {
  if (imageURL)
    return (
      <img
        src={imageURL}
        alt="User"
        className="rounded-full object-center object-cover"
        style={{ width: `${size}px`, height: `${size}px` }}
      />
    );

  return (
    <div
      className={`${bgColor} ${textColor} ${textSize} ${fontWeight} rounded-full flex items-center justify-center`}
      style={{ width: `${size}px`, height: `${size}px` }}
    >
      {fullName.charAt(0)}
    </div>
  );
}

export default Avatar;
