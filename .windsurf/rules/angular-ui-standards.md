# UI Component Standards
applyTo: src/**/*.html, src/**/*.ts
angular: 22

Enforce pre-built custom components over native HTML. Components under `src/app/common/components/` are read-only stable APIs — never modify their source files. Customize only via existing `input()` configs or content projection.

---

## TypeScript

- Enable `strict: true` in `tsconfig.json` — no exceptions.
- Never use `any`. Use `unknown` when type is uncertain; narrow explicitly before use.
- Prefer type inference when the type is obvious. Annotate only when inference is insufficient.
- Never cast with `as SomeType` to silence a type error — fix the type instead.

---

## Naming Conventions

### Files
- Components: `user-profile.component.ts` — kebab-case, `.component.ts` suffix.
- Services: `auth.service.ts` — kebab-case, `.service.ts` suffix.
- Guards: `auth.guard.ts` — kebab-case, `.guard.ts` suffix.
- Pipes: `truncate.pipe.ts` — kebab-case, `.pipe.ts` suffix.
- Directives: `highlight.directive.ts` — kebab-case, `.directive.ts` suffix.
- Interfaces / models: `user.model.ts` — kebab-case, `.model.ts` suffix.
- Enums: `user-roles.enum.ts` — kebab-case, `.enum.ts` suffix.
- Signal stores: `cart.store.ts` — kebab-case, `.store.ts` suffix.
- Resolvers: `product.resolver.ts` — kebab-case, `.resolver.ts` suffix.
- External templates / styles: same base name as the component file — `user-profile.component.html`.

### Classes & Decorators
- Components: `PascalCase` + `Component` suffix — `UserProfileComponent`.
- Services: `PascalCase` + `Service` suffix — `AuthService`.
- Guards: `PascalCase` + `Guard` suffix — `AuthGuard`.
- Pipes: `PascalCase` + `Pipe` suffix — `TruncatePipe`.
- Directives: `PascalCase` + `Directive` suffix — `HighlightDirective`.
- Resolvers: `PascalCase` + `Resolver` suffix — `ProductResolver`.
- Signal stores: `PascalCase` + `Store` suffix — `CartStore`.
- Interfaces: `PascalCase`, no `I` prefix — `UserProfile`, not `IUserProfile`.
- Type aliases: `PascalCase` — `ApiResponse<T>`.
- **Enums: `PascalCase` + `Enum` suffix — `UserRolesEnum`, `BtnStyleEnum`, `OrderStatusEnum`.**
- **Enum members: `PascalCase` — `UserRolesEnum.SuperAdmin`, `OrderStatusEnum.Pending`.**

```ts
// user-roles.enum.ts
export enum UserRolesEnum {
  SuperAdmin = 'SUPER_ADMIN',
  Admin = 'ADMIN',
  Viewer = 'VIEWER',
}

// order-status.enum.ts
export enum OrderStatusEnum {
  Pending = 'PENDING',
  InProgress = 'IN_PROGRESS',
  Completed = 'COMPLETED',
}
```

### Selectors
- Components: `app-` prefix, kebab-case — `app-user-profile`. For selectorless usage, import the class directly.
- Directives: `app-` prefix, kebab-case attribute — `app-highlight`.
- Never use generic unprefixed selectors — they collide with HTML or third-party elements.

### Variables & Properties
- Signals: `camelCase`, no suffix — `readonly isLoading = signal(false)`.
- Computed signals: `camelCase`, no suffix — `readonly fullName = computed(() => ...)`.
- `httpResource` / `resource`: `camelCase`, noun describing the data — `readonly orders = httpResource(...)`.
- Private class members: `camelCase`, no underscore prefix — use the `private` keyword instead.
- Module-level constants: `SCREAMING_SNAKE_CASE` — `const MAX_RETRY_COUNT = 3`.
- Boolean signals/variables: prefix with `is`, `has`, `can`, or `should` — `isVisible`, `hasError`, `canSubmit`.
- Enum references in components: import the full enum, never re-export raw string literals — `UserRolesEnum.Admin`, not `'ADMIN'`.

### Methods & Functions
- `camelCase`, verb-first — `loadUser()`, `handleSubmit()`, `formatDate()`.
- Event handlers: `on` prefix — `onSave()`, `onRouteChange()`.
- Predicate / guard functions: `is`, `has`, or `can` prefix — `isAuthenticated()`, `canEdit()`.

