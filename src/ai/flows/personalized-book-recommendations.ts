'use server';
/**
 * @fileOverview Personalized book recommendations flow.
 *
 * This flow takes a list of books in the user's cart and their purchase history,
 * and returns a list of personalized book recommendations.
 *
 * @param {PersonalizedBookRecommendationsInput} input - The input to the flow.
 * @returns {Promise<PersonalizedBookRecommendationsOutput>} - A promise that resolves to the recommendations.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PersonalizedBookRecommendationsInputSchema = z.object({
  cartBooks: z.array(
    z.object({
      title: z.string(),
      author: z.string(),
      genre: z.string().optional(),
      description: z.string().optional(),
    })
  ).describe('The list of books currently in the user\'s cart.'),
  purchaseHistory: z.array(
    z.object({
      title: z.string(),
      author: z.string(),
      genre: z.string().optional(),
      description: z.string().optional(),
    })
  ).describe('The user\'s past book purchases.'),
});

export type PersonalizedBookRecommendationsInput = z.infer<typeof PersonalizedBookRecommendationsInputSchema>;

const PersonalizedBookRecommendationsOutputSchema = z.array(
  z.object({
    title: z.string(),
    author: z.string(),
    genre: z.string().optional(),
    description: z.string().optional(),
    reason: z.string().describe('Why this book is recommended based on the user\'s cart and history.'),
  })
).describe('A list of personalized book recommendations.');

export type PersonalizedBookRecommendationsOutput = z.infer<typeof PersonalizedBookRecommendationsOutputSchema>;

export async function getPersonalizedBookRecommendations(
  input: PersonalizedBookRecommendationsInput
): Promise<PersonalizedBookRecommendationsOutput> {
  return personalizedBookRecommendationsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'personalizedBookRecommendationsPrompt',
  input: {schema: PersonalizedBookRecommendationsInputSchema},
  output: {schema: PersonalizedBookRecommendationsOutputSchema},
  prompt: `You are a book recommendation expert. Given the books in the user's cart and their purchase history, recommend other books they might enjoy.

Cart Books:
{{#each cartBooks}}
- {{title}} by {{author}} (Genre: {{genre}})
{{/each}}

Purchase History:
{{#each purchaseHistory}}
- {{title}} by {{author}} (Genre: {{genre}})
{{/each}}

Based on these books, provide personalized book recommendations. Explain why each book is recommended based on the user's cart and purchase history.
Ensure each recommendation includes the title, author, genre, description and reason for recommendation.
`, 
});

const personalizedBookRecommendationsFlow = ai.defineFlow(
  {
    name: 'personalizedBookRecommendationsFlow',
    inputSchema: PersonalizedBookRecommendationsInputSchema,
    outputSchema: PersonalizedBookRecommendationsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
