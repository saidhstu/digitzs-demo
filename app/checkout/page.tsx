"use client";
import { useState, useRef, useEffect } from 'react';
import { ChevronLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

type Product = {
  id: string | number;
  name: string;
  description: string;
  price: number;
};

type ShippingInfo = {
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  zipCode: string;
  email: string;
  mobileNumber: string;
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

export default function Checkout() {
  const router = useRouter();
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [showPaymentIframe, setShowPaymentIframe] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);
  const [shippingInfo, setShippingInfo] = useState<ShippingInfo>({
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    zipCode: '',
    email: '',
    mobileNumber: ''
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  
  // Calculate totals
  const totalPrice = selectedProducts.reduce((sum, product) => sum + product.price, 0);
  const tax = totalPrice * 0.08;
  const totalWithTax = totalPrice + tax;
  const amountInCents = Math.round(totalWithTax * 100);
  
  const handleBackToShopping = () => {
    router.push('/');
  };

  const validateForm = () => {
    const errors: Record<string, string> = {};
    
    if (!shippingInfo.firstName) errors.firstName = "First name is required";
    if (!shippingInfo.lastName) errors.lastName = "Last name is required";
    if (!shippingInfo.address) errors.address = "Address is required";
    if (!shippingInfo.city) errors.city = "City is required";
    if (!shippingInfo.zipCode) errors.zipCode = "Zip code is required";
    if (!shippingInfo.email) errors.email = "Email is required";
    if (!shippingInfo.mobileNumber) errors.mobileNumber = "Mobile number is required";
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleCompleteOrder = () => {
    if (!validateForm()) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    
    // Create order payload for Digitzs
    const orderPayload = {
      orderId: `order-${Date.now()}`,
      orderItems: selectedProducts.map(product => ({
        name: product.name,
        price: product.price,
        quantity: 1,
        sku: `SKU-${product.id}`
      })),
      customer: {
        firstName: shippingInfo.firstName,
        lastName: shippingInfo.lastName,
        email: shippingInfo.email,
        phone: shippingInfo.mobileNumber
      },
      shipping: {
        address: shippingInfo.address,
        city: shippingInfo.city,
        zipCode: shippingInfo.zipCode
      },
      amount: amountInCents + 999 // Adding processing fee
    };
    
    // Show payment iframe
    setShowPaymentIframe(true);
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setShippingInfo(prev => ({ ...prev, [name]: value }));
    // Clear error when user types
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: '' }));
    }
  };
  
  const handlePaymentSuccess = () => {
    setOrderPlaced(true);
    localStorage.removeItem('cartItems');
    setTimeout(() => {
      router.push('/');
    }, 3000);
  };
  
  // Load cart items from localStorage when component mounts
  useEffect(() => {
    const cartItems = typeof window !== 'undefined' ? localStorage.getItem('cartItems') : null;
    if (cartItems) {
      setSelectedProducts(JSON.parse(cartItems));
    }
  }, []);
  
  // Generate Digitzs payment URL
  // const getDigitzsPaymentUrl = () => {
  //   const orderPayload = {
  //     orderId: `order-${Date.now()}`,
  //     orderItems: selectedProducts.map(product => ({
  //       name: product.name,
  //       price: product.price,
  //       quantity: 1,
  //       sku: `SKU-${product.id}`
  //     })),
  //     totalAmount: amountInCents + 999 // Adding processing fee
  //   };
    

  //   return `https://digitz-iq-ui-iframe-content.s3.us-west-2.amazonaws.com/content-delivery/hppgdigitzs-deetstest8-33603839-4442554-1728056381.html?styles=%257B%2522backgroundColor%2522%253A%2522%2523ffffff%2522%252C%2522inputColor%2522%253A%2522%2523f9fafb%2522%252C%2522inputBorderColor%2522%253A%2522%2523e5e7eb%2522%252C%2522inputBorderWidth%2522%253A%25221%2522%252C%2522buttonColor%2522%253A%2522%25233b82f6%2522%252C%2522buttonTextColor%2522%253A%2522%2523ffffff%2522%252C%2522buttonBorderColor%2522%253A%2522%25233b82f6%2522%252C%2522buttonBorderWidth%2522%253A%25221%2522%252C%2522fontSize%2522%253A%252214%2522%252C%2522fontStyle%2522%253A%2522inherit%2522%252C%2522labelFontSize%2522%253A%252214%2522%252C%2522labelFontStyle%2522%253A%2522inherit%2522%252C%2522buttonFontSize%2522%253A%252214%2522%252C%2522buttonFontStyle%2522%253A%2522inherit%2522%252C%2522borderRadius%2522%253A%25226%2522%252C%2522buttonBorderRadius%2522%253A%25226%2522%257D&isEmailEnabled=true&isZipCodeEnabled=true&feeMode=absorbed&orderPayload=${encodeURIComponent(JSON.stringify(orderPayload))}&email=${encodeURIComponent(shippingInfo.email)}&mobileNumber=${encodeURIComponent(shippingInfo.mobileNumber)}&zipCode=${encodeURIComponent(shippingInfo.zipCode)}&amount=100`;
  // };
  

  // Generate Digitzs payment URL
// Generate Digitzs payment URL
const getDigitzsPaymentUrl = () => {
  // Merchant credentials
  const MERCHANT_ID = 'digitzs-deetstest8-33603839-4442554-1728056381';
  const API_KEY = 'pOZnjKUSBk8pEhBoOAu0qzz6WpfqLxm3YmmZnDy2';
  const APP_KEY = 'AK94lx3fPPIFZLhFU1pjI7YVnxvtg4Ln2za2BXOswuBIU3K3gDErj8JsWqd1AjdA';
  // const MERCHANT_ID = 'digitzs-paolomercha-718643500-3230807-1732171363';
  // const API_KEY = 'pOZnjKUSBk8pEhBoOAu0qzz6WpfqLxm3YmmZnDy2';
  // const APP_KEY = 'HTxKp4jh1cSIprscR81zXt6EtsOup1wNf8HPNLr5vTNWMAUloj0i7yEhVmIxZrck';
  
  const orderPayload = {
    orderId: `order-${Date.now()}`,
    orderItems: selectedProducts.map(product => ({
      name: product.name,
      price: product.price,
      quantity: 1,
      sku: `SKU-${product.id}`
    })),
    totalAmount: 100 // Fixed $1.00 amount
  };
  
  // Style settings for the payment form
  const styles = {
    backgroundColor: "#ffffff",
    inputColor: "#f9fafb",
    inputBorderColor: "#e5e7eb",
    inputBorderWidth: "1",
    buttonColor: "#3b82f6",
    buttonTextColor: "#ffffff",
    buttonBorderColor: "#3b82f6",
    buttonBorderWidth: "1",
    fontSize: "14",
    fontStyle: "inherit",
    labelFontSize: "14",
    labelFontStyle: "inherit",
    buttonFontSize: "14",
    buttonFontStyle: "inherit",
    borderRadius: "6",
    buttonBorderRadius: "6"
  };
  
  // Encode the styles object
  const encodedStyles = encodeURIComponent(JSON.stringify(styles));
  
  // Construct URL with authentication parameters
  return `https://checkout.staging.digitzs.com/payment?merchant_id=${MERCHANT_ID}&api_key=${API_KEY}&app_key=${APP_KEY}&styles=${encodedStyles}&isEmailEnabled=true&isZipCodeEnabled=true&feeMode=absorbed&orderPayload=${encodeURIComponent(JSON.stringify(orderPayload))}&email=${encodeURIComponent(shippingInfo.email)}&mobileNumber=${encodeURIComponent(shippingInfo.mobileNumber)}&zipCode=${encodeURIComponent(shippingInfo.zipCode)}&amount=100`;
};



  if (orderPlaced) {
    return (
      <div className="max-w-4xl mx-auto p-6 flex flex-col items-center justify-center min-h-screen">
        <div className="bg-green-50 border border-green-200 rounded-lg p-8 text-center">
          <h1 className="text-3xl font-bold text-green-700 mb-4">Order Placed!</h1>
          <p className="text-gray-700 mb-6">Thank you for your purchase. You will be redirected to the home page shortly.</p>
          <button 
            onClick={handleBackToShopping}
            className="px-6 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-md"
          >
            Return to Store
          </button>
        </div>
      </div>
    );
  }
  
  if (selectedProducts.length === 0) {
    return (
      <div className="max-w-4xl mx-auto p-6 flex flex-col items-center justify-center min-h-screen">
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center">
          <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
          <p className="text-gray-700 mb-6">Looks like you haven't added any items to your cart yet.</p>
          <button 
            onClick={handleBackToShopping}
            className="px-6 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-md flex items-center justify-center gap-2"
          >
            <ChevronLeft size={20} />
            Back to Shopping
          </button>
        </div>
      </div>
    );
  }

  if (showPaymentIframe) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="flex items-center mb-6">
          <button 
            onClick={() => setShowPaymentIframe(false)}
            className="flex items-center text-blue-600 hover:text-blue-800"
          >
            <ChevronLeft size={20} />
            Back to checkout
          </button>
          <h1 className="text-2xl font-bold ml-6">Payment</h1>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow">
          <iframe 
            src={getDigitzsPaymentUrl()}
            className="w-full h-[600px] border-0"
            title="Payment Gateway"
            onLoad={() => {
              // Add event listener for payment success message from iframe
              window.addEventListener('message', (event) => {
                if (event.data === 'payment_success') {
                  handlePaymentSuccess();
                }
              });
            }}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex items-center mb-6">
        <button 
          onClick={handleBackToShopping}
          className="flex items-center text-blue-600 hover:text-blue-800"
        >
          <ChevronLeft size={20} />
          Back to shopping
        </button>
        <h1 className="text-2xl font-bold ml-6">Checkout</h1>
      </div>
      
      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <div className="bg-white p-4 rounded-lg shadow mb-6">
            <h2 className="text-lg font-semibold mb-4">Your Items</h2>
            {selectedProducts.map(product => (
              <div key={product.id} className="flex items-center py-3 border-b last:border-b-0">
                <div className="w-16 h-16 bg-gray-100 rounded overflow-hidden">
                  {getProductIllustration(product.name)}
                </div>
                <div className="ml-4 flex-grow">
                  <h3 className="font-medium">{product.name}</h3>
                  <p className="text-gray-600 text-sm">{product.description}</p>
                </div>
                <div className="font-bold">${product.price.toFixed(2)}</div>
              </div>
            ))}
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-4">Shipping Information</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <input 
                  type="text" 
                  name="firstName"
                  placeholder="First Name" 
                  className={`border p-2 rounded w-full ${formErrors.firstName ? 'border-red-500' : ''}`}
                  value={shippingInfo.firstName}
                  onChange={handleInputChange}
                />
                {formErrors.firstName && <p className="text-red-500 text-xs mt-1">{formErrors.firstName}</p>}
              </div>
              <div>
                <input 
                  type="text" 
                  name="lastName"
                  placeholder="Last Name" 
                  className={`border p-2 rounded w-full ${formErrors.lastName ? 'border-red-500' : ''}`}
                  value={shippingInfo.lastName}
                  onChange={handleInputChange}
                />
                {formErrors.lastName && <p className="text-red-500 text-xs mt-1">{formErrors.lastName}</p>}
              </div>
              <div className="col-span-2">
                <input 
                  type="text" 
                  name="address"
                  placeholder="Address" 
                  className={`border p-2 rounded w-full ${formErrors.address ? 'border-red-500' : ''}`}
                  value={shippingInfo.address}
                  onChange={handleInputChange}
                />
                {formErrors.address && <p className="text-red-500 text-xs mt-1">{formErrors.address}</p>}
              </div>
              <div>
                <input 
                  type="text" 
                  name="city"
                  placeholder="City" 
                  className={`border p-2 rounded w-full ${formErrors.city ? 'border-red-500' : ''}`}
                  value={shippingInfo.city}
                  onChange={handleInputChange}
                />
                {formErrors.city && <p className="text-red-500 text-xs mt-1">{formErrors.city}</p>}
              </div>
              <div>
                <input 
                  type="text" 
                  name="zipCode"
                  placeholder="Postal Code" 
                  className={`border p-2 rounded w-full ${formErrors.zipCode ? 'border-red-500' : ''}`}
                  value={shippingInfo.zipCode}
                  onChange={handleInputChange}
                />
                {formErrors.zipCode && <p className="text-red-500 text-xs mt-1">{formErrors.zipCode}</p>}
              </div>
              <div>
                <input 
                  type="email" 
                  name="email"
                  placeholder="Email" 
                  className={`border p-2 rounded w-full ${formErrors.email ? 'border-red-500' : ''}`}
                  value={shippingInfo.email}
                  onChange={handleInputChange}
                />
                {formErrors.email && <p className="text-red-500 text-xs mt-1">{formErrors.email}</p>}
              </div>
              <div>
                <input 
                  type="tel" 
                  name="mobileNumber"
                  placeholder="Mobile Number" 
                  className={`border p-2 rounded w-full ${formErrors.mobileNumber ? 'border-red-500' : ''}`}
                  value={shippingInfo.mobileNumber}
                  onChange={handleInputChange}
                />
                {formErrors.mobileNumber && <p className="text-red-500 text-xs mt-1">{formErrors.mobileNumber}</p>}
              </div>
            </div>
          </div>
        </div>
        
        <div className="md:col-span-1">
          <div className="bg-white p-4 rounded-lg shadow sticky top-6">
            <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
            <div className="space-y-2 mb-4">
              <div className="flex justify-between">
                <span>Subtotal ({selectedProducts.length} items)</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>$0.00</span>
              </div>
              <div className="flex justify-between">
                <span>Tax</span>
                <span>$0</span>
              </div>
              <div className="flex justify-between">
                <span>Processing Fee</span>
                <span>$0</span>
              </div>
            </div>
            <div className="border-t pt-2">
              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                {/* <span>${(totalWithTax + 9.99).toFixed(2)}</span> */}
                <span>$1</span>
              </div>
            </div>
            <button 
              onClick={handleCompleteOrder}
              className="w-full bg-blue-600 text-white py-2 rounded-md mt-6 hover:bg-blue-700"
            >
              Complete Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}