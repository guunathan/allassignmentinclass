<!DOCTYPE html>
<html lang="th">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Shopping Cart System</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Inter', -apple-system, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            padding: 20px;
        }

        .container {
            max-width: 1200px;
            margin: 0 auto;
            display: grid;
            grid-template-columns: 2fr 1fr;
            gap: 20px;
        }

        .card {
            background: white;
            border-radius: 20px;
            padding: 30px;
            box-shadow: 0 20px 60px rgba(0,0,0,0.3);
        }

        h1 {
            color: #667eea;
            margin-bottom: 10px;
            font-size: 2em;
        }

        h2 {
            color: #333;
            margin-bottom: 20px;
            font-size: 1.5em;
        }

        .subtitle {
            color: #666;
            margin-bottom: 20px;
        }

        /* Products Section */
        .products-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
            gap: 15px;
            margin-bottom: 20px;
        }

        .product-card {
            border: 2px solid #e0e0e0;
            border-radius: 12px;
            padding: 15px;
            transition: all 0.3s;
            cursor: pointer;
        }

        .product-card:hover {
            border-color: #667eea;
            transform: translateY(-5px);
            box-shadow: 0 5px 20px rgba(102, 126, 234, 0.3);
        }

        .product-image {
            width: 100%;
            height: 120px;
            background: linear-gradient(135deg, #667eea, #764ba2);
            border-radius: 8px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 3em;
            margin-bottom: 10px;
        }

        .product-name {
            font-weight: 600;
            color: #333;
            margin-bottom: 5px;
        }

        .product-price {
            color: #667eea;
            font-size: 1.2em;
            font-weight: bold;
            margin-bottom: 10px;
        }

        .product-stock {
            color: #666;
            font-size: 0.9em;
            margin-bottom: 10px;
        }

        .btn {
            padding: 10px 20px;
            border: none;
            border-radius: 8px;
            cursor: pointer;
            font-weight: 600;
            transition: all 0.3s;
            width: 100%;
        }

        .btn-primary {
            background: #667eea;
            color: white;
        }

        .btn-primary:hover:not(:disabled) {
            background: #5568d3;
            transform: translateY(-2px);
        }

        .btn-primary:disabled {
            background: #ccc;
            cursor: not-allowed;
        }

        /* Cart Section */
        .cart-items {
            margin-bottom: 20px;
        }

        .cart-item {
            display: flex;
            align-items: center;
            gap: 15px;
            padding: 15px;
            background: #f9f9f9;
            border-radius: 10px;
            margin-bottom: 10px;
            animation: slideIn 0.3s;
        }

        @keyframes slideIn {
            from {
                opacity: 0;
                transform: translateX(-20px);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }

        .cart-item-image {
            width: 60px;
            height: 60px;
            background: linear-gradient(135deg, #667eea, #764ba2);
            border-radius: 8px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 2em;
        }

        .cart-item-info {
            flex: 1;
        }

        .cart-item-name {
            font-weight: 600;
            color: #333;
            margin-bottom: 5px;
        }

        .cart-item-price {
            color: #667eea;
            font-size: 0.9em;
        }

        .quantity-controls {
            display: flex;
            align-items: center;
            gap: 10px;
        }

        .quantity-btn {
            width: 30px;
            height: 30px;
            border: none;
            background: #667eea;
            color: white;
            border-radius: 50%;
            cursor: pointer;
            font-size: 16px;
            transition: all 0.2s;
        }

        .quantity-btn:hover {
            background: #5568d3;
            transform: scale(1.1);
        }

        .quantity-display {
            min-width: 30px;
            text-align: center;
            font-weight: 600;
        }

        .btn-remove {
            padding: 8px 15px;
            background: #ff6b6b;
            color: white;
            border: none;
            border-radius: 6px;
            cursor: pointer;
            font-size: 0.9em;
        }

        .btn-remove:hover {
            background: #ff5252;
        }

        .empty-cart {
            text-align: center;
            padding: 40px;
            color: #999;
        }

        /* Coupon Section */
        .coupon-section {
            margin: 20px 0;
            padding: 20px;
            background: #f0f4ff;
            border-radius: 10px;
        }

        .coupon-input-group {
            display: flex;
            gap: 10px;
            margin-bottom: 10px;
        }

        .coupon-input {
            flex: 1;
            padding: 10px;
            border: 2px solid #e0e0e0;
            border-radius: 8px;
            font-size: 14px;
        }

        .coupon-message {
            padding: 10px;
            border-radius: 6px;
            margin-top: 10px;
            font-size: 0.9em;
        }

        .coupon-message.success {
            background: #d4edda;
            color: #155724;
        }

        .coupon-message.error {
            background: #f8d7da;
            color: #721c24;
        }

        /* Summary Section */
        .summary-row {
            display: flex;
            justify-content: space-between;
            padding: 10px 0;
            border-bottom: 1px solid #e0e0e0;
        }

        .summary-row.total {
            border-bottom: none;
            font-size: 1.3em;
            font-weight: bold;
            color: #667eea;
            margin-top: 10px;
            padding-top: 15px;
            border-top: 2px solid #667eea;
        }

        .discount {
            color: #ff6b6b;
        }

        .btn-checkout {
            width: 100%;
            padding: 15px;
            background: linear-gradient(135deg, #667eea, #764ba2);
            color: white;
            border: none;
            border-radius: 10px;
            font-size: 1.1em;
            font-weight: bold;
            cursor: pointer;
            margin-top: 20px;
            transition: all 0.3s;
        }

        .btn-checkout:hover:not(:disabled) {
            transform: translateY(-3px);
            box-shadow: 0 10px 25px rgba(102, 126, 234, 0.4);
        }

        .btn-checkout:disabled {
            background: #ccc;
            cursor: not-allowed;
        }

        .loading {
            display: inline-block;
            width: 15px;
            height: 15px;
            border: 3px solid rgba(255,255,255,.3);
            border-radius: 50%;
            border-top-color: white;
            animation: spin 1s ease-in-out infinite;
        }

        @keyframes spin {
            to { transform: rotate(360deg); }
        }

        @media (max-width: 768px) {
            .container {
                grid-template-columns: 1fr;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <!-- Products Section -->
        <div class="card">
            <h1>🛍️ ร้านค้า</h1>
            <p class="subtitle">เลือกสินค้าที่คุณต้องการ</p>
            <div class="products-grid" id="productsGrid"></div>
        </div>

        <!-- Cart Section -->
        <div class="card">
            <h2>🛒 ตะกร้าสินค้า</h2>
            <div class="cart-items" id="cartItems"></div>

            <div class="coupon-section">
                <h3 style="margin-bottom: 10px; font-size: 1.1em;">🎟️ ใส่คูปอง</h3>
                <div class="coupon-input-group">
                    <input type="text" id="couponInput" class="coupon-input" placeholder="กรอกโค้ดคูปอง">
                    <button class="btn btn-primary" onclick="applyCoupon()">ใช้</button>
                </div>
                <div id="couponMessage"></div>
            </div>

            <div class="summary">
                <div class="summary-row">
                    <span>ราคารวม:</span>
                    <span id="subtotal">฿0</span>
                </div>
                <div class="summary-row">
                    <span>ส่วนลด:</span>
                    <span class="discount" id="discount">฿0</span>
                </div>
                <div class="summary-row total">
                    <span>ยอดรวมสุทธิ:</span>
                    <span id="total">฿0</span>
                </div>
            </div>

            <button class="btn-checkout" id="checkoutBtn" onclick="checkout()">
                สั่งซื้อสินค้า
            </button>
        </div>
    </div>

    <script>
        // ==========================================
        // DATA & STATE MANAGEMENT
        // ==========================================

        // สินค้าทั้งหมด
        const products = [
            { id: 1, name: 'Laptop', price: 25000, stock: 5, emoji: '💻' },
            { id: 2, name: 'Smartphone', price: 15000, stock: 10, emoji: '📱' },
            { id: 3, name: 'Headphones', price: 3000, stock: 15, emoji: '🎧' },
            { id: 4, name: 'Keyboard', price: 2000, stock: 20, emoji: '⌨️' },
            { id: 5, name: 'Mouse', price: 800, stock: 25, emoji: '🖱️' },
            { id: 6, name: 'Monitor', price: 8000, stock: 8, emoji: '🖥️' }
        ];

        // คูปองส่วนลด (จำลอง database)
        const coupons = {
            'SAVE10': { type: 'percentage', value: 10, minAmount: 5000 },
            'SAVE500': { type: 'fixed', value: 500, minAmount: 3000 },
            'FIRST20': { type: 'percentage', value: 20, minAmount: 10000 },
            'SPECIAL': { type: 'fixed', value: 1000, minAmount: 15000 }
        };

        // State
        let cart = []; // { productId, quantity }
        let appliedCoupon = null;

        // ==========================================
        // INITIALIZATION
        // ==========================================

        function init() {
            renderProducts();
            renderCart();
        }

        // ==========================================
        // PRODUCT RENDERING (ใช้ for...of loop)
        // ==========================================

        function renderProducts() {
            const grid = document.getElementById('productsGrid');
            grid.innerHTML = '';

            // ใช้ for...of เพื่อวนผ่านสินค้า
            for (const product of products) {
                const isInCart = cart.find(item => item.productId === product.id);
                const cartQty = isInCart ? isInCart.quantity : 0;
                const availableStock = product.stock - cartQty;

                const card = document.createElement('div');
                card.className = 'product-card';
                card.innerHTML = `
                    <div class="product-image">${product.emoji}</div>
                    <div class="product-name">${product.name}</div>
                    <div class="product-price">฿${product.price.toLocaleString()}</div>
                    <div class="product-stock">
                        คงเหลือ: ${availableStock} ชิ้น
                    </div>
                    <button 
                        class="btn btn-primary" 
                        onclick="addToCart(${product.id})"
                        ${availableStock <= 0 ? 'disabled' : ''}>
                        ${availableStock <= 0 ? 'สินค้าหมด' : 'เพิ่มลงตะกร้า'}
                    </button>
                `;

                grid.appendChild(card);
            }
        }

        // ==========================================
        // CART OPERATIONS (ใช้ if-else, switch)
        // ==========================================

        function addToCart(productId) {
            // หาสินค้า
            const product = products.find(p => p.id === productId);
            
            // ตรวจสอบว่ามีสินค้าหรือไม่
            if (!product) {
                alert('ไม่พบสินค้า');
                return;
            }

            // ตรวจสอบ stock (ใช้ if-else)
            const existingItem = cart.find(item => item.productId === productId);
            const currentQty = existingItem ? existingItem.quantity : 0;

            if (currentQty >= product.stock) {
                alert('สินค้าในสต็อกไม่เพียงพอ');
                return;
            }

            // เพิ่มหรืออัพเดทตะกร้า
            if (existingItem) {
                existingItem.quantity++;
            } else {
                cart.push({ productId, quantity: 1 });
            }

            renderProducts();
            renderCart();
        }

        function updateQuantity(productId, action) {
            const item = cart.find(item => item.productId === productId);
            const product = products.find(p => p.id === productId);

            if (!item) return;

            // ใช้ switch statement
            switch(action) {
                case 'increase':
                    if (item.quantity < product.stock) {
                        item.quantity++;
                    } else {
                        alert('ไม่สามารถเพิ่มได้ เกินจำนวนสต็อก');
                    }
                    break;

                case 'decrease':
                    if (item.quantity > 1) {
                        item.quantity--;
                    } else {
                        removeFromCart(productId);
                        return;
                    }
                    break;

                default:
                    console.error('Invalid action');
                    return;
            }

            renderProducts();
            renderCart();
        }

        function removeFromCart(productId) {
            // ใช้ filter
            cart = cart.filter(item => item.productId !== productId);
            renderProducts();
            renderCart();
        }

        // ==========================================
        // CART RENDERING (ใช้ for loop)
        // ==========================================

        function renderCart() {
            const container = document.getElementById('cartItems');
            
            // ตรวจสอบว่าตะกร้าว่างหรือไม่
            if (cart.length === 0) {
                container.innerHTML = `
                    <div class="empty-cart">
                        <div style="font-size: 4em; margin-bottom: 10px;">🛒</div>
                        <p>ตะกร้าสินค้าว่างเปล่า</p>
                        <p style="font-size: 0.9em; margin-top: 5px;">เลือกสินค้าเพื่อเริ่มช้อปปิ้ง</p>
                    </div>
                `;
                updateSummary();
                return;
            }

            container.innerHTML = '';

            // ใช้ for loop แบบธรรมดา
            for (let i = 0; i < cart.length; i++) {
                const item = cart[i];
                const product = products.find(p => p.id === item.productId);

                const itemDiv = document.createElement('div');
                itemDiv.className = 'cart-item';
                itemDiv.innerHTML = `
                    <div class="cart-item-image">${product.emoji}</div>
                    <div class="cart-item-info">
                        <div class="cart-item-name">${product.name}</div>
                        <div class="cart-item-price">฿${product.price.toLocaleString()} x ${item.quantity}</div>
                    </div>
                    <div class="quantity-controls">
                        <button class="quantity-btn" onclick="updateQuantity(${product.id}, 'decrease')">−</button>
                        <div class="quantity-display">${item.quantity}</div>
                        <button class="quantity-btn" onclick="updateQuantity(${product.id}, 'increase')">+</button>
                    </div>
                    <button class="btn-remove" onclick="removeFromCart(${product.id})">ลบ</button>
                `;

                container.appendChild(itemDiv);
            }

            updateSummary();
        }

        // ==========================================
        // PRICE CALCULATION (ใช้ for...of, if-else)
        // ==========================================

        function calculateSubtotal() {
            let subtotal = 0;

            // ใช้ for...of
            for (const item of cart) {
                const product = products.find(p => p.id === item.productId);
                subtotal += product.price * item.quantity;
            }

            return subtotal;
        }

        function calculateDiscount(subtotal) {
            // ถ้าไม่มีคูปอง
            if (!appliedCoupon) {
                return 0;
            }

            const coupon = coupons[appliedCoupon];

            // ตรวจสอบยอดขั้นต่ำ
            if (subtotal < coupon.minAmount) {
                return 0;
            }

            // คำนวณส่วนลด (ใช้ if-else)
            if (coupon.type === 'percentage') {
                return subtotal * (coupon.value / 100);
            } else if (coupon.type === 'fixed') {
                return coupon.value;
            } else {
                return 0;
            }
        }

        function updateSummary() {
            const subtotal = calculateSubtotal();
            const discount = calculateDiscount(subtotal);
            const total = subtotal - discount;

            document.getElementById('subtotal').textContent = `฿${subtotal.toLocaleString()}`;
            document.getElementById('discount').textContent = discount > 0 
                ? `-฿${discount.toLocaleString()}` 
                : '฿0';
            document.getElementById('total').textContent = `฿${total.toLocaleString()}`;

            // ปิด/เปิดปุ่ม checkout
            document.getElementById('checkoutBtn').disabled = cart.length === 0;
        }

        // ==========================================
        // COUPON VALIDATION (ใช้ async/await)
        // ==========================================

        async function applyCoupon() {
            const input = document.getElementById('couponInput');
            const code = input.value.trim().toUpperCase();
            const messageDiv = document.getElementById('couponMessage');

            // ตรวจสอบว่ากรอกโค้ดหรือไม่
            if (!code) {
                showCouponMessage('กรุณากรอกโค้ดคูปอง', 'error');
                return;
            }

            // จำลอง API call ด้วย Promise
            try {
                messageDiv.innerHTML = '<div class="loading"></div>';
                await validateCoupon(code);
                
                // ถ้าผ่าน
                appliedCoupon = code;
                showCouponMessage(`✓ ใช้คูปอง ${code} สำเร็จ!`, 'success');
                input.value = '';
                updateSummary();

            } catch (error) {
                showCouponMessage(error, 'error');
            }
        }

        // จำลอง async validation
        function validateCoupon(code) {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    const coupon = coupons[code];

                    // ใช้ if-else เช็คเงื่อนไข
                    if (!coupon) {
                        reject('โค้ดคูปองไม่ถูกต้อง');
                    } else if (appliedCoupon) {
                        reject('คุณใช้คูปองไปแล้ว');
                    } else {
                        const subtotal = calculateSubtotal();
                        if (subtotal < coupon.minAmount) {
                            reject(`ต้องซื้อขั้นต่ำ ฿${coupon.minAmount.toLocaleString()}`);
                        } else {
                            resolve();
                        }
                    }
                }, 1000);
            });
        }

        function showCouponMessage(message, type) {
            const messageDiv = document.getElementById('couponMessage');
            messageDiv.className = `coupon-message ${type}`;
            messageDiv.textContent = message;

            // ซ่อนข้อความหลัง 3 วินาที
            setTimeout(() => {
                messageDiv.className = '';
                messageDiv.textContent = '';
            }, 3000);
        }

        // ==========================================
        // CHECKOUT (ใช้ async/await)
        // ==========================================

        async function checkout() {
            const btn = document.getElementById('checkoutBtn');
            const originalText = btn.textContent;

            try {
                btn.disabled = true;
                btn.innerHTML = '<span class="loading"></span> กำลังดำเนินการ...';

                // จำลอง payment process
                await processPayment();

                // สำเร็จ
                alert('✓ ชำระเงินสำเร็จ!\nขอบคุณที่ใช้บริการ');
                
                // รีเซ็ตตะกร้า
                cart = [];
                appliedCoupon = null;
                renderProducts();
                renderCart();
                document.getElementById('couponMessage').textContent = '';

            } catch (error) {
                alert('❌ เกิดข้อผิดพลาด: ' + error);
            } finally {
                btn.disabled = false;
                btn.textContent = originalText;
            }
        }

        function processPayment() {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    // จำลองความสำเร็จ 90%
                    if (Math.random() > 0.1) {
                        resolve();
                    } else {
                        reject('การชำระเงินล้มเหลว');
                    }
                }, 2000);
            });
        }

        // ==========================================
        // START APPLICATION
        // ==========================================

        window.onload = init;
    </script>
</body>
</html>