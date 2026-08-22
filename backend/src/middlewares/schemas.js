import z from 'zod' 

const messageSchema = z.object({
    nombre: z.string(),
    email: z.email(),
    mensaje: z.string(),
})

export function validateMessage (input) {
    return messageSchema.safeParse(input)
}

