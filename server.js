const express = require('express');
const app = express();

app.use(express.static('./dist/DoctorsManagementApp'));

app.get('/*', function(req, res) {
    res.sendFile('index.html', {root: 'dist/DoctorsManagementApp/'}
  );
  });
console.log('hitttssss')
app.listen(process.env.PORT || 8080);