---
target: "detalhe de projetos / LandingPage #projects"
total_score: 23
p0_count: 1
p1_count: 2
timestamp: 2026-07-16T21-38-30Z
slug: src-pages-landingpage-js-projects
---
# Critique — Project detail panel (LandingPage #projects)

Method: dual-agent (A: 2cd9cce2 · B: 4d4d056d)

## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 3 | aria-current / aria-live ok; hover-to-select pode surpreender |
| 2 | Match System / Real World | 3 | Chip PESSOAL com peso de componente |
| 3 | User Control and Freedom | 3 | Troca fácil na lista |
| 4 | Consistency and Standards | 1 | Accent escuro muted vs Skills #e08a55; hover tags ≠ CTA |
| 5 | Error Prevention | 3 | Notas privadas / inatividade ok |
| 6 | Recognition Rather Than Recall | 3 | Preview sticky + labels |
| 7 | Flexibility and Efficiency | 2 | CTA atrás das tags no tab order visual |
| 8 | Aesthetic and Minimalist Design | 1 | Cada fragmento com ink shadow |
| 9 | Error Recovery | 2 | Poucos erros; cobertura parcial |
| 10 | Help and Documentation | 2 | Relação hover lista/preview pouco óbvia |
| **Total** | | **23/40** | **Needs work** |

## Anti-Patterns Verdict

**LLM assessment:** Lista editorial passa. Detalhe falha parcial: sticker aplicado por checklist (imagem, partner, descrição, tags, CTA) com o mesmo `border + offset shadow` — monocultura interna, sem hierarquia. Skills prova o idioma com um herói; projetos inverte.

**Deterministic scan:** `detect.mjs` → `[]` (0 findings). Detector limpo; o problema é hierarquia/densidade, não regras mecânicas.

**Visual overlays:** browser overlay skipped — no mutable browser tool in this harness.

## Overall Impression

A lista está forte. O desconforto sem nome no detalhe é **ruído visual + accent morto no dark + prosa virando card**, não “cor errada” isolada. Maior oportunidade: um gesto brutal (imagem) + prosa limpa + CTA único filled.

## What's Working

1. `ProjectIndexRow` editorial (manter).
2. Sticky preview + fade + `aria-live`.
3. Direção sticker alinhada a Skills quando há um herói de composição.

## Priority Issues

### [P0] Tudo é sticker
- **What:** Image, partner, description, TechTag, ProjectLink todos com border + shadow.
- **Why:** Visual Noise Floor; olho não encontra o projeto.
- **Fix:** Só imagem carrega sombra; descrição sem caixa; CTA único filled; tags quietas.
- **Suggested:** `/impeccable quieter` ou `/impeccable distill`

### [P1] Accent morto no dark vs Skills
- **What:** Projetos herdam `#945736`; Skills escopa `#e08a55`.
- **Why:** Detalhe parece desbotado depois de Skills.
- **Fix:** Escopar accent em ProjectsSection no dark, ou reservar accent só ao CTA.
- **Suggested:** `/impeccable colorize`

### [P1] Description-as-card
- **What:** ProjectDescription com padding, border, bg-2, ink shadow.
- **Why:** Texto editorial vira widget; compete com imagem.
- **Fix:** Prosa solta como SkillSummary.
- **Suggested:** `/impeccable typeset` + quieter

### [P2] Hover partido (tags vs CTA)
- **What:** Dark tags = sombra/ícone; CTA = fill accent.
- **Why:** Dois grammars na mesma coluna.
- **Fix:** Unificar: CTA filled, tags quietas (já quase isso).
- **Suggested:** `/impeccable polish`

### [P3] Partner/Personal chip pesado
- **What:** Sempre caixa + accent shadow, até “pessoal”.
- **Why:** Meta secundária grita.
- **Fix:** Linha mono sob a imagem; caixa só se colaboração.
- **Suggested:** `/impeccable clarify`

## Persona Red Flags

**Jordan (recrutador):** Lista boa → preview barulhento → CTA atrasado.
**Alex (dev):** Wall de TechTag com shadow; quer stack scannable.
**Sam (mobile):** Accordion ajuda; colagem de caixas = scroll sem âncora.

## Minor Observations

- ProjectDetailCard já é layout-only (bom).
- ProjectImageNote funciona.
- Estudos reusam o mesmo render — quieter beneficia ambos.

## Questions to Consider

1. Detalhe precisa de cinco molduras, ou só imagem + parágrafo + botão?
2. Projetos deve igualar o calor de Skills no dark, ou ser mais quieto que Skills?
3. Chip “PESSOAL” merece caixa?
4. Qual é o único “wow”: screenshot ou coleção de stickers?