### Templates
- Template reference variables: `camelCase` — `#userForm`, `#dialogRef`.
- `@for` loop variables: singular of the collection name — `@for (order of orders(); track order.id)`.

### Routes
- Route paths: kebab-case, lowercase — `user-profile`, `work-orders`.
- Route name constants: `SCREAMING_SNAKE_CASE` — `export const ROUTES = { DASHBOARD: 'dashboard' }`.

---

## Angular Constraints

- All components are standalone by default in Angular 22. Never set `standalone: true` explicitly — it is redundant.
- Never use `NgModules` for new code.
- Never use `@Input()` or `@Output()` decorators — use `input()` and `output()` functions.
- Never use `@HostBinding` or `@HostListener` — declare host bindings in the `host` object of `@Component` or `@Directive`.
- Never use `ngClass` — use `class` bindings instead.
- Never use `ngStyle` or inline `style` bindings — use Tailwind classes.
- Never use `*ngIf`, `*ngFor`, `*ngSwitch` — use native control flow: `@if`, `@for`, `@switch`.
- Never call functions in templates outside of signal invocations — they execute on every render cycle. Use `computed()` for derived values.
- Never use `@for` without a `track` expression — always track by unique identifier.
- Do not assume globals like `new Date()` are available in templates — compute them in the component class.
- Use `inject()` for dependency injection — never constructor injection.
- Use `NgOptimizedImage` for all static images. It does not support inline base64 images.
- Keep components small and single-responsibility.
- Use inline templates for small components.
- When using external templates or styles, use paths relative to the component `.ts` file.

```html
@for (item of items(); track item.id) { ... }

@if (isReady()) { ... } @else { ... }
```

```ts
// host bindings
@Component({
  host: { '(click)': 'onClick()', '[class.active]': 'isActive()' }
})
```

---

## State Management

- Use `signal()` for local component state.
- Use `computed()` for all derived state — never recompute inline in templates.
- Never call `.mutate()` on signals — use `.set()` or `.update()`.
- Keep state transformations pure and side-effect-free.
- Never set `ChangeDetectionStrategy.Default` — OnPush is the Angular 22 default.
- Never trigger change detection manually via `ChangeDetectorRef` unless integrating a third-party library, and document the reason.

---

## Services

- One responsibility per service.
- Use `inject()` — never constructor injection.
- Use `@Service` decorator — never `{ providedIn: 'root' }` inside `@Injectable`.
- For scoped services, pass the `autoprovided` option to bind the lifecycle to a specific component.

---

## Forms

- Use Signal Forms (`signalForm`, `signalControl`) — never `ReactiveFormsModule`, `FormGroup`, or `valueChanges` for new code.
- `ReactiveFormsModule` is permitted only for maintaining existing legacy form code.
- Always attach validators to every control — never accept unbounded or unvalidated input.
- Client-side validation is UX only, never a security boundary — always validate server-side as well.
- Never log or serialize password field values anywhere.

```ts
readonly form = signalForm({
  email: signalControl('', [Validators.required, Validators.email]),
  password: signalControl('', [Validators.required, Validators.minLength(8)]),
});
```

---

## Data Fetching

- Use `httpResource()` for all async data — it is signal-based, cancels on destroy, and deduplicates in-flight requests.
- Never subscribe to observables manually in components — prefer `httpResource()` or `toSignal()` with injector context.
- Never call fetch methods imperatively — use reactive signal params so `httpResource()` re-fetches automatically.
- Never use raw `fetch()` or `XMLHttpRequest` — they bypass Angular interceptors.
- All URLs must target relative paths or environment-configured base URLs — never hardcode absolute URLs in components.

```ts
readonly page = signal(1);
readonly orders = httpResource(() => `/api/orders?page=${this.page()}`);
```

---

## Routing & Lazy Loading

- Every feature route must be lazy-loaded — never eagerly import feature components in the root app.
- Use `loadComponent` for standalone routes, `loadChildren` for feature groups.
- Every protected route must have a route guard.
- Route guards are client-side UX only — always enforce authorization server-side on every request.
- Never trust route params or query params as authorization proof.
- Role checks in guards must read from a signal-based auth service backed by a verified server response — never from a decoded client-side JWT payload.

---

## Performance

