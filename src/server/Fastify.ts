import fastify, { FastifyInstance } from 'fastify';
import compress from 'fastify-compress';
import allowHostPlugin from '../plugins/allowHostPlugin';
import routes from '../routes';

export default class Fastify {
  private server!: FastifyInstance;

  constructor() {
    this.setup();
  }

  private setup() {
    this.server = fastify({ logger: true });
    this.server.register(allowHostPlugin);
    this.server.register(compress);
    this.server.register(routes, { prefix: '/api' });
  }

  async start() {
    try {
      await this.server.listen(process.env.PORT!);
    } catch (e) {
      this.server.log.error(e);
      process.exit(1);
    }
  }

  getServer() {
    return this.server;
  }

  registerApollo(apolloHandler: (app: FastifyInstance) => Promise<void>) {
    this.server.register(apolloHandler);
  }
}
