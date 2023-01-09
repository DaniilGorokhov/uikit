import React from 'react';

export function useStateWithCallback<T>(
    initialValue: T,
    callback?: VoidFunction,
): [T, (nextValue: T | ((prevValue: T) => T)) => void] {
    const [state, setState] = React.useState(initialValue);

    const setWithCallback = React.useCallback(
        (nextValue: T | ((value: T) => T)) => {
            callback?.();
            setState(nextValue);
        },
        [callback],
    );

    return [state, setWithCallback];
}
