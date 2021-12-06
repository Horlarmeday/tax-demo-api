import { degrees, PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import fs from 'fs';
import axios from 'axios';

export async function createAndModifyPdf() {
  const url = 'http://olatechfolio.rf.gd/images/projects/TCC.pdf';
  const existingPdfBytes = await axios.get(url);

  const pdfDoc = await PDFDocument.load(existingPdfBytes.data);
  const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);

  const pages = pdfDoc.getPages();
  const firstPage = pages[0];
  const { width, height } = firstPage.getSize();
  firstPage.drawText('This is the modified version', {
    x: 5,
    y: height / 2 + 300,
    size: 50,
    font: helveticaFont,
    color: rgb(0.95, 0.1, 0.1),
    rotate: degrees(-45),
  });

  const pdfBytes = await pdfDoc.save();
  await fs.writeFileSync('tax.pdf', pdfBytes);
}
