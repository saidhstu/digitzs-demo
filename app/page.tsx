"use client";
import { useState, useEffect } from 'react';
import { ShoppingCart } from 'lucide-react';
import { useRouter } from 'next/navigation';

type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
};

type ProductCardProps = {
  product: Product;
  isSelected: boolean;
  onToggleSelect: (product: Product) => void;
};

type CartSummaryProps = {
  selectedProducts: Product[];
  onCheckout: () => void;
  onClearCart: () => void;
};


// Product SVG Components
const ProductIllustrations = {
  // T-Shirt SVG
  TShirt: () => (
    <svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">
      <rect width="400" height="300" fill="#f8f9fa" />
      <path d="M140 80 L260 80 L280 120 L340 100 L320 180 L280 160 L280 240 L120 240 L120 160 L80 180 L60 100 L120 120 Z" 
        fill="#ffffff" stroke="#000000" strokeWidth="3" />
      <circle cx="200" cy="120" r="10" fill="#444444" />
      <line x1="200" y1="130" x2="200" y2="180" stroke="#444444" strokeWidth="3" />
    </svg>
  ),
  
  // Jeans SVG
  Jeans: () => (
    <svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">
      <rect width="400" height="300" fill="#f8f9fa" />
      <path d="M140 60 L260 60 L260 100 L250 260 L200 280 L150 260 L140 100 Z" 
        fill="#3b5998" stroke="#000000" strokeWidth="3" />
      <path d="M140 60 L260 60 L260 100 L200 100 L140 100 Z" 
        fill="#5272b8" stroke="#000000" strokeWidth="3" />
      <circle cx="200" cy="80" r="6" fill="#b8926e" />
      <line x1="200" y1="100" x2="200" y2="260" stroke="#1d3c78" strokeWidth="2" />
      <path d="M150 160 L180 160" stroke="#ffffff" strokeWidth="2" />
      <path d="M220 160 L250 160" stroke="#ffffff" strokeWidth="2" />
    </svg>
  ),

  // Running Shoes SVG
  Shoes: () => (
    <svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">
      <rect width="400" height="300" fill="#f8f9fa" />
      <path d="M80 170 Q110 130 160 140 Q240 150 300 170 Q330 186 330 210 L320 240 Q260 250 100 250 L80 230 Z" 
        fill="#f05a28" stroke="#000000" strokeWidth="3" />
      <path d="M80 230 L100 250 L80 250 L60 230 Z" 
        fill="#333333" stroke="#000000" strokeWidth="2" />
      <path d="M310 210 Q320 220 320 240" stroke="#000000" strokeWidth="3" fill="none" />
      <path d="M100 250 L320 240 L330 210" stroke="#000000" strokeWidth="2" fill="none" />
      <path d="M120 210 Q180 200 300 220" stroke="#ffffff" strokeWidth="3" fill="none" />
      <ellipse cx="270" cy="190" rx="15" ry="15" fill="#ffffff" stroke="#000000" strokeWidth="1" />
      <path d="M120 180 Q140 160 160 170" stroke="#555555" strokeWidth="2" fill="none" />
    </svg>
  ),

  // Wallet SVG
  Wallet: () => (
    <svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">
      <rect width="400" height="300" fill="#f8f9fa" />
      <rect x="80" y="100" width="240" height="140" rx="10" fill="#8c4a2e" stroke="#000000" strokeWidth="3" />
      <rect x="80" y="120" width="240" height="20" fill="#6b3922" stroke="#000000" strokeWidth="1" />
      <rect x="240" y="150" width="60" height="40" rx="5" fill="#444444" stroke="#000000" strokeWidth="2" />
      <line x1="120" y1="180" x2="200" y2="180" stroke="#6b3922" strokeWidth="3" />
      <line x1="120" y1="200" x2="180" y2="200" stroke="#6b3922" strokeWidth="3" />
      <circle cx="270" cy="170" r="10" fill="#666666" />
    </svg>
  ),

  // Headphones SVG
  Headphones: () => (
    <svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">
      <rect width="400" height="300" fill="#f8f9fa" />
      <path d="M120 170 Q120 90 200 90 Q280 90 280 170" fill="none" stroke="#000000" strokeWidth="5" />
      <rect x="90" y="170" width="30" height="80" rx="10" fill="#333333" stroke="#000000" strokeWidth="3" />
      <rect x="280" y="170" width="30" height="80" rx="10" fill="#333333" stroke="#000000" strokeWidth="3" />
      <circle cx="105" cy="210" r="30" fill="#666666" stroke="#000000" strokeWidth="3" />
      <circle cx="295" cy="210" r="30" fill="#666666" stroke="#000000" strokeWidth="3" />
      <path d="M180 90 Q200 70 220 90" fill="none" stroke="#000000" strokeWidth="3" />
      <circle cx="105" cy="210" r="15" fill="#444444" stroke="#000000" strokeWidth="1" />
      <circle cx="295" cy="210" r="15" fill="#444444" stroke="#000000" strokeWidth="1" />
    </svg>
  ),

  // Smart Watch SVG
  Watch: () => (
    <svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">
      <rect width="400" height="300" fill="#f8f9fa" />
      <rect x="140" y="90" width="120" height="140" rx="20" fill="#333333" stroke="#000000" strokeWidth="3" />
      <rect x="150" y="100" width="100" height="120" rx="10" fill="#222222" stroke="#000000" strokeWidth="2" />
      <path d="M140 110 Q120 150 140 200" fill="none" stroke="#666666" strokeWidth="10" />
      <path d="M260 110 Q280 150 260 200" fill="none" stroke="#666666" strokeWidth="10" />
      <circle cx="200" cy="160" r="40" fill="#111111" stroke="#444444" strokeWidth="2" />
      <line x1="200" y1="130" x2="200" y2="160" stroke="#47d7ac" strokeWidth="3" />
      <line x1="200" y1="160" x2="230" y2="160" stroke="#47d7ac" strokeWidth="3" />
      <circle cx="200" cy="160" r="6" fill="#47d7ac" />
      <rect x="170" y="190" width="60" height="4" rx="2" fill="#47d7ac" />
    </svg>
  )
};

