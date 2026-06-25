// Import React 19 directly from an ESM CDN
      import React from 'https://esm.sh/react@19?dev';
      import ReactDOM from 'https://esm.sh/react-dom@19/client?dev';

      const container = document.querySelector('.js-container');
      
      // In modern React, you use createRoot from the 'client' package
      ReactDOM.createRoot(container).render('Welcome to React 19!');