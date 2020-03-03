import { useEffect } from "react";

const listeners = [];
const useUpdate = callback => {
  useEffect(() => {
    if (!listeners.includes(callback) && typeof callback === "function") {
      listeners.push(callback);
    }

    return () => {
      if (listeners.includes(callback)) {
        listeners.splice(listeners.indexOf(callback), 1);
      }
    };
  }, [callback]);
};

// setTimeout을 사용하면 listener 중 하나가 제대로 작동하지 않아도 나머지 listener 실행을 멈추지 않는다.
setInterval(
  () => listeners.forEach(listener => setTimeout(listener)),
  60 * 1000
);

export default useUpdate;
