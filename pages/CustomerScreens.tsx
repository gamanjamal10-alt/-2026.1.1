
import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Product, CartItem, Order } from '../types';
import { StarIcon, WhatsAppIcon } from '../components/Icons';

// Mock Data
const mockProducts: Product[] = [
    { id: '1', name: 'طماطم طازجة', description: 'طماطم حمراء طازجة من المزرعة مباشرة.', price: 5, imageUrl: 'https://picsum.photos/400/300?image=1060', stock: 100, storeId: '2', storeName: 'مزرعة الخير', rating: 4.5, reviews: 120 },
    { id: '2', name: 'خيار بلدي', description: 'خيار بلدي مقرمش ومثالي للسلطات.', price: 4, imageUrl: 'https://picsum.photos/400/300?image=292', stock: 80, storeId: '2', storeName: 'مزرعة الخير', rating: 4.8, reviews: 95 },
    { id: '3', name: 'زيت زيتون بكر', description: 'زيت زيتون عصره أولى من أجود الأنواع.', price: 25, imageUrl: 'https://picsum.photos/400/300?image=450', stock: 50, storeId: '2', storeName: 'مزرعة الخير', rating: 4.9, reviews: 250 },
    { id: '4', name: 'أرز بسمتي (20 كجم)', description: 'شوال أرز بسمتي عالي الجودة.', price: 150, imageUrl: 'https://picsum.photos/400/300?image=571', stock: 200, storeId: '3', storeName: 'جملة ماركت', rating: 4.2, reviews: 45 },
];

const mockCart: CartItem[] = [
    { ...mockProducts[0], quantity: 2 },
    { ...mockProducts[2], quantity: 1 },
];

const mockOrders: Order[] = [
    { id: 'ORD001', items: mockCart, total: 35, status: 'تم التوصيل', date: new Date('2023-10-25') },
    { id: 'ORD002', items: [{...mockProducts[1], quantity: 5}], total: 20, status: 'في الطريق', date: new Date() },
];


const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden transform hover:-translate-y-1 transition-all duration-300">
            <Link to={`/product/${product.id}`}>
                <img src={product.imageUrl} alt={product.name} className="w-full h-48 object-cover" />
            </Link>
            <div className="p-4">
                <h3 className="font-bold text-lg text-gray-800">{product.name}</h3>
                <p className="text-gray-600 text-sm mt-1">{product.storeName}</p>
                <div className="flex items-center mt-2">
                    <StarIcon className="text-secondary" />
                    <span className="text-gray-600 ml-1">{product.rating}</span>
                    <span className="text-gray-400 ml-2">({product.reviews})</span>
                </div>
                <div className="flex justify-between items-center mt-4">
                    <span className="text-primary-600 font-bold text-xl">{product.price} د.ج</span>
                    <Link to={`/product/${product.id}`} className="px-4 py-2 bg-primary-600 text-white text-sm font-semibold rounded-full hover:bg-primary-700">
                        عرض التفاصيل
                    </Link>
                </div>
            </div>
        </div>
    );
};

