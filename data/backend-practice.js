const XHR = new XMLHttpRequest();
XHR.addEventListener('load', () => {
  console.log('Response received:', XHR.responseText);
});

XHR.open('GET', 'https://supersimplebackend.dev/', true);
XHR.send();
