# ❓ FAQ & Troubleshooting Guide

## 🚀 Getting Started

### Q: How do I get started with this project?

**A:** Follow these steps:

1. **Open terminal** in the project folder
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Start development server:**
   ```bash
   npm run dev
   ```
4. **Application opens** automatically at `http://localhost:3000`

### Q: I'm getting "command not found: npm"

**A:** You need to install Node.js:
1. Go to https://nodejs.org
2. Download LTS version
3. Install it
4. Verify installation: `node --version` and `npm --version`
5. Try `npm install` again

---

## 📦 Installation Issues

### Q: npm install is stuck or failing

**A:** Try these solutions:

**Solution 1: Clear cache**
```bash
npm cache clean --force
npm install
```

**Solution 2: Delete and reinstall**
```bash
rm -rf node_modules package-lock.json
npm install
```

**Solution 3: Use different registry**
```bash
npm install --registry https://registry.npmjs.org/
```

### Q: Error about peer dependencies

**A:** Add this flag:
```bash
npm install --legacy-peer-deps
```

### Q: Port 3000 already in use

**A:** 
```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Mac/Linux
lsof -i :3000
kill -9 <PID>
```

Or edit `vite.config.js` to use different port:
```javascript
server: {
  port: 3001,  // Change to any available port
}
```

---

## 🧪 Testing Issues

### Q: How do I run tests?

**A:** 
```bash
npm test              # Interactive watch mode
npm run test:coverage # Coverage report
```

### Q: Tests are failing

**A:** Try clearing Jest cache:
```bash
npm test -- --clearCache
npm test
```

### Q: Test file not found

**A:** Ensure test file is in `src/__test__/` folder with `.test.jsx` extension

---

## 🐛 Application Issues

### Q: Application won't load

**A:** Check these:

1. **Is dev server running?**
   ```bash
   npm run dev
   ```

2. **Check browser console** for errors (F12)

3. **Clear browser cache**
   - Press Ctrl+Shift+Delete
   - Select "All time"
   - Click "Clear data"

4. **Hard refresh** (Ctrl+Shift+R or Cmd+Shift+R)

### Q: Mock data not loading

**A:**
1. Check file exists: `public/data/transactions.json`
2. Check file format is valid JSON
3. Open DevTools Console (F12)
4. Check for error messages
5. Verify fetch path is correct

### Q: Reward calculation seems wrong

**A:** Check these rules:
- Below $50 → 0 points
- $50-$100 → 1 point per dollar
- Above $100 → 2 points per dollar above $100 + 50

**Example: $120**
- (120 - 100) × 2 = 40
- (100 - 50) × 1 = 50
- Total = 90 ✓

### Q: Pagination not working

**A:**
1. Check you selected a customer
2. Check customer has transactions
3. Check filters don't hide all data
4. Open console for errors

### Q: Filters not updating

**A:**
1. Ensure customer is selected
2. Check month and year values
3. Verify data exists for selected period
4. Check browser console for errors

---

## 🎨 UI/UX Issues

### Q: Application not responsive on mobile

**A:** 
1. Check mobile viewport: DevTools → Toggle device toolbar (Ctrl+Shift+M)
2. Clear browser cache
3. Check CSS is loading
4. Try different browser

### Q: Styles not applying

**A:**
1. **Hard refresh** (Ctrl+Shift+R)
2. **Clear browser cache**
3. **Check CSS file exists** in same folder
4. **Restart dev server** (stop and `npm run dev`)
5. **Check CSS filename** matches import

### Q: Layout looks broken

**A:**
1. Check window size (might be very small)
2. Zoom out if necessary (Ctrl+-)
3. Clear browser cache
4. Try different browser

---

## 🔧 Development Issues

### Q: Changes not reflecting in browser

**A:**
1. **Check if dev server is running** (`npm run dev`)
2. **Hard refresh** (Ctrl+Shift+R)
3. **Check Console** for errors (F12)
4. **Restart dev server:**
   - Press Ctrl+C in terminal
   - Run `npm run dev` again

### Q: Component not rendering

**A:**
1. Check for console errors (F12)
2. Verify PropTypes match props passed
3. Check component export: `export default ComponentName`
4. Verify imports use correct path
5. Check for JSX syntax errors

### Q: Infinite loop or app freezing

**A:**
1. Check `useEffect` dependencies
2. Verify pagination logic
3. Check for recursive function calls
4. Review console for errors

### Q: Memory leak warning

**A:** Usually happens with cleanup:
- Add cleanup functions in `useEffect`
- Cancel async operations on unmount
- Clear timers in cleanup

---

## 📁 File Structure Issues

### Q: Can't find a file

**A:** File structure should be:
```
Rewards-App/
├── src/
│   ├── components/
│   ├── hooks/
│   ├── utils/
│   ├── services/
│   ├── constants/
│   └── __test__/
├── public/
│   └── data/
├── package.json
├── vite.config.js
└── index.html
```

### Q: Import paths not working

**A:** Use correct paths:
- From `App.jsx`: `import Component from './components/folder/file.jsx'`
- From nested files: Use `../` to go up folders
- Avoid: `import from '..'` (ambiguous)

---

## 💾 Build & Deployment

### Q: How do I build for production?

**A:**
```bash
npm run build
```
Creates `dist/` folder with optimized files.

### Q: Build is failing

**A:**
1. Fix all console errors: `npm run dev`
2. Check for TypeScript errors (should be JS)
3. Verify all imports work
4. Run tests: `npm test`
5. Try clean build:
   ```bash
   rm -rf dist
   npm run build
   ```

