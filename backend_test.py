#!/usr/bin/env python3
"""
Backend API tests for Reliant Global Solutions Contact Form
Tests the new POST /api/contact and GET /api/contact endpoints
"""

import requests
import json
from datetime import datetime
import time

# Read backend URL from frontend/.env
with open('/app/frontend/.env', 'r') as f:
    for line in f:
        if line.startswith('REACT_APP_BACKEND_URL='):
            BACKEND_URL = line.strip().split('=', 1)[1]
            break

BASE_URL = f"{BACKEND_URL}/api"

print(f"Testing backend at: {BASE_URL}")
print("=" * 80)

# Track test results
test_results = {
    "passed": [],
    "failed": []
}

def test_result(test_name, passed, details=""):
    """Record test result"""
    if passed:
        test_results["passed"].append(test_name)
        print(f"✅ PASS: {test_name}")
    else:
        test_results["failed"].append(test_name)
        print(f"❌ FAIL: {test_name}")
    if details:
        print(f"   {details}")
    print()

# Store created submission IDs for verification
created_submissions = []

# ============================================================================
# Test 1: Happy path - POST /api/contact with full valid payload
# ============================================================================
print("Test 1: Happy path - POST /api/contact with full valid payload")
print("-" * 80)
payload = {
    "name": "John Doe",
    "email": "john@example.com",
    "company": "Acme Corp",
    "phone": "+1 555-1234",
    "message": "Interested in your services."
}

try:
    response = requests.post(f"{BASE_URL}/contact", json=payload, timeout=10)
    print(f"Status Code: {response.status_code}")
    print(f"Response: {json.dumps(response.json(), indent=2)}")
    
    if response.status_code == 201:
        data = response.json()
        # Verify all required fields are present
        required_fields = ["id", "name", "email", "company", "phone", "message", "submitted_at", "status"]
        missing_fields = [f for f in required_fields if f not in data]
        
        if missing_fields:
            test_result("Test 1: Full payload POST", False, f"Missing fields: {missing_fields}")
        elif data["status"] != "new":
            test_result("Test 1: Full payload POST", False, f"Expected status='new', got '{data['status']}'")
        elif data["name"] != payload["name"] or data["email"] != payload["email"]:
            test_result("Test 1: Full payload POST", False, "Response data doesn't match request")
        else:
            created_submissions.append(data)
            test_result("Test 1: Full payload POST", True, f"Created submission with id: {data['id']}")
    else:
        test_result("Test 1: Full payload POST", False, f"Expected 201, got {response.status_code}")
except Exception as e:
    test_result("Test 1: Full payload POST", False, f"Exception: {str(e)}")

time.sleep(0.5)

# ============================================================================
# Test 2: Required-only POST - only name, email, message
# ============================================================================
print("Test 2: Required-only POST - only name, email, message")
print("-" * 80)
payload = {
    "name": "Jane",
    "email": "jane@example.com",
    "message": "hi"
}

try:
    response = requests.post(f"{BASE_URL}/contact", json=payload, timeout=10)
    print(f"Status Code: {response.status_code}")
    print(f"Response: {json.dumps(response.json(), indent=2)}")
    
    if response.status_code == 201:
        data = response.json()
        # Verify company and phone are null
        if data.get("company") is None and data.get("phone") is None:
            created_submissions.append(data)
            test_result("Test 2: Required-only POST", True, "company and phone are null as expected")
        else:
            test_result("Test 2: Required-only POST", False, f"Expected company/phone to be null, got company={data.get('company')}, phone={data.get('phone')}")
    else:
        test_result("Test 2: Required-only POST", False, f"Expected 201, got {response.status_code}")
except Exception as e:
    test_result("Test 2: Required-only POST", False, f"Exception: {str(e)}")

time.sleep(0.5)

# ============================================================================
# Test 3a: Validation - missing name
# ============================================================================
print("Test 3a: Validation - missing name")
print("-" * 80)
payload = {
    "email": "test@example.com",
    "message": "test message"
}

try:
    response = requests.post(f"{BASE_URL}/contact", json=payload, timeout=10)
    print(f"Status Code: {response.status_code}")
    print(f"Response: {json.dumps(response.json(), indent=2)}")
    
    if response.status_code == 422:
        test_result("Test 3a: Missing name validation", True, "Correctly returned 422")
    else:
        test_result("Test 3a: Missing name validation", False, f"Expected 422, got {response.status_code}")
