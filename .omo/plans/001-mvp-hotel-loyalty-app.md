# MVP: Программа лояльности для сети мини-отелей

## Цель
Красивое рабочее демо приложения лояльности для сети из трёх мини-отелей. Показать заказчику за 1 день.

## Стек
- Expo SDK 57
- React Native 0.86
- TypeScript 6.0
- Expo Router (файловая навигация)
- NativeWind v4 (Tailwind CSS для RN)
- expo-font + Playfair Display + Inter (шрифты из дизайн-системы)

## Экраны (согласно требованиям)
1. **Login** — ввод имени → персонализированное приветствие
2. **Home** (tab) — лента акций и предложений
3. **Bonuses** (tab) — программа лояльности: карта, баллы, прогресс
4. **Events** (tab) — мероприятия с фильтрами по категориям
5. **Profile** (tab) — профиль гостя, настройки

## Архитектура
```
hotel-app/
├── app/
│   ├── _layout.tsx          # Root layout (Stack: login → tabs)
│   ├── index.tsx            # Login Screen
│   └── (tabs)/
│       ├── _layout.tsx      # Bottom Tab Navigator
│       ├── home.tsx         # Home — акции
│       ├── bonuses.tsx      # Bonuses — лояльность
│       ├── events.tsx       # Events — мероприятия
│       └── profile.tsx      # Profile — профиль
├── app.json                 # + expo-router plugin
├── package.json             # + expo-router, nativewind, etc.
├── tailwind.config.js       # Кастомные цвета/шрифты под дизайн
├── babel.config.js          # NativeWind plugin
├── metro.config.js          # (если нужен)
├── constants/
│   └── theme.ts             # Цвета, типографика, отступы
├── data/
│   ├── user.ts              # Данные гостя
│   ├── promotions.ts        # Акции/предложения
│   ├── events.ts            # Мероприятия
│   └── loyalty.ts           # История баллов
├── components/
│   ├── PromotionCard.tsx    # Карточка акции
│   ├── EventCard.tsx        # Карточка мероприятия
│   ├── LoyaltyCard.tsx      # Карта лояльности
│   └── CategoryChip.tsx     # Чип категории
```

## Дизайн-система (из DESIGN.md)
```ts
// colors
surface: '#fbf9f8',
primary: '#000000', 
secondary: '#735c00',
secondaryContainer: '#fed65b',
primaryContainer: '#0d1c32',
onPrimaryContainer: '#76849f',
onSurface: '#1b1c1c',
onSurfaceVariant: '#44474d',
outline: '#75777e',
outlineVariant: '#c5c6cd',

// typography (NativeWind)
// Playfair Display для заголовков (font-display)
// Inter для текста (font-sans)

// spacing (8px base)
containerMargin: 20,
stackGapSm: 8,
stackGapMd: 16,
stackGapLg: 32,
sectionPadding: 48,

// radius
DEFAULT: 8,
lg: 12,
xl: 16,
'2xl': 24,
full: 9999,
```

## Задачи

### Фаза 0: Установка зависимостей (2 задачи по 15 мин)

**Задача 0.1: Установка и настройка Expo Router**
- [x] Выполнить: `npx expo install expo-router react-native-safe-area-context react-native-screens expo-linking expo-constants`
- [x] Обновить `package.json` — `"main": "expo-router/entry"`
- [x] Обновить `app.json` — добавить `"plugins": ["expo-router"]`, `"scheme": "lumina"`
- [x] Создать `app/_layout.tsx` — корневой Stack: login + tabs + AuthContext
- [x] Создать `app/index.tsx` — логин с полем ввода имени
- [x] Создать `app/(tabs)/_layout.tsx` — Bottom Tabs (4 таба)
- [x] Создать заглушки для 4 табов

**Задача 0.2: Установка и настройка NativeWind**
- [x] Выполнить: `npx expo install nativewind tailwindcss`
- [x] Создать `tailwind.config.js` с кастомными цветами из дизайн-системы
- [x] Создать `babel.config.js` с `nativewind/babel`
- [x] Создать `global.css` c `@tailwind` директивами
- [x] Импортировать `global.css` в `app/_layout.tsx`