// Sample product data
const products = [
  {
    id: 1,
    name: 'Classic T-Shirt',
    price: 1,
    description: 'Comfortable cotton t-shirt for everyday wear'
  },
  {
    id: 2,
    name: 'Denim Jeans',
    price: 1,
    description: 'High-quality denim jeans with perfect fit'
  },
  {
    id: 3,
    name: 'Running Shoes',
    price: 89.99,
    description: 'Lightweight shoes ideal for jogging and running'
  },
  {
    id: 4,
    name: 'Leather Wallet',
    price: 34.99,
    description: 'Genuine leather wallet with multiple card slots'
  },
  {
    id: 5,
    name: 'Wireless Headphones',
    price: 129.99,
    description: 'Noise-cancelling wireless headphones with long battery life'
  },
  {
    id: 6,
    name: 'Smart Watch',
    price: 199.99,
    description: 'Fitness tracker with heart rate monitor and notifications'
  }
];

// Helper function to get product illustration based on name
const getProductIllustration = (name: string) => {
  if (name.includes('T-Shirt')) return <ProductIllustrations.TShirt />;
  if (name.includes('Jeans')) return <ProductIllustrations.Jeans />;
  if (name.includes('Shoes')) return <ProductIllustrations.Shoes />;
  if (name.includes('Wallet')) return <ProductIllustrations.Wallet />;
  if (name.includes('Headphones')) return <ProductIllustrations.Headphones />;
  if (name.includes('Watch')) return <ProductIllustrations.Watch />;
  return null;
};

// Product Card Component
const ProductCard = ({ product, isSelected, onToggleSelect }: ProductCardProps) => {

  return (
    <div className={`border rounded-lg overflow-hidden shadow-md transition-all ${isSelected ? 'ring-2 ring-blue-500 bg-blue-50' : ''}`}>
      <div className="w-full h-48 bg-gray-100">
        {getProductIllustration(product.name)}
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold">{product.name}</h3>
        <p className="text-gray-600 text-sm mb-2">{product.description}</p>
        <div className="flex justify-between items-center mt-4">
          <span className="font-bold text-lg">${product.price.toFixed(2)}</span>
          <button 
            onClick={() => onToggleSelect(product)}
            className={`px-3 py-1 rounded-md ${isSelected ? 'bg-blue-600 text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
          >
            {isSelected ? 'Selected' : 'Add to Cart'}
          </button>
        </div>
      </div>
    </div>
  );
};

// Cart Summary Component
const CartSummary = ({ selectedProducts, onCheckout, onClearCart }: CartSummaryProps) => {

  const totalItems = selectedProducts.length;
  const totalPrice = selectedProducts.reduce((sum, product) => sum + product.price, 0);
  
  if (totalItems === 0) return null;
  
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg p-4 flex justify-between items-center">
      <div className='ml-200 '>
        <p className="font-semibold text-xl">
          {totalItems} {totalItems === 1 ? 'item' : 'items'} in cart
        </p>
        <p className="text-xl font-bold">Total: ${totalPrice.toFixed(2)}</p>
      </div>
      <div className="flex gap-2">
        <button 
          onClick={onClearCart}
          className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-md"
        >
          Clear Cart
        </button>
        <button 
          onClick={onCheckout} 
          className="px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-md flex items-center gap-2"
        >
          <ShoppingCart size={18} />
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

// Main Store Component for Home Page
export default function Home() {
  const router = useRouter();
  const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);
  
  // Load cart items from localStorage on initial render
  useEffect(() => {
    const savedCart = localStorage.getItem('cartItems');
    if (savedCart) {
      setSelectedProducts(JSON.parse(savedCart));
    }
  }, []);
  
  // Save cart items to localStorage whenever they change
  useEffect(() => {
    if (selectedProducts.length > 0) {
      localStorage.setItem('cartItems', JSON.stringify(selectedProducts));
    } else {
      localStorage.removeItem('cartItems');
    }
  }, [selectedProducts]);
  
const handleToggleSelect = (product: Product) => {
  if (selectedProducts.find(p => p.id === product.id)) {
    setSelectedProducts(selectedProducts.filter(p => p.id !== product.id));
  } else {
    setSelectedProducts([...selectedProducts, product]);
  }
};

  const handleCheckout = () => {
    if (selectedProducts.length > 0) {
      // Navigate to the checkout page with the explicit URL
      router.push('/checkout');
    }
  };
  
  const handleClearCart = () => {
    setSelectedProducts([]);
  };
  
  return (
    <div className="max-w-6xl mx-auto p-6 pb-24">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Simple Store</h1>
        <div className="relative cursor-pointer" onClick={handleCheckout}>
          <ShoppingCart size={24} />
          {selectedProducts.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {selectedProducts.length}
            </span>
          )}
        </div>
      </header>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map(product => (
          <ProductCard 
            key={product.id} 
            product={product} 
            isSelected={selectedProducts.some(p => p.id === product.id)}
            onToggleSelect={handleToggleSelect}
          />
        ))}
      </div>
      
      <CartSummary 
        selectedProducts={selectedProducts} 
        onCheckout={handleCheckout}
        onClearCart={handleClearCart}
      />
    </div>
  );
}