import { useQuery } from "@tanstack/react-query";

import { fetchProjects } from "../../api/projects";
import { type Project } from "../../types/Project";
import ProjectList from "../../components/project/ProjectList";

export default function ProjectsPage() {
  const {
    data: projects,
    isPending,
    isError,
    error,
  } = useQuery<Project[]>({
    queryKey: ["projects"],
    queryFn: fetchProjects,
    staleTime: 5000, // 5초 안에 다시 되돌아올 경우 재요청을 보내지 않음
  });

  if (isPending) return <p>로딩 중...</p>;
  if (isError) return <p>에러 발생: {(error as Error).message}</p>;

  return (
    <div className="wrapper wrapper-full-width">
      <ProjectList projects={projects} />
    </div>
  );
}
