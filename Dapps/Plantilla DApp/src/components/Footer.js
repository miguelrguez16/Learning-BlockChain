import React from "react";

const MyFooter = () => (
  <footer style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }} className='text-center text-lg-start text-muted'>

    <div className='text-center p-4 bg-dark text-white' >
      © {new Date().getFullYear()} Copyright - Miguel Rodríguez González

    </div>
  </footer>
);

export default MyFooter;