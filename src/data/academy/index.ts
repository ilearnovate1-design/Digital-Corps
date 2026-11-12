import { AcademyCourse } from '../../types';
import { COURSE_AI_LITERACY } from './courseAiLiteracy';
import { COURSE_CAREER_READINESS } from './courseCareerReadiness';
import { COURSE_DIGITAL_ENTREPRENEURSHIP } from './courseDigitalEntrepreneurship';
import { COURSE_DIGITAL_FOUNDATIONS } from './courseDigitalFoundations';
import { COURSE_DIGITAL_PRODUCTIVITY } from './courseDigitalProductivity';
import { COURSE_SPREADSHEET_MASTERY } from './courseSpreadsheetMastery';

export const ACADEMY_COURSES: AcademyCourse[] = [
  COURSE_AI_LITERACY,
  COURSE_CAREER_READINESS,
  COURSE_DIGITAL_ENTREPRENEURSHIP,
  COURSE_DIGITAL_FOUNDATIONS,
  COURSE_DIGITAL_PRODUCTIVITY,
  COURSE_SPREADSHEET_MASTERY
];

export const ALL_ACADEMY_COURSES = ACADEMY_COURSES;

export function getCourseById(courseId: string): AcademyCourse | undefined {
  return ACADEMY_COURSES.find((c) => c.courseId === courseId);
}

export function getCourseByCategoryId(categoryId: string): AcademyCourse | undefined {
  return ACADEMY_COURSES.find((c) => c.categoryId === categoryId);
}

export function getAllCourses(): AcademyCourse[] {
  return ACADEMY_COURSES;
}

export function getCourseLesson(
  courseId: string,
  lessonId: string
): { course: AcademyCourse; lesson: any; module: any } | undefined {
  const course = getCourseById(courseId);
  if (!course) return undefined;

  for (const mod of course.modules) {
    const lesson = mod.lessons.find((l) => l.lessonId === lessonId);
    if (lesson) {
      return { course, lesson, module: mod };
    }
  }
  return undefined;
}
