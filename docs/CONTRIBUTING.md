# Contributing to Bitácora

Thank you for considering contributing to Bitácora! This document provides guidelines for contributions.

## Code of Conduct

- Be respectful and inclusive
- Provide constructive feedback
- Focus on the work, not the person
- Help others learn and grow

## Getting Started

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Make your changes
4. Test thoroughly
5. Create a pull request

## Development Setup

```bash
npm install
npm run dev
```

Server runs on http://localhost:3000

## Code Style

### TypeScript
- Use strict mode
- Add type annotations
- Prefer interfaces over types for objects

### React Components
```typescript
// Functional components with hooks
export function ComponentName() {
  const [state, setState] = useState(initialValue)
  
  return <div>...</div>
}
```

### File Organization
- One component per file
- Styles inline or in same directory
- Descriptive names (e.g., `DailyPlan.tsx` not `Plan.tsx`)

### Tailwind CSS
- Use utility classes directly
- Create custom classes only for reused patterns
- Mobile-first responsive design
- Consistent spacing (4px units)

## Commit Messages

Format: `type: description`

Examples:
- `feat: Add real-time habit sync`
- `fix: Correct timezone display in schedule`
- `docs: Update README with setup instructions`
- `refactor: Reorganize components structure`

Types:
- `feat` - New feature
- `fix` - Bug fix
- `docs` - Documentation
- `refactor` - Code reorganization
- `perf` - Performance improvement
- `test` - Test additions/updates

## Pull Request Process

1. **Update documentation** - If adding features, update relevant docs
2. **Test thoroughly** - Manual testing on desktop and mobile
3. **Clear description** - Explain what and why
4. **Link issues** - Reference related issues with `#123`
5. **Keep it focused** - One feature/fix per PR
6. **Squash commits** - Clean history preferred

PR Template:
```markdown
## Description
Brief overview of changes

## Type
- [ ] Feature
- [ ] Bug fix
- [ ] Documentation
- [ ] Refactoring

## Changes
- Change 1
- Change 2

## Testing
- [ ] Desktop testing
- [ ] Mobile testing
- [ ] Chrome
- [ ] Safari
- [ ] Firefox

## Screenshots (if UI changes)
[Add screenshots]

## Related Issues
Closes #123
```

## Database Changes

When modifying database schema:

1. Create new migration file: `supabase/migrations/###_description.sql`
2. Include up and down migrations
3. Test migration locally
4. Document schema changes
5. Update ARCHITECTURE.md

Example:
```sql
-- Up
ALTER TABLE habits ADD COLUMN category TEXT;

-- Down
ALTER TABLE habits DROP COLUMN category;
```

## Areas & Guidelines

### `/app` - Page Routes
- Keep page components light
- Use Server Components where possible
- Delegate logic to components or Server Actions

### `/components` - Reusable Components
- Single responsibility principle
- Props well-typed with TypeScript
- No hardcoded strings (use constants)
- Accessible markup (semantic HTML, ARIA)

### `/lib` - Business Logic
- Pure functions preferred
- No side effects in constants
- Server Actions are async by default
- Error handling with try-catch

### `/lib/constants` - Data
- 12-month curriculum is source of truth
- Update milestones annually
- Schedule variations documented
- Habit definitions are core

## Testing

### Manual Testing Checklist
- [ ] Feature works on desktop
- [ ] Feature works on mobile
- [ ] Feature works on tablet
- [ ] No console errors
- [ ] Accessible with keyboard
- [ ] Works in light/dark modes
- [ ] Handles edge cases

### Areas to Test
1. **Daily Plan** - Current/next activities
2. **Habits** - Toggle and persistence
3. **Modals** - Open/close, content display
4. **Mobile** - Responsive layout, navigation
5. **Offline** - localStorage fallback

## Performance Guidelines

- Keep components small and focused
- Avoid inline function definitions in JSX
- Use React.memo for expensive components
- Lazy load modals and secondary features
- Optimize images and assets

## Documentation

Update these files when relevant:
- `README.md` - User-facing documentation
- `docs/ARCHITECTURE.md` - Technical design
- `docs/CONTRIBUTING.md` - This file
- Inline code comments for complex logic

## Questions?

- Open a discussion in GitHub Issues
- Check existing issues first
- Provide context and examples

## Licensing

By contributing, you agree your contributions are licensed under the MIT License.

---

**Thank you for making Bitácora better!**
