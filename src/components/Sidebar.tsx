import React, { useState } from 'react';
import {
    ImagePlus,
    Type,
    HelpCircle,
    Languages,
    ChevronLeft,
    Menu,
    X
} from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import './Sidebar.css';

interface SidebarProps {
    activeView: 'create' | 'describe';
    onNavigate: (view: 'create' | 'describe') => void;
    collapsed: boolean;
    onToggleCollapse: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
    activeView,
    onNavigate,
    collapsed,
    onToggleCollapse
}) => {
    const { t, language, setLanguage } = useLanguage();
    const [showHelp, setShowHelp] = useState(false);

    const toggleLanguage = () => {
        setLanguage(language === 'en' ? 'zh' : 'en');
    };

    return (
        <>
            <div className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
                <div className="sidebar-header">
                    {!collapsed && <h1 className="app-title">{t.appTitle}</h1>}
                    <button className="collapse-btn" onClick={onToggleCollapse}>
                        {collapsed ? <Menu size={20} /> : <ChevronLeft size={20} />}
                    </button>
                </div>

                <nav className="sidebar-nav">
                    <button
                        className={`nav-item ${activeView === 'create' ? 'active' : ''}`}
                        onClick={() => onNavigate('create')}
                        title={t.createImage}
                    >
                        <ImagePlus size={20} />
                        {!collapsed && <span>{t.createImage}</span>}
                    </button>

                    <button
                        className={`nav-item ${activeView === 'describe' ? 'active' : ''}`}
                        onClick={() => onNavigate('describe')}
                        title={t.describeImage}
                    >
                        <Type size={20} />
                        {!collapsed && <span>{t.describeImage}</span>}
                    </button>
                </nav>

                <div className="sidebar-footer">
                    <button
                        className="nav-item"
                        title={t.help}
                        onClick={() => setShowHelp(true)}
                    >
                        <HelpCircle size={20} />
                        {!collapsed && <span>{t.help}</span>}
                    </button>
                    <button
                        className="nav-item"
                        title={t.language}
                        onClick={toggleLanguage}
                    >
                        <Languages size={20} />
                        {!collapsed && <span>{language === 'en' ? 'English' : '中文'}</span>}
                    </button>
                </div>
            </div>

            {showHelp && (
                <div className="help-modal-overlay" onClick={() => setShowHelp(false)}>
                    <div className="help-modal" onClick={e => e.stopPropagation()}>
                        <div className="help-header">
                            <h2>{t.helpTitle}</h2>
                            <button className="close-help-btn" onClick={() => setShowHelp(false)}>
                                <X size={20} />
                            </button>
                        </div>
                        <div className="help-content">
                            <p>{t.helpContent}</p>
                            <div className="help-footer">
                                <span>{t.version}</span>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};
