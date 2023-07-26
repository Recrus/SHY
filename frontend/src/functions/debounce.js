const debounce = (func, delay) => {
    let timer;
    const debouncedFunction = function (...args) {
        clearTimeout(timer);
        timer = setTimeout(() => func.apply(this, args), delay);
    };

    debouncedFunction.cancel = function () {
        clearTimeout(timer);
    };

    return debouncedFunction;
};

export default debounce;
