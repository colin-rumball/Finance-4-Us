import React from 'react';

const LoadingPage = () => (
   <div className="loader">
      <div className="lds-css ng-scope">
         <div className="lds-double-ring">
            <div></div> {/* Outer Ring */}
            <div></div> {/* Inner Ring */}
         </div>
      </div>
   </div>
);


export default LoadingPage;