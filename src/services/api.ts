export interface GenerateImageResponse {
    url: string;
}

export const generateImage = async (prompt: string): Promise<string> => {
    const response = await fetch('https://api.zzcreation.com/web/gen_image', {
        method: 'POST',
        headers: {
            'x-api-key': 'zzc-test',
            'User-Agent': 'Apifox/1.0.0 (https://apifox.com)',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ prompt })
    });

    if (!response.ok) {
        throw new Error('Failed to generate image');
    }

    const data: GenerateImageResponse = await response.json();
    return data.url;
};
