
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../App';
import { UserRole } from '../types';
import { FarmerIcon, WholesalerIcon, RetailerIcon, TransporterIcon, CustomerIcon } from '../components/Icons';

export const WelcomeScreen: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      alert('الرجاء إدخال البريد الإلكتروني');
      return;
    }
    login(email);
    // In a real app, role would be determined by backend. Here we assume new users must select a role.
    if (!email.includes('@test.com')) {
      navigate('/select-role');
    } else {
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-cover bg-center" style={{ backgroundImage: "url('https://picsum.photos/1600/900?image=1059')" }}>
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      <div className="relative z-10 p-8 bg-white bg-opacity-90 rounded-2xl shadow-2xl w-full max-w-md text-center">
        <h1 className="text-4xl font-bold text-primary-700 mb-2">مرحباً بك في سوق الفلاح</h1>
        <p className="text-gray-600 mb-6">منصتك للتجارة الزراعية الحديثة</p>
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="البريد الإلكتروني"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            required
          />
          <input
            type="password"
            placeholder="كلمة المرور"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            required
          />
          <button type="submit" className="w-full bg-primary-600 text-white font-bold py-3 rounded-lg hover:bg-primary-700 transition-colors duration-300">
            تسجيل الدخول / إنشاء حساب
          </button>
        </form>
        <p className="mt-4 text-sm text-gray-500">
          بالتسجيل، فإنك توافق على شروط الخدمة وسياسة الخصوصية.
        </p>
      </div>
    </div>
  );
};


const RoleCard: React.FC<{ role: UserRole, icon: React.ReactNode, onClick: (role: UserRole) => void }> = ({ role, icon, onClick }) => (
    <div
        onClick={() => onClick(role)}
        className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transform transition-all duration-300 cursor-pointer flex flex-col items-center text-center border-2 border-transparent hover:border-primary-500"
    >
        <div className="text-primary-600 mb-4">{icon}</div>
        <h3 className="text-xl font-bold text-gray-800">{role}</h3>
    </div>
);

export const AccountTypeScreen: React.FC = () => {
  const { setUserRole } = useAuth();
  const navigate = useNavigate();

  const handleRoleSelect = (role: UserRole) => {
    setUserRole(role);
    if (role === UserRole.Customer) {
        navigate('/');
    } else if (role === UserRole.Transporter) {
        navigate('/dashboard');
    } else {
        navigate('/subscriptions');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-4xl text-center">
        <h1 className="text-4xl font-bold text-primary-700 mb-4">اختر نوع حسابك</h1>
        <p className="text-lg text-gray-600 mb-10">حدد دورك في منصة سوق الفلاح للبدء.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          <RoleCard role={UserRole.Farmer} icon={<FarmerIcon />} onClick={handleRoleSelect} />
          <RoleCard role={UserRole.Wholesaler} icon={<WholesalerIcon />} onClick={handleRoleSelect} />
          <RoleCard role={UserRole.Retailer} icon={<RetailerIcon />} onClick={handleRoleSelect} />
          <RoleCard role={UserRole.Transporter} icon={<TransporterIcon />} onClick={handleRoleSelect} />
          <RoleCard role={UserRole.Customer} icon={<CustomerIcon />} onClick={handleRoleSelect} />
        </div>
      </div>
    </div>
  );
};
