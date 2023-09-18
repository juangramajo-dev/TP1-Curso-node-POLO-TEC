import express from "express"
import starsRoutes from './routes/starsRoutes.js'


const PORT = 3000


const app = express();

app.use(express.json());

app.use('/', starsRoutes);

app.listen(PORT, () => {
    console.log(`Servidor iniciado en el puerto `, PORT)
})