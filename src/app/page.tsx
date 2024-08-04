import Buttoon from "@/components/Button-signin-signup/Button";
import styles from "./page.module.css";


export default function Home() {
  return (<>
 
   <h1>Welcome Home pag</h1>
   <Buttoon text="Sign up" variat="contained"/>

   <Buttoon text="Sign in" variat="contained"/>

   </>
  );
}
