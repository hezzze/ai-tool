import React, { useState } from 'react';
import { Upload, Image as ImageIcon, Loader2 } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import './DescribeImage.css';

export const DescribeImage: React.FC = () => {
    const { t } = useLanguage();
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [caption, setCaption] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setSelectedFile(file);
            const url = URL.createObjectURL(file);
            setPreviewUrl(url);
            setCaption(null);
        }
    };

    const handleGenerateCaption = () => {
        if (!selectedFile) return;

        setLoading(true);
        // Simulate API call
        setTimeout(() => {
            setCaption("A detailed description of the image would appear here. This is a placeholder for the Joycaption integration.");
            setLoading(false);
        }, 2000);
    };

    return (
        <div className="describe-image-page">
            <div className="upload-section">
                {!previewUrl ? (
                    <label className="upload-area">
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
                        </div>
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
