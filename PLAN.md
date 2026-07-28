# Self Sync - Production Readiness Plan

## Issues Found During Code Review

### Critical Bugs
1. **Settings.jsx**: Uses `theme` and `toggleTheme` from `useTheme()` but context exposes `isDark` and `toggleTheme`
2. **Settings.jsx**: `ConfirmationDialog` uses wrong prop names (`confirmLabel`, `cancelLabel`, `onCancel`)  
3. **Profile.jsx**: Uses `updateProfile` from `useAuth()` but it's never defined in AuthContext
4. **AuthContext.jsx**: Missing `updateProfile` function definition
5. **ResultCard.jsx**: `ChevronDown` imported at bottom of file instead of top
6. **vite.config.js**: Proxy target is port 3001 but server.cjs runs on port 3000
7. **AIInterview.jsx**: Imports `Mic` but doesn't use it

### Backend File in Frontend
8. **server.cjs**: Complete backend with mock data, JWT, question bank - must be removed

### Missing Environment Variables
9. No `.env.example` file
10. API base URL hardcoded in `src/services/api.js`

### Missing Service Files
11. Need separate service files per domain (authService.js, dashboardService.js, etc.)

### Missing Documentation
12. No README.md
13. No API_DOCUMENTATION.md
14. No PROJECT_STRUCTURE.md

### Performance Issues
15. No lazy loading / React.lazy for routes
16. No React.memo on pure components
17. No useMemo/useCallback optimizations

### Accessibility Issues
18. Missing ARIA labels on interactive elements
19. Missing keyboard navigation improvements
20. Missing focus trap in modals

### Code Quality
21. `useLocalStorage.js` has console.log statements leftover
22. Unused imports in various files
23. No loading/error states integration for dashboard/history/reports API calls
24. `Dashboard.jsx` uses fake 800ms timeout instead of actual API call

---

## Execution Plan

### Phase 1: Fix Critical Bugs
- Fix Settings.jsx theme prop reference
- Fix ConfirmationDialog prop names in Settings.jsx
- Add updateProfile to AuthContext
- Fix ChevronDown import in ResultCard.jsx  
- Fix vite.config.js proxy port
- Remove unused imports (Mic from AIInterview.jsx)
- Remove console.log from useLocalStorage.js

### Phase 2: Remove Backend Code
- Delete server.cjs entirely (backend belongs to backend team)

### Phase 3: Environment Variables & API Layer
- Create .env.example
- Update api.js to use VITE_API_URL
- Create individual service files: authService.js, dashboardService.js, profileService.js, interviewService.js, reportService.js, notificationService.js

### Phase 4: Add Loading, Error, Empty States to All Pages
- Dashboard: Add API integration with loading/error/empty states
- History: Add API integration with loading/error/empty states  
- Reports: Add API integration with loading/error/empty states
- Profile: Add API integration with loading/error states
- LoadingScreen: Remove hardcoded timeout, wait for actual data

### Phase 5: Performance Optimization
- Add React.lazy + Suspense for route-based code splitting
- Add React.memo to pure components (Card, Button, Input, etc.)
- Add useMemo/useCallback where beneficial

### Phase 6: Accessibility Improvements
- Add ARIA labels to all interactive elements
- Improve keyboard navigation in Sidebar, Navbar, Modal
- Add focus trap to Modal
- Improve form accessibility

### Phase 7: Documentation
- Create README.md
- Create API_DOCUMENTATION.md
- Create PROJECT_STRUCTURE.md

### Phase 8: Build Verification & Final Report
- Verify npm install, npm run dev, npm run build
- Generate final report

