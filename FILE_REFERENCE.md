# 📖 Complete File Reference Guide

## 📚 Documentation Files (Start Here!)

### 1. **README.md** - Main Documentation
- **What:** Comprehensive project documentation
- **When to read:** Before diving into code
- **Contains:**
  - Project overview
  - Installation steps
  - Feature list
  - Reward calculation rules
  - Component documentation
  - Testing information
  - Troubleshooting guide
  - Deployment guide

### 2. **SETUP_GUIDE.md** - Quick Start
- **What:** Quick start instructions
- **When to read:** To get up and running quickly
- **Contains:**
  - Installation steps
  - Available commands
  - Feature walkthrough
  - Testing instructions
  - Example calculations
  - Troubleshooting tips

### 3. **DEVELOPMENT.md** - Developer Guide
- **What:** Development patterns and best practices
- **When to read:** Before contributing or extending
- **Contains:**
  - Code organization
  - Component creation guide
  - Hook development
  - Styling guidelines
  - Testing patterns
  - Performance tips
  - Debugging guide
  - Git workflow

### 4. **ARCHITECTURE.md** - Technical Design
- **What:** System architecture and design patterns
- **When to read:** To understand how the app works
- **Contains:**
  - Architecture diagrams
  - Data flow diagrams
  - Component hierarchy
  - Feature breakdown
  - State management approach
  - Performance strategy
  - Scalability considerations

### 5. **PROJECT_DELIVERY_SUMMARY.md** - Project Overview
- **What:** Complete project delivery summary
- **When to read:** For project overview
- **Contains:**
  - What's included
  - Features implemented
  - Quality standards
  - Technology stack
  - Requirements checklist
  - Statistics

### 6. **FAQ_TROUBLESHOOTING.md** - Help & Support
- **What:** Common questions and solutions
- **When to read:** When you encounter issues
- **Contains:**
  - Getting started FAQ
  - Installation issues
  - Testing issues
  - Application issues
  - Debugging tips
  - Deployment questions

---

## 🛠️ Configuration Files

### **package.json**
- **Purpose:** Project dependencies and scripts
- **Key scripts:**
  - `npm run dev` - Start development
  - `npm test` - Run tests
  - `npm run build` - Production build
  - `npm run preview` - Preview build

### **vite.config.js**
- **Purpose:** Vite build tool configuration
- **Contains:** Dev server settings, build options

### **jest.config.js**
- **Purpose:** Jest testing framework configuration
- **Contains:** Test environment, file patterns

### **.babelrc**
- **Purpose:** Babel transpiler configuration
- **Contains:** Preset configuration for React and JavaScript

### **.npmrc**
- **Purpose:** NPM configuration
- **Contains:** Registry and installation settings

### **.gitignore**
- **Purpose:** Git ignore patterns
- **Contains:** Files to exclude from version control

### **index.html**
- **Purpose:** HTML template
- **Contains:** Root div for React, script import

---

## 📁 Source Code Structure

### **src/App.jsx**
- **Purpose:** Root React component
- **Contains:**
  - State management
  - Data orchestration
  - Component composition
  - Event handlers
- **Props passed to:**
  - Layout
  - CustomersTable
  - Filters
  - RewardPointsCard
  - TransactionTable

### **src/App.css**
- **Purpose:** App-level styles
- **Contains:** 
  - Section layouts
  - Grid layouts
  - Empty state styles
  - Responsive breakpoints

### **src/index.css**
- **Purpose:** Global styles
- **Contains:**
  - CSS variables
  - Global resets
  - Font definitions
  - Scrollbar styling

### **src/main.jsx**
- **Purpose:** Application entry point
- **Contains:** React DOM render setup

### **src/setupTests.js**
- **Purpose:** Jest test configuration
- **Contains:** Mock setup, test utilities

---

## 🧩 Components (`src/components/`)

### **layout/layout.jsx**
- **Purpose:** Main layout wrapper
- **Exports:** Layout component
- **Provides:** Header, main content area, footer

### **layout/layout.css**
- **Purpose:** Layout styles
- **Contains:** Header, main, footer styles

### **customersTable/customersTable.jsx**
- **Purpose:** Display customers in table
- **Props:** customers, selectedCustomerId, onSelectCustomer
- **Returns:** Table with customer list

### **customersTable/customersTable.css**
- **Purpose:** Table styles
- **Contains:** Table, row, button styles

### **customersTable/emptyState.jsx**
- **Purpose:** Empty state component
- **Props:** title, message, icon
- **Returns:** Empty state message

### **customersTable/emptyState.css**
- **Purpose:** Empty state styles

### **customersTable/transactionTable.jsx**
- **Purpose:** Display transactions in table
- **Props:** transactions
- **Returns:** Paginated transaction table

### **customersTable/transactionRow.jsx**
- **Purpose:** Single transaction row
- **Props:** transaction
- **Returns:** Table row with transaction data

