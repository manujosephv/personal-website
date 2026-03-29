# Manu Joseph — Personal Knowledge Base

> Last updated: March 2026
> Purpose: Comprehensive reference for personal website, bio, media, and content creation

---

## Table of Contents

1. [Identity & Quick Facts](#1-identity--quick-facts)
2. [Professional Career](#2-professional-career)
3. [Technical Expertise](#3-technical-expertise)
4. [Open-Source Projects](#4-open-source-projects)
5. [Research Papers](#5-research-papers)
6. [Technical Books](#6-technical-books)
7. [Fiction — The Artist](#7-fiction--the-artist)
8. [Children's Podcast — Little Pajama Tales](#8-childrens-podcast--little-pajama-tales)
9. [Blog & Content Creation](#9-blog--content-creation)
10. [Speaking & Conferences](#10-speaking--conferences)
11. [Awards & Recognition](#11-awards--recognition)
12. [Online Presence & Links](#12-online-presence--links)
13. [Photography & Visual Assets](#13-photography--visual-assets)
14. [Bio Versions](#14-bio-versions)

---

## 1. Identity & Quick Facts

| Field | Value |
|---|---|
| Full Name | Manu Joseph |
| Pen Name (Fiction) | Manu J |
| Email | manujosephv@gmail.com |
| Location | Bangalore, India |
| Origin | Trivandrum, Kerala, India |
| Current Role | Staff Data Scientist — Walmart Global Tech India |
| Personal Identity | Father · Husband · Data Scientist · Fiction Author · Podcast Creator |
| Personal Site | manu-joseph.com |

**The Three Creative Lanes:**
- **The Builder** — Data scientist, ML researcher, open-source framework creator
- **The Storyteller** — Psychological thriller novelist (The Artist)
- **The Dreamer** — Children's podcast creator (Little Pajama Tales, concluded)

---

## 2. Professional Career

### Current Role
**Staff Data Scientist — Walmart Global Tech India**
Working on large-scale ML systems powering one of the world's largest retail operations.

### Career History

| Role | Organisation | Focus |
|---|---|---|
| Staff Data Scientist | Walmart Global Tech India | Large-scale ML, Retail AI |
| Head of Applied Research | Thoucentric | Deep Learning Practice, Applied Research |
| Lead — Deep Learning Practice | Thoucentric | Demand Forecasting, DL for Tabular Data |
| ML / Analytics Consulting | Various | Fortune 500 Digital & AI Transformations |

**Total experience:** 15+ years across analytics, software engineering, machine learning, and supply chain consulting.

**Industries served:** Retail, Supply Chain, Manufacturing, Finance

---

## 3. Technical Expertise

### Core Domains
- **Time Series Forecasting** — Classical (ARIMA, ETS) through Modern DL (LSTMs, Transformers, N-BEATS)
- **Deep Learning for Tabular Data** — Custom architectures, benchmarking, PyTorch-based frameworks
- **Natural Language Processing** — Language modelling, semantic parsing, NL-to-SQL
- **Probabilistic Modelling & Uncertainty Estimation**
- **Interpretable / Explainable AI (XAI)**
- **Demand Forecasting & Supply Chain Analytics**
- **Domain Adaptation & Transfer Learning**

### Tech Stack
- **Deep Learning:** PyTorch, PyTorch Lightning, TensorFlow/Keras
- **ML Libraries:** scikit-learn, XGBoost, LightGBM, GluonTS
- **Languages:** Python (expert), JavaScript
- **Data:** Pandas, NumPy, SQL
- **NLP:** NLTK, Hugging Face Transformers
- **Other:** Docker, GitHub Actions, cloud ML platforms

---

## 4. Open-Source Projects

### PyTorch Tabular ⭐ Flagship

**GitHub:** https://github.com/manujosephv/pytorch_tabular
**PyPI:** `pip install pytorch-tabular`
**ArXiv:** 2104.13638

A unified framework making deep learning on tabular data as easy as calling scikit-learn. Built on PyTorch and PyTorch Lightning; works natively with pandas DataFrames.

**SOTA models included:** NODE, TabNet, FT-Transformer, GANDALF, GATE, and more — all behind one consistent API.

**Stats:**
- 2,000+ GitHub stars
- 2,000+ monthly PyPI downloads
- Cited by researchers and practitioners worldwide
- Featured by Analytics India Magazine

---

### GANDALF — Gated Adaptive Network for Deep Automated Learning of Features

**ArXiv:** 2207.08548 (July 2022)

Novel high-performance, interpretable, and parameter-efficient architecture for tabular data.
Introduces the **Gated Feature Learning Unit (GFLU)** — borrows gating from GRU, adapted for non-temporal data.
Outperforms / matches XGBoost, SAINT, and FT-Transformers on standard benchmarks.

---

### GATE — Gated Additive Tree Ensemble

Gated Additive Tree Ensemble for tabular classification and regression.
Combines tree-based inductive bias with deep learning flexibility.
Included in the PyTorch Tabular framework.

---

### DeepRenewalProcess

**GitHub:** https://github.com/manujosephv/deeprenewalprocess
**PyPI:** `pip install deeprenewal`
**ArXiv:** 1911.10416

GluonTS implementation of Intermittent Demand Forecasting with Deep Renewal Processes.
Addresses sparse/intermittent demand — a core challenge in retail and supply chain.

---

### COVID-XRay-ImageNet

COVID-19 X-ray identification using ImageNet pretraining on the COVIDx dataset (16,756 chest radiography images).

---

### NLTK Contributions

Enhanced the Language Model section of the NLTK library:
- Fixed Witten-Bell Smoothing implementation
- Fixed Kneser-Ney Smoothing implementation
- Added StupidBackoff language model
- Added Absolute Discounting language model
- Collaborated with Ilia Kurenkov

**Total GitHub repositories:** 39+

---

## 5. Research Papers

All published on ArXiv.

| Year | Title | ArXiv ID |
|---|---|---|
| 2021 | PyTorch Tabular: A Framework for Deep Learning with Tabular Data | [2104.13638](https://arxiv.org/abs/2104.13638) |
| 2022 | GANDALF: Gated Adaptive Network for Deep Automated Learning of Features | [2207.08548](https://arxiv.org/abs/2207.08548) |
| 2022 | AskYourDB: Querying Relational Databases with Natural Language | [2210.08532](https://arxiv.org/abs/2210.08532) |
| 2022 | LAMA-Net: Unsupervised Domain Adaptation via Latent Alignment for RUL Prediction | [2208.08388](https://arxiv.org/abs/2208.08388) |
| 2019 | Intermittent Demand Forecasting with Deep Renewal Processes | [1911.10416](https://arxiv.org/abs/1911.10416) |

**Semantic Scholar:** https://www.semanticscholar.org/author/Manu-Joseph/2086742581

---

## 6. Technical Books

### Modern Time Series Forecasting with Python (2nd Edition)

**Publisher:** Packt Publishing
**Co-author:** Jeffrey Tackes
**Amazon (US):** https://www.amazon.com/Modern-Time-Forecasting-Python-industry-ready/dp/1803246804
**O'Reilly:** https://www.oreilly.com/library/view/modern-time-series/9781803246802/
**Code Repo:** https://github.com/PacktPublishing/Modern-Time-Series-Forecasting-with-Python

**Topics covered:**
- Classical methods: ARIMA, ETS, statistical baselines
- ML approaches: Linear regression, gradient-boosted trees (XGBoost, LightGBM)
- Deep learning: Feed-forward neural networks, LSTMs, Transformers, N-BEATS
- Probabilistic forecasting and uncertainty estimation
- Interpretability and explainability for forecasting models
- Real-world applications and industry best practices

---

## 7. Fiction — The Artist

### Book Details

| Field | Value |
|---|---|
| Title | The Artist |
| Author (pen name) | Manu J |
| Genre | Psychological Thriller |
| Publisher | Paper Towns |
| Year | 2024 |
| Availability | Bookstores across India + Amazon India |
| Linktree | https://linktr.ee/the_artist_novel |
| Instagram | https://www.instagram.com/author_manu_j/ |
| Amazon IN | https://www.amazon.in/stores/Manu-Joseph/author/B0BL85MBVW |

### Themes
Serial Killer · Police Procedural · Dark Past · Family · Internal Struggle · Multiple POVs · Cat & Mouse Game

### Synopsis

Set between the shadowed alleys of Trivandrum and the bustling streets of Delhi. Three POVs, one dark truth.

**Characters:**

**Alex ("The Artist")**
A serial killer with a flair for the dramatic, turning each crime into a dark piece of art. An enigmatic predator camouflaged within urban chaos — calm, calculating, utterly controlled. Compares himself to a lion: doesn't chase, watches, waits, then strikes.

**Manas**
A family man living what appears to be an ideal life — until a buried secret resurfaces. Thrust into a nightmare, he races against time and fate to protect what he holds dearest. The novel's moral core — a portrait of a man driven by love and desperation.

**Nasir Ali Khan ("The Hunter")**
An elite police officer, one of very few sent to the FBI for training in violent crimes. Methodical and relentless — four years on the Artist's trail. Motto: *"Manipulation. Domination. Control."*

### Critical Acclaim

> *"A fluently written and blazingly paced thriller, Manu J's The Artist marks an impressive debut."*
> As the characters blaze a bloody trail, the reader realises a searing fact: the darkness engulfing these twisted, scarred men and women isn't external — it's internal, a manifestation of their own sordid psyches.
> — **Dr. Shashi Tharoor**, Esteemed Indian Politician, Accomplished Author & Former Diplomat

> *"For a debutant, Manu has come up with a surprisingly cohesive narration that seamlessly weaves subdued undertones with graphic murderous violence, rendered with sickeningly artistic hues... introduces a promising new writer to the literary scene."*
> — **The New Indian Express**

> *"Manu Joseph exhibits a remarkable command of fiction, weaving intricate details that captivate the reader's imagination without overwhelming the story's essence. His deep understanding of the human psyche is remarkable. The character of Manas reflects a profound exploration of the human self, echoing the tragic visions found in the Mahabharata and Greek tragedies."*
> — **Prof. N. Manu Chakravarthy**, Writer, Film Critic & Cultural Theorist

### Promotional Materials

- Serialised **graphic novel adaptation** — professional comic-book-style pages (cinematic panel artwork)
- Poster/film-style promotional imagery
- Social media infographic: themes breakdown (Serial Killer, Police Procedural, Dark Past, Family, Internal Struggle, Multiple POVs, Cat & Mouse)
- Instagram: [@author_manu_j](https://www.instagram.com/author_manu_j/)

### Opening Excerpt

> *"Alex drummed his fingers on the steering wheel of his blue Alto, idling on the side of the street. The streetlamp cast its amber light, bathing everyone and everything in gold. A bustling crowd, painted in honey-toned light, rushed past the window in its usual hurry to reach places. No one savoured the journey anymore; it was always a mad rush to reach somewhere, and fast. Little ants scurrying to make ends meet. Blind cows meandering through life without purpose."*

---

## 8. Children's Podcast — Little Pajama Tales

> **Status: Concluded** — The podcast has been discontinued, but remains an important chapter in Manu's story and a compelling angle for his personal brand narrative.

### Overview

| Field | Value |
|---|---|
| Name | Little Pajama Tales |
| Creator | Manu Joseph |
| Format | Children's audio storytelling podcast |
| Tagline | *"Cozy Adventures, Big Values"* |
| Status | Concluded |
| Episode Length | ~5 minutes (bite-sized bedtime stories) |
| Type | AI-assisted story generation |
| Platform | Acast |
| Acast URL | https://shows.acast.com/littlepajamatales |

### About the Show

Little Pajama Tales was a children's bedtime podcast featuring imaginative, value-rich fairy tales and folk stories. Each episode was a short, immersive adventure designed to enrich bedtime routines, spark imagination, and create family bonding moments.

The podcast used AI-assisted story generation to craft high-quality, consistent narratives — a genuine experiment at the intersection of Manu's technical expertise and his love of storytelling. Born from his identity as a father, it was a creative project that existed entirely outside his professional obligations.

**Goals it pursued:**
- Make bedtime a ritual worth looking forward to
- Develop listening skills and imagination in children
- Deliver stories loaded with values — honesty, courage, kindness, wise decision-making
- Reach families globally with accessible, high-quality children's content

### What It Achieved
- **1,000+ downloads**
- **20+ countries** reached
- Proved that a solo creator with AI tooling and a clear vision could reach a global audience

### Episode List (known)

| Episode | Description |
|---|---|
| Hansel and Gretel | Brave siblings discover adventure in an enchanted forest — a breadcrumb trail, a gingerbread house, a cunning witch, and treasure |
| Jack and the Beanstalk | An exhilarating fairy tale adventure — Jack climbs a magical beanstalk and encounters golden eggs and a magical harp |
| The Story of Rumpelstiltskin | Classic fairy-tale — a miller's daughter faced with impossible tasks due to deceit and greed |
| La Befana: The Italian Legend of the Gift-Giving Witch | A magical journey to find the newborn child destined to change the world |

### Why It Still Matters (Narrative)

Even though it's concluded, Little Pajama Tales is worth featuring. It tells a story that no CV or GitHub profile can: that Manu builds things driven by curiosity and love — not just career ambition. A data scientist who used AI to make bedtime stories for kids, reached families in 20+ countries, and then moved on to the next thing. That's a deeply human angle that makes the whole profile more three-dimensional.

On a website, it fits perfectly as a "past project" card — something to spark conversation and show range. The tagline *"Cozy Adventures, Big Values"* is genuinely charming alongside PyTorch Tabular and The Artist.

---

## 9. Blog & Content Creation

### Deep & Shallow (Primary Technical Blog)

**URL:** https://deep-and-shallow.com
**Author profile:** https://deep-and-shallow.com/author/manujosephv/

A respected ML resource covering:
- Time series forecasting techniques and benchmarks
- Deep learning architectures for tabular data
- Interpretable ML and explainability methods
- Probabilistic regression and uncertainty estimation
- Gradient boosting and ensemble methods
- Demand forecasting and intermittent time series

### Medium

**URL:** https://medium.com/@manujosephv
Active contributor. Accessible ML tutorials for a wider audience.

---

## 10. Speaking & Conferences

| Event | Year | Topic | Link |
|---|---|---|---|
| MLDS 2026 (upcoming) | 2026 | Deep Learning for Tabular Data | https://mlds.analyticsindiamag.com/speaker/manu-joseph/ |
| MLDS 2025 | 2025 | Time Series Forecasting | https://mlds.analyticsindiamag.com/speaker/manu-joseph-2/ |

**MLDS** = Machine Learning Developers Summit, organised by Analytics India Magazine — India's premier ML conference.

---

## 11. Awards & Recognition

| Award | Organisation | Notes |
|---|---|---|
| **40 Under 40 Data Scientist** | Analytics India Magazine (AIM) | Among India's most influential data scientists under 40 |
| **AIM Data Science Journey Feature** | Analytics India Magazine | Spotlight article on PyTorch Tabular as a landmark open-source project |
| **Critical Literary Acclaim** | Dr. Shashi Tharoor, New Indian Express | Highest-profile endorsements for a debut thriller in Indian publishing |

---

## 12. Online Presence & Links

### Data Science / Professional

| Platform | Handle / URL |
|---|---|
| Personal Website | https://manu-joseph.com |
| LinkedIn | https://www.linkedin.com/in/manujosephv/ |
| GitHub | https://github.com/manujosephv |
| Blog | https://deep-and-shallow.com |
| Medium | https://medium.com/@manujosephv |
| Twitter / X | https://twitter.com/manujosephsan |
| Semantic Scholar | https://www.semanticscholar.org/author/Manu-Joseph/2086742581 |
| Google Scholar | https://scholar.google.com/citations?user=oycu9JcAAAAJ |
| Amazon (Tech Books) | https://www.amazon.com/stores/author/B0BL85MBVW |

### Fiction Author

| Platform | Handle / URL |
|---|---|
| Instagram | https://www.instagram.com/author_manu_j/ |
| Amazon IN (Author) | https://www.amazon.in/stores/Manu-Joseph/author/B0BL85MBVW |
| Linktree (The Artist) | https://linktr.ee/the_artist_novel |

### Children's Podcast

| Platform | Handle / URL |
|---|---|
| Acast | https://shows.acast.com/littlepajamatales |

---

## 13. Photography & Visual Assets

### Portraits
- **Close-up portrait** — Yellow polo shirt, red brick wall background, warm confident smile
- **Full-length seated portrait** — Same setting, blue jeans, relaxed casual pose
- Both are high-resolution, professionally composed

### The Artist — Book & Promo
- **Book cover** — Distinctive Rorschach ink-blot style, black/white/deep red; silhouette of a woman in profile; "THE ARTIST / MANU J" bold type; Shashi Tharoor blurb at top
- **Graphic novel adaptation pages** — Full comic-book panels adapting opening scenes (Bal Bharati school, rain-soaked streets, car interior scenes, confrontation)
- **Movie-style promotional poster** — Dark cinematic car scene with The Artist billboard in background
- **Social infographic** — Book themes diagram (Serial Killer, Police Procedural, Dark Past, Family, Internal Struggle, Multiple POVs, Cat & Mouse)

---

## 14. Bio Versions

### Short Bio (50 words)
Manu Joseph is a Staff Data Scientist at Walmart Global Tech and the creator of PyTorch Tabular — a widely-adopted open-source framework for deep learning on tabular data. He is also the author of *The Artist*, a critically acclaimed psychological thriller, and the former creator of *Little Pajama Tales*, a children's bedtime podcast that reached families in 20+ countries.

### Medium Bio (100 words)
Manu Joseph bridges two distinct worlds with equal intensity. By day, he is a Staff Data Scientist at Walmart Global Tech India with 15+ years of experience in machine learning, and the creator of PyTorch Tabular — a framework used by ML practitioners worldwide. He has published 5 ArXiv papers, co-authored a bestselling Packt book on time series forecasting, and been named a 40 Under 40 Data Scientist by Analytics India Magazine. Beyond the data, he is Manu J — author of *The Artist*, a critically acclaimed psychological thriller praised by Dr. Shashi Tharoor, and the creator of *Little Pajama Tales*, a children's bedtime podcast that reached families across 20+ countries before concluding.

### Long Bio (200 words)
Manu Joseph is a Staff Data Scientist at Walmart Global Tech India and one of the most visible names in the Indian ML open-source community. Over 15+ years, he has applied AI and analytics to Fortune 500 digital transformations — from supply chain demand forecasting to cutting-edge deep learning research.

He is best known as the creator of **PyTorch Tabular**, a unified framework that makes deep learning on tabular data as accessible as scikit-learn. The project has amassed 2,000+ GitHub stars and is downloaded thousands of times monthly. He has published 5 research papers on ArXiv, co-authored *Modern Time Series Forecasting with Python* (Packt, 2nd Ed.), and been recognised as a 40 Under 40 Data Scientist by Analytics India Magazine.

But Manu's creativity doesn't stop at code. Writing under the pen name **Manu J**, he published his debut psychological thriller, *The Artist* (Paper Towns, 2024), a dark multi-POV narrative praised by Dr. Shashi Tharoor as "a fluently written and blazingly paced thriller." He is also the creator of **Little Pajama Tales**, a children's bedtime podcast featuring imaginative 5-minute stories that has reached families in 20+ countries.

Originally from Trivandrum, Kerala, now based in Bangalore. Father. Husband. Perpetually curious.

---

## Notes & Gaps

- **Little Pajama Tales** — Concluded. Confirm full episode list for archival purposes. Decide how prominently to feature it on the website (suggested: "Past Projects" card)
- **Twitter / X** — Handle `@manujosephsan` — confirm this is active
- **Google Scholar** — Confirm citation count
- **The Artist** — Confirm exact publication date and whether paperback is available
- **PyTorch Tabular** — Confirm current GitHub star count (was 2K+ at time of writing)

---

*Sources: manu-joseph.com, github.com/manujosephv, linkedin.com/in/manujosephv, instagram.com/author_manu_j, shows.acast.com/littlepajamatales, analyticsindiamag.com, arxiv.org, amazon.in, deep-and-shallow.com*
