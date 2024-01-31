const express = require('express');

const app = express();
const port = 3000;

// GET endpoint
app.get('/get/:param', (req: any, res: any) => {
  console.log(req.params.param)
  res.status(200).send('GOT IT');
});

// UPDATE endpoint
app.post('/update', (req: any, res: any) => {
  console.log(req.data)
  res.status(200).send('UPDATED');
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});