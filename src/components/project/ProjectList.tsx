import { type Project } from "../../types/Project";
import ProjectCard from "./ProjectCard";
import styles from "./Project.module.css";

export default function ProjectList({ projects }: { projects: Project[] }) {
  return (
    <div className={styles.list}>
      {projects.map((p) => (
        <ProjectCard key={p.id} project={p} />
      ))}
    </div>
  );
}
