'use client';

import CurvedLoop from './CurvedLoop';

const ServicesQuotation = () => {
  return (
    <div className='bg-black'>
     

      {/* With custom props */}
      <CurvedLoop 
        marqueeText="WEB✦ APP ✦ AI ✦ DESIGN ✦ CLOUD ✦ DIGITAL ✦ BLOCKCHAIN ✦ "
        speed={3}
        curveAmount={-100} // Significantly reduced from 300
        direction="right"
        interactive={true}
        className="custom-text-style"
      />

      
    </div>
  );
};

export default ServicesQuotation;