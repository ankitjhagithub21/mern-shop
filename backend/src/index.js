require('dotenv').config()
const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const connectDB = require('./config/db')
const productRoutes = require('./routes/productRoutes')
const authRoutes = require('./routes/authRoutes')
const cartRoutes = require('./routes/cartRoutes')
const paymentRoutes = require('./routes/paymentRoutes')
const orderRoutes = require('./routes/orderRoutes')
const addressRoutes = require('./routes/addressRoutes')
const app = express()
const port = process.env.PORT || 8000

connectDB()

app.use(express.json())
app.use(cors({
  origin: process.env.CLIENT_URL,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials:true
}))
app.use(cookieParser())

app.get('/', (req, res) => {
   res.json({ message: 'Api working' })
})

app.use('/api/products', productRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/cart', cartRoutes)
app.use('/api/payments', paymentRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/addresses', addressRoutes);


app.listen(port, () => {
  console.log(`Server is listening on port ${port}`)
})
