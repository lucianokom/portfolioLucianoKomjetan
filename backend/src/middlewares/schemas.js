import z from 'zod'

const messageSchema = z.object({
    nombre: z.string()
        .trim()
        .min(2, "El nombre debe tener al menos 2 caracteres")
        .max(80, "El nombre no puede superar los 80 caracteres"),
    email: z.email("El email no tiene un formato valido")
        .max(120, "El email no puede superar los 120 caracteres"),
    mensaje: z.string()
        .trim()
        .min(10, "El mensaje debe tener al menos 10 caracteres")
        .max(2000, "El mensaje no puede superar los 2000 caracteres"),
})

export function validateMessage (input) {
    return messageSchema.safeParse(input)
}