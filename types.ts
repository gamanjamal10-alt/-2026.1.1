
export enum UserRole {
  Customer = 'زبون',
  Farmer = 'فلاح',
  Wholesaler = 'تاجر جملة',
  Retailer = 'تاجر تجزئة',
  Transporter = 'ناقل',
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  subscription?: {
    plan: 'Free' | '6-Month' | '1-Year';
    endDate: Date;
    isActive: boolean;
  };
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  stock: number;
  storeId: string;
  storeName: string;
  rating: number;
  reviews: number;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  status: 'قيد المعالجة' | 'تم الشحن' | 'في الطريق' | 'تم التوصيل';
  date: Date;
}
