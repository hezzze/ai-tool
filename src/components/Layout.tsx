import React, { useState } from 'react';
import { Sidebar } from './Sidebar';
import './Layout.css';

interface LayoutProps {
    children: React.ReactNode;
    activeView: 'create' | 'describe';
    onNavigate: (view: 'create' | 'describe') => void;
}

export const Layout: React.FC<LayoutProps> = ({ children, activeView, onNavigate }) => {
    const [collapsed, setCollapsed] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <div className="layout">
            <Sidebar
                activeView={activeView}
                onNavigate={(view) => {
                    onNavigate(view);
                    setMobileMenuOpen(false);
                }}
                collapsed={collapsed}
                onToggleCollapse={() => setCollapsed(!collapsed)}
                mobileOpen={mobileMenuOpen}
                onCloseMobile={() => setMobileMenuOpen(false)}
            />

            {/* Mobile Overlay */}
            {mobileMenuOpen && (
                <div
                    className="mobile-overlay"
                    onClick={() => setMobileMenuOpen(false)}
                />
            )}

            <main className="main-content">
                <div className="mobile-header">
                    <button
                        className="mobile-menu-btn"
                        onClick={() => setMobileMenuOpen(true)}
                    >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="3" y1="12" x2="21" y2="12"></line>
                            <line x1="3" y1="6" x2="21" y2="6"></line>
                            <line x1="3" y1="18" x2="21" y2="18"></line>
                        </svg>
                    </button>
                    <span className="mobile-title">ZZC AI Tool</span>
                </div>
                {children}
            </main>
        </div>
    );
};
