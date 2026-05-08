# 📐 Architecture & Features Document

## Application Architecture

### High-Level Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                    Customer Browser                              │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │                   React Application                      │  │
│  │                                                          │  │
│  │  ┌──────────────────────────────────────────────────┐  │  │
│  │  │           App Component (Container)              │  │  │
│  │  │  - State Management (Redux-free)                 │  │  │
│  │  │  - Orchestrates data flow                        │  │  │
│  │  └──────────────────────────────────────────────────┘  │  │
│  │                     ↓                                   │  │
│  │  ┌──────────────────────────────────────────────────┐  │  │
│  │  │         Custom Hooks Layer                       │  │  │
│  │  │  - useTransactions (Data fetching)               │  │  │
│  │  │  - usePagination (Pagination logic)              │  │  │
│  │  └──────────────────────────────────────────────────┘  │  │
│  │          ↙    ↓    ↓    ↓    ↓    ↓                    │  │
│  │  ┌────────────────────────────────────────────────┐   │  │
│  │  │  Components Layer (Modular & Reusable)       │   │  │
│  │  │  ├─ Layout                                    │   │  │
│  │  │  ├─ CustomersTable                           │   │  │
│  │  │  ├─ Filters                                  │   │  │
│  │  │  ├─ RewardPointsCard                         │   │  │
│  │  │  ├─ TransactionTable                         │   │  │
│  │  │  ├─ Pagination                               │   │  │
│  │  │  ├─ Loading                                  │   │  │
│  │  │  └─ ErrorPage                                │   │  │
│  │  └────────────────────────────────────────────────┘   │  │
│  │                     ↓                                  │  │
│  │  ┌────────────────────────────────────────────────┐   │  │
│  │  │  Utilities & Services Layer                    │   │  │
│  │  │  ├─ calculateRewardPoints (Pure functions)    │   │  │
│  │  │  ├─ transactionService (Data operations)      │   │  │
│  │  │  ├─ dateFormatter (Date operations)           │   │  │
│  │  │  ├─ paginationHelper (Pagination logic)       │   │  │
│  │  │  └─ logger (Logging & debugging)              │   │  │
│  │  └────────────────────────────────────────────────┘   │  │
│  └──────────────────────────────────────────────────────┘  │
│                       ↓                                     │
│  ┌──────────────────────────────────────────────────────┐  │
│  │         Mock API & Data Layer                        │  │
│  │  ├─ JSON Data (public/data/transactions.json)       │  │
│  │  ├─ Async Simulation (1000ms delay)                 │  │
│  │  └─ Error Handling & Retry Logic                    │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
```

---

## Data Flow Architecture

### Redux-Free State Management

```
┌─────────────────────────────────────────────────────────┐
│                    App Component                        │
│  State Variables (useState):                            │
│  - selectedCustomerId                                   │
│  - selectedMonth                                        │
│  - selectedYear                                         │
│  - transactions (from useTransactions)                  │
│  - customers (from useTransactions)                     │
│  - status (from useTransactions)                        │
│  - error (from useTransactions)                         │
└─────────────────────────────────────────────────────────┘
         ↓         ↓         ↓         ↓
    ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐
    │Hooks   │ │Utils   │ │Services│ │Events  │
    │Layer   │ │Layer   │ │Layer   │ │        │
    └────────┘ └────────┘ └────────┘ └────────┘
         ↓         ↓         ↓         ↓
    ┌────────────────────────────────────┐
    │      Components Layer              │
    │  - Read state via props            │
    │  - Emit events via callbacks       │
    └────────────────────────────────────┘
         ↓
    ┌────────────────────────────────────┐
    │         UI Rendering               │
    └────────────────────────────────────┘
```

---

## Component Hierarchy

```
App
├── Layout
│   ├── Header
│   │   └── Title & Subtitle
│   │
│   ├── Main Content
│   │   ├── Customers Section
│   │   │   └── CustomersTable
│   │   │       ├── Table Header
│   │   │       └── Table Rows (Customer Items)
│   │   │
│   │   ├── [Conditional: Customer Selected]
│   │   │   │
│   │   │   ├── Filters Section
│   │   │   │   └── Filters
│   │   │   │       ├── Month Dropdown
│   │   │   │       ├── Year Dropdown
│   │   │   │       └── Current Selection Display
│   │   │   │
│   │   │   ├── Rewards Summary Section
│   │   │   │   ├── RewardPointsCard (Monthly)
│   │   │   │   └── RewardPointsCard (Total)
│   │   │   │
│   │   │   └── Transactions Section
│   │   │       └── TransactionTable
│   │   │           ├── Table (TransactionRow x10)
│   │   │           │   └── TransactionRow
│   │   │           │       ├── ID
│   │   │           │       ├── Date
│   │   │           │       ├── Amount
│   │   │           │       └── Points Badge
│   │   │           │
│   │   │           └── Pagination
│   │   │               ├── Previous Button
│   │   │               ├── Page Numbers
│   │   │               ├── Next Button
│   │   │               └── Page Info
│   │   │
│   │   └── [Conditional: No Customer Selected]
│   │       └── Empty State Message
│   │
│   └── Footer
│       └── Copyright & Info
```

---

## Data Flow Diagram

### Customer Selection Flow
```
User clicks "Select" button on customer
         ↓
