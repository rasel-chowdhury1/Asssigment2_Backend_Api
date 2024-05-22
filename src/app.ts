import { Request, Response } from 'express';
import cors from 'cors';

import express from 'express';
import { ProductRouter } from './app/modules/product/product.router';
import { OrderRouter } from './app/modules/order/order.router';

const app = express();

//parser
app.use(express.json());
app.use(cors());

//application routers
app.use('/api/products', ProductRouter);
app.use('/api/orders', OrderRouter)

app.get('/', (req: Request, res: Response) => {
  res.send('Hello Developer World!');
});

app.get('*', (req: Request, res: Response) => {
  res.json({
    "success": false,
    "message": "Route not found"
   })
   
} )

export default app;
