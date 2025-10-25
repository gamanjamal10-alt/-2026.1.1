import React, { useState, useContext, createContext } from 'react';
import { HashRouter, Routes, Route, Link, Navigate } from 'react-router-dom';
import { User, UserRole } from './types';
import { WelcomeScreen, AccountTypeScreen } from './pages/AuthScreens';
import { CustomerHomeScreen, ProductDetailScreen, CartScreen, CheckoutScreen, OrderTrackingScreen } from './pages/CustomerScreens';
import { Dashboard } from './components/Dashboard';
import { SubscriptionScreen, SettingsScreen, AdManagementScreen, SubscriptionNoticeScreen } from './pages/StoreManagementScreens';
import { SupportScreen, ChatListScreen, ChatScreen } from './pages/CommunicationScreens';
import { CartIcon, UserCircleIcon, BellIcon, LogoutIcon } from './components/Icons';
import { GeminiChatBot } from './components/GeminiChatBot';

// Mock Data
const mockUsers: { [key: string]: User } = {
  'customer@test.com': { id: '1', name: 'أحمد علي', email: 'customer@test.com', role: UserRole.Customer },
  'farmer@test.com': { id: '2', name: 'مزرعة الخير', email: 'farmer@test.com', role: UserRole.Farmer, subscription: { plan: '6-Month', endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), isActive: true } },
  'wholesaler@test.com': { id: '3', name: 'جملة ماركت', email: 'wholesaler@test.com', role: UserRole.Wholesaler, subscription: { plan: '1-Year', endDate: new Date(Date.now() + 300 * 24 * 60 * 60 * 1000), isActive: true } },
  'retailer@test.com': { id: '4', name: 'بقالة الأصيل', email: 'retailer@test.com', role: UserRole.Retailer, subscription: { plan: 'Free', endDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), isActive: false } }, // Expired
  'transporter@test.com': { id: '5', name: 'نقل إكسبرس', email: 'transporter@test.com', role: UserRole.Transporter },
};

// Auth Context
interface AuthContextType {
  user: User | null;
  login: (email: string) => void;
  logout: () => void;
  setUserRole: (role: UserRole) => void;
}

const AuthContext = createContext<AuthContextType>(null!);
export const useAuth = () => useContext(AuthContext);

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = (email: string) => {
    const foundUser = mockUsers[email] || { id: 'temp', name: 'مستخدم جديد', email, role: UserRole.Customer };
    setUser(foundUser);
  };
  const logout = () => setUser(null);
  const setUserRole = (role: UserRole) => {
      if(user) {
          const isVendor = [UserRole.Farmer, UserRole.Wholesaler, UserRole.Retailer].includes(role);
          const subscription = isVendor ? { plan: 'Free', endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), isActive: true } : undefined;
          setUser({...user, role, subscription});
      }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, setUserRole }}>
      {children}
    </AuthContext.Provider>
  );
};

const Header: React.FC = () => {
    const { user, logout } = useAuth();

    return (
        <header className="bg-white shadow-md sticky top-0 z-50">
            <nav className="container mx-auto px-6 py-3 flex justify-between items-center">
                <Link to="/" className="text-2xl font-bold text-primary-600">سوق الفلاح</Link>
                <div className="flex items-center space-x-4">
                    {user ? (
                        <>
                            {user.role === UserRole.Customer && (
                                <Link to="/cart" className="relative text-gray-600 hover:text-primary-600">
                                    <CartIcon />
                                    <span className="absolute -top-2 -right-2 bg-secondary text-black text-xs rounded-full h-5 w-5 flex items-center justify-center">3</span>
                                </Link>
                            )}
                             {[UserRole.Farmer, UserRole.Wholesaler, UserRole.Retailer, UserRole.Transporter].includes(user.role) && (
                                <Link to="/dashboard" className="text-gray-600 hover:text-primary-600">لوحة التحكم</Link>
                            )}
                            <Link to="/notifications" className="text-gray-600 hover:text-primary-600"><BellIcon /></Link>
                            <Link to="/settings" className="text-gray-600 hover:text-primary-600"><UserCircleIcon /></Link>
                            <button onClick={logout} className="text-gray-600 hover:text-primary-600"><LogoutIcon /></button>
                        </>
                    ) : (
                        <Link to="/auth" className="text-gray-700 hover:text-primary-600 font-semibold">تسجيل الدخول</Link>
                    )}
                </div>
            </nav>
        </header>
    );
};

