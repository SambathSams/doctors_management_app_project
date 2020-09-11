const express = require('express');
const app = express();

app.use(express.static('./dist/DoctorsManagementApp'));

app.get('/*', function(req, res) {
    res.sendFile('index.html', {root: 'dist/DoctorsManagementApp/'}
  );
  });

app.listen(process.env.PORT || 8080);