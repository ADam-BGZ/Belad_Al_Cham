# Skills Specification
## QR-Menu Multi-langues — Belad Al Cham (Café & Restaurant)
### Avenue Mohamed V, Tétouan

---

## 0. Résumé du projet

Application web statique de menu digital consultable via QR code, en trois langues (Français, Arabe, Espagnol), destinée à une clientèle locale, MRE et touristique (notamment espagnole). Hébergement 100% statique sur GitHub Pages, design conforme à la charte graphique Belad Al Cham (crème, noir charbon, or laiton, braise).

---

## 1. Compétences techniques — Frontend

| Compétence | Détail d'application |
|---|---|
| **HTML5 sémantique** | Landmarks (`header`, `nav`, `main`, `section`, `footer`), attribut `lang` et `dir` dynamiques, structure accessible aux lecteurs d'écran |
| **CSS3 avancé / Tailwind CSS** | Design system basé sur variables couleurs/typo de la charte, utility-first pour rapidité de développement, purge CSS pour poids minimal |
| **JavaScript vanilla (ES6+)** | Modules ES, `fetch()` pour charger `menu.json`, gestion d'état simple (objet JS ou `localStorage`), pas de dépendance framework lourde |
| **Responsive & Mobile-first** | Conception à partir de 360px de large, breakpoints progressifs (tablette 768px, desktop 1024px+), zones tactiles ≥ 44px |
| **Gestion du RTL (Right-to-Left)** | Bascule complète `dir="rtl"` pour l'arabe : miroir de grille, alignement des prix, sens des chevrons/flèches, marges logiques (`margin-inline` plutôt que `margin-left/right`) |
| **Typographie web optimisée** | Chargement Google Fonts avec `font-display: swap`, sous-ensembles de caractères (latin + arabe), police complémentaire arabe (Tajawal/Cairo) en plus de Marcellus/Cormorant/Poppins/Nunito Sans |
| **Accessibilité (a11y)** | Contraste AA (4.5:1 minimum), `aria-label` sur boutons/icônes, navigation clavier complète, tailles de texte lisibles en extérieur/plein soleil |

---

## 2. Compétences données & contenu

| Compétence | Détail d'application |
|---|---|
| **Modélisation JSON multilingue** | Structure `{ fr: "...", ar: "...", es: "..." }` pour chaque champ texte (nom, description, catégorie) |
| **Extraction et nettoyage de données** | Normalisation du menu source brut (rubriques, doublons de titres, prix en MAD, descriptions) en entités structurées propres |
| **Traduction & adaptation culinaire** | Traduction FR → AR → ES avec vigilance sur les termes locaux à conserver en translittération (khlii, harcha, baghrir, msemen, jben, amlou, kunafa) accompagnés d'une description claire pour le public non-initié |
| **Gestion des devises** | Affichage cohérent du MAD (« Dh » ou « MAD » selon convention), formatage des décimales identique dans les 3 langues |
| **Gestion des badges/mise en avant** | Modélisation d'un champ `badge` (ex. « Top des ventes ») réutilisable dans le rendu UI |

---

## 3. Compétences UX/UI

| Compétence | Détail d'application |
|---|---|
| **Design system basé charte graphique** | Palette (`#FBF6EE`, `#1A1512`, `#C89B3C`, `#D9622B`, `#7A2E22`, `#7A8450`), typographie hiérarchisée, rayons d'angle 8–12px |
| **Architecture de l'information** | Hiérarchie Rubrique → Sous-catégorie → Plat, navigation par onglets/ancres sticky en haut d'écran |
| **Micro-interactions** | Transition douce lors du switch de langue (fade), retour visuel sur sélection de rubrique active |
| **Iconographie SVG monoligne** | Pictogrammes dédiés par univers (flamme, théière, feuille, croissant, assiette fumante, verre), traits 1.5–2px, couleur or/brun taupe |
| **Formes signature** | Arches en plein cintre, médaillons circulaires pour les photos de rubrique, filets fins dorés (1px) |
| **Gestion des photos produit** | Lazy loading, formats WebP, cadre doré plutôt que filtre appliqué sur l'image (cohérent avec la charte) |

---

## 4. Compétences techniques — Outillage & déploiement

| Compétence | Détail d'application |
|---|---|
| **Git & GitHub** | Repository structuré, historique de commits clair, branches de travail si besoin |
| **GitHub Pages** | Configuration du déploiement statique (dossier `/docs` ou branche dédiée), HTTPS automatique |
| **Génération de QR codes** | Création de QR code(s) pointant vers l'URL de production, avec option de paramètre de langue (`?lang=es`) |
| **PWA légère (optionnel)** | `manifest.json`, icônes, service worker basique pour consultation hors-ligne après premier chargement |
| **SEO local & partage social** | Balises meta, Open Graph, favicon, titres multilingues pour un aperçu de partage soigné |
| **Performance web** | Minification CSS/JS, compression d'images, objectif Lighthouse 90+ sur les 4 axes |
| **GitHub Actions (optionnel)** | Workflow simple de build/déploiement automatique à chaque `push` sur la branche principale |

---

## 5. Compétences produit & gestion de projet

| Compétence | Détail d'application |
|---|---|
| **Découpage en jalons/sprints** | Séquençage logique du travail en livrables testables indépendamment (voir Build Plan) |
| **Tests utilisateurs réels** | Validation sur téléphones d'entrée/moyenne gamme, conditions réelles de salle (luminosité, réseau) |
| **Documentation de maintenance** | Guide simple pour que le personnel du café modifie prix/plats via `menu.json` sans compétence technique |
| **Relecture linguistique native** | Vérification finale des trois langues par un locuteur natif (ou revue rigoureuse) avant mise en production |

---

## 6. Synthèse des compétences par catégorie

| Catégorie | Nombre de compétences clés |
|---|---|
| Frontend | 7 |
| Données & contenu | 5 |
| UX/UI | 6 |
| Outillage & déploiement | 7 |
| Produit & gestion de projet | 4 |
| **Total** | **29 compétences identifiées** |

---

*Document de spécification des compétences — voir le fichier séparé "Build Plan" pour le plan d'exécution détaillé et les données complètes du menu.*
