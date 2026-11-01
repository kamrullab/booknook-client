import type { Metadata } from "next";
import { ProfileCard } from "@/components/profile/profile-card";
export const metadata:Metadata={title:"My Profile"};
export default function ProfilePage(){return <main className="dashboard-page"><div className="site-container profile-container"><ProfileCard/></div></main>}
