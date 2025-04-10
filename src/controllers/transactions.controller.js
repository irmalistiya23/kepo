import { request, response } from "express";
import prisma  from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';

export const createTransaction = async ( request, response ) => {
    try{
        const { amount, category, type, description} = request.body;

        if (!amount || !category || !type) {
            return response.status(400).json({
                error: 'Amount, category, and type are required'
            });
        }

        const newTransaction = await prisma.transaction.create({
            data: {
                amount: new Decimal(amount),
                category: category,
                type: type,
                description: description,
                userId: request.user.id
            }
        });

        response.status(201).json({
            message: 'Transaction created successfully',
            transaction: newTransaction
        });
    } catch(error){
        console.error('Error creating transaction', error);
        response.status(500).json({
            error: 'Failed to create transaction'
        });
    }
};