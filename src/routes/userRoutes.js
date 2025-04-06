const express = require('express');
const router = express.Router();
const { User, Transaction, Category, Reminder } = require('../models');

// User routes
router.post('/users', async (req, res) => {
    try {
        const user = await User.create(req.body);
        res.json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Transaction routes
router.post('/transactions', async (req, res) => {
    try {
        const transaction = await Transaction.create(req.body);
        res.json(transaction);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.get('/transactions/:userId', async (req, res) => {
    try {
        const transactions = await Transaction.findAll({ 
            where: { user_id: req.params.userId },
            include: [Category]
        });
        res.json(transactions);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Analisis routes
router.get('/analisis/:userId', async (req, res) => {
    try {
        // Ambil semua transaksi user
        const transactions = await Transaction.findAll({
            where: { user_id: req.params.userId },
            include: [Category]
        });

        // Hitung total pemasukan dan pengeluaran
        const totalIncome = transactions
            .filter(t => t.type === 'income')
            .reduce((sum, t) => sum + t.amount, 0);

        const totalExpense = transactions
            .filter(t => t.type === 'expense')
            .reduce((sum, t) => sum + t.amount, 0);

        // Hitung data untuk grafik mingguan
        const weeklyData = [];
        const now = new Date();
        for (let i = 3; i >= 0; i--) {
            const weekStart = new Date(now);
            weekStart.setDate(now.getDate() - (i * 7));
            const weekEnd = new Date(weekStart);
            weekEnd.setDate(weekStart.getDate() + 6);

            const weekTransactions = transactions.filter(t => {
                const tDate = new Date(t.date);
                return tDate >= weekStart && tDate <= weekEnd;
            });

            const weekTotal = weekTransactions.reduce((sum, t) => sum + t.amount, 0);
            weeklyData.push({
                name: `Minggu ${4-i}`,
                value: weekTotal
            });
        }

        // Data untuk pie chart
        const pieData = [
            { name: "Pengeluaran", value: totalExpense, fill: "#FFA500" },
            { name: "Sisa Uang", value: totalIncome - totalExpense, fill: "#FFD700" }
        ];

        res.json({
            totalIncome,
            totalExpense,
            weeklyData,
            pieData
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Reminder routes
router.post('/reminders', async (req, res) => {
    try {
        const reminder = await Reminder.create(req.body);
        res.json(reminder);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router; 