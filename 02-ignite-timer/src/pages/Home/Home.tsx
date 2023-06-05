import { HandPalm, Play } from "phosphor-react";
import { HomeContainer, StartButton, StopButton } from "./styles";
import { useContext} from "react";
import { NewCycleForm } from "../../components/NewCycleForm/NewCycleForm";
import { Countdown } from "../../components/Countdow/Countdow";
import * as zod from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from "react-hook-form";
import { CyclesContext } from "../../contexts/CyclesContexts";


const newCycleFormValidationSchema = zod.object({
    task: zod.string().min(3, 'Informe a tarefa'),
    minutesAmount: zod.number().min(1).max(60),
})

// interface NewCycleFormData {
//     task: string,
//     minutesAmount: number
// }
type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>

export function Home(){
    const {createNewCycle, interruptCycle, activeCycle} = useContext(CyclesContext)

    const newCycleForm = useForm<NewCycleFormData>({
        resolver: zodResolver(newCycleFormValidationSchema),
        defaultValues: {
            task: '',
            minutesAmount: 0
        }
    })

    const {handleSubmit, watch, reset} = newCycleForm 

    const task = watch('task')
    const isSubmitDisabled = !task

    function handleCreateNewCycle(data: NewCycleFormData) {
        createNewCycle(data)
        reset()
    }

    return (
        <HomeContainer>
            <form onSubmit={handleSubmit(handleCreateNewCycle)} action="">
                    <FormProvider {...newCycleForm}>
                        <NewCycleForm />        
                    </FormProvider>

                    <Countdown />
                {activeCycle ? (
                        <StopButton type="button" onClick={interruptCycle}>
                            <HandPalm 
                                size={24} 
                            />
                            Interromper
                        </StopButton>
                    ): (
                        <StartButton type="submit" disabled={isSubmitDisabled}>
                            <Play size={24} />
                            Começar
                        </StartButton>
                    )
                }
            </form>
        </HomeContainer>
    )
}