import React from "react";
import styled, { css } from "styled-components";
import { FaAws } from "react-icons/fa";
import {
  SiFirebase,
  SiGooglecloud,
  SiPostgresql,
  SiReact,
  SiMercadopago,
  SiStyledcomponents,
  SiSupabase,
  SiTypescript,
} from "react-icons/si";
import {
  FaCssIcon,
  FaGithubIcon,
  FaHtmlIcon,
  FaJavaIcon,
  FaJsIcon,
  FaNodeJsIcon,
  FaPythonIcon,
  FaReactIcon,
  SiDockerIcon,
  SiGitIcon,
  SiJsonwebtokensIcon,
  SiOpenidIcon,
  SiSpringbootIcon,
} from "./Icons";

export const TECH_NAMES = {
  react: "React",
  reactnative: "React Native",
  styledcomponents: "Styled-components",
  typescript: "TypeScript",
  js: "JavaScript",
  html: "HTML5",
  css: "CSS",
  node: "Node.js",
  python: "Python",
  java: "Java",
  springboot: "Spring Boot",
  sql: "SQL",
  postgresql: "PostgreSQL",
  firebase: "Firebase",
  restful: "RESTful APIs",
  aws: "AWS",
  googlecloud: "Google Cloud",
  stripe: "API Mercado Pago",
  supabase: "Supabase",
  oauth2: "OAuth 2.0",
  git: "Git",
  github: "GitHub",
  docker: "Docker",
  openid: "OpenID",
  jwt: "JWT",
};

export const TECH_BRAND = {
  react: { brand: "#61DAFB", ink: "#0a0a0a" },
  reactnative: { brand: "#61DAFB", ink: "#0a0a0a" },
  js: { brand: "#F7DF1E", ink: "#0a0a0a" },
  typescript: { brand: "#3178C6", ink: "#ffffff" },
  html: { brand: "#E34F26", ink: "#ffffff" },
  css: { brand: "#1572B6", ink: "#ffffff" },
  styledcomponents: { brand: "#DB7093", ink: "#ffffff" },
  node: { brand: "#339933", ink: "#ffffff" },
  java: { brand: "#ED8B00", ink: "#0a0a0a" },
  springboot: { brand: "#6DB33F", ink: "#0a0a0a" },
  python: { brand: "#3776AB", ink: "#ffffff" },
  sql: { brand: "#CC2927", ink: "#ffffff" },
  postgresql: { brand: "#4169E1", ink: "#ffffff" },
  restful: { brand: "#009688", ink: "#ffffff" },
  oauth2: { brand: "#EB5424", ink: "#ffffff" },
  firebase: { brand: "#FFCA28", ink: "#0a0a0a" },
  supabase: { brand: "#3ECF8E", ink: "#0a0a0a" },
  aws: { brand: "#FF9900", ink: "#0a0a0a" },
  googlecloud: { brand: "#4285F4", ink: "#ffffff" },
  stripe: { brand: "#00B1EA", ink: "#ffffff" },
  git: { brand: "#F05032", ink: "#ffffff" },
  github: { brand: "#24292F", ink: "#ffffff" },
  docker: { brand: "#2496ED", ink: "#ffffff" },
  openid: { brand: "#F78C40", ink: "#0a0a0a" },
  jwt: { brand: "#000000", ink: "#ffffff" },
};

const TechFallbackIcon = styled.div`
  width: 40px;
  height: 40px;
  border: 1px solid var(--line);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: var(--ink);
  font-family: var(--font-mono);
  font-weight: 500;
  letter-spacing: 0.05em;
  font-size: 12px;
  text-transform: uppercase;
`;

