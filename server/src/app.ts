import express from 'express';
import morgan from 'morgan';
import dev from '../config';
import connectDB from '../config/db';
import cartRoute from '../routes/cart.route';
import orderRoute from '../routes/order.route';
import productRoute from '../routes/product.route';
import userRoute from '../routes/user.route';

const app = express();
const port = dev.app.port;

//Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

//Routes
app.use('/api', userRoute)
app.use('/api/product', productRoute)
app.use('/api/cart', cartRoute)
app.use('/api/order', orderRoute)


app.listen(port, async () => {
  console.log(`server is running on port ${port}`);
    await connectDB();
})