import React from "react";
import { useApp } from "../context/AppContext";

const ToastContainer = () => {
  const { toasts, removeToast } = useApp();

  if (!toasts.length) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-3 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => {
        const isSuccess = toast.type === "success";
        const isError = toast.type === "error";

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-center justify-between gap-3 rounded-2xl border px-4 py-3.5 shadow-2xl backdrop-blur-xl transition-all duration-300 animate-slide-up ${
              isSuccess
                ? "border-emerald-500/30 bg-emerald-950/90 text-emerald-100 shadow-emerald-950/40"
                : isError
                ? "border-rose-500/30 bg-rose-950/90 text-rose-100 shadow-rose-950/40"
                : "border-indigo-500/30 bg-slate-900/90 text-slate-100 shadow-slate-950/40"
            }`}
          >
            <div className="flex items-center gap-2.5 text-sm">
              <span>{isSuccess ? "✅" : isError ? "⚠️" : "ℹ️"}</span>
              <span className="font-medium">{toast.message}</span>
            </div>

            <button
              onClick={() => removeToast(toast.id)}
              className="text-slate-400 hover:text-white text-xs p-1"
            >
              ✕
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default ToastContainer;
