'use server';
/**
 * @fileOverview A Genkit flow for generating multilingual content with cultural tone adaptation and local hashtag suggestions.
 *
 * - generateMultilingualContent - A function that handles the multilingual content generation process.
 * - GenerateMultilingualContentInput - The input type for the generateMultilingualContent function.
 * - GenerateMultilingualContentOutput - The return type for the generateMultilingualContent function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateMultilingualContentInputSchema = z.object({
  originalContent: z
    .string()
    .describe('The original content to be translated and culturally adapted.'),
  originalLanguage: z
    .string()
    .describe('The language of the original content (e.g., "English").'),
  targetLanguage: z
    .string()
    .describe('The target language for the content (e.g., "Hindi", "Spanish", "French").'),
  platform: z
    .string()
    .describe('The social media platform for which the content is intended (e.g., "Instagram", "LinkedIn", "Twitter").'),
  tone: z
    .string()
    .describe('The desired tone for the content (e.g., "Motivational", "Professional", "Funny").'),
});
export type GenerateMultilingualContentInput = z.infer<
  typeof GenerateMultilingualContentInputSchema
>;

const GenerateMultilingualContentOutputSchema = z.object({
  translatedContent: z
    .string()
    .describe('The content translated and adapted to the target language and culture.'),
  culturalToneAdaptationDescription: z
    .string()
    .describe('A brief explanation of how the cultural tone was adapted.'),
  localHashtags: z
    .array(z.string())
    .describe('An array of relevant local hashtags for the target language and platform.'),
});
export type GenerateMultilingualContentOutput = z.infer<
  typeof GenerateMultilingualContentOutputSchema
>;

export async function generateMultilingualContent(
  input: GenerateMultilingualContentInput
): Promise<GenerateMultilingualContentOutput> {
  return generateMultilingualContentFlow(input);
}

const generateMultilingualContentPrompt = ai.definePrompt({
  name: 'generateMultilingualContentPrompt',
  input: {schema: GenerateMultilingualContentInputSchema},
  output: {schema: GenerateMultilingualContentOutputSchema},
  prompt: `You are an expert content creator specializing in global and culturally relevant social media content. Your task is to translate and adapt existing content for a new language and culture, ensuring it resonates authentically with local audiences.

Instructions:
1. Translate the 'originalContent' from 'originalLanguage' to 'targetLanguage'.
2. Adapt the 'translatedContent' to suit the cultural nuances and preferences of the 'targetLanguage' region, specifically for the 'platform' and adhering to the 'tone'. This involves adjusting idioms, cultural references, humor, and overall style to be appropriate and engaging for the local audience.
3. Provide a clear 'culturalToneAdaptationDescription' explaining the key changes made for cultural relevance.
4. Generate 'localHashtags' that are popular and relevant within the 'targetLanguage' region for the specified 'platform' and content 'tone'.

Original Content: {{{originalContent}}}
Original Language: {{{originalLanguage}}}
Target Language: {{{targetLanguage}}}
Platform: {{{platform}}}
Desired Tone: {{{tone}}}`,
});

const generateMultilingualContentFlow = ai.defineFlow(
  {
    name: 'generateMultilingualContentFlow',
    inputSchema: GenerateMultilingualContentInputSchema,
    outputSchema: GenerateMultilingualContentOutputSchema,
  },
  async input => {
    const {output} = await generateMultilingualContentPrompt(input);
    return output!;
  }
);
