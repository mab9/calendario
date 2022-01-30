/**
 * @module Controllers as shallow wrappers around observables
 */
import {Observable, ObservableList} from "../observable/observable.js";
import {valueOf} from "../presentationModel/presentationModel.js";
import {isFunction} from "../utils/isfnc.js";

export {ListController, SelectionController}

const expressionMaker = fnc => callFnc => {
    isFunction(fnc)
        ? callFnc(fnc)
        : callFnc(_ => fnc());
}

/**
 * @returns {ListController} ListController
 */
const ListController = () => {

    const innerList = [];                        // internal use only
    const listModel = ObservableList(innerList); // observable array of models, this state is private

    const findById = modelId => innerList.find(model => valueOf(model.id) === modelId);

    return {
        addModel: model => listModel.add(model),
        findById,
        removeModel: listModel.del,
        onModelAdd: fnc => expressionMaker(fnc)(listModel.onAdd),
        onModelRemove: fnc => expressionMaker(fnc)(listModel.onDel),
        size: () => listModel.count(),
        forEach: fnc => innerList.forEach(item => fnc(item)),
        getAll: () => innerList,
        reset: () => innerList.splice(0, innerList.length), // todo rework so that listeners get triggered -> getAll for each removeModel?
        pop: () => innerList[innerList.length - 1],
    }
};

/**
 * @returns {SelectionController} SelectionController
 */
const SelectionController = noSelection => {

    const selectedModelObs = Observable(noSelection);

    return {
        setSelectedModel: selectedModelObs.setValue,
        getSelectedModel: selectedModelObs.getValue,
        onModelSelected: fnc => expressionMaker(fnc)(selectedModelObs.onChange),
        clearSelection: () => selectedModelObs.setValue(noSelection),
    }
};

