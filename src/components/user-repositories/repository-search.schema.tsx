import z from 'zod';

export const schema = z.object({
  repository: z.string().trim().min(1, { message: 'É necessário informar um repositório' }),
});
