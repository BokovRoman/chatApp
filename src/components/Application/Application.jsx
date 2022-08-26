import Sidebar from "../Sidebar/Sidebar";
import Thread from "../Thread/Thread";
import styles from './Application.module.css';


function Application() {
  return (
    <div className={styles.Container}>
      <Sidebar />
      <Thread/>
    </div>
  )
}

export default Application;