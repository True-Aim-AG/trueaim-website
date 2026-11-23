import En from "./content.en";

type Props = Parameters<typeof En>[0];

// English only for now; German, French and Italian content files arrive with the translation.
export default async function Page(props: Props) {
  return <En {...props} />;
}
