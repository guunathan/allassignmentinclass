
// 1. กำหนดโครงสร้างข้อมูลที่มีการซ้อนกัน
const applicationState = {
    metadata: {
        version: "1.0.1",
        developer: "JS Engineer"
    },
    userProfiles: [
        {
            details: { name: "Alice", id: "U101" },
            settings: { active: true, tags: ["admin", "dev"] }
        },
        {
            details: { name: "Bob", id: "U102" },
            settings: { active: false, tags: ["guest"] }
        }
    ],
    targetElement: {
        id: "main-container-001",
        classList: ["primary", "visible"]
    }
};

// 2. ฟังก์ชันหลักที่ทำการเข้าถึงคุณสมบัติแบบซับซ้อน
function processComplexProperties(appData, targetIndex) {
    
    // 2.1. การเข้าถึงคุณสมบัติ .name และ .id แบบซ้อนกัน และการจัดการค่า Undefined (Optional Chaining)
    // - เข้าถึง userProfiles[targetIndex]
    // - จากนั้นเข้าถึง details
    // - จากนั้นเข้าถึง name และ id
    // - ใช้ ?. เพื่อป้องกัน Error หาก targetIndex ไม่มีอยู่
    const currentUserName = appData.userProfiles[targetIndex]?.details?.name || "N/A";
    const currentElementID = appData.userProfiles[targetIndex]?.details?.id;
    
    // 2.2. การเข้าถึงคุณสมบัติ .id ของ Element แบบตรงไปตรงมา (แต่ซ่อนอยู่ใน Object)
    const containerId = appData.targetElement.id;

    // 2.3. การเข้าถึงคุณสมบัติ .length ของ Array ที่ซ้อนอยู่ใน Object
    // - เข้าถึง userProfiles[targetIndex]
    // - จากนั้นเข้าถึง settings.tags
    // - จากนั้นใช้ .length
    // - ใช้ ?. เพื่อจัดการกรณีที่ settings.tags อาจเป็น null หรือ undefined
    const userTagCount = appData.userProfiles[targetIndex]?.settings?.tags?.length ?? 0;

    // 2.4. การเข้าถึง Property ด้วย Computed Property Name (ใช้ตัวแปรมาเป็นชื่อ Property)
    const propertyKey = 'developer';
    const devInfo = appData.metadata[propertyKey]; 
    
    // 3. แสดงผลลัพธ์ที่ซับซ้อนออกมาในรูปแบบ Object
    return {
        retrievedUserName: currentUserName,
        retrievedElementID: currentElementID,
        elementID: containerId,
        arrayLength: userTagCount,
        metadataKey: propertyKey,
        devInfo: devInfo
    };
}

// 4. เรียกใช้ฟังก์ชันด้วย Target Index ที่ต่างกัน
const resultAlice = processComplexProperties(applicationState, 0); // User Alice
const resultNonExistent = processComplexProperties(applicationState, 5); // User ที่ไม่มีอยู่จริง

console.log("--- ผลลัพธ์สำหรับ User Index 0 (Alice) ---");
console.log(resultAlice);

console.log("\n--- ผลลัพธ์สำหรับ User Index 5 (ไม่มีอยู่จริง) ---");
console.log(resultNonExistent);