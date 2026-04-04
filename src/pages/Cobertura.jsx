import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { cargarPatologia } from "../data/patologias";
import BarraProgreso from "../components/cobertura/BarraProgreso";
import Paso1Cobertura from "../components/cobertura/Paso1Cobertura";
import Paso1Plan from "../components/cobertura/Paso1Plan";
import Paso2Diagnostico from "../components/cobertura/Paso2Diagnostico";
import Paso3Mapa from "../components/cobertura/Paso3Mapa";
import AsistenteReclamo from "../components/AsistenteReclamo";

export default function Cobertura() {
  const { patologiaId } = useParams();
  const [patologia, setPatologia] = useState(null);
  const [loading, setLoading] = useState(true);
  const [paso, setPaso] = useState(1);
  const [os, setOs] = useState(null);
  const [plan, setPlan] = useState(null);
  const [showPlanSelect, setShowPlanSelect] = useState(false);
  const [cancer, setCancer] = useState(null);
  const [subtipo, setSubtipo] = useState(null);
  const [tratamientoReclamo, setTratamientoReclamo] = useState(null);
  const [nivelReclamo, setNivelReclamo] = useState(null);

  useEffect(() => {
    setLoading(true);
    cargarPatologia(patologiaId).then((data) => {
      setPatologia(data);
      setLoading(false);
    });
    setPaso(1); setOs(null); setPlan(null); setShowPlanSelect(false);
    setCancer(null); setSubtipo(null); setTratamientoReclamo(null); setNivelReclamo(null);
  }, [patologiaId]);

  const handleSelectOs = (selectedOs) => {
    setOs(selectedOs);
    if (selectedOs.planes.length > 0) setShowPlanSelect(true);
    else { setPlan(null); setShowPlanSelect(false); setPaso(2); }
  };
  const handleSelectPlan = (selectedPlan) => { setPlan(selectedPlan); setShowPlanSelect(false); setPaso(2); };
  const handleSelectSubtipo = (selectedCancer, selectedSubtipo) => {
    setCancer(selectedCancer); setSubtipo(selectedSubtipo); setPaso(3);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const handleBackToPaso1 = () => { setPaso(1); setOs(null); setPlan(null); setShowPlanSelect(false); };
  const handleBackToPaso2 = () => { setPaso(2); setCancer(null); setSubtipo(null); };
  const handleIniciarReclamo = (tratamiento, nivel) => {
    setTratamientoReclamo(tratamiento); setNivelReclamo(nivel); setPaso(4);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const handleBackToPaso3 = () => { setPaso(3); setTratamientoReclamo(null); setNivelReclamo(null); };
  const handleReset = () => {
    setPaso(1); setOs(null); setPlan(null); setShowPlanSelect(false);
    setCancer(null); setSubtipo(null); setTratamientoReclamo(null); setNivelReclamo(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (loading) return <div className="py-24 text-center text-gris-500">Cargando...</div>;
  if (!patologia) return (
    <div className="py-24 text-center">
      <p className="text-xl text-gris-600 mb-4">Patologia no encontrada</p>
      <Link to="/cobertura" className="text-azul-600 no-underline hover:underline">Volver a seleccion</Link>
    </div>
  );

  const { config, tipos, getNivelDroga, nivelesInfo, pmo } = patologia;
  const pasoActual = showPlanSelect ? 1 : paso;

  return (
    <div>
      <section className="bg-azul-700 text-white py-10 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-3">Tu cobertura — {config.nombre}</h1>
          <p className="text-azul-100 text-lg">
            Contanos tu situacion y te mostramos que te corresponde, como pedirlo, y que hacer si te dicen que no.
          </p>
        </div>
      </section>

      <BarraProgreso paso={pasoActual} />

      {paso === 1 && !showPlanSelect && <Paso1Cobertura onSelect={handleSelectOs} />}
      {paso === 1 && showPlanSelect && os && (
        <Paso1Plan os={os} onSelectPlan={handleSelectPlan} onBack={() => { setShowPlanSelect(false); setOs(null); }} />
      )}
      {paso === 2 && os && (
        <Paso2Diagnostico os={os} plan={plan} tipos={tipos} config={config} onSelectSubtipo={handleSelectSubtipo} onBack={handleBackToPaso1} />
      )}
      {paso === 3 && os && cancer && subtipo && (
        <Paso3Mapa os={os} plan={plan} cancer={cancer} subtipo={subtipo} pmo={pmo}
          getNivelDroga={getNivelDroga} nivelesInfo={nivelesInfo} config={config}
          onBack={handleBackToPaso2} onReset={handleReset} onIniciarReclamo={handleIniciarReclamo} />
      )}
      {paso === 4 && os && cancer && subtipo && tratamientoReclamo && (
        <AsistenteReclamo os={os} plan={plan} cancer={cancer} subtipo={subtipo}
          tratamiento={tratamientoReclamo} nivelCobertura={nivelReclamo}
          patologiaId={patologiaId} onBack={handleBackToPaso3} />
      )}
    </div>
  );
}