### **customersTable/pagination.jsx**
- **Purpose:** Pagination controls
- **Props:** currentPage, totalPages, callbacks
- **Returns:** Page navigation controls

### **customersTable/pagination.css**
- **Purpose:** Pagination styles

### **filters/filters.jsx**
- **Purpose:** Month/year filter controls
- **Props:** selectedMonth, selectedYear, callbacks
- **Returns:** Filter dropdowns and current selection

### **filters/filters.css**
- **Purpose:** Filter styles

### **rewardPointsCard/rewardPointsCard.jsx**
- **Purpose:** Display reward statistics
- **Props:** title, points, subtitle, variant, icon
- **Returns:** Styled reward card

### **rewardPointsCard/rewardPointsCard.css**
- **Purpose:** Card styles with gradients

### **loading/loading.jsx**
- **Purpose:** Loading spinner
- **Returns:** Animated loading indicator

### **loading/loading.css**
- **Purpose:** Spinner animation styles

### **errorPage/errorPage.jsx**
- **Purpose:** Error display with retry
- **Props:** error, onRetry
- **Returns:** Error message and retry button

### **errorPage/errorPage.css**
- **Purpose:** Error page styles

---

## 🎣 Custom Hooks (`src/hooks/`)

### **usePagination.js**
- **Purpose:** Pagination state management
- **Returns:** 
  - `currentPage` - Current page number
  - `totalPages` - Total pages
  - `paginatedItems` - Items for current page
  - `goToPage()` - Navigate to page
  - `goToPreviousPage()` - Previous page
  - `goToNextPage()` - Next page
  - `resetPagination()` - Reset to page 1
  - `canGoPrevious` - Can go previous
  - `canGoNext` - Can go next

### **useTransactions.js**
- **Purpose:** Transaction data management
- **Returns:**
  - `transactions` - All transactions
  - `customers` - Unique customers
  - `status` - Loading status
  - `error` - Error message
  - `getTransactionsForCustomer()` - Get customer transactions
  - `retryLoadTransactions()` - Retry loading
  - `isLoading` - Loading flag
  - `isError` - Error flag
  - `isSuccess` - Success flag

---

## 🔧 Utilities (`src/utils/`)

### **calculateRewardPoints.js**
- **Purpose:** Reward calculation logic
- **Functions:**
  - `calculateRewardPoints(amount)` - Calculate points for transaction
  - `calculateMonthlyRewards(transactions, month, year)` - Monthly total
  - `calculateTotalRewards(transactions)` - All-time total
- **Rules:**
  - < $50 → 0 points
  - $50-$100 → 1 point per dollar
  - > $100 → 2 points above $100 + 50 fixed

### **dateFormatter.js**
- **Purpose:** Date formatting utilities
- **Functions:**
  - `formatDate(dateString)` - Format to readable date
  - `getMonthName(monthNumber)` - Get month name
  - `getMonthShortName(monthNumber)` - Get short name
  - `getMonthNumber(monthName)` - Get month from name
  - `getYearRange(startYear, endYear)` - Get year array
  - `getLastNMonths(n)` - Get last N months

### **paginationHelper.js**
- **Purpose:** Pagination utilities
- **Functions:**
  - `getPaginatedItems(items, page, itemsPerPage)` - Get page items
  - `getTotalPages(totalItems, itemsPerPage)` - Calculate total pages
  - `canGoPrevious(currentPage)` - Can go previous
  - `canGoNext(currentPage, totalPages)` - Can go next
  - `getPageNumbers(currentPage, totalPages, maxButtons)` - Get page buttons

### **logger.js**
- **Purpose:** Logging utility
- **Functions:**
  - `logger.info(message, data)` - Log info
  - `logger.warn(message, data)` - Log warning
  - `logger.error(message, data)` - Log error

---

## 🔗 Services (`src/services/`)

### **transactionService.js**
- **Purpose:** API and data operations
- **Functions:**
  - `fetchTransactions()` - Fetch from mock API (1s delay)
  - `getUniqueCustomers(transactions)` - Extract unique customers
  - `getCustomerTransactions(transactions, customerId)` - Filter by customer
  - `filterByMonthYear(transactions, month, year)` - Filter by date
  - `simulateApiError()` - Simulate API error (for testing)

---

## ⚙️ Constants (`src/constants/`)

### **index.js**
- **Purpose:** Application constants
- **Contains:**
  - `REWARD_RULES` - Reward calculation thresholds
  - `ITEMS_PER_PAGE` - Items per page (10)
  - `API_TIMEOUT` - API delay (1000ms)
  - `DEFAULT_FILTER` - Default month/year
  - `AVAILABLE_YEARS` - Years 2021-2025
  - `TRANSACTION_STATUS` - Status states
  - `UI_STATES` - UI state strings

---

## 🧪 Testing (`src/__test__/`)

