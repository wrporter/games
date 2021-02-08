import React from "react";
import EventEmitter from "./EventEmitter";

type TicTacToeProviderProps = {
    children: React.ReactNode;
    emitter: EventEmitter;
}

const TicTacToeContext = React.createContext({emitter: new EventEmitter()});

export const TicTacToeContextProvider = ({children, emitter}: TicTacToeProviderProps) => {
    const value = {emitter};
    return (
        <TicTacToeContext.Provider value={value}>
            {children}
        </TicTacToeContext.Provider>
    );
}

export function useTicTacToeContext() {
    return React.useContext(TicTacToeContext);
}

