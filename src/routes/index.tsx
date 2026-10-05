import { createFileRoute } from "@tanstack/react-router";
import { CosmicPortfolio } from "@/components/CosmicPortfolio";

export const Route = createFileRoute("/")({
  ssr: false,
  head: () => ({ meta: [
    { title: "Abhinav Byju — Researcher, Designer & Maker" },
    { name: "description", content: "The cosmic portfolio of Abhinav Byju — exploring quantum physics, design, consciousness and things built by hand." },
    { property: "og:title", content: "Abhinav Byju — Between the Measurable and the Mysterious" },
    { property: "og:description", content: "Research, design, prototypes, books and ideas from Kerala, India." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ]}),
  component: Index,
});

function Index() {
  return <CosmicPortfolio />;
}
