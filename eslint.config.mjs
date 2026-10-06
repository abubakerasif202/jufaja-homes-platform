import coreWebVitals from 'eslint-config-next/core-web-vitals';

const eslintConfig = [
  ...coreWebVitals,
  {
    ignores: ['.next/**', 'node_modules/**', 'out/**', 'build/**', 'next-env.d.ts'],
  },
];

export default eslintConfig;
