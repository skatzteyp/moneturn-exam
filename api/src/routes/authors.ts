import { FastifyInstance } from 'fastify';

export default async function (app: FastifyInstance) {
  app.get('/', async () => {
    return app.prisma.author.findMany({ include: { books: true } });
  });

  app.get('/:id', async (req, reply) => {
    const { id } = req.params as { id: string };
    const author = await app.prisma.author.findUnique({
      where: { id: parseInt(id) },
      include: { books: true },
    });
    if (!author) return reply.status(404).send({ message: 'Author not found' });
    return author;
  });

  app.post('/', async (req, reply) => {
    const { name } = req.body as { name: string };
    const newAuthor = await app.prisma.author.create({
      data: { name },
    });
    reply.status(201).send(newAuthor);
  });

  app.put('/:id', async (req, reply) => {
    const { id } = req.params as { id: string };
    const { name } = req.body as { name: string };
    const updatedAuthor = await app.prisma.author.update({
      where: { id: parseInt(id) },
      data: { name },
    });
    reply.send(updatedAuthor);
  });

  app.delete('/:id', async (req, reply) => {
    const { id } = req.params as { id: string };
    await app.prisma.author.delete({
      where: { id: parseInt(id) },
    });
    reply.status(204).send();
  });
}
