import { Link } from "react-router-dom";
import { Shield, FileText, Phone, ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-azul-700 text-white py-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            Tenes cancer y tu obra social te niega el tratamiento?
          </h1>
          <p className="text-xl text-azul-100 mb-8 leading-relaxed">
            MapaSalud te explica tus derechos, que te corresponde por ley, y
            como conseguirlo. Gratis, claro, y sin jerga legal.
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

      {/* Que es MapaSalud */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-azul-700 text-center mb-12">
            Que es MapaSalud
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-14 h-14 bg-azul-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-7 h-7 text-azul-600" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Tus derechos</h3>
              <p className="text-gris-600">
                Te explicamos que te corresponde por ley segun tu obra social y
                tu diagnostico.
              </p>
            </div>
            <div className="text-center p-6">
              <div className="w-14 h-14 bg-verde-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="w-7 h-7 text-verde-600" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Paso a paso</h3>
              <p className="text-gris-600">
                Modelos de carta documento, guia de amparo, y documentacion
                necesaria lista para usar.
              </p>
            </div>
            <div className="text-center p-6">
              <div className="w-14 h-14 bg-naranja-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="w-7 h-7 text-naranja-500" />
              </div>
              <h3 className="font-semibold text-lg mb-2">A quien llamar</h3>
              <p className="text-gris-600">
                Telefonos de organizaciones que te ayudan gratis: LALCEC, FUCA,
                defensores del pueblo.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Lo que NO hace */}
      <section className="bg-gris-50 py-12 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-gris-800 text-center mb-6">
            Lo que MapaSalud NO hace
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              "No recomienda tratamientos medicos",
              "No dice si el medico tiene razon o no",
              "No garantiza resultados legales",
              "No almacena datos personales del usuario",
            ].map((item) => (
              <div
                key={item}
                className="flex items-start gap-3 bg-white p-4 rounded-lg border border-gris-200"
              >
                <span className="text-gris-400 text-lg leading-none mt-0.5">
                  &times;
                </span>
                <span className="text-gris-600">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold text-azul-700 mb-4">
            La informacion es tu mejor herramienta
          </h2>
          <p className="text-gris-600 text-lg mb-8">
            Selecciona tu obra social y tu diagnostico, y te mostramos que te
            corresponde y como conseguirlo.
          </p>
          <Link
            to="/cobertura"
            className="inline-flex items-center gap-2 bg-azul-700 hover:bg-azul-800 text-white font-semibold px-8 py-4 rounded-lg text-lg transition-colors no-underline"
          >
            Empezar consulta
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
