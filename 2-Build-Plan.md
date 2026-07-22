# Build Plan
## QR-Menu Multi-langues — Belad Al Cham (Café & Restaurant)
### Avenue Mohamed V, Tétouan

---

## 0. Cadrage & arborescence du projet

```
belad-al-cham-menu/
├── index.html
├── manifest.json
├── /assets
│   ├── /images        (photos plats, logo)
│   └── /icons          (SVG monolignes : flamme, théière, feuille, croissant, assiette, verre)
├── /data
│   └── menu.json        (source de vérité — voir section 2)
├── /css
│   └── styles.css       (tokens de la charte graphique)
├── /js
│   ├── app.js            (init, chargement des données)
│   ├── i18n.js            (switch de langue, RTL)
│   └── render.js          (génération dynamique des rubriques/plats)
└── /qr
    └── qr-belad-al-cham.svg
```

**Tokens de design (extraits de la charte)**
```css
:root {
  --color-bg-light: #FBF6EE;
  --color-bg-dark: #1A1512;
  --color-text-main: #2B211B;
  --color-text-secondary: #6B5B4F;
  --color-gold: #C89B3C;
  --color-gold-hover: #B3872E;
  --color-ember: #D9622B;
  --color-burgundy: #7A2E22;
  --color-olive: #7A8450;
  --radius-card: 10px;
  --font-title: 'Marcellus', serif;
  --font-title-ar: 'Tajawal', 'Cairo', sans-serif;
  --font-subtitle: 'Cormorant Infant', italic;
  --font-body: 'Poppins', 'Nunito Sans', sans-serif;
}
```

---

## 1. Jalons de construction

### 🟤 Jalon 0 — Cadrage & préparation
1. Initialisation du repository GitHub (`belad-al-cham-menu`)
2. Création de l'arborescence ci-dessus
3. Mise en place des tokens CSS (couleurs, typographies, rayons)
4. Import des polices Google Fonts (Marcellus, Cormorant Infant, Poppins, Nunito Sans) + police arabe complémentaire (Tajawal ou Cairo)

### 🟡 Jalon 1 — Données JSON multilingues
1. Structuration intégrale du menu source en `menu.json` (voir **Section 2 — Menu complet**, aucune rubrique ni aucun plat omis : 11 catégories, 44 plats)
2. Ajout du champ `badge: "topVentes"` sur les 3 plats identifiés comme meilleures ventes (Petit Déjeuner Espagnol, Petit Déjeuner Speciale, Petit Déjeuner Beldi)
3. Validation du JSON (syntaxe, cohérence des clés `fr`/`ar`/`es` sur chaque champ)
4. Relecture linguistique native des trois langues avant intégration

### 🟢 Jalon 2 — Intégration UI/UX statique
1. Header : logo bilingue (Belad Al Cham / بلد الشام), arche décorative, baseline « Café & Restaurant » en Cormorant Italic
2. Composant carte de rubrique : bandeau doré + médaillon photo circulaire + filet fin 1px
3. Composant fiche plat : nom (Poppins SemiBold), description (Nunito Sans, 13–14px), prix aligné à droite avec ligne pointillée de liaison
4. Badge visuel « Top des ventes » (fond braise `#D9622B`, texte crème)
5. Grille responsive : 1 colonne mobile → 2 colonnes desktop/tablette
6. Intégration des icônes SVG monolignes par univers (Petit Déjeuner = croissant, Boissons = verre, etc.)

### 🔵 Jalon 3 — Switch de langue dynamique (i18n)
1. Sélecteur de langue flottant (FR / AR / ES), fixe en haut d'écran
2. Fonction `setLanguage(lang)` : relecture du `menu.json` en mémoire, mise à jour du DOM sans rechargement
3. Bascule automatique `document.documentElement.lang` et `dir` (RTL pour `ar`)
4. Persistance du choix de langue via `localStorage`
5. Détection de la langue navigateur au premier chargement (fallback FR)
6. Application dynamique de la police titre arabe (Tajawal/Cairo) lors du switch vers `ar`
7. Tests de bascule sur tous les composants (miroir de mise en page RTL, alignement des prix à gauche en arabe)

