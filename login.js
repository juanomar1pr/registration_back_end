
const { MongoClient } = require('mongodb');
const express = require('express');
const cookieParser = require("cookie-parser");
const sessions = require('express-session');
const app = express();
const PORT = 8000
const oneDay = 10000 * 60 * 60 * 24;
app.use(sessions({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized:true,
    cookie: { maxAge: oneDay },
    resave: false ,

}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//serving public file
app.use(express.static(__dirname));
app.use(cookieParser());
const myusername = 'admin'
const mypassword = '123'

// a variable to save a session
var session;

app.get("/logout", (req, res) => {
  req.session.destroy(err => {
    res.redirect("/")
  })
})
app.post('/insert', function(req, res) {
  req.session.usuario = req.body.myusername
//Astericos tu info de mongo 
  const client = new MongoClient(url, { useUnifiedTopology: true });
  const collection = client.db("*******").collection("*******");
  collection.insertOne({
   nombre: req.body.nombre, 
    apellido: req.body.apellido,
    edad: req.body.edad, 
    
    ss0: req.body.ss,

    ss1:req.body.ss1,
    ss2:req.body.ss2,
    seg:req.body.ss+'-'+req.body.ss1+'-'+req.body.ss2,
    email:req.body.email,
    dc:req.body.dc,
    st:req.body.estado,
    zip:req.body.zip,
    tel:req.body.tel,
    
     

     }, function(err, res) {
    console.log("Document inserted");
var valor = req.body.nombre
var valor2 = req.body.apellido 
console.log(`Gracias ! solicitud enviada por: "${valor}  ${valor2}"`)


   

  });
 res.redirect('/user');

  });
function logiadoono(req, res, next){if(req.body.username == myusername && req.body.password == mypassword){
        session=req.session;
        session.userid=req.body.username;
        console.log(req.session)
        res.send(`<h1>welcome ${myusername}<br>Hey there, </h1><br>
            <div id="privilegios"> <h1>OK </h1>

      <h2 style = "color:blue">systema esta arriba y Corriendo</h2>
      <form action="/insert" method="POST" >
     <label for="nombre">Nombre:</label>
    <input id="value" type="text" name="nombre" placeholder="nombre"><br>
    <label for="especie">Apellido:</label>
    <input type="text" name="apellido"placeholder="Apellido"><br>
    <label for="edad">Fecha de Nacimiento</label>
    <input type="date" name="edad"placeholder="Fecha de nacimieno"><br>
    <label for="ss">Seguro social</label><br>
   
     <input type="number" name="ss"placeholder="ss0">-<input type="number" name="ss1"placeholder="medio">-<input type="number" name="ss2"placeholder="ultimos4"><br>
    <label for="email">email:</label>
    <input type="email" name="email"placeholder="email"><br>
    <label for="dc">Direccion:</label>
    <input type="text" name="dc"placeholder="Direccion"><input type="text" name="estado"placeholder="estado"><input type="number" name="zip"placeholder="zip"><br>
<label for="dc">Telefono:</label>
    <input type="number" name="tel"placeholder="Tel"><br>
  
     <button>enviar</button>

    </form>

      
      </div>

            <a href=\'/logout'>click to logout</a>`);
    }
    else{
        res.send('Invalid username or password');
    }

  }
app.post('/user',logiadoono,(req,res) => {
  

})
app.get('/user',(req,res) => {
  if(req.session.userid){
 res.send(`<h1>welcome ${myusername}<br>Hey there, </h1><br>
            <div id="privilegios"> <h1>OK </h1>

      <h2 style = "color:blue">systema esta arriba y Corriendo</h2>
      <form action="/insert" method="POST" >
     <label for="nombre">Nombre:</label>
    <input id="value" type="text" name="nombre" placeholder="nombre"><br>
    <label for="especie">Apellido:</label>
    <input type="text" name="apellido"placeholder="Apellido"><br>
    <label for="edad">Fecha de Nacimiento</label>
    <input type="date" name="edad"placeholder="Fecha de nacimieno"><br>
    <label for="ss">Seguro social</label><br>
   
     <input type="number" name="ss"placeholder="ss0">-<input type="number" name="ss1"placeholder="medio">-<input type="number" name="ss2"placeholder="ultimos4"><br>
    <label for="email">email:</label>
    <input type="email" name="email"placeholder="email"><br>
    <label for="dc">Direccion:</label>
    <input type="text" name="dc"placeholder="Direccion"><input type="text" name="estado"placeholder="estado"><input type="number" name="zip"placeholder="zip"><br>
<label for="dc">Telefono:</label>
    <input type="number" name="tel"placeholder="Tel"><br>
  
     <button>enviar</button>

    </form>

      
      </div>

            <a href=\'/logout'>click to logout</a>`)
 }else{res.redirect('/')}})
  
//Astericos tu info de mongo 

const url = 'mongodb+srv://*******:*******@cluster0.miims2z.mongodb.net/?retryWrites=true&w=majority';
const dbName = 'basededatos';

async function main() {
  const client = new MongoClient(url, { useUnifiedTopology: true });

  try {
    // Connect to the MongoDB server
    await client.connect();

    console.log('Connected to MongoDB');

    // Use the client to do something with the database
    // ...
const collection = client.db("basededatos").collection("usuarios");


  } catch (error) {
    console.error(error);
  } finally {
    // Close the connection to the MongoDB server
    
  }
}                                

main().catch(console.error);
app.listen(PORT, () => console.log(`Server Running at port ${PORT}`));