onSelectCustomer(customerId)
         ↓
setSelectedCustomerId(customerId)
         ↓
State updates
         ↓
useTransactions filters data
         ↓
getTransactionsForCustomer(customerId)
         ↓
Components re-render with customer data
         ↓
Filters, Cards, and Transaction Table display
```

### Transaction Filtering Flow
```
User selects Month/Year in Filters
         ↓
onMonthChange/onYearChange
         ↓
setSelectedMonth/setSelectedYear
         ↓
State updates
         ↓
useMemo recalculates (filtered transactions)
         ↓
calculateMonthlyRewards(transactions, month, year)
         ↓
filterByMonthYear(transactions, month, year)
         ↓
TransactionTable receives new data
         ↓
usePagination resets to page 1
         ↓
Components re-render with filtered data
```

### Reward Calculation Flow
```
Transaction object { amount: 120 }
         ↓
calculateRewardPoints(amount)
         ↓
├─ If amount < 50 → return 0
├─ If 50 ≤ amount ≤ 100 → return (amount - 50) × 1
└─ If amount > 100 → return (amount - 100) × 2 + 50
         ↓
Points value (e.g., 90)
         ↓
Display in TransactionRow or RewardPointsCard
```

---

## Feature Breakdown

### Feature 1: Customer Management
**Components Involved:**
- `CustomersTable.jsx`
- `App.jsx` (state management)

**Flow:**
1. Load all customers from mock API
2. Display in table format
3. Allow selection via button click
4. Highlight selected row
5. Update state and trigger re-render

**Data Structure:**
```javascript
{
  customerId: "C101",
  customerName: "John Doe"
}
```

---

### Feature 2: Transaction Display
**Components Involved:**
- `TransactionTable.jsx`
- `TransactionRow.jsx`
- `Pagination.jsx`

**Flow:**
1. Get transactions for selected customer
2. Apply month/year filters
3. Paginate (10 per page)
4. Render each transaction in a row
5. Show pagination controls

**Data Structure:**
```javascript
{
  transactionId: "T1001",
  customerId: "C101",
  customerName: "John Doe",
  amount: 120,
  date: "2025-03-15"
}
```

---

### Feature 3: Reward Calculation
**Utilities Involved:**
- `calculateRewardPoints.js`
- `calculateMonthlyRewards.js`
- `calculateTotalRewards.js`

**Flow:**
1. Calculate points for each transaction
2. Sum for monthly total
3. Sum for all-time total
4. Display in reward cards

**Rules:**
| Amount | Rule | Points |
|--------|------|--------|
| < $50 | No points | 0 |
| $50-$100 | 1 per dollar | amount - 50 |
| > $100 | 2 per dollar above $100 + 50 | (amount - 100) × 2 + 50 |

---

### Feature 4: Filtering
**Components Involved:**
- `Filters.jsx`
- `App.jsx`

**Flow:**
1. User selects month and year
2. Trigger filter handler
3. Filter transactions array
4. Reset pagination
5. Recalculate monthly rewards

**Available Options:**
- Months: January through December
- Years: 2021, 2022, 2023, 2024, 2025

---

### Feature 5: Pagination
**Components Involved:**
- `Pagination.jsx`
- `usePagination.js`

**Flow:**
1. Calculate total pages (total items / 10)
2. Display current page number
3. Show page buttons (up to 5)
4. Enable/disable navigation buttons
5. Update displayed items on page change

**State:**
```javascript
{
  currentPage: 1,
  totalPages: 5,
  paginatedItems: [item1, item2, ...],
  canGoPrevious: false,
  canGoNext: true
}
```

---

### Feature 6: Error Handling
**Components Involved:**
- `ErrorPage.jsx`
- `App.jsx`
- `useTransactions.js`

**Flow:**
1. API call fails (simulated)
2. Catch error in service/hook
3. Update status to 'error'
4. Store error message
5. Display ErrorPage with retry button
6. User clicks retry
7. Retry API call

**Error States:**
```javascript
{
  status: 'error',
  error: 'Failed to load transactions',
  isError: true
}
```

---

### Feature 7: Loading States
**Components Involved:**
- `Loading.jsx`
- `useTransactions.js`

**Flow:**
1. Component mounts
2. Set status to 'loading'
3. Display Loading component
4. Make API call (with 1s delay)
5. Receive data
6. Update status to 'success'
7. Display actual content

**Loading States:**
```javascript
{
  status: 'loading',
  isLoading: true,
  transactions: []
}
```

---

### Feature 8: Logging & Monitoring
**Utility Used:**
- `logger.js`

**Logged Events:**
1. **API Calls:**
   - `logger.info('Transactions fetched successfully', { count })`
   
2. **User Actions:**
   - `logger.info('Customer selected', { customerId })`
   - `logger.info('Month filter changed', { month })`
   
3. **Calculations:**
   - `logger.info('Reward points calculated', { amount, points })`
   
4. **Errors:**
   - `logger.error('Failed to fetch transactions', { error })`

---

## Component Communication

### Props Drilling (Minimal)
```
App (Contains State)
├─ Filters
│  └─ Props: selectedMonth, selectedYear, onMonthChange, onYearChange
├─ CustomersTable
│  └─ Props: customers, selectedCustomerId, onSelectCustomer
└─ TransactionTable
   └─ Props: transactions
      └─ Pagination
         └─ Props: currentPage, totalPages, onPageChange, etc.
