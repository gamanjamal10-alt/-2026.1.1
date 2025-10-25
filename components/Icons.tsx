
import React from 'react';

export const FarmerIcon: React.FC<{ className?: string }> = ({ className = 'w-16 h-16' }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17.8 19.2c-1.5-1-3.5-2.2-5.8-2.2s-4.3 1.2-5.8 2.2" />
        <path d="M12 11v6" />
        <path d="M12 3c-2.8 0-5 2.2-5 5 0 1.4.6 2.8 1.5 3.8" />
        <path d="M12 3c2.8 0 5 2.2 5 5 0 1.4-.6 2.8-1.5 3.8" />
        <path d="M15 8c0 1.1-.9 2-2 2s-2-.9-2-2 .9-2 2-2 2 .9 2 2z" />
        <path d="M22 12c-2.5 1.5-5.5 2-8 2s-5.5-.5-8-2" />
    </svg>
);
export const WholesalerIcon: React.FC<{ className?: string }> = ({ className = 'w-16 h-16' }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
        <path d="M16 16h2a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-2" />
        <path d="M8 16H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
        <path d="M12 12h.01" />
        <path d="M12 8h.01" />
        <path d="M12 16h.01" />
    </svg>
);
export const RetailerIcon: React.FC<{ className?: string }> = ({ className = 'w-16 h-16' }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
        <path d="m3.3 7 8.7 5 8.7-5" />
        <path d="M12 22V12" />
    </svg>
);
export const TransporterIcon: React.FC<{ className?: string }> = ({ className = 'w-16 h-16' }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 18H3c-.6 0-1-.4-1-1V7c0-.6.4-1 1-1h10c.6 0 1 .4 1 1v11" />
        <path d="M14 9h4l4 4v4h-8v-4a2 2 0 0 1 2-2Z" />
        <circle cx="7.5" cy="18.5" r="2.5" />
        <circle cx="17.5" cy="18.5" r="2.5" />
    </svg>
);
export const CustomerIcon: React.FC<{ className?: string }> = ({ className = 'w-16 h-16' }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
    </svg>
);

export const CartIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="9" cy="21" r="1" />
        <circle cx="20" cy="21" r="1" />
        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
    </svg>
);

export const UserCircleIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 20a6 6 0 0 0-12 0" />
        <circle cx="12" cy="10" r="4" />
        <circle cx="12" cy="12" r="10" />
    </svg>
);

export const BellIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
        <path d="M13.73 21a2 2 0 0 1-3.46 0" />
    </svg>
);

export const LogoutIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
        <polyline points="16 17 21 12 16 7" />
        <line x1="21" x2="9" y1="12" y2="12" />
    </svg>
);

export const StarIcon: React.FC<{ className?: string, fill?: string }> = ({ className = "w-5 h-5", fill = "currentColor" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill={fill} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
);

export const WhatsAppIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor" >
        <path d="M12.04 2C6.58 2 2.13 6.45 2.13 12c0 1.77.46 3.45 1.32 4.95L2 22l5.25-1.38c1.45.79 3.08 1.21 4.79 1.21h.01c5.46 0 9.91-4.45 9.91-9.91S17.5 2 12.04 2zM9.51 17.13l-.22.46c-.27.56-.54 1.12-1.2 1.07-.62-.05-1.27-.41-1.84-1.12-.79-1-1.3-1.84-1.3-2.88s.5-1.94 1-2.88c.5-.94 1.12-1.56 2-1.56.88 0 1.5.56 1.5 1.56v.05c0 .06-.01.12-.02.19h-.03c-.1-.47-.46-.94-.94-.94-.47 0-.94.47-.94.94s.47.94.94.94h.94c0 .06-.01.12-.02.19h-.03c-.1-.47-.46-.94-.94-.94-.47 0-.94.47-.94.94s.47.94.94.94h1.01c-.16 1.45-1.07 2.33-2.09 2.33-.68 0-1.27-.31-1.74-.85l-.22-.29c-.1-.13-.26-.13-.37 0l-.13.13c-.1.1-.1.26 0 .37z"/>
    </svg>
);
