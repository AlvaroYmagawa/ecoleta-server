import express from 'express';

const app = express();

app.get('/users', (request, response) => {
  console.log('listagem de usuáruios');

  response.json(['Kenzo', 'VictãoGay', 'Thaina'])
}); 

// Listen port 333
app.listen(3333);