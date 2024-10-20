import '../styles/LandingPage.css';
import '../scripts/landingPageAnimations';

const LandingPage = ({ name, setName }) => {
    const registerName = (event) => {
        // Log para depuración
        console.log("Key pressed:", event.key); 
        // Detecta si se presionó "Enter"
        if (event.key === "Enter") {
            console.log("Enter key detected");
            event.preventDefault(); // Evita el envío del formulario
            const inputElement = document.querySelector("#username");
            if (inputElement) {
                setName(inputElement.value); // Registra el nombre
                console.log(inputElement.value); // Muestra el nombre registrado
            }
        }
    };

    return (
        <>
            <div className="landingPage">
                <div className='landingPage-h1'>
                    <div>
                        <h1 className='landingPage-first-h1'>WELCOME</h1>
                        <div className='landingPage-input'>
                            <h1 className='landingPage-second-h1'>TO THE</h1>
                            <form onSubmit={(e) => e.preventDefault()}> {/* Previene el envío del formulario */}
                                <input
                                    type="text"
                                    id="username"
                                    onKeyDown={registerName} // Asegúrate de que el ID coincide
                                    className='styled-input'
                                    placeholder="Escribe tu nombre..."
                                    autoFocus // Esto asegura que el input esté enfocado al cargar
                                />
                            </form>
                        </div>
                    </div>
                    <div>
                        <h1 className='landingPage-third-h1'>TOURNAMENT</h1>
                    </div>
                </div>
            </div>
        </>
    );
};

export default LandingPage;
