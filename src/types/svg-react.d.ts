// 기본 SVG import (문자열 URL)
declare module "*.svg" {
  const src: string;
  export default src;
}

// ?react 쿼리로 가져오는 경우: React 컴포넌트로 취급
declare module "*.svg?react" {
  import type { FunctionComponent, SVGProps } from "react";
  const ReactComponent: FunctionComponent<SVGProps<SVGSVGElement>>;
  export default ReactComponent;
}
