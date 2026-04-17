import { fetchCoursesListPage, fetchCoursesSummary } from "@/app/lib/api/products.api";
import {
  mapCoursesListResponse,
  mapCoursesSummaryResponse,
} from "@/app/lib/mappers/products/courses.mapper";
import type { CoursePageData, CourseQueryParams, CourseSummaryData } from "@/app/lib/types/products";

export async function getCoursesListData(params: CourseQueryParams): Promise<CoursePageData> {
  const response = await fetchCoursesListPage(params);
  return mapCoursesListResponse(response);
}

export async function getCoursesSummaryData(): Promise<CourseSummaryData> {
  const response = await fetchCoursesSummary();
  return mapCoursesSummaryResponse(response);
}
