export interface GenerateImageResponse {
    url: string;
}

export interface GenerateImageConfig {
    width?: number;
    height?: number;
    workflow?: 'qwen_t2i_fast' | 'z_image_t2i';
}

export const generateImage = async (prompt: string, config?: GenerateImageConfig): Promise<string> => {
    const apiKey = import.meta.env.VITE_API_KEY;

    if (!apiKey) {
        throw new Error('API key is not configured. Please set VITE_API_KEY environment variable.');
    }

    const response = await fetch('https://api.zzcreation.com/web/gen_image', {
        method: 'POST',
        headers: {
            'x-api-key': apiKey,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            prompt,
            config
        })
    });

    if (!response.ok) {
        throw new Error('Failed to generate image');
    }

    const data: GenerateImageResponse = await response.json();
    return data.url;
};

export interface ImageToTextResponse {
    text: string;
}

export const imageToText = async (file: File): Promise<string> => {
    const apiKey = import.meta.env.VITE_API_KEY;

    if (!apiKey) {
        throw new Error('API key is not configured. Please set VITE_API_KEY environment variable.');
    }

    const formData = new FormData();
    formData.append('image', file);

    const response = await fetch('https://api.zzcreation.com/web/image_to_text', {
        method: 'POST',
        headers: {
            'x-api-key': apiKey
        },
        body: formData
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || 'Failed to generate caption');
    }

    const data: ImageToTextResponse = await response.json();
    return data.text;
};
