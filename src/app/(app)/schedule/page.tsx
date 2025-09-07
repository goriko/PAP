import { ScheduleComponent } from "@/features/shedule/components/schedule-component";

export const dynamic = "force-dynamic";

export default async function SchedulePage() {
  return (
    <div className="col-span-full flex flex-col">
      <ScheduleComponent />
    </div>
  );
}