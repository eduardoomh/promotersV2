import * as React from 'react'
import CustomButton from "../Button"
import styles from './EmailComponent.module.css'

interface props {
    email: string;
    url: string;
}

export const EmailTemplate: React.FC<Readonly<props>> = ({ email, url }) => (
    <div style={{
        padding: '2rem',
        backgroundColor: '#fff'
    }}>
        <div style={{
            display: 'flex',
            height: '100px',
            padding: '16px 24px',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '24px',
            flexShrink: 0,
            marginBottom: '24px',
        }}>
            <img src="https://shop.chamarra.com/wp-content/uploads/2022/02/Logo-Chamosa.png" alt="Mi Imagen" width={113} />
        </div>
        <h1 style={{
            color: '#000',
            textAlign: 'center',
            fontSize: '26px',
            fontStyle: 'normal',
            fontWeight: '700',
            lineHeight: 'normal',
            marginBottom: '24px',
        }}>SISTEMA DE PROMOTORES</h1>

        <h2 style={{
            color: '#000',
            textAlign: 'center',
            fontSize: '20px',
            fontStyle: 'normal',
            fontWeight: '700',
            lineHeight: 'normal',
        }}>CAMBIO DE CONTRASEÑA</h2>
        <br />
        <p style={{
            display: 'flex',
            justifyContent: 'center',
            textAlign: 'center',
            fontSize: '16px'
        }}>
            Hola <strong style={{
                marginLeft: '5px'
            }}>{email}</strong>
        </p>
        <br />
        <p style={{
            display: 'flex',
            justifyContent: 'center',
            textAlign: 'center',
            fontSize: '16px'
        }}>
            Hemos recibido una solicitud para restablecer tu contraseña. Por favor, haz clic en el enlace proporcionado para ser redirigido al sistema de promotores y proceder con la reasignación de una nueva contraseña.
        </p>
        <br />
        <p style={{
            display: 'flex',
            justifyContent: 'center',
            textAlign: 'center',
            fontSize: '16px'
        }}>
            Si no has realizado esta solicitud, te pedimos que la ignores y contactes con nuestro equipo de soporte de Chamarras Monterrey para cualquier asistencia adicional.
        </p>
        <div style={{
            marginTop: '28px'
        }}>
            <button style={{
                backgroundColor: '#EC1912',
                color: 'white',
                width: '100%',
                height: '36px',
                fontSize: ' 1.2rem',
                borderRadius: '6px',
                transition: 'background-color 0.3s ease',
                border: 'none',
            }}>
                <a 
                href={url}
                style={{
                    color: 'white',
                    width: '100%',
                    height: '36px',
                    padding: '16px',
                    textDecoration: 'none'
                }}
                >REASIGNAR CONTRASEÑA</a>
            </button>
        </div>
    </div>
)
