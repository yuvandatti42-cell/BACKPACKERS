/**
 * Helper utility to open any PDF in a new browser tab for immediate viewing
 * while simultaneously triggering the file download to the user's device.
 */
export const openAndDownloadPdf = (pdfUrl?: string, customFilename?: string): void => {
  if (!pdfUrl) return;

  const cleanUrl = pdfUrl.trim();
  if (!cleanUrl) return;

  const filename = customFilename || cleanUrl.split('/').pop() || 'catalog.pdf';
  const downloadName = filename.endsWith('.pdf') ? filename : `${filename}.pdf`;

  // 1. Open the PDF in a new tab for immediate full-screen viewing
  const newTab = window.open(cleanUrl, '_blank', 'noopener,noreferrer');
  if (newTab) {
    newTab.focus();
  }

  // 2. Trigger instant download of the file
  const link = document.createElement('a');
  link.href = cleanUrl;
  link.download = downloadName;
  link.target = '_blank';
  link.rel = 'noopener noreferrer';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
