import {
    RESET_CURRENT_PUZZLE, SET_CURRENT_PUZZLE_VALUE, SET_ACTIVE_BLOCK, SET_MISTAKES, START_TIMER, UPDATE_TIMER, 
    STOP_TIMER, RESET_TIMER, TOGGLE_TIMER
} from './types';

export function resetCurrentPuzzle() {
    return function (dispatch) {
        dispatch({
            type: RESET_CURRENT_PUZZLE,
            payload: {}
        });
    }
}

export function setCurrentPuzzleValue(valueObj) {
    return function (dispatch) {
        dispatch({
            type: SET_CURRENT_PUZZLE_VALUE,
            payload: { "valueObj": valueObj }
        });
    }
}

export function setActivePuzzleBlock(obj) {
    return function (dispatch) {
        dispatch({
            type: SET_ACTIVE_BLOCK,
            payload: { obj }
        });
    }
}

export function setMistakes(mistakes) {
    return function (dispatch) {
        dispatch({
            type: SET_MISTAKES,
            payload: { "mistakes": mistakes }
        });
    }
}

export function startTimer() {
    return function (dispatch) {
        dispatch({
            type: START_TIMER,
            payload: {}
        });
    }
}

export function updateTimer() {
    return function (dispatch) {
        dispatch({
            type: UPDATE_TIMER,
            payload: {}
        });
    }
}

export function stopTimer() {
    return function (dispatch) {
        dispatch({
            type: STOP_TIMER,
            payload: {}
        });
    }
}

export function resetTimer() {
    return function (dispatch) {
        dispatch({
            type: RESET_TIMER,
            payload: {}
        });
    }
}

export function toggleTimerStatus() {
    return function (dispatch) {
        dispatch({
            type: TOGGLE_TIMER,
            payload: {}
        });
    }
} 


