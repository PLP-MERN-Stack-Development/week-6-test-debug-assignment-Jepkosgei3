// src/mocks/handlers.js
import { rest } from 'msw';

export const handlers = [
  rest.get('http://localhost/api/bugs', (req, res, ctx) => {
    const authHeader = req.headers.get('Authorization');

    if (!authHeader) {
      return res(ctx.status(401), ctx.json({ message: 'Not authorized, token failed' }));
    }

    if (authHeader === 'Bearer VALID_TOKEN') {
      return res(
        ctx.status(200),
        ctx.json([
          { _id: '1', title: 'Bug 1', description: 'Bug 1 desc', status: 'open' },
          { _id: '2', title: 'Bug 2', description: 'Bug 2 desc', status: 'closed' },
        ])
      );
    }

    return res(ctx.status(403), ctx.json({ message: 'Forbidden' }));
  }),
];
