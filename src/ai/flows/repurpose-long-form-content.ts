'use server';
/**
 * @fileOverview A Genkit flow for repurposing long-form content into various short-form social media formats.
 *
 * - repurposeLongFormContent - A function that handles the content repurposing process.
 * - RepurposeLongFormContentInput - The input type for the repurposeLongFormContent function.
 * - RepurposeLongFormContentOutput - The return type for the repurposeLongFormContent function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const RepurposeLongFormContentInputSchema = z.object({
  content: z.string().describe('The long-form content (e.g., blog post, transcript, script, article) to be repurposed.'),
  targetFormats: z.array(z.enum([
    'reels-caption',
    'carousel-text',
    'linkedin-post',
    'twitter-thread',
    'email-newsletter',
    'shorts-caption',
  ])).describe('A list of desired social media formats for the repurposed content.'),
  tone: z.string().optional().describe('The desired tone for the repurposed content (e.g., motivational, funny, professional, Gen Z).'),
  language: z.string().optional().describe('The target language for the repurposed content (e.g., English, Hindi, Spanish).'),
});
export type RepurposeLongFormContentInput = z.infer<typeof RepurposeLongFormContentInputSchema>;

// The output will be a record where keys are the format names and values are the generated content.
const RepurposeLongFormContentOutputSchema = z.record(z.string(), z.string().describe('The repurposed content for the specified format.'));
export type RepurposeLongFormContentOutput = z.infer<typeof RepurposeLongFormContentOutputSchema>;

export async function repurposeLongFormContent(input: RepurposeLongFormContentInput): Promise<RepurposeLongFormContentOutput> {
  return repurposeLongFormContentFlow(input);
}

const prompt = ai.definePrompt({
  name: 'repurposeLongFormContentPrompt',
  input: { schema: RepurposeLongFormContentInputSchema },
  output: { schema: RepurposeLongFormContentOutputSchema },
  prompt: `You are an expert content repurposer. Your goal is to take a long-form piece of content and intelligently adapt it into multiple short-form social media formats.

Original Long-Form Content:
"""
{{{content}}}
"""

Desired Output Formats: {{{targetFormats}}}

{{#if tone}}
Adapt the content with a {{{tone}}} tone.
{{/if}}

{{#if language}}
Generate the content in {{{language}}}.
{{/if}}

Please generate the repurposed content for EACH specified format. The output MUST be a JSON object where each key corresponds to a format name from the 'Desired Output Formats' list (e.g., 'reels-caption', 'twitter-thread'), and its value is the generated content for that specific format. Ensure the content is concise, engaging, and perfectly suited for each platform, reflecting any specified tone and language.`,
});

const repurposeLongFormContentFlow = ai.defineFlow(
  {
    name: 'repurposeLongFormContentFlow',
    inputSchema: RepurposeLongFormContentInputSchema,
    outputSchema: RepurposeLongFormContentOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
