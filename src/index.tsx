import React, { useEffect, useRef, useLayoutEffect, useState } from "react";
const useCustomLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;
const load = (function () {
  return System.import("{{ resourceUrl }}");
})();

export interface BridgeProps {}

export const Bridge = (props: any) => {
  const [loaded, setLoaded] = useState(false);
  const ref = useRef();

  useCustomLayoutEffect(() => {
    load.then((mod: any) => {
      ref.current = mod.default;
      setLoaded(true);
    });
  }, []);

  const Component = ref.current as unknown as React.FC;;

  return loaded && Component ? <Component {...props} /> : null;
};

export default Bridge;
