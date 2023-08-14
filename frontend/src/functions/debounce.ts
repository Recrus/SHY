//todo remove any?
const debounce = <T extends (...args: any[]) => any>(
    func: T,
    delay: number,
) => {
    let timer: ReturnType<typeof setTimeout>;

    const debouncedFunction = (...args: Parameters<T>) => {
        clearTimeout(timer);
        timer = setTimeout(() => func(...args), delay);
    };

    debouncedFunction.cancel = () => {
        clearTimeout(timer);
    };

    return debouncedFunction;
};

export default debounce;
