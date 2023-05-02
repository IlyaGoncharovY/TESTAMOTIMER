import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export interface initialStateType {
    seconds: number;
    timerIntervalId: NodeJS.Timer | null;
}

const initialState: initialStateType = {
    seconds: 0,
    timerIntervalId: null,
}

export const TimerSlice = createSlice({
    name: "timer",
    initialState,
    reducers: {
        setSeconds: (state, action: PayloadAction<number>) => {
            state.seconds = action.payload
        },
        setTimerIntervalId(state, action: PayloadAction<NodeJS.Timer | null>) {
            state.timerIntervalId = action.payload;
        },
    }
})

export const animateTimer = (seconds: number) => (dispatch: any) => {
    let remainingSeconds = seconds;
    const intervalId = setInterval(() => {
        remainingSeconds--;
        if (remainingSeconds >= 0) {
            dispatch(setSeconds(remainingSeconds));
        } else {
            clearInterval(intervalId);
            dispatch(setTimerIntervalId(null));
        }
    }, 1000);
    dispatch(setTimerIntervalId(intervalId));
};

export const {setSeconds, setTimerIntervalId} = TimerSlice.actions

export default TimerSlice.reducer;