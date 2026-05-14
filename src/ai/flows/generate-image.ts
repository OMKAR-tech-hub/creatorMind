'use server';
/**
 * @fileOverview A Genkit flow for generating high-quality AI images.
 * 
 * - generateImage - A function that handles text-to-image generation.
 * - GenerateImageInput - The input type for image generation.
 * - GenerateImageOutput - The output type containing the image data URI.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const GenerateImageInputSchema = z.object({
  prompt: z.string().describe('The description of the image to generate.'),
  style: z.enum(['Cinematic', 'Realistic', 'Anime', 'Viral Thumbnail', 'Cyberpunk', 'Luxury']).describe('The artistic style of the image.'),
  aspectRatio: z.enum(['1:1', '16:9', '9:16', '4:3']).describe('The aspect ratio of the generated image.'),
  platform: z.enum(['Instagram', 'YouTube', 'Twitter/X', 'LinkedIn', 'Blog']).describe('The target platform for the visual.'),
});
export type GenerateImageInput = z.infer<typeof GenerateImageInputSchema>;

const GenerateImageOutputSchema = z.object({
  imageUrl: z.string().describe('The generated image as a data URI.'),
});
export type GenerateImageOutput = z.infer<typeof GenerateImageOutputSchema>;

export async function generateImage(input: GenerateImageInput): Promise<GenerateImageOutput> {
  return generateImageFlow(input);
}

const generateImageFlow = ai.defineFlow(
  {
    name: 'generateImageFlow',
    inputSchema: GenerateImageInputSchema,
    outputSchema: GenerateImageOutputSchema,
  },
  async (input) => {
    const fullPrompt = `A premium, high-resolution ${input.style} style image for ${input.platform}. 
    Subject: ${input.prompt}. 
    Aspect ratio: ${input.aspectRatio}. 
    Ensure a professional, viral-ready aesthetic with vibrant lighting and elite composition.`;

    const { media } = await ai.generate({
      model: 'googleai/imagen-4.0-fast-generate-001',
      prompt: fullPrompt,
    });

    if (!media || !media.url) {
      throw new Error('Failed to generate image from AI engine.');
    }

    return {
      imageUrl: media.url,
    };
  }
);
