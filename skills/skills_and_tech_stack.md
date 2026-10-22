# Skills & Technical Stack

Bu doküman, projede kullanılan temel teknolojileri, mimari yaklaşımları, kütüphaneleri ve geliştirme standartlarını özetlemektedir.

---

## 1. Core & Architecture

* **React (v18+)**
  * Modern Functional Components & Hooks mimarisi (`useState`, `useEffect`, `useCallback`, `useMemo`, `useRef`).
  * Custom Hook geliştirme pratikleri.
  * Modüler, yeniden kullanılabilir ve atomik bileşen tasarımı.
* **Modern JavaScript & TypeScript Standardı**
  * ES6+ özellikleri (Async/Await, Destructuring, Optional Chaining, Nullish Coalescing).
  * Güçlü tip güvenliği (Type Safety), Interface & Type tanımlamaları, Generic yapılar.

---

## 2. State Management & Data Fetching

### Redux Toolkit (RTK)
* **Global State Management:** Uygulama genelindeki senkron durumların `createSlice` ve merkezi `configureStore` ile yönetimi.
* **Immutable State Updates:** Immer entegrasyonu ile güvenli ve performanslı state mutasyonları.
* **Typed Hooks:** Proje genelinde tip güvenliği sağlayan özel `useAppDispatch` ve `useAppSelector` yapılandırmaları.

### RTK Query & Axios Integration
* **API Tanımlamaları:** `createApi` kullanarak servis odaklı ve modüler endpoint yönetimi.
* **Custom BaseQuery with Axios:**
  * Standart `fetchBaseQuery` yerine Axios instance'ı tabanlı özelleştirilmiş `baseQuery` mimarisi.
  * Request/Response interceptor entegrasyonu (Bearer Token yönetimi, global hata yakalama, refresh token süreçleri).
* **Caching & Invalidation:**
  * `providesTags` ve `invalidatesTags` ile otomatik önbellek geçersiz kılma (cache invalidation).
  * Optimistic Updates ve Pagination / Infinite Scroll optimizasyonları.
  * Otomatik polling, re-fetching ve background synchronisation yetenekleri.

---

## 3. Styling & UI Design

### Tailwind CSS
* **Utility-First Yaklaşımı:** Hızlı, ölçeklenebilir ve okunabilir sınıf yapısı.
* **Responsive Design:** Mobile-first prensibine uygun breakpoint (`sm`, `md`, `lg`, `xl`) yönetimi.
* **Custom Configuration (`tailwind.config.js`):**
  * Özel renk paletleri (Color Tokens), tipografi, spacing ve animasyon tanımları.
  * Dark / Light mode desteği.
* **Dynamic Class Management:**
  * Koşullu sınıf birleştirme için `clsx` veya `tailwind-merge` kullanımı.
  * Bileşen varyantları için `class-variance-authority` (cva) pratikleri.

---

## 4. Performance & Best Practices

* **Code Splitting & Lazy Loading:** `React.lazy` ve `Suspense` ile sayfa ve ağır bileşen bazlı yükleme optimizasyonu.
* **Network & Data Caching:** RTK Query cache ömrü (`keepUnusedDataFor`) ile gereksiz network isteklerinin engellenmesi.
* **Clean Code & Directory Structure:** Feature-first veya Domain-driven modüler klasör mimarisi.
* **Error Handling:** React Error Boundaries ve Axios interceptor düzeyinde merkezi hata yakalama.

---

## 5. Development & Tooling

* **Build Tool:** Vite.
* **Code Quality & Formatting:** ESLint, Prettier ve TypeScript derleme kontrolleri.
* **Version Control:** Git & GitHub iş akışları (Conventional Commits, Branching strategies).