export const CustomerHomeScreen: React.FC = () => {
    return (
        <div className="container mx-auto px-6 py-8">
            <div className="mb-8 p-6 bg-primary-100 rounded-lg">
                <h1 className="text-3xl font-bold text-primary-800">استكشف المنتجات الطازجة</h1>
                <p className="text-primary-700 mt-2">أفضل المحاصيل من الحقل إلى منزلك مباشرة.</p>
                <div className="mt-4 relative">
                    <input type="text" placeholder="ابحث عن خضروات, فواكه, ..." className="w-full p-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500"/>
                    <button className="absolute left-0 top-0 mt-2 ml-2 px-4 py-2 bg-primary-600 text-white rounded-full">بحث</button>
                </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {mockProducts.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
        </div>
    );
};

export const ProductDetailScreen: React.FC = () => {
    const { id } = useParams();
    const product = mockProducts.find(p => p.id === id) || mockProducts[0];
    const [quantity, setQuantity] = useState(1);
    
    return (
        <div className="container mx-auto px-6 py-8">
            <div className="bg-white p-8 rounded-lg shadow-xl">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                        <img src={product.imageUrl} alt={product.name} className="w-full h-auto object-cover rounded-lg shadow-md" />
                    </div>
                    <div>
                        <h1 className="text-4xl font-bold text-gray-900">{product.name}</h1>
                        <Link to="#" className="text-lg text-primary-600 hover:underline mt-2 inline-block">{product.storeName}</Link>
                        <div className="flex items-center my-4">
                            {[...Array(5)].map((_, i) => <StarIcon key={i} className={i < Math.round(product.rating) ? 'text-secondary' : 'text-gray-300'} />)}
                            <span className="text-gray-600 ml-2">{product.rating} من أصل {product.reviews} تقييم</span>
                        </div>
                        <p className="text-gray-700 leading-relaxed">{product.description}</p>
                        <p className="text-3xl font-bold text-primary-600 my-4">{product.price * quantity} د.ج</p>
                        <div className="flex items-center space-x-4">
                            <div className="flex items-center border rounded-full">
                                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-4 py-2 text-lg font-bold">-</button>
                                <span className="px-4 py-2 text-lg">{quantity}</span>
                                <button onClick={() => setQuantity(quantity + 1)} className="px-4 py-2 text-lg font-bold">+</button>
                            </div>
                            <button className="flex-1 bg-primary-600 text-white font-bold py-3 rounded-full hover:bg-primary-700 transition">
                                أضف إلى السلة
                            </button>
                        </div>
                        <div className="mt-6 flex space-x-4">
                            <a href="tel:+213123456789" className="flex items-center justify-center w-full bg-gray-200 text-gray-800 font-semibold py-3 rounded-full hover:bg-gray-300">
                                اتصل بالمتجر
                            </a>
                            <a href="https://wa.me/213123456789" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-full bg-green-500 text-white font-semibold py-3 rounded-full hover:bg-green-600">
                                <WhatsAppIcon className="mr-2" /> واتساب
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export const CartScreen: React.FC = () => {
    const total = mockCart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return (
        <div className="container mx-auto px-6 py-8">
            <h1 className="text-3xl font-bold mb-6">عربة التسوق</h1>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-md">
                    {mockCart.map(item => (
                        <div key={item.id} className="flex items-center border-b py-4">
                            <img src={item.imageUrl} alt={item.name} className="w-24 h-24 object-cover rounded-md" />
                            <div className="flex-grow mx-4">
                                <h3 className="font-bold text-lg">{item.name}</h3>
                                <p className="text-sm text-gray-500">{item.storeName}</p>
                            </div>
                            <div className="w-24 text-center">
                                <input type="number" value={item.quantity} className="w-16 text-center border rounded" readOnly/>
                            </div>
                            <div className="w-24 text-center font-bold">{item.price * item.quantity} د.ج</div>
                            <button className="text-red-500 hover:text-red-700 ml-4">✕</button>
                        </div>
                    ))}
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md h-fit">
                    <h2 className="text-xl font-bold border-b pb-4">ملخص الطلب</h2>
                    <div className="flex justify-between my-4">
                        <span>المجموع الفرعي</span>
                        <span>{total} د.ج</span>
                    </div>
                    <div className="flex justify-between my-4">
                        <span>الشحن</span>
                        <span>10 د.ج</span>
                    </div>
                    <div className="flex justify-between font-bold text-lg my-4 border-t pt-4">
                        <span>المجموع الكلي</span>
                        <span>{total + 10} د.ج</span>
                    </div>
                    <Link to="/checkout" className="w-full block text-center bg-primary-600 text-white font-bold py-3 rounded-lg hover:bg-primary-700 transition">
                        المتابعة للدفع
                    </Link>
                </div>
            </div>
        </div>
    );
};

export const CheckoutScreen: React.FC = () => {
    return <div className="p-8"><h1 className="text-2xl font-bold">إتمام الشراء</h1><p>هذه الصفحة قيد الإنشاء.</p></div>;
};

export const OrderTrackingScreen: React.FC = () => {
    const getStatusColor = (status: Order['status']) => {
        switch(status) {
            case 'تم التوصيل': return 'bg-green-100 text-green-800';
            case 'في الطريق': return 'bg-blue-100 text-blue-800';
            case 'تم الشحن': return 'bg-yellow-100 text-yellow-800';
            case 'قيد المعالجة': return 'bg-gray-100 text-gray-800';
        }
    }
    return (
         <div className="container mx-auto px-6 py-8">
            <h1 className="text-3xl font-bold mb-6">تتبع طلباتك</h1>
            <div className="bg-white p-6 rounded-lg shadow-md space-y-4">
                {mockOrders.map(order => (
                    <div key={order.id} className="border p-4 rounded-lg flex justify-between items-center">
                        <div>
                            <p className="font-bold text-lg">طلب #{order.id}</p>
                            <p className="text-sm text-gray-500">{order.date.toLocaleDateString('ar-DZ')}</p>
                            <p className="font-semibold">{order.total} د.ج</p>
                        </div>
                        <span className={`px-3 py-1 text-sm font-semibold rounded-full ${getStatusColor(order.status)}`}>
                            {order.status}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};
