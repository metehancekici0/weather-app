import Sidebar from "./components/Sidebar";
import Content from "./components/Content";
import Background from "./components/Background";

function App() {
  return (
    <section className="flex xl:flex-col gap-3 p-10 xl:p-8 lg:p-6 md:p-4 sm:p-2 h-full">
      <Sidebar />
      <Content />
      <Background />
    </section>
  );
}

export default App;
