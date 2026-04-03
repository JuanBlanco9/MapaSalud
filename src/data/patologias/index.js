import oncologiaConfig from "./oncologia/config";
import diabetes1Config from "./diabetes1/config";

// ── Registry de patologias disponibles ──────────────────────────
export const patologias = [oncologiaConfig, diabetes1Config];

// ── Loader dinamico por ID ──────────────────────────────────────
const loaders = {
  oncologia: {
    tipos: () => import("./oncologia/tipos").then((m) => m.tipos),
    cobertura: () => import("./oncologia/cobertura"),
  },
  diabetes1: {
    tipos: () => import("./diabetes1/tipos").then((m) => m.tipos),
    cobertura: () => import("./diabetes1/cobertura"),
  },
};

export async function cargarPatologia(id) {
  const loader = loaders[id];
  if (!loader) return null;
  const [tipos, cobertura] = await Promise.all([
    loader.tipos(),
    loader.cobertura(),
  ]);
  const config = patologias.find((p) => p.id === id);
  return { config, tipos, ...cobertura };
}
