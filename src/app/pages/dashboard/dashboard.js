import React, { useState } from 'react';
import './dashboard.css';
import { notificationsService } from '../../services';
// const CHANNELS = {
//     twilio: 1,
//     aws: 2
// };
const EmailPage = () => {
    const [to, setTo] = useState('test@test.com');
    const [subject, setSubject] = useState('test');
    const [text, setText] = useState('hola');
    const [toError, setToError] = useState('');
    const [subjectError, setSubjectError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [emailSent, setEmailSent] = useState(false);

    const validateEmail = (email) => {
    // Expresión regular para validar una dirección de correo electrónico
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleSendEmail = async () => {
        if (!validateEmail(to)) {
            setToError('Dirección de correo electrónico no válida');
            return;
        }

        const data = {
            // idChannel: CHANNELS.twilio,
            metadata: {
                subject,
                to,
                text
            }
        };
        setIsLoading(true);
        return await notificationsService.sendEmail(data)
            .then((response) => {
                // eslint-disable-next-line no-console,
                console.log('response: ', response);
                // alert('Correo enviado!');

                setEmailSent(true);
                // TODO limpiar los states
            })
            .catch((error) => {
                const data = error?.response?.data;
                alert(data.error);
            })
            .finally(() => {
                setIsLoading(false);
                setTimeout(() => {
                    setEmailSent(false);
                }, 1500);
                setTo('');
                setSubject('');
                setText('');
            });
    };

    return (
        <div className="email-page">
            <h1>Enviar Correo Electrónico</h1>
            <div>
                <label htmlFor="to">Para:</label>
                <input
                    type="text"
                    id="to"
                    value={to}
                    onChange={(e) => {
                        setTo(e.target.value);
                        setToError('');
                    }}
                />
                {toError && <div className="error">{toError}</div>}
            </div>
            <div>
                <label htmlFor="Asunto">Asunto:</label>
                <input
                    type="text"
                    id="asunto"
                    value={subject}
                    onChange={(e) => {
                        setSubject(e.target.value);
                        setSubjectError('');
                    }}
                />
                {subjectError && <div className="error">{subjectError}</div>}
            </div>
            <div>
                <label htmlFor="text">Texto:</label>
                <textarea
                    id="text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                />
            </div>
            {emailSent && (
                <div className="alert alert-success" role="alert">
                    ¡Correo enviado correctamente!
                </div>
            )}

            { isLoading
                ? <button className="btn btn-primary" type="button" disabled>
                    <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true" />
                    {' Enviando...'}
                </button>
                : <button type="button" className="btn btn-primary" onClick={handleSendEmail}>
                Enviar
                </button>
            }
        </div>
    );
};

export default EmailPage;
