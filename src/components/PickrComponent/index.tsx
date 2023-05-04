import { useEffect, useRef } from "react";
import { JSDOM } from "jsdom";
import Pickr from "@simonwep/pickr";

interface PickrProps {
  initialColor: string;
  onColorSelected: (color: string) => void;
}

const PickrComponent = ({ initialColor, onColorSelected }: PickrProps) => {
  const pickrRef = useRef(null);

  useEffect(() => {
    const setupSimulatedBrowser = () => {
      const dom = new JSDOM("<!DOCTYPE html><html><body></body></html>", {
        url: "http://localhost:3000",
      });
      (global as any).window = dom.window;
      (global as any).document = dom.window.document;
      (global as any).navigator = dom.window.navigator;
    };

    setupSimulatedBrowser();

    const pickr = Pickr.create({
      el: pickrRef.current,
      theme: "nano", // ou outra opção de tema
      default: initialColor,
      components: {
        // Define os componentes que aparecerão no seletor
        preview: true,
        opacity: true,
        hue: true,
        interaction: {
          hex: true,
          rgba: true,
          hsla: true,
          hsva: true,
          cmyk: true,
          input: true,
          clear: true,
          save: true,
        },
      },
    });

    // Define o callback para quando uma cor é selecionada
    pickr.on("save", (color: any, instance: any) => {
      onColorSelected(color.toHEXA().toString());
    });

    // Retorne uma função que será chamada quando o componente for desmontado
    return () => {
      pickr.destroyAndRemove();
    };
  }, []);

  return <div ref={pickrRef}></div>;
};

export default PickrComponent;
