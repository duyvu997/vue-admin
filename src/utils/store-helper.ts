import store from "@/store";

const getNamespace = (namespace: string) => (value: string) =>
  namespace + "/" + value;

export { getNamespace };
