export const SolWasmWorker = 0;
export const executeWorker = function (worker, args) {
  return worker(function (inputSol: any, compilerVersion: string, libs: any) {

    // @ts-ignore
    importScripts(
      `${location.origin}/soljson-v0.6.0.js`
    );

    const Module = (this as any).Module;
    const input: string = JSON.stringify(inputSol);

    const isVersion6 = true;/// compilerVersion.indexOf('0.6') > -1;

    const copyToCString = function (str, ptr) {
      const length = Module.lengthBytesUTF8(str);
      // This is allocating memory using solc's allocator.
      //
      // Before 0.6.0:
      //   Assuming copyToCString is only used in the context of wrapCallback, solc will free these pointers.
      //   See https://github.com/ethereum/solidity/blob/v0.5.13/libsolc/libsolc.h#L37-L40
      //
      // After 0.6.0:
      //   The duty is on solc-js to free these pointers. We accomplish that by calling `reset` at the end.
      const buffer = alloc(length + 1);
      Module.stringToUTF8(str, buffer, length + 1);
      Module.setValue(ptr, buffer, '*');
    };

    const assert = (cond: boolean, txt: string) => {
      if (cond) {
        return true;
      } else {
        throw new Error(txt);
      }
    };
    const copyFromCString = Module.UTF8ToString || Module.Pointer_stringify;

    const wrapCallback = function (callback) {
      assert(typeof callback === 'function', 'Invalid callback specified.');
      return function (data, contents, error) {
        const result = callback(copyFromCString(data));
        if (typeof result.contents === 'string') {
          copyToCString(result.contents, contents);
        }
        if (typeof result.error === 'string') {
          copyToCString(result.error, error);
        }
      };
    };

    const wrapCallbackWithKind = function (callback) {
      assert(typeof callback === 'function', 'Invalid callback specified.');
      return function (context, kind, data, contents, error) {
        // Must be a null pointer.
        assert(context === 0, 'Callback context must be null.');
        const result = callback(
          copyFromCString(kind),
          copyFromCString(data)
        );
        if (typeof result.contents === 'string') {
          copyToCString(result.contents, contents);
        }
        if (typeof result.error === 'string') {
          copyToCString(result.error, error);
        }
      };
    };
    // This calls compile() with args || cb
    const runWithCallbacks = function (callbacks, compile, args) {
      if (callbacks) {
        assert(
          typeof callbacks === 'object',
          'Invalid callback object specified.'
        );
      } else {
        callbacks = {};
      }

      let readCallback = callbacks.import;
      if (readCallback === undefined) {
        readCallback = function (data) {
          return {
            error: 'File import callback not supported',
          };
        };
      }

      let singleCallback;
      if (isVersion6) {
        // After 0.6.x multiple kind of callbacks are supported.
        let smtSolverCallback = callbacks.smtSolver;
        if (smtSolverCallback === undefined) {
          smtSolverCallback = function (data) {
            return {
              error: 'SMT solver callback not supported',
            };
          };
        }

        singleCallback = function (kind, data) {
          if (kind === 'source') {
            return readCallback(data);
          } else if (kind === 'smt-query') {
            return smtSolverCallback(data);
          } else {
            assert(false, 'Invalid callback kind specified.');
          }
        };

        singleCallback = wrapCallbackWithKind(singleCallback);
      } else {
        // Old Solidity version only supported imports.
        singleCallback = wrapCallback(readCallback);
      }

      // This is to support multiple versions of Emscripten.
      var addFunction = Module.addFunction || Module.Runtime.addFunction;
      var removeFunction =
        Module.removeFunction || Module.Runtime.removeFunction;

      var cb = addFunction(singleCallback);
      var output;
      try {
        args.push(cb);
        if (isVersion6) {
          // Callback context.
          args.push(null);
        }
        output = compile.apply(undefined, args);
      } catch (e) {
        removeFunction(cb);
        throw e;
      }
      removeFunction(cb);
      if (reset) {
        // Explicitly free memory.
        //
        // NOTE: cwrap() of "compile" will copy the returned pointer into a
        //       Javascript string and it is not possible to call free() on it.
        //       reset() however will clear up all allocations.
        reset();
      }
      return output;
    };

    var alloc;
    if ('_solidity_alloc' in Module) {
      alloc = Module.cwrap('solidity_alloc', 'number', ['number']);
    } else {
      alloc = Module._malloc;
      assert(alloc, 'Expected malloc to be present.');
    }

    var reset;
    if ('_solidity_reset' in Module) {
      reset = Module.cwrap('solidity_reset', null, []);
    }
    // @ts-ignore
    // const compile = __solidity_compile;
    // const output = await compile(input);
    var solidityCompile;
    if (isVersion6) {
      // input (jsontext), callback (ptr), callback_context (ptr) -> output (jsontext)
      solidityCompile = Module.cwrap('solidity_compile', 'string', [
        'string',
        'number',
        'number',
      ]);
    } else {
      // input (jsontext), callback (ptr) -> output (jsontext)
      solidityCompile = Module.cwrap('solidity_compile', 'string', [
        'string',
        'number',
      ]);
    }
    const compileStandard = function (input, callbacks?) {
      return runWithCallbacks(callbacks, solidityCompile, [input]);
    };
    return compileStandard(input, {
      import: (path) => {
        return { contents: libs[path].content }
      }
    });
  }
    ,
    args
  )
}