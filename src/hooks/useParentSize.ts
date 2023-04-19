import { useEffect, useState, useRef } from 'react';

const useParentSize = () => {
  const ref = useRef(null);
  const [size, setSize] = useState({ width: 1, height: 1 });

  useEffect(() => {
    if (ref.current) {
      const container = ref.current.parentElement;
      setSize({
        width: container.clientWidth,
        height: container.clientHeight,
      });

      const resizeObserver = new ResizeObserver(() => {
        setSize({
          width: container.clientWidth,
          height: container.clientHeight,
        });
      });

      resizeObserver.observe(container);

      return () => {
        resizeObserver.disconnect();
      };
    }
  }, [ref]);

  return { ref, size };
};

export default useParentSize;
