"use client";
 import { useQuery} from 'react-query';
 import { getAllProjects } from '@/app/Service/ProjectServices';
import ResponsiveDrawer from '@/app/components/drawer/Drawer';


function page() {
   const { data: Allprojects} = useQuery('Allprojects', getAllProjects);
  return (
    <>
    <ResponsiveDrawer projects={Allprojects}/>
    </>
  )
}

export default page