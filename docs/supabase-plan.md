# Supabase Plan - Alma Business Hub

## Businesses

Alma will have one software app controlling two businesses:

1. Alianza
   - Around 5 employee logins
   - Services:
     - Tax Services
     - Document Filing

2. Petra Insurance
   - Around 20 employee logins
   - Services:
     - Life Insurance
     - Pre-Need Funeral Services

Alma is the only super admin over both businesses.

---

## Lead Flow

Recommended flow:

Website form submission
→ creates website lead
→ lead belongs to one business
→ Alma/admin sees all leads
→ manager can see business leads
→ employee sees only assigned leads
→ lead can become contacted/converted/lost

---

## Roles

super_admin:
- Alma only
- sees everything across both businesses

admin:
- can manage one business or both if allowed
- can assign leads
- can view employees and reports

manager:
- can view business leads, clients, tasks, and reports
- can assign leads inside their business

employee:
- can view assigned leads
- can view assigned clients/customers
- can manage own tasks, notes, reports, payment plans

viewer:
- read-only access

---

## Main Tables

### businesses
- id
- name
- slug
- created_at

### profiles
- id
- full_name
- email
- phone
- global_role
- created_at

### business_members
- id
- business_id
- user_id
- role
- status
- created_at

### services
- id
- business_id
- name
- description
- is_active
- created_at

### website_leads
- id
- business_id
- service_id
- full_name
- phone
- email
- message
- source
- status
- assigned_to
- created_at

### clients
- id
- business_id
- assigned_to
- full_name
- phone
- email
- birthday
- status
- created_at

### sales
- id
- business_id
- client_id
- employee_id
- service_id
- amount
- status
- sold_at
- created_at

### payment_plans
- id
- business_id
- client_id
- employee_id
- total_amount
- down_payment
- monthly_payment
- due_day
- status
- created_at

### tasks
- id
- business_id
- client_id
- lead_id
- assigned_to
- title
- description
- status
- due_date
- created_at

### notes
- id
- business_id
- client_id
- lead_id
- created_by
- note
- created_at

### documents
- id
- business_id
- client_id
- lead_id
- uploaded_by
- file_name
- file_url
- document_type
- created_at

### messages
- id
- business_id
- client_id
- lead_id
- sent_by
- message_type
- body
- status
- created_at

### activity_logs
- id
- business_id
- user_id
- action
- details
- created_at

---

## RLS Rule in Plain English

Alma can see everything.

Business admins/managers can see records for businesses they belong to.

Employees can see:
- leads assigned to them
- clients assigned to them
- tasks assigned to them
- notes/documents/messages connected to their assigned records

Employees should not see the other business unless they are added to that business.
