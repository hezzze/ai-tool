import React, { useState, useRef, useEffect } from 'react';
import { Send, X, Loader2, Settings, Download } from 'lucide-react';
import { useImageGeneration, type ImageItem } from '../hooks/useImageGeneration';
import { useLanguage } from '../contexts/LanguageContext';
import './CreateImage.css';

const ASPECT_RATIOS = [
    { id: '21:9', label: '21:9', width: 1536, height: 640 },
    { id: '16:9', label: '16:9', width: 1280, height: 720 },
    { id: '3:2', label: '3:2', width: 1216, height: 832 },
    { id: '4:3', label: '4:3', width: 1152, height: 896 },
    { id: '1:1', label: '1:1', width: 1024, height: 1024 },
    { id: '3:4', label: '3:4', width: 896, height: 1152 },
    { id: '2:3', label: '2:3', width: 832, height: 1216 },
    { id: '9:16', label: '9:16', width: 720, height: 1280 },
];

export const CreateImage: React.FC = () => {
    const { images, generate, loading, error } = useImageGeneration();
    const { t } = useLanguage();
    const [prompt, setPrompt] = useState('');
    const [selectedRatio, setSelectedRatio] = useState(ASPECT_RATIOS[1]); // Default 16:9
    const [selectedImage, setSelectedImage] = useState<ImageItem | null>(null);
    const [showRatioPopover, setShowRatioPopover] = useState(false);
    const popoverRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
                setShowRatioPopover(false);
            }
        };

        if (showRatioPopover) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showRatioPopover]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!prompt.trim() || loading) return;

        await generate(prompt, { width: selectedRatio.width, height: selectedRatio.height });
        setPrompt('');
    };

    const handleRatioSelect = (ratio: typeof ASPECT_RATIOS[0]) => {
        setSelectedRatio(ratio);
        setShowRatioPopover(false);
    };

    const handleDownload = async (e: React.MouseEvent) => {
        e.stopPropagation();
        if (!selectedImage) return;
        try {
            const response = await fetch(selectedImage.url);
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `generated-image-${Date.now()}.png`;
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);
        } catch (error) {
            console.error('Download failed:', error);
        }
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
                    <div className="form-actions">
                        <div className="settings-popover-container" ref={popoverRef}>
                            <button
                                type="button"
                                className="settings-btn"
                                onClick={() => setShowRatioPopover(!showRatioPopover)}
                                title={t.selectRatio || 'Select Ratio'}
                            >
                                <Settings size={20} />
                            </button>
                            {showRatioPopover && (
                                <div className="ratio-popover">
                                    <div className="popover-header">
                                        <span className="popover-title">{t.selectRatio || 'Select Ratio'}</span>
                                        <span className="current-ratio">{selectedRatio.label}</span>
                                    </div>
                                    <div className="ratio-grid">
                                        {ASPECT_RATIOS.map((ratio) => (
                                            <button
                                                key={ratio.id}
                                                className={`ratio-btn ${selectedRatio.id === ratio.id ? 'active' : ''}`}
                                                onClick={() => handleRatioSelect(ratio)}
                                                type="button"
                                                title={`${ratio.label} (${ratio.width}x${ratio.height})`}
                                            >
                                                <div
                                                    className="ratio-preview"
                                                    style={{
                                                        aspectRatio: ratio.id.replace(':', '/')
                                                    }}
                                                />
                                                <span className="ratio-label">{ratio.label}</span>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                        <button
                            type="submit"
                            className="generate-btn"
                            disabled={!prompt.trim() || loading}
                        >
                            {loading ? <Loader2 className="spin" size={20} /> : <Send size={20} />}
                            <span>{t.generate}</span>
                        </button>
                    </div>
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
                        <div className="modal-actions">
                            <button className="icon-btn" onClick={handleDownload} title="Download">
                                <Download size={24} />
                            </button>
                            <button className="icon-btn" onClick={() => setSelectedImage(null)} title="Close">
                                <X size={24} />
                            </button>
                        </div>
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
