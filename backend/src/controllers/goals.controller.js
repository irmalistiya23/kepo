import { PrismaClient } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime/library";

const prisma = new PrismaClient();

export const addSaving = async (request, response) => {
    try {
        const { amount } = request.body;
        const goalId = parseInt(request.params.id);

        const saving =  await prisma.goalSaving.create({
            data: {
                goalId,
                amount: new Decimal(amount)
            }
        });

        response.status(201).json({ 
            message: "Saving added successfully", saving
        })
    } catch(error) {
        response.status(500).json({ 
            error: 'Failed to add saving'
        });
    }
};