const ProtectedRoute: React.FC<{ children: React.ReactElement, roles?: UserRole[] }> = ({ children, roles }) => {
    const { user } = useAuth();
    if (!user) return <Navigate to="/auth" />;
    if (roles && !roles.includes(user.role)) return <Navigate to="/" />;
    if (user.subscription && !user.subscription.isActive) return <SubscriptionNoticeScreen />;
    return children;
};

export default function App() {
  return (
    <AuthProvider>
      <HashRouter>
        <div className="bg-gray-50 min-h-screen font-sans">
          <Main />
        </div>
      </HashRouter>
    </AuthProvider>
  );
}

const Main = () => {
    const { user } = useAuth();
    return (
        <>
            {user && <Header />}
            <main>
                <Routes>
                    <Route path="/auth" element={user ? <Navigate to="/" /> : <WelcomeScreen />} />
                    <Route path="/select-role" element={!user ? <Navigate to="/auth" /> : <AccountTypeScreen />} />
                    
                    {/* Customer Routes */}
                    <Route path="/" element={<ProtectedRoute roles={[UserRole.Customer]}><CustomerHomeScreen /></ProtectedRoute>} />
                    <Route path="/product/:id" element={<ProtectedRoute roles={[UserRole.Customer]}><ProductDetailScreen /></ProtectedRoute>} />
                    <Route path="/cart" element={<ProtectedRoute roles={[UserRole.Customer]}><CartScreen /></ProtectedRoute>} />
                    <Route path="/checkout" element={<ProtectedRoute roles={[UserRole.Customer]}><CheckoutScreen /></ProtectedRoute>} />
                    <Route path="/orders" element={<ProtectedRoute roles={[UserRole.Customer]}><OrderTrackingScreen /></ProtectedRoute>} />

                    {/* Shared Routes */}
                    <Route path="/settings" element={<ProtectedRoute><SettingsScreen /></ProtectedRoute>} />
                    <Route path="/support" element={<ProtectedRoute><SupportScreen /></ProtectedRoute>} />
                    <Route path="/chat" element={<ProtectedRoute><ChatListScreen /></ProtectedRoute>} />
                    <Route path="/chat/:id" element={<ProtectedRoute><ChatScreen /></ProtectedRoute>} />
                    <Route path="/notifications" element={<ProtectedRoute><div className="p-8"><h1 className="text-2xl font-bold">الإشعارات</h1><p>لا توجد إشعارات جديدة.</p></div></ProtectedRoute>} />

                    {/* Vendor/Transporter Routes */}
                    <Route path="/dashboard" element={<ProtectedRoute roles={[UserRole.Farmer, UserRole.Wholesaler, UserRole.Retailer, UserRole.Transporter]}><Dashboard /></ProtectedRoute>} />
                    <Route path="/subscriptions" element={<ProtectedRoute roles={[UserRole.Farmer, UserRole.Wholesaler, UserRole.Retailer]}><SubscriptionScreen /></ProtectedRoute>} />
                    <Route path="/ads" element={<ProtectedRoute roles={[UserRole.Farmer, UserRole.Wholesaler, UserRole.Retailer]}><AdManagementScreen /></ProtectedRoute>} />
                    
                    <Route path="*" element={<Navigate to={user ? '/' : '/auth'} />} />
                </Routes>
                {user && <GeminiChatBot />}
            </main>
        </>
    );
}