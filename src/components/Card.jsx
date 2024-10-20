import { useState } from 'react';
import '../styles/Card.css';

const Card = ({ title, questions, setAnswer, isLocked }) => {
    // Estado para almacenar la respuesta seleccionada en esta carta
    const [selectedAnswer, setSelectedAnswer] = useState('');

    // Manejar cuando un radio button cambia de estado
    const handleRadioChange = (e) => {
        const answer = e.target.value; // La respuesta seleccionada
        setSelectedAnswer(answer); // Actualizamos el estado local con la opción seleccionada
        setAnswer(answer); // Enviamos la respuesta al componente padre
    };

    return (
        <div className="Card">
            {questions.length > 0 ? (
                <>
                    <div className='Card-title'>
                        <h4>{title}</h4>
                    </div>
                    <div className='Card-questions'>
                        <ul>
                            {questions.map((question, index) => (
                                <div className="Card-ul" key={index}>
                                    <input
                                        type="radio"
                                        value={question}
                                        checked={selectedAnswer === question} // Verificar si esta opción es la seleccionada
                                        onChange={handleRadioChange} // Manejar el cambio cuando el usuario selecciona una opción
                                        name={`questions-${title}`} // Asegúrate de que el nombre sea único para cada carta
                                        disabled={isLocked} // Deshabilitar si la carta está bloqueada
                                    />
                                    <span>{question}</span>
                                </div>
                            ))}
                        </ul>
                    </div>
                </>
            ) : (
                <p>Cargando preguntas...</p>
            )}
        </div>
    );
};

export default Card;
