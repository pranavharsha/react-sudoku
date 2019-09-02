import {
    RESET_CURRENT_PUZZLE, SET_CURRENT_PUZZLE_VALUE, SET_ACTIVE_BLOCK, SET_MISTAKES, START_TIMER, UPDATE_TIMER,
    STOP_TIMER, RESET_TIMER, TOGGLE_TIMER
} from '../actions/types';

const initialState = {
    puzzle: [
        [5, 3, 0, 0, 7, 0, 0, 0, 0], [6, 0, 0, 1, 9, 5, 0, 0, 0], [0, 9, 8, 0, 0, 0, 0, 6, 0],
        [8, 0, 0, 0, 6, 0, 0, 0, 3], [4, 0, 0, 8, 0, 3, 0, 0, 1], [7, 0, 0, 0, 2, 0, 0, 0, 6],
        [0, 6, 0, 0, 0, 0, 2, 8, 0], [0, 0, 0, 4, 1, 9, 0, 0, 5], [0, 0, 0, 0, 8, 0, 0, 7, 9]
    ],
    solvedPuzzle: [
        [5, 3, 4, 6, 7, 8, 9, 1, 2], [6, 7, 2, 1, 9, 5, 3, 4, 8], [1, 9, 8, 3, 4, 2, 5, 6, 7],
        [8, 5, 9, 7, 6, 1, 4, 2, 3], [4, 2, 6, 8, 5, 3, 7, 9, 1], [7, 1, 3, 9, 2, 4, 8, 5, 6],
        [9, 6, 1, 5, 3, 7, 2, 8, 4], [2, 8, 7, 4, 1, 9, 6, 3, 5], [3, 4, 5, 2, 8, 6, 1, 7, 9]
    ],
    currentPuzzle: [],
    lUpR: -1, // in index 0-9
    lUpC: -1, // in index 0-9
    acUpR: -1, // in index 0-9
    acUpC: -1, // in index 0-9
    mistakesTolerated: 3,
    mistakesCount: 0,
    isGameLost: false,
    isGameWon: false,
    timerOn: false,
    timerStart: 0,
    timerTime: 0
}

export default function (state = initialState, action) {
    switch (action.type) {
        case RESET_CURRENT_PUZZLE:
            return {
                ...state,
                currentPuzzle: state.puzzle.map((lst) => [...lst]),
                mistakesCount: 0,
                isGameLost: false,
                isGameWon: false,
                lUpR: -1, // in index 0-9
                lUpC: -1, // in index 0-9
                acUpR: -1, // in index 0-9
                acUpC: -1, // in index 0-9
            }

        case SET_ACTIVE_BLOCK:
            return {
                ...state,
                acUpR: state.acUpR === action.payload.obj.row && state.acUpC === action.payload.obj.col ? -1 : action.payload.obj.row,
                acUpC: state.acUpR === action.payload.obj.row && state.acUpC === action.payload.obj.col ? -1 : action.payload.obj.col,
            }

        case SET_MISTAKES:
            return {
                ...state,
                mistakesTolerated: parseInt(action.payload.mistakes),
            }

        case SET_CURRENT_PUZZLE_VALUE:
            state.currentPuzzle[action.payload.valueObj.row][action.payload.valueObj.col] = action.payload.valueObj.value;
            let misCnt = state.solvedPuzzle[action.payload.valueObj.row][action.payload.valueObj.col] != action.payload.valueObj.value ? state.mistakesCount + 1 : state.mistakesCount;
            return {
                ...state,
                currentPuzzle: state.currentPuzzle,
                lUpR: action.payload.valueObj.row,
                lUpC: action.payload.valueObj.col,
                acUpR: -1,
                acUpC: -1,
                mistakesCount: misCnt,
                isGameLost: misCnt === state.mistakesTolerated ? true : false,
                isGameWon: JSON.stringify(state.solvedPuzzle) === JSON.stringify(state.currentPuzzle) ? true : false,
            }

        case START_TIMER:
            return {
                ...state,
                timerOn: true,
                timerTime: state.timerTime,
                timerStart: Date.now() - state.timerTime
            }

        case UPDATE_TIMER:
            return {
                ...state,
                timerTime: Date.now() - state.timerStart
            }

        case STOP_TIMER:
            return {
                ...state,
                timerOn: false,
            }

        case RESET_TIMER:
            return {
                ...state,
                timerOn: false,
                timerStart: 0,
                timerTime: 0
            }
        
        case TOGGLE_TIMER:
            return{
                ...state,
                timerOn: !state.timerOn,
            }

        default:
            return state;
    }
}

