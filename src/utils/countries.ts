import { MexicoStates, USAstates } from "./constants"

export const getStateCountry = (stateCode: string, country: string) => {
    const selectedState =
        country === 'MX' ?
            MexicoStates.find(el => el.value === stateCode)
            : USAstates.find(el => el.value === stateCode)

    if (selectedState) {
        return selectedState.label
    }

    return stateCode
}