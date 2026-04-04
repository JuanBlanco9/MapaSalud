import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowLeft, Download, Check, Shield, AlertTriangle, FileText, Phone, Stethoscope, Clock } from "lucide-react";
import { Verificando, mostrarDato } from "./Verificando";
import { DrogaConNivel, PmoTratamientoItem } from "./Badges";
import { nivelStyles, dificultadStyles } from "./estilos";
import { dificultadInfo } from "../../data/dificultadAcceso";
import { getOrganizaciones } from "../../data/organizacionesPorPatologia";
import { generarMapaPDF } from "../../utils/generarPDF";

export default function Paso3Mapa({ os, plan, cancer, subtipo, pmo, getNivelDroga, nivelesInfo, config, onBack, onReset, onIniciarReclamo }) {
  const esPublico = os.id === "hospital_publico";

  return (
    <div className="max-w-4xl mx-auto px-4 pb-12">
      <button onClick={onBack}
        className="flex items-center gap-1.5 text-azul-600 hover:text-azul-700 mb-6 text-sm cursor-pointer bg-transparent border-none">
        <ArrowLeft className="w-4 h-4" /> Cambiar diagnostico
      </button>

      {/* Resumen de seleccion */}
      <div className="bg-azul-700 text-white rounded-xl p-6 mb-8">
        <h2 className="text-2xl font-bold mb-4">Tu mapa personalizado</h2>
        <div className="grid sm:grid-cols-3 gap-4 text-sm">
          <div>
            <p className="text-azul-200 text-xs uppercase tracking-wider mb-1">Cobertura</p>
            <p className="font-semibold">{os.nombre}{plan ? ` — ${plan.nombre}` : ""}</p>
          </div>
          <div>
            <p className="text-azul-200 text-xs uppercase tracking-wider mb-1">Diagnostico</p>
            <p className="font-semibold">{cancer.nombre}</p>
          </div>
          <div>
            <p className="text-azul-200 text-xs uppercase tracking-wider mb-1">Subtipo</p>
            <p className="font-semibold">{subtipo.nombre}</p>
          </div>
        </div>
      </div>

      {/* Seccion A: PMO */}
      <section className="mb-8">
        <h3 className="text-xl font-bold text-azul-700 mb-4 flex items-center gap-2">
          <Shield className="w-5 h-5" /> Lo que te corresponde por ley (PMO)
        </h3>
        <div className="bg-verde-50 border border-verde-200 rounded-lg p-4 mb-4 text-sm text-verde-800">
          <p className="font-semibold mb-1">{pmo.baseLegal}</p>
          <p className="text-verde-700">{pmo.coseguros}</p>
        </div>
        <p className="text-gris-600 text-sm mb-4">
          El Programa Medico Obligatorio establece un piso minimo de cobertura.{" "}
          <strong>Todas las obras sociales y prepagas estan obligadas a cubrirlo.</strong>
        </p>

        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <div className="bg-white border border-gris-200 rounded-xl p-5">
            <h4 className="font-semibold text-gris-800 mb-3">Tratamientos cubiertos por PMO</h4>
            <div className="space-y-2.5">
              {pmo.tratamientos.map((t) => (
                <PmoTratamientoItem key={t.tipo} t={t} />
              ))}
            </div>
          </div>
          <div className="bg-white border border-gris-200 rounded-xl p-5">
            <h4 className="font-semibold text-gris-800 mb-3">Estudios diagnosticos relevantes</h4>
            <div className="space-y-2.5">
              {pmo.estudios
                .filter((e) => {
                  const estudiosDelSubtipo = subtipo.estudios.map((s) => s.toLowerCase());
                  const nombreLower = e.nombre.toLowerCase();
                  return nombreLower.includes("biopsia") || nombreLower.includes("anatomia") ||
                    nombreLower.includes("hba1c") || nombreLower.includes("glucemia") ||
                    estudiosDelSubtipo.some((es) =>
                      nombreLower.includes(es.split(" ")[0].toLowerCase()) ||
                      es.includes(nombreLower.split(" ")[0].toLowerCase())
                    ) || nombreLower.includes("pet") || nombreLower.includes("panel genomico") ||
                    nombreLower.includes("biopsia liquida") || nombreLower.includes("peptido") ||
                    nombreLower.includes("fondo de ojo");
                })
                .map((e) => (
                  <div key={e.nombre} className="flex items-start gap-2">
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                      e.cobertura === "100%" ? "bg-verde-50" : e.cobertura.includes("No incluida") ? "bg-gris-100" : "bg-naranja-50"
                    }`}>
                      {e.cobertura === "100%" ? <Check className="w-3 h-3 text-verde-600" /> : <AlertTriangle className="w-3 h-3 text-naranja-500" />}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gris-800">
                        {e.nombre}{" "}
                        <span className={`text-xs font-semibold px-1.5 py-0.5 rounded ${
                          e.cobertura === "100%" ? "bg-verde-50 text-verde-600" : e.cobertura.includes("No incluida") ? "bg-gris-100 text-gris-500" : "bg-naranja-50 text-naranja-500"
                        }`}>{e.cobertura}</span>
                      </p>
                      {e.nota && <p className="text-xs text-gris-500">{e.nota}</p>}
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </section>

      {/* Seccion B: OS especifica */}
      <section className="mb-8">
        <h3 className="text-xl font-bold text-azul-700 mb-4 flex items-center gap-2">
          <Stethoscope className="w-5 h-5" /> {os.nombre} — cobertura especifica
        </h3>
        {os.alertas && os.alertas.length > 0 && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-4">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="w-4 h-4 text-red-500" />
              <p className="font-semibold text-red-700 text-sm">Alertas reportadas</p>
            </div>
            {os.alertas.map((alerta, i) => <p key={i} className="text-sm text-red-600 ml-6">{alerta}</p>)}
          </div>
        )}
        <div className="bg-white border border-gris-200 rounded-xl p-5">
          <div className="space-y-4">
            <div>
              <p className="font-semibold text-gris-800 mb-1">Cobertura oncologica</p>
              <p className="text-sm text-gris-600">{mostrarDato(os.coberturaOncologica, "Informacion en verificacion")}</p>
              {plan && plan.detalle && <p className="text-sm text-azul-600 mt-1 font-medium">Tu plan: {plan.detalle}</p>}
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-semibold text-gris-700 mb-1">Como autorizar</p>
                <p className="text-sm text-gris-600">{mostrarDato(os.procesoAutorizacion.canal, "Informacion en verificacion")}</p>
              </div>
              <div>
                <p className="text-sm font-semibold text-gris-700 mb-1">Tiempo tipico de respuesta</p>
                <p className="text-sm text-gris-600">{mostrarDato(os.procesoAutorizacion.tiempoTipico, "Informacion en verificacion")}</p>
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-semibold text-gris-700 mb-1">Telefono auditoria medica</p>
                {os.auditoria.telefono ? <p className="text-sm text-azul-600 font-medium">{os.auditoria.telefono}</p> : <Verificando />}
              </div>
              <div>
                <p className="text-sm font-semibold text-gris-700 mb-1">Email auditoria medica</p>
                {os.auditoria.email ? <a href={`mailto:${os.auditoria.email}`} className="text-sm text-azul-600 font-medium no-underline hover:underline">{os.auditoria.email}</a> : <Verificando />}
              </div>
            </div>
            {os.queAprueban.length > 0 && (
              <div>
                <p className="text-sm font-semibold text-gris-700 mb-2">Suelen aprobar sin problemas</p>
                <div className="flex flex-wrap gap-2">
                  {os.queAprueban.map((item) => <span key={item} className="bg-verde-50 text-verde-700 text-xs font-medium px-3 py-1 rounded-full">{item}</span>)}
                </div>
              </div>
            )}
            {os.queNiegan.length > 0 && (
              <div>
                <p className="text-sm font-semibold text-gris-700 mb-2">Suelen negar o demorar</p>
                <div className="flex flex-wrap gap-2">
                  {os.queNiegan.map((item) => <span key={item} className="bg-naranja-50 text-naranja-500 text-xs font-medium px-3 py-1 rounded-full">{item}</span>)}
                </div>
              </div>
            )}
            {os.programaOncologico && (
              <div className="bg-azul-50 border border-azul-100 rounded-lg p-3 text-sm text-azul-700">
                <strong>Programa oncologico:</strong> {os.programaOncologico}
              </div>
            )}
            {esPublico && os.bancoDeDrogas && (
              <div className="bg-gris-50 border border-gris-200 rounded-lg p-3 text-sm text-gris-700">
                <strong>Banco Nacional de Drogas:</strong> {os.bancoDeDrogas}
              </div>
            )}
            {esPublico && os.limitaciones && (
              <div className="bg-naranja-50 border border-naranja-100 rounded-lg p-3 text-sm text-naranja-600">
                <strong>Limitaciones:</strong> {os.limitaciones}
              </div>
            )}
            {esPublico && os.provincialBuenosAires && (
              <div className="bg-azul-50 border border-azul-100 rounded-lg p-3 text-sm text-azul-700">
                <strong>PBA — Drogas Oncologicas:</strong> {os.provincialBuenosAires.telefono} — {os.provincialBuenosAires.direccion} ({os.provincialBuenosAires.horario})
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Seccion C: Tratamientos */}
      <section className="mb-8">
        <h3 className="text-xl font-bold text-azul-700 mb-4 flex items-center gap-2">
          <FileText className="w-5 h-5" /> Tratamientos para {cancer.nombre} — {subtipo.nombre}
        </h3>

        {/* Leyenda cobertura */}
        <div className="grid sm:grid-cols-3 gap-3 mb-6">
          {Object.entries(nivelesInfo).map(([key, info]) => {
            const style = nivelStyles[key];
            return (
              <div key={key} className={`${style.bg} border ${style.border} rounded-lg p-3`}>
                <div className="flex items-center gap-1.5 mb-1">
                  <span className={`w-2 h-2 rounded-full ${style.dot}`} />
                  <span className={`text-xs font-bold ${style.text}`}>{info.label}</span>
                </div>
                <p className={`text-xs ${style.text} opacity-80`}>{info.descripcion}</p>
              </div>
            );
          })}
        </div>

        {/* Leyenda dificultad */}
        <div className="grid sm:grid-cols-3 gap-3 mb-6">
          {Object.entries(dificultadInfo).map(([key, info]) => {
            const style = dificultadStyles[key];
            return (
              <div key={key} className={`${style.split(" ")[0]} rounded-lg p-3`}>
                <div className="flex items-center gap-1.5 mb-1">
                  {key === "directo" && <Check className="w-3.5 h-3.5 text-verde-600" />}
                  {key === "tramite" && <Clock className="w-3.5 h-3.5 text-naranja-500" />}
                  {key === "dificil" && <AlertTriangle className="w-3.5 h-3.5 text-red-500" />}
                  <span className={`text-xs font-bold ${style.split(" ")[1]}`}>{info.label}</span>
                </div>
                <p className={`text-xs ${style.split(" ")[1]} opacity-80`}>{info.descripcion}</p>
              </div>
            );
          })}
        </div>

        <div className="space-y-4">
          {/* Primera linea */}
          <div className="bg-white border border-gris-200 rounded-xl p-5">
            <div className="flex items-center gap-2 mb-3">
              <h4 className="font-semibold text-gris-800">Tratamiento de primera linea</h4>
              <span className="bg-gris-100 text-gris-600 text-xs font-semibold px-2 py-0.5 rounded-full">Estandar NCCN/ESMO</span>
            </div>
            <p className="text-xs text-gris-500 mb-3">Tratamientos recomendados como primera opcion. El nivel de cobertura puede variar por droga.</p>
            <div className="space-y-2">
              {subtipo.primeraLinea.map((t) => <DrogaConNivel key={t} nombre={t} getNivel={getNivelDroga} niveles={nivelesInfo} />)}
            </div>
          </div>

          {/* Terapias dirigidas */}
          <div className="bg-white border border-gris-200 rounded-xl p-5">
            <div className="flex items-center gap-2 mb-3">
              <h4 className="font-semibold text-gris-800">Terapias dirigidas</h4>
            </div>
            <p className="text-xs text-gris-500 mb-3">Segun los biomarcadores de tu tumor. Consulta con tu medico cuales aplican.</p>
            <div className="space-y-2">
              {subtipo.terapiasDirigidas.map((t) => <DrogaConNivel key={t} nombre={t} getNivel={getNivelDroga} niveles={nivelesInfo} />)}
            </div>
          </div>

          {/* Estudios */}
          <div className="bg-white border border-gris-200 rounded-xl p-5">
            <h4 className="font-semibold text-gris-800 mb-3">Estudios que podes pedirle a tu medico</h4>
            <div className="space-y-2">
              {subtipo.estudios.map((e) => (
                <div key={e} className="flex items-start gap-2 bg-gris-50 rounded-lg p-3">
                  <Stethoscope className="w-4 h-4 text-azul-500 shrink-0 mt-0.5" />
                  <span className="text-sm text-gris-700">{e}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Opciones nuevas */}
          {subtipo.opcionesNuevas.length > 0 && (
            <div className="bg-white border border-red-200 rounded-xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <AlertTriangle className="w-4 h-4 text-red-500" />
                <h4 className="font-semibold text-gris-800">Opciones nuevas — requieren gestion</h4>
              </div>
              <p className="text-xs text-gris-500 mb-3">No estan en el vademecum. Necesitan autorizacion especial, carta documento, reclamo SSS, o amparo.</p>
              <div className="space-y-2">
                {subtipo.opcionesNuevas.map((t) => <DrogaConNivel key={t} nombre={t} getNivel={getNivelDroga} niveles={nivelesInfo} />)}
              </div>
            </div>
          )}
        </div>

        {/* Disclaimer provincial */}
        <div className="mt-4 bg-naranja-50 border border-naranja-200 rounded-lg p-4 text-sm text-naranja-600">
          <p className="font-semibold mb-1">Sobre la cobertura provincial (PBA)</p>
          <p>Los medicamentos marcados como "Cubierto en PBA" estan en el listado del IPC Buenos Aires pero no en el vademecum nacional. Si estas en otra provincia, consulta con tu oncologo o la SSS (0800-222-72583).</p>
        </div>
      </section>

      {/* CTA: Me dijeron que NO */}
      <div className="mb-8 bg-red-500 rounded-xl p-5 space-y-3">
        <div className="flex items-center gap-3 text-white">
          <AlertTriangle className="w-6 h-6 shrink-0" />
          <div>
            <p className="font-bold text-lg">Mi obra social me dijo que NO</p>
            <p className="text-red-100 text-sm">Te ayudamos a redactar el reclamo formal o te guiamos paso a paso</p>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <select defaultValue="" onChange={(e) => {
            if (e.target.value) {
              const nivel = getNivelDroga ? getNivelDroga(e.target.value) : "gestion";
              onIniciarReclamo(e.target.value, nivel);
            }
          }} className="flex-1 bg-white text-gris-800 rounded-lg px-4 py-3 text-sm border-none cursor-pointer min-h-[44px]">
            <option value="" disabled>Elegir tratamiento para reclamar...</option>
            {[...subtipo.primeraLinea, ...subtipo.terapiasDirigidas, ...subtipo.opcionesNuevas].map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
          <Link to="/amparo#paso-a-paso" className="inline-flex items-center justify-center gap-2 bg-white/20 hover:bg-white/30 text-white font-medium px-4 py-3 rounded-lg text-sm no-underline min-h-[44px] whitespace-nowrap">
            Ver guia de amparos <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Seccion D: Que hacer si te dicen que no */}
      <section className="mb-8">
        <h3 className="text-xl font-bold text-azul-700 mb-4 flex items-center gap-2">
          <AlertTriangle className="w-5 h-5" /> Si te dicen que no
        </h3>
        <div className="bg-verde-50 border border-verde-200 rounded-xl p-6">
          <p className="text-verde-800 font-semibold text-lg mb-4">Tenes derecho a reclamar. No aceptes un "no" como respuesta final.</p>
          <div className="space-y-4">
            {[
              { n: 1, t: "Pedi la negativa por escrito", d: "Es tu derecho. Si no te la dan, manda un email pidiendo formalmente. Guarda todo." },
              { n: 2, t: "Reclama a la Superintendencia de Servicios de Salud", d: "Llama al 0800-222-72583 o ingresa al sitio web de la SSS. Es gratis." },
              { n: 3, t: "Inicia un amparo de salud", d: "En oncologia los jueces suelen fallar a favor del paciente en 24-72 horas.", link: true },
            ].map((paso) => (
              <div key={paso.n} className="flex items-start gap-3">
                <div className="w-8 h-8 bg-verde-500 text-white rounded-full flex items-center justify-center font-bold text-sm shrink-0">{paso.n}</div>
                <div>
                  <p className="font-semibold text-gris-800">{paso.t}</p>
                  <p className="text-sm text-gris-600">{paso.d}</p>
                  {paso.link && (
                    <Link to="/amparo" className="inline-flex items-center gap-1.5 text-verde-700 font-semibold text-sm mt-2 hover:text-verde-800 no-underline">
                      Ver guia completa de amparos <ArrowRight className="w-4 h-4" />
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Seccion E: Contactos */}
      <section className="mb-8">
        <h3 className="text-xl font-bold text-azul-700 mb-4 flex items-center gap-2">
          <Phone className="w-5 h-5" /> Contactos utiles
        </h3>
        <div className="grid sm:grid-cols-2 gap-4">
          {!esPublico && os.auditoria?.telefono && (
            <div className="bg-white border border-azul-200 rounded-xl p-5">
              <p className="font-semibold text-gris-800 mb-1">Auditoria medica — {os.nombre}</p>
              <p className="text-sm text-gris-600 mb-2">Para autorizar o reclamar tu tratamiento</p>
              <a href={`tel:${os.auditoria.telefono.replace(/[^0-9+]/g, "")}`} className="text-azul-600 font-medium text-sm no-underline">{os.auditoria.telefono}</a>
            </div>
          )}
          {getOrganizaciones(config.id).map((org) => (
            <div key={org.nombre} className="bg-white border border-gris-200 rounded-xl p-5">
              <p className="font-semibold text-gris-800 mb-1">{org.nombre}</p>
              <p className="text-sm text-gris-600 mb-2">{org.descripcion}</p>
              <div className="space-y-1">
                {org.telefono && <a href={`tel:${org.telefono.replace(/[^0-9+]/g, "")}`} className="block text-azul-600 font-medium text-sm no-underline">{org.telefono}</a>}
                {org.whatsapp && <a href={`https://wa.me/${org.whatsapp.replace(/[^0-9]/g, "")}`} target="_blank" rel="noopener noreferrer" className="block text-verde-600 text-sm no-underline">WhatsApp: {org.whatsapp}</a>}
                {org.email && <a href={`mailto:${org.email}`} className="block text-azul-600 text-sm no-underline">{org.email}</a>}
                {org.web && <a href={`https://${org.web}`} target="_blank" rel="noopener noreferrer" className="block text-gris-500 text-sm no-underline">{org.web}</a>}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PDF + reset */}
      <div className="flex flex-col sm:flex-row gap-3 items-center justify-center pt-6 border-t border-gris-200">
        <button onClick={() => generarMapaPDF({ os, plan, cancer, subtipo, pmo })}
          className="inline-flex items-center gap-2 bg-azul-700 hover:bg-azul-800 text-white font-semibold px-6 py-3 rounded-lg transition-colors cursor-pointer text-sm border-none min-h-[44px]">
          <Download className="w-4 h-4" /> Descargar mi mapa (PDF)
        </button>
        <button onClick={onReset}
          className="inline-flex items-center gap-2 bg-gris-100 hover:bg-gris-200 text-gris-700 font-medium px-6 py-3 rounded-lg transition-colors cursor-pointer text-sm border-none min-h-[44px]">
          <ArrowLeft className="w-4 h-4" /> Consultar otra cobertura o diagnostico
        </button>
      </div>
    </div>
  );
}