except Exception as e:
    test_result("Test 3a: Missing name validation", False, f"Exception: {str(e)}")

time.sleep(0.5)

# ============================================================================
# Test 3b: Validation - missing email
# ============================================================================
print("Test 3b: Validation - missing email")
print("-" * 80)
payload = {
    "name": "Test User",
    "message": "test message"
}

try:
    response = requests.post(f"{BASE_URL}/contact", json=payload, timeout=10)
    print(f"Status Code: {response.status_code}")
    print(f"Response: {json.dumps(response.json(), indent=2)}")
    
    if response.status_code == 422:
        test_result("Test 3b: Missing email validation", True, "Correctly returned 422")
    else:
        test_result("Test 3b: Missing email validation", False, f"Expected 422, got {response.status_code}")
except Exception as e:
    test_result("Test 3b: Missing email validation", False, f"Exception: {str(e)}")

time.sleep(0.5)

# ============================================================================
# Test 3c: Validation - missing message
# ============================================================================
print("Test 3c: Validation - missing message")
print("-" * 80)
payload = {
    "name": "Test User",
    "email": "test@example.com"
}

try:
    response = requests.post(f"{BASE_URL}/contact", json=payload, timeout=10)
    print(f"Status Code: {response.status_code}")
    print(f"Response: {json.dumps(response.json(), indent=2)}")
    
    if response.status_code == 422:
        test_result("Test 3c: Missing message validation", True, "Correctly returned 422")
    else:
        test_result("Test 3c: Missing message validation", False, f"Expected 422, got {response.status_code}")
except Exception as e:
    test_result("Test 3c: Missing message validation", False, f"Exception: {str(e)}")

time.sleep(0.5)

# ============================================================================
# Test 4: Validation - invalid email
# ============================================================================
print("Test 4: Validation - invalid email")
print("-" * 80)
payload = {
    "name": "X",
    "email": "notanemail",
    "message": "hi"
}

try:
    response = requests.post(f"{BASE_URL}/contact", json=payload, timeout=10)
    print(f"Status Code: {response.status_code}")
    print(f"Response: {json.dumps(response.json(), indent=2)}")
    
    if response.status_code == 422:
        test_result("Test 4: Invalid email validation", True, "Correctly returned 422 for invalid email")
    else:
        test_result("Test 4: Invalid email validation", False, f"Expected 422, got {response.status_code}")
except Exception as e:
    test_result("Test 4: Invalid email validation", False, f"Exception: {str(e)}")

time.sleep(0.5)

# ============================================================================
# Test 5: Validation - empty strings
# ============================================================================
print("Test 5: Validation - empty strings for name and message")
print("-" * 80)
payload = {
    "name": "",
    "email": "a@b.com",
    "message": ""
}

try:
    response = requests.post(f"{BASE_URL}/contact", json=payload, timeout=10)
    print(f"Status Code: {response.status_code}")
    print(f"Response: {json.dumps(response.json(), indent=2)}")
    
    if response.status_code == 422:
        test_result("Test 5: Empty string validation", True, "Correctly returned 422 for empty name/message")
    else:
        test_result("Test 5: Empty string validation", False, f"Expected 422, got {response.status_code}")
except Exception as e:
    test_result("Test 5: Empty string validation", False, f"Exception: {str(e)}")

time.sleep(0.5)

# ============================================================================
# Test 6: GET /api/contact - verify submissions are returned
# ============================================================================
print("Test 6: GET /api/contact - verify submissions")
print("-" * 80)

