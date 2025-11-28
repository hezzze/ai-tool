export interface GenerateImageResponse {
    url: string;
}

export interface GenerateImageConfig {
    width?: number;
    height?: number;
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
            'User-Agent': 'Apifox/1.0.0 (https://apifox.com)',
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
