# 👨‍💻 Development Guide

## Code Organization & Conventions

### File Naming
- **Components**:  (e.g., `customersTable.jsx`)
- **Styles**: (e.g., `customersTable.css`)
- **Utilities**:(e.g., `calculateRewardPoints.js`)
- **Hooks**: `useXxx.js` (e.g., `usePagination.js`)

### Folder Structure Convention
```
Feature/
├── component.jsx          # Main component
├── component.css          # Component styles
├── component.test.jsx     # Component tests (if needed)
└── subcomponent.jsx       # Related subcomponents
```

---

## Component Development

### Creating a New Component

```javascript
import PropTypes from 'prop-types';
import './myComponent.css';

/**
 * MyComponent Description
 * What it does and when to use it
 */
function MyComponent({ prop1, prop2 }) {
  // Component logic here
  
  return (
    <div className="my-component">
      {/* JSX */}
    </div>
  );
}

MyComponent.propTypes = {
  prop1: PropTypes.string.isRequired,
  prop2: PropTypes.number,
};

MyComponent.defaultProps = {
  prop2: 0,
};

export default MyComponent;
```

### Component Best Practices
- ✅ Always define PropTypes
- ✅ Add JSDoc comments
- ✅ Use defaultProps for optional props
- ✅ Keep components focused (single responsibility)
- ✅ Extract magic numbers to constants
- ✅ Memoize expensive operations with useMemo

---

## Custom Hooks Development

### Creating a Custom Hook

```javascript
import { useState, useCallback } from 'react';
import logger from '../utils/logger';

/**
 * useMyHook - Brief description
 * Longer description of what the hook does
 * 
 * @returns {Object} Object with state and handlers
 */
export const useMyHook = () => {
  const [state, setState] = useState(null);

  const handler = useCallback(() => {
    logger.info('Handler called');
    setState(newState);
  }, []);

  return {
    state,
    handler,
  };
};

export default useMyHook;
```

### Hook Guidelines
- ✅ Name with `use` prefix
- ✅ Return object with clear property names
- ✅ Use useCallback for event handlers
- ✅ Use useMemo for computed values
- ✅ Add proper documentation
- ✅ Include error handling

---

## Styling Guidelines

### CSS Organization
```css
/* 1. Block/Container styles */
.component-container {
  /* Layout properties */
  /* Sizing */
  /* Colors */
}

/* 2. Element styles */
.component-element {
  /* Specific element styles */
}

/* 3. Modifier/State styles */
.component-element.active {
  /* Active/selected state */
}

/* 4. Responsive styles */
@media (max-width: 768px) {
  .component-container {
    /* Mobile adjustments */
  }
}
```

### Color Palette
```css
:root {
  --primary-color: #3b82f6;      /* Blue */
  --primary-dark: #1e40af;       /* Dark Blue */
  --success-color: #10b981;      /* Green */
  --error-color: #dc2626;        /* Red */
  --warning-color: #f59e0b;      /* Amber */
  --gray-50: #f9fafb;            /* Lightest */
  --gray-900: #111827;           /* Darkest */
}
```

### Responsive Breakpoints
```css
/* Mobile First Approach */
.component { /* Default mobile styles */ }

@media (min-width: 768px) { /* Tablet and up */ }
@media (min-width: 1024px) { /* Desktop and up */ }
@media (min-width: 1280px) { /* Large desktop and up */ }
```

---

## Utility Functions

### Creating a Utility Function

```javascript
/**
 * myUtilityFunction - Brief description
 * Longer description explaining the purpose
 * 
 * @param {type} param1 - Parameter description
 * @param {type} param2 - Parameter description
 * @returns {type} Return value description
 */
export const myUtilityFunction = (param1, param2) => {
  try {
    // Implementation
    logger.info('Function executed', { param1, param2 });
    return result;
  } catch (error) {
    logger.error('Error in myUtilityFunction', { error });
    return defaultValue;
  }
};
```

### Utility Best Practices
- ✅ Always document with JSDoc
- ✅ Handle edge cases
- ✅ Add error handling
- ✅ Use logger for debugging
- ✅ Write pure functions when possible
- ✅ Create unit tests

---

## Testing Guidelines

### Unit Test Template

```javascript
import { myFunction } from '../utils/myUtils';

describe('MyFunction', () => {
  describe('positive cases', () => {
    test('should do X when given Y', () => {
      const result = myFunction(input);
      expect(result).toBe(expectedValue);
    });
  });

  describe('edge cases', () => {
    test('should handle invalid input', () => {
      expect(myFunction(null)).toBe(defaultValue);
    });
  });

  describe('integration', () => {
    test('should work with related functions', () => {
      const result1 = functionA(input);
      const result2 = functionB(result1);
      expect(result2).toBe(expectedValue);
    });
  });
});
```

### Test Coverage Goals
- ✅ 80%+ overall coverage
- ✅ 100% coverage for utility functions
- ✅ Happy path + edge cases
- ✅ Error scenarios
- ✅ Integration scenarios

---

