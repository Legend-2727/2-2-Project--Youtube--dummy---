import React from "react";
import { configureStore,combineReducers} from "@reduxjs/toolkit";
import userReducer from './userslicer';
import videoReducer from './videoslice';
import companyReducer from './companyslicer';
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
  } from "redux-persist";
  import storage from "redux-persist/lib/storage";
  import { PersistGate } from "redux-persist/integration/react";


  const persistConfig = {
    key: "root",
    version: 1,
    storage,
  };
  const rootReducer=combineReducers({user:userReducer,video:videoReducer,company:companyReducer});
  const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store=configureStore({
    reducer:persistedReducer,
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
export const persistor = persistStore(store);