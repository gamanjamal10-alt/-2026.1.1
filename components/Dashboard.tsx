
import React, { useState } from 'react';
import { useAuth } from '../App';
import { Link } from 'react-router-dom';
import { UserRole } from '../types';
import { WhatsAppIcon } from './Icons';

const Sidebar: React.FC<{ role: UserRole, setActiveView: (view: string) => void }> = ({ role, setActiveView }) => {
    const getLinks = () => {
        const common = [{ name: 'لوحة التحكم', view: 'overview' }];
        const vendor = [
            { name: 'إدارة المنتجات', view: 'products' },
            { name: 'إدارة الطلبات', view: 'orders' },
            { name: 'إدارة الإعلانات', view: 'ads' },
            { name: 'الإعدادات', view: 'settings' },
        ];
        const transporter = [
            { name: 'الطلبات المتاحة', view: 'available_orders' },
            { name: 'جدول التسليم', view: 'schedule' },
            { name: 'الإعدادات', view: 'settings' },
        ];

        switch (role) {
            case UserRole.Farmer:
            case UserRole.Wholesaler:
            case UserRole.Retailer:
                return [...common, ...vendor];
            case UserRole.Transporter:
                return [...common, ...transporter];
            default:
                return common;
        }
    };

    return (
        <div className="w-64 bg-white h-full shadow-lg p-4">
            <h2 className="text-xl font-bold text-primary-700 mb-6">لوحة تحكم {role}</h2>
            <nav>
                <ul>
                    {getLinks().map(link => (
                        <li key={link.view}>
                            <button onClick={() => setActiveView(link.view)} className="w-full text-right px-4 py-2 rounded-md hover:bg-primary-50 text-gray-700 font-semibold">
                                {link.name}
                            </button>
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    );
};

const SubscriptionIndicator: React.FC<{ subscription: { plan: string, endDate: Date } }> = ({ subscription }) => {
    const daysLeft = Math.ceil((subscription.endDate.getTime() - new Date().getTime()) / (1000 * 3600 * 24));
    return (
        <div className="bg-primary-100 border-r-4 border-primary-500 p-4 rounded-lg mb-6">
            <p className="font-bold text-primary-800">خطة الاشتراك: {subscription.plan}</p>
            <p className="text-sm text-primary-700">{daysLeft > 0 ? `متبقي ${daysLeft} يوم على انتهاء الاشتراك.` : 'انتهى اشتراكك.'}</p>
            <Link to="/subscriptions" className="mt-2 inline-block bg-primary-600 text-white text-sm font-semibold px-4 py-2 rounded-md hover:bg-primary-700">
                تجديد الاشتراك
            </Link>
        </div>
    );
}

const ContactButtons: React.FC = () => (
    <div className="bg-gray-100 p-4 rounded-lg">
        <h3 className="font-bold mb-2">معلومات الاتصال بالمتجر</h3>
        <a href="tel:+213123456789" className="block w-full text-center bg-gray-200 text-gray-800 font-semibold py-2 rounded-md hover:bg-gray-300 mb-2">
            +213 123 456 789
        </a>
        <a href="https://wa.me/213123456789" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-full bg-green-500 text-white font-semibold py-2 rounded-md hover:bg-green-600">
            <WhatsAppIcon className="mr-2" /> تواصل عبر واتساب
        </a>
    </div>
);


const DashboardContent: React.FC<{ view: string, role: UserRole }> = ({ view, role }) => {
    const renderContent = () => {
        switch (view) {
            case 'overview':
                return <div><h2 className="text-2xl font-bold mb-4">نظرة عامة</h2><p>مرحباً بك في لوحة التحكم الخاصة بك.</p></div>;
            case 'products':
                return <div><h2 className="text-2xl font-bold mb-4">إدارة المنتجات</h2><p>هنا يمكنك إضافة وتعديل منتجاتك.</p></div>;
            case 'orders':
                return <div><h2 className="text-2xl font-bold mb-4">إدارة الطلبات</h2><p>هنا يمكنك تتبع طلبات العملاء.</p></div>;
            case 'available_orders':
                return <div><h2 className="text-2xl font-bold mb-4">الطلبات المتاحة للشحن</h2><p>اختر الطلبات التي تود توصيلها.</p></div>;
            default:
                return <div><h2 className="text-2xl font-bold mb-4">{view}</h2><p>محتوى هذه الصفحة قيد الإنشاء.</p></div>;
        }
    }
    return (
        <div className="flex-1 p-8">
            {role !== UserRole.Transporter && <SubscriptionIndicator subscription={{ plan: '6-Month', endDate: new Date(Date.now() + 150 * 24 * 60 * 60 * 1000) }} />}
            {renderContent()}
            {role !== UserRole.Transporter && <div className="mt-8"><ContactButtons /></div>}
        </div>
    )
};

export const Dashboard: React.FC = () => {
    const { user } = useAuth();
    const [activeView, setActiveView] = useState('overview');

    if (!user) return null;

    return (
        <div className="flex min-h-[calc(100vh-64px)]">
            <Sidebar role={user.role} setActiveView={setActiveView} />
            <div className="flex-1 bg-gray-50">
                <DashboardContent view={activeView} role={user.role} />
            </div>
        </div>
    );
};