### Фаза 1: Дизайн-система (1 задача, 20 мин)

**Задача 1.1: Токены дизайна + шрифты**
- [x] Установить: `npx expo install expo-font @expo-google-fonts/inter @expo-google-fonts/playfair-display`
- [x] Создать `constants/theme.ts` с полной цветовой палитрой, типографикой, отступами, радиусами
- [x] Подгрузить шрифты в `app/_layout.tsx` через `useFonts` + `SplashScreen`

### Фаза 2: Данные (1 задача, 15 мин)

**Задача 2.1: Мок-данные**
- [x] Данные встроены в экраны (home.tsx — PROMOTIONS, bonuses.tsx — LOYALTY_HISTORY, events.tsx — EVENTS, profile.tsx — настройки)
- [ ] (опционально) Вынести типы и данные в отдельные файлы `data/`

### Фаза 3: Экраны (7 задач по 15-25 мин)

**Задача 3.1: Login Screen (20 мин)**
- [x] `app/index.tsx` — минималистичный вход с полем имени
- [x] Кнопка "Войти" → сохраняет имя через AuthContext → редирект на tabs
- [x] Glass-карта с брендом LUMINA

**Задача 3.2: Tab Navigator (15 мин)**
- [x] `app/(tabs)/_layout.tsx` — 4 Bottom Tabs (Home/Bonuses/Events/Profile)
- [x] Иконки через @expo/vector-icons (Ionicons)
- [x] Стиль: glass-фон, активный таб — чёрный, неактивный — outline

**Задача 3.3: Home Screen — акции (25 мин)**
- [x] `app/(tabs)/home.tsx` — приветствие + лента акций
- [x] Карточки: изображение, badge, заголовок, описание, дата
- [x] Pull-to-refresh

**Задача 3.4: Bonuses Screen (25 мин)**
- [x] `app/(tabs)/bonuses.tsx` — карта лояльности (dark navy gradient)
- [x] Баланс баллов 12 450 PTS
- [x] Прогресс-бар до следующего уровня (Gold → Platinum)
- [x] История операций

**Задача 3.5: Events Screen (25 мин)**
- [x] `app/(tabs)/events.tsx` — заголовок "Особые события"
- [x] Чипсы-фильтры: Все | Гастрономия | Wellness | Музыка
- [x] Карточки ивентов: фото, категория, описание, цена, кнопка

**Задача 3.6: Profile Screen (20 мин)**
- [x] `app/(tabs)/profile.tsx` — аватар (initials), имя, статус Gold Member
- [x] Настройки уведомлений (Switch toggles)
- [x] Кнопка "Выйти" с подтверждением → возврат на Login

### Фаза 4: Полировка (2 задачи по 15-20 мин)

**Задача 4.1: Glassmorphism + тени**
- [ ] Header с backdrop-blur (iOS-style)
- [ ] Ambient shadows (тень цвета navy с opacity 5-10%)
- [ ] Правильные скругления (2xl = 24px для карточек)
- [ ] Отступы 20px по бокам, 48px между секциями

**Задача 4.2: Финальный прогон**
- [ ] Проверить навигацию между всеми экранами
- [ ] Проверить типографику и цвета
- [ ] `npx expo start` — сборка без ошибок
- [ ] Исправить баги

## Зависимости (все оправданы)
| Пакет | Зачем |
|---|---|
| expo-router | Файловая навигация — 0 строк boilerplate |
| react-native-screens | Нужен для expo-router (native стеки) |
| react-native-safe-area-context | Нужен для expo-router (safe area insets) |
| expo-linking | Deep linking для expo-router |
| expo-constants | Доступ к конфигу приложения |
| nativewind + tailwindcss | Utility-first стилизация — повторяем дизайн из HTML/Tailwind |
| expo-font | Загрузка кастомных шрифтов |
| @expo-google-fonts/* | Playfair Display + Inter — основа дизайн-системы |