### 🟣 Jalon 4 — Navigation & interactions
1. Barre de navigation sticky par rubrique (scroll-to-anchor), avec les 11 catégories
2. Indicateur de rubrique active au scroll (`IntersectionObserver`)
3. Recherche rapide de plat (filtrage JS côté client sur les 3 langues)
4. Bouton retour en haut de page
5. Chargement progressif par rubrique (éviter le rendu de tout le menu au chargement initial, vu le volume de 44 plats)

### 🟠 Jalon 5 — Configuration GitHub Pages & déploiement
1. Configuration Settings → Pages (dossier `/docs` ou branche dédiée)
2. Vérification HTTPS automatique
3. Test de l'URL de production sur plusieurs appareils réels (iOS Safari, Android Chrome)
4. Domaine personnalisé optionnel (`menu.beladalcham.ma`) via fichier `CNAME`
5. Workflow GitHub Actions simple pour déploiement automatique à chaque `push`

### ⚪ Jalon 6 — Génération des QR codes
1. Génération du QR code pointant vers l'URL de production
2. Déclinaison graphique aux couleurs de la charte (cadre or `#C89B3C`, logo centré)
3. Option QR codes séparés par langue si affichage ciblé souhaité (ex. table réservée aux touristes espagnols)
4. Export en formats imprimables : chevalet de table, sticker vitrine, carte plastifiée
5. Test de scan en conditions réelles (luminosité de salle, distance, angle de prise)

### 🟢 Jalon 7 — Performance, PWA & finitions
1. Compression et redimensionnement des images (WebP), lazy loading
2. Audit Lighthouse (Performance / Accessibilité / SEO / Best Practices), cible 90+
3. `manifest.json` + icônes pour ajout à l'écran d'accueil mobile
4. Service worker basique pour cache offline (menu consultable sans réseau après premier chargement)
5. Favicon et meta Open Graph multilingues

### 🔴 Jalon 8 — Tests, recette & documentation
1. Tests croisés navigateurs/écrans/connexions lentes (3G simulé)
2. Vérification linguistique finale des 44 plats sur les 3 langues
3. Guide de maintenance simple : comment modifier un prix ou ajouter un plat dans `menu.json`
4. Checklist de mise en production
5. Formation courte du personnel du café sur l'usage du QR-Menu

---

## 2. Menu complet — structuré et traduit (FR / AR / ES)

> Reprise intégrale du menu source fourni, sans omission : **11 catégories, 44 plats/boissons**, chacun avec nom et description traduits en français, arabe et espagnol, prêt à être copié dans `data/menu.json`.