- Use `@defer` for below-the-fold content and heavy components to reduce initial bundle execution.
- Use `@placeholder` and `@loading` blocks inside `@defer` for perceived performance.
- Never import full libraries (lodash, moment, etc.) — use native JS or tree-shakeable alternatives.
- Never import entire icon libraries — import only the specific icons used.
- Import domain cards and design system components only in the components that use them.

```html
@defer (on viewport) {
  <AppAuditLogsCard />
} @placeholder {
  <div class="h-32 bg-gray-100 animate-pulse"></div>
}
```

---

## Security

Flag any violation below as a blocker. Do not ship with unresolved security findings.

### XSS
- Never use `[innerHTML]` binding. If unavoidable, sanitize via `DomSanitizer.sanitize(SecurityContext.HTML, value)`.
- Never use any `bypassSecurityTrust*` method without a peer-reviewed justification comment.
- Never interpolate user-controlled data into `[src]`, `[href]`, or `[style]` bindings without sanitization.
- Prefer `{{ value }}` template interpolation — Angular escapes it automatically.
- Never manipulate the DOM via `ElementRef.nativeElement` with user-controlled data.

### Auth & Tokens
- Never store JWTs or refresh tokens in `localStorage` or `sessionStorage` — use `httpOnly` cookies only.
- Never store sensitive data (roles, permissions, PII) in a JWT payload read on the client side.
- All HTTP calls must go through `HttpClient` — interceptors are only applied to `HttpClient`.
- The auth interceptor must attach the `Authorization` header centrally — never attach tokens manually per service call.
- On 401 responses, the interceptor must clear auth state and redirect to login — never silently ignore.
- On 403 responses, redirect to an access-denied route — never expose raw error details to the user.

### CSRF
- For cookie-based auth with state-changing requests (`POST`, `PUT`, `PATCH`, `DELETE`), the interceptor must send the XSRF token header.
- Confirm the backend validates the XSRF token on every state-changing request.

### Secrets & Environment
- Never put API keys, secrets, or tokens in `environment.ts` — they are bundled into the JS output and visible to anyone.
- Use server-side proxying or a backend-for-frontend pattern for secrets.
- `NODE_ENV` and equivalent environment flags must be checked before enabling debug routes or verbose error output.

### Content Security Policy
- CSP must be enforced via HTTP headers at the nginx/server level — never rely on meta-tag CSP alone.
- Do not dynamically load external scripts or stylesheets at runtime unless the source is pinned to a hash or nonce.

### Error Handling
- Never pass raw server error messages into `AppAlert` or `AppToast` — they may leak stack traces, field names, or internal paths. Map all server errors to safe user-facing strings.
- Never `console.log` HTTP response bodies containing user data in any environment.

### Input Validation
- Sanitize and validate any value used in route construction, query param building, or URL interpolation.
- Never construct API paths via string concatenation with raw user input.

---

## Accessibility (WCAG AA — all checks required)

- All interactive elements must be keyboard navigable and have visible focus styles.
- All images must have descriptive `alt` attributes. Decorative images use `alt=""`.
- All form fields rendered via `AppInput` must have associated labels — the `[label]` input satisfies this.
- Never rely on color alone to convey meaning — pair with text or icons.
- Maintain a minimum contrast ratio of 4.5:1 for normal text, 3:1 for large text.
- Use semantic HTML elements (`<nav>`, `<main>`, `<section>`, `<article>`, `<header>`, `<footer>`) — never use a `<div>` where a semantic element fits.
- Dynamic content updates (alerts, toasts, errors) must use `aria-live` regions so screen readers announce them.
- Modal dialogs must trap focus while open and restore focus to the trigger on close.
- All `@if`/`@for` rendered content that changes the visible page must not break the logical tab order.
- Must pass all automated AXE checks with zero violations before any PR is merged.

---

## Deprecated → Replacement

