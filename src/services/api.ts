export interface GenerateImageResponse {
    url: string;
}

export interface GenerateImageConfig {
    width?: number;
    height?: number;
}

export const generateImage = async (prompt: string, config?: GenerateImageConfig): Promise<string> => {
    const response = await fetch('https://api.zzcreation.com/web/gen_image', {
        method: 'POST',
        headers: {
            'x-api-key': 'zzc-test',
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
