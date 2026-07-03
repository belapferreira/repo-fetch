import z from 'zod';

export const schema = z.object({
  username: z.string().trim().min(1, { message: 'É necessário informar um nome de usuário' }),
});
