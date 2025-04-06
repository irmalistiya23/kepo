'use strict';

const { User } = require('../models');

const userRoutes = [
    {
        method: 'POST',
        path: '/users',
        handler: async (request, h) => {
            try {
                const { username, email, password } = request.payload;
                const user = await User.create({ username, email, password });
                return h.response(user).code(201);
            } catch (error) {
                return h.response({ error: error.message }).code(500);
            }
        }
    }
];

module.exports = userRoutes;