// ==========================================
// โจทย์ Pure JavaScript - Algorithms
// ==========================================

console.log('=== PURE JAVASCRIPT EXERCISES ===\n');

// ==========================================
// 1. Array Operations with Loops
// ==========================================

// 1.1 หาค่าสูงสุดใน Array (ใช้ for loop)
function findMax(arr) {
    if (arr.length === 0) return null;
    
    let max = arr[0];
    for (let i = 1; i < arr.length; i++) {
        if (arr[i] > max) {
            max = arr[i];
        }
    }
    return max;
}

const numbers1 = [3, 7, 2, 9, 1, 5];
console.log('1. หาค่าสูงสุด:', findMax(numbers1)); // 9

// 1.2 กรองเลขคู่ (ใช้ for...of และ if-else)
function filterEvenNumbers(arr) {
    const result = [];
    for (const num of arr) {
        if (num % 2 === 0) {
            result.push(num);
        } else {
            // เลขคี่ - ไม่เอา
            continue;
        }
    }
    return result;
}

console.log('2. เลขคู่:', filterEvenNumbers([1, 2, 3, 4, 5, 6])); // [2, 4, 6]

// 1.3 รวมค่าใน Array (ใช้ while loop)
function sumArray(arr) {
    let sum = 0;
    let i = 0;
    while (i < arr.length) {
        sum += arr[i];
        i++;
    }
    return sum;
}

console.log('3. ผลรวม:', sumArray([1, 2, 3, 4, 5])); // 15

// ==========================================
// 2. String Manipulation
// ==========================================

// 2.1 นับจำนวนตัวอักษร (ใช้ for loop และ object)
function countCharacters(str) {
    const count = {};
    
    for (let i = 0; i < str.length; i++) {
        const char = str[i].toLowerCase();
        
        if (count[char]) {
            count[char]++;
        } else {
            count[char] = 1;
        }
    }
    
    return count;
}

console.log('\n4. นับตัวอักษร:', countCharacters('hello world'));

// 2.2 กลับคำ (ใช้ for loop)
function reverseString(str) {
    let reversed = '';
    for (let i = str.length - 1; i >= 0; i--) {
        reversed += str[i];
    }
    return reversed;
}

console.log('5. กลับคำ:', reverseString('JavaScript')); // tpircSavaJ

// 2.3 ตรวจสอบ Palindrome (ใช้ while loop)
function isPalindrome(str) {
    const cleaned = str.toLowerCase().replace(/[^a-z0-9]/g, '');
    let left = 0;
    let right = cleaned.length - 1;
    
    while (left < right) {
        if (cleaned[left] !== cleaned[right]) {
            return false;
        }
        left++;
        right--;
    }
    
    return true;
}

console.log('6. Palindrome "radar":', isPalindrome('radar')); // true
console.log('   Palindrome "hello":', isPalindrome('hello')); // false

// ==========================================
// 3. Sorting Algorithms
// ==========================================

// 3.1 Bubble Sort (ใช้ nested for loops)
function bubbleSort(arr) {
    const sorted = [...arr]; // copy array
    const n = sorted.length;
    
    for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            if (sorted[j] > sorted[j + 1]) {
                // swap
                const temp = sorted[j];
                sorted[j] = sorted[j + 1];
                sorted[j + 1] = temp;
            }
        }
    }
    
    return sorted;
}

console.log('\n7. Bubble Sort:', bubbleSort([64, 34, 25, 12, 22, 11, 90]));

// 3.2 Selection Sort (ใช้ for loops)
function selectionSort(arr) {
    const sorted = [...arr];
    
    for (let i = 0; i < sorted.length - 1; i++) {
        let minIndex = i;
        
        for (let j = i + 1; j < sorted.length; j++) {
            if (sorted[j] < sorted[minIndex]) {
                minIndex = j;
            }
        }
        
        if (minIndex !== i) {
            const temp = sorted[i];
            sorted[i] = sorted[minIndex];
            sorted[minIndex] = temp;
        }
    }
    
    return sorted;
}

console.log('8. Selection Sort:', selectionSort([64, 25, 12, 22, 11]));

// ==========================================
// 4. Search Algorithms
// ==========================================

// 4.1 Linear Search (ใช้ for loop และ if-else)
function linearSearch(arr, target) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === target) {
            return i; // found at index i
        }
    }
    return -1; // not found
}

console.log('\n9. Linear Search (หา 22):', linearSearch([10, 20, 30, 22, 50], 22)); // 3

