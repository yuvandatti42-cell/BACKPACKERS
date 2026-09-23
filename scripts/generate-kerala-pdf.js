import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import fs from 'fs';
import path from 'path';

async function generateKeralaPdf() {
  const pdfDoc = await PDFDocument.create();

  // Load fonts
  const fontHelvetica = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const fontHelveticaBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const fontHelveticaOblique = await pdfDoc.embedFont(StandardFonts.HelveticaOblique);

  // Load images
  const keralaBgBytes = fs.readFileSync(path.resolve('public/dest_kerala.jpg'));
  const keralaBgImg = await pdfDoc.embedJpg(keralaBgBytes);

  const logoBytes = fs.readFileSync(path.resolve('public/logo-white.png'));
  const logoImg = await pdfDoc.embedPng(logoBytes);

  // Colors
  const darkBg = rgb(10 / 255, 18 / 255, 14 / 255);
  const goldColor = rgb(212 / 255, 163 / 255, 42 / 255);
  const whiteColor = rgb(1, 1, 1);
  const mutedWhite = rgb(0.85, 0.85, 0.85);
  const cardBg = rgb(21 / 255, 38 / 255, 29 / 255);
  const greenPill = rgb(27 / 255, 56 / 255, 41 / 255);
  const greenText = rgb(163 / 255, 230 / 255, 53 / 255);

  // A4 dimensions: 595.28 x 841.89 pt
  const width = 595.28;
  const height = 841.89;

  // ==================== PAGE 1: COVER POSTER ====================
  const page1 = pdfDoc.addPage([width, height]);

  // Draw background image scaled to fit page
  page1.drawImage(keralaBgImg, {
    x: 0,
    y: 0,
    width: width,
    height: height,
  });

  // Dark semi-transparent overlay
  page1.drawRectangle({
    x: 0,
    y: 0,
    width: width,
    height: height,
    color: darkBg,
    opacity: 0.65,
  });

  // Header Logo & Brand
  page1.drawImage(logoImg, {
    x: 40,
    y: height - 70,
    width: 36,
    height: 36,
  });

  page1.drawText('Backpackers', {
    x: 85,
    y: height - 52,
    size: 22,
    font: fontHelveticaBold,
    color: whiteColor,
  });

  page1.drawText('DESTINATIONS', {
    x: 85,
    y: height - 66,
    size: 9,
    font: fontHelveticaBold,
    color: goldColor,
  });

  page1.drawText('EXPLORE  /  TRAVEL  /  BELONG', {
    x: width - 240,
    y: height - 55,
    size: 10,
    font: fontHelveticaBold,
    color: mutedWhite,
  });

  // Header Divider
  page1.drawLine({
    start: { x: 40, y: height - 85 },
    end: { x: width - 40, y: height - 85 },
    thickness: 1,
    color: rgb(1, 1, 1),
    opacity: 0.2,
  });

  // Center Main Title Box
  page1.drawText('ESCAPE TO', {
    x: width / 2 - 50,
    y: height / 2 + 150,
    size: 16,
    font: fontHelveticaBold,
    color: goldColor,
  });

  page1.drawText('KERALA', {
    x: width / 2 - 140,
    y: height / 2 + 50,
    size: 80,
    font: fontHelveticaBold,
    color: whiteColor,
  });

  // Destination Pill
  const destTagText = 'MUNNAR   •   WAYANAD   •   ALLEPPEY';
  page1.drawRectangle({
    x: width / 2 - 170,
    y: height / 2 + 10,
    width: 340,
    height: 30,
    color: goldColor,
    opacity: 0.2,
    borderColor: goldColor,
    borderWidth: 1,
  });

  page1.drawText(destTagText, {
    x: width / 2 - 145,
    y: height / 2 + 20,
    size: 11,
    font: fontHelveticaBold,
    color: whiteColor,
  });

  page1.drawText('Mountains, Forests, Backwaters and a thousand moments.', {
    x: width / 2 - 175,
    y: height / 2 - 25,
    size: 13,
    font: fontHelveticaOblique,
    color: mutedWhite,
  });

  // Footer Feature Box
  page1.drawRectangle({
    x: 40,
    y: 40,
    width: width - 80,
    height: 100,
    color: darkBg,
    opacity: 0.9,
    borderColor: rgb(1, 1, 1),
    borderWidth: 1,
  });

  // Features list
  const features = [
    '• SCENIC LANDSCAPES',
    '• RELAXING BACKWATERS',
    '• LOCAL EXPERIENCES',
    '• RICH CULTURE',
  ];

  page1.drawText(features[0], { x: 60, y: 105, size: 10, font: fontHelveticaBold, color: whiteColor });
  page1.drawText(features[1], { x: 60, y: 70, size: 10, font: fontHelveticaBold, color: whiteColor });
  page1.drawText(features[2], { x: 220, y: 105, size: 10, font: fontHelveticaBold, color: whiteColor });
  page1.drawText(features[3], { x: 220, y: 70, size: 10, font: fontHelveticaBold, color: whiteColor });

  // Yellow Badge
  page1.drawRectangle({
    x: width - 200,
    y: 50,
    width: 140,
    height: 80,
    color: goldColor,
  });

  page1.drawText('TRIP DURATION', {
    x: width - 180,
    y: 105,
    size: 9,
    font: fontHelveticaBold,
    color: darkBg,
  });

  page1.drawText('3 DAYS / 2 NIGHTS', {
    x: width - 192,
    y: 75,
    size: 12,
    font: fontHelveticaBold,
    color: darkBg,
  });


  // ==================== PAGE 2: ITINERARY & PRICING ====================
  const page2 = pdfDoc.addPage([width, height]);

  // Dark background
  page2.drawRectangle({
    x: 0,
    y: 0,
    width: width,
    height: height,
    color: rgb(14 / 255, 26 / 255, 20 / 255),
  });

  // Header
  page2.drawText('BACKPACKERS DESTINATIONS', {
    x: 40,
    y: height - 60,
    size: 11,
    font: fontHelveticaBold,
    color: goldColor,
  });

  page2.drawText('OFFICIAL KERALA ITINERARY', {
    x: 40,
    y: height - 105,
    size: 34,
    font: fontHelveticaBold,
    color: whiteColor,
  });

  page2.drawRectangle({
    x: width - 180,
    y: height - 105,
    width: 140,
    height: 30,
    color: darkBg,
    borderColor: goldColor,
    borderWidth: 1,
  });

  page2.drawText('3 DAYS / 2 NIGHTS', {
    x: width - 165,
    y: height - 93,
    size: 10,
    font: fontHelveticaBold,
    color: goldColor,
  });

  // Subheading & Desc
  page2.drawText('Escape into the heart of God’s Own Country!', {
    x: 40,
    y: height - 150,
    size: 16,
    font: fontHelveticaOblique,
    color: goldColor,
  });

  page2.drawText(
    'Cruise through serene backwaters, sip hot chai in the rain, and wake up to endless shades of green in Kerala.',
    {
      x: 40,
      y: height - 180,
      size: 11,
      font: fontHelvetica,
      color: mutedWhite,
    }
  );

  // 3 Stat Cards
  const cardW = 160;
  const cardH = 90;
  const cardY = height - 300;

  // Card 1
  page2.drawRectangle({ x: 40, y: cardY, width: cardW, height: cardH, color: cardBg, borderColor: rgb(0.2, 0.3, 0.25), borderWidth: 1 });
  page2.drawText('03', { x: 100, y: cardY + 40, size: 36, font: fontHelveticaBold, color: goldColor });
  page2.drawText('DAYS', { x: 105, y: cardY + 20, size: 10, font: fontHelveticaBold, color: mutedWhite });

  // Card 2
  page2.drawRectangle({ x: 218, y: cardY, width: cardW, height: cardH, color: cardBg, borderColor: rgb(0.2, 0.3, 0.25), borderWidth: 1 });
  page2.drawText('02', { x: 278, y: cardY + 40, size: 36, font: fontHelveticaBold, color: goldColor });
  page2.drawText('NIGHTS', { x: 277, y: cardY + 20, size: 10, font: fontHelveticaBold, color: mutedWhite });

  // Card 3
  page2.drawRectangle({ x: 395, y: cardY, width: cardW, height: cardH, color: cardBg, borderColor: rgb(0.2, 0.3, 0.25), borderWidth: 1 });
  page2.drawText('Rs 6,999/-', { x: 425, y: cardY + 40, size: 24, font: fontHelveticaBold, color: goldColor });
  page2.drawText('STARTING FROM', { x: 432, y: cardY + 20, size: 9, font: fontHelveticaBold, color: mutedWhite });

  // Green Pill
  page2.drawRectangle({
    x: 40,
    y: height - 365,
    width: width - 80,
    height: 40,
    color: greenPill,
    borderColor: greenText,
    borderWidth: 1,
  });

  page2.drawText('STAY   •   TRAVEL   •   MEALS INCLUDED', {
    x: width / 2 - 130,
    y: height - 348,
    size: 11,
    font: fontHelveticaBold,
    color: greenText,
  });

  // Feeling Section
  page2.drawRectangle({
    x: 40,
    y: height - 510,
    width: width - 80,
    height: 120,
    color: rgb(0.08, 0.15, 0.11),
    borderColor: goldColor,
    borderWidth: 1,
  });

  page2.drawText('A FEELING, NOT JUST A DESTINATION', {
    x: 60,
    y: height - 425,
    size: 13,
    font: fontHelveticaBold,
    color: whiteColor,
  });

  page2.drawText(
    'From misty mornings to peaceful sunsets, Kerala is not just a destination — it’s a feeling.',
    {
      x: 60,
      y: height - 455,
      size: 11,
      font: fontHelvetica,
      color: mutedWhite,
    }
  );

  page2.drawText('MUNNAR   •   WAYANAD   •   ALLEPPEY', {
    x: 60,
    y: height - 485,
    size: 11,
    font: fontHelveticaBold,
    color: goldColor,
  });

  // Footer Booking Card
  page2.drawRectangle({
    x: 40,
    y: 50,
    width: width - 80,
    height: 90,
    color: goldColor,
  });

  page2.drawText('BOOK YOUR NEXT GETAWAY', {
    x: 60,
    y: 105,
    size: 20,
    font: fontHelveticaBold,
    color: darkBg,
  });

  page2.drawText('Travel with Backpackers Destinations', {
    x: 60,
    y: 80,
    size: 11,
    font: fontHelvetica,
    color: darkBg,
  });

  page2.drawRectangle({
    x: width - 210,
    y: 70,
    width: 150,
    height: 45,
    color: darkBg,
  });

  page2.drawText('+91 7207681067', {
    x: width - 198,
    y: 87,
    size: 14,
    font: fontHelveticaBold,
    color: goldColor,
  });

  // Write file to public/kerala_catalog.pdf
  const pdfBytes = await pdfDoc.save();
  const outputPath = path.resolve('public/kerala_catalog.pdf');
  fs.writeFileSync(outputPath, pdfBytes);
  console.log(`Successfully generated PDF at ${outputPath} (Size: ${pdfBytes.length} bytes)`);
}

generateKeralaPdf().catch(err => {
  console.error('Failed to generate PDF:', err);
  process.exit(1);
});
