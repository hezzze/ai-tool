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

    return (
        <div className="layout">
            <Sidebar
                activeView={activeView}
                onNavigate={onNavigate}
                collapsed={collapsed}
                onToggleCollapse={() => setCollapsed(!collapsed)}
            />
            <main className="main-content">
                {children}
            </main>
        </div>
    );
};
