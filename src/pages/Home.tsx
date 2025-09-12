import ImcForm from "../components/forms/ImcForm.tsx";
import ImcVisualForm from "../components/forms/ImcVisualForm";

const Home: React.FC = () => {
    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-lg-8">
                    <div className="text-center mb-4">
                        <h1 className="display-4 text-primary mb-3">
                            Calcula tu Índice de Masa Corporal (IMC)
                        </h1>
                        <p className="lead text-muted">
                            Tu IMC puede ser una medida inicial útil para identificar tu clasificación de peso y tus factores de riesgo de obesidad.
                        </p>
                    </div>
                    <ImcVisualForm />
                </div>
            </div>
        </div>
    );
};

export default Home;