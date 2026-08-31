import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { Viewer } from "@toast-ui/react-editor";
import Prism from "prismjs";
import codeSyntaxHighlight from "@toast-ui/editor-plugin-code-syntax-highlight";

import TechTag from "../../components/common/TechTag";
import { fetchProjectById } from "../../api/projects";
import { type Project } from "../../types/Project";
import { formatPeriod } from "../../util/functions";
import styles from "./Public.module.css";

export default function ProjectDetailPage() {
  const { t } = useTranslation();
  const { projectId } = useParams<{ projectId: string }>();

  const [selectedImg, setSelectedImg] = useState<string | null>(null);
  const openModal = (img: string) => setSelectedImg(img);
  const closeModal = () => setSelectedImg(null);

  const {
    data: project,
    isPending,
    isError,
    error,
  } = useQuery<Project>({
    queryKey: ["project", projectId],
    queryFn: () => fetchProjectById(projectId!),
    enabled: !!projectId,
  });

  if (isPending) return <p>로딩 중...</p>;
  if (isError) return <p>에러 발생: {(error as Error).message}</p>;
  if (!project) return <p>해당 프로젝트를 찾을 수 없습니다.</p>;

  const content =
    (project.summary ? `## 개요\n${project.summary}\n\n` : "") +
    (project.description ?? "");

  return (
    <>
      <div className="wrapper wrapper-md">
        <div className={styles.navSection}>
          <Link className={`underline-link ${styles.navButton}`} to="/projects">
            ← {t("button.return-to-list")}
          </Link>
        </div>
        <div className={styles.tableSection}>
          <table>
            <tbody>
              <tr>
                <td>{t("element.title")}</td>
                <td>
                  <p className={styles.projectTitle}>{project.title}</p>
                </td>
              </tr>

              <tr>
                <td>{t("element.project-scale")}</td>
                <td>
                  {t(`element.category.${project.category}`)}{" "}
                  {t(`element.project`)}
                </td>
              </tr>

              <tr>
                <td>{t("element.period")}</td>
                <td>{formatPeriod(project.startDate, project.endDate)}</td>
              </tr>

              <tr>
                <td>{t("element.tech-stacks")}</td>
                <td>
                  {project.techTags.map((tech) => (
                    <TechTag key={tech} techStack={tech} />
                  ))}
                </td>
              </tr>

              <tr>
                <td
                  colSpan={2}
                  style={{ paddingTop: "1rem", paddingBottom: "1rem" }}
                >
                  <Viewer
                    initialValue={content}
                    plugins={[[codeSyntaxHighlight, { highlighter: Prism }]]}
                  />
                </td>
              </tr>

              {(project.image1 ||
                project.image2 ||
                project.image3 ||
                project.image4 ||
                project.image5) && (
                <tr>
                  <td colSpan={2}>
                    <div className={styles.gallery}>
                      {[
                        project.image1,
                        project.image2,
                        project.image3,
                        project.image4,
                        project.image5,
                      ]
                        .filter(Boolean)
                        .map((img, idx) => (
                          <img
                            key={idx}
                            src={`${import.meta.env.VITE_CDN_BASE ?? ""}${img}`}
                            alt={`Project image ${idx + 1}`}
                            className={styles.thumbnail}
                            onClick={() => openModal(img!)}
                          />
                        ))}
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {selectedImg && (
        <div className={styles.modal} onClick={closeModal}>
          <div className={styles.modalContent}>
            <img
              src={`${import.meta.env.VITE_CDN_BASE ?? ""}${selectedImg}`}
              alt="Full view"
            />
          </div>
        </div>
      )}
    </>
  );
}
