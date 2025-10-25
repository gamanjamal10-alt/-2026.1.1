import React, { useState } from 'react';
import { useAuth } from '../App';
import { Link, useNavigate } from 'react-router-dom';
import { UserRole, User } from '../types';
import { WhatsAppIcon } from './Icons';
import { FarmerDashboardContent, WholesalerDashboardContent, RetailerDashboardContent } from '../pages/VendorScreens';

const Sidebar: React.FC<{ role: UserRole, activeView: string, setActiveView: (view: string) => void }> = ({ role, activeView, setActiveView }) => {
    const navigate = useNavigate();

    const handleNavigation = (view: string) => {
        if (['ads', 'settings'].includes(view)) {
             navigate(`/${view}`);
        } else {
            setActiveView(view);
        }
    }

    const getLinks = () => {
        const common = [{ name: 'نظرة عامة', view: 'overview' }];
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
        <div className="w-64 bg-white h-full shadow-lg p-4 flex-shrink-0">
            <h2 className="text-xl font-bold text-primary-700 mb-6 text-center">لوحة تحكم {role}</h2>
            <nav>
                <ul>
                    {getLinks().map(link => (
                        <li key={link.view}>
                            <button 
                                onClick={() => handleNavigation(link.view)} 
                                className={`w-full text-right px-4 py-3 rounded-md font-semibold transition-colors duration-200 ${activeView === link.view ? 'bg-primary-100 text-primary-700' : 'hover:bg-primary-50 text-gray-700'}`}
                            >
                                {link.name}
                            </button>
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    );
};

const SubscriptionIndicator: React.FC<{ user: User }> = ({ user }) => {
    if (!user.subscription) return null;
    const daysLeft = Math.ceil((user.subscription.endDate.getTime() - new Date().getTime()) / (1000 * 3600 * 24));
    const isExpired = daysLeft <= 0;

    return (
        <div className={`border-r-4 p-4 rounded-lg mb-6 ${isExpired ? 'bg-red-100 border-red-500' : 'bg-primary-100 border-primary-500'}`}>
            <p className={`font-bold ${isExpired ? 'text-red-800' : 'text-primary-800'}`}>
                خطة الاشتراك: {user.subscription.plan}
            </p>
            <p className={`text-sm ${isExpired ? 'text-red-700' : 'text-primary-700'}`}>
                {isExpired ? 'انتهى اشتراكك.' : `متبقي ${daysLeft} يوم على انتهاء الاشتراك.`}
            </p>
            <Link to="/subscriptions" className={`mt-2 inline-block text-white text-sm font-semibold px-4 py-2 rounded-md ${isExpired ? 'bg-red-600 hover:bg-red-700' : 'bg-primary-600 hover:bg-primary-700'}`}>
                {isExpired ? 'جدد الآن' : 'إدارة الاشتراك'}
            </Link>
        </div>
    );
}

const ContactButtons: React.FC = () => (
    <div className="bg-gray-100 p-4 rounded-lg mt-8">
        <h3 className="font-bold mb-3 text-gray-800">معلومات الاتصال بالمتجر</h3>
        <p className="text-sm text-gray-600 mb-3">هذه الأزرار تظهر للزبائن في صفحة متجرك.</p>
        <a href="tel:+213123456789" className="flex items-center justify-center w-full bg-gray-200 text-gray-800 font-semibold py-2 rounded-md hover:bg-gray-300 mb-2 transition-colors">
            الهاتف: +213 123 456 789
        </a>
        <a href="https://wa.me/213123456789" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-full bg-green-500 text-white font-semibold py-2 rounded-md hover:bg-green-600 transition-colors">
            <WhatsAppIcon className="w-5 h-5 ml-2" /> تواصل عبر واتساب
        </a>
    </div>
);


const DashboardContent: React.FC<{ view: string, role: UserRole, user: User }> = ({ view, role, user }) => {
    const renderVendorContent = () => {
        switch(role) {
            case UserRole.Farmer:
                return <FarmerDashboardContent view={view} />;
            case UserRole.Wholesaler:
                return <WholesalerDashboardContent view={view} />;
            case UserRole.Retailer:
                return <RetailerDashboardContent view={view} />;
            default:
                return null;
        }
    };
    
    const renderTransporterContent = () => {
         switch (view) {
            case 'overview':
                return <div><h2 className="text-2xl font-bold mb-4">نظرة عامة (ناقل)</h2><p>مرحباً بك في لوحة تحكم الناقل. من هنا يمكنك إدارة عمليات الشحن والتوصيل.</p></div>;
            case 'available_orders':
                return <div><h2 className="text-2xl font-bold mb-4">الطلبات المتاحة للشحن</h2><p>اختر الطلبات التي تود توصيلها بناءً على موقعك ووجهتك.</p></div>;
            case 'schedule':
                 return <div><h2 className="text-2xl font-bold mb-4">جدول التسليم</h2><p>تابع شحناتك الحالية والمجدولة.</p></div>;
            default:
                return <div><h2 className="text-2xl font-bold mb-4">{view}</h2><p>محتوى هذه الصفحة قيد الإنشاء.</p></div>;
        }
    }

    return (
        <div className="flex-1 p-8 overflow-y-auto">
            {user.subscription && <SubscriptionIndicator user={user} />}

            {role === UserRole.Transporter ? renderTransporterContent() : renderVendorContent()}
            
            {role !== UserRole.Transporter && <ContactButtons />}
        </div>
    )
};

export const Dashboard: React.FC = () => {
    const { user } = useAuth();
    const [activeView, setActiveView] = useState('overview');

    if (!user) return null;

    return (
        <div className="flex min-h-[calc(100vh-64px)] bg-gray-50">
            <Sidebar role={user.role} activeView={activeView} setActiveView={setActiveView} />
            <DashboardContent view={activeView} role={user.role} user={user} />
        </div>
    );
};