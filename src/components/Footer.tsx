
import { useSidebar } from "@/components/ui/sidebar"

export function Footer() {
  const { state, isMobile } = useSidebar()

  const sidebarOffset = isMobile
    ? "0px"
    : state === "collapsed"
      ? "var(--sidebar-width-icon)"
      : "var(--sidebar-width)"

  return (
    <footer
      className="fixed inset-x-0 bottom-0 z-50 border-t bg-background transition-[left] duration-200 ease-linear"
      style={{ left: sidebarOffset }}
    >
      <div className="px-4 py-3">
        <p className="mt-5 text-center text-xs text-muted-foreground">
        จัดทำโดย Pakornpat Khamton รหัสนักศึกษา 680610690
      </p>
      </div>
    </footer>
  )
}