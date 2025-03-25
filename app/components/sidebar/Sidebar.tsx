import { getCurrentUser } from "@/app/actions/getCurrentUser";
import DesktopSidebar from "./DesktopSidebar"
import MobileFooter from "./MobileFooter"


const Sidebar =async ({ children }: { children: React.ReactNode }) => {
    const user= await getCurrentUser();
    return (
        <div className="h-full">
            <DesktopSidebar user={user} />
            <MobileFooter />
            <main className="lg:pl-20 h-full">
                {children}

            </main>
        </div>
    )
}

export default Sidebar
