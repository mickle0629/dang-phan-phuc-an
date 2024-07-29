// The brute force, iterative approach
function sum_to_n_a(n) {
  let sum = 0;
  for (let i = 1; i <= n; i++) {
    sum += i;
  }
  return sum;
}

//Mathematically, you can express this sum as n(n+1) / 2 (explicit formula)
function sum_to_n_b(n) {
  return n * (n + 1) / 2;
}

//alternatively, you can also express the sum as a recursive formula: sum(n) = sum(n - 1) + n,
//where the base case is sum(1) = 1
function sum_to_n_c(n) {
  if (n === 1) {
    return 1;
  }
  return n + sum_to_n_c(n - 1);
}

const n = 20
console.log(sum_to_n_a(n));
console.log(sum_to_n_b(n));
console.log(sum_to_n_c(n));