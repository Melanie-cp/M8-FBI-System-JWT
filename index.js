import 'dotenv/config'
import express from 'express'

import userRouter from './routes/user.route.js'

export const app = express()

const __dirname = import.meta.dirname

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

app.use('/api/v1/login', userRouter)

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/login.html')
})

app.get('/session', (req, res) => {
    res.sendFile(__dirname + '/public/session.html');
});

app.use('*', (_, res) => {
    res.status(404).json({ ok: false, msg: 'ruta no configurada 😐' })
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Servidor encendido http://localhost:${PORT}`)
})