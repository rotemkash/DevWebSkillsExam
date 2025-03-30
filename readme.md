# Shopping Cart Application

A responsive e-commerce shopping cart built with vanilla JavaScript that connects to the FakeStore API to display products and manage shopping functionality.

## Features

- **Product Listing**: Fetches and displays products from the [Fake Store API](https://fakestoreapi.com/)
- **Cart Management**: Add, remove, and update product quantities
- **Responsive Design**: Built with Bootstrap for a seamless experience across devices
- **Persistent Storage**: Cart data is preserved between page refreshes using localStorage
- **Dynamic Shipping**: Shipping costs dynamically update based on the number of items in the cart
- **Order Summary**: Real-time calculation of subtotal, shipping, and total costs

## Technologies Used

- HTML5
- CSS3 (with Bootstrap 5)
- JavaScript (ES6+)
- Font Awesome for icons
- Fake Store API for product data

## Installation and Setup

1. Clone this repository:
   ```
   git clone https://github.com/rotemkash/DevWebSkillsExam.git
   ```

2. Navigate to the project directory:
   ```
   cd DevWebSkillsExam
   ```

3. Open `index.html` in your browser or use a local server:
   ```
   # Using Python's built-in server
   python -m http.server
   ```

4. The application should now be running at `http://localhost:8000`

## Project Structure

```
shopping-cart/
├── index.html         # Main HTML structure
├── Cart.js            # JavaScript application logic
├── README.md          # Project documentation
```

## How It Works

1. **Product Loading**:
    - On page load, the application fetches products from the Fake Store API
    - Products are rendered as cards with images, descriptions, and prices

2. **Cart Operations**:
    - Add products to cart with "Add to Cart" button
    - Adjust quantity with + and - buttons
    - Remove products from cart with "Remove from Cart" button

3. **Order Summary**:
    - Products total price: Sum of all items in cart
    - Shipping fee: $5 for orders with 4 or fewer items, $10 for orders with more than 4 items
    - Total price: Sum of products total and shipping fee

4. **Data Persistence**:
    - Cart data is stored in the browser's localStorage
    - Cart is preserved between page refreshes and browser sessions

## API Integration

The application uses the Fake Store API to fetch product data:
- All products: `https://fakestoreapi.com/products`
- Single product: `https://fakestoreapi.com/products/{id}`

## Development Notes

- The application uses async/await for API calls
- Error handling is implemented for failed API requests
- BEM methodology is used for CSS class naming

## Future Enhancements

- Add product filtering and sorting
- Implement user authentication
- Add checkout process
- Add wishlist functionality
- Implement product reviews

## Contributing

1. Fork the repository
2. Create a new branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Commit your changes (`git commit -m 'Add some amazing feature'`)
5. Push to the branch (`git push origin feature/amazing-feature`)
6. Open a Pull Request
