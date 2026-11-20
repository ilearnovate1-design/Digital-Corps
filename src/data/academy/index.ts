import { AcademyCourse } from '../../types';
import { COURSE_AI_LITERACY } from './courseAiLiteracy';
import { COURSE_CAREER_READINESS } from './courseCareerReadiness';
import { COURSE_DIGITAL_ENTREPRENEURSHIP } from './courseDigitalEntrepreneurship';
import { COURSE_DIGITAL_FOUNDATIONS } from './courseDigitalFoundations';
import { COURSE_DIGITAL_PRODUCTIVITY } from './courseDigitalProductivity';
import { COURSE_SPREADSHEET_MASTERY } from './courseSpreadsheetMastery';
import { COURSE_GROW_YOUR_BUSINESS_ONLINE } from './courseGrowYourBusinessOnline';
import { COURSE_WEB_DEV_BEGINNER } from './webdev/courseWebDevBeginner';
import { COURSE_WEB_DEV_INTERMEDIATE } from './webdev/courseWebDevIntermediate';
import { COURSE_WEB_DEV_ADVANCED } from './webdev/courseWebDevAdvanced';

export const WEB_DEV_COURSE_IDS = [
  'web-development-beginner',
  'web-development-intermediate',
  'web-development-advanced'
] as const;

export const ACADEMY_COURSES: AcademyCourse[] = [
  COURSE_AI_LITERACY,
  COURSE_CAREER_READINESS,
  COURSE_DIGITAL_ENTREPRENEURSHIP,
  COURSE_GROW_YOUR_BUSINESS_ONLINE,
  COURSE_DIGITAL_FOUNDATIONS,
  COURSE_DIGITAL_PRODUCTIVITY,
  COURSE_SPREADSHEET_MASTERY,
  COURSE_WEB_DEV_BEGINNER,
  COURSE_WEB_DEV_INTERMEDIATE,
  COURSE_WEB_DEV_ADVANCED
];

export const ALL_ACADEMY_COURSES = ACADEMY_COURSES;

export function getWebDevCourses(): AcademyCourse[] {
  return ACADEMY_COURSES.filter((c) => c.categoryId === 'web_development_academy');
}

export function getCourseById(courseId: string): AcademyCourse | undefined {
  return ACADEMY_COURSES.find((c) => c.courseId === courseId);
}

export function getCourseByCategoryId(categoryId: string): AcademyCourse | undefined {
  return ACADEMY_COURSES.find((c) => c.categoryId === categoryId);
}

export function getCoursesByCategoryId(categoryId: string): AcademyCourse[] {
  return ACADEMY_COURSES.filter((c) => c.categoryId === categoryId);
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
