import En from "./content.en";
import De from "./content.de";
import Fr from "./content.fr";
import It from "./content.it";

export { generateMetadata } from "./content.en";

type Props = Parameters<typeof En>[0];

const CONTENT: Record<string, typeof En> = { en: En, de: De, fr: Fr, it: It };

// One content file per language with identical markup; only the copy differs.
export default async function Page(props: Props) {
  const { locale } = await props.params;
  const Content = CONTENT[locale] ?? En;
  return <Content {...props} />;
}
