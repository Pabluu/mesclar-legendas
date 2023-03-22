import Button from "./Button";
import Header from "./Header";
import SectionInput from "./SectionInput";
import Section from "./Section";

function App() {
  return (
    <>
      <Header />
      <main>
        <Section id="ipt-file">
          <SectionInput
            id="priFile"
            className="secoes"
            textolabel="Selecione o 1º Arquivo"
            idlabel="pl"
            forlabel="pf"
          />
          <hr id="sep" />
          <SectionInput
            id="secFile"
            className="secoes"
            textolabel="Selecione o 2º Arquivo"
            idlabel="sl"
            forlabel="sf"
          />
        </Section>

        <Section id="btn">
          <Button className="button-mesclar"></Button>
        </Section>
      </main>

      <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"></script>
      <script src="https://html2canvas.hertzen.com/dist/html2canvas.min.js"></script>

      <script src="index.js"></script>
    </>
  );
}

export default App;
