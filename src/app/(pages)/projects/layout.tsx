"use client";
 import { useQuery} from 'react-query';
 import { getAllProjects } from '@/app/Service/ProjectServices';
import ResponsiveDrawer from '@/app/components/drawer/Drawer';
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { BiError } from "react-icons/bi";

export default function page({ children }: { children: React.ReactNode }) {
   const { data: Allprojects , isLoading, error} = useQuery('Allprojects', getAllProjects);
   if (isLoading) return <p>Loading projects <AiOutlineLoading3Quarters /> </p>;
   if (error) return <p>Error loading projects <BiError /></p>;
  return (
    <>
    {Allprojects && <ResponsiveDrawer projects={Allprojects} />}
    <main>
    {children}
    </main>
    </>

  )
}