```json
{
  "establishment": {
    "name": { "fr": "Belad Al Cham", "ar": "بلد الشام", "es": "Belad Al Cham" },
    "tagline": { "fr": "Café & Restaurant", "ar": "مقهى ومطعم", "es": "Café & Restaurante" }
  },
  "categories": [
    {
      "id": "petit-dejeuner",
      "icon": "croissant",
      "name": { "fr": "Petit Déjeuner", "ar": "الفطور", "es": "Desayuno" },
      "items": [
        {
          "id": "pdj-speciale",
          "price": 69,
          "badge": "topVentes",
          "name": { "fr": "Petit Déjeuner Spéciale", "ar": "فطور خاص", "es": "Desayuno Especial" },
          "description": {
            "fr": "Croque spéciale, keso, pavo, coupe de fruits, boissons chaudes",
            "ar": "كروك خاص، جبنة كيسو، ديك رومي، سلطة فواكه، مشروب ساخن",
            "es": "Croque especial, queso, pavo, copa de frutas, bebida caliente"
          }
        },
        {
          "id": "pdj-fassi",
          "price": 69,
          "name": { "fr": "Petit Déjeuner Fassi", "ar": "فطور فاسي", "es": "Desayuno Fassi" },
          "description": {
            "fr": "Deux œufs avec du khlii, pain complet, huile d'olive, olives, boissons chaudes, jus nature",
            "ar": "بيضتان مع الخليع، خبز كامل، زيت الزيتون، زيتون، مشروب ساخن، عصير طبيعي",
            "es": "Dos huevos con khlii (carne conservada tradicional), pan integral, aceite de oliva, aceitunas, bebida caliente, zumo natural"
          }
        },
        {
          "id": "pdj-espagnol",
          "price": 65,
          "badge": "topVentes",
          "name": { "fr": "Petit Déjeuner Espagnol", "ar": "فطور إسباني", "es": "Desayuno Español" },
          "description": {
            "fr": "Toast grillé, tomate fraîche, keso manchego, thon, olives, huile d'olive, boisson chaude, jus naturel, natillas, tortilla",
            "ar": "توست محمص، طماطم طازجة، جبنة مانتشيغو، تونة، زيتون، زيت الزيتون، مشروب ساخن، عصير طبيعي، ناتيا، تورتيا",
            "es": "Tostada, tomate fresco, queso manchego, atún, aceitunas, aceite de oliva, bebida caliente, zumo natural, natillas, tortilla"
          }
        },
        {
          "id": "pdj-amsterdam",
          "price": 65,
          "name": { "fr": "Petit Déjeuner Amsterdam", "ar": "فطور أمستردام", "es": "Desayuno Ámsterdam" },
          "description": {
            "fr": "2 toasts, cream cheese, avocat, 2 œufs pochés, keso, boisson chaude, jus naturel",
            "ar": "قطعتا توست، جبنة كريمية، أفوكادو، بيضتان مسلوقتان، جبنة كيسو، مشروب ساخن، عصير طبيعي",
            "es": "2 tostadas, queso crema, aguacate, 2 huevos escalfados, queso, bebida caliente, zumo natural"
          }
        },
        {
          "id": "pdj-tetouani",
          "price": 55,
          "name": { "fr": "Petit Déjeuner Tétouani", "ar": "فطور تطواني", "es": "Desayuno Tetuaní" },
          "description": {
            "fr": "Deux œufs au plat, dinde fumée, keso, fromage blanc, huile d'olive et olives, boissons chaudes, jus nature",
            "ar": "بيضتان مقليتان، ديك رومي مدخن، جبنة كيسو، جبنة بيضاء، زيت الزيتون وزيتون، مشروب ساخن، عصير طبيعي",
            "es": "Dos huevos fritos, pavo ahumado, queso, queso blanco, aceite de oliva y aceitunas, bebida caliente, zumo natural"
          }
        },
        {
          "id": "pdj-beldi",
          "price": 55,
          "badge": "topVentes",
          "name": { "fr": "Petit Déjeuner Beldi", "ar": "فطور بلدي", "es": "Desayuno Beldi" },
          "description": {
            "fr": "Harcha, baghrir, msemen, jben, beurre, gâteau beldi au fromage, boissons chaudes, jus nature",
            "ar": "حرشة، بغرير، مسمن، جبن طري، زبدة، كعك بلدي بالجبن، مشروب ساخن، عصير طبيعي",
            "es": "Harcha, baghrir, msemen, queso fresco (jben), mantequilla, pastel beldi de queso, bebida caliente, zumo natural"
          }
        },
        {
          "id": "pdj-francais",
          "price": 55,
          "name": { "fr": "Petit Déjeuner Français", "ar": "فطور فرنسي", "es": "Desayuno Francés" },
          "description": {
            "fr": "Pain, viennoiseries, miel, chocolat, confiture, boissons chaudes, jus nature",
            "ar": "خبز، معجنات فرنسية، عسل، شوكولاطة، مربى، مشروب ساخن، عصير طبيعي",
            "es": "Pan, bollería, miel, chocolate, mermelada, bebida caliente, zumo natural"
          }
        },
        {
          "id": "pdj-kids",
          "price": 42,
          "name": { "fr": "Petit Déjeuner Kids", "ar": "فطور الأطفال", "es": "Desayuno Infantil" },
          "description": {
            "fr": "Corn flakes, toast fromage, petit pain, jus d'orange, boisson",
            "ar": "كورن فليكس، توست بالجبن، خبز صغير، عصير برتقال، مشروب",
            "es": "Cereales, tostada con queso, panecillo, zumo de naranja, bebida"
          }
        }
      ]
    },
    {
      "id": "croques",
      "icon": "assiette",
      "name": { "fr": "Croques", "ar": "الكروك", "es": "Croques" },
      "items": [
        {
          "id": "croque-special",
          "price": 35,
          "name": { "fr": "Croque Spécial", "ar": "كروك موسيو خاص", "es": "Croque Especial" },
          "description": {
            "fr": "Croque-monsieur spécial garni",
            "ar": "كروك موسيو خاص محشو",
            "es": "Croque-monsieur especial relleno"
          }
        },
        {
          "id": "croque-normal",
          "price": 27,
          "name": { "fr": "Croque Normal", "ar": "كروك موسيو عادي", "es": "Croque Normal" },
          "description": {
            "fr": "Croque-monsieur classique",
            "ar": "كروك موسيو كلاسيكي",
            "es": "Croque-monsieur clásico"
          }
        }
      ]
    },
    {
      "id": "crepes-sucrees",
      "icon": "crepe",
      "name": { "fr": "Crêpes Sucrées", "ar": "كريب حلو", "es": "Crepes Dulces" },
      "items": [
        {
          "id": "crepe-nutella-banane",
          "price": 55,
          "name": { "fr": "Crêpe Nutella Banane", "ar": "كريب نوتيلا وموز", "es": "Crepe Nutella y Plátano" },
          "description": {
            "fr": "Crêpe garnie de nutella et banane",
            "ar": "كريب محشو بالنوتيلا والموز",
            "es": "Crepe rellena de Nutella y plátano"
          }
        },
        {
          "id": "crepe-lotus",
          "price": 55,
          "name": { "fr": "Crêpe Lotus", "ar": "كريب لوتس", "es": "Crepe Lotus" },
          "description": {
            "fr": "Crêpe à la pâte de spéculoos lotus",
            "ar": "كريب بمعجون لوتس (سبيكولوس)",
            "es": "Crepe con crema de galleta Lotus"
          }
        },
        {
          "id": "crepe-caramel",
          "price": 49,
          "name": { "fr": "Crêpe Caramel", "ar": "كريب كراميل", "es": "Crepe de Caramelo" },
          "description": {
            "fr": "Crêpe au caramel",
            "ar": "كريب بالكراميل",
            "es": "Crepe con caramelo"
          }
        },
        {
          "id": "crepe-amlou",
          "price": 49,
          "name": { "fr": "Crêpe Amlou", "ar": "كريب أملو", "es": "Crepe de Amlou" },
          "description": {
            "fr": "Crêpe à l'amlou",
            "ar": "كريب بالأملو (زبدة اللوز والأركان والعسل)",
            "es": "Crepe con amlou (pasta de almendras, argán y miel)"
          }
        },
        {
          "id": "crepe-nutella",
          "price": 42,
          "name": { "fr": "Crêpe Nutella", "ar": "كريب نوتيلا", "es": "Crepe de Nutella" },
          "description": {
            "fr": "Crêpe garnie de nutella",
            "ar": "كريب محشو بالنوتيلا",
            "es": "Crepe rellena de Nutella"
          }
        },
        {
          "id": "crepe-miel",
          "price": 42,
          "name": { "fr": "Crêpe au Miel", "ar": "كريب بالعسل", "es": "Crepe de Miel" },
          "description": {
            "fr": "Crêpe au miel",
            "ar": "كريب بالعسل",
            "es": "Crepe con miel"
          }
        }
      ]
    },
    {
      "id": "crepes-salees",
      "icon": "crepe",
      "name": { "fr": "Crêpes Salées", "ar": "كريب مالح", "es": "Crepes Saladas" },
      "items": [
        {
          "id": "crepe-viande-hachee",
          "price": 69,
          "name": { "fr": "Crêpe Viande Hachée", "ar": "كريب باللحم المفروم", "es": "Crepe de Carne Picada" },
          "description": {
            "fr": "Crêpe salée à la viande hachée",
            "ar": "كريب مالح باللحم المفروم",
            "es": "Crepe salada con carne picada"
          }
        },
        {
          "id": "crepe-poulet-champignons",
          "price": 59,
          "name": { "fr": "Crêpe Poulet & Champignons", "ar": "كريب بالدجاج والفطر", "es": "Crepe de Pollo y Champiñones" },
          "description": {
            "fr": "Crêpe salée au poulet et champignons",
            "ar": "كريب مالح بالدجاج والفطر",
            "es": "Crepe salada con pollo y champiñones"
          }
        },
        {
          "id": "crepe-dinde-fumee",
          "price": 55,
          "name": { "fr": "Crêpe Dinde Fumée", "ar": "كريب بديك رومي مدخن", "es": "Crepe de Pavo Ahumado" },
          "description": {
            "fr": "Crêpe salée à la dinde fumée",
            "ar": "كريب مالح بديك رومي مدخن",
            "es": "Crepe salada con pavo ahumado"
          }
        },
        {
          "id": "crepe-fromage",
          "price": 49,
          "name": { "fr": "Crêpe Fromage", "ar": "كريب بالجبن", "es": "Crepe de Queso" },
          "description": {
            "fr": "Crêpe salée au fromage",
            "ar": "كريب مالح بالجبن",
            "es": "Crepe salada con queso"
          }
        }
      ]
    },
    {
      "id": "gaufres",
      "icon": "gaufre",
      "name": { "fr": "Gaufres", "ar": "الوافل", "es": "Gofres" },
      "items": [
        {
          "id": "gaufre-nutella",
          "price": 49,
          "name": { "fr": "Gaufre Nutella", "ar": "وافل نوتيلا", "es": "Gofre de Nutella" },
          "description": {
            "fr": "Gaufre au nutella",
            "ar": "وافل بالنوتيلا",
            "es": "Gofre con Nutella"
          }
        },
        {
          "id": "gaufre-caramel",
          "price": 49,
          "name": { "fr": "Gaufre Caramel", "ar": "وافل كراميل", "es": "Gofre de Caramelo" },
          "description": {
            "fr": "Gaufre au caramel",
            "ar": "وافل بالكراميل",
            "es": "Gofre con caramelo"
          }
        },
        {
          "id": "gaufre-lotus",
          "price": 49,
          "name": { "fr": "Gaufre Lotus", "ar": "وافل لوتس", "es": "Gofre Lotus" },
          "description": {
            "fr": "Gaufre à la pâte de spéculoos lotus",
            "ar": "وافل بمعجون لوتس",
            "es": "Gofre con crema de galleta Lotus"
          }
        }
      ]
    },
    {
      "id": "desserts",
      "icon": "dessert",
      "name": { "fr": "Desserts", "ar": "الحلويات", "es": "Postres" },
      "items": [
        {
          "id": "salade-fruits",
          "price": 55,
          "name": { "fr": "Salade De Fruits", "ar": "سلطة فواكه", "es": "Ensalada de Frutas" },
          "description": {
            "fr": "Salade de fruits frais",
            "ar": "سلطة فواكه طازجة",
            "es": "Ensalada de frutas frescas"
          }
        },
        {
          "id": "mhalabia",
          "price": 25,
          "name": { "fr": "Mhalabia", "ar": "محلبية", "es": "Mhalabia" },
          "description": {
            "fr": "Dessert traditionnel au lait parfumé",
            "ar": "حلوى تقليدية بالحليب المعطر",
            "es": "Postre tradicional de leche perfumada"
          }
        }
      ]
    },
    {
      "id": "tendance-dubai",
      "icon": "dessert",
      "name": { "fr": "Tendance Dubaï & Gourmandises", "ar": "موضة دبي والحلويات الفاخرة", "es": "Tendencia Dubái y Delicias" },
      "items": [
        {
          "id": "croissant-dubai",
          "price": 55,
          "name": { "fr": "Croissant Dubaï", "ar": "كرواسون دبي", "es": "Croissant Dubái" },
          "description": {
            "fr": "Croissant façon Dubaï",
            "ar": "كرواسون على الطريقة الدبية",
            "es": "Croissant estilo Dubái"
          }
        },
        {
          "id": "dubai-chocolate-coupe",
          "price": 55,
          "name": { "fr": "Coupe Chocolat Dubaï", "ar": "كأس شوكولاطة دبي", "es": "Copa de Chocolate Dubái" },
          "description": {
            "fr": "Coupe chocolat façon Dubaï",
            "ar": "كأس شوكولاطة على الطريقة الدبية",
            "es": "Copa de chocolate estilo Dubái"
          }
        }
      ]
    },
    {
      "id": "specialites-orientales",
      "icon": "flamme",
      "name": { "fr": "Spécialités Orientales", "ar": "أطباق شرقية", "es": "Especialidades Orientales" },
      "items": [
        {
          "id": "kunafa",
          "price": 29,
          "name": { "fr": "Kunafa", "ar": "كنافة", "es": "Kunafa" },
          "description": {
            "fr": "Spécialité orientale kunafa",
            "ar": "حلوى شرقية الكنافة",
            "es": "Especialidad oriental kunafa"
          }
        }
      ]
    },
    {
      "id": "milkshake",
      "icon": "verre",
      "name": { "fr": "Milkshake", "ar": "ميلك شيك", "es": "Batidos" },
      "items": [
        {
          "id": "milkshake-oreo",
          "price": 42,
          "name": { "fr": "Milkshake Oreo", "ar": "ميلك شيك أوريو", "es": "Batido de Oreo" },
          "description": {
            "fr": "Milkshake à l'oreo",
            "ar": "ميلك شيك بالأوريو",
            "es": "Batido con galletas Oreo"
          }
        },
        {
          "id": "milkshake-fraise",
          "price": 42,
          "name": { "fr": "Milkshake Fraise", "ar": "ميلك شيك فراولة", "es": "Batido de Fresa" },
          "description": {
            "fr": "Milkshake à la fraise",
            "ar": "ميلك شيك بالفراولة",
            "es": "Batido con fresa"
          }
        }
      ]
    },
    {
      "id": "jus",
      "icon": "feuille",
      "name": { "fr": "Jus", "ar": "العصائر", "es": "Zumos" },
      "items": [
        {
          "id": "jus-mangue",
          "price": 42,
          "name": { "fr": "Jus Mangue", "ar": "عصير مانجو", "es": "Zumo de Mango" },
          "description": {
            "fr": "Jus de mangue frais",
            "ar": "عصير مانجو طازج",
            "es": "Zumo de mango fresco"
          }
        },
        {
          "id": "jus-ananas",
          "price": 42,
          "name": { "fr": "Jus Ananas", "ar": "عصير أناناس", "es": "Zumo de Piña" },
          "description": {
            "fr": "Jus d'ananas frais",
            "ar": "عصير أناناس طازج",
            "es": "Zumo de piña fresco"
          }
        },
        {
          "id": "jus-avocat",
          "price": 42,
          "name": { "fr": "Jus Avocat", "ar": "عصير أفوكادو", "es": "Zumo de Aguacate" },
          "description": {
            "fr": "Jus d'avocat frais",
            "ar": "عصير أفوكادو طازج",
            "es": "Zumo de aguacate fresco"
          }
        },
        {
          "id": "jus-orange",
          "price": 30,
          "name": { "fr": "Jus Orange", "ar": "عصير برتقال", "es": "Zumo de Naranja" },
          "description": {
            "fr": "Jus d'orange frais",
            "ar": "عصير برتقال طازج",
            "es": "Zumo de naranja fresco"
          }
        }
      ]
    },
    {
      "id": "boissons",
      "icon": "verre",
      "name": { "fr": "Boissons", "ar": "المشروبات", "es": "Bebidas" },
      "items": [
        {
          "id": "coca-cola-zero-25",
          "price": 20,
          "name": { "fr": "Coca-Cola Zero - 25cl", "ar": "كوكا كولا زيرو - 25 سل", "es": "Coca-Cola Zero - 25cl" },
          "description": { "fr": "Boisson gazeuse", "ar": "مشروب غازي", "es": "Refresco con gas" }
        },
        {
          "id": "coca-cola-25",
          "price": 20,
          "name": { "fr": "Coca-Cola - 25cl", "ar": "كوكا كولا - 25 سل", "es": "Coca-Cola - 25cl" },
          "description": { "fr": "Boisson gazeuse", "ar": "مشروب غازي", "es": "Refresco con gas" }
        },
        {
          "id": "sidi-ali-50",
          "price": 20,
          "name": { "fr": "Sidi Ali 50cl", "ar": "سيدي علي 50 سل", "es": "Sidi Ali 50cl" },
          "description": { "fr": "Eau minérale", "ar": "مياه معدنية", "es": "Agua mineral" }
        },
        {
          "id": "sprite-25",
          "price": 20,
          "name": { "fr": "Sprite Classique - 25cl", "ar": "سبرايت كلاسيك - 25 سل", "es": "Sprite Clásico - 25cl" },
          "description": { "fr": "Boisson gazeuse", "ar": "مشروب غازي", "es": "Refresco con gas" }
        },
        {
          "id": "fanta-citron-25",
          "price": 20,
          "name": { "fr": "Fanta Citron - 25cl", "ar": "فانتا ليمون - 25 سل", "es": "Fanta Limón - 25cl" },
          "description": { "fr": "Boisson gazeuse", "ar": "مشروب غازي", "es": "Refresco con gas" }
        },
        {
          "id": "fanta-orange-25",
          "price": 20,
          "name": { "fr": "Fanta Orange - 25cl", "ar": "فانتا برتقال - 25 سل", "es": "Fanta Naranja - 25cl" },
          "description": { "fr": "Boisson gazeuse", "ar": "مشروب غازي", "es": "Refresco con gas" }
        },
        {
          "id": "poms-pomme-25",
          "price": 20,
          "name": { "fr": "Pom's Pomme - 25cl", "ar": "بومز تفاح - 25 سل", "es": "Pom's Manzana - 25cl" },
          "description": { "fr": "Boisson gazeuse", "ar": "مشروب غازي", "es": "Refresco con gas" }
        },
        {
          "id": "hawai-tropical-25",
          "price": 20,
          "name": { "fr": "Hawaï Tropical - 25cl", "ar": "هاواي تروبيكال - 25 سل", "es": "Hawái Tropical - 25cl" },
          "description": { "fr": "Boisson gazeuse", "ar": "مشروب غازي", "es": "Refresco con gas" }
        },
        {
          "id": "rostoy",
          "price": 18,
          "name": { "fr": "Rostoy", "ar": "روستوي", "es": "Rostoy" },
          "description": { "fr": "Boisson Rostoy", "ar": "مشروب روستوي", "es": "Bebida Rostoy" }
        },
        {
          "id": "oulmes",
          "price": 15,
          "name": { "fr": "Oulmès", "ar": "أولماس", "es": "Oulmès" },
          "description": { "fr": "Eau minérale gazeuse", "ar": "مياه معدنية غازية", "es": "Agua mineral con gas" }
        }
      ]
    }
  ]
}
```

