import { useState, useRef, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import { Check, Eraser, PenTool } from "lucide-react";

export default function PanelFirma({ onFirmaChange }) {
  const canvasRef = useRef(null);
  const [drawing, setDrawing] = useState(false);
  const [hasFirma, setHasFirma] = useState(false);

  const getPos = useCallback((e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    return {
      x: (clientX - rect.left) * (canvas.width / rect.width),
      y: (clientY - rect.top) * (canvas.height / rect.height),
    };
  }, []);

  const startDraw = useCallback((e) => {
    e.preventDefault();
    const ctx = canvasRef.current.getContext("2d");
    const pos = getPos(e);
    ctx.beginPath();
    ctx.moveTo(pos.x, pos.y);
    setDrawing(true);
  }, [getPos]);

  const draw = useCallback((e) => {
    if (!drawing) return;
    e.preventDefault();
    const ctx = canvasRef.current.getContext("2d");
    const pos = getPos(e);
    ctx.lineTo(pos.x, pos.y);
    ctx.stroke();
  }, [drawing, getPos]);

  const endDraw = useCallback(() => {
    if (!drawing) return;
    setDrawing(false);
    setHasFirma(true);
    onFirmaChange(canvasRef.current.toDataURL("image/png"));
  }, [drawing, onFirmaChange]);

  const limpiar = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setHasFirma(false);
    onFirmaChange(null);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.strokeStyle = "#1a1a1a";
    ctx.lineWidth = 2;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
  }, []);

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <label className="text-sm font-medium text-gris-700 flex items-center gap-1.5">
          <PenTool className="w-4 h-4" />
          Firma (opcional)
        </label>
        {hasFirma && (
          <span className="text-xs text-verde-600 font-medium flex items-center gap-1">
            <Check className="w-3 h-3" /> Firma agregada
          </span>
        )}
      </div>
      <div className="relative border border-gris-200 rounded-lg bg-white overflow-hidden">
        {!hasFirma && !drawing && (
          <p className="absolute inset-0 flex items-center justify-center text-gris-300 text-sm pointer-events-none select-none">
            Firma aqui
          </p>
        )}
        <canvas
          ref={canvasRef}
          width={800}
          height={300}
          className="w-full h-[150px] touch-none cursor-crosshair"
          onMouseDown={startDraw}
          onMouseMove={draw}
          onMouseUp={endDraw}
          onMouseLeave={endDraw}
          onTouchStart={startDraw}
          onTouchMove={draw}
          onTouchEnd={endDraw}
        />
      </div>
      {hasFirma && (
        <button
          type="button"
          onClick={limpiar}
          className="flex items-center gap-1.5 text-gris-500 hover:text-gris-700 text-xs mt-2 cursor-pointer bg-transparent border-none"
        >
          <Eraser className="w-3 h-3" /> Borrar firma
        </button>
      )}
      <p className="text-xs text-gris-400 mt-1">
        Tu firma se usa unicamente para generar el documento. No se almacena en ningun servidor.
      </p>
    </div>
  );
}

PanelFirma.propTypes = {
  onFirmaChange: PropTypes.func.isRequired,
};
