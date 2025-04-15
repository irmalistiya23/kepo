import { request, response } from "express";
import prisma  from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';
import fs from 'fs';
import path from 'path';


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
                userId: request.user.userId
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

const OCRsementara = async (imagePath) => {
    return `Simulasi hasil OCR dari: ${imagePath}`;
}

export const createReceipt = async (request, response) => {
    try {
        const { userId } = request.body;
        const file = request.file;

        if (!file || !userId) {
            return response.status(400).json({
                error: 'Image and user ID are required'
            })
        }

        const imageUrl = `/uploads/${file.filename}`;
        const extractedText = await OCRsementara(file.path);

        const newReceipt = await prisma.receipt.create({
            data: {
                userId: parseInt(userId),
                imageUrl,
                extractedText
            }
        });
        response.status(201).json({
            message: 'Receipt created successfully',
            receipt: newReceipt
        })
    } catch(error){
        console.error('Error creating receipt:', error);
        response.status(500).json({
            error: 'Failed to create receipt'
        })
    }
}