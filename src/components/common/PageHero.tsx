import { Container } from "./Container";

interface PageHeroProps {
  title: string;
  description: string;
}

export function PageHero({ title, description }: PageHeroProps): React.JSX.Element {
  return (
    <section className="bg-primary-800 py-16 text-white sm:py-20">
      <Container>
        <h1 className="text-4xl font-bold sm:text-5xl">{title}</h1>
        <p className="mt-4 max-w-2xl text-primary-100">{description}</p>
      </Container>
    </section>
  );
}
