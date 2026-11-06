# Aluna · Splash

Pantalla de selección de proyecto de `aluna.gt`. Enlaza a Aluna Residencial y a Senderos de Aluna.

Reemplaza a la página "Inicio" de WordPress (Elementor), que queda como respaldo (ver *Reversión*).

## Dónde vive

| URL | Qué sirve |
|---|---|
| `aluna.gt` | Este splash, vía regla en el `.htaccess` raíz de SiteGround (la URL no cambia) |
| `aluna.gt/splash/` | Redirige con 301 a `aluna.gt` |
| `aluna-splash-screen.vercel.app` | Redirige con 308 a `www.aluna.gt` (`vercel.json`) |
| Previews por rama de Vercel | Funcionan normal, para revisar cambios |

Los archivos están en `public_html/splash/` de SiteGround. WordPress no se toca.

## Stack

- React, TypeScript, Vite con React Compiler (Babel).
- Tailwind CSS 4 (`@tailwindcss/vite`).
- Gestor de paquetes: **pnpm 10** (no usar npm).

## Desarrollo local

```bash
pnpm install
pnpm dev
```

## Base configurable

`vite.config.ts`: `base: process.env.VITE_BASE ?? "/"`.

- Vercel compila con `/`; SiteGround con `/splash/`.
- Importar imágenes desde `src/assets` (Vite les aplica la base).
- Los enlaces a los proyectos van con ruta desde la raíz: `/alunaresidencial/` y `/senderosdealuna/`.

## Despliegue

Cada push a `main` dispara dos destinos:

| Destino | Cómo | Base | Uso |
|---|---|---|---|
| Vercel | Integración GitHub → Vercel | `/` | Previews por rama |
| SiteGround | GitHub Actions (`deploy-siteground.yml`) | `/splash/` | Sitio público |

### Workflow `deploy-siteground.yml`

1. Instala con pnpm 10 y Node 22.
2. Compila con `VITE_BASE=/splash/`.
3. Genera `.htaccess`: HTML sin caché y `assets/` con caché de un año.
4. Verifica que el build exista y que los assets apunten a `/splash/assets/`.
5. Sube `dist/` con `rsync --delete` a `www/aluna.gt/public_html/splash/`.
6. Purga la caché de SiteGround con `wp sg purge` (si falla, solo deja un aviso).

El `rsync --delete` solo actúa dentro de `splash/`. No crear archivos a mano en esa carpeta: se borran en cada deploy.

Secrets en *Settings → Secrets and variables → Actions*:

- `SG_SSH_KEY`: llave privada ed25519 sin contraseña, exclusiva de este repo. Su pública está en SiteGround (*Devs → SSH Keys Manager*) como `github-actions-splash`.
- `SG_HOST`, `SG_USER`, `SG_PORT`: datos de *SSH Credentials* en SiteGround.

Flujo recomendado: trabajar en una rama, revisar el preview de Vercel, hacer merge a `main` y revisar la pestaña *Actions*.

## Regla en el `.htaccess` raíz

En `public_html/.htaccess`, **antes** de `# BEGIN WordPress` (fuera de sus marcas, para que WordPress no la sobrescriba):

```apache
# BEGIN Splash
<IfModule mod_rewrite.c>
RewriteEngine On
RewriteRule ^$ /splash/index.html [L]
RewriteCond %{THE_REQUEST} \s/splash/(index\.html)?[\s?]
RewriteRule ^splash/(index\.html)?$ / [R=301,L]
</IfModule>
# END Splash
```

- La primera regla sirve el splash en la raíz sin cambiar la URL (conserva parámetros UTM).
- La segunda manda a `/` a quien entre directo a `/splash/`.

Hay un respaldo del archivo original en `public_html/.htaccess.bak-splash`.

## Reversión

Borrar el bloque `# BEGIN Splash … # END Splash` del `.htaccess` raíz y purgar la caché. La página "Inicio" de WordPress vuelve a mostrarse al instante.

No cambiar *Ajustes → Lectura* de WordPress mientras la página "Inicio" sea el respaldo.

## Redirección de Vercel

`vercel.json` redirige solo el dominio de producción (condición `has` por host), así que las previews siguen funcionando.

- Usar `"source": "/(.*)"`. Con `/:path*` la raíz no se redirige.
- No configurar la redirección desde *Settings → Domains*: obliga a mover `www.aluna.gt` desde el proyecto del one-pager y rompe su redirección.
- Si tras un deploy la raíz sigue respondiendo lo anterior, purgar en *Settings → Caches → CDN, ISR, and Image Cache*.

## Analítica

Eventos enviados a GA4:

- `aluna_splash:click:aluna_residencial`
- `aluna_splash:click:senderos_de_aluna`
- `aluna_splash:click:instagram`
- `aluna_splash:click:facebook`
- `aluna_splash:click:whatsapp`

## Verificación rápida

```bash
for u in "" splash/ alunaresidencial/ senderosdealuna/; do echo -n "/$u → "; curl -s -o /dev/null -w "%{http_code} %{redirect_url}\n" "https://aluna.gt/$u"; done
curl -s -o /dev/null -w "%{http_code} %{redirect_url}\n" https://aluna-splash-screen.vercel.app/
```

Esperado: `/` 200, `/splash/` 301 a `/`, proyectos 200, Vercel 308 a `www.aluna.gt`. (`/wp-admin/` responde 403 a `curl` por la protección de SiteGround; en el navegador funciona.)

## Pendiente

- Pasar a borrador o eliminar la página "Inicio" de WordPress tras unas semanas sin problemas.
- `typescript-eslint` aún no declara compatibilidad con TypeScript 7 (aviso de peer dependencies; solo afecta al linter).
