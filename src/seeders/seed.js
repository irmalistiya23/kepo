const { User, Category, Transaction } = require('../models');

async function seed() {
    try {
        // Buat user
        const user = await User.create({
            username: 'testuser',
            email: 'test@example.com',
            password: 'password123'
        });

        // Buat kategori
        const categories = await Category.bulkCreate([
            { name: 'Makanan' },
            { name: 'Transport' },
            { name: 'Belanja' },
            { name: 'Gaji' }
        ]);

        // Buat transaksi
        const transactions = await Transaction.bulkCreate([
            {
                user_id: user.id,
                category_id: categories[3].id, // Gaji
                amount: 5000000,
                type: 'income',
                date: new Date()
            },
            {
                user_id: user.id,
                category_id: categories[0].id, // Makanan
                amount: 50000,
                type: 'expense',
                date: new Date()
            },
            {
                user_id: user.id,
                category_id: categories[1].id, // Transport
                amount: 30000,
                type: 'expense',
                date: new Date()
            },
            {
                user_id: user.id,
                category_id: categories[2].id, // Belanja
                amount: 120000,
                type: 'expense',
                date: new Date()
            }
        ]);

        console.log('Seeding completed successfully');
    } catch (error) {
        console.error('Error seeding data:', error);
    }
}

seed(); 