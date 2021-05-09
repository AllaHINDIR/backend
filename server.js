const express = require('express');
const memberRoute = require('./route/memberRoute');
const postRoute = require('./route/postRoute');
const regionRoute = require('./route/regionRoute');
const relaisRoute = require('./route/relaisRoute');
const bodyparser = require('body-parser');
const logger = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');
const mailRoute = require('./route/mailRoute');
const revueRoute = require('./route/RevueRoute');
const siteRoute = require('./route/siteRoute');
const categorieRoute = require('./route/categorieRoute');
const galerieRoute = require('./route/galerieRoute');
const newsRoute = require('./route/actualitesRoute');
const activiteRoute = require('./route/activitesRoute');
const articleRoute = require('./route/articleRoute');
const albumRoute = require('./route/albumRoute');
const formationRoute = require('./route/formationRoute');
const qslRoute = require('./route/qslRoute');

const commentRoute = require('./route/commentRoute');
const videoRoute = require('./route/videoRoute');
const path = require('path');
const PORT = process.env.PORT || 5000;
const HOST = process.env.Host;
const app = express();

const connectionUrl = "mongodb://127.0.0.1:27017/shopdb";

//const connectionUrl = "mongodb+srv://arram:arram@cluster0-3yvyb.mongodb.net/arramdb?retryWrites=true&w=majority";
mongoose
  .connect(connectionUrl
    , {
         useNewUrlParser: true,
         useUnifiedTopology: true,
         useFindAndModify: true,
         useCreateIndex: true
     })
  .then(() => {
    console.log("Connected to the database");
  })
  .catch(() => {
    console.log("Connection failed!");
  });
// Connect to MongoDB
/*mongoose
    .connect(connectionUrl, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: true,
        useCreateIndex: true
    })
    .then(() => {
        console.log("Connected to the database");
    })
    .catch(() => {
        console.log("Connection failed!");
    });*/




app.use(cors());
app.use(logger('dev'));

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended : false}));
app.use('/uploads',express.static('uploads'));

app.use('/',express.static(path.join(__dirname,'angular')));

//app.use('/', express.static(path.join(__dirname,'public')));

/*app.get('', (req,res)=>{
  res.sendFile(path.join(__dirname,'public','index.html'));
})*/

app.get('', (req, res) => {
  res.sendFile(path.join(__dirname, 'angular','index.html'));
});





app.use('/uploads',express.static(path.join(__dirname,'uploads')));

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PATCH, PUT, DELETE, OPTIONS"
    );
    next();
});
app.use(articleRoute);
app.use(activiteRoute);
app.use(galerieRoute);
app.use(newsRoute);
app.use(categorieRoute);
app.use(siteRoute);
app.use(regionRoute);
app.use(relaisRoute);
app.use(postRoute);
app.use(memberRoute);
app.use(mailRoute);
app.use(revueRoute);
app.use(albumRoute);
app.use(revueRoute);
app.use(formationRoute);
app.use(qslRoute);
app.use(commentRoute);
app.use(videoRoute);

app.listen(PORT,()=>{
    console.log(`server running at http://localhost:${PORT}`);
});