### **rewardCalculator.test.jsx**
- **Purpose:** Test reward calculation logic
- **Test Suites:**
  - `calculateRewardPoints` - Individual transaction tests
  - `calculateMonthlyRewards` - Monthly total tests
  - `calculateTotalRewards` - All-time total tests
  - `Integration Tests` - Combined scenarios
- **Test Cases:** 30+
  - Positive cases
  - Edge cases
  - Decimal handling
  - Invalid inputs
  - Negative amounts

---

## 📊 Mock Data

### **public/data/transactions.json**
- **Purpose:** Mock transaction data
- **Contains:** 30 sample transactions
  - 10 unique customers
  - Multiple transactions per customer
  - Spread across 3 months (Jan-Mar 2025)
  - Various amounts for testing

**Structure:**
```javascript
{
  "transactionId": "T1001",
  "customerId": "C101",
  "customerName": "John Doe",
  "amount": 120,
  "date": "2025-03-15"
}
```

---

## 🚀 Quick Navigation Guide

### I want to...

**...understand the project**
→ Read `README.md` then `ARCHITECTURE.md`

**...get it running**
→ Read `SETUP_GUIDE.md` and run `npm install && npm run dev`

**...learn to develop**
→ Read `DEVELOPMENT.md` then explore `src/components/`

**...fix an issue**
→ Check `FAQ_TROUBLESHOOTING.md`

**...write tests**
→ Check `src/__test__/rewardCalculator.test.jsx` for examples

**...deploy to production**
→ Read `README.md` Deployment section and run `npm run build`

**...add a new feature**
→ Read `DEVELOPMENT.md` for patterns and conventions

**...understand the architecture**
→ Read `ARCHITECTURE.md` with diagrams and data flows

---

## 📋 File Statistics

### By Type
- **React Components:** 11 JSX files
- **Custom Hooks:** 2 JS files
- **Utilities:** 4 JS files
- **Services:** 1 JS file
- **CSS Files:** 10+ CSS files
- **Tests:** 1 test file
- **Configuration:** 7 config files
- **Documentation:** 6 markdown files

### By Size (Approximate)
- **Components:** ~1,500 LOC
- **Utilities:** ~800 LOC
- **Tests:** ~400 LOC
- **CSS:** ~2,000 LOC
- **Documentation:** ~10,000 words
- **Total:** ~5,000 LOC + docs

---

## 🔗 File Dependencies

### App.jsx depends on:
- All components
- Custom hooks (useTransactions)
- Utilities (calculateRewardPoints, filterByMonthYear, logger)
- Services (transactionService functions)
- Constants

### Components depend on:
- Each other (parent-child relationships)
- Utilities (calculations, formatting)
- PropTypes
- Custom hooks

### Hooks depend on:
- Utilities (calculations, logger)
- Services (transactionService)

### Tests depend on:
- Utilities (calculateRewardPoints)

---

## 📝 File Naming Conventions

### Component Files
- `componentName.jsx` - React component
- `componentName.css` - Component styles
- PascalCase for component function names

### Utility Files
- `utilityName.js` - Utility functions
- camelCase for function names
- Exported as named or default

### Hook Files
- `useHookName.js` - Custom hooks
- Start with `use` prefix
- Exported as default

### Test Files
- `*.test.jsx` - Test files
- Located in `__test__/` folder
- Describe test cases with `describe()` and `test()`

### CSS Files
- Match component/utility name
- camelCase naming
- Scoped to component

---

## ✨ What Each File Does

```
Entry Point
↓
index.html → main.jsx → App.jsx
                          ↓
            ┌─────────────┼─────────────┐
            ↓             ↓             ↓
        Components    Hooks        Utilities
          (UI)      (Logic)    (Calculations)
            ↓             ↓             ↓
        Renders      Manages      Compute
        Content      State        Results
```

---

## 🎯 Reading Order

### For New Developers
1. `README.md` - Overview
2. `SETUP_GUIDE.md` - Get it running
3. `ARCHITECTURE.md` - How it works
4. `DEVELOPMENT.md` - How to code
5. Explore source code

### For Contributing
1. `DEVELOPMENT.md` - Guidelines
2. Review related component
3. Check test patterns
4. Write tests
5. Submit code

### For Debugging
1. `FAQ_TROUBLESHOOTING.md` - Common issues
2. Check browser console (F12)
3. Read related component code
4. Check logger output
5. Review test cases

---

## 📞 Support Quick Links

| Need | File |
|------|------|
| Getting Started | SETUP_GUIDE.md |
| Project Overview | README.md |
| Code Patterns | DEVELOPMENT.md |
| Architecture | ARCHITECTURE.md |
| Troubleshooting | FAQ_TROUBLESHOOTING.md |
| Component Help | See component JSDoc comments |
| Testing Help | src/__test__/rewardCalculator.test.jsx |
| Calculations | src/utils/calculateRewardPoints.js |

---

**Happy exploring! 🚀**

**Everything is well-organized and documented. Use this guide to navigate the project!**