// 4.2 Binary Search (ใช้ while loop)
function binarySearch(arr, target) {
    let left = 0;
    let right = arr.length - 1;
    
    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        
        if (arr[mid] === target) {
            return mid;
        } else if (arr[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    
    return -1;
}

const sortedArr = [1, 3, 5, 7, 9, 11, 13, 15, 17, 19];
console.log('10. Binary Search (หา 13):', binarySearch(sortedArr, 13)); // 6

// ==========================================
// 5. Object Manipulation
// ==========================================

// 5.1 จัดกลุ่มข้อมูลตาม property (ใช้ for...of)
function groupBy(arr, key) {
    const grouped = {};
    
    for (const item of arr) {
        const groupKey = item[key];
        
        if (!grouped[groupKey]) {
            grouped[groupKey] = [];
        }
        
        grouped[groupKey].push(item);
    }
    
    return grouped;
}

const students = [
    { name: 'John', grade: 'A' },
    { name: 'Jane', grade: 'B' },
    { name: 'Bob', grade: 'A' },
    { name: 'Alice', grade: 'C' },
    { name: 'Charlie', grade: 'B' }
];

console.log('\n11. จัดกลุ่มนักเรียนตามเกรด:');
console.log(groupBy(students, 'grade'));

// 5.2 รวม Object (ใช้ for...in)
function mergeObjects(obj1, obj2) {
    const merged = {};
    
    for (const key in obj1) {
        merged[key] = obj1[key];
    }
    
    for (const key in obj2) {
        merged[key] = obj2[key];
    }
    
    return merged;
}

const obj1 = { a: 1, b: 2 };
const obj2 = { b: 3, c: 4 };
console.log('\n12. Merge Objects:', mergeObjects(obj1, obj2)); // { a: 1, b: 3, c: 4 }

// ==========================================
// 6. Switch Statement Examples
// ==========================================

// 6.1 คำนวณตามเครื่องหมาย
function calculator(num1, num2, operator) {
    let result;
    
    switch(operator) {
        case '+':
            result = num1 + num2;
            break;
        case '-':
            result = num1 - num2;
            break;
        case '*':
            result = num1 * num2;
            break;
        case '/':
            if (num2 === 0) {
                return 'Error: Division by zero';
            }
            result = num1 / num2;
            break;
        default:
            return 'Error: Invalid operator';
    }
    
    return result;
}

console.log('\n13. Calculator:');
console.log('   10 + 5 =', calculator(10, 5, '+'));
console.log('   10 * 5 =', calculator(10, 5, '*'));

// 6.2 แปลงเกรด
function gradeToGPA(grade) {
    switch(grade.toUpperCase()) {
        case 'A':
            return 4.0;
        case 'B+':
            return 3.5;
        case 'B':
            return 3.0;
        case 'C+':
            return 2.5;
        case 'C':
            return 2.0;
        case 'D+':
            return 1.5;
        case 'D':
            return 1.0;
        case 'F':
            return 0.0;
        default:
            return 'Invalid grade';
    }
}

console.log('14. เกรด A ได้:', gradeToGPA('A'), 'GPA');

// ==========================================
// 7. Async Patterns (Promise & Async/Await)
// ==========================================

// 7.1 จำลอง API Call ด้วย Promise
function fetchUserData(userId) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (userId > 0) {
                resolve({
                    id: userId,
                    name: 'John Doe',
                    email: 'john@example.com'
                });
            } else {
                reject('Invalid user ID');
            }
        }, 1000);
    });
}

// 7.2 ใช้ async/await
async function getUserInfo(userId) {
    try {
        console.log('\n15. กำลังดึงข้อมูลผู้ใช้...');
        const user = await fetchUserData(userId);
        console.log('    ข้อมูลผู้ใช้:', user);
        return user;
    } catch (error) {
        console.log('    Error:', error);
        return null;
    }
}

// เรียกใช้ async function
getUserInfo(1);

// 7.3 Promise.all - ดึงหลาย API พร้อมกัน
async function fetchMultipleUsers(userIds) {
    try {
        console.log('\n16. กำลังดึงข้อมูลหลายผู้ใช้...');
        const promises = userIds.map(id => fetchUserData(id));
        const users = await Promise.all(promises);
        console.log('    ดึงข้อมูลเสร็จ:', users.length, 'คน');
        return users;
    } catch (error) {
        console.log('    Error:', error);
        return [];
    }
}

// เรียกใช้
fetchMultipleUsers([1, 2, 3]);

// ==========================================
// 8. Complex Algorithm - Fibonacci
// ==========================================

// 8.1 Fibonacci แบบ for loop
function fibonacciFor(n) {
    if (n <= 1) return n;
    
    const fib = [0, 1];
    
    for (let i = 2; i <= n; i++) {
        fib[i] = fib[i - 1] + fib[i - 2];
    }
    
    return fib[n];
}

console.log('\n17. Fibonacci(10) [for loop]:', fibonacciFor(10)); // 55

// 8.2 Fibonacci แบบ recursion
function fibonacciRecursive(n) {
    if (n <= 1) {
        return n;
    } else {
        return fibonacciRecursive(n - 1) + fibonacciRecursive(n - 2);
    }
}

console.log('18. Fibonacci(10) [recursive]:', fibonacciRecursive(10)); // 55

// 8.3 Fibonacci แบบ while loop
function fibonacciWhile(n) {
    if (n <= 1) return n;
    
    let a = 0, b = 1;
    let count = 2;
    
    while (count <= n) {
        const temp = a + b;
        a = b;
        b = temp;
        count++;
    }
    
    return b;
}

console.log('19. Fibonacci(10) [while loop]:', fibonacciWhile(10)); // 55

// ==========================================
// 9. Data Validation
// ==========================================

function validateUser(user) {
    const errors = [];
    
    // ตรวจสอบ email
    if (!user.email) {
        errors.push('Email is required');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(user.email)) {
        errors.push('Invalid email format');
    }
    
    // ตรวจสอบ age (ใช้ if-else if-else)
    if (!user.age) {
        errors.push('Age is required');
    } else if (user.age < 0) {
        errors.push('Age cannot be negative');
    } else if (user.age < 18) {
        errors.push('Must be 18 or older');
    } else if (user.age > 120) {
        errors.push('Invalid age');
    }
    
    // ตรวจสอบ password
    if (!user.password) {
        errors.push('Password is required');
    } else if (user.password.length < 8) {
        errors.push('Password must be at least 8 characters');
    }
    
    return {
        valid: errors.length === 0,
        errors: errors
    };
}

console.log('\n20. Validate User:');
console.log(validateUser({
    email: 'test@example.com',
    age: 25,
    password: 'password123'
}));

console.log('\n=== END OF EXERCISES ===');