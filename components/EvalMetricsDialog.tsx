"use client";

import * as AlertDialog from "@radix-ui/react-alert-dialog";
import { Loader2 } from "lucide-react";

interface EvalData {
  context_relevance: number;
  answer_faithfulness: number;
  answer_relevance: number;
  total_claims: number;
  faithful_claims: number;
  relevant_sentences: number;
  total_sentences: number;
  analysis: string;
}

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  metrics: EvalData | null;
  loading: boolean;
}

function MetricBar({ label, value }: { label: string; value: number }) {
  const pct = Math.round(value * 100);
  const color =
    pct >= 80 ? "bg-green-500" : pct >= 50 ? "bg-amber-500" : "bg-red-500";

  return (
    <div className="space-y-1">
      <div className="flex justify-between text-xs md:text-sm">
        <span className="text-gray-600">{label}</span>
        <span className="font-semibold text-gray-800">{pct}%</span>
      </div>
      <div className="h-2 rounded-full bg-gray-100 overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-500 ${color}`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

export default function EvalMetricsDialog({
  open,
  onOpenChange,
  metrics,
  loading,
}: Props) {
  return (
    <AlertDialog.Root open={open} onOpenChange={onOpenChange}>
      <AlertDialog.Portal>
        <AlertDialog.Overlay className="fixed inset-0 z-50 bg-black/50" />
        <AlertDialog.Content className="fixed left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2 bg-white rounded-2xl shadow-lg p-6 w-[90vw] max-w-md">
          <AlertDialog.Title className="text-lg font-semibold text-gray-900 text-balance">
            Evaluation Metrics
          </AlertDialog.Title>
          <AlertDialog.Description className="text-xs text-gray-500 mt-1">
            RAG pipeline quality assessment
          </AlertDialog.Description>

          <div className="mt-4">
            {loading ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="size-6 animate-spin text-blue-600" />
                <span className="ml-2 text-sm text-gray-500">Evaluating...</span>
              </div>
            ) : metrics ? (
              <div className="space-y-4">
                <div className="space-y-3">
                  <MetricBar label="Context Relevance" value={metrics.context_relevance} />
                  <MetricBar label="Answer Faithfulness" value={metrics.answer_faithfulness} />
                  <MetricBar label="Answer Relevance" value={metrics.answer_relevance} />
                </div>

                <div className="grid grid-cols-3 gap-3 pt-2">
                  <div className="text-center p-2 rounded-lg bg-gray-50">
                    <div className="text-lg font-bold text-gray-800">{metrics.faithful_claims}/{metrics.total_claims}</div>
                    <div className="text-[10px] text-gray-500">Faithful Claims</div>
                  </div>
                  <div className="text-center p-2 rounded-lg bg-gray-50">
                    <div className="text-lg font-bold text-gray-800">{metrics.relevant_sentences}/{metrics.total_sentences}</div>
                    <div className="text-[10px] text-gray-500">Relevant Sent.</div>
                  </div>
                  <div className="text-center p-2 rounded-lg bg-gray-50">
                    <div className="text-lg font-bold text-gray-800">{Math.round(metrics.context_relevance * 100)}%</div>
                    <div className="text-[10px] text-gray-500">Context Rel.</div>
                  </div>
                </div>

                {metrics.analysis && (
                  <div className="text-xs text-gray-500 italic border-t pt-3 mt-1">
                    {metrics.analysis}
                  </div>
                )}
              </div>
            ) : (
              <p className="text-sm text-gray-400 text-center py-4">
                Failed to load metrics
              </p>
            )}
          </div>

          <div className="flex justify-end mt-6">
            <AlertDialog.Action asChild>
              <button className="px-4 py-2 text-sm rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition">
                Close
              </button>
            </AlertDialog.Action>
          </div>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
}
