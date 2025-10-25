
import React from 'react';
import { Link } from 'react-router-dom';

export const SupportScreen: React.FC = () => {
    return (
        <div className="container mx-auto p-8">
            <h1 className="text-3xl font-bold text-center mb-8">الدعم الفني</h1>
            <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-white p-6 rounded-lg shadow-md text-center">
                    <h2 className="text-xl font-bold mb-2">الدردشة المباشرة</h2>
                    <p className="text-gray-600 mb-4">تحدث مع أحد ممثلي الدعم الآن.</p>
                    <button className="bg-primary-600 text-white font-semibold py-2 px-4 rounded-lg">ابدأ الدردشة</button>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md text-center">
                    <h2 className="text-xl font-bold mb-2">البريد الإلكتروني</h2>
                    <p className="text-gray-600 mb-4">أرسل لنا استفسارك وسنرد عليك.</p>
                    <a href="mailto:support@soukalfellah.com" className="bg-primary-600 text-white font-semibold py-2 px-4 rounded-lg">أرسل بريدًا</a>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md text-center">
                    <h2 className="text-xl font-bold mb-2">الأسئلة الشائعة</h2>
                    <p className="text-gray-600 mb-4">تصفح إجابات لأكثر الأسئلة شيوعًا.</p>
                    <button className="bg-primary-600 text-white font-semibold py-2 px-4 rounded-lg">عرض الأسئلة</button>
                </div>
            </div>
        </div>
    );
};

export const ChatListScreen: React.FC = () => {
    const chats = [
        { id: '1', name: 'مزرعة الخير', lastMessage: 'نعم، الطماطم متوفرة.', time: '10:30 ص' },
        { id: '2', name: 'جملة ماركت', lastMessage: 'تم شحن طلبك.', time: 'أمس' },
    ];
    return (
        <div className="container mx-auto p-8">
            <h1 className="text-3xl font-bold mb-6">قائمة الدردشات</h1>
            <div className="bg-white rounded-lg shadow-md">
                {chats.map(chat => (
                    <Link to={`/chat/${chat.id}`} key={chat.id} className="flex items-center p-4 border-b hover:bg-gray-50">
                        <img src={`https://picsum.photos/seed/${chat.id}/50/50`} alt={chat.name} className="w-12 h-12 rounded-full" />
                        <div className="flex-grow mx-4">
                            <p className="font-bold">{chat.name}</p>
                            <p className="text-sm text-gray-500">{chat.lastMessage}</p>
                        </div>
                        <span className="text-xs text-gray-400">{chat.time}</span>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export const ChatScreen: React.FC = () => {
    return (
        <div className="flex flex-col h-[calc(100vh-64px)]">
            <header className="bg-white p-4 shadow-md flex items-center">
                <img src="https://picsum.photos/seed/1/40/40" alt="مزرعة الخير" className="w-10 h-10 rounded-full" />
                <h2 className="font-bold text-lg mx-3">مزرعة الخير</h2>
            </header>
            <div className="flex-1 bg-gray-100 p-4 overflow-y-auto">
                {/* Messages will go here */}
                <div className="flex justify-start mb-4">
                    <div className="bg-white p-3 rounded-lg max-w-xs">
                        <p>السلام عليكم، هل الطماطم متوفرة؟</p>
                    </div>
                </div>
                <div className="flex justify-end mb-4">
                    <div className="bg-primary-100 p-3 rounded-lg max-w-xs">
                        <p>وعليكم السلام. نعم، متوفرة وبكميات كبيرة.</p>
                    </div>
                </div>
            </div>
            <footer className="bg-white p-4">
                <div className="flex items-center">
                    <input type="text" placeholder="اكتب رسالتك..." className="flex-1 p-3 border rounded-full focus:outline-none" />
                    <button className="bg-primary-600 text-white font-bold p-3 rounded-full mx-2">أرسل</button>
                </div>
            </footer>
        </div>
    );
};
