const { User } = require('../models');

const userHandler = {
    getAllUsers: async (request, h) => {
        try {
            const users = await User.findAll();
            return { status: 'success', data: users };
        } catch (error) {
            return h.response({
                status: 'error',
                message: error.message
            }).code(500);
        }
    },

    createUser: async (request, h) => {
        try {
            const { nama, email } = request.payload;
            const user = await User.create({ nama, email });
            return h.response({
                status: 'success',
                data: user
            }).code(201);
        } catch (error) {
            return h.response({
                status: 'error',
                message: error.message
            }).code(400);
        }
    },

    getUserById: async (request, h) => {
        try {
            const user = await User.findByPk(request.params.id);
            if (!user) {
                return h.response({
                    status: 'fail',
                    message: 'User tidak ditemukan'
                }).code(404);
            }
            return {
                status: 'success',
                data: user
            };
        } catch (error) {
            return h.response({
                status: 'error',
                message: error.message
            }).code(500);
        }
    }
};

module.exports = userHandler;