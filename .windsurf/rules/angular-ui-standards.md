---
description: Enforce custom Arabized UI components, dashboard cards, and Signal Input paradigms using exact repository paths.
applyTo: "src/**/*.html, src/**/*.ts"
---

# Workspace Coding Standards & UI Blueprint

You are a senior Angular engineer specializing in our custom internal design system. You must strictly enforce the use of our pre-built custom components found under `src/app/common/components/`. Do not rewrite, modify, or add fields to the core component declarations. Consume them as stable, read-only APIs.

---

## 🛑 Strict Engineering Constraints

1. **Read-Only Component Guardrail:** Never modify the source files inside `src/app/common/components/` to add one-off styling variables or custom layout conditions. Customize presentation purely by providing arguments to their existing `input()` configurations or via template content projection.
2. **Signal Paradigm Syntax:** All data inputs in this repository are strictly **Angular Signal Inputs** (`input()`). Always invoke them using function call syntax inside templates (e.g., `isSuccess()`, `message()`, `buttonStyle()`). Never bind properties directly as plain non-functional values when writing template code.
3. **Typography & Direction Enforcement:** The application primarily serves Arabic RTL layouts using designated fonts (`font-tajawal`, `font-cairo`). Ensure custom strings default to contextually relevant Arabic text where applicable.

---

## 🧩 Component Specifications & Import Mappings

### 1. Interactive Core Elements (Buttons)

- **Native Tag Ban:** Never use raw `<button>` elements for standard actions.
- **Mandated Component:** `<app-button>`
- **Import Mapping:** `import { Button } from '@common/components/button/button';`
- **Input Signals:**
  - `[message]`: The string text shown inside the button (defaults to `'اضغط هنا'`).
  - `[type]`: Native button type (e.g., `'button'`, `'submit'`).
  - `[isLoading]`: A boolean signal input to toggle the loading spinner state.
  - `[buttonStyle]`: Explicitly pass `btnStyle` enum options (imported from `@shared/enums`). Options: `btnStyle.btnNavy`, `btnStyle.btnWhite`, and `btnStyle.anchor`.
- **Icon Content Projection:** Project an element containing an `icon` attribute selection slot to pass an icon cleanly.

#### ✓ Correct Implementation Blueprint

```html
<app-button [buttonStyle]="btnStyle.btnNavy" message="حفظ التغييرات" [isLoading]="isSavingSignal()">
  <i icon class="fa-solid fa-floppy-disk"></i>
</app-button>
```

---

### 2. Form Architecture & Fields

- **Native Tag Ban:** Never use raw `<input>` or `<textarea>` tags for standard form captures.
- **Mandated Component:** `<app-input>`
- **Import Mapping:** `import { Input } from '@common/components/input/input';` *(Note: ensure `ReactiveFormsModule` is also added to the host imports array).*
- **Input Signals:**
  - `[control]`: Pass the `FormControl` reference directly.
  - `[label]`: The visible descriptive label over the input box.
  - `[idInput]`: Element ID (Setting to `'password'` or `'rePassword'` automatically enables the absolute-positioned interactive visibility eye toggle).
  - `[placeholderInput]`: Descriptive placeholder string.
  - `[element]`: Set to `'input'` for standard fields, or `'textArea'` for multiline text areas.

#### ✓ Correct Implementation Blueprint

```html
<app-input 
  [control]="loginForm.controls.password" 
  label="كلمة المرور" 
  idInput="password" 
  placeholderInput="أدخل كلمة المرور الخاصة بك">
</app-input>
```

---

### 3. Messaging & Feedback Layouts

- **Mandated Component:** `<app-alert>`
- **Import Mapping:** `import { Alert } from '@common/components/alert/alert';`
- **Input Signals:**
  - `[isSuccess]`: Boolean indicator mapping green success badges.
  - `[hasError]`: Boolean handling opacity overrides and warning style applications.
  - `[message]`: Text string to bind and evaluate.

#### ✓ Correct Implementation Blueprint

```html
<app-alert 
  [isSuccess]="authSuccessSignal()" 
  [message]="alertTextSignal()">
</app-alert>
```

---

### 4. Layout Structural Cards & Enclosures

- **Layout Wrapper Mandate:** Never map dashboard items, list grids, or summaries into plain raw white bordered divs.
- **Mandated Structural Component:** `<app-main-card>`
- **Import Mapping:** `import { MainCard } from '@common/components/cards/main-card/main-card';`
- **Usage Pattern:** Features an un-named `<ng-content></ng-content>` slot. Pass layouts directly within the boundaries of the tag.

#### ✓ Correct Implementation Blueprint

```html
<app-main-card>
  <div class="flex justify-between items-center mb-4">
    <h3 class="font-bold text-navy-900 text-sm">إحصائيات النظام</h3>
  </div>
  <p class="text-xs">محتوى لوحة التحكم هنا...</p>
</app-main-card>
```

---

### 5. Pre-Built Dashboard & Feature Cards

**Rule:** When requested to build a summary widget, statistics block, activity feed, or data table, you must check this list first. **NEVER rewrite standard layouts if a pre-made feature card fits the criteria.**

| If the prompt asks for... | Mandated Component | Import Path | Expected Input Signals |
|---|---|---|---|
| Recent Activities / History Log | `<app-audit-logs-card>` | `@common/components/cards/audit-logs-card/audit-logs-card` | None (Self-contained summary) |
| Stock Alerts / Inventory Alert | `<app-storage-alert-card>` | `@common/components/cards/storage-alert-card/storage-alert-card` | None (Self-contained list) |
| Metrics / KPI Summaries / Counts | `<app-wok-flow-card>` | `@common/components/cards/wok-flow-card/wok-flow-card` | `[faClass]`, `[number]`, `[description]`, `[price]` |
| Job Orders / Invoices Table | `<app-work-orders-card>` | `@common/components/cards/work-orders-card/work-orders-card` | `[page]`, `[title]` |

#### ✓ Correct Layout Aggregation Example

When generating combinations of dashboard stats, the AI must output this structural setup rather than reinventing the components:

```html
<div class="dashboard-grid">
  <app-wok-flow-card 
    faClass="screwdriver-wrench" 
    number="42" 
    description="أوامر الشغل النشطة">
  </app-wok-flow-card>

  <app-wok-flow-card 
    faClass="money-bill-wave" 
    number="15,400" 
    description="إجمالي الدخل" 
    [price]="true">
  </app-wok-flow-card>
</div>

<div class="main-content-area mt-6">
  <app-work-orders-card page="home" title="أحدث الطلبات"></app-work-orders-card>
</div>
```