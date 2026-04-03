export const tipos = [
  {
    id: "insulinas",
    nombre: "Insulinas",
    icono: "syringe",
    subtipos: [
      {
        id: "ins_basal",
        nombre: "Insulina basal (lenta)",
        biomarcadores: [],
        primeraLinea: [
          "Insulina Glargina (Lantus, Basaglar, Toujeo)",
          "Insulina Detemir (Levemir)",
        ],
        terapiasDirigidas: [
          "Insulina Degludec (Tresiba)",
        ],
        estudios: [
          "HbA1c (hemoglobina glicosilada) cada 3 meses",
          "Glucemia en ayunas",
          "Perfil lipidico anual",
        ],
        opcionesNuevas: [
          "Insulina semanal (Icodec/Awiqli — no disponible en ARG aun)",
        ],
      },
      {
        id: "ins_rapida",
        nombre: "Insulina rapida (bolo)",
        biomarcadores: [],
        primeraLinea: [
          "Insulina Lispro (Humalog)",
          "Insulina Aspart (NovoRapid)",
          "Insulina Glulisina (Apidra)",
        ],
        terapiasDirigidas: [
          "Insulina Lispro ultrarapida (Lyumjev)",
          "Insulina Aspart ultrarapida (Fiasp)",
        ],
        estudios: [
          "Automonitoreo glucemico (tiras reactivas o sensor continuo)",
          "HbA1c cada 3 meses",
          "Fructosamina (si HbA1c no es confiable)",
        ],
        opcionesNuevas: [],
      },
    ],
  },
  {
    id: "tecnologia",
    nombre: "Tecnologia (sensores y bombas)",
    icono: "cpu",
    subtipos: [
      {
        id: "tec_sensor",
        nombre: "Sensor de glucosa continuo (CGM)",
        biomarcadores: [],
        primeraLinea: [
          "FreeStyle Libre 2 (Abbott) — sensor flash, 14 dias",
          "FreeStyle Libre 3 (Abbott) — sensor continuo, 14 dias",
        ],
        terapiasDirigidas: [
          "Dexcom G6 — sensor continuo con alertas",
          "Dexcom G7 — sensor continuo, mas pequeno",
        ],
        estudios: [
          "Informe de variabilidad glucemica (AGP / Ambulatory Glucose Profile)",
          "Tiempo en rango (TIR) — objetivo > 70%",
          "HbA1c correlacionada con GMI del sensor",
        ],
        opcionesNuevas: [
          "Dexcom ONE+ (version accesible del G7)",
          "Eversense E3 (sensor implantable 6 meses — no disponible en ARG)",
        ],
      },
      {
        id: "tec_bomba",
        nombre: "Bomba de insulina (ISCI)",
        biomarcadores: [],
        primeraLinea: [
          "Medtronic MiniMed 780G (sistema hibrido de asa cerrada)",
          "Medtronic MiniMed 740G",
        ],
        terapiasDirigidas: [
          "Omnipod 5 (bomba sin tubo, asa cerrada con Dexcom)",
          "Tandem t:slim X2 con Control-IQ",
        ],
        estudios: [
          "Evaluacion por equipo de diabetes para indicacion de bomba",
          "Capacitacion en conteo de carbohidratos",
          "HbA1c y registro de hipoglucemias severas",
        ],
        opcionesNuevas: [
          "Omnipod 5 con algoritmo propio (disponibilidad limitada en ARG)",
          "Sistemas DIY de asa cerrada (Loop, AndroidAPS — no aprobados por ANMAT)",
        ],
      },
    ],
  },
  {
    id: "insumos",
    nombre: "Insumos basicos",
    icono: "package",
    subtipos: [
      {
        id: "ins_monitoreo",
        nombre: "Monitoreo glucemico convencional",
        biomarcadores: [],
        primeraLinea: [
          "Glucometro + tiras reactivas (100% cobertura por Ley 23.753)",
          "Lancetas y dispositivo de puncion",
        ],
        terapiasDirigidas: [],
        estudios: [
          "Automonitoreo 4-8 veces/dia (pre y postprandial)",
          "Registro de glucemias para ajuste de dosis",
        ],
        opcionesNuevas: [],
      },
      {
        id: "ins_aplicacion",
        nombre: "Insumos de aplicacion",
        biomarcadores: [],
        primeraLinea: [
          "Agujas para lapiceras de insulina (100% cobertura)",
          "Jeringas de insulina (si no usa lapicera)",
        ],
        terapiasDirigidas: [
          "Sets de infusion para bomba de insulina",
          "Reservorios/cartuchos para bomba",
        ],
        estudios: [],
        opcionesNuevas: [],
      },
    ],
  },
];
