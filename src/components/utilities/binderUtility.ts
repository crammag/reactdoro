

// Credits to https://github.com/NoHomey/bind-decorator because this is a simplified version of it
 export default function Bind() {

    return function (target, propertyKey, descriptor) {

        //seems that the decorator is calling once for the class also, so this if is necessary to avoid bad bindings
        if (!descriptor || (typeof descriptor.value !== 'function')) {
            // throw new TypeError(`Only functions can be decorated with @bind. <${propertyKey}> is not a function!`);
            return;
        }

        return {
            configurable: true,
            get(this) {

                let bound = descriptor.value.bind(this);
                // Credits to https://github.com/andreypopp/autobind-decorator for memoizing the result of bind against a symbol on the instance.
                Object.defineProperty(this, propertyKey, {
                    value: bound,
                    configurable: true,
                    writable: true
                });

                return bound;
            }
        }

    }

}
