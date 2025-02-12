import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';

const CertificateGenerator = ({ userName = "John Doe", projectName = "Sample Project" }) => {
  const canvasRef = useRef(null);
  const [certificateImage, setCertificateImage] = useState(null);

  const generateCertificate = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    // Set canvas dimensions
    canvas.width = 800;
    canvas.height = 600;

    // Background
    ctx.fillStyle = '#f0f0f0';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Border
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 10;
    ctx.strokeRect(20, 20, canvas.width - 40, canvas.height - 40);

    // Title
    ctx.font = 'bold 36px Arial';
    ctx.fillStyle = '#000';
    ctx.textAlign = 'center';
    ctx.fillText('CERTIFICATE OF COMPLETION', canvas.width / 2, 100);

    // Certification Text
    ctx.font = '24px Arial';
    ctx.fillText('This is to certify that', canvas.width / 2, 200);

    // Name
    ctx.font = 'bold 32px Arial';
    ctx.fillText(`Mr/Mrs. ${userName}`, canvas.width / 2, 250);

    // Project Text
    ctx.font = '24px Arial';
    ctx.fillText(`has completed his/her contribution to the project`, canvas.width / 2, 300);

    // Project Name
    ctx.font = 'bold 28px Arial';
    ctx.fillText(projectName, canvas.width / 2, 350);

    // Convert to image
    const dataURL = canvas.toDataURL('image/png');
    setCertificateImage(dataURL);
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <canvas ref={canvasRef} className="hidden" />
      <Button onClick={generateCertificate} className="mb-4">
        Generate Certificate
      </Button>
      {certificateImage && (
        <div>
          <img 
            src={certificateImage} 
            alt="Generated Certificate" 
            className="max-w-full border-2 border-gray-300"
          />
          <a 
            href={certificateImage} 
            download={`Certificate_${userName.replace(/\s+/g, '_')}.png`} 
            className="mt-2 inline-block px-4 py-2 bg-blue-500 text-white rounded"
          >
            Download Certificate
          </a>
        </div>
      )}
    </div>
  );
};

export default CertificateGenerator;