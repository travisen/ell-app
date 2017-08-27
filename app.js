const express = require('express');

const app = express();
const favicon = require('serve-favicon');
const path = require('path');

const placeRoutes = require('./routes/user_index');
const adminRoutes = require('./routes/admin_index');

app.set('view engine', 'ejs');

// Declare static directory for custom stylesheets
app.use(express.static(path.join(__dirname, '/public')));

// Link to favicon
if (favicon(path.join(__dirname, 'public', 'favicon-globe.ico'))) {
  app.use(favicon(path.join(__dirname, 'public', 'favicon-globe.ico')));
}

app.use(placeRoutes);

// Admin routes which require authentication
app.use(adminRoutes);

// Page does not exist
app.get('/*', (req, res) => {
  // res.send('Index page!');
  res.render('not-found');
});

app.listen(process.env.PORT || 3000, () => {
  let port = 3000;
  if (process.env.PORT != null) {
    port = process.env.PORT;
  }
  console.log('Server started on port: %d', port);
});
