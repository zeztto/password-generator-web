import { PasswordGenerator } from "./components/PasswordGenerator";

export default function App() {
  return (
    <div className="size-full flex items-start justify-center bg-background p-4 py-12 md:py-8">
      <PasswordGenerator />
    </div>
  );
}