```

### Callback Communication
```
Child Component User Action
         ↓
Call callback prop function
         ↓
App receives event
         ↓
Update state
         ↓
New props flow to children
         ↓
Components re-render
```

---

## Performance Optimization Strategy

### 1. Memoization (useMemo)
```javascript
const filteredTransactions = useMemo(() => {
  return filterByMonthYear(customerTransactions, selectedMonth, selectedYear);
}, [customerTransactions, selectedMonth, selectedYear]);
```

### 2. Callback Optimization (useCallback)
```javascript
const handleSelectCustomer = useCallback((customerId) => {
  setSelectedCustomerId(customerId);
}, []);
```

### 3. Pagination
```javascript
// Only render 10 items at a time
const paginatedItems = usePagination(items, 10).paginatedItems;
```

### 4. Event Delegation
- Use React's synthetic events
- Avoid inline function definitions in JSX

### 5. CSS-in-JS Optimization
- Component-scoped CSS files
- No global style conflicts
- Minimal CSS downloads

---

## Testing Strategy

### Unit Tests (calculateRewardPoints.test.jsx)
```
✓ Positive Cases (correct calculations)
✓ Edge Cases (null, undefined, negative)
✓ Decimal Handling (floor values)
✓ Integration (multiple functions together)
```

### Component Tests (Future)
```
✓ Props rendering
✓ Event handling
✓ State management
✓ Error handling
✓ Loading states
```

### Integration Tests (Manual)
```
✓ Full user workflow
✓ Data flow across components
✓ Filter combinations
✓ Pagination edge cases
```

---

## Scalability Considerations

### Current Structure
- Modular components
- Reusable hooks
- Utility functions
- Service layer
- No external state management needed

### Future Enhancements
1. **Export Functionality** - Export reports to CSV/PDF
2. **Advanced Filtering** - Date range picker, amount filters
3. **Sorting** - Sort by amount, date, points
4. **Search** - Search customers by name/ID
5. **Analytics** - Charts and graphs
6. **User Authentication** - Login/permissions
7. **Backend Integration** - Replace mock API
8. **Caching** - Reduce API calls
9. **Virtualization** - For large lists

---

## Security Considerations

### Current Implementation
- ✅ No sensitive data in localStorage
- ✅ Input validation via PropTypes
- ✅ XSS protection (React escaping)
- ✅ Clean error messages
- ✅ No credentials in code

### Recommendations
- Add HTTPS in production
- Implement CSRF tokens
- Add authentication/authorization
- Sanitize user inputs
- Add rate limiting
- Implement CORS properly

---

## Deployment Architecture

### Development
```
localhost:3000 (Vite Dev Server)
     ↓
Hot Module Reloading
     ↓
Browser refresh/update
```

### Production
```
npm run build
     ↓
dist/ folder (Optimized bundle)
     ↓
Deploy to CDN/Server
     ↓
users access app.com
     ↓
Cached/minified bundle
     ↓
Fast load times
```

---

## Technology Choices Justification

| Technology | Reason |
|---|---|
| React 18 | Modern, component-based, large ecosystem |
| Vite | Fast bundling, HMR, optimized builds |
| Hooks Only | Modern React patterns, easier testing |
| No Redux | Overkill for app complexity; hooks sufficient |
| PropTypes | Runtime validation; good for JS projects |
| Jest + RTL | Industry standard testing tools |
| CSS Modules | Scoped styling; no global conflicts |

---

## Future Architecture Improvements

### 1. State Management
```
Consider Redux/Zustand if app grows:
- Multiple unrelated data sources
- Complex state interactions
- Need for time-travel debugging
```

### 2. API Integration
```
Replace mock API with real backend:
- Implement authentication
- Add request/response interceptors
- Implement caching strategy
- Add error retry logic
```

### 3. Routing
```
Add React Router for multi-page app:
- Customer detail pages
- Settings/configuration
- Analytics dashboard
```

### 4. Type Safety
```
Consider TypeScript:
- Better IDE support
- Catch more errors at compile time
- Self-documenting code
```

---