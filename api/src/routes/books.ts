import { FastifyInstance } from 'fastify';

export default async function (app: FastifyInstance) {
  app.get('/', async () => {
    return app.prisma.book.findMany({ include: { author: true } });
  });

  app.get('/:id', async (req, reply) => {
    const { id } = req.params as { id: string };
    const book = await app.prisma.book.findUnique({
      where: { id: parseInt(id) },
      include: { author: true },
    });
    if (!book) return reply.status(404).send({ message: 'Book not found' });
    return book;
  });

  app.post('/', async (req, reply) => {
    const { title, authorId } = req.body as { title: string; authorId: number };
    const newBook = await app.prisma.book.create({
      data: { title, authorId },
    });
    reply.status(201).send(newBook);
  });

  app.put('/:id', async (req, reply) => {
    const { id } = req.params as { id: string };
    const { title, authorId } = req.body as { title: string; authorId: number };
    const updatedBook = await app.prisma.book.update({
      where: { id: parseInt(id) },
      data: { title, authorId },
    });
    reply.send(updatedBook);
  });

  app.delete('/:id', async (req, reply) => {
    const { id } = req.params as { id: string };
    await app.prisma.book.delete({
      where: { id: parseInt(id) },
    });
    reply.status(204).send();
  });
}
