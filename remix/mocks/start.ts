// eslint-disable-next-line import/no-extraneous-dependencies
import { setupServer } from 'msw/node';

const server = setupServer();

server.listen({ onUnhandledRequest: 'bypass' });
console.info('🔶 Mock server running');

process.once('SIGINT', () => server.close());
process.once('SIGTERM', () => server.close());
