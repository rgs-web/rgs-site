#====================================================================================================
# START - Testing Protocol - DO NOT EDIT OR REMOVE THIS SECTION
#====================================================================================================

# THIS SECTION CONTAINS CRITICAL TESTING INSTRUCTIONS FOR BOTH AGENTS
# BOTH MAIN_AGENT AND TESTING_AGENT MUST PRESERVE THIS ENTIRE BLOCK

# Communication Protocol:
# If the `testing_agent` is available, main agent should delegate all testing tasks to it.
#
# You have access to a file called `test_result.md`. This file contains the complete testing state
# and history, and is the primary means of communication between main and the testing agent.
#
# Main and testing agents must follow this exact format to maintain testing data. 
# The testing data must be entered in yaml format Below is the data structure:
# 
## user_problem_statement: {problem_statement}
## backend:
##   - task: "Task name"
##     implemented: true
##     working: true  # or false or "NA"
##     file: "file_path.py"
##     stuck_count: 0
##     priority: "high"  # or "medium" or "low"
##     needs_retesting: false
##     status_history:
##         -working: true  # or false or "NA"
##         -agent: "main"  # or "testing" or "user"
##         -comment: "Detailed comment about status"
##
## frontend:
##   - task: "Task name"
##     implemented: true
##     working: true  # or false or "NA"
##     file: "file_path.js"
##     stuck_count: 0
##     priority: "high"  # or "medium" or "low"
##     needs_retesting: false
##     status_history:
##         -working: true  # or false or "NA"
##         -agent: "main"  # or "testing" or "user"
##         -comment: "Detailed comment about status"
##
## metadata:
##   created_by: "main_agent"
##   version: "1.0"
##   test_sequence: 0
##   run_ui: false
##
## test_plan:
##   current_focus:
##     - "Task name 1"
##     - "Task name 2"
##   stuck_tasks:
##     - "Task name with persistent issues"
##   test_all: false
##   test_priority: "high_first"  # or "sequential" or "stuck_first"
##
## agent_communication:
##     -agent: "main"  # or "testing" or "user"
##     -message: "Communication message between agents"

# Protocol Guidelines for Main agent
#
# 1. Update Test Result File Before Testing:
#    - Main agent must always update the `test_result.md` file before calling the testing agent
#    - Add implementation details to the status_history
#    - Set `needs_retesting` to true for tasks that need testing
#    - Update the `test_plan` section to guide testing priorities
#    - Add a message to `agent_communication` explaining what you've done
#
# 2. Incorporate User Feedback:
#    - When a user provides feedback that something is or isn't working, add this information to the relevant task's status_history
#    - Update the working status based on user feedback
#    - If a user reports an issue with a task that was marked as working, increment the stuck_count
#    - Whenever user reports issue in the app, if we have testing agent and task_result.md file so find the appropriate task for that and append in status_history of that task to contain the user concern and problem as well 
#
# 3. Track Stuck Tasks:
#    - Monitor which tasks have high stuck_count values or where you are fixing same issue again and again, analyze that when you read task_result.md
#    - For persistent issues, use websearch tool to find solutions
#    - Pay special attention to tasks in the stuck_tasks list
#    - When you fix an issue with a stuck task, don't reset the stuck_count until the testing agent confirms it's working
#
# 4. Provide Context to Testing Agent:
#    - When calling the testing agent, provide clear instructions about:
#      - Which tasks need testing (reference the test_plan)
#      - Any authentication details or configuration needed
#      - Specific test scenarios to focus on
#      - Any known issues or edge cases to verify
#
# 5. Call the testing agent with specific instructions referring to test_result.md
#
# IMPORTANT: Main agent must ALWAYS update test_result.md BEFORE calling the testing agent, as it relies on this file to understand what to test next.

#====================================================================================================
# END - Testing Protocol - DO NOT EDIT OR REMOVE THIS SECTION
#====================================================================================================



#====================================================================================================
# Testing Data - Main Agent and testing sub agent both should log testing data below this section
#====================================================================================================
user_problem_statement: |
  Reliant Global Solutions marketing website (clone-inspired by coreone.com). Dark navy + red-accented design.
  Pages: Home, Company, Contact. Uses mock data (mock.js). Contact form currently mock (localStorage).

frontend:
  - task: "Remove 'Commercial offerings at reliantgs-corp.com' bullet from Security service on Home page"
    implemented: true
    working: true
    file: "/app/frontend/src/data/mock.js"
    stuck_count: 0
    priority: "high"
    needs_retesting: false
    status_history:
        - working: "NA"
          agent: "main"
          comment: |
            User reported the bullet 'Commercial offerings at reliantgs-corp.com' was still visible under
            Home > What We Do > Security. Removed the bullet from the SERVICES array in /app/frontend/src/data/mock.js.
            Grep verified no matches for 'reliantgs-corp' or 'commercial offer' anywhere in /app/frontend/src.
            Need testing agent to load http://localhost:3000, scroll to the "What We Do" section, click the
            "Security" tab, and confirm the bullet list contains ONLY these 4 items in order:
              1) Advance teams and intelligence support
              2) Critical infrastructure protection
              3) Security teams in any area of the world
              4) Critical cyber and personal security training
            The bullet 'Commercial offerings at reliantgs-corp.com' MUST NOT appear.
        - working: true
          agent: "testing"
          comment: |
            ✅ VERIFIED: Bug fix successful. Tested on http://localhost:3000.
            - Navigated to Home page and scrolled to "What We Do" section
            - Clicked "Security" tab in the service navigator
            - Confirmed Security service displays correct title: "Security" and tagline: "Enterprise security. Special operations lineage."
            - Verified bullet list contains EXACTLY 4 items in correct order:
              1) Advance teams and intelligence support
              2) Critical infrastructure protection
              3) Security teams in any area of the world
              4) Critical cyber and personal security training
            - Global DOM search confirmed 0 matches for "Commercial offerings" and 0 matches for "reliantgs-corp"
            - Screenshot captured showing correct bullet list
            The removed bullet "Commercial offerings at reliantgs-corp.com" is NOT present anywhere on the page.

metadata:
  created_by: "main_agent"
  version: "1.0"
  test_sequence: 2
  run_ui: true

test_plan:
  current_focus: []
  stuck_tasks: []
  test_all: false
  test_priority: "high_first"

agent_communication:
    - agent: "main"
      message: |
        Please verify the fix on the Home page. Load http://localhost:3000, scroll to the "What We Do" section,
        click the "Security" tab in the left-side service list, and confirm the bullets shown are ONLY:
        (1) Advance teams and intelligence support, (2) Critical infrastructure protection,
        (3) Security teams in any area of the world, (4) Critical cyber and personal security training.
        Confirm that "Commercial offerings at reliantgs-corp.com" is NOT present.
    - agent: "testing"
      message: |
        ✅ Bug fix verified successfully. The Security service on the Home page now displays exactly 4 bullets
        as expected, and "Commercial offerings at reliantgs-corp.com" has been completely removed.
        All test criteria passed:
        - Correct bullet count (4 items)
        - All bullet text matches expected content
        - Global DOM search confirms 0 matches for removed content
        - Screenshot evidence captured
        No further action needed for this task.

    - agent: "testing"
      message: |
        Verified via browser automation. Security tab bullets contain exactly the 4 required items and
        "Commercial offerings at reliantgs-corp.com" is NOT present. Global DOM search returned 0 matches
        for both "Commercial offerings" and "reliantgs-corp". Bug fix confirmed working.
