// main.jsx — entry do bundle (substitui Babel standalone + scripts CDN)
import * as React from 'react';
import * as ReactDOM from 'react-dom/client';

// Os 4 .jsx originais usam `const { useState } = React;` e `ReactDOM.createRoot(...)`
// como globais (herdado do setup antigo React CDN). Mantemos essa forma.
// Precisa rodar antes dos require()s abaixo → não usar `import` (hoisted).
window.React = React;
window.ReactDOM = { createRoot: ReactDOM.createRoot };

// require() respeita ordem de execução (import é hoisted, quebraria o globals setup acima)
require('./data.jsx');
require('./atoms.jsx');
require('./sections.jsx');
require('./app.jsx');