try:
    response = requests.get(f"{BASE_URL}/contact", timeout=10)
    print(f"Status Code: {response.status_code}")
    
    if response.status_code == 200:
        data = response.json()
        print(f"Number of submissions returned: {len(data)}")
        
        if len(data) >= len(created_submissions):
            # Verify the submissions we created are in the response
            found_count = 0
            for created in created_submissions:
                for returned in data:
                    if returned.get("id") == created.get("id"):
                        found_count += 1
                        break
            
            if found_count == len(created_submissions):
                # Verify sorting (newest first)
                if len(data) >= 2:
                    # Check if first submission is newer than second
                    first_time = datetime.fromisoformat(data[0]["submitted_at"].replace('Z', '+00:00'))
                    second_time = datetime.fromisoformat(data[1]["submitted_at"].replace('Z', '+00:00'))
                    if first_time >= second_time:
                        test_result("Test 6: GET /api/contact", True, f"Found all {found_count} created submissions, sorted newest first")
                    else:
                        test_result("Test 6: GET /api/contact", False, "Submissions not sorted newest first")
                else:
                    test_result("Test 6: GET /api/contact", True, f"Found all {found_count} created submissions")
            else:
                test_result("Test 6: GET /api/contact", False, f"Only found {found_count}/{len(created_submissions)} created submissions")
        else:
            test_result("Test 6: GET /api/contact", False, f"Expected at least {len(created_submissions)} submissions, got {len(data)}")
    else:
        test_result("Test 6: GET /api/contact", False, f"Expected 200, got {response.status_code}")
except Exception as e:
    test_result("Test 6: GET /api/contact", False, f"Exception: {str(e)}")

time.sleep(0.5)

# ============================================================================
# Test 7: Regression - existing endpoints
# ============================================================================
print("Test 7a: Regression - GET /api/")
print("-" * 80)

try:
    response = requests.get(f"{BASE_URL}/", timeout=10)
    print(f"Status Code: {response.status_code}")
    print(f"Response: {json.dumps(response.json(), indent=2)}")
    
    if response.status_code == 200:
        data = response.json()
        if data.get("message") == "Hello World":
            test_result("Test 7a: GET /api/ regression", True, "Endpoint still working")
        else:
            test_result("Test 7a: GET /api/ regression", False, f"Unexpected response: {data}")
    else:
        test_result("Test 7a: GET /api/ regression", False, f"Expected 200, got {response.status_code}")
except Exception as e:
    test_result("Test 7a: GET /api/ regression", False, f"Exception: {str(e)}")

time.sleep(0.5)

print("Test 7b: Regression - POST /api/status")
print("-" * 80)

try:
    payload = {"client_name": "test"}
    response = requests.post(f"{BASE_URL}/status", json=payload, timeout=10)
    print(f"Status Code: {response.status_code}")
    print(f"Response: {json.dumps(response.json(), indent=2)}")
    
    if response.status_code in [200, 201]:
        data = response.json()
        if "id" in data and "client_name" in data and "timestamp" in data:
            test_result("Test 7b: POST /api/status regression", True, "Endpoint still working")
        else:
            test_result("Test 7b: POST /api/status regression", False, f"Missing expected fields in response")
    else:
        test_result("Test 7b: POST /api/status regression", False, f"Expected 200/201, got {response.status_code}")
except Exception as e:
    test_result("Test 7b: POST /api/status regression", False, f"Exception: {str(e)}")

time.sleep(0.5)

print("Test 7c: Regression - GET /api/status")
print("-" * 80)

try:
    response = requests.get(f"{BASE_URL}/status", timeout=10)
    print(f"Status Code: {response.status_code}")
    print(f"Response: {json.dumps(response.json(), indent=2)}")
    
    if response.status_code == 200:
        data = response.json()
        if isinstance(data, list):
            test_result("Test 7c: GET /api/status regression", True, f"Endpoint still working, returned {len(data)} items")
        else:
            test_result("Test 7c: GET /api/status regression", False, "Expected list response")
    else:
        test_result("Test 7c: GET /api/status regression", False, f"Expected 200, got {response.status_code}")
except Exception as e:
    test_result("Test 7c: GET /api/status regression", False, f"Exception: {str(e)}")

# ============================================================================
# Summary
# ============================================================================
print("\n" + "=" * 80)
print("TEST SUMMARY")
print("=" * 80)
print(f"✅ PASSED: {len(test_results['passed'])}")
for test in test_results['passed']:
    print(f"   - {test}")

print(f"\n❌ FAILED: {len(test_results['failed'])}")
for test in test_results['failed']:
    print(f"   - {test}")

print("\n" + "=" * 80)
if len(test_results['failed']) == 0:
    print("🎉 ALL TESTS PASSED!")
else:
    print(f"⚠️  {len(test_results['failed'])} TEST(S) FAILED")
print("=" * 80)
