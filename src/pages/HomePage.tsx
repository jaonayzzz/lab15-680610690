import { HomeCard } from "@/components/็HomeCard";
export default function HomePage() {
  return (
    <div className="mt-5 flex flex-col items-center">
      <HomeCard/>
      <p className="mt-5 text-center text-xs text-muted-foreground">
        จัดทำโดย Pakornpat Khamton รหัสนักศึกษา 680610690
      </p>
    </div>
  );
}
