import { Navigation } from "./Navigation";

const navItems = [
  { label: "Главная", href: "/" },
  {
    label: "Генерация изображений",
    href: "/fingerprint-generator-by-params",
  },
  { label: "Поиск схожего отпечатка пальца", href: "/fingerprint-match" },
];

export default function Header() {
  return (
    <header>
      <nav>
        <Navigation navItems={navItems} />
      </nav>
    </header>
  );
}
