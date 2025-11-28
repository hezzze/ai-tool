import React, { useState } from 'react';
import { Upload, Image as ImageIcon, Loader2, RotateCcw } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { imageToText } from '../services/api';
import './DescribeImage.css';

export const DescribeImage: React.FC = () => {
    const { t } = useLanguage();
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [caption, setCaption] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [dragActive, setDragActive] = useState(false);

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setSelectedFile(file);
            const url = URL.createObjectURL(file);
            setPreviewUrl(url);
            setCaption(null);
            setError(null);
        }
    };

    const handleDrag = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            const file = e.dataTransfer.files[0];
            if (file.type.startsWith('image/')) {
                setSelectedFile(file);
                const url = URL.createObjectURL(file);
                setPreviewUrl(url);
                setCaption(null);
                setError(null);
            }
        }
    };

    const handleReset = () => {
        setSelectedFile(null);
        setPreviewUrl(null);
        setCaption(null);
        setError(null);
    };

    const handleGenerateCaption = async () => {
        if (!selectedFile) return;

        setLoading(true);
        setError(null);
        setCaption(null);

        try {
            const text = await imageToText(selectedFile);
            setCaption(text);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to generate caption');
            console.error('Error generating caption:', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="describe-image-page">
            <div className="upload-section">
                {!previewUrl ? (
                    <label 
                        className={`upload-area ${dragActive ? 'drag-active' : ''}`}
                        onDragEnter={handleDrag}
                        onDragLeave={handleDrag}
                        onDragOver={handleDrag}
                        onDrop={handleDrop}
                    >
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleFileSelect}
                            className="hidden-input"
                        />
                        <div className="upload-placeholder">
                            <Upload size={48} className="upload-icon" />
                            <h3>{t.uploadTitle}</h3>
                            <p>{t.uploadDesc}</p>
                        </div>
                    </label>
                ) : (
                    <div className="preview-area">
                        <img src={previewUrl} alt="Preview" className="image-preview" />
                        <div className="preview-actions">
                            <label className="change-image-btn">
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleFileSelect}
                                    className="hidden-input"
                                />
                                {t.changeImage}
                            </label>
                            <button
                                className="generate-caption-btn"
                                onClick={handleGenerateCaption}
                                disabled={loading}
                            >
                                {loading ? <Loader2 className="spin" size={20} /> : <ImageIcon size={20} />}
                                <span>{t.describeImage}</span>
                            </button>
                            <button 
                                className="reset-btn"
                                onClick={handleReset}
                                title={t.reset || "Start Over"}
                            >
                                <RotateCcw size={20} />
                            </button>
                        </div>
                        {error && <div className="error-message">{error}</div>}
                    </div>
                )}
            </div>

            {caption && (
                <div className="result-section">
                    <h3>{t.generatedCaption}</h3>
                    <div className="caption-box">
                        <p>{caption}</p>
                    </div>
                </div>
            )}
        </div>
    );
};