const List = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-sm);
`;

const Tag = styled.li`
  --tech-brand: ${(p) => p.$brand || "var(--accent)"};
  --tech-ink: ${(p) => p.$ink || "var(--on-accent)"};

  display: inline-flex;
  align-items: center;
  gap: var(--space-xs);
  padding: 10px 12px;
  border: 1px solid var(--line);
  background: var(--bg);
  color: var(--ink);
  border-radius: 0;
  box-shadow: 3px 3px 0 0 var(--ink);
  cursor: default;
  transition: transform 0.2s var(--ease-out), box-shadow 0.2s var(--ease-out),
    background-color 0.2s var(--ease-out), color 0.2s var(--ease-out),
    border-color 0.2s var(--ease-out);

  svg {
    font-size: 16px;
    width: 1em;
    height: 1em;
    flex-shrink: 0;
    color: currentColor;
    transition: transform 0.25s var(--ease-out);
  }

  ${TechFallbackIcon} {
    width: 22px;
    height: 22px;
    font-size: 9px;
    border: 0;
    padding: 0;
    background: transparent;
    color: inherit;
  }

  &:hover {
    transform: translate(-2px, -2px) rotate(-2deg);
    background: var(--tech-brand);
    color: var(--tech-ink);
    border-color: var(--tech-brand);
    box-shadow: 5px 5px 0 0 var(--ink);
  }

  &:hover svg {
    transform: scale(1.12) rotate(6deg);
    color: var(--tech-ink);
  }

  &:nth-child(even):hover {
    transform: translate(-2px, -2px) rotate(2deg);
  }

  html[data-theme="dark"] &:hover {
    background: var(--bg);
    color: var(--ink);
    border-color: var(--line);
    box-shadow: 5px 5px 0 0 var(--tech-brand);
  }

  html[data-theme="dark"] &:hover svg {
    color: var(--tech-brand);
  }

  html[data-theme="dark"] &:hover ${TechFallbackIcon} {
    color: var(--tech-brand);
  }

  ${({ $quiet }) =>
    $quiet &&
    css`
      padding: 8px 10px;
      box-shadow: none;
      border-color: var(--line-soft);
      background: transparent;

      &:hover {
        box-shadow: 3px 3px 0 0 var(--tech-brand);
      }

      html[data-theme="dark"] &:hover {
        background: transparent;
        border-color: var(--line-soft);
        box-shadow: 3px 3px 0 0 var(--tech-brand);
      }
    `}

  @media (prefers-reduced-motion: reduce) {
    transition: background-color 0.2s var(--ease-out), box-shadow 0.2s var(--ease-out),
      color 0.2s var(--ease-out), border-color 0.2s var(--ease-out);

    &:hover {
      transform: none;
    }

    &:hover svg {
      transform: none;
    }
  }
`;

const TagLabel = styled.span`
  font-family: var(--font-mono);
  font-size: 12px;
  letter-spacing: 0.02em;
  line-height: 1.2;
  color: inherit;
  white-space: nowrap;
`;

const TECH_ICONS = {
  react: <FaReactIcon />,
  reactnative: <SiReact />,
  js: <FaJsIcon />,
  typescript: <SiTypescript />,
  html: <FaHtmlIcon />,
  css: <FaCssIcon />,
  styledcomponents: <SiStyledcomponents />,
  node: <FaNodeJsIcon />,
  python: <FaPythonIcon />,
  java: <FaJavaIcon />,
  springboot: <SiSpringbootIcon />,
  postgresql: <SiPostgresql />,
  firebase: <SiFirebase />,
  aws: <FaAws />,
  googlecloud: <SiGooglecloud />,
  stripe: <SiMercadopago />,
  supabase: <SiSupabase />,
  oauth2: <SiOpenidIcon />,
  git: <SiGitIcon />,
  github: <FaGithubIcon />,
  docker: <SiDockerIcon />,
  openid: <SiOpenidIcon />,
  jwt: <SiJsonwebtokensIcon />,
};

/**
 * Lista de cards de tecnologia (sticker).
 * @param {string[]} items - chaves (ex.: "react", "node")
 * @param {boolean} [quiet] - variante mais leve (stack de projetos)
 */
const TechTags = ({ items = [], quiet = false }) => {
  if (!items.length) return null;

  return (
    <List>
      {items.map((techKey) => {
        const brand = TECH_BRAND[techKey];
        const label = TECH_NAMES[techKey] || techKey;
        const icon = TECH_ICONS[techKey];

        return (
          <Tag
            key={techKey}
            $quiet={quiet}
            $brand={brand?.brand}
            $ink={brand?.ink}
          >
            {icon || (
              <TechFallbackIcon>{label.slice(0, 2)}</TechFallbackIcon>
            )}
            <TagLabel>{label}</TagLabel>
          </Tag>
        );
      })}
    </List>
  );
};

export default TechTags;
