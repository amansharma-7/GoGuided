const { PDFDocument, rgb, StandardFonts } = require("pdf-lib");
const fs = require("fs");

async function createReceipt(data) {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([595, 842]); // A4 size
  const { width, height } = page.getSize();

  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

  // Green theme color
  const greenColor = rgb(0.0, 0.5, 0.2);

  let y = height - 50;

  // Header
  page.drawText("Your Company Name", {
    x: 50,
    y,
    size: 16,
    font: fontBold,
    color: greenColor,
  });
  y -= 20;

  page.drawText(
    "Company Address | Phone: 1234567890 | Email: info@company.com",
    {
      x: 50,
      y,
      size: 10,
      color: rgb(0, 0, 0),
    }
  );
  y -= 30;

  // Title
  page.drawText("RECEIPT", {
    x: width / 2 - 40,
    y,
    size: 18,
    font: fontBold,
    color: greenColor,
  });
  y -= 30;

  // Receipt Info
  page.drawText(`Receipt Number: ${data.receipt_number}`, {
    x: 50,
    y,
    size: 12,
  });
  y -= 20;
  page.drawText(`Date of Issue: ${new Date().toISOString().slice(0, 10)}`, {
    x: 50,
    y,
    size: 12,
  });
  y -= 30;

  // Billed To
  page.drawText("Billed To:", {
    x: 50,
    y,
    size: 12,
    font: fontBold,
    color: greenColor,
  });
  y -= 20;
  page.drawText(`Name: ${data.user_name}`, { x: 50, y, size: 12 });
  y -= 15;
  page.drawText(`Email: ${data.user_email}`, { x: 50, y, size: 12 });
  y -= 15;
  page.drawText(`Phone: ${data.user_phone}`, { x: 50, y, size: 12 });
  y -= 30;

  // Booking Details
  page.drawText("Booking Details:", {
    x: 50,
    y,
    size: 12,
    font: fontBold,
    color: greenColor,
  });
  y -= 20;
  page.drawText(`Booking ID: ${data.booking_id}`, { x: 50, y, size: 12 });
  y -= 15;
  page.drawText(`Service: ${data.service_description}`, { x: 50, y, size: 12 });
  y -= 15;
  page.drawText(`Date of Service: ${data.service_date}`, {
    x: 50,
    y,
    size: 12,
  });
  y -= 15;
  page.drawText(`Location: ${data.location}`, { x: 50, y, size: 12 });
  y -= 15;
  page.drawText(`Number of Members: ${data.members.length}`, {
    x: 50,
    y,
    size: 12,
  });
  y -= 30;

  // Member Details
  page.drawText("Member Details:", {
    x: 50,
    y,
    size: 12,
    font: fontBold,
    color: greenColor,
  });
  y -= 20;

  // Table headers
  const headers = ["S.No", "Name", "Age", "Gender", "Notes"];
  let x = 50;
  headers.forEach((header) => {
    page.drawText(header, { x, y, size: 10, font: fontBold });
    x += 90;
  });
  y -= 15;

  // Table data
  data.members.forEach((member, index) => {
    let x = 50;
    const row = [
      String(index + 1),
      member.name,
      String(member.age),
      member.gender,
      member.notes || "-",
    ];
    row.forEach((cell) => {
      page.drawText(cell, { x, y, size: 10 });
      x += 90;
    });
    y -= 15;
  });

  y -= 30;

  // Payment Details
  page.drawText("Payment Details:", {
    x: 50,
    y,
    size: 12,
    font: fontBold,
    color: greenColor,
  });
  y -= 20;
  page.drawText(`Payment Method: ${data.payment_method}`, {
    x: 50,
    y,
    size: 12,
  });
  y -= 15;
  page.drawText(`Transaction ID: ${data.transaction_id}`, {
    x: 50,
    y,
    size: 12,
  });
  y -= 15;
  page.drawText(`Amount Paid: ₹${data.amount_paid}`, { x: 50, y, size: 12 });
  y -= 15;
  page.drawText(`Tax: ₹${data.tax}`, { x: 50, y, size: 12 });
  y -= 15;
  page.drawText(`Total: ₹${data.total}`, { x: 50, y, size: 12 });
  y -= 30;

  // Remarks
  if (data.remarks) {
    page.drawText("Remarks:", {
      x: 50,
      y,
      size: 12,
      font: fontBold,
      color: greenColor,
    });
    y -= 15;
    page.drawText(data.remarks, { x: 50, y, size: 12 });
  }

  const pdfBytes = await pdfDoc.save();
  return pdfBytes;
}
