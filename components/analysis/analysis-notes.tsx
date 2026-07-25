import { InfoIcon } from "@/components/icons/icons";
import { Panel } from "@/components/panels/panel";

type AnalysisNotesProps = {
  disclaimer: string;
  framingNotes: string;
  loadedTerms: readonly string[];
};

export function AnalysisNotes({
  disclaimer,
  framingNotes,
  loadedTerms,
}: AnalysisNotesProps) {
  return (
    <Panel
      id="bias-methodology"
      className="scroll-mt-28"
      contentClassName="p-5 sm:p-6"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-[9px] font-semibold tracking-[0.11em] text-text-secondary uppercase">
            Evidence &amp; limitations
          </p>
          <h2 className="mt-1 text-[19px] leading-tight font-bold tracking-[-0.03em]">
            Analysis notes
          </h2>
        </div>
        <InfoIcon className="mt-0.5 size-4 shrink-0 text-text-secondary" />
      </div>

      <section className="mt-5" aria-labelledby="framing-notes-title">
        <h3
          id="framing-notes-title"
          className="text-[10px] font-semibold text-text-primary"
        >
          Bias notes
        </h3>
        <p className="mt-2 text-[11px] leading-[1.7] text-text-secondary">
          {framingNotes}
        </p>
      </section>

      <section
        className="mt-5 border-t border-divider pt-5"
        aria-labelledby="loaded-terms-title"
      >
        <h3
          id="loaded-terms-title"
          className="text-[10px] font-semibold text-text-primary"
        >
          Notable terms
        </h3>
        {loadedTerms.length > 0 ? (
          <ul className="mt-3 flex flex-wrap gap-2">
            {loadedTerms.map((term) => (
              <li
                key={term}
                className="rounded-[var(--radius-full)] border border-border bg-canvas px-2.5 py-1 text-[9px] text-text-secondary"
              >
                {term}
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-2 text-[10px] text-text-muted">
            No notable loaded terms detected in this demo.
          </p>
        )}
      </section>

      <section
        className="mt-5 border-t border-divider pt-5"
        aria-labelledby="limitations-title"
      >
        <h3
          id="limitations-title"
          className="text-[10px] font-semibold text-text-primary"
        >
          Limitations
        </h3>
        <p className="mt-2 text-[10px] leading-[1.7] text-text-muted">
          {disclaimer}
        </p>
      </section>
    </Panel>
  );
}
