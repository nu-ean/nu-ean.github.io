export type ProjectCategory = "PERSONAL" | "WORK";

export type Project = {
  index: number;
  id: string;
  title: string;
  category: ProjectCategory;
  startDate: string; // 서버에서 Date → JSON 문자열로 오므로 string
  endDate?: string;
  techTags: string[];
  summary?: string; // 개요
  description?: string; // TEXT 타입
  image1?: string;
  image2?: string;
  image3?: string;
  image4?: string;
  image5?: string;
};
