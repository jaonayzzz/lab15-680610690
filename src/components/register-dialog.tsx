import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { Course, Student } from "@/lib/types";

type RegisterDialogProps = {
  availableCourses: Course[];
  currentStudent: Student;
  onRegister: (courseId: string, registeredAt: string) => void;
};

function getCurrentTime() {
  const now = new Date();
  const hh = String(now.getHours()).padStart(2, "0");
  const mm = String(now.getMinutes()).padStart(2, "0");
  return `${hh}:${mm}`;
}

export function RegisterDialog({
  availableCourses,
  currentStudent,
  onRegister,
}: RegisterDialogProps) {
  const [open, setOpen] = useState(false);
  const [courseId, setCourseId] = useState("");
  const [time, setTime] = useState(getCurrentTime());

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
  e.preventDefault();
  if (!courseId) return;

  const registeredAt = new Date();
  const [hour, minute] = time.split(":");

  registeredAt.setHours(Number(hour));
  registeredAt.setMinutes(Number(minute));
  registeredAt.setSeconds(0);
  registeredAt.setMilliseconds(0);

  onRegister(courseId, registeredAt.toISOString());

  setCourseId("");
  setTime(getCurrentTime());
  setOpen(false);
}

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Button disabled={availableCourses.length === 0}>ลงทะเบียน</Button>
      </DialogTrigger>

      <DialogContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <DialogHeader>
            <DialogTitle>ลงทะเบียนรายวิชา</DialogTitle>
            <DialogDescription>
              กรอกข้อมูลเพื่อลงทะเบียนวิชาที่ต้องการ
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-2">
            <Label htmlFor="courseId">วิชา</Label>
            <Select
              value={courseId}
              onValueChange={(value) => setCourseId(value ?? "")}
            >
              <SelectTrigger id="courseId" className="w-full">
                <SelectValue placeholder="เลือกวิชา" />
              </SelectTrigger>
              <SelectContent>
                {availableCourses.map((course) => (
                  <SelectItem key={course.courseId} value={course.courseId}>
                    <span className="block whitespace-normal break-words">
                      {course.courseId} – {course.courseTitle}
                    </span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="time">เลือกเวลา</Label>
            <Input
              id="time"
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="studentName">ชื่อ นศ.</Label>
            <Input
              id="studentName"
              readOnly
              value={`${currentStudent.firstName} ${currentStudent.lastName}`}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="program">โปรแกรม</Label>
            <Input id="program" readOnly value={currentStudent.program} />
          </div>

          <DialogFooter>
            <Button type="submit" disabled={!courseId}>
              ยืนยันการลงทะเบียน
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}