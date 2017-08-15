var express = require('express');
var morgan = require('morgan');
var path = require('path');

var app = express();
app.use(morgan('combined'));

var articles={
     "article-one" :{
        title: 'Article one | Bhakya ',
        heading: 'Article one',
        content:`This is just awesome learning. Not boring . keeps me going... good to start this kind of educating system. This will surely help many aspiring, poor, talented, unable to study in classrooms students to learn with ease . I really appreciate your efforts . Thank you IIT-M and Hasura . fbuiik;lgfsrsarfglkkfgset `
    },
    
     "article-two" :{
        title: 'Article two | Bhakya ',
        heading: 'Article two',
        content:`fjtbuujjk 678989900bm fssdaqwweruoasdfghjkl qwertyuio qwsdfghjkl asdfghjk`
    },
    
     "article-three" :{
        title: 'Article three | Bhakya ',
        heading: 'Article three',
        content:`3rd page iihgffddasdfghjkl qwertyuio xcvbnm,kkj.`
    },
};

function htmlTemplate(data){
    var title= data.title; 
    var heading= data.heading;
    var content= data.content;
    
    var template = `
        <html>
        <head>
            <title>${title} </title>
            <meta name="viewport" content="width=device-width , initial-scale=1"/>
            <link href="/ui/style.css" rel="stylesheet" />
        </head>
        <body>
            <div class="container">
                 <a href="/">Go to Home</a> | <a href="/article-one.html">Article-one</a> | <a href="/article-two.html">Article-two</a> | <a href="/article-three.html">Article-three</a> 
            
                <h2>${heading}</h2>
                <div>
                    <p>${content}
                    </p>
                </div>
            </div>
        </body>
    </html>`
    ;
    return template;
}


var config = {
    user:'bhakya3',
    database:'bhakya3',
    host:'http://db.imad.hasura-app.io',
    port:5432,
    password:process.env.DB_PASSWORD//db-bhakya3-43518
};

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

var counter =0;
app.get('/counter', function (req,res){
    counter = counter + 1 ;
    res.send(counter.toString());
});

var names=[];
app.get('/submit-name', function (req, res) {
    var name=req.query.name;
    names.push(name);
  res.send(JSON.stringify(names));
});

var pool= new Pool(config);

app.get('/test-db',function (req,res){
//make a select request
//return the response results
pool.query('SELECT * FROM test',function(req,res){
   if(err){
       res.status(500).send(err.tostring());
   } else{
       res.send(JSON.stringify(result.rows));
   }
    
});


});
app.get('/:articleName.html', function (req, res) {
    var articleName=req.params.articleName;
  res.send(htmlTemplate(articles[articleName]));
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});


// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port = 80;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
