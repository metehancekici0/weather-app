import Background from "./components/Background";
import Content from "./components/Content";
import Sidebar from "./components/Sidebar";

function App() {
  return (
    <section className="flex gap-3 p-10 h-full">
      <Sidebar />
      <Content />
      <Background />
    </section>
  );
}

export default App;
