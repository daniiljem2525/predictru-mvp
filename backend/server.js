const express = require('express');
const app = express();

app.use(express.json());

let markets = [
  { 
    id: 1, 
    question: "Биток упадёт ниже $100k до 31 декабря?", 
    deadline: Math.floor(Date.now() / 1000) + 86400 * 30, 
    yesPool: 500, 
    noPool: 300 
  }
];

app.get('/markets', (req, res) => {
  res.json(markets);
});

app.listen(3001, () => console.log('Backend запущен на порту 3001'));
