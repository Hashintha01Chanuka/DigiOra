const fetch = require('node-fetch');

const testServicesAPI = async () => {
  try {
    console.log('🧪 Testing Services API...');
    
    // Test 1: Get all services
    console.log('\n1. Testing GET /api/services');
    const response1 = await fetch('http://localhost:5000/api/services');
    const data1 = await response1.json();
    console.log('Response:', data1);
    
    // Test 2: Get admin services
    console.log('\n2. Testing GET /api/services/admin/all');
    const response2 = await fetch('http://localhost:5000/api/services/admin/all');
    const data2 = await response2.json();
    console.log('Response:', data2);
    
    // Test 3: Create a test service
    console.log('\n3. Testing POST /api/services');
    const testService = {
      title: "Test Service",
      description: "This is a test service",
      icon: "Target",
      gradient: "from-red-500 to-red-600",
      status: "active"
    };
    
    const response3 = await fetch('http://localhost:5000/api/services', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testService),
    });
    const data3 = await response3.json();
    console.log('Response:', data3);
    
    if (data3.success && data3.data._id) {
      // Test 4: Update the test service
      console.log('\n4. Testing PUT /api/services/' + data3.data._id);
      const updateData = {
        title: "Updated Test Service",
        description: "This is an updated test service",
        icon: "Users",
        gradient: "from-blue-500 to-blue-600",
        status: "active"
      };
      
      const response4 = await fetch(`http://localhost:5000/api/services/${data3.data._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateData),
      });
      const data4 = await response4.json();
      console.log('Response:', data4);
      
      // Test 5: Delete the test service
      console.log('\n5. Testing DELETE /api/services/' + data3.data._id);
      const response5 = await fetch(`http://localhost:5000/api/services/${data3.data._id}`, {
        method: 'DELETE',
      });
      const data5 = await response5.json();
      console.log('Response:', data5);
    }
    
    console.log('\n✅ All tests completed!');
    
  } catch (error) {
    console.error('❌ Test failed:', error);
  }
};

testServicesAPI(); 