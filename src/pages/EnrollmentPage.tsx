import { useState } from "react";

import { CourseCard } from "@/components/course-card";
import { RegisterDialog } from "@/components/register-dialog";
import {
  courses,
  currentStudent,
  enrollments as initialEnrollments,
} from "@/lib/mock-data";
import type { Enrollment } from "@/lib/types";

export default function Enrollent() {
  const [enrollments, setEnrollments] =
    useState<Enrollment[]>(initialEnrollments);

  const availableCourses = courses.filter(
    (course) =>
      !enrollments.some(
        (e) =>
          e.studentId === currentStudent.studentId &&
          e.courseId === course.courseId,
      ),
  );

  function handleRegister(courseId: string, registeredAt: string) {
  const newEnrollment: Enrollment = {
    studentId: currentStudent.studentId,
    courseId,
    enrolledAt: registeredAt,
  };

  setEnrollments((prev) => [...prev, newEnrollment]);
}

  function handleUnenroll(courseId: string) {
    setEnrollments((prev) =>
      prev.filter(
        (e) =>
          !(
            e.studentId === currentStudent.studentId &&
            e.courseId === courseId
          ),
      ),
    );
  }

  return (
    <div className="space-y-4">
      <div>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-xl font-semibold">รายวิชาทั้งหมด</h1>
            <p>{currentStudent.firstName} {currentStudent.lastName} ({currentStudent.studentId})</p>
          </div>
          
          <RegisterDialog
            availableCourses={availableCourses}
            currentStudent={currentStudent}
            onRegister={handleRegister}
          />
        </div>
      </div>

      <div className="flex flex-col gap-4">
        {courses.map((course) => {
          const enrollment = enrollments.find(
            (e) =>
              e.studentId === currentStudent.studentId &&
              e.courseId === course.courseId,
          );

          return (
            <CourseCard
              key={course.courseId}
              course={course}
              student={currentStudent}
              isEnrolled={!!enrollment}
              enrolledAt={enrollment?.enrolledAt}
              onUnenroll={handleUnenroll}
            />
          );
        })}
      </div>
    </div>
  );
}