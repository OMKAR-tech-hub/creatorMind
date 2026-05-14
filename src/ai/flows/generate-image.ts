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
  prompt: z.string().min(10, "Prompt must be at least 10 characters"),
  style: z.enum(['Cinematic', 'Realistic', 'Anime', 'Viral Thumbnail', 'Cyberpunk', 'Luxury']).describe('The artistic style of the image.'),
  aspectRatio: z.enum(['1:1', '16:9', '9:16', '4:3']).describe('The aspect ratio of the generated image.'),
  platform: z.enum(['Instagram', 'YouTube', 'Twitter/X', 'LinkedIn', 'Blog']).describe('The target platform for the visual.'),
});
export type GenerateImageInput = z.infer<typeof GenerateImageInputSchema>;

const GenerateImageOutputSchema = z.object({
  imageUrl: z.string().describe('The generated image as a data URI.'),
  enhancedPrompt: z.string().optional().describe('The prompt that was actually used after enhancement.'),
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
    // Neural Prompt Enhancement Logic
    const enhancementKeywords: Record<string, string> = {
      Cinematic: "anamorphic lens flares, cinematic lighting, 8k resolution, volumetric fog, dramatic depth of field, blockbuster aesthetic, high dynamic range",
      Realistic: "photorealistic, hyper-detailed, raw texture, global illumination, ray tracing, sharp focus, professional 35mm photography, natural skin tones",
      Anime: "high-quality digital art, vibrant colors, clean lines, studio ghibli inspired, aesthetic lighting, cell shaded, expressive eyes",
      "Viral Thumbnail": "extreme high contrast, saturated colors, bold composition, click-worthy, bright focal point, eye-catching textures, expressive subjects",
      Cyberpunk: "neon violet and cyan glow, holographic details, rain-slicked futuristic streets, high-tech industrial grunge, synthwave color palette",
      Luxury: "elegant, minimalist, high-end materials, soft ambient lighting, premium silk and gold textures, sophisticated composition, boutique aesthetic"
    };

    const styleBonus = enhancementKeywords[input.style] || "";
    
    const fullPrompt = `A premium, high-resolution ${input.style} style image for ${input.platform}. 
    Subject: ${input.prompt}. 
    Aspect ratio: ${input.aspectRatio}. 
    Technical: ${styleBonus}. 
    Ensure a professional, viral-ready aesthetic with vibrant lighting and elite composition. Ultra-detailed, masterpiece quality.`;

    try {
      const { media } = await ai.generate({
        model: 'googleai/imagen-4.0-fast-generate-001',
        prompt: fullPrompt,
      });

      if (!media || !media.url) {
        throw new Error('Neural engine returned empty frame.');
      }

      return {
        imageUrl: media.url,
        enhancedPrompt: fullPrompt
      };
    } catch (error) {
      console.error('AI Image Generation Failed:', error);
      throw new Error('The AI engine failed to synchronize the visual stream.');
    }
  }
);
