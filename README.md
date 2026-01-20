# 🎬 FilmProject
Moderná webová aplikácia na sledovanie a objavovanie vašich obľúbených seriálov a filmov.

## ✨ Funkcie
* **Prehliadať seriály** - Preskúmajte trendy a populárne TV seriály
* **Vyhľadávanie** - Rýchlo nájdite svoje obľúbené seriály
* **Tmavý režim** - Prepínajte medzi svetlou a tmavou témou
* **Responzívny dizajn** - Funguje perfektne na počítači aj mobile
* **Autentifikácia používateľov** - Bezpečné prihlásenie cez Supabase
* **Systém spätnej väzby** - Zdieľajte vaše myšlienky a návrhy

## 🛠️ Technológie
* **Vue 3** - Progresívny JavaScript framework
* **TypeScript** - Typovo bezpečný vývoj
* **Vite** - Rýchly build nástroj
* **Tailwind CSS** - Utility-first CSS framework
* **Vuetify** - Knižnica Material Design komponentov
* **DaisyUI** - Knižnica Tailwind CSS komponentov
* **Vue Router** - Client-side routing
* **Pinia** - Správa stavu
* **VueUse** - Kolekcia Vue composition utilities
* **Supabase** - Backend a autentifikácia
* **TMDB API** - Dáta o filmoch a TV seriáloch

## 🚀 Začíname

### Požiadavky
* Node.js (v16 alebo vyššia)
* npm alebo yarn

### Inštalácia
```bash
# Naklonujte repozitár
git clone https://github.com/yourusername/filmproject.git

# Prejdite do adresára projektu
cd filmproject

# Nainštalujte závislosti
npm install

# Nastavte premenné prostredia
# Vytvorte súbor .env a pridajte vaše TMDB a Supabase prihlasovacie údaje
VITE_TMDB_API_KEY=vasa_tmdb_api_key
VITE_SUPABASE_URL=vasa_supabase_url
VITE_SUPABASE_ANON_KEY=vas_supabase_kluc

# Spustite vývojový server
npm run dev
```

## 📁 Štruktúra projektu
```
src/
├── components/     # Znovupoužiteľné Vue komponenty
├── stores/        # Pinia stores
├── views/         # Komponenty stránok
├── router/        # Konfigurácia Vue Router
└── assets/        # Statické súbory
```

## 🎨 Hlavné komponenty
* **Hero sekcia** - Pútavá úvodná stránka s animáciami
* **Kategórie prehliadania** - Zoznamy trendových a populárnych seriálov
* **Filmové karty** - Interaktívne karty s hover tooltipmi
* **Formulár spätnej väzby** - Zber spätnej väzby od používateľov
* **Navigácia** - Responzívna navigačná lišta s prepínačom tmavého režimu

## 🌙 Tmavý režim
Prepínajte medzi svetlou a tmavou témou pomocou prepínača v navigačnej lište. Preferencia témy je uložená v localStorage.

## 📝 Licencia
Tento projekt je vytvorený na vzdelávacie účely (predmet Frontendové Technológie).

## 👨‍💻 Autor
Ivan Timoshkin

Vytvorené s ❤️ pomocou Vue 3 a Tailwind CSS