import { type Project } from "../types/Project";
import { getProjectById, getProjects } from "../data/projects";

// 프로젝트 목록 조회
export const fetchProjects = async (): Promise<Project[]> => {
  return getProjects();
};

// 프로젝트 단건 조회
export const fetchProjectById = async (id: string): Promise<Project> => {
  const project = getProjectById(id);

  if (!project) {
    throw new Error("Project not found");
  }

  return project;
};
