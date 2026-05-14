import { config } from 'dotenv';
config();

import '@/ai/flows/generate-multilingual-content.ts';
import '@/ai/flows/generate-prompted-content.ts';
import '@/ai/flows/critique-and-improve-content.ts';
import '@/ai/flows/repurpose-long-form-content.ts';
import '@/ai/flows/generate-mood-content.ts';
import '@/ai/flows/voice-to-content.ts';
import '@/ai/flows/generate-image.ts';
