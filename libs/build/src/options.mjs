export const baseOptions = {
  plugins: [],
  bundle: true,
  splitting: false,
  format: 'esm',
  platform: 'node',
  target: 'esnext',
  treeShaking: true,
  outExtension: { '.js': '.mjs' },
  tsconfig: 'tsconfig.json',
}
