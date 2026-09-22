import { Trash2 } from "lucide-react";
import type { Course, Student } from "@/lib/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

type CourseCardProps = {
  course: Course;
  student: Student;
  isEnrolled: boolean;
  enrolledAt?: string;
  onUnenroll?: (courseId: string) => void;
};

function formatThaiDateTime(value?: string) {
  if (!value) return "-";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  const parts = new Intl.DateTimeFormat("th-TH-u-ca-buddhist", {
    timeZone: "Asia/Bangkok",
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).formatToParts(date);

  const getPart = (type: string) =>
    parts.find((part) => part.type === type)?.value ?? "";

  return `${getPart("day")} ${getPart("month")} ${getPart("year")} ${getPart(
    "hour"
  )}:${getPart("minute")}`;
}

export function CourseCard({
  course,
  student,
  isEnrolled,
  enrolledAt,
  onUnenroll,
}: CourseCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-start justify-between">
        <div>
          <CardTitle className="text-base">{course.courseTitle}</CardTitle>
          <CardDescription>
            รหัสวิชา: {course.courseId} · ผู้สอน: {course.instructors.join(", ")}
          </CardDescription>
        </div>

        <Badge
          variant="outline"
          className="shrink-0 border font-medium"
          style={{
            backgroundColor: isEnrolled
              ? "var(--badge-enrolled-bg)"
              : "var(--badge-open-bg)",
            color: isEnrolled
              ? "var(--badge-enrolled-text)"
              : "var(--badge-open-text)",
            borderColor: isEnrolled
              ? "var(--badge-enrolled-border)"
              : "var(--badge-open-border)",
          }}
        >
          {isEnrolled ? "ลงทะเบียนแล้ว" : "เปิดรับ"}
        </Badge>
      </CardHeader>
        {isEnrolled &&(
      <CardContent className="flex items-end justify-between">
        <div className="text-xs text-muted-foreground">
          <p>
            ชื่อ นศ.: {student.firstName} {student.lastName}
          </p>
          <p>โปรแกรม: {student.program}</p>
          <p>ลงทะเบียนเมื่อ: {formatThaiDateTime(enrolledAt)}</p>
        </div>

        <Button
          variant="ghost"
          size="icon"
          className="text-red-600 hover:bg-red-50 hover:text-red-700 dark:text-red-400 dark:hover:bg-red-950 dark:hover:text-red-300"
          onClick={() => onUnenroll?.(course.courseId)}
          aria-label="ยกเลิกการลงทะเบียน"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </CardContent>)}
    </Card>
  );
}