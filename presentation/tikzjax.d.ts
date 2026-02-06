// Definições de tipo para TikZJax
declare global {
  interface Window {
    tikzjax?: {
      process: (element: HTMLElement) => void;
    };
    tikzjaxConfig?: {
      baseUrl?: string;
      pakoUrl?: string;
      coreDumpUrl?: string;
    };
    texWasmPath?: string;
    texDumpPath?: string;
  }
}

export {};
