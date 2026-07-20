import React, { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { useTheme } from "../context/ThemeContext";

const GITHUB_USER = "JoaoZ14";
const API_URL = `https://github-contributions-api.jogruber.de/v4/${GITHUB_USER}?y=last`;

/* Heatmap — mesma família terracota em todos os níveis (só muda a intensidade). */
const LEVEL_LIGHT = [
  "#ffe2cc",
  "#ffb77a",
  "#f57a2e",
  "#df601c",
  "#b34810",
];

const LEVEL_DARK = [
  "#2a1810",
  "#6b3010",
  "#a84818",
  "#e8732a",
  "#ff9f52",
];

const Section = styled.section`
  width: 100%;
  max-width: var(--container-max);
  margin: 0 auto;
  padding: var(--section-y) var(--container-x);
  scroll-margin-top: 96px;
  box-sizing: border-box;
`;

const Header = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  justify-content: space-between;
  gap: var(--space-sm) var(--space-lg);
  margin-bottom: var(--space-xl);
`;

const Title = styled.h2`
  position: relative;
  display: inline-block;
  width: fit-content;
  max-width: 100%;
  margin: 0;
  padding-bottom: 0.42em;
  font-family: var(--font-display);
  font-weight: 800;
  font-size: clamp(28px, 5vw, 46px);
  letter-spacing: -0.04em;
  line-height: 1.02;
  color: var(--ink);
  text-wrap: balance;

  &::after {
    content: "";
    position: absolute;
    left: 0;
    bottom: 0.02em;
    width: 2.75em;
    max-width: 72px;
    height: 0.22em;
    min-height: 7px;
    pointer-events: none;
    background-color: var(--accent);
    -webkit-mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 120 12' preserveAspectRatio='none'%3E%3Cpath d='M0 7 Q10 2 20 7 T40 7 T60 7 T80 7 T100 7 T120 7' fill='none' stroke='%23000' stroke-width='3' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
    mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 120 12' preserveAspectRatio='none'%3E%3Cpath d='M0 7 Q10 2 20 7 T40 7 T60 7 T80 7 T100 7 T120 7' fill='none' stroke='%23000' stroke-width='3' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
    -webkit-mask-repeat: no-repeat;
    mask-repeat: no-repeat;
    -webkit-mask-size: 100% 100%;
    mask-size: 100% 100%;
  }
`;

const ProfileLink = styled.a`
  font-family: var(--font-mono);
  font-size: 12px;
  letter-spacing: 0.06em;
  text-decoration: none;
  color: var(--text-2);
  border-bottom: 1px solid transparent;
  transition: color 0.2s var(--ease-out), border-color 0.2s var(--ease-out);
  margin-bottom: 0.42em;

  &:hover {
    color: var(--accent);
    border-bottom-color: var(--accent);
  }

  &:focus-visible {
    outline: 2px solid var(--accent);
    outline-offset: 3px;
  }
`;

const Panel = styled.div`
  padding: var(--space-lg);
  border: 2px solid var(--ink);
  background: var(--surface);
  box-shadow: 6px 6px 0 0 var(--accent);
  box-sizing: border-box;

  @media (min-width: 900px) {
    padding: var(--space-xl);
  }

  html[data-theme="dark"] & {
    background: var(--bg-2);
    border-color: rgba(255, 255, 255, 0.55);
  }
`;

const Status = styled.p`
  margin: 0;
  font-family: var(--font-mono);
  font-size: 13px;
  line-height: 1.5;
  color: var(--text-2);
`;

const Total = styled.p`
  margin: 0 0 var(--space-md);
  font-family: var(--font-mono);
  font-size: 12px;
  letter-spacing: 0.04em;
  color: var(--text-3);
`;

const Scroll = styled.div`
  width: 100%;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  padding-bottom: var(--space-xs);
`;

const Graph = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-template-rows: repeat(7, 12px);
  grid-auto-columns: 12px;
  gap: 3px;
  width: max-content;
  min-height: calc(7 * 12px + 6 * 3px);

  @media (min-width: 900px) {
    grid-template-rows: repeat(7, 13px);
    grid-auto-columns: 13px;
    gap: 3px;
    min-height: calc(7 * 13px + 6 * 3px);
  }
`;

const Cell = styled.span`
  display: block;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  border: 1px solid rgba(0, 0, 0, 0.18);
  background: ${({ $color }) => $color};
  border-radius: 0;

  html[data-theme="dark"] & {
    border-color: rgba(255, 255, 255, 0.2);
  }
`;

const Legend = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: var(--space-md);
  font-family: var(--font-mono);
  font-size: 11px;
  letter-spacing: 0.04em;
  color: var(--text-3);
`;

const LegendSwatches = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 4px;
`;

const LegendSwatch = styled.span`
  display: inline-block;
  box-sizing: border-box;
  width: 12px;
  height: 12px;
  border: 1px solid rgba(0, 0, 0, 0.18);
  background: ${({ $color }) => $color};
  border-radius: 0;

  html[data-theme="dark"] & {
    border-color: rgba(255, 255, 255, 0.2);
  }
`;

function dayOfWeekMondayFirst(dateStr) {
  const d = new Date(`${dateStr}T12:00:00`);
  return (d.getDay() + 6) % 7;
}

function buildWeeks(contributions) {
  if (!Array.isArray(contributions) || contributions.length === 0) return [];

  const sorted = [...contributions].sort((a, b) => a.date.localeCompare(b.date));
  const weeks = [];
  let current = [];

  const pad = dayOfWeekMondayFirst(sorted[0].date);
  for (let i = 0; i < pad; i += 1) {
    current.push(null);
  }

  sorted.forEach((day) => {
    if (current.length === 7) {
      weeks.push(current);
      current = [];
    }
    current.push(day);
  });

  if (current.length) {
    while (current.length < 7) current.push(null);
    weeks.push(current);
  }

  return weeks;
}

export default function GitHubContributions() {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const [contributions, setContributions] = useState(null);
  const [total, setTotal] = useState(null);
  const [status, setStatus] = useState("loading");

  const levels = theme === "dark" ? LEVEL_DARK : LEVEL_LIGHT;

  useEffect(() => {
    let cancelled = false;
    const controller = new AbortController();

    async function load() {
      setStatus("loading");
      try {
        const res = await fetch(API_URL, { signal: controller.signal });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json = await res.json();
        if (cancelled) return;

        const days = Array.isArray(json.contributions) ? json.contributions : [];
        setContributions(days);
        setTotal(
          typeof json.total?.lastYear === "number"
            ? json.total.lastYear
            : days.reduce((sum, d) => sum + (d.count || 0), 0)
        );
        setStatus(days.length ? "ready" : "empty");
      } catch (err) {
        if (cancelled || err?.name === "AbortError") return;
        setStatus("error");
        setContributions(null);
        setTotal(null);
      }
    }

    load();
    return () => {
      cancelled = true;
      controller.abort();
    };
  }, []);

  const weeks = useMemo(() => buildWeeks(contributions || []), [contributions]);

  return (
    <Section id="contributions" aria-labelledby="contributions-title">
      <Header>
        <Title id="contributions-title">{t("contributions.title")}</Title>
        <ProfileLink
          href={`https://github.com/${GITHUB_USER}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          github.com/{GITHUB_USER}
        </ProfileLink>
      </Header>

      <Panel>
        {status === "loading" && (
          <Status role="status">{t("contributions.loading")}</Status>
        )}

        {status === "error" && (
          <Status role="alert">
            {t("contributions.error")}{" "}
            <ProfileLink
              href={`https://github.com/${GITHUB_USER}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {t("contributions.openProfile")}
            </ProfileLink>
          </Status>
        )}

        {status === "empty" && (
          <Status>{t("contributions.empty")}</Status>
        )}

        {status === "ready" && (
          <>
            <Total>
              {t("contributions.total", { count: total ?? 0 })}
            </Total>
            <Scroll>
              <Graph
                role="img"
                aria-label={t("contributions.ariaLabel", {
                  count: total ?? 0,
                })}
              >
                {weeks.map((week, wi) =>
                  week.map((day, di) => {
                    if (!day) {
                      return (
                        <Cell
                          key={`pad-${wi}-${di}`}
                          $color="transparent"
                          style={{ borderColor: "transparent" }}
                          aria-hidden="true"
                        />
                      );
                    }
                    const level = Math.min(4, Math.max(0, day.level ?? 0));
                    return (
                      <Cell
                        key={day.date}
                        $color={levels[level]}
                        title={`${day.date}: ${day.count} ${
                          day.count === 1
                            ? t("contributions.contribution")
                            : t("contributions.contributions")
                        }`}
                      />
                    );
                  })
                )}
              </Graph>
            </Scroll>
            <Legend aria-hidden="true">
              <span>{t("contributions.less")}</span>
              <LegendSwatches>
                {levels.map((color, i) => (
                  <LegendSwatch key={color + i} $color={color} />
                ))}
              </LegendSwatches>
              <span>{t("contributions.more")}</span>
            </Legend>
          </>
        )}
      </Panel>
    </Section>
  );
}
