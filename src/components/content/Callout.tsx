/** One large statement, centred. */
export function Callout({ text }: { text: string }) {
  return (
    <section className="py-12 px-6">
      <p className="font-display text-3xl md:text-[36px] font-bold text-strong text-center max-w-3xl mx-auto leading-[1.2]">
        {text}
      </p>
    </section>
  );
}
