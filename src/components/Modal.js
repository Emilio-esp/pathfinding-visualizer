import React, {useState} from 'react';
import '../styles/modal.css'

const Modal = () => {
    const [modalShow, setModalShow] = useState(true);
    const [stepTutorial, setStepTutorial] = useState(0);

    const handleCloseModal = () => {
        setModalShow(false)
    }
    const handlePreviusModal = () => {
        
        if (stepTutorial >=1 && stepTutorial <= 4) {
            setStepTutorial(stepTutorial-1)   
            // console.log("clicl prex :" + stepTutorial);
        }else{
            setStepTutorial(0)   
        }
    }
    const handleNextModal = () => {
        
        if (stepTutorial >= 0 && stepTutorial <= 3) {
            setStepTutorial(stepTutorial+1)   
            // console.log("clicl next :" + stepTutorial);
        }
        else {
            setStepTutorial(4)
        }
    }

    const showContentStep = (step)=>{
        let content = [
            `<h3>Bienbenido al Visualizador de Algoritmos de Ruta mas Corta</h3>
                <h6>Este tutorial te guiará a través de todas las características de esta aplicación.</h6>
                <div class="modal-content">
                    <p>Si deseas entrar directamente, presiona el botón "Saltar tutorial". De lo contrario, presiona "Siguiente".</p>
                </div>`,
            `<h3>¿Qué es un algoritmo de búsqueda de ruta?</h3>
            <h6>En esencia, un algoritmo de búsqueda de ruta busca encontrar la ruta más corta entre dos puntos. Esta aplicación muestra el algoritmo de Dijstra en acción.</h6>
            <div class="modal-content">
                <p>El algoritmo de esta aplicación está adaptado para una cuadrícula 2D, donde los giros de 90 grados tienen un "costo" de 1 y los movimientos de un nodo a otro tienen un "costo" de 1.</p>
            </div>`,
            `<h3>Agregar Muros</h3>
            <h6>Haga clic en la cuadrícula para agregar un muro. </h6>
            <div class="modal-content">
                <p>Los muros son impenetrables, lo que significa que un camino no puede cruzarlos.</p>
                <img src="/walls.gif"></img>
            </div>`,
            `<h3>Mover El nodo Inicial y Final</h3>
            <h6>Haga clic en la cuadrícula para Moverlos. </h6>
            <div class="modal-content">
                <p>Puedes Moverlos en cualquier parte de la cuadricula.</p>
                <img src="/moving_start_target.gif"></img>
            </div>`,
            `<h3>Diviertete Creando Laberintos</h3>
            <div class="modal-content">
                <img src="/example.gif"></img>
            </div>`
        ];

        return <div dangerouslySetInnerHTML={{ __html: content[step]}} />
    }

    if (!modalShow) {
        return null
    }
    return (
        <div className="modal-overflow">
            <div className="modal-container">
                {
                    showContentStep(stepTutorial) 
                }
                <div className="modal-btn-container">
                    <button onClick={handleCloseModal}>Saltar Tutorial</button>
                    <div>
                        <button onClick={handlePreviusModal}>Anterior</button>
                        <button onClick={handleNextModal}>Siguiente</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Modal;
