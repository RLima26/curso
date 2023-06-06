import { ReactNode, createContext, useEffect, useReducer, useState } from "react";
import {Cycle, CyclesReducer} from '../reducers/Cycles/reducer'
import { addNewCycleAction, interruptCycleAction, markCurrentCycleFineshedAction } from "../reducers/Cycles/Actions"
import { differenceInSeconds } from "date-fns";

interface CreateCycleData {
    task: string,
    minutesAmount: number
}

interface CyclesContextType {
    cycles: Cycle[],
    activeCycle: Cycle | undefined,
    activeCycleId: string | null,
    amountSecondsPassed: number,
    markCurrentCycleFineshed: () => void,
    setSecondsPassed: (seconds: number) => void,
    createNewCycle: (data: CreateCycleData) => void,
    interruptCycle: () => void,

}

interface CyclesContextProviderProps {
    children: ReactNode
}

export const CyclesContext = createContext({} as CyclesContextType)


export function CyclesContextProvider({children}: CyclesContextProviderProps){
    
    const [cyclesState, dispatch] = useReducer(CyclesReducer, {
        cycles: [],
        activeCycleId: null
    }, (initialState)=>{
        const storedStateAsJSON = localStorage.getItem('@ignite-timer: cycles-state')

        if(storedStateAsJSON){
            return JSON.parse(storedStateAsJSON)
        }

        return initialState
    })

    const {cycles, activeCycleId} = cyclesState
    const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)
    
    const [amountSecondsPassed, setAmountSecondsPassed] = useState(()=>{
        if(activeCycle){
            return differenceInSeconds(new Date(), new Date(activeCycle.startDate))
        }

        return 0
    })

    function setSecondsPassed(seconds: number){
        setAmountSecondsPassed(seconds)
    }

    function markCurrentCycleFineshed(){
        dispatch(markCurrentCycleFineshedAction())
    }

    function createNewCycle(data: CreateCycleData) {
        const id = String(new Date().getTime())

        const newCycle: Cycle = {
            id,
            task: data.task,
            minutesAmount: data.minutesAmount,
            startDate: new Date(),
        }

        dispatch(addNewCycleAction(newCycle))
        setAmountSecondsPassed(0)
    }

    function interruptCycle() {
        dispatch(interruptCycleAction())
    }

    useEffect(()=>{
        const stateJSON = JSON.stringify(cyclesState)

        localStorage.setItem('@ignite-timer: cycles-state', stateJSON)
    }, [cyclesState])

    return (
        <CyclesContext.Provider 
            value={{
                cycles,
                activeCycleId, 
                activeCycle, 
                amountSecondsPassed,
                markCurrentCycleFineshed, 
                setSecondsPassed, 
                createNewCycle,
                interruptCycle  
            }}
        >
            {children}
        </CyclesContext.Provider>
    )
}