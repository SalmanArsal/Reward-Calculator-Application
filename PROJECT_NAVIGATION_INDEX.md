# 🗺️ Project Navigation Index

## 🎯 Start Here Based on Your Goal

### 🚀 I want to run the application NOW
```
1. Open terminal in project folder
2. Run: npm install
3. Run: npm run dev
4. Open: http://localhost:3000
→ Read: SETUP_GUIDE.md
```

### 📚 I want to understand the project
```
1. Read: README.md (overview & features)
2. Read: ARCHITECTURE.md (system design)
3. Browse: src/ folder structure
4. Review: Component comments
→ Next: DEVELOPMENT.md for coding
```

### 💻 I want to contribute code
```
1. Read: DEVELOPMENT.md (guidelines)
2. Read: CODE_CONVENTIONS (naming/patterns)
3. Review: Similar component/utility
4. Check: Test examples
5. Write: Code following patterns
6. Test: npm test
→ Submit: Ready to review
```

### 🧪 I want to test the app
```
1. Run: npm test
2. Run: npm run test:coverage
3. Review: src/__test__/rewardCalculator.test.jsx
4. Check: Console output (F12)
5. Verify: All tests pass
```

### 🐛 I'm having issues
```
1. Check: FAQ_TROUBLESHOOTING.md
2. Search: Specific error message
3. Try: Suggested solution
4. Check: Browser Console (F12)
5. Review: Relevant code comments
→ Still stuck? Check: DEVELOPMENT.md Debugging Tips
```

### 📦 I want to build & deploy
```
1. Run: npm run build
2. Check: dist/ folder created
3. Review: README.md Deployment section
4. Deploy: dist/ to hosting service
5. Test: Live URL
```

### 🎓 I want to learn best practices
```
1. Read: DEVELOPMENT.md
2. Study: Architecture patterns
3. Review: Component code
4. Check: Test patterns
5. Explore: Utility functions
```

---

## 📂 Folder Map

```
Rewards-App/
│
├─ 📄 Getting Started Files
│  ├─ README.md ......................... Main documentation (START HERE)
│  ├─ SETUP_GUIDE.md .................... Quick start instructions
│  ├─ PROJECT_DELIVERY_SUMMARY.md ....... What's included
│  └─ FILE_REFERENCE.md ................. This file guide
│
├─ 📖 Development Files
│  ├─ DEVELOPMENT.md .................... Developer guide & patterns
│  ├─ ARCHITECTURE.md ................... System design & diagrams
│  ├─ FAQ_TROUBLESHOOTING.md ............ Help & solutions
│  └─ FILE_REFERENCE.md ................. File documentation
│
├─ ⚙️ Configuration Files
│  ├─ package.json ...................... Dependencies & scripts
│  ├─ vite.config.js .................... Build tool config
│  ├─ jest.config.js .................... Testing config
│  ├─ .babelrc .......................... Transpiler config
│  ├─ .npmrc ............................ NPM config
│  ├─ .gitignore ........................ Git config
│  └─ index.html ........................ HTML template
│
├─ 📁 Source Code
│  └─ src/
│     ├─ App.jsx ........................ Root component ⭐
│     ├─ App.css ........................ App styles
│     ├─ index.css ...................... Global styles
│     ├─ main.jsx ....................... Entry point
│     ├─ setupTests.js .................. Test setup
│     │
│     ├─ 🧩 components/ (11 files)
│     │   ├─ layout/ ..................... Main layout wrapper
│     │   ├─ customersTable/ ............ Customer & transaction tables
│     │   ├─ filters/ ................... Month/year filters
│     │   ├─ rewardPointsCard/ ......... Reward display cards
│     │   ├─ loading/ ................... Loading spinner
│     │   └─ errorPage/ ................. Error display
│     │
│     ├─ 🎣 hooks/ (2 files)
│     │   ├─ usePagination.js .......... Pagination hook
│     │   └─ useTransactions.js ........ Data management hook
│     │
│     ├─ 🔧 utils/ (4 files)
│     │   ├─ calculateRewardPoints.js .. Calculations
│     │   ├─ dateFormatter.js .......... Date operations
│     │   ├─ paginationHelper.js ....... Pagination helpers
│     │   └─ logger.js ................. Logging utility
│     │
│     ├─ 🔗 services/ (1 file)
│     │   └─ transactionService.js ..... Mock API & data ops
│     │
│     ├─ ⚙️ constants/ (1 file)
│     │   └─ index.js .................. App constants
│     │
│     └─ 🧪 __test__/ (1 file)
│        └─ rewardCalculator.test.jsx .. Unit tests
│
├─ 📊 Data
│  └─ public/
│     └─ data/
│        └─ transactions.json .......... Mock data (30 transactions)
│
└─ 📋 Documentation Files
   ├─ README.md ......................... Main docs
   ├─ SETUP_GUIDE.md .................... Quick start
   ├─ DEVELOPMENT.md .................... Dev guide
   ├─ ARCHITECTURE.md ................... Design docs
   ├─ PROJECT_DELIVERY_SUMMARY.md ....... Summary
   ├─ FAQ_TROUBLESHOOTING.md ............ Help
   ├─ FILE_REFERENCE.md ................. File guide
   └─ PROJECT_NAVIGATION_INDEX.md ....... This file
```

