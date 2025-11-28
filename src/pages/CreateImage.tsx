import React, { useState } from 'react';
import { Send, X, Loader2 } from 'lucide-react';
import { useImageGeneration, type ImageItem } from '../hooks/useImageGeneration';
import { useLanguage } from '../contexts/LanguageContext';
import './CreateImage.css';

export const CreateImage: React.FC = () => {
    const { images, generate, loading, error } = useImageGeneration();
    const { t } = useLanguage();
    const [prompt, setPrompt] = useState('');
    const [selectedImage, setSelectedImage] = useState<ImageItem | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!prompt.trim() || loading) return;

        await generate(prompt);
        setPrompt('');
    };

    return (
        <div className="create-image-page">
            <div className="input-section">
                <form onSubmit={handleSubmit} className="prompt-form">
                    <textarea
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        placeholder={t.promptPlaceholder}
                        className="prompt-input"
                        disabled={loading}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' && !e.shiftKey) {
                                e.preventDefault();
                                handleSubmit(e);
                            }
                        }}
                    />
                    <button
                        type="submit"
                        className="generate-btn"
                        disabled={!prompt.trim() || loading}
                    >
                        {loading ? <Loader2 className="spin" size={20} /> : <Send size={20} />}
                        <span>{t.generate}</span>
                    </button>
                </form>
                {error && <div className="error-message">{error}</div>}
            </div>

            <div className="gallery-section">
                {images.length === 0 ? (
                    <div className="empty-state">
                        <p>{t.noImages}</p>
                    </div>
                ) : (
                    <div className="masonry-grid">
                        {images.map((image) => (
                            <div
                                key={image.id}
                                className="gallery-item"
                                onClick={() => setSelectedImage(image)}
                            >
                                <img src={image.url} alt={image.prompt} loading="lazy" />
                                <div className="item-overlay">
                                    <p className="item-prompt">{image.prompt}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {selectedImage && (
                <div className="image-modal" onClick={() => setSelectedImage(null)}>
                    <div className="modal-content" onClick={e => e.stopPropagation()}>
                        <button className="close-btn" onClick={() => setSelectedImage(null)}>
                            <X size={24} />
                        </button>
                        <img src={selectedImage.url} alt={selectedImage.prompt} className="modal-image" />
                        <div className="modal-details">
                            <h3>{t.prompt}</h3>
                            <p>{selectedImage.prompt}</p>
                            <span className="timestamp">
                                {new Date(selectedImage.timestamp).toLocaleString()}
                            </span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
