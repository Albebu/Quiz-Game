import React, { useEffect, useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import Card from './Card';
import '../styles/mainGame.css';

const MainGame = ({ name }) => {
    const [preguntas, setPreguntas] = useState([]);
    const [selectedCards, setSelectedCards] = useState([]);
    const [selectedAnswers, setSelectedAnswers] = useState({});
    const [lockedCards, setBlockedCards] = useState([]);
    const [totalAnswers, setTotalAnswers] = useState({
        correct: 0,
        incorrect: 0 
    });
    const [lose, setLose] = useState(false);

    useEffect(() => {
        const getQuestions = async () => {
            const respuesta = await fetch('/data/db.json'); 
            const data = await respuesta.json();
            setPreguntas(data);
        };

        getQuestions();
    }, []);

    const generateCards = () => {
        // Filtrar preguntas para evitar las bloqueadas
        const availableQuestions = preguntas.filter(
            question => !lockedCards.includes(question.question)
        );

        if (availableQuestions.length < 2) return;

        const randomIndexes = [];
        while (randomIndexes.length < 2) {
            const randomIndex = Math.floor(Math.random() * availableQuestions.length);
            if (!randomIndexes.includes(randomIndex)) {
                randomIndexes.push(randomIndex);
            }
        }

        const newCards = randomIndexes.map(index => availableQuestions[index]);
        setSelectedCards((prevCards) => [...prevCards, ...newCards]);
        setSelectedAnswers({});
    };

    const handleAnswerSelection = (question, answer) => {
        setSelectedAnswers((prevAnswers) => ({
            ...prevAnswers,
            [question]: answer,
        }));
    };

    const handleButtonClick = () => {
        setTotalAnswers(prevState => {
            const newTotalAnswers = { ...prevState };

            selectedCards.forEach(card => {
                if (selectedAnswers[card.question] === card.correct_answer) {
                    newTotalAnswers.correct += 1;
                } else {
                    newTotalAnswers.incorrect += 1;
                }
                setBlockedCards(prevBlocked => [...prevBlocked, card.question]);
            });

            return newTotalAnswers;
        });

        // Use a callback to ensure the state is updated before checking the condition
        setTotalAnswers(prevState => {
            if (prevState.incorrect > lockedCards.length + 3) {
                setLose(true);
            }
            console.log('Total incorrect: ', prevState.incorrect);
            console.log('Locked Cards length + 3: ', lockedCards.length + 3);
            console.log(prevState.incorrect > lockedCards.length + 3);

            return prevState;
        });

        generateCards();
    };

    useEffect(() => {
        if (preguntas.length > 10 && selectedCards.length === 0) {
            generateCards();
        }
    }, [preguntas, selectedCards]);

    // Llama a downloadData solo cuando 'lose' cambia a true.
useEffect(() => {
    if (lose) {
        downloadData();  // Llama a la función para descargar los datos solo una vez
        document.body.style.overflow = 'hidden';  // Bloquear scroll
    }
}, [lose]);

// Función para descargar los datos cuando el jugador pierde
const downloadData = () => {
    const data = {
        username: name,
        correct: totalAnswers.correct,
        incorrect: totalAnswers.incorrect - lockedCards.length,  // Restamos las preguntas bloqueadas
    };
    const jsonData = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'game_data.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
};

// Función para renderizar la pantalla de derrota o victoria
const loseGame = () => {
    if (lose) {
        return (
            <div className='MainGame-lose'>
                <h2>{totalAnswers.incorrect === 0 ? 'Has ganado!' : 'Has perdido.'}</h2>
                <h4 id='losed-name'>Username: {name}</h4>
                <p>Correct answers: {totalAnswers.correct}</p>
                <p>Incorrect answers: {totalAnswers.incorrect}</p>
                <img src="loser.jpg" alt="Perdiste" />
            </div>
        );
    }
    return null;  // Si no ha perdido, no renderiza nada
};


    return (
        <div className='MainGame'>
            <h1 className='MainGame-h1'>Preguntas</h1>
            <>
                {loseGame()}
            </>
            <div className='MainGameContainer'>
                {preguntas.length > 0 ? (
                    <>
                        <div className='column'>
                            {selectedCards.length > 0 && selectedCards.map((card, index) => (
                                <Card
                                    key={index}
                                    correct_answer={card.correct_answer}
                                    setAnswer={(answer) => handleAnswerSelection(card.question, answer)}
                                    title={card.question}
                                    questions={card.options}
                                    isLocked={lockedCards.includes(card.question)}
                                />
                            ))}
                        </div>
                        <div className='MainGame-button'>
                            <button onClick={handleButtonClick}>Generar Cartas</button>
                        </div>
                    </>
                ) : (
                    <p className='MainGame-p'>Cargando preguntas...</p>
                )}
            </div>
            <Footer />
        </div>
    );
};

export default MainGame;
