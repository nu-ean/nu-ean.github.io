import styles from "./Common.module.css";
import Icon from "./Icon";

const techConfig: Record<string, { color: string; aliases?: string[] }> = {
  // Frontend
  react: { color: "#0a7ea3", aliases: ["reactjs", "react.js"] },
  nextjs: { color: "#000", aliases: ["next.js"] },
  vite: { color: "#b84eff", aliases: ["vitejs"] },
  javascript: { color: "#cbb61cff", aliases: ["js", "java script"] },
  typescript: { color: "#3077c6", aliases: ["ts", "type script"] },
  jquery: { color: "#78cff5" },
  materialui: { color: "#04abf7", aliases: ["mui", "material ui"] },
  redux: { color: "#764abc", aliases: ["redux toolkit"] },
  tanstackquery: {
    color: "#ff4154",
    aliases: ["react query", "tanstack query"],
  },
  html: { color: "#dc4a25" },
  css: { color: "#156eb0" },

  // Backend
  nodejs: { color: "#4caf50", aliases: ["node", "node.js"] },
  express: { color: "#444", aliases: ["expressjs", "express.js"] },
  nestjs: { color: "#ea2858" },
  springboot: { color: "#6cb52c" },
  java: { color: "#e76f00" },
  jsp: { color: "#ff3200" },
  mybatis: { color: "#cc0402" },
  typeorm: { color: "#e23323" },

  // Database
  mysql: { color: "#3d6e93" },
  oracle: { color: "#f10101", aliases: ["oracle db"] },
  mongodb: { color: "#4fa94d", aliases: ["mongo db"] },

  // Infra / DevOps
  docker: { color: "#028de0", aliases: ["docker compose"] },
  nginx: { color: "#109748" },
  tomcat: { color: "#cb9f1a", aliases: ["apache tomcat"] },
  apachepoi: { color: "#dd552c", aliases: ["apache poi"] },
  linux: { color: "#020202" },
  aws: { color: "#f0941e", aliases: ["aws s3", "aws ec2", "s3", "ec2"] },

  // Tools / Platforms
  github: { color: "#000", aliases: ["github", "github actions"] },
  gitlab: { color: "#d94127" },
  bitbucket: { color: "#2680f7" },
  confluence: { color: "#0c5ed4" },
  jira: { color: "#2680f7" },
  notion: { color: "#000" },
  postman: { color: "#ef5b25" },
  vscode: { color: "#0078d7", aliases: ["vs code", "visual studio code"] },
  figma: { color: "#f24e1e" },
  sourcetree: { color: "#2680f7" },

  // Security / Auth
  jwt: { color: "#c049f0" },
};

// 입력 문자열을 대표 id로 매핑
function resolveTechId(raw: string): string {
  const normalized = raw.toLowerCase().replace(/[\s.\-]+/g, "");
  for (const [key, config] of Object.entries(techConfig)) {
    if (key === normalized) return key;
    if (
      config.aliases?.some(
        (alias) => alias.replace(/[\s.\-]+/g, "") === normalized
      )
    )
      return key;
  }
  return normalized;
}

type TechTagProps = {
  techStack: string;
  variant?: "color" | "mono";
};

export default function TechTag({
  techStack,
  variant = "color",
}: TechTagProps) {
  const id = resolveTechId(techStack);
  const color = techConfig[id]?.color ?? "#222";

  if (variant === "mono") {
    return (
      <span className={styles.techTagMono} data-tooltip={techStack}>
        <Icon id={id} color="inherit" className={styles.techIconMono} />
      </span>
    );
  }

  return (
    <span className={styles.techTag} style={{ backgroundColor: color }}>
      <Icon id={id} color="#fff" className={styles.techIcon} />
      {techStack}
    </span>
  );
}
