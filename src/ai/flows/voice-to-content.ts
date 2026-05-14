'use server';
/**
 * @fileOverview A Genkit flow for converting voice transcriptions into viral content.
 *
 * - voiceToContent - A function that processes spoken ideas into structured social media content.
 * - VoiceToContentInput - The input type for the voiceToContent function.
 * - VoiceToContentOutput - The return type for the voiceToContent function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const VoiceToContentInputSchema = z.object({
  transcript: z.string().describe('The raw transcribed text from the voice input.'),
  platform: z.enum(['Instagram', 'YouTube', 'LinkedIn', 'Twitter/X']).describe('The target social media platform.'),
  contentType: z.enum(['Caption', 'Reel Script', 'Carousel', 'Thread', 'Blog Intro']).describe('The desired format.'),
  language: z.string().describe('The language used in the transcript.'),
});
export type VoiceToContentInput = z.infer<typeof VoiceToContentInputSchema>;

const VoiceToContentOutputSchema = z.object({
  viralHook: z.string().describe('A magnetic opening line derived from the spoken idea.'),
  mainContent: z.string().describe('The polished, structured content body.'),
  hashtags: z.array(z.string()).describe('Suggested hashtags for reach.'),
  cta: z.string().describe('A compelling call to action.'),
  viralityScore: z.number().min(0).max(100).describe('Predicted virality score out of 100.'),
  recommendations: z.array(z.string()).describe('AI-driven tips to improve the spoken idea.'),
  toneAnalysis: z.string().describe('Analysis of the emotional tone detected in the text.'),
});
export type VoiceToContentOutput = z.infer<typeof VoiceToContentOutputSchema>;

export async function voiceToContent(input: VoiceToContentInput): Promise<VoiceToContentOutput> {
  return voiceToContentFlow(input);
}

const voicePrompt = ai.definePrompt({
  name: 'voiceToContentPrompt',
  input: { schema: VoiceToContentInputSchema },
  output: { schema: VoiceToContentOutputSchema },
  prompt: `You are an expert content transformer. A creator has spoken their raw, unedited ideas into a microphone. Your job is to take this transcript and "manifest" it into elite-level viral content for {{{platform}}}.

**Transcript:**
"""
{{{transcript}}}
"""

**Format:** {{{contentType}}}
**Language:** {{{language}}}

**Instructions:**
1. Clean up the transcript: Fix grammatical slips that occur during natural speech, remove filler words, and polish the language while keeping the original intent.
2. Structure the content for {{{platform}}}. If it's a Reel Script, include visual cues. If it's a Thread, break it into numbered points.
3. Craft a "viralHook" that stops the scroll. It should be based on the most impactful part of the transcript.
4. Analyze the "toneAnalysis" - was the user passionate, informative, or funny? Match that energy.
5. Provide actionable "recommendations" based on how current algorithms handle this specific topic.
6. Calculate a "viralityScore" based on hook strength and topic relevance.

The output must feel human and authentic, as if the creator wrote it after deep reflection on their spoken idea.`,
});

const voiceToContentFlow = ai.defineFlow(
  {
    name: 'voiceToContentFlow',
    inputSchema: VoiceToContentInputSchema,
    outputSchema: VoiceToContentOutputSchema,
  },
  async (input) => {
    const { output } = await voicePrompt(input);
    if (!output) throw new Error('Failed to transform voice to content');
    return output;
  }
);