---

## 🔍 Quick File Lookup

### Need to understand...
- **How the app works** → `ARCHITECTURE.md`
- **How to set up** → `SETUP_GUIDE.md`
- **How to code** → `DEVELOPMENT.md`
- **How to test** → `FAQ_TROUBLESHOOTING.md`
- **What each file does** → `FILE_REFERENCE.md`

### Need to find code for...
- **Reward calculations** → `src/utils/calculateRewardPoints.js`
- **Data fetching** → `src/services/transactionService.js`
- **Pagination logic** → `src/hooks/usePagination.js`
- **Logging** → `src/utils/logger.js`
- **Component example** → `src/components/customersTable/customersTable.jsx`
- **Test example** → `src/__test__/rewardCalculator.test.jsx`

### Need to modify...
- **Reward rules** → `src/utils/calculateRewardPoints.js`
- **Items per page** → `src/constants/index.js` (ITEMS_PER_PAGE)
- **Available years** → `src/constants/index.js` (AVAILABLE_YEARS)
- **Mock data** → `public/data/transactions.json`
- **Styling** → Component `.css` files
- **Dependencies** → `package.json`

---

## 📊 File Size Overview

| File/Folder | Type | Size | Purpose |
|---|---|---|---|
| App.jsx | Component | ~400 lines | Root component |
| calculateRewardPoints.js | Utility | ~150 lines | Calculations |
| customersTable.jsx | Component | ~80 lines | Customer table |
| transactionTable.jsx | Component | ~70 lines | Transaction display |
| usePagination.js | Hook | ~60 lines | Pagination logic |
| useTransactions.js | Hook | ~70 lines | Data management |
| CSS files | Styling | ~2,000 total | All styles |
| Documentation | Docs | ~15,000 words | All guides |
| Tests | Testing | ~400 lines | Test coverage |

---

## 🎯 Component Dependency Tree

```
App.jsx (Root)
├── Layout
│   ├── Header
│   ├── Main Content
│   │   ├── CustomersTable
│   │   │   └── EmptyState
│   │   ├── Filters (when customer selected)
│   │   ├── RewardPointsCard (x2)
│   │   └── TransactionTable
│   │       ├── TransactionRow (x10)
│   │       └── Pagination
│   └── Footer
├── Loading (when loading)
└── ErrorPage (when error)
```

---

## 🔄 Data Flow Map

```
User Action (click, select, filter)
       ↓
Event Handler in App.jsx
       ↓
State Updated (useState)
       ↓
Hooks Recalculate (useMemo, useCallback)
       ↓
Props Passed to Components
       ↓
Components Re-render
       ↓
UI Updated
       ↓
User Sees Changes
```

---

## 📦 Dependency Map

