import express from "express";
import cors from "cors";

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res)=>{
    res.send('Desde server smq')
})

app.get('/api/grettings', (req, res)=>{
    res.json({
        message: 'Hola, desde Node JS'
    })
})

app.get('/api/servers', (req, res) =>{
    res.json([
        { id: 1, name:"SEO", price: 150},
        { id: 2, name: "Web Hosting", price: 100},
        { id: 3, name: "VPS", price: 200 },
        { id: 4, name: "Dedicate Server", price: 300 }
    ])
})

app.post('/api/contact', (req, res)=>{
    const { name, email, message } = req.body

    console.log('nuevo mensaje', name, email, message)

    res.json({
        status: 'ok'
    })

})

app.listen(port, ()=>{
    console.log("Servidor escuchando....")
})