## Performance Optimization

### Memoization

```javascript
// Memoize expensive calculations
const memoizedValue = useMemo(() => {
  return expensiveCalculation(data);
}, [data]);

// Memoize callbacks
const handleClick = useCallback(() => {
  doSomething(id);
}, [id]);
```

### Pagination
- ✅ Display 10 items per page
- ✅ Lazy render paginated items
- ✅ Reset on filter change

### Component Rendering
- ✅ Avoid inline function definitions in JSX
- ✅ Use React.memo for pure components
- ✅ Lift state only when needed
- ✅ Avoid prop drilling with custom hooks

---

## Error Handling

### Try-Catch Pattern

```javascript
try {
  // Risky operation
  const result = performOperation();
  logger.info('Operation successful', { result });
  return result;
} catch (error) {
  logger.error('Operation failed', { error: error.message });
  // Handle gracefully
  return defaultValue;
}
```

### User-Facing Errors
- Clear, non-technical messages
- ✅ Actionable solutions
- ✅ Retry options when applicable
- ✅ No stack traces to users

---

## Logging Guidelines

### When to Log

```javascript
// Log API calls
logger.info('API call initiated', { endpoint, params });

// Log state changes
logger.info('State updated', { previousValue, newValue });

// Log user actions
logger.info('Button clicked', { buttonId, timestamp });

// Log calculations
logger.info('Rewards calculated', { amount, points });

// Log warnings
logger.warn('Unusual condition detected', { condition });

// Log errors
logger.error('Operation failed', { error, context });
```

### Log Levels
- `info()` - General information flow
- `warn()` - Potentially problematic situations
- `error()` - Error conditions requiring attention

---

## Git Workflow

### Commit Message Convention
```
type(scope): subject

feat(auth): add login functionality
fix(rewards): correct calculation logic
refactor(components): extract reusable logic
test(calculator): add edge case tests
docs(readme): update installation steps
```

### Types
- `feat`: New feature
- `fix`: Bug fix
- `refactor`: Code restructuring
- `test`: Adding/updating tests
- `docs`: Documentation
- `style`: Formatting/styling

---

## Code Review Checklist

- [ ] Code follows naming conventions
- [ ] PropTypes defined and correct
- [ ] Error handling implemented
- [ ] Logging appropriate
- [ ] Tests written and passing
- [ ] No console errors/warnings
- [ ] Mobile responsive
- [ ] Performance acceptable
- [ ] Documentation clear
- [ ] No unnecessary dependencies

---

## Debugging Tips

### Browser DevTools
1. **Console**: Check for errors and logs
2. **Network**: Verify API calls and responses
3. **Sources**: Set breakpoints and step through
4. **React DevTools**: Inspect component tree

### Useful Commands
```javascript
// Log entire object
console.log({ user, transactions });

// Group related logs
console.group('Transaction Processing');
console.log('Step 1...');
console.log('Step 2...');
console.groupEnd();

// Performance profiling
console.time('label');
// ... code to measure
console.timeEnd('label');
```

---

## Performance Profiling

### React DevTools Profiler
1. Open DevTools → Profiler tab
2. Start recording
3. Interact with app
4. Stop recording
5. Analyze renders and timing

### Check for:
- ✅ Unnecessary re-renders
- ✅ Render duration
- ✅ Component hierarchy
- ✅ Prop changes

---

## Dependency Management

### Adding Dependencies
```bash
npm install package-name
```

### Updating Dependencies
```bash
npm update
npm outdated  # Check for outdated packages
```

### Removing Dependencies
```bash
npm uninstall package-name
```

### Important
- ✅ Keep dependencies minimal
- ✅ Review before adding
- ✅ Check for security vulnerabilities
- ✅ Document reasons for dependencies

---

## Documentation Standards

### JSDoc Comment Template
```javascript
/**
 * Function name - Brief description
 * Longer description of what the function does,
 * when to use it, and any important notes.
 * 
 * @param {type} paramName - Description
 * @param {type} optionalParam - Description (optional)
 * @returns {type} Description of return value
 * @throws {ErrorType} Description of error
 * 
 * @example
 * const result = myFunction(value);
 * console.log(result); // Output description
 */
```

---

## Common Gotchas

### ⚠️ Don't
- ❌ Use index as key in lists (unless static)
- ❌ Mutate state directly
- ❌ Use setState in render
- ❌ Forget dependency arrays in hooks
- ❌ Create objects/functions in render
- ❌ Ignore PropTypes warnings

### ✅ Do
- ✅ Use stable keys in lists
- ✅ Create new objects when updating state
- ✅ Keep side effects in useEffect
- ✅ Include all dependencies in arrays
- ✅ Define functions outside render
- ✅ Fix PropTypes errors immediately

---

## Resources

- [React Hooks API](https://react.dev/reference/react/hooks)
- [React Best Practices](https://react.dev/learn)
- [JavaScript Best Practices](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide)
- [CSS Guidelines](https://google.github.io/styleguide/htmlcssguide.html)

---

Happy coding! 🚀
