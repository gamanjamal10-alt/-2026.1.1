import React from 'react';

// Content for Farmer Dashboard (afb9639a94b044fe8a58f8b2c54cb4da)
export const FarmerDashboardContent: React.FC<{ view: string }> = ({ view }) => {
    switch (view) {
        case 'overview':
            return <div><h2 className="text-2xl font-bold mb-4">نظرة عامة (فلاح)</h2><p>مرحباً بك في لوحة تحكم الفلاح. هنا يمكنك إدارة منتجاتك الزراعية وتتبع مبيعاتك.</p></div>;
        case 'products':
            return (
                <div>
                    <h2 className="text-2xl font-bold mb-4">إدارة المنتجات الزراعية</h2>
                    <p className="mb-4 text-gray-600">أضف منتجاتك الطازجة مع صور حقيقية لإدارة المخزون بفعالية.</p>
                    <div className="bg-white p-4 rounded-lg shadow-md border">
                        <h3 className="font-bold mb-2">قائمة منتجاتك</h3>
                         <p className="text-sm text-gray-500">سيتم عرض قائمة المنتجات الخاصة بك هنا مع خيارات التعديل والحذف.</p>
                         <button className="mt-4 bg-primary-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-primary-700">إضافة منتج جديد</button>
                    </div>
                </div>
            );
        case 'orders':
            return (
                 <div>
                    <h2 className="text-2xl font-bold mb-4">تتبع الطلبات</h2>
                    <p className="mb-4 text-gray-600">عرض وتتبع الطلبات الواردة من الزبائن أو التجار.</p>
                    <div className="bg-white p-4 rounded-lg shadow-md border">
                        <h3 className="font-bold mb-2">الطلبات الجديدة</h3>
                        <p className="text-sm text-gray-500">سيتم عرض قائمة بالطلبات الواردة وحالتها هنا.</p>
                    </div>
                </div>
            );
        default:
             return <div><h2 className="text-2xl font-bold mb-4">{view}</h2><p>محتوى هذه الصفحة قيد الإنشاء.</p></div>;
    }
};

// Content for Wholesaler Dashboard (ffa7423f46144f66a437c07fe664045b)
export const WholesalerDashboardContent: React.FC<{ view: string }> = ({ view }) => {
     switch (view) {
        case 'overview':
            return <div><h2 className="text-2xl font-bold mb-4">نظرة عامة (تاجر جملة)</h2><p>مرحباً بك في لوحة تحكم تاجر الجملة. قم بإدارة الطلبات الكبيرة وتتبع الموردين.</p></div>;
        case 'products':
            return (
                <div>
                    <h2 className="text-2xl font-bold mb-4">عرض المنتجات بالجملة</h2>
                    <p className="mb-4 text-gray-600">إدارة المنتجات المتاحة للبيع بكميات كبيرة وأسعار الجملة.</p>
                    <div className="bg-white p-4 rounded-lg shadow-md border">
                        <h3 className="font-bold mb-2">كتالوج الجملة</h3>
                         <p className="text-sm text-gray-500">سيتم عرض منتجات الجملة هنا مع الأسعار والكميات المتاحة.</p>
                    </div>
                </div>
            );
        case 'orders':
            return (
                 <div>
                    <h2 className="text-2xl font-bold mb-4">إدارة الطلبات الكبيرة</h2>
                    <p className="mb-4 text-gray-600">أدوات مخصصة للتعامل مع طلبات الجملة وتتبعها بكفاءة.</p>
                    <div className="bg-white p-4 rounded-lg shadow-md border">
                        <h3 className="font-bold mb-2">طلبات الجملة</h3>
                        <p className="text-sm text-gray-500">سيتم عرض قائمة بطلبات الجملة وحالتها هنا.</p>
                    </div>
                </div>
            );
        default:
             return <div><h2 className="text-2xl font-bold mb-4">{view}</h2><p>محتوى هذه الصفحة قيد الإنشاء.</p></div>;
    }
};

// Content for Retailer Dashboard (02bf420d42f344dcb7b7e51e468e5ddb)
export const RetailerDashboardContent: React.FC<{ view: string }> = ({ view }) => {
     switch (view) {
        case 'overview':
            return <div><h2 className="text-2xl font-bold mb-4">نظرة عامة (تاجر تجزئة)</h2><p>مرحباً بك في لوحة تحكم تاجر التجزئة. تابع مبيعاتك اليومية وأدر مخزون متجرك.</p></div>;
        case 'products':
            return (
                <div>
                    <h2 className="text-2xl font-bold mb-4">عرض منتجات المتجر</h2>
                    <p className="mb-4 text-gray-600">إدارة المنتجات الفردية التي تبيعها في متجرك بالتجزئة.</p>
                    <div className="bg-white p-4 rounded-lg shadow-md border">
                        <h3 className="font-bold mb-2">منتجات التجزئة</h3>
                        <p className="text-sm text-gray-500">سيتم عرض قائمة منتجاتك هنا مع إدارة الأسعار والمخزون.</p>
                    </div>
                </div>
            );
        case 'orders':
            return (
                 <div>
                    <h2 className="text-2xl font-bold mb-4">إدارة المبيعات اليومية</h2>
                    <p className="mb-4 text-gray-600">أدوات لتتبع المبيعات اليومية وتقارير الأداء لتحسين عملك.</p>
                    <div className="bg-white p-4 rounded-lg shadow-md border">
                        <h3 className="font-bold mb-2">تقارير المبيعات</h3>
                        <p className="text-sm text-gray-500">سيتم عرض رسوم بيانية وتقارير عن مبيعاتك هنا.</p>
                    </div>
                </div>
            );
        default:
             return <div><h2 className="text-2xl font-bold mb-4">{view}</h2><p>محتوى هذه الصفحة قيد الإنشاء.</p></div>;
    }
};