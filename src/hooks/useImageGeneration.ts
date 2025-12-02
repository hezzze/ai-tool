import { useState, useEffect } from 'react';
import { generateImage } from '../services/api';

export interface ImageItem {
    id: string;
    url: string;
    prompt: string;
    timestamp: number;
}

export const useImageGeneration = () => {
    const [images, setImages] = useState<ImageItem[]>(() => {
        const saved = localStorage.getItem('generated_images');
        return saved ? JSON.parse(saved) : [];
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        localStorage.setItem('generated_images', JSON.stringify(images));
    }, [images]);

    const generate = async (prompt: string, config?: { width?: number; height?: number; workflow?: 'qwen_t2i_fast' | 'z_image_t2i' }) => {
        setLoading(true);
        setError(null);
        try {
            const url = await generateImage(prompt, config);
            const newImage: ImageItem = {
                id: crypto.randomUUID(),
                url,
                prompt,
                timestamp: Date.now(),
            };
            setImages(prev => [newImage, ...prev]);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to generate image');
        } finally {
            setLoading(false);
        }
    };

    return { images, generate, loading, error };
};
