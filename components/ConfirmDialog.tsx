"use client";

import * as AlertDialog from "@radix-ui/react-alert-dialog";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  title: string;
  description: string;
  confirmLabel?: string;
}

export default function ConfirmDialog({
  open,
  onOpenChange,
  onConfirm,
  title,
  description,
  confirmLabel = "Delete",
}: Props) {
  return (
    <AlertDialog.Root open={open} onOpenChange={onOpenChange}>
      <AlertDialog.Portal>
        <AlertDialog.Overlay className="fixed inset-0 z-50 bg-black/50 data-[state=open]:animate-in" />
        <AlertDialog.Content className="fixed left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2 bg-white rounded-2xl shadow-lg p-6 w-[90vw] max-w-sm">
          <AlertDialog.Title className="text-lg font-semibold text-gray-900 text-balance">
            {title}
          </AlertDialog.Title>
          <AlertDialog.Description className="text-sm text-gray-600 mt-2 text-pretty">
            {description}
          </AlertDialog.Description>
          <div className="flex justify-end gap-3 mt-6">
            <AlertDialog.Cancel asChild>
              <button className="px-4 py-2 text-sm rounded-lg border hover:bg-gray-50 transition">
                Cancel
              </button>
            </AlertDialog.Cancel>
            <AlertDialog.Action asChild>
              <button
                onClick={onConfirm}
                className="px-4 py-2 text-sm rounded-lg bg-red-600 text-white hover:bg-red-700 transition"
              >
                {confirmLabel}
              </button>
            </AlertDialog.Action>
          </div>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
}
