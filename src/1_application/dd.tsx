import React, { useContext } from "react";

const StoreContext = React.createContext<any>({});
export const useStore = () => useContext(StoreContext);