### Q: How do I deploy?

**A:** Options:

1. **Vercel** - Easiest for React
   - Push to GitHub
   - Connect in Vercel dashboard
   - Auto-deploys

2. **Netlify**
   - Drag & drop `dist/` folder
   - Or connect GitHub

3. **AWS S3**
   - Upload `dist/` to S3 bucket
   - Enable static website hosting

4. **Azure Static Web Apps**
   - Create Static Web App
   - Upload `dist/` contents

---

## 🔍 Debugging

### Q: How do I debug the application?

**A:** Open browser DevTools (F12):

1. **Console Tab**
   - See all logs and errors
   - Type commands
   - Check API calls

2. **Elements/Inspector Tab**
   - Inspect HTML structure
   - Check CSS classes
   - Test CSS changes live

3. **Network Tab**
   - See API calls
   - Check response data
   - Monitor timing

4. **Application Tab**
   - View localStorage/sessionStorage
   - Check cookies
   - Debug service workers

### Q: Enable detailed logging

**A:** In `src/App.jsx`, logs are already included:
```javascript
logger.info('Message', { data });
logger.warn('Warning', { data });
logger.error('Error', { data });
```

Check browser console (F12) for all logs.

---

## 📝 Code Issues

### Q: PropTypes warning in console

**A:** Fix in component:
```javascript
MyComponent.propTypes = {
  requiredProp: PropTypes.string.isRequired,
  optionalProp: PropTypes.number,
};
```

### Q: useState showing stale state

**A:** Make sure dependencies are correct:
```javascript
useEffect(() => {
  // code
}, [dependency1, dependency2]); // Include all dependencies
```

### Q: Infinite re-renders

**A:** Check:
1. useEffect dependencies (should change)
2. setState callbacks (shouldn't cause render)
3. No objects/arrays created in render
4. No function props recreated each render

---

## 🎯 Feature Questions

### Q: How are reward points calculated?

**A:** 
```
Amount < $50: 0 points
$50 to $100: (amount - 50) × 1
$100+: (amount - 100) × 2 + 50
```

### Q: How many items per page?

**A:** 10 items per page (configurable in `ITEMS_PER_PAGE` constant)

### Q: Can I change the data?

**A:** Yes! Edit `public/data/transactions.json`
- Add new transactions
- Modify existing ones
- Must be valid JSON
- Restart dev server to see changes

### Q: Can I add new customers?

**A:** Yes! Add transaction records to `transactions.json` with new `customerId`

### Q: Can I change available years?

**A:** Yes! Edit `AVAILABLE_YEARS` in `src/constants/index.js`

---

## 🆘 Getting Help

### Resources
1. **README.md** - Comprehensive documentation
2. **SETUP_GUIDE.md** - Quick start guide
3. **DEVELOPMENT.md** - Development patterns
4. **ARCHITECTURE.md** - System design
5. **Test files** - Usage examples

### Console Debugging
1. Open DevTools (F12)
2. Go to Console tab
3. Look for error messages
4. Check logger output
5. Use breakpoints if needed

### Common Error Messages

**"Cannot find module"**
- Check import path
- Verify file exists
- Check spelling

**"prop-types is not defined"**
- Forgot import: `import PropTypes from 'prop-types'`

**"React is not defined"**
- Need to import React (if using hooks)

**"Expected 'new Keyword'"**
- Components must be capitalized
- `MyComponent` not `myComponent`

---

## 💡 Performance Tips

### Improve performance:
1. Check DevTools Performance tab
2. Identify slow operations
3. Use `useMemo` for expensive calculations
4. Use `useCallback` for event handlers
5. Check for unnecessary re-renders

### Check for issues:
1. Open DevTools
2. Go to Network tab
3. Look for slow requests
4. Check bundle size
5. Monitor memory usage

---

## ✅ Checklist Before Shipping

- [ ] `npm test` passes all tests
- [ ] `npm run build` succeeds
- [ ] No console errors (F12)
- [ ] Application works on mobile
- [ ] All features working:
  - [ ] Customer selection
  - [ ] Filtering
  - [ ] Pagination
  - [ ] Calculations correct
  - [ ] Error handling works
- [ ] Documentation complete
- [ ] Code properly commented
- [ ] PropTypes defined everywhere

---

## 🎓 Learning Tips

### To understand the code:
1. Start with `App.jsx` - main component
2. Read `README.md` - architecture overview
3. Check `ARCHITECTURE.md` - system design
4. Look at components - understand hierarchy
5. Review hooks - custom logic
6. Study utilities - helper functions

### Practice:
1. Modify calculations
2. Add new components
3. Extend filtering
4. Add new features
5. Write more tests

---

## 📞 Still Having Issues?

### Step 1: Check Documentation
- README.md
- DEVELOPMENT.md
- ARCHITECTURE.md

### Step 2: Check Logs
- Browser Console (F12)
- DevTools Network tab
- DevTools Elements tab

### Step 3: Search Error
- Google the exact error
- Check React documentation
- Check Vite documentation

### Step 4: Review Code
- Check imports
- Check file paths
- Check PropTypes
- Check JSX syntax

### Step 5: Restart Everything
```bash
# Stop dev server (Ctrl+C)
rm -rf node_modules package-lock.json
npm install
npm run dev
```

---

**Still stuck? Review the code comments and documentation files - the answers are there!** 🚀
