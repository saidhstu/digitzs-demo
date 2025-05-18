# Digitzs Payment Integration Guide

## Overview

This document provides instructions for integrating the Digitzs payment gateway into any web application using an iframe approach. This implementation allows for secure payment processing without handling sensitive payment data directly in your application.

## Implementation Steps

### 1. Define Data Structures

You'll need to track the following information in your application:

```
Product information:
- ID
- Name
- Description
- Price

Customer shipping information:
- First name
- Last name
- Address
- City
- Zip/postal code
- Email
- Mobile number
```

### 2. Manage Application State

Your application needs to track:
- Selected products
- Customer shipping information
- Payment status (in progress, completed)
- Form validation errors

### 3. Generate Payment URL

Create a function that builds the Digitzs payment URL with all required parameters:

```javascript
function getDigitzsPaymentUrl(products, customerInfo) {
  // Create order payload
  const orderPayload = {
    orderId: `order-${Date.now()}`,
    orderItems: products.map(product => ({
      name: product.name,
      price: product.price,
      quantity: 1,
      sku: `SKU-${product.id}`
    })),
    totalAmount: 100 // Fixed amount of $1.00 (100 cents)
  };
  
  // Build and return the URL with all parameters
  return `https://digitz-iq-ui-iframe-content.s3.us-west-2.amazonaws.com/content-delivery/hppgdigitzs-deetstest8-33603839-4442554-1728056381.html?styles=%257B%2522backgroundColor%2522%253A%2522%2523ffffff%2522%252C%2522inputColor%2522%253A%2522%2523f9fafb%2522%252C%2522inputBorderColor%2522%253A%2522%2523e5e7eb%2522%252C%2522inputBorderWidth%2522%253A%25221%2522%252C%2522buttonColor%2522%253A%2522%25233b82f6%2522%252C%2522buttonTextColor%2522%253A%2522%2523ffffff%2522%252C%2522buttonBorderColor%2522%253A%2522%25233b82f6%2522%252C%2522buttonBorderWidth%2522%253A%25221%2522%252C%2522fontSize%2522%253A%252214%2522%252C%2522fontStyle%2522%253A%2522inherit%2522%252C%2522labelFontSize%2522%253A%252214%2522%252C%2522labelFontStyle%2522%253A%2522inherit%2522%252C%2522buttonFontSize%2522%253A%252214%2522%252C%2522buttonFontStyle%2522%253A%2522inherit%2522%252C%2522borderRadius%2522%253A%25226%2522%252C%2522buttonBorderRadius%2522%253A%25226%2522%257D&isEmailEnabled=true&isZipCodeEnabled=true&feeMode=absorbed&orderPayload=${encodeURIComponent(JSON.stringify(orderPayload))}&email=${encodeURIComponent(customerInfo.email)}&mobileNumber=${encodeURIComponent(customerInfo.mobileNumber)}&zipCode=${encodeURIComponent(customerInfo.zipCode)}&amount=100`;
}
```

### 4. Implement Payment Iframe

Add an iframe element to your payment page that loads the Digitzs payment URL:

```html
<iframe
  src="[URL from getDigitzsPaymentUrl function]"
  style="width: 100%; height: 600px; border: none;"
  title="Payment Gateway"
  id="payment-iframe"
></iframe>

<script>
  // Add event listener for payment success message from iframe
  window.addEventListener('message', function(event) {
    // Check if the message indicates payment success
    if (event.data === 'payment_success' || 
        (typeof event.data === 'object' && event.data.type === 'payment_success')) {
      // Handle successful payment
      handlePaymentSuccess();
    }
  });
  
  function handlePaymentSuccess() {
    // Clear cart data
    localStorage.removeItem('cartItems');
    
    // Show success message
    document.getElementById('success-message').style.display = 'block';
    
    // Redirect after delay
    setTimeout(function() {
      window.location.href = '/';
    }, 3000);
  }
</script>
```

### 5. Handle Payment Success

When payment is successful, the iframe will send a message to the parent window. Your application should:
- Clear the shopping cart
- Show a success message
- Redirect the user to a confirmation page

## URL Parameters Reference

| Parameter | Description |
|-----------|-------------|
| `styles` | JSON object (URL encoded) containing UI customization options |
| `isEmailEnabled` | Boolean to show/hide email field (set to `true`) |
| `isZipCodeEnabled` | Boolean to show/hide zip code field (set to `true`) |
| `feeMode` | Payment fee handling mode (set to `absorbed`) |
| `orderPayload` | JSON object (URL encoded) containing order details |
| `email` | Customer email address |
| `mobileNumber` | Customer phone number |
| `zipCode` | Customer postal code |
| `amount` | Payment amount in cents (e.g., `100` for $1.00) |

## Order Payload Structure

```json
{
  "orderId": "order-1234567890",
  "orderItems": [
    {
      "name": "Product Name",
      "price": 24.99,
      "quantity": 1,
      "sku": "SKU-123"
    }
  ],
  "totalAmount": 100
}
```

## Testing

For testing purposes, use these test card details:
- Card Number: 4111 1111 1111 1111
- Expiry: Any future date
- CVV: Any 3 digits

## Troubleshooting

1. **"Origin must use HTTPS" Error**
   - Ensure your application is served over HTTPS
   - For local development, use a secure tunnel like ngrok

2. **"Amount must be a number" Error**
   - Ensure the `amount` parameter is a number without quotes
   - Check for trailing characters in the URL

3. **Payment Success Not Detected**
   - Implement a more robust event listener that checks for different message formats
   - Add origin verification for security

## Implementation in Different Frameworks

### React/Next.js
```jsx
function PaymentPage() {
  const [showSuccess, setShowSuccess] = useState(false);
  
  useEffect(() => {
    const handleMessage = (event) => {
      if (event.data === 'payment_success') {
        setShowSuccess(true);
        localStorage.removeItem('cartItems');
      }
    };
    
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);
  
  return (
    <div>
      <iframe src={getDigitzsPaymentUrl(products, customerInfo)} />
    </div>
  );
}
```

### Vue.js
```vue
<template>
  <div>
    <iframe :src="paymentUrl" @load="setupMessageListener" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      paymentUrl: this.getDigitzsPaymentUrl()
    }
  },
  methods: {
    setupMessageListener() {
      window.addEventListener('message', this.handleMessage);
    },
    handleMessage(event) {
      if (event.data === 'payment_success') {
        this.$emit('payment-complete');
      }
    }
  },
  beforeUnmount() {
    window.removeEventListener('message', this.handleMessage);
  }
}
</script>
```

### Plain HTML/JavaScript
```html
<div id="payment-container">
  <iframe id="payment-frame" style="width:100%; height:600px; border:none;"></iframe>
</div>

<script>
  document.addEventListener('DOMContentLoaded', function() {
    // Set the iframe src
    document.getElementById('payment-frame').src = getDigitzsPaymentUrl();
    
    // Listen for payment success
    window.addEventListener('message', function(event) {
      if (event.data === 'payment_success') {
        alert('Payment successful!');
        localStorage.removeItem('cartItems');
        setTimeout(() => window.location.href = '/', 3000);
      }
    });
  });
</script>
```

## Converting to Word Document

To convert this Markdown file to a Word document:

1. Open Microsoft Word
2. Click File > Open
3. Browse to this file location
4. Select "All Files" in the file type dropdown
5. Select this .md file and click Open
6. Word will convert the Markdown to a formatted Word document
7. Save as .docx format

Alternatively, you can use an online converter like Pandoc or a Markdown to Word converter website.