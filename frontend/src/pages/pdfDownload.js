import { jsPDF } from 'jspdf';

const pdfDownload = (courseName, userName) => {
    const doc = new jsPDF();

    // const doc = new jsPDF({ orientation: 'landscape' });
    // doc.setFontSize(16);
    // doc.text('Hello from jsPDF!', 20, 30);
    // doc.setFontSize(12);
    // doc.text('This is a sample PDF document generated using jsPDF in a React app.', 20, 40);
    // doc.text('You can add more text, images, or even custom styling.', 20, 50);

    // Set background color (pale blue)
    doc.setFillColor(200, 220, 255); // RGB for a pale blue
    doc.rect(0, 0, doc.internal.pageSize.getWidth(), doc.internal.pageSize.getHeight(), 'F');

    // Sample data (replace with real data)
    const studentName = "John Doe";
    const courseTitle = "Introduction to JavaScript";
    const completionDate = new Date().toLocaleDateString();

    // Set font styles
    doc.setFont("Helvetica", "bold");
    doc.setFontSize(24);
    doc.text("Certificate of Completion", 105, 25, { align: "center" });

    doc.setFontSize(16);
    doc.setFont("Helvetica", "normal");
    doc.text(`This certifies that`, 105, 45, { align: "center" });

    doc.setFontSize(20);
    doc.setFont("Helvetica", "bold");
    doc.text(studentName, 105, 60, { align: "center" });

    doc.setFontSize(16);
    doc.setFont("Helvetica", "normal");
    doc.text(`has successfully completed the course`, 105, 75, { align: "center" });

    doc.setFontSize(18);
    doc.setFont("Helvetica", "bold");
    doc.text(courseTitle, 105, 90, { align: "center" });

    doc.setFontSize(14);
    doc.setFont("Helvetica", "normal");
    doc.text(`Date of Completion: ${completionDate}`, 105, 110, { align: "center" });

    // Optional signature line
    doc.text("_____________________", 40, 140);
    doc.text("Instructor Signature", 40, 150);

    doc.save(`${courseName}-certificate.pdf`); // Trigger download
};

export default pdfDownload