# 🚀 Quick Start Guide

## Installation & Setup

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Start Development Server
```bash
npm run dev
```

The application will automatically open at `http://localhost:3000`

### Step 3: Explore the Application

1. **Browse Customers**: Select any customer from the customer table
2. **View Transactions**: Once a customer is selected, their transactions appear
3. **Filter by Month/Year**: Use the dropdown filters to view specific periods
4. **Check Rewards**: Monthly and total reward points are calculated automatically
5. **Paginate**: Navigate through transactions using pagination controls

---

## Testing

### Run All Tests
```bash
npm test
```

### Run Tests with Coverage
```bash
npm run test:coverage
```

### Key Test Cases
- Reward calculation for different amount ranges
- Edge cases (null, negative, invalid inputs)
- Monthly vs total reward calculations
- Integration scenarios

---

## Building for Production

### Create Optimized Build
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

The built files are in the `dist/` folder, ready for deployment.

---

## Key Features to Try

### 1. Customer Selection
- Click "Select" button on any customer
- View their complete transaction history

### 2. Reward Calculations
- See how points are calculated for different amounts:
  - Below $50: 0 points
  - $50-$100: 1 point per dollar
  - Above $100: 2 points above $100 + 50 for the $50-$100 range

### 3. Month Filtering
- Change the month and year using dropdowns
- Transactions update automatically
- Monthly reward points recalculate

### 4. Pagination
- Table shows 10 transactions per page
- Use Previous/Next buttons or click page numbers
- Pagination resets when filters change

### 5. Empty States
- Try filtering to periods with no transactions
- See friendly empty state messages

### 6. Error Handling
- Check browser console for detailed logging
- Errors display with retry button

---

## Project Structure at a Glance

```
src/
├── components/          # React components (modular & reusable)
├── hooks/              # Custom React hooks
├── utils/              # Utility functions
├── services/           # API/data services
├── constants/          # App constants
├── __test__/           # Unit tests
├── App.jsx             # Root component
└── main.jsx            # Entry point
```

---

## Example Reward Calculations

### Example 1: $120 Purchase
```
Above $100: ($120 - $100) × 2 = 40 points
$50-$100 range: 50 points
Total: 90 points
```

### Example 2: $75 Purchase
```
In $50-$100 range: ($75 - $50) × 1 = 25 points
Total: 25 points
```

### Example 3: $45 Purchase
```
Below $50: 0 points
Total: 0 points
```

---

## Tips & Tricks

### 💡 View Application Logs
Open Browser DevTools (F12) → Console
- See API calls
- Track filter changes
- Monitor reward calculations

### 💡 Test Different Scenarios
- Select different customers
- Try all months and years
- Navigate through pagination pages

### 💡 Check Component Props
Use React Developer Tools browser extension to inspect:
- Component hierarchies
- Passed props
- State values

---

## Troubleshooting

### Issue: Port 3000 Already in Use
```bash
# Kill the process using port 3000
# Windows: 
taskkill /F /IM node.exe

# Or use a different port in vite.config.js
```

### Issue: Dependencies Won't Install
```bash
rm -rf node_modules package-lock.json
npm install
```

### Issue: Tests Won't Run
```bash
npm test -- --clearCache
npm test
```

---

## Next Steps

1. ✅ Run `npm install`
2. ✅ Run `npm run dev`
3. ✅ Select a customer
4. ✅ Try different filters
5. ✅ Explore the code
6. ✅ Run tests: `npm test`
7. ✅ Build: `npm run build`

---

## Support & Documentation

- Full documentation in `README.md`
- Code comments throughout components
- Test cases as usage examples
- Detailed JSDoc comments in utilities

---

**Happy coding! 🎉**