| Deprecated | Use Instead |
|---|---|
| `@Input()` / `@Output()` | `input()` / `output()` |
| `@HostBinding` / `@HostListener` | `host: {}` in `@Component` / `@Directive` |
| `async` pipe / Observable chain | `resource()` / `httpResource()` |
| `*ngIf` / `*ngFor` / `*ngSwitch` | `@if` / `@for` / `@switch` |
| `ngClass` | `class` bindings |
| `ngStyle` / `style` bindings | Tailwind classes |
| `FormGroup` + `valueChanges` | `signalForm` / `signalControl` |
| Constructor injection | `inject()` |
| `{ providedIn: 'root' }` | `@Service` decorator |
| `ChangeDetectionStrategy.Default` | OnPush (Angular 22 default) |
| Zone.js rendering | `provideZonelessChangeDetection()` |
| `standalone: true` declaration | Omit — default in Angular 22 |
| `<app-foo>` string selector | Selectorless class import `<Foo>` |
| `signal.mutate()` | `signal.set()` / `signal.update()` |
| `localStorage` / `sessionStorage` for tokens | `httpOnly` cookies |
| Raw `fetch()` / `XMLHttpRequest` | `HttpClient` |
| `bypassSecurityTrust*` | `DomSanitizer.sanitize()` with `SecurityContext` |
| `<img>` tag | `NgOptimizedImage` |

---

## Components

### AppButton
Import: `import { AppButton } from '@common/components/button/button';`
Also import: `import { btnStyle } from '@shared/enums';`

Inputs:
- `[message]` string — button label. Never bind to unvalidated user input.
- `[type]` string — `'button'` | `'submit'`
- `[isLoading]` boolean signal — shows spinner
- `[buttonStyle]` enum — `btnStyle.primary` | `btnStyle.link` | etc.

Icon slot: `<i icon class="...">` projected as named content slot.

```html
<AppButton [buttonStyle]="btnStyle.primary" message="Submit" [isLoading]="isPending()">
  <i icon class="fa-solid fa-check"></i>
</AppButton>
```

---

### AppInput
Import: `import { AppInput } from '@common/components/input/input';`
Do NOT add `ReactiveFormsModule`. Pass a `signalControl` reference directly.

Inputs:
- `[control]` — Signal Form control ref. Always include validators.
- `[label]` string — visible field label (required for accessibility)
- `[idInput]` string — element ID. Set to `'password'` or `'rePassword'` to auto-enable the visibility toggle.
- `[placeholderInput]` string — placeholder text
- `[element]` string — `'input'` | `'textArea'`

```html
<AppInput [control]="form.controls.email" label="Email" idInput="email" placeholderInput="Enter email..." />
<AppInput [control]="form.controls.password" label="Password" idInput="password" placeholderInput="Enter password..." />
```

---

### AppAlert / AppToast
Import: `import { AppAlert } from '@common/components/alert/alert';`

Inputs:
- `[isSuccess]` boolean signal — success state
- `[hasError]` boolean signal — error state
- `[message]` string signal — display text. Must be a safe user-facing string, never a raw server error.

The host element must be in an `aria-live` region so screen readers announce updates.

```html
<AppAlert [isSuccess]="isValid()" [hasError]="hasFailed()" [message]="statusMessage()" />
```

---

### AppMainCard
Import: `import { AppMainCard } from '@common/components/cards/main-card/main-card';`
Structural wrapper with a single unnamed `<ng-content>` slot. Use for all dashboard sections, grids, and summary layouts.

```html
<AppMainCard>
  <!-- child layout -->
</AppMainCard>
```

---

### Domain / Feature Cards
Before building any summary widget, statistics block, activity feed, or data table — check this list first. Never build a custom layout if a domain card covers the use case.

| Use case | Component | Import path |
|---|---|---|
| Recent activity / history | `AppAuditLogsCard` | `@common/components/cards/audit-logs-card/audit-logs-card` |
| Stock / inventory alerts | `AppStorageAlertCard` | `@common/components/cards/storage-alert-card/storage-alert-card` |
| KPI / metric counters | `AppWokFlowCard` | `@common/components/cards/wok-flow-card/wok-flow-card` |
| Job orders / invoices table | `AppWorkOrdersCard` | `@common/components/cards/work-orders-card/work-orders-card` |

AppWokFlowCard inputs: `[faClass]` `[number]` `[description]` `[price]`
AppWorkOrdersCard inputs: `[page]` `[title]`
AppAuditLogsCard, AppStorageAlertCard: self-contained, no inputs.

Wrap domain cards in `@defer` when below the fold or conditionally visible.

```html
@defer (on viewport) {
  <AppWorkOrdersCard [page]="page()" title="أحدث الطلبات" />
} @placeholder {
  <div class="h-48 bg-gray-100 animate-pulse rounded-lg"></div>
}
```
