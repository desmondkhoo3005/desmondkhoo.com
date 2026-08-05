import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://desmondkhoo.com',
  output: 'static',
  build: {
    format: 'directory'
  }
});
