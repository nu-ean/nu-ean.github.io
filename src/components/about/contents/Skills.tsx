import TechTag from "../../common/TechTag";

export default function Skills() {
  const skills = [
    {
      fieldName: "🖥️ 프론트엔드",
      skills: [
        "React",
        "JavaScript",
        "TypeScript",
        "HTML",
        "CSS",
        "Material UI",
      ],
    },
    {
      fieldName: "⚙️ 백엔드",
      skills: ["Spring Boot", "NestJS"],
    },
    { fieldName: "🗄️ 데이터베이스", skills: ["MySql", "Oracle"] },
    {
      fieldName: "☁️ 인프라 / DevOps",
      skills: ["Linux", "Tomcat", "Nginx", "AWS", "GitHub Actions"],
    },
    {
      fieldName: "🤝 툴 / 협업",
      skills: [
        "Bitbucket",
        "Gitlab",
        "Jira",
        "Confluence",
        "Sourcetree",
        "Notion",
      ],
    },
  ];

  return (
    <div>
      {skills.map((field) => (
        <div key={field.fieldName} style={{ marginBottom: "1.5rem" }}>
          <h3 style={{ marginBottom: "0.5rem", fontSize: "1.1rem" }}>
            {field.fieldName}
          </h3>
          {field.skills.map((skill) => (
            <TechTag key={skill} techStack={skill} />
          ))}
        </div>
      ))}
    </div>
  );
}
