
import React from 'react';
import { Link } from 'react-router-dom';

const SubscriptionPlan: React.FC<{ title: string; price: string; features: string[]; bestValue?: boolean }> = ({ title, price, features, bestValue }) => (
    <div className={`border rounded-lg p-6 text-center relative ${bestValue ? 'border-primary-500 border-2' : 'border-gray-200'}`}>
        {bestValue && <div className="absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2 bg-primary-500 text-white px-3 py-1 rounded-full text-sm font-semibold">الأكثر شيوعاً</div>}
        <h3 className="text-2xl font-bold">{title}</h3>
        <p className="text-4xl font-extrabold my-4">{price}<span className="text-base font-normal text-gray-500">/دج</span></p>
        <ul className="space-y-2 text-gray-600">
            {features.map((feature, i) => <li key={i}>{feature}</li>)}
        </ul>
        <button className={`w-full py-3 rounded-lg font-semibold mt-6 ${bestValue ? 'bg-primary-600 text-white hover:bg-primary-700' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'}`}>
            اختر الخطة
        </button>
    </div>
);

export const SubscriptionScreen: React.FC = () => {
    return (
        <div className="bg-gray-100 min-h-screen py-12">
            <div className="container mx-auto px-6">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-800">خطط الاشتراك</h1>
                    <p className="text-lg text-gray-600 mt-2">اختر الخطة التي تناسب متجرك. الشهر الأول مجاني بالكامل!</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                    <SubscriptionPlan title="شهر مجاني" price="0" features={['تجربة كاملة للمنصة', 'عرض عدد غير محدود من المنتجات', 'دعم فني']} />
                    <SubscriptionPlan title="6 أشهر" price="5,000" features={['كل ميزات الخطة المجانية', 'تحليلات أداء المتجر', 'أولوية في الدعم']} bestValue />
                    <SubscriptionPlan title="سنة كاملة" price="9,000" features={['كل ميزات خطة 6 أشهر', 'خصم 25% على الإعلانات', 'شارة متجر مميز']} />
                </div>
                <div className="text-center mt-12">
                     <h2 className="text-2xl font-bold mb-4">طرق الدفع المتاحة</h2>
                     <div className="flex justify-center space-x-8">
                        <div className="p-4 bg-white rounded-lg shadow-md">
                            <p className="font-bold">Baridi Mob</p>
                        </div>
                         <div className="p-4 bg-white rounded-lg shadow-md">
                            <p className="font-bold">CCP</p>
                        </div>
                         <div className="p-4 bg-white rounded-lg shadow-md">
                            <p className="font-bold">RedotPay</p>
                        </div>
                     </div>
                     <p className="mt-4 text-gray-600">ملاحظة: الزبائن لا يحتاجون للاشتراك. يتم تفعيل الحساب تلقائياً بعد التسديد.</p>
                </div>
            </div>
        </div>
    );
};


export const SubscriptionNoticeScreen: React.FC = () => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
            <div className="bg-white p-8 rounded-lg shadow-2xl text-center max-w-lg">
                <h2 className="text-3xl font-bold text-red-600 mb-4">تم إنتهاء صلاحية إشتراكك!</h2>
                <p className="text-gray-700 mb-6">
                    لقد انتهت الفترة المجانية أو الاشتراك المدفوع لمتجرك. تم حجب الوصول إلى ميزات المتجر مؤقتًا. يرجى تجديد اشتراكك لاستعادة الوصول الكامل.
                </p>
                <Link to="/subscriptions" className="bg-primary-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-primary-700 transition-colors duration-300">
                    تجديد الاشتراك الآن
                </Link>
            </div>
        </div>
    );
};

export const SettingsScreen: React.FC = () => {
    return (
        <div className="container mx-auto p-8">
            <h1 className="text-3xl font-bold mb-6">الإعدادات العالمية للملف الشخصي</h1>
            <div className="bg-white p-8 rounded-lg shadow-md max-w-2xl mx-auto">
                <form className="space-y-6">
                    <div>
                        <label className="block font-semibold text-gray-700 mb-2">اللغة المفضلة</label>
                        <select className="w-full p-3 border border-gray-300 rounded-lg">
                            <option>العربية</option>
                            <option>English</option>
                            <option>Français</option>
                        </select>
                    </div>
                    <div>
                        <label className="block font-semibold text-gray-700 mb-2">العملة المحلية</label>
                        <select className="w-full p-3 border border-gray-300 rounded-lg">
                            <option>DZD - الدينار الجزائري</option>
                            <option>USD - الدولار الأمريكي</option>
                            <option>EUR - اليورو</option>
                        </select>
                    </div>
                    <div>
                        <label className="block font-semibold text-gray-700 mb-2">المنطقة الزمنية</label>
                        <select className="w-full p-3 border border-gray-300 rounded-lg">
                            <option>Africa/Algiers</option>
                            <option>UTC</option>
                        </select>
                    </div>
                    <button type="submit" className="w-full bg-primary-600 text-white font-bold py-3 rounded-lg hover:bg-primary-700">
                        حفظ التغييرات
                    </button>
                </form>
            </div>
        </div>
    );
};

export const AdManagementScreen: React.FC = () => {
    return (
        <div className="container mx-auto p-8">
            <h1 className="text-3xl font-bold mb-6">إدارة الإعلانات المدفوعة</h1>
            <div className="bg-white p-8 rounded-lg shadow-md">
                <p className="text-gray-700">هنا يمكنك إنشاء وإدارة حملاتك الإعلانية. هذه الميزة قيد التطوير.</p>
                <button className="mt-4 bg-primary-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-primary-700">
                    إنشاء حملة جديدة
                </button>
            </div>
        </div>
    );
};