```
App.jsx
├── Uses Hooks
│   ├── useTransactions
│   └── useState, useMemo, useCallback
├── Uses Utilities
│   ├── calculateRewardPoints
│   ├── calculateMonthlyRewards
│   ├── calculateTotalRewards
│   ├── filterByMonthYear
│   └── logger
├── Uses Services
│   └── transactionService functions
└── Imports Components
    ├── Layout
    ├── CustomersTable
    ├── TransactionTable
    ├── Filters
    ├── RewardPointsCard
    ├── Loading
    └── ErrorPage
```

---

## 🚀 Development Workflow

### Day 1: Setup & Learn
```
1. npm install
2. npm run dev
3. Read README.md & ARCHITECTURE.md
4. Explore folder structure
5. Review component files
```

### Day 2: Understand Code
```
1. Read DEVELOPMENT.md
2. Study App.jsx
3. Review hooks (usePagination, useTransactions)
4. Check utilities (calculate, format, etc.)
5. Review components
```

### Day 3: Make Changes
```
1. Identify what to change
2. Find relevant file
3. Make changes following patterns
4. Test changes: npm test
5. Review in browser: npm run dev
```

### Day 4: Add Features
```
1. Plan new feature
2. Check DEVELOPMENT.md for patterns
3. Create component/hook/utility
4. Add PropTypes validation
5. Add JSDoc comments
6. Write tests
7. Test everything
```

---

## 🎓 Learning Path

### Week 1: Foundation
- [ ] Read README.md
- [ ] Run `npm install && npm run dev`
- [ ] Browse application in browser
- [ ] Read ARCHITECTURE.md
- [ ] Explore file structure

### Week 2: Deep Dive
- [ ] Read DEVELOPMENT.md
- [ ] Study App.jsx code
- [ ] Review hooks code
- [ ] Check utility functions
- [ ] Run tests: npm test

### Week 3: Practice
- [ ] Modify reward rules
- [ ] Change items per page
- [ ] Add a console log
- [ ] Run tests again
- [ ] Build: npm run build

### Week 4: Mastery
- [ ] Add new component
- [ ] Write tests for it
- [ ] Add new utility
- [ ] Extend functionality
- [ ] Deploy build

---

## 🔑 Key Concepts

### State Management (No Redux)
- React hooks only
- Local component state
- Props drilling minimal
- useMemo for optimization

### Component Structure
- Functional components
- Props validation
- JSDoc documentation
- CSS collocated

### Calculations
- Pure functions
- Error handling
- Input validation
- Comprehensive logging

### Testing
- Jest framework
- 30+ test cases
- Edge case coverage
- Integration tests

### Styling
- Component-scoped CSS
- Responsive design
- CSS variables
- Mobile-first approach

---

## 📞 Quick Help Links

| Question | Answer |
|----------|--------|
| How do I start? | `SETUP_GUIDE.md` |
| What's included? | `PROJECT_DELIVERY_SUMMARY.md` |
| How does it work? | `ARCHITECTURE.md` |
| How do I code? | `DEVELOPMENT.md` |
| Having issues? | `FAQ_TROUBLESHOOTING.md` |
| What does each file do? | `FILE_REFERENCE.md` |
| How do I find files? | `PROJECT_NAVIGATION_INDEX.md` (this file) |

---

## ✅ Verification Checklist

- [ ] Project structure matches requirements
- [ ] All 11 components created
- [ ] All 2 custom hooks created
- [ ] All 4 utilities created
- [ ] All CSS files present
- [ ] Mock data loaded correctly
- [ ] Tests passing (npm test)
- [ ] npm run dev starts successfully
- [ ] npm run build succeeds
- [ ] Documentation complete
- [ ] Code follows conventions
- [ ] PropTypes on all components

---

## 🎉 You're All Set!

### Everything you need is here:
✅ Production-ready code
✅ Comprehensive documentation
✅ Working example tests
✅ Development guides
✅ Troubleshooting help
✅ File references

### Next steps:
1. Run `npm install`
2. Run `npm run dev`
3. Open `http://localhost:3000`
4. Read `README.md`
5. Start exploring!

---

**Happy coding! 🚀**

*All files are organized, documented, and ready to use. Welcome to the Customer Rewards Calculator!*
