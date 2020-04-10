import { createStore } from "redux";

// import { createLogger } from "redux-logger";
import Reducer from "../reducer/Reducer";

// const loggerMiddleware = createLogger();
// const Store = createStore(Reducer, applyMiddleware(loggerMiddleware));

const Store = createStore(Reducer);

export default Store;
