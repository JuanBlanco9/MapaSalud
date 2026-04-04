import { Link } from "react-router-dom";
import { Shield, FileText, Phone, ArrowRight, TrendingUp } from "lucide-react";

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-azul-700 text-white py-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
            Que cobertura de salud te corresponde?
          </h1>
          <p className="text-lg md:text-xl text-azul-100 mb-8 leading-relaxed">
            MapaSalud te muestra que tratamientos cubre tu obra social,
            que dice la ley, y como reclamar si te lo niegan.
            Gratuito y sin jerga legal.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/cobertura"
              className="inline-flex items-center justify-center gap-2 bg-verde-500 hover:bg-verde-600 text-white font-semibold px-8 py-4 rounded-lg text-lg transition-colors no-underline"
            >
              Consulta tu cobertura
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              to="/amparo"
              className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold px-8 py-4 rounded-lg text-lg transition-colors no-underline border border-white/30"
            >
              Guia de amparos
            </Link>
          </div>
        </div>
      </section>

      {/* Estadisticas de impacto */}
      <section className="bg-azul-800 text-white py-8 px-4">
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <p className="text-2xl md:text-3xl font-bold">10.072</p>
            <p className="text-azul-200 text-sm">amparos de salud en 2024 (Registro SSS)</p>
          </div>
          <div>
            <p className="text-2xl md:text-3xl font-bold">&gt;80%</p>
            <p className="text-azul-200 text-sm">de fallos favorables al paciente (OLEGISAR)</p>
          </div>
          <div>
            <p className="text-2xl md:text-3xl font-bold">103</p>
            <p className="text-azul-200 text-sm">drogas verificadas contra Res. 3377</p>
          </div>
          <div>
            <p className="text-2xl md:text-3xl font-bold">40</p>
            <p className="text-azul-200 text-sm">fallos judiciales citables</p>
          </div>
        </div>
      </section>

      {/* Patologias */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-azul-700 text-center mb-8">
            Que patologia tenes?
          </h2>
          <div className="grid md:grid-cols-2 gap-4 max-w-2xl mx-auto">
            <Link
              to="/cobertura/oncologia"
              className="flex items-center gap-4 bg-white border border-gris-200 rounded-xl p-6 hover:border-azul-500 hover:shadow-md transition-all no-underline group"
            >
              <div className="w-12 h-12 bg-azul-50 rounded-full flex items-center justify-center shrink-0">
                <span className="text-2xl">&#x1F397;</span>
              </div>
              <div>
                <p className="font-bold text-lg text-gris-900 group-hover:text-azul-700">Oncologia</p>
                <p className="text-sm text-gris-500">Cancer de mama, pulmon, colorrectal, prostata, cuello de utero</p>
              </div>
            </Link>
            <Link
              to="/cobertura/diabetes1"
              className="flex items-center gap-4 bg-white border border-gris-200 rounded-xl p-6 hover:border-azul-500 hover:shadow-md transition-all no-underline group"
            >
              <div className="w-12 h-12 bg-azul-50 rounded-full flex items-center justify-center shrink-0">
                <span className="text-2xl">&#x1FA78;</span>
              </div>
              <div>
                <p className="font-bold text-lg text-gris-900 group-hover:text-azul-700">Diabetes Tipo 1</p>
                <p className="text-sm text-gris-500">Insulinas, sensores CGM, bombas de insulina</p>
              </div>
            </Link>
          </div>
          <p className="text-center text-gris-400 text-sm mt-4">
            Proximamente: enfermedades poco frecuentes, reumatologicas, VIH/hepatitis
          </p>
        </div>
      </section>

      {/* Que es MapaSalud */}
      <section className="bg-gris-50 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-azul-700 text-center mb-10">
            Que hace MapaSalud
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-14 h-14 bg-azul-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-7 h-7 text-azul-600" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Tus derechos</h3>
              <p className="text-gris-600">
                Te mostramos que te corresponde por ley segun tu obra social
                y tu diagnostico, basado en normativa y fuentes oficiales.
              </p>
            </div>
            <div className="text-center p-6">
              <div className="w-14 h-14 bg-verde-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="w-7 h-7 text-verde-600" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Cartas de reclamo</h3>
              <p className="text-gris-600">
                Genera modelos de carta documento basados en normativa
                vigente y jurisprudencia verificada. Para revisar y presentar.
              </p>
            </div>
            <div className="text-center p-6">
              <div className="w-14 h-14 bg-naranja-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="w-7 h-7 text-naranja-500" />
              </div>
              <h3 className="font-semibold text-lg mb-2">A quien llamar</h3>
              <p className="text-gris-600">
                Telefonos de auditoria medica de tu OS, organizaciones de
                pacientes, y defensores del pueblo por provincia.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Lo que NO hace */}
      <section className="py-12 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-xl font-bold text-gris-800 text-center mb-6">
            Lo que MapaSalud NO hace
          </h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {[
              "No recomienda tratamientos medicos",
              "No dice si el medico tiene razon o no",
              "No garantiza resultados legales",
              "No almacena datos personales",
            ].map((item) => (
              <div
                key={item}
                className="flex items-start gap-3 bg-gris-50 p-4 rounded-lg"
              >
                <span className="text-gris-400 text-lg leading-none mt-0.5">
                  &times;
                </span>
                <span className="text-gris-600 text-sm">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA final */}
      <section className="bg-azul-700 text-white py-12 px-4 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            La informacion te da herramientas
          </h2>
          <p className="text-azul-100 text-lg mb-8">
            Conocer tus derechos es el primer paso.
          </p>
          <Link
            to="/cobertura"
            className="inline-flex items-center gap-2 bg-verde-500 hover:bg-verde-600 text-white font-semibold px-8 py-4 rounded-lg text-lg transition-colors no-underline"
          >
            Empezar consulta
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
