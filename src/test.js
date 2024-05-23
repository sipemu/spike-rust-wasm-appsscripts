
async function test() {
    await assert(hello_("world"), "Hello, world from Rust!");
  }
  
  async function assert(a, b, message) {
    const aVal = await a;
    const bVal = await b;
  
    if (aVal !== bVal) {
      throw message ?? `'${aVal}' !== '${bVal}'`;
    }
  }
  
  async function latency(func, iterations, argsFunc = () => []) {
    const executionTimes = [];
  
    for (let i = 0; i < iterations; i++) {
      const args = argsFunc();
  
      const startTime = Date.now();
      let endTime;
  
      try {
        await func(...args);
        endTime = Date.now();
      } catch (e) {
        endTime = Infinity;
        console.error(e);
        continue;
      }
  
      executionTimes.push(endTime - startTime);
    }
  
    // Calculate statistics
    const min = Math.min(...executionTimes);
    const max = Math.max(...executionTimes);
    const totalTime = executionTimes.reduce((sum, time) => sum + time, 0);
    const average = totalTime / iterations;
  
    return {
      min: min,
      max: max,
      average: average,
      totalTime,
      // times: executionTimes // Array of all execution times
    };
  }
  
  async function benchmark() {
    await hello_("world"); // Warmup
    
    console.log(await latency(hello_, 100, () => [generateRandomString(10)]));
    console.log(await latency(hello_, 100, () => [generateRandomString(100)]));
    console.log(await latency(hello_, 100, () => [generateRandomString(1000)]));
    console.log(await latency(hello_, 100, () => [generateRandomString(10000)]));
    console.log(await latency(hello_, 100, () => [generateRandomString(100000)]));
    console.log(await latency(hello_, 30, () => [generateRandomString(1000000)]));
  }
  
  function generateRandomString(length = 1024) {
    // Choose your desired character set
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
  
    let result = '';
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
  
    return result;
  }