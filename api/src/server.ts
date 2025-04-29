import Fastify from 'fastify';
import cors from '@fastify/cors';
import dotenv from 'dotenv';
import primaPlugin from './plugins/prisma';
import bookRoutes from './routes/books';
import authorRoutes from './routes/authors';

dotenv.config();

const app = Fastify({ logger: true });

app.register(cors, {
  origin: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
});

app.register(primaPlugin);
app.register(bookRoutes, { prefix: '/books' });
app.register(authorRoutes, { prefix: '/authors' });

const start = async () => {
  try {
    await app.listen({ port: 3001, host: '0.0.0.0' });
    console.log('Server is running on http://localhost:3001');
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();
