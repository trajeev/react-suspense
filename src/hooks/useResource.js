import { useLayoutEffect, useState } from "react";

export default function useResource(resource) {
  // Use state to force re-renders when data changes
  const [, forceUpdate] = useState();
  // On every data change, forceUpdate is called
  useLayoutEffect(() => resource.observe(forceUpdate), [resource]);
  // Actually read the resource to get the correct data / error
  return resource.read();
}
