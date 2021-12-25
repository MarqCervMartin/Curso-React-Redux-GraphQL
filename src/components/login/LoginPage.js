import React from 'react'
import styles from './login.module.css'
import {connect} from 'react-redux';
import {doGoogleLoginAction, logAuthAction} from '../../redux/userDuck';

function LoginPage({fetching, loggedIn, doGoogleLoginAction, logAuthAction}) {

    function doLogin() {
        doGoogleLoginAction();
    };

    function logOut(){
        logAuthAction();
    }

    if(fetching) return <h2>Cargando.....</h2>
    return (
        <div className={styles.container}>
            {loggedIn ? (
                <>
                    <h1>
                        Cierra tu sesión
                    </h1>
                    <button onClick={logOut}>
                        Cerrar Sesión
                    </button>
                </>
                )
                : (
                    <>
                        <h1>
                            Inicia Sesión con Google
                        </h1>
                        <button onClick={doLogin}>
                            Iniciar
                        </button>
                    </>
                )
            }
        </div>
    )
};

function mapState({user: { fetching, loggedIn }}){
    return {
        fetching,
        loggedIn,
    };
};

export default connect(mapState, {doGoogleLoginAction, logAuthAction})(LoginPage);