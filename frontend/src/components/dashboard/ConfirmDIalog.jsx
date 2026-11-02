function ConfirmDialog({
  open,
  title,
  message,
  confirmLabel = "Confirm",
  onConfirm,
  onCancel,
  loading = false,
}) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 px-4 backdrop-blur-sm"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget && !loading) {
          onCancel();
        }
      }}
    >
      <div
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="confirm-dialog-title"
        aria-describedby="confirm-dialog-message"
        className="w-full max-w-md rounded-2xl border border-white/10 bg-[#191919] p-6 shadow-2xl"
      >
        <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-red-500/10 text-red-400">
          <span className="text-xl">!</span>
        </div>

        <h2
          id="confirm-dialog-title"
          className="text-lg font-semibold text-white"
        >
          {title}
        </h2>

        <p
          id="confirm-dialog-message"
          className="mt-2 text-sm leading-6 text-neutral-400"
        >
          {message}
        </p>

        <div className="mt-7 flex justify-end gap-3">
          <button
            type="button"
            onClick={onCancel}
            disabled={loading}
            className="rounded-lg border border-white/10 px-4 py-2.5 text-sm font-medium text-neutral-300 transition hover:bg-white/[0.06] disabled:opacity-50"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={onConfirm}
            disabled={loading}
            className="rounded-lg bg-[#E50914] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#c90812] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Please wait..." : confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmDialog;
