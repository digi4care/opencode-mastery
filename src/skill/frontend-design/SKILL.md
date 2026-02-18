---
name: frontend-design
description: UI/UX guidance for developers. Apply design principles, accessibility (WCAG), component states, interaction patterns, and responsive design. Use when building or reviewing user interfaces, forms, layouts, dashboards, or landing pages.
license: MIT
compatibility: opencode
metadata:
  author: OpenCode Community
  version: "1.0.0"
  source: ui-ux-pro-max + Anthropic + OpenCode Community
---

# Frontend Design (UI/UX for Developers)

Practical UI/UX guidance focused on usability, accessibility, and developer workflow.

## When to Use Me

Use me when:

- Building user interfaces (web, mobile, desktop)
- Designing forms, dashboards, landing pages
- Implementing responsive layouts
- Adding animations or micro-interactions
- Reviewing UI for accessibility issues
- Creating component states (loading, error, empty)
- Setting up design systems

Do not use me for:

- Backend architecture
- Database design
- API development
- Business logic implementation

---

## Quick Reference

### Component States Checklist

Every interactive component needs:

| State        | Visual               | Code Example                       |
| ------------ | -------------------- | ---------------------------------- |
| **Default**  | Normal appearance    | `class="btn"`                      |
| **Hover**    | Subtle feedback      | `hover:bg-gray-100`                |
| **Focus**    | Visible ring (a11y)  | `focus:ring-2 focus:ring-blue-500` |
| **Active**   | Pressed feedback     | `active:scale-95`                  |
| **Disabled** | Reduced opacity      | `opacity-50 cursor-not-allowed`    |
| **Loading**  | Spinner + disabled   | `disabled spinner`                 |
| **Error**    | Red border + message | `border-red-500 text-red-600`      |

### Touch Targets

- **Minimum size**: 44x44px
- **Minimum gap**: 8px between targets
- **Code**: `min-h-[44px] min-w-[44px]`

### Typography Quick Rules

| Element | Size    | Weight   | Line Height |
| ------- | ------- | -------- | ----------- |
| H1      | 32-48px | Bold     | 1.2-1.3     |
| H2      | 24-32px | Semibold | 1.3-1.4     |
| Body    | 16px    | Regular  | 1.5-1.6     |
| Small   | 12-14px | Regular  | 1.4-1.5     |
| Minimum | 12px    | -        | -           |

### Color Accessibility

- **Normal text**: 4.5:1 contrast ratio minimum
- **Large text**: 3:1 contrast ratio minimum
- **Never rely on color alone** - add icons or text

---

## Workflow

1. **Analyze requirements** - Product type, style keywords, industry
2. **Apply visual hierarchy** - Size, color, weight, position
3. **Implement states** - Default, hover, focus, active, disabled, loading, error
4. **Check accessibility** - Contrast, focus states, ARIA labels
5. **Test responsive** - 320px, 375px, 768px, 1024px, 1440px
6. **Review interactions** - Feedback for all user actions

---

## Key Principles

### 1. Visual Hierarchy

Guide user attention through:

- **Size**: Larger = more important
- **Color**: Darker/vibrant = more attention
- **Weight**: Bolder = stands out
- **Position**: Top/center = noticed first

### 2. Feedback

Every action needs response:

- **Immediate**: Button press, hover state
- **Progress**: Loading spinners, skeletons
- **Completion**: Success toasts, checkmarks
- **Failure**: Error messages with recovery

### 3. Accessibility (WCAG 2.1)

Non-negotiable requirements:

- All images have `alt` text
- All inputs have labels
- All interactive elements have focus states
- Color contrast meets 4.5:1 minimum
- Never convey info by color alone

### 4. Mobile-First

- Start with mobile, enhance for larger screens
- Touch targets 44x44px minimum
- Primary actions in thumb zone (bottom of screen)
- Test on actual devices

---

## Common Patterns

### Form UX

```
✓ Label above input
✓ Error below input
✓ Inline validation on blur
✓ Show/hide password toggle
✓ Appropriate input types (email, tel, number)
✓ Required field indicators
```

### Loading States

```
✓ Skeleton screens for content
✓ Spinners for actions
✓ Progress bars for multi-step
✓ Disable buttons during submission
```

### Empty States

```
✓ Clear message explaining why empty
✓ Actionable CTA to fix it
✓ Helpful tips or suggestions
✓ Maintain brand personality
```

### Error Handling

```
✓ Clear message what went wrong
✓ Actionable solution
✓ Preserve user input
✓ Don't blame the user
```

---

## Anti-Patterns to Avoid

| Don't                    | Do Instead                   |
| ------------------------ | ---------------------------- |
| Remove focus outlines    | Add custom focus styles      |
| Use placeholder as label | Always show visible label    |
| Auto-play video/audio    | Click-to-play only           |
| Infinite animations      | Animate on interaction       |
| Generic "Error occurred" | Specific error with solution |
| Disable zoom             | Never disable user zoom      |
| Fixed 100vh on mobile    | Use `min-h-dvh`              |

---

## References

For detailed guidance on specific topics:

- **references/visual-hierarchy.md** - Size, color, weight, position
- **references/layout-alignment.md** - Grid systems, spacing, alignment
- **references/contrast-accessibility.md** - WCAG compliance, ARIA
- **references/typography.md** - Font selection, sizing, line height
- **references/color-theory.md** - Palette selection, dark mode
- **references/interaction-patterns.md** - Fitts's Law, Hick's Law
- **references/component-states.md** - All states checklist
- **references/forms-ux.md** - Form design patterns
- **references/mobile-ux.md** - Touch targets, thumb zone
- **references/animation.md** - Micro-interactions, reduced motion
- **references/ux-guidelines.md** - 99 actionable guidelines
- **references/product-recommendations.md** - Style by product type
