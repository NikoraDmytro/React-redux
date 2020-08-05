import { createSlice } from "@reduxjs/toolkit"

import { Facilities } from "./Facilities_clips"

function currentClip(clipNumber) {
    return Facilities[clipNumber];
}

function onSwitcher(switcherNumber) {
    const switcher = document.getElementById(`switch${switcherNumber + 1}`);
    if (switcher)
        switcher.className = "on";
}

function offSwitcher(switcherNumber) {
    const switcher = document.getElementById(`switch${switcherNumber + 1}`);
    if (switcher)
        switcher.className = "off";
}

export const facilitiesSlice = createSlice({
    name: "clips",
    initialState: {
        NumberOfClip: 0,
        CurrentClip: Facilities[0],
    },
    reducers: {
        MoveToTheNextClip: state => {
            offSwitcher(state.NumberOfClip);
            state.NumberOfClip = (state.NumberOfClip + 1) % 3;
            state.CurrentClip = currentClip(state.NumberOfClip);
            onSwitcher(state.NumberOfClip);
        },
        SelectClip: (state, action) => {
            offSwitcher(state.NumberOfClip);
            state.NumberOfClip = action.payload;
            state.CurrentClip = currentClip(state.NumberOfClip);
            onSwitcher(state.NumberOfClip);
        },
    },
});

export const { MoveToTheNextClip, changeSwitcher, SelectClip } = facilitiesSlice.actions;


export let FacilitiesChange = () => dispatch => {
    const interval = setInterval(() => {
        dispatch(MoveToTheNextClip());
        console.log(document.getElementsByClassName("clearfix")[0])
        if (document.getElementsByClassName("clearfix")[0] === undefined)
            clearInterval(interval)
    }, 2000);
}

export default facilitiesSlice.reducer;