import { useNavigate } from "react-router";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function HomeCard() {
  const navigate = useNavigate();

  return (
    <Card className="w-full max-w-[720px] rounded-2xl">
        <CardHeader>
          <CardTitle className="text-base font-medium">
            ระบบลงทะเบียนเรียน CPE & ISNE
          </CardTitle>
        </CardHeader>

        <CardContent>
          <Button onClick={() => navigate("/enrollment")}>
            ไปหน้าลงทะเบียนเรียน
          </Button>
        </CardContent>
      </Card>
    
  );
}