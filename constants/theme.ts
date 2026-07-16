export const Colors = {
  surface: '#fbf9f8',
  surfaceDim: '#dbd9d9',
  surfaceLow: '#f5f3f3',
  surfaceContainer: '#efeded',
  surfaceHigh: '#eae8e7',
  surfaceHighest: '#e4e2e2',
  onSurface: '#1b1c1c',
  onSurfaceVariant: '#44474d',
  outline: '#75777e',
  outlineVariant: '#c5c6cd',
  primary: '#000000',
  onPrimary: '#ffffff',
  secondary: '#735c00',
  onSecondary: '#ffffff',
  secondaryContainer: '#fed65b',
  onSecondaryContainer: '#745c00',
  primaryContainer: '#0d1c32',
  onPrimaryContainer: '#76849f',
  error: '#ba1a1a',
  onError: '#ffffff',
  errorContainer: '#ffdad6',
  onErrorContainer: '#93000a',
};

export const Typography = {
  displayLg: {
    fontSize: 32,
    lineHeight: 40,
    letterSpacing: -0.02,
    fontWeight: '700' as const,
  },
  headlineLg: {
    fontSize: 28,
    lineHeight: 36,
    fontWeight: '700' as const,
  },
  titleMd: {
    fontSize: 18,
    lineHeight: 24,
    letterSpacing: 0.01,
    fontWeight: '600' as const,
  },
  bodyLg: {
    fontSize: 16,
    lineHeight: 26,
  },
  bodySm: {
    fontSize: 14,
    lineHeight: 20,
  },
  labelCaps: {
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 0.1,
    fontWeight: '700' as const,
  },
};

export const Spacing = {
  containerMargin: 20,
  stackGapSm: 8,
  stackGapMd: 16,
  stackGapLg: 32,
  sectionPadding: 48,
};

export const Radius = {
  sm: 4,
  DEFAULT: 8,
  lg: 12,
  xl: 16,
  '2xl': 24,
  full: 9999,
};