---

## 3. Vérification d'exhaustivité du menu

| Catégorie | Nb de plats/boissons | Statut |
|---|---|---|
| Petit Déjeuner | 8 | ✅ Complet |
| Croques | 2 | ✅ Complet |
| Crêpes Sucrées | 6 | ✅ Complet |
| Crêpes Salées | 4 | ✅ Complet |
| Gaufres | 3 | ✅ Complet |
| Desserts | 2 | ✅ Complet |
| Tendance Dubaï & Gourmandises | 2 | ✅ Complet |
| Spécialités Orientales | 1 | ✅ Complet |
| Milkshake | 2 | ✅ Complet |
| Jus | 4 | ✅ Complet |
| Boissons | 10 | ✅ Complet |
| **Total** | **44 articles / 11 catégories** | ✅ **Rien omis** |

*Les 3 plats « Top des ventes » du menu source (Petit Déjeuner Espagnol, Petit Déjeuner Spéciale, Petit Déjeuner Beldi) sont conservés via le champ `"badge": "topVentes"` plutôt que dupliqués en catégorie séparée, pour éviter la redondance de données tout en permettant leur mise en avant visuelle (ex. bandeau "Top des ventes" en haut de page).*

---

## 4. Récapitulatif visuel du planning

| Jalon | Nom | Livrable clé |
|---|---|---|
| 0 | Cadrage & préparation | Repo structuré, tokens de design |
| 1 | Données JSON multilingues | `menu.json` complet (44 articles × 3 langues) |
| 2 | Intégration UI/UX | Design system statique fonctionnel |
| 3 | Switch de langue | i18n dynamique FR/AR/ES + RTL |
| 4 | Navigation & interactions | Parcours utilisateur fluide, recherche |
| 5 | Déploiement GitHub Pages | URL de production stable |
| 6 | QR codes | Supports imprimables prêts |
| 7 | Performance & PWA | Score Lighthouse 90+, mode offline |
| 8 | Tests & documentation | Recette validée + guide de maintenance |

---

*Document de planification d'exécution — voir le fichier séparé "Skills Specification" pour la liste complète des compétences requises.*
