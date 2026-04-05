import { Component } from "react";
import PropTypes from "prop-types";

export default class ErrorBoundary extends Component {
  state = { hasError: false, error: null };

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    console.error("ErrorBoundary:", error, info.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gris-50 px-4">
          <div className="max-w-md text-center">
            <h1 className="text-2xl font-bold text-gris-800 mb-3">Algo salio mal</h1>
            <p className="text-gris-600 mb-6">
              Ocurrio un error inesperado. Intenta recargar la pagina.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="bg-azul-700 hover:bg-azul-800 text-white font-semibold px-6 py-3 rounded-lg cursor-pointer border-none transition-colors"
            >
              Recargar pagina
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired,
};
