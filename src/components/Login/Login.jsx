import styles from './Login.module.css';
import { Button } from "@material-ui/core";
import { auth, provider } from '../../firebase';

function Login() {

    const signIn = () => {
        auth.signInWithPopup(provider).catch((err) => {
            alert(err.message)
        })
    }

    return (
        <div className={styles.Login}>
                <img 
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Telegram_2019_Logo.svg/512px-Telegram_2019_Logo.svg.png?20220331104809"
                    alt="messenger icon"
                    className={styles.Logo}
                />
                <h1 className={styles.Text}>Messenger App</h1>
            <Button
                onClick={signIn}
                className={styles.Button}>Sign in</Button>
        </div>
    )
}

export default Login;